import { compileLessonScript } from '../lesson-engine/compile-lesson-script.js';
import { readPersistedPlayableDraftOverride } from './open-authoring-sqlite.js';

function readGoalImageOverride(shippedLesson) {
  return typeof shippedLesson?.goalImageSrc === 'string'
    ? shippedLesson.goalImageSrc
    : '';
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

    const compiledDraftLesson = compileLessonScript({
      scriptMarkdown: draftOverride.sourceMarkdown,
      goalImageSrc: readGoalImageOverride(shippedLesson)
    });

    if (compiledDraftLesson.lessonId !== shippedLessonId) {
      return null;
    }

    return {
      ...compiledDraftLesson,
      lessonRuntimeSource: 'saved-draft',
      lessonRuntimeSourceLabel: `Saved draft from SQLite · ${draftOverride.updatedAt}`,
      sourceDraftId: draftOverride.draftId
    };
  } catch {
    return null;
  }
}
