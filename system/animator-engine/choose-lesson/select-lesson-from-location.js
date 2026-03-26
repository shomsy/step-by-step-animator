export async function selectLessonFromLocation({ ownerLocation, lessonRegistry = null }) {
  const {
    registeredLessons,
    findLesson,
    getDefaultLessonId
  } = lessonRegistry || await import('../../../lesson-engine/register-lesson-packages/index.js');
  const selectedLessonId = new URL(ownerLocation.href).searchParams.get('lesson');
  const defaultLessonId = getDefaultLessonId();
  const selectedLesson = findLesson(selectedLessonId) || findLesson(defaultLessonId);

  if (!selectedLesson) {
    throw new Error('No lesson package could be selected.');
  }

  return {
    lesson: await selectedLesson.loadLesson(),
    lessons: registeredLessons
  };
}
