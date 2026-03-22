import { buildCssAtStep } from './build-css-at-step.js';
import { buildHtmlAtStep } from './build-html-at-step.js';
import { lessonSteps } from './describe-steps.js';
import lessonDocument from './content/documents/files/lesson.sr.md?raw';
import knowledgeCheckDocument from './content/documents/files/quiz.sr.md?raw';
import { readKnowledgeCheckQuestions } from '../read-lesson-documents/read-knowledge-check-questions.js';
import { readLessonMetadata } from '../read-lesson-documents/read-lesson-metadata.js';

const lessonMetadata = readLessonMetadata(lessonDocument, {
  lessonTitle: 'Kako se pravi moderan sidebar',
  lessonIntro: 'Koraci po korak gradiš sidebar od osnove do gotove navigacije. Svaki korak uključuje kod, savete i vizuelni prikaz.',
  previewAddress: 'browser://build-sidebar-preview',
  previewTitle: 'Live build sidebar preview',
  htmlFileName: 'index.html',
  cssFileName: 'style.css'
});

const knowledgeCheckQuestions = readKnowledgeCheckQuestions(knowledgeCheckDocument);

export const buildSidebarLesson = {
  lessonId: 'build-sidebar',
  lessonTitle: lessonMetadata.lessonTitle,
  lessonIntro: lessonMetadata.lessonIntro,
  lessonIntroHtml: lessonMetadata.lessonIntroHtml,
  previewAddress: lessonMetadata.previewAddress,
  previewTitle: lessonMetadata.previewTitle,
  htmlFileName: lessonMetadata.htmlFileName,
  cssFileName: lessonMetadata.cssFileName,
  steps: lessonSteps,
  buildHtmlAtStep,
  buildCssAtStep,
  knowledgeCheckQuestions
};
