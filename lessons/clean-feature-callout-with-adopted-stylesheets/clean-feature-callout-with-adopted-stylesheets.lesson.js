import { buildCssAtStep } from './build-css-at-step.js';
import { buildHtmlAtStep } from './build-html-at-step.js';
import { buildJsAtStep } from './build-js-at-step.js';
import { lessonSteps } from './describe-steps.js';
import lessonDocument from './content/documents/files/lesson.sr.md?raw';
import goalImage from './content/assets/feature-callout-goal.svg';
import { readLessonMetadata } from '../../animator/lesson-documents/read-lesson-metadata.js';

const lessonMetadata = readLessonMetadata(lessonDocument, {
  lessonTitle: "Web Components 3/3 · Now Let's Clean The Mess",
  lessonIntro: 'Treća Web Components lekcija čisti stilsku priču komponente: CSS više ne živi u template markup-u, nego u constructed stylesheet-u koji shadow root usvaja preko adoptedStyleSheets.',
  previewAddress: 'browser://clean-feature-callout-with-adopted-stylesheets-preview',
  previewTitle: 'Live adoptedStyleSheets preview',
  htmlFileName: 'index.html',
  cssFileName: 'style.css',
  jsFileName: 'feature-callout.js'
});

export const cleanFeatureCalloutWithAdoptedStylesheetsLesson = {
  lessonId: 'clean-feature-callout-with-adopted-stylesheets',
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
  goalImageCaption: 'Ovo je cleanup korak: ista komponenta ostaje ista spolja, ali CSS više ne živi u template string-u, već u posebnom stylesheet sloju koji shadow root usvaja.',
  steps: lessonSteps,
  buildHtmlAtStep,
  buildCssAtStep,
  buildJsAtStep
};
