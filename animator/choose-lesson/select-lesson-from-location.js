import { findLesson, getDefaultLessonId } from '../../lessons/register-lessons.js';

export function selectLessonFromLocation({ ownerLocation }) {
  const selectedLessonId = new URL(ownerLocation.href).searchParams.get('lesson');
  const defaultLessonId = getDefaultLessonId();

  return findLesson(selectedLessonId) || findLesson(defaultLessonId);
}
