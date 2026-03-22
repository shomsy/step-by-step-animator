import { buildCssAtStep } from './build-css-at-step.js';
import { buildHtmlAtStep } from './build-html-at-step.js';
import { lessonSteps } from './describe-steps.js';
import { knowledgeCheckQuestions } from './list-knowledge-check-questions.js';

export const buildSidebarLesson = {
  lessonId: 'build-sidebar',
  lessonTitle: 'Kako se pravi moderan sidebar',
  lessonIntro: 'Koraci po korak gradiš sidebar od osnove do gotove navigacije. Svaki korak uključuje kod, savete i vizuelni prikaz.',
  previewAddress: 'browser://build-sidebar-preview',
  previewTitle: 'Live build sidebar preview',
  htmlFileName: 'index.html',
  cssFileName: 'style.css',
  steps: lessonSteps,
  buildHtmlAtStep,
  buildCssAtStep,
  knowledgeCheckQuestions
};
