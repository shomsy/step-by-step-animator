import { BuildSidebarLesson } from './01-build-sidebar-lesson.js';
import { BuildTopNavigationLesson } from './02-build-top-navigation-lesson.js';
import { BuildCustomElementLesson } from './03-build-custom-element-lesson.js';
import { BuildWebComponentLesson } from './04-build-web-component-lesson.js';
import { CleanWebComponentWithAdoptedStylesheetsLesson } from './05-clean-web-component-with-adopted-stylesheets-lesson.js';
import { ModularWebComponentsLesson } from './06-modular-web-components-lesson.js';
import { BuildUiUserAvatarLesson } from './07-build-ui-user-avatar-lesson.js';
import { SmellOfEnterpriseLesson } from './08-smell-of-enterprise-lesson.js';

export const registeredLessons = [
  BuildSidebarLesson,
  BuildTopNavigationLesson,
  BuildCustomElementLesson,
  BuildWebComponentLesson,
  CleanWebComponentWithAdoptedStylesheetsLesson,
  ModularWebComponentsLesson,
  BuildUiUserAvatarLesson,
  SmellOfEnterpriseLesson
];

export function getDefaultLessonId() {
  return registeredLessons[0].lessonId;
}

export function findLesson(lessonId) {
  return registeredLessons.find(lesson => lesson.lessonId === lessonId);
}
