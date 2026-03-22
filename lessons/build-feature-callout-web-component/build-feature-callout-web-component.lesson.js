import { buildCssAtStep } from './build-css-at-step.js';
import { buildHtmlAtStep } from './build-html-at-step.js';
import { buildJsAtStep } from './build-js-at-step.js';
import { lessonSteps } from './describe-steps.js';
import lessonDocument from './content/documents/files/lesson.sr.md?raw';
import knowledgeCheckDocument from './content/documents/files/quiz.sr.md?raw';
import goalImage from './content/assets/feature-callout-goal.svg';
import { readKnowledgeCheckQuestions } from '../../animator/lesson-documents/read-knowledge-check-questions.js';
import { readLessonMetadata } from '../../animator/lesson-documents/read-lesson-metadata.js';

const lessonMetadata = readLessonMetadata(lessonDocument, {
  lessonTitle: 'Web Components 2/2 · Shadow DOM feature callout',
  lessonIntro: 'Druga Web Components lekcija nadograđuje osnove: isti nivo komponente sada gradiš kroz template, shadow DOM, slotove i render lifecycle.',
  previewAddress: 'browser://build-feature-callout-web-component-preview',
  previewTitle: 'Live Web Component preview',
  htmlFileName: 'index.html',
  cssFileName: 'style.css',
  jsFileName: 'feature-callout.js'
});

const knowledgeCheckQuestions = readKnowledgeCheckQuestions(knowledgeCheckDocument);

export const buildFeatureCalloutWebComponentLesson = {
  lessonId: 'build-feature-callout-web-component',
  lessonTitle: lessonMetadata.lessonTitle,
  lessonIntro: lessonMetadata.lessonIntro,
  lessonIntroHtml: lessonMetadata.lessonIntroHtml,
  previewAddress: lessonMetadata.previewAddress,
  previewTitle: lessonMetadata.previewTitle,
  htmlFileName: lessonMetadata.htmlFileName,
  cssFileName: lessonMetadata.cssFileName,
  jsFileName: lessonMetadata.jsFileName,
  goalTitle: 'Šta gradimo u ovoj lekciji',
  goalImageSrc: goalImage,
  goalImageAlt: 'Referentna slika tamnog feature callout card Web Component-a na svetloj pozadini, sa badge oznakom, velikim naslovom, opisom i CTA dugmetom.',
  goalImageCaption: 'Ovo je drugi Web Components korak: host HTML ostaje mali, a prava komponenta se sada sklapa iz template-a, shadow DOM-a i slotova.',
  steps: lessonSteps,
  buildHtmlAtStep,
  buildCssAtStep,
  buildJsAtStep,
  knowledgeCheckQuestions
};
