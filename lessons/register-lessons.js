import { buildSidebarLesson } from './01-build-sidebar/build-sidebar.lesson.js';
import { buildTopNavigationLesson } from './02-build-top-navigation/build-top-navigation.lesson.js';
import { buildCustomElementLesson } from './03-build-custom-element/build-custom-element.lesson.js';
import { buildWebComponentLesson } from './04-build-web-component/build-web-component.lesson.js';
import { cleanWebComponentWithAdoptedStylesheetsLesson } from './05-clean-web-component-with-adopted-stylesheets/clean-web-component-with-adopted-stylesheets.lesson.js';
import { modularWebComponentsLesson } from './06-modular-web-components/06-modular-web-components.lesson.js';
import { buildUIUserAvatarLesson } from './07-build-ui-user-avatar/07-build-ui-user-avatar.lesson.js';
import { smellOfEnterpriseLesson } from './08-smell-of-enterprise/08-smell-of-enterprise.lesson.js';

export const registeredLessons = [
  buildSidebarLesson,
  buildTopNavigationLesson,
  buildCustomElementLesson,
  buildWebComponentLesson,
  cleanWebComponentWithAdoptedStylesheetsLesson,
  modularWebComponentsLesson,
  buildUIUserAvatarLesson,
  smellOfEnterpriseLesson
];

export function getDefaultLessonId() {
  return registeredLessons[0].lessonId;
}

export function findLesson(lessonId) {
  return registeredLessons.find(lesson => lesson.lessonId === lessonId);
}
