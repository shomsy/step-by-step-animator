const DEFAULT_LESSON_ID = '01-build-sidebar';

export const registeredLessons = [
  {
    lessonId: '01-build-sidebar',
    lessonTitle: 'Build Sidebar',
    loadLesson: () => import('./01-build-sidebar-lesson.js').then(module => module.BuildSidebarLesson)
  },
  {
    lessonId: '02-build-top-navigation',
    lessonTitle: 'Build Top Navigation',
    loadLesson: () => import('./02-build-top-navigation-lesson.js').then(module => module.BuildTopNavigationLesson)
  },
  {
    lessonId: '03-build-custom-element',
    lessonTitle: 'Build Custom Element',
    loadLesson: () => import('./03-build-custom-element-lesson.js').then(module => module.BuildCustomElementLesson)
  },
  {
    lessonId: '04-build-web-component',
    lessonTitle: 'Build Web Component',
    loadLesson: () => import('./04-build-web-component-lesson.js').then(module => module.BuildWebComponentLesson)
  },
  {
    lessonId: '05-clean-web-component-with-adopted-stylesheets',
    lessonTitle: 'Clean Web Component With Adopted Stylesheets',
    loadLesson: () => import('./05-clean-web-component-with-adopted-stylesheets-lesson.js').then(module => module.CleanWebComponentWithAdoptedStylesheetsLesson)
  },
  {
    lessonId: '06-modular-web-components',
    lessonTitle: 'Modular Web Components',
    loadLesson: () => import('./06-modular-web-components-lesson.js').then(module => module.ModularWebComponentsLesson)
  },
  {
    lessonId: '07-build-ui-user-avatar',
    lessonTitle: 'Build UI User Avatar',
    loadLesson: () => import('./07-build-ui-user-avatar-lesson.js').then(module => module.BuildUiUserAvatarLesson)
  },
  {
    lessonId: '08-smell-of-enterprise',
    lessonTitle: 'Smell Of Enterprise',
    loadLesson: () => import('./08-smell-of-enterprise-lesson.js').then(module => module.SmellOfEnterpriseLesson)
  }
];

export function getDefaultLessonId() {
  if (!findLesson(DEFAULT_LESSON_ID)) {
    throw new Error(`Default lesson "${DEFAULT_LESSON_ID}" is not registered.`);
  }

  return DEFAULT_LESSON_ID;
}

export function findLesson(lessonId) {
  return registeredLessons.find(lesson => lesson.lessonId === lessonId);
}
