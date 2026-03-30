import initSqlJs from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { readLessonScript } from '../lesson-engine/read-lesson-script.js';
import { buildLessonScriptMarkdown } from '../lesson-engine/build-lesson-script-markdown.js';
import { normalizeString } from '../lesson-engine/build-compiled-lesson.js';
import { openAuthoringLessonBackup } from './open-authoring-lesson-backup.js';

const STORAGE_KEY = 'step-by-step-animator.authoring.sqlite.v1';
const PERSISTENCE_DATABASE_NAME = 'step-by-step-animator-authoring';
const PERSISTENCE_STORE_NAME = 'sqlite_snapshots';
let sharedSqlRuntimePromise = null;

function readTimestamp() {
  return new Date().toISOString();
}

function createOpaqueId(prefix) {
  if (globalThis.crypto?.randomUUID) {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function encodeDatabaseBytes(bytes) {
  let binary = '';

  bytes.forEach(byte => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

function decodeDatabaseBytes(encodedBytes) {
  if (!encodedBytes) {
    return null;
  }

  const binary = atob(encodedBytes);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function readTimestampOrderValue(timestamp) {
  const parsedTimestamp = Date.parse(normalizeString(timestamp));

  return Number.isNaN(parsedTimestamp) ? 0 : parsedTimestamp;
}

function openPersistenceDatabase(ownerWindow) {
  return new Promise((resolve, reject) => {
    const openRequest = ownerWindow.indexedDB.open(PERSISTENCE_DATABASE_NAME, 1);

    openRequest.onupgradeneeded = () => {
      const persistenceDatabase = openRequest.result;

      if (!persistenceDatabase.objectStoreNames.contains(PERSISTENCE_STORE_NAME)) {
        persistenceDatabase.createObjectStore(PERSISTENCE_STORE_NAME);
      }
    };
    openRequest.onerror = () => {
      reject(openRequest.error || new Error('Failed to open the authoring persistence database.'));
    };
    openRequest.onsuccess = () => {
      resolve(openRequest.result);
    };
  });
}

function readPersistenceRequestResult(request, fallbackMessage) {
  return new Promise((resolve, reject) => {
    request.onerror = () => {
      reject(request.error || new Error(fallbackMessage));
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
  });
}

function openPreparedStatement(database, sql, parameters = []) {
  const statement = database.prepare(sql);
  statement.bind(parameters);
  return statement;
}

function readRows(database, sql, parameters = []) {
  const statement = openPreparedStatement(database, sql, parameters);
  const rows = [];

  try {
    while (statement.step()) {
      rows.push(statement.getAsObject());
    }
  } finally {
    statement.free();
  }

  return rows;
}

function runStatement(database, sql, parameters = []) {
  const statement = openPreparedStatement(database, sql, parameters);

  try {
    statement.step();
  } finally {
    statement.free();
  }
}

function runTransaction(database, work) {
  database.run('BEGIN');

  try {
    const result = work();
    database.run('COMMIT');
    return result;
  } catch (error) {
    database.run('ROLLBACK');
    throw error;
  }
}

function createSchema(database) {
  database.run(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS shipped_lessons (
      lesson_id TEXT PRIMARY KEY,
      lesson_title TEXT NOT NULL,
      source_markdown TEXT NOT NULL,
      imported_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS lesson_drafts (
      draft_id TEXT PRIMARY KEY,
      lesson_id TEXT NOT NULL UNIQUE,
      lesson_title TEXT NOT NULL,
      source_markdown TEXT NOT NULL,
      source_origin TEXT NOT NULL,
      shipped_lesson_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (shipped_lesson_id) REFERENCES shipped_lessons(lesson_id)
    );

    CREATE TABLE IF NOT EXISTS lesson_artifacts (
      draft_id TEXT NOT NULL,
      artifact_index INTEGER NOT NULL,
      artifact_id TEXT NOT NULL,
      language TEXT NOT NULL,
      label TEXT NOT NULL,
      is_primary INTEGER NOT NULL,
      PRIMARY KEY (draft_id, artifact_index),
      FOREIGN KEY (draft_id) REFERENCES lesson_drafts(draft_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS lesson_steps (
      draft_id TEXT NOT NULL,
      step_index INTEGER NOT NULL,
      step_id TEXT NOT NULL,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      intent TEXT NOT NULL,
      tag TEXT NOT NULL,
      pro_tip TEXT NOT NULL,
      focus_html_needles_json TEXT NOT NULL,
      PRIMARY KEY (draft_id, step_index),
      FOREIGN KEY (draft_id) REFERENCES lesson_drafts(draft_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS lesson_scenes (
      draft_id TEXT NOT NULL,
      step_index INTEGER NOT NULL,
      scene_index INTEGER NOT NULL,
      scene_id TEXT NOT NULL,
      narration TEXT NOT NULL,
      preview_action TEXT NOT NULL,
      preview_target TEXT NOT NULL,
      theory_anchor TEXT NOT NULL,
      PRIMARY KEY (draft_id, step_index, scene_index),
      FOREIGN KEY (draft_id) REFERENCES lesson_drafts(draft_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS scene_show_code_blocks (
      draft_id TEXT NOT NULL,
      step_index INTEGER NOT NULL,
      scene_index INTEGER NOT NULL,
      block_index INTEGER NOT NULL,
      artifact_id TEXT NOT NULL,
      fence_language TEXT NOT NULL,
      code_text TEXT NOT NULL,
      PRIMARY KEY (draft_id, step_index, scene_index, block_index),
      FOREIGN KEY (draft_id) REFERENCES lesson_drafts(draft_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS lesson_versions (
      version_id TEXT PRIMARY KEY,
      draft_id TEXT NOT NULL,
      version_kind TEXT NOT NULL,
      source_markdown TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (draft_id) REFERENCES lesson_drafts(draft_id) ON DELETE CASCADE
    );
  `);
}

function buildEmptyLessonScript(existingLessonIds) {
  let sequence = 1;
  let lessonId = `new-lesson-${sequence}`;

  while (existingLessonIds.has(lessonId)) {
    sequence += 1;
    lessonId = `new-lesson-${sequence}`;
  }

  return buildLessonScriptMarkdown({
    lessonAttributes: {
      schemaVersion: 1,
      lessonId,
      lessonTitle: `New Lesson ${sequence}`,
      lessonIntro: 'Write the lesson story here.',
      status: 'draft',
      courseId: 'step-by-step-animator',
      order: sequence,
      artifacts: [
        {
          artifactId: 'html',
          language: 'html',
          label: 'index.html',
          isPrimary: true
        },
        {
          artifactId: 'css',
          language: 'css',
          label: 'style.css',
          isPrimary: false
        }
      ],
      preview: {
        type: 'dom',
        title: 'Draft lesson preview',
        address: `browser://${lessonId}-preview`
      }
    },
    steps: [
      {
        stepId: 'start-here',
        title: 'Start Here',
        summary: 'Open the draft with one honest first step.',
        intent: 'Create the smallest possible scene before adding complexity.',
        tag: 'html:start-here',
        proTip: 'Keep the first scene small so each later change stays obvious.',
        focusHtmlNeedles: ['class="lesson-shell"'],
        scenes: [
          {
            sceneId: 'start-here-scene',
            narration: 'Start with a small host element that can accept later styling.',
            showCodeBlocks: [
              {
                artifactId: 'html',
                language: 'html',
                fenceLanguage: 'html',
                codeText: '<div class="lesson-shell"></div>'
              },
              {
                artifactId: 'css',
                language: 'css',
                fenceLanguage: 'css',
                codeText: '.lesson-shell {\n}'
              }
            ]
          }
        ]
      }
    ]
  });
}

function createSqlRuntime() {
  if (!sharedSqlRuntimePromise) {
    sharedSqlRuntimePromise = initSqlJs({
      locateFile() {
        return sqlWasmUrl;
      }
    });
  }

  return sharedSqlRuntimePromise;
}

async function readPersistedDatabaseBytes(ownerWindow) {
  if (!ownerWindow.indexedDB) {
    return decodeDatabaseBytes(ownerWindow.localStorage.getItem(STORAGE_KEY));
  }

  const persistenceDatabase = await openPersistenceDatabase(ownerWindow);

  try {
    const transaction = persistenceDatabase.transaction(PERSISTENCE_STORE_NAME, 'readonly');
    const objectStore = transaction.objectStore(PERSISTENCE_STORE_NAME);
    const storedBytes = await readPersistenceRequestResult(
      objectStore.get(STORAGE_KEY),
      'Failed to read the authoring SQLite snapshot.'
    );

    if (!storedBytes) {
      return null;
    }

    return new Uint8Array(storedBytes);
  } finally {
    persistenceDatabase.close();
  }
}

async function readPersistedDatabaseState(ownerWindow) {
  try {
    return {
      storedBytes: await readPersistedDatabaseBytes(ownerWindow),
      readErrorMessage: ''
    };
  } catch (error) {
    return {
      storedBytes: null,
      readErrorMessage: error.message || 'Failed to read the authoring SQLite snapshot.'
    };
  }
}

function openPersistedDatabase(SQL, storedBytes) {
  if (!storedBytes) {
    return {
      database: new SQL.Database(),
      openErrorMessage: ''
    };
  }

  try {
    return {
      database: new SQL.Database(storedBytes),
      openErrorMessage: ''
    };
  } catch (error) {
    return {
      database: new SQL.Database(),
      openErrorMessage: error.message || 'Failed to open the authoring SQLite snapshot.'
    };
  }
}

async function persistDatabase(database, ownerWindow) {
  const bytes = database.export();

  if (!ownerWindow.indexedDB) {
    ownerWindow.localStorage.setItem(STORAGE_KEY, encodeDatabaseBytes(bytes));
    return;
  }

  const persistenceDatabase = await openPersistenceDatabase(ownerWindow);

  try {
    const transaction = persistenceDatabase.transaction(PERSISTENCE_STORE_NAME, 'readwrite');
    const objectStore = transaction.objectStore(PERSISTENCE_STORE_NAME);

    await readPersistenceRequestResult(
      objectStore.put(bytes, STORAGE_KEY),
      'Failed to write the authoring SQLite snapshot.'
    );
    await new Promise((resolve, reject) => {
      transaction.onerror = () => {
        reject(transaction.error || new Error('Failed to commit the authoring SQLite snapshot.'));
      };
      transaction.oncomplete = () => {
        resolve();
      };
    });
  } finally {
    persistenceDatabase.close();
  }
}

function readExistingDraftIds(database) {
  return new Set(
    readRows(database, 'SELECT lesson_id FROM lesson_drafts').map(row => row.lesson_id)
  );
}

function summarizeLessonContract(contract) {
  return {
    lessonId: contract.attributes.lessonId,
    lessonTitle: contract.attributes.lessonTitle
  };
}

function readShippedLessonRow(database, lessonId) {
  return readRows(
    database,
    `SELECT lesson_id, lesson_title, source_markdown, imported_at
     FROM shipped_lessons
     WHERE lesson_id = ?`,
    [lessonId]
  )[0] || null;
}

function readPairedDraftRows(database, shippedLessonId) {
  return readRows(
    database,
    `SELECT draft_id, lesson_id, lesson_title, source_markdown, source_origin, shipped_lesson_id, created_at, updated_at
     FROM lesson_drafts
     WHERE shipped_lesson_id = ?
     ORDER BY updated_at DESC, lesson_id ASC`,
    [shippedLessonId]
  );
}

function readDraftIdForLessonContext(database, lessonId) {
  if (!normalizeString(lessonId)) {
    return '';
  }

  const pairedDraftRow = readRows(
    database,
    `SELECT draft_id
     FROM lesson_drafts
     WHERE shipped_lesson_id = ?
     ORDER BY updated_at DESC, lesson_id ASC
     LIMIT 1`,
    [lessonId]
  )[0];

  if (pairedDraftRow?.draft_id) {
    return pairedDraftRow.draft_id;
  }

  const directDraftRow = readRows(
    database,
    `SELECT draft_id
     FROM lesson_drafts
     WHERE lesson_id = ?
     ORDER BY updated_at DESC, lesson_id ASC
     LIMIT 1`,
    [lessonId]
  )[0];

  return directDraftRow?.draft_id || '';
}

function tryReadLessonContract(sourceMarkdown) {
  try {
    return {
      contract: readLessonScript(sourceMarkdown),
      parseErrorMessage: ''
    };
  } catch (error) {
    return {
      contract: null,
      parseErrorMessage: error.message
    };
  }
}

function ensureDraftLessonIdIsAvailable(database, lessonId, currentDraftId) {
  const rows = readRows(
    database,
    'SELECT draft_id FROM lesson_drafts WHERE lesson_id = ?',
    [lessonId]
  );

  if (!rows.length) {
    return;
  }

  if (rows[0].draft_id !== currentDraftId) {
    throw new Error(`Draft lessonId "${lessonId}" is already used by another draft.`);
  }
}

function replaceDraftStructure(database, draftId, contract) {
  runStatement(database, 'DELETE FROM lesson_artifacts WHERE draft_id = ?', [draftId]);
  runStatement(database, 'DELETE FROM lesson_steps WHERE draft_id = ?', [draftId]);
  runStatement(database, 'DELETE FROM lesson_scenes WHERE draft_id = ?', [draftId]);
  runStatement(database, 'DELETE FROM scene_show_code_blocks WHERE draft_id = ?', [draftId]);

  contract.attributes.artifacts.forEach((artifact, artifactIndex) => {
    runStatement(
      database,
      `INSERT INTO lesson_artifacts (draft_id, artifact_index, artifact_id, language, label, is_primary)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        draftId,
        artifactIndex,
        artifact.artifactId,
        artifact.language,
        artifact.label || '',
        artifact.isPrimary ? 1 : 0
      ]
    );
  });

  contract.steps.forEach((step, stepIndex) => {
    runStatement(
      database,
      `INSERT INTO lesson_steps (draft_id, step_index, step_id, title, summary, intent, tag, pro_tip, focus_html_needles_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        draftId,
        stepIndex,
        step.stepId,
        step.title,
        step.summary,
        step.intent,
        step.tag || '',
        step.proTip || '',
        JSON.stringify(step.focusHtmlNeedles || [])
      ]
    );

    step.scenes.forEach((scene, sceneIndex) => {
      runStatement(
        database,
        `INSERT INTO lesson_scenes (draft_id, step_index, scene_index, scene_id, narration, preview_action, preview_target, theory_anchor)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          draftId,
          stepIndex,
          sceneIndex,
          scene.sceneId,
          scene.narration,
          scene.preview?.action || '',
          scene.preview?.target || '',
          scene.theory?.anchor || ''
        ]
      );

      scene.showCodeBlocks.forEach((showCodeBlock, blockIndex) => {
        runStatement(
          database,
          `INSERT INTO scene_show_code_blocks (draft_id, step_index, scene_index, block_index, artifact_id, fence_language, code_text)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            draftId,
            stepIndex,
            sceneIndex,
            blockIndex,
            showCodeBlock.artifactId,
            showCodeBlock.fenceLanguage || showCodeBlock.language || '',
            showCodeBlock.codeText
          ]
        );
      });
    });
  });
}

function clearDraftStructure(database, draftId) {
  runStatement(database, 'DELETE FROM lesson_artifacts WHERE draft_id = ?', [draftId]);
  runStatement(database, 'DELETE FROM lesson_steps WHERE draft_id = ?', [draftId]);
  runStatement(database, 'DELETE FROM lesson_scenes WHERE draft_id = ?', [draftId]);
  runStatement(database, 'DELETE FROM scene_show_code_blocks WHERE draft_id = ?', [draftId]);
}

function upsertDraftFromMarkdown(database, {
  draftId,
  sourceMarkdown,
  sourceOrigin,
  shippedLessonId = null,
  createdAt = readTimestamp(),
  updatedAt = readTimestamp()
}) {
  const parsedLesson = tryReadLessonContract(sourceMarkdown);

  if (!parsedLesson.contract) {
    throw new Error(parsedLesson.parseErrorMessage);
  }

  const summary = summarizeLessonContract(parsedLesson.contract);

  ensureDraftLessonIdIsAvailable(database, summary.lessonId, draftId);

  const existingRows = readRows(
    database,
    'SELECT draft_id FROM lesson_drafts WHERE draft_id = ?',
    [draftId]
  );

  if (existingRows.length) {
    runStatement(
      database,
      `UPDATE lesson_drafts
       SET lesson_id = ?, lesson_title = ?, source_markdown = ?, source_origin = ?, shipped_lesson_id = ?, updated_at = ?
       WHERE draft_id = ?`,
      [
        summary.lessonId,
        summary.lessonTitle,
        sourceMarkdown,
        sourceOrigin,
        shippedLessonId,
        updatedAt,
        draftId
      ]
    );
  } else {
    runStatement(
      database,
      `INSERT INTO lesson_drafts (draft_id, lesson_id, lesson_title, source_markdown, source_origin, shipped_lesson_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        draftId,
        summary.lessonId,
        summary.lessonTitle,
        sourceMarkdown,
        sourceOrigin,
        shippedLessonId,
        createdAt,
        updatedAt
      ]
    );
  }

  replaceDraftStructure(database, draftId, parsedLesson.contract);

  return {
    draftId,
    lessonId: summary.lessonId,
    lessonTitle: summary.lessonTitle
  };
}

function refreshUntouchedPairedDrafts(database, {
  shippedLessonId,
  previousSourceMarkdown,
  nextSourceMarkdown
}) {
  if (!normalizeString(shippedLessonId) || previousSourceMarkdown === nextSourceMarkdown) {
    return;
  }

  readPairedDraftRows(database, shippedLessonId).forEach(draftRow => {
    if (draftRow.source_origin !== 'paired-shipped') {
      return;
    }

    if (draftRow.source_markdown !== previousSourceMarkdown) {
      return;
    }

    upsertDraftFromMarkdown(database, {
      draftId: draftRow.draft_id,
      sourceMarkdown: nextSourceMarkdown,
      sourceOrigin: draftRow.source_origin,
      shippedLessonId,
      createdAt: draftRow.created_at
    });
  });
}

function seedShippedLessons(database, shippedLessons) {
  shippedLessons.forEach(shippedLesson => {
    const existingRow = readShippedLessonRow(database, shippedLesson.lessonId);

    if (existingRow) {
      runStatement(
        database,
        `UPDATE shipped_lessons
         SET lesson_title = ?, source_markdown = ?, imported_at = ?
         WHERE lesson_id = ?`,
        [
          shippedLesson.lessonTitle,
          shippedLesson.sourceMarkdown,
          readTimestamp(),
          shippedLesson.lessonId
        ]
      );
      refreshUntouchedPairedDrafts(database, {
        shippedLessonId: shippedLesson.lessonId,
        previousSourceMarkdown: existingRow.source_markdown,
        nextSourceMarkdown: shippedLesson.sourceMarkdown
      });
      return;
    }

    runStatement(
      database,
      `INSERT INTO shipped_lessons (lesson_id, lesson_title, source_markdown, imported_at)
       VALUES (?, ?, ?, ?)`,
      [
        shippedLesson.lessonId,
        shippedLesson.lessonTitle,
        shippedLesson.sourceMarkdown,
        readTimestamp()
      ]
    );
  });
}

function ensurePairedDrafts(database) {
  const shippedLessons = readRows(
    database,
    'SELECT lesson_id, source_markdown FROM shipped_lessons ORDER BY lesson_id ASC'
  );

  shippedLessons.forEach(shippedLesson => {
    const existingRows = readRows(
      database,
      'SELECT draft_id FROM lesson_drafts WHERE shipped_lesson_id = ?',
      [shippedLesson.lesson_id]
    );

    if (existingRows.length) {
      return;
    }

    upsertDraftFromMarkdown(database, {
      draftId: createOpaqueId('paired-draft'),
      sourceMarkdown: shippedLesson.source_markdown,
      sourceOrigin: 'paired-shipped',
      shippedLessonId: shippedLesson.lesson_id
    });
  });
}

function ensureDraftForShippedLesson(database, shippedLessonId) {
  const existingRows = readPairedDraftRows(database, shippedLessonId);

  if (existingRows.length) {
    return existingRows[0].draft_id;
  }

  const shippedRow = readShippedLessonRow(database, shippedLessonId);

  if (!shippedRow) {
    throw new Error(`Shipped lesson "${shippedLessonId}" was not found.`);
  }

  const draftId = createOpaqueId('paired-draft');

  upsertDraftFromMarkdown(database, {
    draftId,
    sourceMarkdown: shippedRow.source_markdown,
    sourceOrigin: 'paired-shipped',
    shippedLessonId
  });

  return draftId;
}

function readDraftSummaries(database) {
  return readRows(
    database,
    `SELECT draft_id, lesson_id, lesson_title, source_origin, shipped_lesson_id, updated_at
     FROM lesson_drafts
     ORDER BY updated_at DESC, lesson_id ASC`
  ).map(row => ({
    draftId: row.draft_id,
    lessonId: row.lesson_id,
    lessonTitle: row.lesson_title,
    sourceOrigin: row.source_origin,
    shippedLessonId: row.shipped_lesson_id || '',
    updatedAt: row.updated_at
  }));
}

function readShippedSummaries(database) {
  return readRows(
    database,
    `SELECT lesson_id, lesson_title, imported_at
     FROM shipped_lessons
     ORDER BY lesson_id ASC`
  ).map(row => ({
    lessonId: row.lesson_id,
    lessonTitle: row.lesson_title,
    importedAt: row.imported_at
  }));
}

function readVersionSummaries(database, draftId) {
  return readRows(
    database,
    `SELECT version_id, version_kind, created_at
     FROM lesson_versions
     WHERE draft_id = ?
     ORDER BY created_at DESC`,
    [draftId]
  ).map(row => ({
    versionId: row.version_id,
    versionKind: row.version_kind,
    createdAt: row.created_at
  }));
}

function readDraftSourceMarkdown(database, draftId) {
  const rows = readRows(
    database,
    `SELECT draft_id, lesson_id, lesson_title, source_markdown, source_origin, shipped_lesson_id, created_at, updated_at
     FROM lesson_drafts
     WHERE draft_id = ?`,
    [draftId]
  );

  if (!rows.length) {
    throw new Error(`Draft "${draftId}" was not found.`);
  }

  return rows[0];
}

function readDraftRowByDraftId(database, draftId) {
  if (!normalizeString(draftId)) {
    return null;
  }

  return readRows(
    database,
    `SELECT draft_id, lesson_id, lesson_title, source_markdown, source_origin, shipped_lesson_id, created_at, updated_at
     FROM lesson_drafts
     WHERE draft_id = ?
     LIMIT 1`,
    [draftId]
  )[0] || null;
}

function readDraftRestoreConflictRow(database, {
  lessonId = '',
  shippedLessonId = ''
}) {
  if (normalizeString(shippedLessonId)) {
    return readRows(
      database,
      `SELECT draft_id, lesson_id, lesson_title, source_markdown, source_origin, shipped_lesson_id, created_at, updated_at
       FROM lesson_drafts
       WHERE shipped_lesson_id = ?
       ORDER BY updated_at DESC, lesson_id ASC
       LIMIT 1`,
      [shippedLessonId]
    )[0] || null;
  }

  if (!normalizeString(lessonId)) {
    return null;
  }

  return readRows(
    database,
    `SELECT draft_id, lesson_id, lesson_title, source_markdown, source_origin, shipped_lesson_id, created_at, updated_at
     FROM lesson_drafts
     WHERE lesson_id = ? AND shipped_lesson_id IS NULL
     ORDER BY updated_at DESC, lesson_id ASC
     LIMIT 1`,
    [lessonId]
  )[0] || null;
}

function restoreDraftBackups(database, draftBackups) {
  let restoredDraftCount = 0;

  draftBackups.forEach(draftBackup => {
    if (!draftBackup?.draftId || !normalizeString(draftBackup.sourceMarkdown)) {
      return;
    }

    if (draftBackup.tracksShippedSource && normalizeString(draftBackup.shippedLessonId)) {
      return;
    }

    const exactDraftRow = readDraftRowByDraftId(database, draftBackup.draftId);
    const conflictingDraftRow = readDraftRestoreConflictRow(database, draftBackup);
    const targetDraftRow = exactDraftRow || conflictingDraftRow;
    const existingUpdatedAt = readTimestampOrderValue(targetDraftRow?.updated_at);
    const backupUpdatedAt = readTimestampOrderValue(draftBackup.updatedAt || draftBackup.createdAt);

    if (targetDraftRow && existingUpdatedAt >= backupUpdatedAt) {
      return;
    }

    const restoredDraftId = targetDraftRow?.draft_id || draftBackup.draftId;
    const restoredCreatedAt = targetDraftRow?.created_at || draftBackup.createdAt || draftBackup.updatedAt || readTimestamp();
    const restoredUpdatedAt = draftBackup.updatedAt || draftBackup.createdAt || readTimestamp();
    const restoredSourceOrigin = draftBackup.sourceOrigin || targetDraftRow?.source_origin || (draftBackup.shippedLessonId ? 'paired-shipped' : 'custom');
    const restoredShippedLessonId = draftBackup.shippedLessonId || targetDraftRow?.shipped_lesson_id || null;
    const parsedDraftBackup = tryReadLessonContract(draftBackup.sourceMarkdown);

    if (parsedDraftBackup.contract) {
      upsertDraftFromMarkdown(database, {
        draftId: restoredDraftId,
        sourceMarkdown: draftBackup.sourceMarkdown,
        sourceOrigin: restoredSourceOrigin,
        shippedLessonId: restoredShippedLessonId,
        createdAt: restoredCreatedAt,
        updatedAt: restoredUpdatedAt
      });
      restoredDraftCount += 1;
      return;
    }

    const restoredLessonId = normalizeString(draftBackup.lessonId) || targetDraftRow?.lesson_id || '';
    const restoredLessonTitle = normalizeString(draftBackup.lessonTitle) || targetDraftRow?.lesson_title || restoredLessonId;

    if (!restoredLessonId || !restoredLessonTitle) {
      return;
    }

    ensureDraftLessonIdIsAvailable(database, restoredLessonId, restoredDraftId);

    if (targetDraftRow) {
      runStatement(
        database,
        `UPDATE lesson_drafts
         SET lesson_id = ?, lesson_title = ?, source_markdown = ?, source_origin = ?, shipped_lesson_id = ?, updated_at = ?
         WHERE draft_id = ?`,
        [
          restoredLessonId,
          restoredLessonTitle,
          draftBackup.sourceMarkdown,
          restoredSourceOrigin,
          restoredShippedLessonId,
          restoredUpdatedAt,
          restoredDraftId
        ]
      );
    } else {
      runStatement(
        database,
        `INSERT INTO lesson_drafts (draft_id, lesson_id, lesson_title, source_markdown, source_origin, shipped_lesson_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          restoredDraftId,
          restoredLessonId,
          restoredLessonTitle,
          draftBackup.sourceMarkdown,
          restoredSourceOrigin,
          restoredShippedLessonId,
          restoredCreatedAt,
          restoredUpdatedAt
        ]
      );
    }

    clearDraftStructure(database, restoredDraftId);
    restoredDraftCount += 1;
  });

  return restoredDraftCount;
}

function buildStoreRecoveryState({
  readErrorMessage = '',
  openErrorMessage = '',
  restoredDraftCount = 0
}) {
  const draftLabel = restoredDraftCount === 1 ? 'draft' : 'drafts';

  if (readErrorMessage || openErrorMessage) {
    if (restoredDraftCount > 0) {
      return {
        storeRecoveryNotice: `SQLite snapshot could not be opened. Restored ${restoredDraftCount} ${draftLabel} from lesson.script.md backups.`,
        storeRecoveryTone: 'warning'
      };
    }

    return {
      storeRecoveryNotice: 'SQLite snapshot could not be opened and no lesson.script.md backups were available.',
      storeRecoveryTone: 'danger'
    };
  }

  if (restoredDraftCount > 0) {
    return {
      storeRecoveryNotice: `SQLite snapshot was missing. Restored ${restoredDraftCount} ${draftLabel} from lesson.script.md backups.`,
      storeRecoveryTone: 'warning'
    };
  }

  return {
    storeRecoveryNotice: '',
    storeRecoveryTone: 'success'
  };
}

function readPlayableDraftOverrideRow(database, shippedLessonId) {
  const rows = readRows(
    database,
    `SELECT draft_id, lesson_id, lesson_title, source_markdown, source_origin, shipped_lesson_id, created_at, updated_at
     FROM lesson_drafts
     WHERE shipped_lesson_id = ?
     ORDER BY updated_at DESC, lesson_id ASC
     LIMIT 1`,
    [shippedLessonId]
  );

  return rows[0] || null;
}

function readPlayableCustomDraftRow(database, lessonId) {
  const rows = readRows(
    database,
    `SELECT draft_id, lesson_id, lesson_title, source_markdown, source_origin, shipped_lesson_id, created_at, updated_at
     FROM lesson_drafts
     WHERE lesson_id = ? AND shipped_lesson_id IS NULL
     ORDER BY updated_at DESC, lesson_id ASC
     LIMIT 1`,
    [lessonId]
  );

  return rows[0] || null;
}

function readPlayableDraftOverrideRowForSelection(database, {
  requestedLessonId = '',
  shippedLessonId = ''
}) {
  if (normalizeString(shippedLessonId)) {
    return readPlayableDraftOverrideRow(database, shippedLessonId);
  }

  if (normalizeString(requestedLessonId)) {
    return readPlayableCustomDraftRow(database, requestedLessonId);
  }

  return null;
}

function buildPlayableDraftOverrideSummary(draftRow) {
  if (!draftRow) {
    return null;
  }

  return {
    draftId: draftRow.draft_id,
    lessonId: draftRow.lesson_id,
    lessonTitle: draftRow.lesson_title,
    shippedLessonId: draftRow.shipped_lesson_id || '',
    sourceOrigin: draftRow.source_origin,
    createdAt: draftRow.created_at,
    updatedAt: draftRow.updated_at,
    sourceMarkdown: draftRow.source_markdown
  };
}

function buildWorkspaceSnapshot(database, draftId = '', {
  storeRecoveryNotice = '',
  storeRecoveryTone = 'success'
} = {}) {
  return {
    shippedLessons: readShippedSummaries(database),
    drafts: readDraftSummaries(database),
    storeRecoveryNotice,
    storeRecoveryTone,
    selectedDraft: draftId
      ? (() => {
          const draftRow = readDraftSourceMarkdown(database, draftId);
          const parsedLesson = tryReadLessonContract(draftRow.source_markdown);

          return {
            draftId: draftRow.draft_id,
            lessonId: draftRow.lesson_id,
            lessonTitle: draftRow.lesson_title,
            sourceOrigin: draftRow.source_origin,
            shippedLessonId: draftRow.shipped_lesson_id || '',
            createdAt: draftRow.created_at,
            updatedAt: draftRow.updated_at,
            sourceMarkdown: draftRow.source_markdown,
            contract: parsedLesson.contract,
            parseErrorMessage: parsedLesson.parseErrorMessage,
            versions: readVersionSummaries(database, draftId)
          };
        })()
      : null
  };
}

function createDuplicateLessonScript(database, sourceMarkdown) {
  const existingLessonIds = readExistingDraftIds(database);
  const contract = readLessonScript(sourceMarkdown);
  const baseLessonId = normalizeString(contract.attributes.lessonId) || 'lesson-copy';
  const baseLessonTitle = normalizeString(contract.attributes.lessonTitle) || 'Lesson Copy';
  let sequence = 1;
  let lessonId = `${baseLessonId}-copy`;

  while (existingLessonIds.has(lessonId)) {
    sequence += 1;
    lessonId = `${baseLessonId}-copy-${sequence}`;
  }

  return buildLessonScriptMarkdown({
    lessonAttributes: {
      ...contract.attributes,
      lessonId,
      lessonTitle: `${baseLessonTitle} Copy${sequence > 1 ? ` ${sequence}` : ''}`,
      preview: {
        ...(contract.attributes.preview || {}),
        address: `browser://${lessonId}-preview`
      }
    },
    steps: contract.steps
  });
}

export async function openAuthoringSqlite({
  ownerWindow,
  shippedLessons
}) {
  const SQL = await createSqlRuntime();
  const authoringLessonBackup = await openAuthoringLessonBackup({
    ownerWindow
  });
  const persistedDatabaseState = await readPersistedDatabaseState(ownerWindow);
  const { database, openErrorMessage } = openPersistedDatabase(SQL, persistedDatabaseState.storedBytes);
  let draftBackups = [];

  try {
    draftBackups = await authoringLessonBackup.readDraftBackups();
  } catch {
    draftBackups = [];
  }

  createSchema(database);
  const restoredDraftCount = runTransaction(database, () => {
    seedShippedLessons(database, shippedLessons);
    const restoredCount = restoreDraftBackups(database, draftBackups);
    ensurePairedDrafts(database);
    return restoredCount;
  });
  await persistDatabase(database, ownerWindow);
  const storeRecoveryState = buildStoreRecoveryState({
    readErrorMessage: persistedDatabaseState.readErrorMessage,
    openErrorMessage,
    restoredDraftCount
  });

  async function persist(work) {
    const result = runTransaction(database, work);
    await persistDatabase(database, ownerWindow);
    return result;
  }

  function readWorkspaceSnapshotWithRecovery(selectedDraftId = '') {
    return buildWorkspaceSnapshot(database, selectedDraftId, storeRecoveryState);
  }

  function readTracksShippedSource(selectedDraft) {
    if (!normalizeString(selectedDraft?.shippedLessonId)) {
      return false;
    }

    const shippedLessonRow = readShippedLessonRow(database, selectedDraft.shippedLessonId);

    return Boolean(
      shippedLessonRow
      && shippedLessonRow.source_markdown === selectedDraft.sourceMarkdown
    );
  }

  async function writeSelectedDraftBackup(workspaceSnapshot) {
    if (!workspaceSnapshot?.selectedDraft) {
      return {
        status: 'unavailable',
        backupFileName: 'lesson.script.md',
        backupLocation: ''
      };
    }

    try {
      return await authoringLessonBackup.writeDraftBackup({
        draftId: workspaceSnapshot.selectedDraft.draftId,
        lessonId: workspaceSnapshot.selectedDraft.lessonId,
        lessonTitle: workspaceSnapshot.selectedDraft.lessonTitle,
        sourceMarkdown: workspaceSnapshot.selectedDraft.sourceMarkdown,
        sourceOrigin: workspaceSnapshot.selectedDraft.sourceOrigin,
        shippedLessonId: workspaceSnapshot.selectedDraft.shippedLessonId,
        createdAt: workspaceSnapshot.selectedDraft.createdAt,
        updatedAt: workspaceSnapshot.selectedDraft.updatedAt,
        tracksShippedSource: readTracksShippedSource(workspaceSnapshot.selectedDraft)
      });
    } catch (error) {
      return {
        status: 'failed',
        backupFileName: 'lesson.script.md',
        backupLocation: '',
        errorMessage: error.message || 'Failed to write the lesson.script.md backup.'
      };
    }
  }

  async function removeDraftBackup(draftId) {
    try {
      return await authoringLessonBackup.removeDraftBackup(draftId);
    } catch (error) {
      return {
        status: 'failed',
        backupFileName: 'lesson.script.md',
        backupLocation: '',
        errorMessage: error.message || 'Failed to remove the lesson.script.md backup.'
      };
    }
  }

  return {
    readWorkspaceSnapshot(selectedDraftId = '') {
      return readWorkspaceSnapshotWithRecovery(selectedDraftId);
    },
    readPlayableDraftOverride(shippedLessonId) {
      if (!normalizeString(shippedLessonId)) {
        return null;
      }

      return buildPlayableDraftOverrideSummary(
        readPlayableDraftOverrideRow(database, shippedLessonId)
      );
    },
    async openDraftForLessonContext(lessonId) {
      const requestedLessonId = normalizeString(lessonId);

      if (!requestedLessonId) {
        return readWorkspaceSnapshotWithRecovery();
      }

      const directDraftId = readDraftIdForLessonContext(database, requestedLessonId);

      if (directDraftId) {
        return readWorkspaceSnapshotWithRecovery(directDraftId);
      }

      if (!readShippedLessonRow(database, requestedLessonId)) {
        return readWorkspaceSnapshotWithRecovery();
      }

      return persist(() => {
        const draftId = ensureDraftForShippedLesson(database, requestedLessonId);
        return readWorkspaceSnapshotWithRecovery(draftId);
      });
    },
    async openDraftForShippedLesson(shippedLessonId) {
      return persist(() => {
        const draftId = ensureDraftForShippedLesson(database, shippedLessonId);

        return readWorkspaceSnapshotWithRecovery(draftId);
      });
    },
    async createLessonDraft() {
      const nextWorkspaceSnapshot = await persist(() => {
        const sourceMarkdown = buildEmptyLessonScript(readExistingDraftIds(database));
        const draftId = createOpaqueId('draft');

        upsertDraftFromMarkdown(database, {
          draftId,
          sourceMarkdown,
          sourceOrigin: 'custom'
        });

        return readWorkspaceSnapshotWithRecovery(draftId);
      });

      nextWorkspaceSnapshot.backupStatus = await writeSelectedDraftBackup(nextWorkspaceSnapshot);
      return nextWorkspaceSnapshot;
    },
    async saveLessonDraft({ draftId, sourceMarkdown, lessonAttributes, steps }) {
      const nextWorkspaceSnapshot = await persist(() => {
        const existingDraft = readDraftSourceMarkdown(database, draftId);
        const nextSourceMarkdown = typeof sourceMarkdown === 'string'
          ? sourceMarkdown
          : buildLessonScriptMarkdown({
            lessonAttributes,
            steps
          });
        const parsedLesson = tryReadLessonContract(nextSourceMarkdown);
        const savedAt = readTimestamp();

        if (parsedLesson.contract) {
          const summary = summarizeLessonContract(parsedLesson.contract);

          ensureDraftLessonIdIsAvailable(database, summary.lessonId, draftId);

          runStatement(
            database,
            `UPDATE lesson_drafts
             SET lesson_id = ?, lesson_title = ?, source_markdown = ?, source_origin = ?, shipped_lesson_id = ?, updated_at = ?
             WHERE draft_id = ?`,
            [
              summary.lessonId,
              summary.lessonTitle,
              nextSourceMarkdown,
              existingDraft.source_origin,
              existingDraft.shipped_lesson_id || null,
              savedAt,
              draftId
            ]
          );
          replaceDraftStructure(database, draftId, parsedLesson.contract);
        } else {
          runStatement(
            database,
            `UPDATE lesson_drafts
             SET source_markdown = ?, updated_at = ?
             WHERE draft_id = ?`,
            [
              nextSourceMarkdown,
              savedAt,
              draftId
            ]
          );
          clearDraftStructure(database, draftId);
        }

        return readWorkspaceSnapshotWithRecovery(draftId);
      });

      nextWorkspaceSnapshot.backupStatus = await writeSelectedDraftBackup(nextWorkspaceSnapshot);
      return nextWorkspaceSnapshot;
    },
    async duplicateLessonDraft(draftId) {
      const nextWorkspaceSnapshot = await persist(() => {
        const existingDraft = readDraftSourceMarkdown(database, draftId);
        const duplicatedMarkdown = createDuplicateLessonScript(database, existingDraft.source_markdown);
        const duplicatedDraftId = createOpaqueId('draft');

        upsertDraftFromMarkdown(database, {
          draftId: duplicatedDraftId,
          sourceMarkdown: duplicatedMarkdown,
          sourceOrigin: 'duplicate'
        });

        return readWorkspaceSnapshotWithRecovery(duplicatedDraftId);
      });

      nextWorkspaceSnapshot.backupStatus = await writeSelectedDraftBackup(nextWorkspaceSnapshot);
      return nextWorkspaceSnapshot;
    },
    async deleteLessonDraft(draftId) {
      const existingDraft = readDraftSourceMarkdown(database, draftId);
      const backupStatus = await removeDraftBackup(existingDraft.draft_id);

      if (backupStatus.status === 'failed') {
        throw new Error(backupStatus.errorMessage || 'Failed to remove the lesson.script.md backup.');
      }

      const nextWorkspaceSnapshot = await persist(() => {
        runStatement(database, 'DELETE FROM lesson_versions WHERE draft_id = ?', [draftId]);
        runStatement(database, 'DELETE FROM lesson_drafts WHERE draft_id = ?', [draftId]);

        const nextDraft = readDraftSummaries(database)[0]?.draftId || '';
        return readWorkspaceSnapshotWithRecovery(nextDraft);
      });

      nextWorkspaceSnapshot.backupStatus = backupStatus;
      return nextWorkspaceSnapshot;
    },
    async publishLessonDraft(draftId) {
      return persist(() => {
        const existingDraft = readDraftSourceMarkdown(database, draftId);

        runStatement(
          database,
          `INSERT INTO lesson_versions (version_id, draft_id, version_kind, source_markdown, created_at)
           VALUES (?, ?, ?, ?, ?)`,
          [
            createOpaqueId('version'),
            draftId,
            'publish',
            existingDraft.source_markdown,
            readTimestamp()
          ]
        );

        return readWorkspaceSnapshotWithRecovery(draftId);
      });
    },
    async restoreLessonDraftVersion({ draftId, versionId }) {
      const nextWorkspaceSnapshot = await persist(() => {
        const existingDraft = readDraftSourceMarkdown(database, draftId);
        const versionRows = readRows(
          database,
          `SELECT source_markdown
           FROM lesson_versions
           WHERE draft_id = ? AND version_id = ?`,
          [draftId, versionId]
        );

        if (!versionRows.length) {
          throw new Error(`Version "${versionId}" was not found for draft "${draftId}".`);
        }

        upsertDraftFromMarkdown(database, {
          draftId,
          sourceMarkdown: versionRows[0].source_markdown,
          sourceOrigin: existingDraft.source_origin,
          shippedLessonId: existingDraft.shipped_lesson_id || null,
          createdAt: existingDraft.created_at
        });

        return readWorkspaceSnapshotWithRecovery(draftId);
      });

      nextWorkspaceSnapshot.backupStatus = await writeSelectedDraftBackup(nextWorkspaceSnapshot);
      return nextWorkspaceSnapshot;
    }
  };
}

export async function readPersistedPlayableDraftOverride({
  ownerWindow,
  requestedLessonId = '',
  shippedLessonId = ''
}) {
  if (!ownerWindow) {
    return null;
  }

  const persistedDatabaseState = await readPersistedDatabaseState(ownerWindow);

  if (!persistedDatabaseState.storedBytes) {
    return null;
  }

  const SQL = await createSqlRuntime();
  const { database, openErrorMessage } = openPersistedDatabase(SQL, persistedDatabaseState.storedBytes);

  if (openErrorMessage) {
    database.close();
    return null;
  }

  try {
    createSchema(database);

    return buildPlayableDraftOverrideSummary(
      readPlayableDraftOverrideRowForSelection(database, {
        requestedLessonId,
        shippedLessonId
      })
    );
  } finally {
    database.close();
  }
}
