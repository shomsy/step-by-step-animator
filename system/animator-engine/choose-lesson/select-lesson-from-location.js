import {
  LESSON_RUNTIME_SOURCE,
  LESSON_RUNTIME_SOURCE_LABELS
} from '../../author-lessons/lesson-runtime-state.js';

async function resolveSavedDraftLessonOverride({
  ownerWindow,
  shippedLessonId,
  shippedLesson,
  resolveDraftLessonOverride
}) {
  if (typeof resolveDraftLessonOverride === 'function') {
    return resolveDraftLessonOverride({
      ownerWindow,
      shippedLessonId,
      shippedLesson
    });
  }

  if (!ownerWindow) {
    return null;
  }

  return null;
}

function annotatePublishedLesson(lesson) {
  return {
    ...lesson,
    lessonRuntimeSource: lesson.lessonRuntimeSource || LESSON_RUNTIME_SOURCE.PUBLISHED,
    lessonRuntimeSourceLabel: lesson.lessonRuntimeSourceLabel || LESSON_RUNTIME_SOURCE_LABELS.PUBLISHED
  };
}

function normalizeDraftLesson(lesson) {
  if (!lesson) {
    return null;
  }

  if (lesson.lessonRuntimeSource === LESSON_RUNTIME_SOURCE.BROKEN_DRAFT_FALLBACK) {
    return lesson;
  }

  if (lesson.lessonRuntimeSource === LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT) {
    return {
      ...lesson,
      lessonRuntimeSourceLabel: lesson.lessonRuntimeSourceLabel || LESSON_RUNTIME_SOURCE_LABELS.PLAYABLE_DRAFT
    };
  }

  return {
    ...lesson,
    lessonRuntimeSource: LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT,
    lessonRuntimeSourceLabel: lesson.lessonRuntimeSourceLabel || LESSON_RUNTIME_SOURCE_LABELS.PLAYABLE_DRAFT
  };
}

export async function selectLessonFromLocation({
  ownerLocation,
  ownerWindow = null,
  lessonRegistry = null,
  resolveDraftLessonOverride = null
}) {
  const {
    registeredLessons,
    findLesson,
    getDefaultLessonId
  } = lessonRegistry || await import('../../lesson-engine/register-lesson-packages/index.js');
  const selectedLessonId = new URL(ownerLocation.href).searchParams.get('lesson');
  const defaultLessonId = getDefaultLessonId();
  const selectedLesson = findLesson(selectedLessonId) || findLesson(defaultLessonId);

  if (!selectedLesson) {
    throw new Error('No lesson package could be selected.');
  }

  const shippedLesson = await selectedLesson.loadLesson();
  let savedDraftLesson = null;

  try {
    savedDraftLesson = await resolveSavedDraftLessonOverride({
      ownerWindow,
      shippedLessonId: selectedLesson.lessonId,
      shippedLesson,
      resolveDraftLessonOverride
    });
  } catch {
    savedDraftLesson = null;
  }

  const normalizedDraftLesson = normalizeDraftLesson(savedDraftLesson);
  const lesson = normalizedDraftLesson || annotatePublishedLesson(shippedLesson);
  const lessons = normalizedDraftLesson?.lessonRuntimeSource === LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT
    ? registeredLessons.map(registeredLesson => registeredLesson.lessonId === selectedLesson.lessonId
      ? {
          ...registeredLesson,
          lessonTitle: lesson.lessonTitle
        }
      : registeredLesson)
    : registeredLessons;

  return {
    lesson,
    lessons
  };
}
