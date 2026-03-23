import { buildCssAtStep } from './build-css-at-step.js';
import { buildHtmlAtStep } from './build-html-at-step.js';
import { buildJsAtStep } from './build-js-at-step.js';
import { lessonSteps } from './describe-steps.js';
import lessonDocument from './content/documents/files/lesson.sr.md?raw';
import goalImage from './content/assets/custom-element-goal.svg';
import { readLessonMetadata } from '../../animator/lesson-documents/read-lesson-metadata.js';

const lessonMetadata = readLessonMetadata(lessonDocument, {
  lessonTitle: 'Web Components 1/2 · Light DOM custom element',
  lessonIntro: 'Prva Web Components lekcija objašnjava host tag, registraciju, atribute i prvi render kroz light DOM, bez shadow DOM sloja.',
  previewAddress: 'browser://build-callout-custom-element-preview',
  previewTitle: 'Live custom element preview',
  htmlFileName: 'index.html',
  cssFileName: 'style.css',
  jsFileName: 'my-first-component.js'
});

export const buildCustomElementLesson = {
  lessonId: 'build-custom-element',
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
  goalImageAlt: 'Referentna slika tamnog callout card custom elementa na svetloj pozadini, sa malim badge-om, naslovom, opisom i CTA dugmetom.',
  goalImageCaption: 'Ovo je prvi korak Web Components puta: isti problem rešavamo kroz light DOM custom element, da bi host, atributi i registracija ostali potpuno transparentni.',
  steps: lessonSteps,
  buildHtmlAtStep,
  buildCssAtStep,
  buildJsAtStep
};
