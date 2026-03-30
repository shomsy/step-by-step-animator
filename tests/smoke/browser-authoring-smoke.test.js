import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { createServer } from 'vite';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(currentDir, '../../');

async function waitForCondition(readCondition, description, timeoutMs = 10000) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (await readCondition()) {
      return;
    }

    await delay(100);
  }

  throw new Error(`Timed out waiting for ${description}.`);
}

async function openPopoverAndClick(page, buttonSelector, menuSelector, itemSelector) {
  await page.click(buttonSelector);
  await waitForCondition(
    async () => page.$eval(menuSelector, element => !element.hasAttribute('hidden')).catch(() => false),
    `popover menu ${menuSelector}`
  );
  await page.click(itemSelector);
}

async function setEditorCursorBeforeFirstScene(page) {
  await page.$eval('#authoringScriptEditor', element => {
    if (!(element instanceof HTMLElement) || !element.authoringEditor) {
      throw new Error('Expected the CodeMirror authoring editor host.');
    }

    const value = element.authoringEditor.getValue();
    const sceneMarkerIndex = value.indexOf('\n## Scene:');
    const cursor = sceneMarkerIndex >= 0 ? sceneMarkerIndex : value.length;
    element.authoringEditor.focus();
    element.authoringEditor.setSelectionRange(cursor, cursor);
  });
}

async function setEditorCursorOnBlankLineAfterMarker(page, markerText) {
  await page.$eval('#authoringScriptEditor', (element, marker) => {
    if (!(element instanceof HTMLElement) || !element.authoringEditor) {
      throw new Error('Expected the CodeMirror authoring editor host.');
    }

    const value = element.authoringEditor.getValue();
    const markerIndex = value.indexOf(marker);

    if (markerIndex < 0) {
      throw new Error(`Could not find marker "${marker}".`);
    }

    const lineEnd = value.indexOf('\n', markerIndex);
    const cursor = lineEnd >= 0 ? lineEnd + 1 : value.length;

    element.authoringEditor.focus();
    element.authoringEditor.setSelectionRange(cursor, cursor);
  }, markerText);
}

async function readEditorCursorSnapshot(page) {
  return page.$eval('#authoringScriptEditor', element => {
    if (!(element instanceof HTMLElement) || !element.authoringEditor) {
      throw new Error('Expected the CodeMirror authoring editor host.');
    }

    const value = element.authoringEditor.getValue();
    const selectionStart = element.authoringEditor.getSelectionStart();
    const lineStart = value.lastIndexOf('\n', Math.max(0, selectionStart - 1)) + 1;
    const lineEndIndex = value.indexOf('\n', selectionStart);
    const lineEnd = lineEndIndex >= 0 ? lineEndIndex : value.length;
    const lineText = value.slice(lineStart, lineEnd);
    const lineNumber = value.slice(0, selectionStart).split('\n').length;

    return {
      value,
      selectionStart,
      lineNumber,
      lineText
    };
  });
}

async function replaceEditorSelectionText(page, nextText) {
  await page.$eval('#authoringScriptEditor', (element, text) => {
    if (!(element instanceof HTMLElement) || !element.authoringEditor) {
      throw new Error('Expected the CodeMirror authoring editor host.');
    }

    element.authoringEditor.focus();
    const currentValue = element.authoringEditor.getValue();
    element.authoringEditor.setSelectionRange(0, currentValue.length);
    element.authoringEditor.pasteText(text);
  }, nextText);
}

async function readPairedDraftSourceMarkdown(page, shippedLessonId) {
  return page.evaluate(async ({ repoPath, lessonId }) => {
    const [{ openAuthoringSqlite }, { readShippedLessonScripts }] = await Promise.all([
      import(`/@fs${repoPath}/system/author-lessons/open-authoring-sqlite.js`),
      import(`/@fs${repoPath}/system/author-lessons/read-shipped-lesson-scripts.js`)
    ]);
    const shippedLessons = await readShippedLessonScripts();
    const store = await openAuthoringSqlite({
      ownerWindow: window,
      shippedLessons
    });
    const snapshot = await store.openDraftForShippedLesson(lessonId);
    const draftSourceMarkdown = snapshot.selectedDraft?.sourceMarkdown || '';

    if (!draftSourceMarkdown) {
      throw new Error(`Expected a paired draft source for "${lessonId}".`);
    }

    return draftSourceMarkdown;
  }, {
    repoPath: repoRoot,
    lessonId: shippedLessonId
  });
}

async function savePairedDraftSourceMarkdown(page, shippedLessonId, sourceMarkdown) {
  return page.evaluate(async ({ repoPath, lessonId, nextSourceMarkdown }) => {
    const [{ openAuthoringSqlite }, { readShippedLessonScripts }] = await Promise.all([
      import(`/@fs${repoPath}/system/author-lessons/open-authoring-sqlite.js`),
      import(`/@fs${repoPath}/system/author-lessons/read-shipped-lesson-scripts.js`)
    ]);
    const shippedLessons = await readShippedLessonScripts();
    const store = await openAuthoringSqlite({
      ownerWindow: window,
      shippedLessons
    });
    const snapshot = await store.openDraftForShippedLesson(lessonId);
    const draftId = snapshot.selectedDraft?.draftId || '';

    if (!draftId) {
      throw new Error(`Expected a paired draft id for "${lessonId}".`);
    }

    const savedSnapshot = await store.saveLessonDraft({
      draftId,
      sourceMarkdown: nextSourceMarkdown
    });

    return savedSnapshot.selectedDraft?.sourceMarkdown || '';
  }, {
    repoPath: repoRoot,
    lessonId: shippedLessonId,
    nextSourceMarkdown: sourceMarkdown
  });
}

async function readPlayerSelectionSnapshot(page, lessonId) {
  return page.evaluate(async ({ repoPath, lessonId }) => {
    const [{ selectLessonFromLocation }, { readPlayableDraftOverride }] = await Promise.all([
      import(`/@fs${repoPath}/system/animator-engine/choose-lesson/select-lesson-from-location.js`),
      import(`/@fs${repoPath}/system/author-lessons/read-playable-draft-override.js`)
    ]);
    const selection = await selectLessonFromLocation({
      ownerLocation: {
        href: `${window.location.origin}/?lesson=${lessonId}`
      },
      ownerWindow: window,
      resolveDraftLessonOverride: readPlayableDraftOverride
    });

    return {
      lessonId: selection.lesson?.lessonId || '',
      lessonTitle: selection.lesson?.lessonTitle || '',
      firstStepTitle: selection.lesson?.steps?.[0]?.title || '',
      runtimeSource: selection.lesson?.lessonRuntimeSource || 'published',
      runtimeLabel: selection.lesson?.lessonRuntimeSourceLabel || 'Published Lesson · shipped package',
      lessonOptions: selection.lessons.map(lesson => ({
        lessonId: lesson.lessonId,
        lessonTitle: lesson.lessonTitle
      }))
    };
  }, {
    repoPath: repoRoot,
    lessonId
  });
}

async function setMetadataValue(page, fieldName, nextValue) {
  await page.$eval(`[data-metadata-field="${fieldName}"]`, (element, value) => {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)) {
      throw new Error(`Expected a metadata control for ${value}.`);
    }

    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }, nextValue);
}

async function readMetadataValue(page, fieldName) {
  return page.$eval(`[data-metadata-field="${fieldName}"]`, element => {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)) {
      throw new Error('Expected a metadata control.');
    }

    return element.value;
  });
}

function buildLargeLessonBody(stepCount = 140) {
  return Array.from({ length: stepCount }, (_, index) => {
    const sequence = String(index + 1).padStart(3, '0');
    const stepId = `bulk-step-${sequence}`;

    return [
      `# Step: ${stepId}`,
      `title: Bulk Step ${sequence}`,
      `summary: Keep the writer flow stable during very large paste operations for step ${sequence}.`,
      `intent: Persist a large lesson body without truncating after early steps.`,
      '',
      `## Scene: ${stepId}-scene`,
      '',
      '### Narration',
      `Bulk narration for ${stepId}.`,
      '',
      '### Show Code: html',
      '```html',
      `<div class="${stepId}">Bulk ${sequence}</div>`,
      '```',
      '',
      '### Show Code: css',
      '```css',
      `.${stepId} {`,
      `  color: rgb(${(index * 13) % 255}, ${(index * 29) % 255}, ${(index * 47) % 255});`,
      '}',
      '```',
      ''
    ].join('\n');
  }).join('\n');
}

function buildLargeLessonSource(stepCount = 158) {
  return [
    '---',
    'schemaVersion: 1',
    'lessonId: imported-large-lesson',
    'lessonTitle: Imported Large Lesson',
    'lessonIntro: Pasted as a full lesson source through Write Mode.',
    'status: draft',
    'courseId: step-by-step-animator',
    'order: 77',
    'artifacts:',
    '  - artifactId: html',
    '    language: html',
    '    label: index.html',
    '    isPrimary: true',
    '  - artifactId: css',
    '    language: css',
    '    label: style.css',
    '    isPrimary: false',
    'preview:',
    '  type: dom',
    '  title: Imported lesson preview',
    '  address: browser://imported-large-lesson-preview',
    '---',
    buildLargeLessonBody(stepCount)
  ].join('\n');
}

function buildSyntheticLessonSource({
  lessonId,
  lessonTitle,
  stepTitle
}) {
  return [
    '---',
    'schemaVersion: 1',
    `lessonId: ${lessonId}`,
    `lessonTitle: ${lessonTitle}`,
    'lessonIntro: Synthetic authoring-store regression coverage.',
    'status: draft',
    'courseId: step-by-step-animator',
    'order: 1',
    'artifacts:',
    '  - artifactId: html',
    '    language: html',
    '    label: index.html',
    '    isPrimary: true',
    'preview:',
    '  type: dom',
    `  title: ${lessonTitle} Preview`,
    `  address: browser://${lessonId}-preview`,
    'goal:',
    `  title: ${lessonTitle} Goal`,
    '---',
    '',
    '# Step: synthetic-step',
    `title: ${stepTitle}`,
    'summary: Keep paired draft refresh behavior deterministic.',
    'intent: Refresh untouched paired drafts and preserve edited paired drafts.',
    '',
    '## Scene: synthetic-scene',
    '',
    '### Narration',
    'Synthetic narration for authoring-store regression coverage.',
    '',
    '### Show Code: html',
    '```html',
    `<div class="${lessonId}">${stepTitle}</div>`,
    '```',
    ''
  ].join('\n');
}

test('browser authoring smoke covers V2 writer body view, metadata drawer, preview sync, and validation jump flow', { timeout: 60000 }, async () => {
  const server = await createServer({
    configFile: path.resolve(repoRoot, 'vite.config.js'),
    clearScreen: false,
    logLevel: 'error',
    server: {
      host: '127.0.0.1',
      port: 4174,
      strictPort: false
    }
  });

  let browser;

  try {
    await server.listen();

    const appUrl = server.resolvedUrls?.local?.find(url => url.startsWith('http://127.0.0.1'))
      || server.resolvedUrls?.local?.[0];

    assert.ok(appUrl, 'Vite dev server did not expose a local URL.');

    browser = await puppeteer.launch({
      args: ['--disable-setuid-sandbox', '--no-sandbox'],
      headless: true
    });

    const page = await browser.newPage();
    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', message => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });
    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });
    page.on('dialog', dialog => {
      void dialog.accept();
    });

    await page.goto(`${appUrl}?workspace=authoring`, { waitUntil: 'domcontentloaded' });

    await waitForCondition(
      async () => page.$('#authoringScriptEditor').then(Boolean),
      'the authoring writer workspace'
    );

    await openPopoverAndClick(page, '#authoringMoreBtn', '#authoringMoreMenu', '[data-action="new-draft"]');

    await waitForCondition(
      async () => page.$eval('#authoringLessonTitle', element => element.textContent?.includes('New Lesson') || false),
      'the new draft to open'
    );

    await waitForCondition(
      async () => page.evaluate(() => {
        const editor = document.querySelector('#authoringScriptEditor');
        return editor instanceof HTMLElement
          && editor.dataset.editorOwner === 'CodeMirror'
          && editor.authoringEditor.getValue().startsWith('# Step:')
          && !editor.authoringEditor.getValue().includes('lessonId:');
      }),
      'the writer body view to hide frontmatter and open on the first step through CodeMirror'
    );

    await waitForCondition(
      async () => page.evaluate(() => {
        const compileCard = document.querySelector('#authoringCompileStatus');
        const validationCard = document.querySelector('#authoringValidation');
        const previewCard = document.querySelector('#authoringPreviewCard');
        const snapshotTabs = document.querySelector('#authoringSnapshotTabs');
        return Boolean(compileCard && validationCard && previewCard && snapshotTabs);
      }),
      'the right inspector to render'
    );

    await setEditorCursorBeforeFirstScene(page);
    await page.click('#authoringAddSceneBtn');
    await page.keyboard.type('authoring-smoke-scene');

    await waitForCondition(
      async () => page.$eval('[data-outline-kind="scene"][data-scene-id="authoring-smoke-scene"]', element => Boolean(element)).catch(() => false),
      'the outline to reflect the new scene id'
    );

    const firstSceneId = await page.$eval('[data-outline-kind="scene"]', button => {
      if (!(button instanceof HTMLElement)) {
        throw new Error('Expected the first scene outline button.');
      }

      return button.dataset.sceneId || '';
    });
    const firstStepId = await page.$eval('[data-outline-kind="step"]', button => {
      if (!(button instanceof HTMLElement)) {
        throw new Error('Expected the first step outline button.');
      }

      return button.dataset.stepId || '';
    });

    await page.click('[data-outline-kind="scene"][data-scene-id="authoring-smoke-scene"]');
    await waitForCondition(
      async () => {
        const cursor = await readEditorCursorSnapshot(page);
        return cursor.lineText === '## Scene: authoring-smoke-scene';
      },
      'the outline scene button to jump to the exact scene heading'
    );

    await page.click(`[data-outline-kind="step"][data-step-id="${firstStepId}"]`);
    await waitForCondition(
      async () => {
        const cursor = await readEditorCursorSnapshot(page);
        return cursor.lineText === `# Step: ${firstStepId}`;
      },
      'the outline step button to jump to the exact step heading'
    );

    await setEditorCursorOnBlankLineAfterMarker(page, '## Scene: authoring-smoke-scene');
    await page.keyboard.type('/');
    await waitForCondition(
      async () => page.$eval('#authoringInsertMenu', element => !element.hidden).catch(() => false),
      'the slash-triggered insert menu for the new scene'
    );
    const slashMenuLabels = await page.$$eval('#authoringInsertMenu .authoring-popover-item strong', items => items.map(item => item.textContent?.trim() || ''));
    assert.ok(slashMenuLabels.includes('Insert Narration'));
    assert.ok(slashMenuLabels.includes('Insert Show Code → HTML'));
    assert.ok(!slashMenuLabels.includes('Insert Step'));

    await page.$eval('[data-action="insert-narration"]', element => {
      if (!(element instanceof HTMLElement)) {
        throw new Error('Expected the narration insert action.');
      }

      element.click();
    });
    await waitForCondition(
      async () => {
        const editor = await readEditorCursorSnapshot(page);
        return editor.value.includes('## Scene: authoring-smoke-scene\n### Narration');
      },
      'the slash insert flow to add the narration template'
    );
    await page.keyboard.type('Prvo pravimo novu scenu u writer flow-u.');

    await page.$eval('#authoringInsertBtn', element => {
      if (!(element instanceof HTMLElement)) {
        throw new Error('Expected the insert button.');
      }

      element.click();
    });
    await waitForCondition(
      async () => page.$eval('#authoringInsertMenu', element => !element.hidden).catch(() => false),
      'the contextual code insert menu'
    );
    await page.$eval('[data-action="insert-show-code:html"]', element => {
      if (!(element instanceof HTMLElement)) {
        throw new Error('Expected the HTML insert action.');
      }

      element.click();
    });
    await page.keyboard.type('<div class="smoke-card">Smoke</div>');

    await waitForCondition(
      async () => page.$eval('#authoringCompileChip', element => element.textContent?.includes('Playable Draft') || false),
      'the script to compile cleanly'
    );

    await waitForCondition(
      async () => page.$eval('#authoringSaveState', element => element.textContent?.includes('Unsaved Changes') || false),
      'the draft save state to switch to unsaved changes after editing'
    );

    await page.click(`[data-outline-kind="scene"][data-scene-id="${firstSceneId}"]`);
    await waitForCondition(
      async () => page.$eval('#authoringPreviewContext', (element, sceneId) => element.textContent?.includes(sceneId) || false, firstSceneId),
      'the preview context to follow the first scene'
    );
    await waitForCondition(
      async () => page.$eval('#authoringPreviewFrame', frame => !(frame.getAttribute('srcdoc') || '').includes('smoke-card')),
      'the preview to roll back to the first scene snapshot'
    );

    await page.click('[data-outline-kind="scene"][data-scene-id="authoring-smoke-scene"]');
    await waitForCondition(
      async () => page.$eval('#authoringPreviewContext', element => element.textContent?.includes('authoring-smoke-scene') || false),
      'the preview context to follow the active smoke scene'
    );
    await waitForCondition(
      async () => page.$eval('#authoringPreviewFrame', frame => (frame.getAttribute('srcdoc') || '').includes('smoke-card')),
      'the preview to follow the active smoke scene state'
    );

    await page.click('#authoringMetadataBtn');
    await waitForCondition(
      async () => page.$('#authoringMetadataDrawer:not([hidden])').then(Boolean),
      'the metadata drawer to open'
    );

    await waitForCondition(
      async () => page.evaluate(() => {
        const lessonIntroEditor = document.querySelector('[data-metadata-prose="lessonIntro"]');
        const goalCaptionEditor = document.querySelector('[data-metadata-prose="goalImageCaption"]');
        return lessonIntroEditor instanceof HTMLElement
          && goalCaptionEditor instanceof HTMLElement
          && lessonIntroEditor.dataset.editorOwner === 'BlockNote'
          && goalCaptionEditor.dataset.editorOwner === 'BlockNote';
      }),
      'the BlockNote prose editors inside the metadata drawer'
    );

    await setMetadataValue(page, 'lessonTitle', 'Authoring Smoke Lesson');
    await setMetadataValue(page, 'lessonId', 'authoring-smoke-lesson');
    await setMetadataValue(page, 'previewTitle', 'Smoke Preview');
    await page.click('[data-action="apply-metadata"]');

    await waitForCondition(
      async () => page.$eval('#authoringLessonTitle', element => element.textContent?.includes('Authoring Smoke Lesson') || false),
      'metadata changes to update the header title'
    );

    await page.keyboard.down('Control');
    await page.keyboard.press('s');
    await page.keyboard.up('Control');

    await waitForCondition(
      async () => page.$eval('#authoringStatus', element => element.textContent?.includes('Draft saved into SQLite.') || false),
      'the authoring draft to save through the shortcut'
    );

    await waitForCondition(
      async () => page.$eval('#authoringSaveState', element => element.textContent?.includes('Draft Saved') || false),
      'the draft save state to become explicit after save'
    );

    await waitForCondition(
      async () => {
        const activeUrl = new URL(page.url());
        return activeUrl.searchParams.get('workspace') === 'authoring'
          && activeUrl.searchParams.get('lesson') === 'authoring-smoke-lesson';
      },
      'the authoring URL to stay aligned with the active custom draft'
    );

    await waitForCondition(
      async () => page.$eval('#authoringPublishState', element => element.textContent?.includes('Not Published') || false),
      'the draft to remain unpublished before publish is clicked'
    );

    await page.click('#authoringPublishBtn');

    await waitForCondition(
      async () => page.$eval('#authoringPublishState', element => element.textContent?.includes('Published Lesson') || false),
      'the published lesson state to become explicit'
    );

    await waitForCondition(
      async () => page.$eval('#authoringPreviewFrame', frame => (frame.getAttribute('srcdoc') || '').includes('smoke-card')),
      'the preview iframe to stay populated'
    );

    const customPlayerSelection = await readPlayerSelectionSnapshot(page, 'authoring-smoke-lesson');

    assert.equal(customPlayerSelection.lessonId, 'authoring-smoke-lesson');
    assert.equal(customPlayerSelection.lessonTitle, 'Authoring Smoke Lesson');
    assert.equal(customPlayerSelection.runtimeSource, 'playable-draft');
    assert.equal(customPlayerSelection.firstStepTitle, 'Start Here');
    assert.equal(customPlayerSelection.lessonOptions[0]?.lessonId, 'authoring-smoke-lesson');

    await page.click('#authoringMetadataBtn');
    await waitForCondition(
      async () => page.$('#authoringMetadataDrawer:not([hidden])').then(Boolean),
      'the metadata drawer to reopen before the restore test'
    );
    await setMetadataValue(page, 'lessonTitle', 'Authoring Smoke Lesson Recovery');
    await page.click('[data-action="apply-metadata"]');

    await waitForCondition(
      async () => page.$eval('#authoringLessonTitle', element => element.textContent?.includes('Recovery') || false),
      'the recovery title to appear before restoring the published snapshot'
    );

    await page.click('[data-action="close-metadata"]');
    await waitForCondition(
      async () => page.$('#authoringMetadataDrawer[hidden]').then(Boolean),
      'the metadata drawer to close before restoring the published snapshot'
    );

    await openPopoverAndClick(page, '#authoringMoreBtn', '#authoringMoreMenu', '[data-action^="restore-version:"]');

    await waitForCondition(
      async () => page.$eval('#authoringStatus', element => element.textContent?.includes('Published snapshot restored into the draft.') || false),
      'the published snapshot to restore back into the draft'
    );

    await waitForCondition(
      async () => page.$eval('#authoringLessonTitle', element => element.textContent?.includes('Authoring Smoke Lesson') && !element.textContent?.includes('Recovery') || false),
      'the restored title to match the published snapshot again'
    );

    await waitForCondition(
      async () => page.$eval('#authoringSaveState', element => element.textContent?.includes('Draft Saved') || false),
      'the restored draft to return to a saved state'
    );

    await page.reload({ waitUntil: 'domcontentloaded' });

    await waitForCondition(
      async () => page.evaluate(() => {
        const editor = document.querySelector('#authoringScriptEditor');
        return editor instanceof HTMLElement
          && !editor.authoringEditor.getValue().includes('lessonTitle: Authoring Smoke Lesson')
          && editor.authoringEditor.getValue().startsWith('# Step:');
      }),
      'SQLite persistence after reload'
    );

    await waitForCondition(
      async () => page.$eval('#authoringLessonTitle', element => element.textContent?.includes('Authoring Smoke Lesson') || false),
      'the reloaded header title after metadata persistence'
    );

    await waitForCondition(
      async () => page.$$eval('.authoring-outline-scene', items => items.length === 2),
      'the outline after reload'
    );

    await waitForCondition(
      async () => page.$eval('#authoringPreviewFrame', frame => (frame.getAttribute('srcdoc') || '').includes('<!DOCTYPE html>')),
      'the preview iframe after reload'
    );

    await page.click('#authoringMetadataBtn');
    await waitForCondition(
      async () => page.$('#authoringMetadataDrawer:not([hidden])').then(Boolean),
      'the metadata drawer to reopen after reload'
    );
    assert.equal(await readMetadataValue(page, 'lessonTitle'), 'Authoring Smoke Lesson');
    assert.equal(await readMetadataValue(page, 'lessonId'), 'authoring-smoke-lesson');
    await page.click('[data-action="close-metadata"]');

    await page.$eval('#authoringScriptEditor', element => {
      if (!(element instanceof HTMLElement) || !element.authoringEditor) {
        throw new Error('Expected the CodeMirror authoring editor host.');
      }

      const currentValue = element.authoringEditor.getValue();
      element.authoringEditor.focus();
      element.authoringEditor.setSelectionRange(currentValue.length, currentValue.length);
    });
    await page.keyboard.type('\n### Show Code: html\n```html\n<div class="broken-preview">Broken</div>');

    await waitForCondition(
      async () => page.$eval('#authoringCompileChip', element => element.textContent?.includes('Broken Draft') || false),
      'the broken body view source to show a syntax issue'
    );

    await waitForCondition(
      async () => page.$eval('#authoringPreviewFrame', frame => (frame.getAttribute('srcdoc') || '').includes('smoke-card')),
      'the preview iframe to keep the last healthy state while invalid'
    );

    await page.$eval('#authoringScriptEditor', element => {
      if (!(element instanceof HTMLElement) || !element.authoringEditor) {
        throw new Error('Expected the CodeMirror authoring editor host.');
      }

      element.authoringEditor.focus();
      element.authoringEditor.setSelectionRange(0, 0);
    });

    await waitForCondition(
      async () => page.$$('.authoring-validation-item').then(items => items.length > 0),
      'a validation item for the syntax issue'
    );

    await waitForCondition(
      async () => page.$eval('.authoring-validation-item p', element => element.textContent?.includes('duplira sekciju') || false).catch(() => false),
      'a human-readable validation message for the syntax issue'
    );

    await waitForCondition(
      async () => page.evaluate(() => {
        const lines = Array.from(document.querySelectorAll('#authoringScriptEditor .cm-line'));
        const line = lines.find(element => {
          const titledChild = element.querySelector?.('[title]');

          return element.textContent?.trim() === '### Show Code: html'
            && (titledChild?.getAttribute('title') || '').includes('duplira sekciju');
        });

        if (!(line instanceof HTMLElement)) {
          return false;
        }

        return true;
      }).catch(() => false),
      'the linted editor line to carry a human-readable hover title'
    );

    await page.click('.authoring-validation-item');

    await waitForCondition(
      async () => {
        const cursor = await readEditorCursorSnapshot(page);
        return cursor.lineText === '### Show Code: html';
      },
      'the validation click to move the cursor to the failing show code block'
    );

    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleErrors, []);

    await page.close();
  } finally {
    await browser?.close();
    await server.close();
  }
});

test('browser authoring smoke plays a healthy custom draft through the normal player bootstrap', { timeout: 60000 }, async () => {
  const server = await createServer({
    configFile: path.resolve(repoRoot, 'vite.config.js'),
    clearScreen: false,
    logLevel: 'error',
    server: {
      host: '127.0.0.1',
      port: 4175,
      strictPort: false
    }
  });

  let browser;

  try {
    await server.listen();

    const appUrl = server.resolvedUrls?.local?.find(url => url.startsWith('http://127.0.0.1'))
      || server.resolvedUrls?.local?.[0];

    assert.ok(appUrl, 'Vite dev server did not expose a local URL.');

    browser = await puppeteer.launch({
      args: ['--disable-setuid-sandbox', '--no-sandbox'],
      headless: true
    });

    const page = await browser.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    const customLessonSeed = Date.now();
    const customLessonId = `browser-custom-play-smoke-${customLessonSeed}`;
    const customLessonTitle = `Browser Custom Play Smoke ${customLessonSeed}`;

    page.on('console', message => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });
    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });
    page.on('dialog', dialog => {
      void dialog.accept();
    });

    await page.goto(`${appUrl}?workspace=authoring`, { waitUntil: 'domcontentloaded' });

    await waitForCondition(
      async () => page.$('#authoringScriptEditor').then(Boolean),
      'the authoring workspace for custom player bootstrap coverage'
    );

    await openPopoverAndClick(page, '#authoringMoreBtn', '#authoringMoreMenu', '[data-action="new-draft"]');

    await waitForCondition(
      async () => page.$eval('#authoringLessonTitle', element => element.textContent?.includes('New Lesson') || false),
      'the custom bootstrap draft to open'
    );

    await page.click('#authoringMetadataBtn');
    await waitForCondition(
      async () => page.$('#authoringMetadataDrawer:not([hidden])').then(Boolean),
      'the metadata drawer for the custom bootstrap draft'
    );

    await setMetadataValue(page, 'lessonId', customLessonId);
    await setMetadataValue(page, 'lessonTitle', customLessonTitle);
    await setMetadataValue(page, 'previewTitle', `${customLessonTitle} Preview`);
    await page.click('[data-action="apply-metadata"]');

    await waitForCondition(
      async () => page.$eval('#authoringCompileChip', element => element.textContent?.includes('Playable Draft') || false),
      'the custom draft to stay playable after metadata apply'
    );

    await waitForCondition(
      async () => page.$eval('#authoringSaveState', element => element.textContent?.includes('Unsaved Changes') || false),
      'the custom draft to become dirty before player bootstrap save'
    );

    await page.keyboard.down('Control');
    await page.keyboard.press('s');
    await page.keyboard.up('Control');

    await waitForCondition(
      async () => page.$eval('#authoringSaveState', element => element.textContent?.includes('Draft Saved') || false),
      'the custom draft to save before normal player bootstrap'
    );

    await waitForCondition(
      async () => {
        const activeUrl = new URL(page.url());
        return activeUrl.searchParams.get('workspace') === 'authoring'
          && activeUrl.searchParams.get('lesson') === customLessonId;
      },
      'the authoring URL to stay aligned with the custom lesson id'
    );

    await page.goto(`${appUrl}?lesson=${customLessonId}`, { waitUntil: 'domcontentloaded' });

    await waitForCondition(
      async () => page.$eval('#lessonHeading', (element, expectedTitle) => element.textContent?.includes(expectedTitle) || false, customLessonTitle).catch(() => false),
      'the normal player to boot the custom draft title'
    );
    await waitForCondition(
      async () => page.$eval('#lessonRuntimeState', element => element.textContent?.includes('Playable Draft') || false).catch(() => false),
      'the normal player to show playable custom draft state'
    );
    await waitForCondition(
      async () => page.$eval('#lessonPicker', (element, expectedLessonId) => {
        if (!(element instanceof HTMLSelectElement)) {
          return false;
        }

        return element.value === expectedLessonId
          && Array.from(element.options).some(option => option.value === expectedLessonId);
      }, customLessonId).catch(() => false),
      'the lesson picker to include the custom draft id'
    );

    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleErrors, []);

    await page.close();
  } finally {
    await browser?.close();
    await server.close();
  }
});

test('browser authoring smoke keeps very large lesson bodies intact through analysis and save', { timeout: 90000 }, async () => {
  const server = await createServer({
    configFile: path.resolve(repoRoot, 'vite.config.js'),
    clearScreen: false,
    logLevel: 'error',
    server: {
      host: '127.0.0.1',
      port: 4176,
      strictPort: false
    }
  });

  let browser;

  try {
    await server.listen();

    const appUrl = server.resolvedUrls?.local?.find(url => url.startsWith('http://127.0.0.1'))
      || server.resolvedUrls?.local?.[0];

    assert.ok(appUrl, 'Vite dev server did not expose a local URL.');

    browser = await puppeteer.launch({
      args: ['--disable-setuid-sandbox', '--no-sandbox'],
      headless: true
    });

    const page = await browser.newPage();
    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', message => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });
    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });
    page.on('dialog', dialog => {
      void dialog.accept();
    });

    await page.goto(`${appUrl}?workspace=authoring`, { waitUntil: 'domcontentloaded' });

    await waitForCondition(
      async () => page.$('#authoringScriptEditor').then(Boolean),
      'the authoring writer workspace'
    );

    await openPopoverAndClick(page, '#authoringMoreBtn', '#authoringMoreMenu', '[data-action="new-draft"]');

    await waitForCondition(
      async () => page.$eval('#authoringLessonTitle', element => element.textContent?.includes('New Lesson') || false),
      'the new draft to open'
    );

    const largeLessonBody = buildLargeLessonBody();
    const expectedLastStepId = 'bulk-step-140';

    await replaceEditorSelectionText(page, largeLessonBody);

    await waitForCondition(
      async () => page.evaluate(expectedLength => {
        const editor = document.querySelector('#authoringScriptEditor');
        return editor instanceof HTMLElement
          && editor.authoringEditor
          && editor.authoringEditor.getValue().length === expectedLength;
      }, largeLessonBody.length),
      'the large lesson body to remain fully present in the editor'
    );

    await waitForCondition(
      async () => page.$eval('#authoringLessonMeta', element => element.textContent?.includes('140 steps') || false),
      'the deferred analysis to catch up with the large lesson body'
    );

    await waitForCondition(
      async () => page.$eval('#authoringCompileChip', element => element.textContent?.includes('Playable Draft') || false),
      'the large lesson body to compile cleanly'
    );

    await waitForCondition(
      async () => page.$$eval('[data-outline-kind="step"]', buttons => buttons.length === 140),
      'the outline to show every pasted step'
    );

    await waitForCondition(
      async () => page.$eval('[data-outline-kind="step"][data-step-id="bulk-step-140"]', element => Boolean(element)).catch(() => false),
      'the final pasted step to exist in the outline'
    );

    await page.keyboard.down('Control');
    await page.keyboard.press('s');
    await page.keyboard.up('Control');

    await waitForCondition(
      async () => page.$eval('#authoringStatus', element => element.textContent?.includes('Draft saved into SQLite.') || false),
      'the large lesson body to save into SQLite'
    );

    await page.reload({ waitUntil: 'domcontentloaded' });

    await waitForCondition(
      async () => page.evaluate(expectedLength => {
        const editor = document.querySelector('#authoringScriptEditor');
        return editor instanceof HTMLElement
          && editor.authoringEditor
          && editor.authoringEditor.getValue().length === expectedLength;
      }, largeLessonBody.length),
      'the reloaded large lesson body to remain fully present'
    );

    await waitForCondition(
      async () => page.$eval(`[data-outline-kind="step"][data-step-id="${expectedLastStepId}"]`, element => Boolean(element)).catch(() => false),
      'the reloaded outline to keep the final pasted step'
    );

    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleErrors, []);

    await page.close();
  } finally {
    await browser?.close();
    await server.close();
  }
});

test('browser authoring smoke imports a full large lesson source without duplicating hidden frontmatter', { timeout: 90000 }, async () => {
  const server = await createServer({
    configFile: path.resolve(repoRoot, 'vite.config.js'),
    clearScreen: false,
    logLevel: 'error',
    server: {
      host: '127.0.0.1',
      port: 4181,
      strictPort: false
    }
  });

  let browser;

  try {
    await server.listen();

    const appUrl = server.resolvedUrls?.local?.find(url => url.startsWith('http://127.0.0.1'))
      || server.resolvedUrls?.local?.[0];

    assert.ok(appUrl, 'Vite dev server did not expose a local URL.');

    browser = await puppeteer.launch({
      args: ['--disable-setuid-sandbox', '--no-sandbox'],
      headless: true
    });

    const page = await browser.newPage();
    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', message => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });
    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });
    page.on('dialog', dialog => {
      void dialog.accept();
    });

    await page.goto(`${appUrl}?workspace=authoring`, { waitUntil: 'domcontentloaded' });

    await waitForCondition(
      async () => page.$('#authoringScriptEditor').then(Boolean),
      'the authoring writer workspace'
    );

    await openPopoverAndClick(page, '#authoringMoreBtn', '#authoringMoreMenu', '[data-action="new-draft"]');

    await waitForCondition(
      async () => page.$eval('#authoringLessonTitle', element => element.textContent?.includes('New Lesson') || false),
      'the new draft to open'
    );

    const largeLessonSource = buildLargeLessonSource();
    await replaceEditorSelectionText(page, largeLessonSource);

    await waitForCondition(
      async () => page.$eval('#authoringLessonTitle', element => element.textContent?.includes('Imported Large Lesson') || false),
      'the imported lesson title to replace the starter metadata'
    );

    await waitForCondition(
      async () => page.$eval('#authoringLessonMeta', element => element.textContent?.includes('158 steps') || false),
      'the imported full lesson source to produce the full outline count'
    );

    await waitForCondition(
      async () => page.$eval('#authoringCompileChip', element => element.textContent?.includes('Playable Draft') || false),
      'the imported full lesson source to compile cleanly'
    );

    await waitForCondition(
      async () => page.$$eval('[data-outline-kind="step"]', buttons => buttons.length === 158),
      'the outline to show all imported steps'
    );

    await waitForCondition(
      async () => page.$eval('[data-outline-kind="step"][data-step-id="bulk-step-158"]', element => Boolean(element)).catch(() => false),
      'the final imported step to exist in the outline'
    );

    await waitForCondition(
      async () => page.evaluate(() => {
        const editor = document.querySelector('#authoringScriptEditor');
        const value = editor instanceof HTMLElement && editor.authoringEditor
          ? editor.authoringEditor.getValue()
          : '';

        return value.startsWith('# Step: bulk-step-001')
          && value.includes('# Step: bulk-step-158')
          && !value.includes('schemaVersion:')
          && !value.includes('lessonId: imported-large-lesson');
      }),
      'the editor body to show the imported lesson body without frontmatter duplication'
    );

    await page.keyboard.down('Control');
    await page.keyboard.press('s');
    await page.keyboard.up('Control');

    await waitForCondition(
      async () => page.$eval('#authoringStatus', element => element.textContent?.includes('Draft saved into SQLite.') || false),
      'the imported full lesson source to save into SQLite'
    );

    await page.reload({ waitUntil: 'domcontentloaded' });

    await waitForCondition(
      async () => page.$('#authoringScriptEditor').then(Boolean),
      'the authoring writer workspace after reload'
    );

    await waitForCondition(
      async () => page.$eval('#authoringLessonTitle', element => element.textContent?.includes('Imported Large Lesson') || false),
      'the imported lesson title to persist after reload'
    );

    await waitForCondition(
      async () => page.$eval('[data-outline-kind="step"][data-step-id="bulk-step-158"]', element => Boolean(element)).catch(() => false),
      'the imported final step to persist after reload'
    );

    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleErrors, []);

    await page.close();
  } finally {
    await browser?.close();
    await server.close();
  }
});

test('browser authoring smoke lets the normal player prefer a healthy saved draft and fail closed on a broken one', { timeout: 90000 }, async () => {
  const server = await createServer({
    configFile: path.resolve(repoRoot, 'vite.config.js'),
    clearScreen: false,
    logLevel: 'error',
    server: {
      host: '127.0.0.1',
      port: 4177,
      strictPort: false
    }
  });

  let browser;

  try {
    await server.listen();

    const appUrl = server.resolvedUrls?.local?.find(url => url.startsWith('http://127.0.0.1'))
      || server.resolvedUrls?.local?.[0];

    assert.ok(appUrl, 'Vite dev server did not expose a local URL.');

    browser = await puppeteer.launch({
      args: ['--disable-setuid-sandbox', '--no-sandbox'],
      headless: true
    });

    const page = await browser.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    const savedDraftStepTitle = 'Saved Draft Step Title';
    const shippedStepTitle = 'Start: Empty App Shell';

    page.on('console', message => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });
    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });
    page.on('dialog', dialog => {
      void dialog.accept();
    });

    await page.goto(`${appUrl}?workspace=authoring&lesson=09-human-first-script-demo`, { waitUntil: 'domcontentloaded' });

    await waitForCondition(
      async () => page.$('#authoringScriptEditor').then(Boolean),
      'the authoring writer workspace'
    );

    await waitForCondition(
      async () => page.$eval('#authoringLessonTitle', element => element.textContent?.includes('Human-First Script Demo') || false),
      'the paired 09 draft to open'
    );
    await waitForCondition(
      async () => page.$eval('#authoringScriptEditor', element => {
        if (!(element instanceof HTMLElement) || !element.authoringEditor) {
          throw new Error('Expected the CodeMirror authoring editor host.');
        }

        return element.authoringEditor.getValue().includes('title: Start: Empty App Shell');
      }).catch(() => false),
      'the paired 09 draft body to reach the editor'
    );

    const pairedDraftSource = await readPairedDraftSourceMarkdown(page, '09-human-first-script-demo');
    const healthyDraftSource = pairedDraftSource.replace(
      'title: Start: Empty App Shell',
      'title: Saved Draft Step Title'
    );
    const savedHealthyDraftSource = await savePairedDraftSourceMarkdown(
      page,
      '09-human-first-script-demo',
      healthyDraftSource
    );

    assert.ok(savedHealthyDraftSource.includes('title: Saved Draft Step Title'));

    const healthySelection = await readPlayerSelectionSnapshot(page, '09-human-first-script-demo');

    assert.equal(healthySelection.lessonId, '09-human-first-script-demo');
    assert.equal(healthySelection.firstStepTitle, savedDraftStepTitle);
    assert.equal(healthySelection.runtimeSource, 'playable-draft');
    assert.match(healthySelection.runtimeLabel, /Playable Draft/);

    await page.goto(`${appUrl}?workspace=authoring&lesson=09-human-first-script-demo`, { waitUntil: 'domcontentloaded' });

    await waitForCondition(
      async () => page.$('#authoringScriptEditor').then(Boolean),
      'the authoring workspace after returning'
    );

    await waitForCondition(
      async () => page.$eval('#authoringScriptEditor', element => {
        if (!(element instanceof HTMLElement) || !element.authoringEditor) {
          throw new Error('Expected the CodeMirror authoring editor host.');
        }

        return element.authoringEditor.getValue().includes('title: Saved Draft Step Title');
      }).catch(() => false),
      'the edited 09 draft to reopen'
    );

    const savedBrokenDraftSource = await savePairedDraftSourceMarkdown(
      page,
      '09-human-first-script-demo',
      'broken lesson body'
    );

    assert.equal(savedBrokenDraftSource, 'broken lesson body');

    const brokenSelection = await readPlayerSelectionSnapshot(page, '09-human-first-script-demo');

    assert.equal(brokenSelection.lessonId, '09-human-first-script-demo');
    assert.equal(brokenSelection.firstStepTitle, shippedStepTitle);
    assert.equal(brokenSelection.runtimeSource, 'broken-draft-fallback');
    assert.match(brokenSelection.runtimeLabel, /Broken Draft Fallback/);

    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleErrors, []);

    await page.close();
  } finally {
    await browser?.close();
    await server.close();
  }
});

test('browser authoring smoke refreshes untouched paired drafts from shipped updates without overwriting edited paired drafts', { timeout: 90000 }, async () => {
  const server = await createServer({
    configFile: path.resolve(repoRoot, 'vite.config.js'),
    clearScreen: false,
    logLevel: 'error',
    server: {
      host: '127.0.0.1',
      port: 4178,
      strictPort: false
    }
  });

  let browser;

  try {
    await server.listen();

    const appUrl = server.resolvedUrls?.local?.find(url => url.startsWith('http://127.0.0.1'))
      || server.resolvedUrls?.local?.[0];

    assert.ok(appUrl, 'Vite dev server did not expose a local URL.');

    browser = await puppeteer.launch({
      args: ['--disable-setuid-sandbox', '--no-sandbox'],
      headless: true
    });

    const page = await browser.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    const lessonId = 'synthetic-refresh-lesson';
    const initialSource = buildSyntheticLessonSource({
      lessonId,
      lessonTitle: 'Synthetic Refresh Lesson',
      stepTitle: 'Initial Shipped Step'
    });
    const updatedSource = buildSyntheticLessonSource({
      lessonId,
      lessonTitle: 'Synthetic Refresh Lesson',
      stepTitle: 'Updated Shipped Step'
    });
    const editedSource = buildSyntheticLessonSource({
      lessonId,
      lessonTitle: 'Synthetic Refresh Lesson',
      stepTitle: 'Edited Draft Step'
    });
    const laterShippedSource = buildSyntheticLessonSource({
      lessonId,
      lessonTitle: 'Synthetic Refresh Lesson',
      stepTitle: 'Later Shipped Step'
    });

    page.on('console', message => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });
    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });

    await page.goto(`${appUrl}?workspace=authoring`, { waitUntil: 'domcontentloaded' });

    const refreshSnapshot = await page.evaluate(async ({
      repoPath,
      lessonId: syntheticLessonId,
      firstSourceMarkdown,
      secondSourceMarkdown,
      editedSourceMarkdown,
      laterSourceMarkdown
    }) => {
      const { openAuthoringSqlite } = await import(`/@fs${repoPath}/system/author-lessons/open-authoring-sqlite.js`);

      async function openStore(sourceMarkdown) {
        return openAuthoringSqlite({
          ownerWindow: window,
          shippedLessons: [
            {
              lessonId: syntheticLessonId,
              lessonTitle: 'Synthetic Refresh Lesson',
              sourceMarkdown
            }
          ]
        });
      }

      const firstStore = await openStore(firstSourceMarkdown);
      const firstSnapshot = await firstStore.openDraftForShippedLesson(syntheticLessonId);
      const firstDraftId = firstSnapshot.selectedDraft?.draftId || '';
      const firstDraftSource = firstSnapshot.selectedDraft?.sourceMarkdown || '';

      const secondStore = await openStore(secondSourceMarkdown);
      const refreshedSnapshot = await secondStore.openDraftForShippedLesson(syntheticLessonId);
      const refreshedDraftSource = refreshedSnapshot.selectedDraft?.sourceMarkdown || '';
      const refreshedDraftId = refreshedSnapshot.selectedDraft?.draftId || '';

      const editedSnapshot = await secondStore.saveLessonDraft({
        draftId: refreshedDraftId,
        sourceMarkdown: editedSourceMarkdown
      });

      const thirdStore = await openStore(laterSourceMarkdown);
      const preservedSnapshot = await thirdStore.openDraftForShippedLesson(syntheticLessonId);

      return {
        firstDraftId,
        refreshedDraftId,
        preservedDraftId: preservedSnapshot.selectedDraft?.draftId || '',
        firstDraftSource,
        refreshedDraftSource,
        editedDraftSource: editedSnapshot.selectedDraft?.sourceMarkdown || '',
        preservedDraftSource: preservedSnapshot.selectedDraft?.sourceMarkdown || ''
      };
    }, {
      repoPath: repoRoot,
      lessonId,
      firstSourceMarkdown: initialSource,
      secondSourceMarkdown: updatedSource,
      editedSourceMarkdown: editedSource,
      laterSourceMarkdown: laterShippedSource
    });

    assert.equal(refreshSnapshot.firstDraftId, refreshSnapshot.refreshedDraftId);
    assert.equal(refreshSnapshot.firstDraftId, refreshSnapshot.preservedDraftId);
    assert.match(refreshSnapshot.firstDraftSource, /Initial Shipped Step/);
    assert.match(refreshSnapshot.refreshedDraftSource, /Updated Shipped Step/);
    assert.match(refreshSnapshot.editedDraftSource, /Edited Draft Step/);
    assert.match(refreshSnapshot.preservedDraftSource, /Edited Draft Step/);
    assert.doesNotMatch(refreshSnapshot.preservedDraftSource, /Later Shipped Step/);

    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleErrors, []);

    await page.close();
  } finally {
    await browser?.close();
    await server.close();
  }
});

test('browser authoring smoke ignores an unpaired custom draft with the same lesson id during normal player selection', { timeout: 90000 }, async () => {
  const server = await createServer({
    configFile: path.resolve(repoRoot, 'vite.config.js'),
    clearScreen: false,
    logLevel: 'error',
    server: {
      host: '127.0.0.1',
      port: 4179,
      strictPort: false
    }
  });

  let browser;

  try {
    await server.listen();

    const appUrl = server.resolvedUrls?.local?.find(url => url.startsWith('http://127.0.0.1'))
      || server.resolvedUrls?.local?.[0];

    assert.ok(appUrl, 'Vite dev server did not expose a local URL.');

    browser = await puppeteer.launch({
      args: ['--disable-setuid-sandbox', '--no-sandbox'],
      headless: true
    });

    const page = await browser.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    const shippedStepTitle = 'Start: Empty App Shell';
    const unpairedDraftStepTitle = 'Custom Same Id Draft Step';

    page.on('console', message => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });
    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });

    await page.goto(`${appUrl}?workspace=authoring`, { waitUntil: 'domcontentloaded' });

    const pairedDraftSource = await readPairedDraftSourceMarkdown(page, '09-human-first-script-demo');
    const unpairedDraftSource = pairedDraftSource.replace(
      'title: Start: Empty App Shell',
      `title: ${unpairedDraftStepTitle}`
    );

    await page.evaluate(async ({
      repoPath,
      sourceMarkdown
    }) => {
      const [{ openAuthoringSqlite }, { readShippedLessonScripts }] = await Promise.all([
        import(`/@fs${repoPath}/system/author-lessons/open-authoring-sqlite.js`),
        import(`/@fs${repoPath}/system/author-lessons/read-shipped-lesson-scripts.js`)
      ]);
      const shippedLessons = await readShippedLessonScripts();
      const store = await openAuthoringSqlite({
        ownerWindow: window,
        shippedLessons
      });
      const pairedSnapshot = await store.openDraftForShippedLesson('09-human-first-script-demo');
      const pairedDraftId = pairedSnapshot.selectedDraft?.draftId || '';

      if (!pairedDraftId) {
        throw new Error('Expected the paired draft for 09-human-first-script-demo.');
      }

      await store.deleteLessonDraft(pairedDraftId);

      const createdSnapshot = await store.createLessonDraft();
      const customDraftId = createdSnapshot.selectedDraft?.draftId || '';

      if (!customDraftId) {
        throw new Error('Expected a new custom draft id.');
      }

      await store.saveLessonDraft({
        draftId: customDraftId,
        sourceMarkdown
      });
    }, {
      repoPath: repoRoot,
      sourceMarkdown: unpairedDraftSource
    });

    const selection = await readPlayerSelectionSnapshot(page, '09-human-first-script-demo');

    assert.equal(selection.lessonId, '09-human-first-script-demo');
    assert.equal(selection.firstStepTitle, shippedStepTitle);
    assert.equal(selection.runtimeSource, 'published');
    assert.match(selection.runtimeLabel, /Published Lesson/);

    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleErrors, []);

    await page.close();
  } finally {
    await browser?.close();
    await server.close();
  }
});

test('browser authoring smoke keeps Save store-only while Publish remains the explicit snapshot step', { timeout: 90000 }, async () => {
  const server = await createServer({
    configFile: path.resolve(repoRoot, 'vite.config.js'),
    clearScreen: false,
    logLevel: 'error',
    server: {
      host: '127.0.0.1',
      port: 4180,
      strictPort: false
    }
  });

  let browser;

  try {
    await server.listen();

    const appUrl = server.resolvedUrls?.local?.find(url => url.startsWith('http://127.0.0.1'))
      || server.resolvedUrls?.local?.[0];

    assert.ok(appUrl, 'Vite dev server did not expose a local URL.');

    browser = await puppeteer.launch({
      args: ['--disable-setuid-sandbox', '--no-sandbox'],
      headless: true
    });

    const page = await browser.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    const lessonId = '09-human-first-script-demo';
    const shippedLessonFilePath = path.resolve(
      repoRoot,
      'product/education/lessons/09-human-first-script-demo/source/lesson.script.md'
    );
    const originalShippedSource = await fs.readFile(shippedLessonFilePath, 'utf8');
    const savedDraftStepTitle = 'Store Only Saved Draft Step';

    page.on('console', message => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });
    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });

    await page.goto(`${appUrl}?workspace=authoring&lesson=${lessonId}`, { waitUntil: 'domcontentloaded' });

    await waitForCondition(
      async () => page.$('#authoringScriptEditor').then(Boolean),
      'the authoring workspace for explicit save/publish guardrails'
    );
    await waitForCondition(
      async () => page.$eval('#authoringScriptEditor', element => {
        if (!(element instanceof HTMLElement) || !element.authoringEditor) {
          throw new Error('Expected the CodeMirror authoring editor host.');
        }

        return element.authoringEditor.getValue().includes('title: Start: Empty App Shell');
      }).catch(() => false),
      'the paired 09 draft body before guardrail assertions'
    );

    const pairedDraftSource = await readPairedDraftSourceMarkdown(page, lessonId);
    const storeOnlyDraftSource = pairedDraftSource.replace(
      'title: Start: Empty App Shell',
      `title: ${savedDraftStepTitle}`
    );
    await replaceEditorSelectionText(page, storeOnlyDraftSource);
    await waitForCondition(
      async () => page.$eval('#authoringSaveState', element => element.textContent?.includes('Unsaved Changes') || false).catch(() => false),
      'the draft to become dirty before save'
    );

    await page.click('#authoringSaveDraftBtn');
    await waitForCondition(
      async () => page.$eval('#authoringSaveState', element => element.textContent?.includes('Draft Saved') || false).catch(() => false),
      'the draft to save into the authoring store'
    );

    const playerSelectionAfterSave = await readPlayerSelectionSnapshot(page, lessonId);
    const shippedSourceAfterSave = await fs.readFile(shippedLessonFilePath, 'utf8');
    const editorSnapshotAfterSave = await readEditorCursorSnapshot(page);

    assert.match(editorSnapshotAfterSave.value, /Store Only Saved Draft Step/);
    assert.equal(
      await page.$eval('#authoringPublishState', element => element.textContent?.trim() || ''),
      'Not Published'
    );
    assert.equal(playerSelectionAfterSave.runtimeSource, 'playable-draft');
    assert.equal(playerSelectionAfterSave.firstStepTitle, savedDraftStepTitle);
    assert.equal(shippedSourceAfterSave, originalShippedSource);
    assert.doesNotMatch(shippedSourceAfterSave, /Store Only Saved Draft Step/);

    await page.click('#authoringPublishBtn');
    await waitForCondition(
      async () => page.$eval('#authoringPublishState', element => element.textContent?.includes('Published Lesson') || false).catch(() => false),
      'the publish state to show an explicit published snapshot'
    );

    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleErrors, []);

    await page.close();
  } finally {
    await browser?.close();
    await server.close();
  }
});
