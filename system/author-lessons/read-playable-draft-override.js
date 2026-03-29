import { compileLessonScript } from '../lesson-engine/compile-lesson-script.js';
import { readPersistedPlayableDraftOverride } from './open-authoring-sqlite.js';
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

function annotateLessonRuntime(lesson, lessonRuntimeSource, lessonRuntimeSourceLabel, sourceDraftId = '') {
  return {
    ...lesson,
    lessonRuntimeSource,
    lessonRuntimeSourceLabel,
    ...(sourceDraftId ? { sourceDraftId } : {})
  };
}

export async function readPlayableDraftOverride({
  ownerWindow,
  shippedLessonId,
  shippedLesson
}) {
  if (!ownerWindow || !shippedLessonId || !shippedLesson) {
    return null;
  }

  try {
    const draftOverride = await readPersistedPlayableDraftOverride({
      ownerWindow,
      shippedLessonId
    });

    if (!draftOverride?.sourceMarkdown) {
      return null;
    }

    try {
      const compiledDraftLesson = compileLessonScript({
        scriptMarkdown: draftOverride.sourceMarkdown,
        goalImageSrc: readGoalImageOverride(shippedLesson)
      });

      if (compiledDraftLesson.lessonId !== shippedLessonId) {
        return annotateLessonRuntime(
          shippedLesson,
          LESSON_RUNTIME_SOURCE.BROKEN_DRAFT_FALLBACK,
          LESSON_RUNTIME_SOURCE_LABELS.BROKEN_DRAFT_FALLBACK,
          draftOverride.draftId
        );
      }

      return annotateLessonRuntime(
        compiledDraftLesson,
        LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT,
        readPlayableDraftRuntimeLabel(draftOverride.updatedAt),
        draftOverride.draftId
      );
    } catch {
      return annotateLessonRuntime(
        shippedLesson,
        LESSON_RUNTIME_SOURCE.BROKEN_DRAFT_FALLBACK,
        LESSON_RUNTIME_SOURCE_LABELS.BROKEN_DRAFT_FALLBACK,
        draftOverride.draftId
      );
    }
  } catch {
    return null;
  }
}
