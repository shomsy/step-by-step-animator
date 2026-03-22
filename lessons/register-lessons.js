import { buildCalloutCustomElementLesson } from './build-callout-custom-element/build-callout-custom-element.lesson.js';
import { buildSidebarLesson } from './build-sidebar/build-sidebar.lesson.js';
import { buildFeatureCalloutWebComponentLesson } from './build-feature-callout-web-component/build-feature-callout-web-component.lesson.js';
import { buildTopNavigationLesson } from './build-top-navigation/build-top-navigation.lesson.js';

export const registeredLessons = [
  buildSidebarLesson,
  buildTopNavigationLesson,
  buildCalloutCustomElementLesson,
  buildFeatureCalloutWebComponentLesson
];

const lessonsById = new Map(registeredLessons.map(lesson => [lesson.lessonId, lesson]));

export function findLesson(lessonId) {
  return lessonsById.get(lessonId);
}

export function getDefaultLessonId() {
  return registeredLessons[0].lessonId;
}
