import { buildCssAtStep } from './build-css-at-step.js';
import { buildHtmlAtStep } from './build-html-at-step.js';
import { buildJsAtStep } from './build-js-at-step.js';
import { buildShadowCssAtStep } from './build-shadow-css-at-step.js';
import { lessonSteps } from './describe-steps.js';
import lessonDocument from './content/documents/files/lesson.sr.md?raw';
import goalImage from './content/assets/feature-callout-goal.svg';
import { readLessonMetadata } from '../../animator/lesson-documents/read-lesson-metadata.js';

const lessonMetadata = readLessonMetadata(lessonDocument, {
  lessonTitle: "06 · Modular Web Components (IDE View)",
  lessonIntro: 'Ova lekcija demonstrira novi IDE mode playera. Umesto da svi fajlovi budu vidljivi odjednom, koristimo stvarni file browser i automatsko prebacivanje fokusa na fajl koji se trenutno menja.',
  previewAddress: 'browser://06-modular-web-components-preview',
  previewTitle: 'IDE View Web Components Preview',
  htmlFileName: 'index.html',
  cssFileName: 'style.css',
  jsFileName: 'feature-callout.js',
  shadowCssFileName: 'shadow-dom-style.css'
});

export const modularWebComponentsLesson = {
  lessonId: '06-modular-web-components',
  lessonTitle: lessonMetadata.lessonTitle,
  lessonIntro: lessonMetadata.lessonIntro,
  lessonIntroHtml: lessonMetadata.lessonIntroHtml,
  previewAddress: lessonMetadata.previewAddress,
  previewTitle: lessonMetadata.previewTitle,
  htmlFileName: lessonMetadata.htmlFileName,
  cssFileName: lessonMetadata.cssFileName,
  jsFileName: lessonMetadata.jsFileName,
  shadowCssFileName: lessonMetadata.shadowCssFileName,
  ideMode: true,
  goalTitle: 'Cilj: IDE Iskustvo',
  goalImageSrc: goalImage,
  goalImageAlt: 'Referentna slika IDE view-a.',
  goalImageCaption: 'U ovoj lekciji testiramo IDE layout sa fajlovima na desnoj strani.',
  steps: lessonSteps,
  buildHtmlAtStep,
  buildCssAtStep,
  buildJsAtStep,
  buildShadowCssAtStep
};
