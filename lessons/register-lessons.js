import { buildSidebarLesson } from './build-sidebar/build-sidebar.lesson.js';
import { buildTopNavigationLesson } from './build-top-navigation/build-top-navigation.lesson.js';

export const registeredLessons = [buildSidebarLesson, buildTopNavigationLesson];

const lessonsById = new Map(registeredLessons.map(lesson => [lesson.lessonId, lesson]));

export function findLesson(lessonId) {
  return lessonsById.get(lessonId);
}

export function getDefaultLessonId() {
  return registeredLessons[0].lessonId;
}
