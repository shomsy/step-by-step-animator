import { compileLessonScript } from '../lesson-engine/compile-lesson-script.js';
import { readPersistedPlayableDraftOverride } from './open-authoring-sqlite.js';

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
          'broken-draft-fallback',
          'Broken Draft Fallback · Shipped lesson package',
          draftOverride.draftId
        );
      }

      return annotateLessonRuntime(
        compiledDraftLesson,
        'playable-draft',
        `Playable Draft · SQLite · ${draftOverride.updatedAt}`,
        draftOverride.draftId
      );
    } catch {
      return annotateLessonRuntime(
        shippedLesson,
        'broken-draft-fallback',
        'Broken Draft Fallback · Shipped lesson package',
        draftOverride.draftId
      );
    }
  } catch {
    return null;
  }
}
