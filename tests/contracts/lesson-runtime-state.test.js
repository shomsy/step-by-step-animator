import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LESSON_RUNTIME_SOURCE,
  LESSON_RUNTIME_SOURCE_LABELS,
  readAuthoringCompileState,
  readAuthoringPublishState,
  readAuthoringSaveState,
  readLessonRuntimeLabel,
  readLessonRuntimeTone,
  readPlayableDraftRuntimeLabel,
} from '../../system/author-lessons/lesson-runtime-state.js';

test('lesson runtime state labels remain explicit and stable', () => {
  assert.deepEqual(LESSON_RUNTIME_SOURCE, {
    PUBLISHED: 'published',
    PLAYABLE_DRAFT: 'playable-draft',
    PLAYABLE_DRAFT_BACKUP: 'playable-draft-backup',
    BROKEN_DRAFT_FALLBACK: 'broken-draft-fallback',
  });

  assert.deepEqual(LESSON_RUNTIME_SOURCE_LABELS, {
    PUBLISHED: 'Published Lesson · shipped package',
    PLAYABLE_DRAFT: 'Playable Draft',
    PLAYABLE_DRAFT_BACKUP: 'Playable Draft Backup',
    BROKEN_DRAFT_FALLBACK: 'Broken Draft Fallback · Shipped lesson package',
  });

  assert.equal(
    readPlayableDraftRuntimeLabel('2026-03-30 01:15 CEST'),
    'Playable Draft · SQLite · 2026-03-30 01:15 CEST'
  );
  assert.equal(
    readPlayableDraftRuntimeLabel('2026-03-31 10:45 CEST', 'lesson.script.md backup'),
    'Playable Draft · lesson.script.md backup · 2026-03-31 10:45 CEST'
  );
  assert.equal(
    readLessonRuntimeLabel({
      lessonRuntimeSource: LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT,
    }),
    'Playable Draft'
  );
  assert.equal(
    readLessonRuntimeLabel({
      lessonRuntimeSource: LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT_BACKUP,
    }),
    'Playable Draft Backup'
  );
  assert.equal(
    readLessonRuntimeTone({
      lessonRuntimeSource: LESSON_RUNTIME_SOURCE.BROKEN_DRAFT_FALLBACK,
    }),
    'warning'
  );
  assert.equal(
    readLessonRuntimeTone({
      lessonRuntimeSource: LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT_BACKUP,
    }),
    'warning'
  );
});

test('authoring state helpers distinguish saved, playable, published, and recovery states', () => {
  assert.deepEqual(
    readAuthoringSaveState({
      hasDraft: false,
      dirty: false,
    }),
    {
      label: 'No Draft',
      tone: 'muted',
    }
  );

  assert.deepEqual(
    readAuthoringSaveState({
      hasDraft: true,
      dirty: true,
    }),
    {
      label: 'Unsaved Changes',
      tone: 'warning',
    }
  );

  assert.deepEqual(
    readAuthoringSaveState({
      hasDraft: true,
      dirty: false,
    }),
    {
      label: 'Draft Saved',
      tone: 'success',
    }
  );

  assert.deepEqual(
    readAuthoringCompileState({
      hasDraft: true,
      analysisPending: false,
      parseErrorMessage: '',
      compileErrorMessage: '',
      compiledLesson: { steps: [{}, {}] },
      hasShippedFallback: false,
    }),
    {
      label: 'Playable Draft · 2 steps',
      tone: 'success',
    }
  );

  assert.deepEqual(
    readAuthoringCompileState({
      hasDraft: true,
      analysisPending: false,
      parseErrorMessage: 'Broken parse',
      compileErrorMessage: '',
      compiledLesson: null,
      hasShippedFallback: true,
    }),
    {
      label: 'Broken Draft Fallback',
      tone: 'danger',
    }
  );

  assert.deepEqual(
    readAuthoringPublishState({
      hasDraft: true,
      versionCount: 0,
    }),
    {
      label: 'Not Published',
      tone: 'muted',
    }
  );

  assert.deepEqual(
    readAuthoringPublishState({
      hasDraft: true,
      versionCount: 1,
    }),
    {
      label: 'Published Lesson',
      tone: 'success',
    }
  );
});
