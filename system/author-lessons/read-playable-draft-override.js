import { compileLessonScript } from '../lesson-engine/compile-lesson-script.js';
import { readPersistedPlayableDraftOverride } from './open-authoring-sqlite.js';
import { readPersistedPlayableDraftBackup } from './open-authoring-lesson-backup.js';
import {
  LESSON_RUNTIME_SOURCE,
  LESSON_RUNTIME_SOURCE_LABELS,
  readPlayableDraftRuntimeLabel
} from './lesson-runtime-state.js';

function readGoalImageOverride(shippedLesson) {
  return typeof shippedLesson?.goalImageSrc === 'string'
    ? shippedLesson.goalImageSrc
    : '';
}

function normalizeLessonSelectionId(value) {
  return String(value || '').trim();
}

function annotateLessonRuntime(lesson, lessonRuntimeSource, lessonRuntimeSourceLabel, sourceDraftId = '') {
  return {
    ...lesson,
    lessonRuntimeSource,
    lessonRuntimeSourceLabel,
    ...(sourceDraftId ? { sourceDraftId } : {})
  };
}

function compileDraftOverride({
  draftOverride,
  expectedLessonId,
  hasShippedFallback,
  shippedLesson,
  lessonRuntimeSource,
  lessonRuntimeSourceLabel
}) {
  if (!draftOverride?.sourceMarkdown) {
    return null;
  }

  const compiledDraftLesson = compileLessonScript({
    scriptMarkdown: draftOverride.sourceMarkdown,
    goalImageSrc: hasShippedFallback ? readGoalImageOverride(shippedLesson) : ''
  });

  if (compiledDraftLesson.lessonId !== expectedLessonId) {
    if (!hasShippedFallback) {
      return null;
    }

    return annotateLessonRuntime(
      shippedLesson,
      LESSON_RUNTIME_SOURCE.BROKEN_DRAFT_FALLBACK,
      LESSON_RUNTIME_SOURCE_LABELS.BROKEN_DRAFT_FALLBACK,
      draftOverride.draftId
    );
  }

  return annotateLessonRuntime(
    compiledDraftLesson,
    lessonRuntimeSource,
    lessonRuntimeSourceLabel,
    draftOverride.draftId
  );
}

export async function readPlayableDraftOverride({
  ownerWindow,
  requestedLessonId = '',
  shippedLessonId,
  shippedLesson
}) {
  const expectedLessonId = normalizeLessonSelectionId(shippedLessonId) || normalizeLessonSelectionId(requestedLessonId);
  const hasShippedFallback = normalizeLessonSelectionId(shippedLessonId) && shippedLesson;

  if (!ownerWindow || !expectedLessonId) {
    return null;
  }

  try {
    const draftOverride = await readPersistedPlayableDraftOverride({
      ownerWindow,
      requestedLessonId,
      shippedLessonId
    });

    if (!draftOverride?.sourceMarkdown) {
      throw new Error('No SQLite draft override was found.');
    }

    try {
      return compileDraftOverride({
        draftOverride,
        expectedLessonId,
        hasShippedFallback,
        shippedLesson,
        lessonRuntimeSource: LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT,
        lessonRuntimeSourceLabel: readPlayableDraftRuntimeLabel(draftOverride.updatedAt, 'SQLite')
      });
    } catch {
      if (!hasShippedFallback) {
        return null;
      }

      return annotateLessonRuntime(
        shippedLesson,
        LESSON_RUNTIME_SOURCE.BROKEN_DRAFT_FALLBACK,
        LESSON_RUNTIME_SOURCE_LABELS.BROKEN_DRAFT_FALLBACK,
        draftOverride.draftId
      );
    }
  } catch {
    try {
      const draftBackup = await readPersistedPlayableDraftBackup({
        ownerWindow,
        requestedLessonId,
        shippedLessonId
      });

      if (!draftBackup?.sourceMarkdown || draftBackup.tracksShippedSource) {
        return null;
      }

      try {
        return compileDraftOverride({
          draftOverride: draftBackup,
          expectedLessonId,
          hasShippedFallback,
          shippedLesson,
          lessonRuntimeSource: LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT_BACKUP,
          lessonRuntimeSourceLabel: readPlayableDraftRuntimeLabel(
            draftBackup.updatedAt,
            'lesson.script.md backup'
          )
        });
      } catch {
        if (!hasShippedFallback) {
          return null;
        }

        return annotateLessonRuntime(
          shippedLesson,
          LESSON_RUNTIME_SOURCE.BROKEN_DRAFT_FALLBACK,
          LESSON_RUNTIME_SOURCE_LABELS.BROKEN_DRAFT_FALLBACK,
          draftBackup.draftId
        );
      }
    } catch {
      return null;
    }
  }
}
