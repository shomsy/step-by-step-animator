import { buildSidebarLesson } from './build-sidebar/build-sidebar.lesson.js';
import { buildTopNavigationLesson } from './build-top-navigation/build-top-navigation.lesson.js';
import { buildCustomElementLesson } from './build-custom-element/build-custom-element.lesson.js';
import { buildWebComponentLesson } from './build-web-component/build-web-component.lesson.js';
import { cleanWebComponentWithAdoptedStylesheetsLesson } from './clean-web-component-with-adopted-stylesheets/clean-web-component-with-adopted-stylesheets.lesson.js';
import { modularWebComponentsLesson } from './06-modular-web-components/06-modular-web-components.lesson.js';
import { moreSeparationOfCodeLesson } from './07-more-separation-of-code/07-more-separation-of-code.lesson.js';

export const registeredLessons = [
  buildSidebarLesson,
  buildTopNavigationLesson,
  buildCustomElementLesson,
  buildWebComponentLesson,
  cleanWebComponentWithAdoptedStylesheetsLesson,
  modularWebComponentsLesson,
  moreSeparationOfCodeLesson
];

const lessonsById = new Map(registeredLessons.map(lesson => [lesson.lessonId, lesson]));

export function findLesson(lessonId) {
  return lessonsById.get(lessonId);
}

export function getDefaultLessonId() {
  return registeredLessons[0].lessonId;
}
