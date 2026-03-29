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
    lessonRuntimeSource: lesson.lessonRuntimeSource || 'published',
    lessonRuntimeSourceLabel: lesson.lessonRuntimeSourceLabel || 'Published Lesson · shipped package'
  };
}

function normalizeDraftLesson(lesson) {
  if (!lesson) {
    return null;
  }

  if (lesson.lessonRuntimeSource === 'broken-draft-fallback') {
    return lesson;
  }

  if (lesson.lessonRuntimeSource === 'playable-draft') {
    return {
      ...lesson,
      lessonRuntimeSourceLabel: lesson.lessonRuntimeSourceLabel || 'Playable Draft'
    };
  }

  return {
    ...lesson,
    lessonRuntimeSource: 'playable-draft',
    lessonRuntimeSourceLabel: lesson.lessonRuntimeSourceLabel || 'Playable Draft'
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
  const lessons = normalizedDraftLesson?.lessonRuntimeSource === 'playable-draft'
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
