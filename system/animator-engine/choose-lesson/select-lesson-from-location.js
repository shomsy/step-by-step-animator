import {
  LESSON_RUNTIME_SOURCE,
  LESSON_RUNTIME_SOURCE_LABELS
} from '../../author-lessons/lesson-runtime-state.js';

function readRequestedLessonId(ownerLocation) {
  return new URL(ownerLocation.href).searchParams.get('lesson')?.trim() || '';
}

async function resolveSavedDraftLessonOverride({
  ownerWindow,
  requestedLessonId,
  shippedLessonId,
  shippedLesson,
  resolveDraftLessonOverride
}) {
  if (typeof resolveDraftLessonOverride === 'function') {
    return resolveDraftLessonOverride({
      ownerWindow,
      requestedLessonId,
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

function isPlayableDraftRuntimeSource(lessonRuntimeSource) {
  return lessonRuntimeSource === LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT
    || lessonRuntimeSource === LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT_BACKUP;
}

function normalizeDraftLesson(lesson) {
  if (!lesson) {
    return null;
  }

  if (lesson.lessonRuntimeSource === LESSON_RUNTIME_SOURCE.BROKEN_DRAFT_FALLBACK) {
    return lesson;
  }

  if (isPlayableDraftRuntimeSource(lesson.lessonRuntimeSource)) {
    return {
      ...lesson,
      lessonRuntimeSourceLabel: lesson.lessonRuntimeSourceLabel || (
        lesson.lessonRuntimeSource === LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT_BACKUP
          ? LESSON_RUNTIME_SOURCE_LABELS.PLAYABLE_DRAFT_BACKUP
          : LESSON_RUNTIME_SOURCE_LABELS.PLAYABLE_DRAFT
      )
    };
  }

  return {
    ...lesson,
    lessonRuntimeSource: LESSON_RUNTIME_SOURCE.PLAYABLE_DRAFT,
    lessonRuntimeSourceLabel: lesson.lessonRuntimeSourceLabel || LESSON_RUNTIME_SOURCE_LABELS.PLAYABLE_DRAFT
  };
}

function buildLessonsForSelection(registeredLessons, lesson) {
  if (!lesson || !isPlayableDraftRuntimeSource(lesson.lessonRuntimeSource)) {
    return registeredLessons;
  }

  const existingLessonIndex = registeredLessons.findIndex(registeredLesson => registeredLesson.lessonId === lesson.lessonId);

  if (existingLessonIndex >= 0) {
    return registeredLessons.map((registeredLesson, lessonIndex) => lessonIndex === existingLessonIndex
      ? {
          ...registeredLesson,
          lessonTitle: lesson.lessonTitle
        }
      : registeredLesson);
  }

  return [
    {
      lessonId: lesson.lessonId,
      lessonTitle: lesson.lessonTitle
    },
    ...registeredLessons
  ];
}

function buildLessonSelection(registeredLessons, shippedLesson, savedDraftLesson) {
  const normalizedDraftLesson = normalizeDraftLesson(savedDraftLesson);
  const lesson = normalizedDraftLesson || annotatePublishedLesson(shippedLesson);

  return {
    lesson,
    lessons: buildLessonsForSelection(registeredLessons, lesson)
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
  const requestedLessonId = readRequestedLessonId(ownerLocation);
  const defaultLessonId = getDefaultLessonId();
  const requestedRegisteredLesson = findLesson(requestedLessonId);

  if (requestedRegisteredLesson) {
    const shippedLesson = await requestedRegisteredLesson.loadLesson();
    let savedDraftLesson = null;

    try {
      savedDraftLesson = await resolveSavedDraftLessonOverride({
        ownerWindow,
        requestedLessonId,
        shippedLessonId: requestedRegisteredLesson.lessonId,
        shippedLesson,
        resolveDraftLessonOverride
      });
    } catch {
      savedDraftLesson = null;
    }

    return buildLessonSelection(registeredLessons, shippedLesson, savedDraftLesson);
  }

  if (requestedLessonId) {
    let savedCustomDraftLesson = null;

    try {
      savedCustomDraftLesson = await resolveSavedDraftLessonOverride({
        ownerWindow,
        requestedLessonId,
        shippedLessonId: '',
        shippedLesson: null,
        resolveDraftLessonOverride
      });
    } catch {
      savedCustomDraftLesson = null;
    }

    const normalizedCustomDraftLesson = normalizeDraftLesson(savedCustomDraftLesson);

    if (normalizedCustomDraftLesson) {
      return {
        lesson: normalizedCustomDraftLesson,
        lessons: buildLessonsForSelection(registeredLessons, normalizedCustomDraftLesson)
      };
    }
  }

  const defaultLesson = findLesson(defaultLessonId);

  if (!defaultLesson) {
    throw new Error('No lesson package could be selected.');
  }

  return buildLessonSelection(
    registeredLessons,
    await defaultLesson.loadLesson(),
    null
  );
}
