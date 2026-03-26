import { findLesson, getDefaultLessonId } from '../../lesson-engine/register-lesson-packages/index.js';

export function selectLessonFromLocation({ ownerLocation }) {
  const selectedLessonId = new URL(ownerLocation.href).searchParams.get('lesson');
  const defaultLessonId = getDefaultLessonId();

  return findLesson(selectedLessonId) || findLesson(defaultLessonId);
}
