export function findSelectedLesson({ ownerLocation, lessons }) {
  const selectedLessonId = new URL(ownerLocation.href).searchParams.get('lesson');
  const selectedLesson = lessons.find(lesson => lesson.lessonId === selectedLessonId);

  return selectedLesson || lessons[0];
}
