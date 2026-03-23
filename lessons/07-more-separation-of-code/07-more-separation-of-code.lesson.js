import { buildCssAtStep } from './build-css-at-step.js';
import { buildHtmlAtStep } from './build-html-at-step.js';
import { buildJsAtStep } from './build-js-at-step.js';
import { buildTemplateJsAtStep } from './build-template-js-at-step.js';
import { buildShadowCssAtStep } from './build-shadow-css-at-step.js';
import { lessonSteps } from './describe-steps.js';
import lessonDocument from './content/documents/files/lesson.sr.md?raw';
import goalImage from './content/assets/feature-callout-goal.svg';
import { readLessonMetadata } from '../../animator/lesson-documents/read-lesson-metadata.js';

const lessonMetadata = readLessonMetadata(lessonDocument, {
  lessonTitle: '07 · More Separation Of Code',
  lessonIntro: 'Četvrta Web Components lekcija razdvaja template markup u sopstveni modul component.html.js. Svaki fajl ima jednu odgovornost: host HTML, template markup, component logic, shadow CSS i host CSS.',
  previewAddress: 'browser://07-more-separation-of-code-preview',
  previewTitle: 'Live modular Web Component preview',
  htmlFileName: 'index.html',
  cssFileName: 'style.css',
  jsFileName: 'feature-callout.js',
  templateJsFileName: 'component.html.js',
  shadowCssFileName: 'shadow-dom-style.css'
});

export const moreSeparationOfCodeLesson = {
  lessonId: '07-more-separation-of-code',
  lessonTitle: lessonMetadata.lessonTitle,
  lessonIntro: lessonMetadata.lessonIntro,
  lessonIntroHtml: lessonMetadata.lessonIntroHtml,
  previewAddress: lessonMetadata.previewAddress,
  previewTitle: lessonMetadata.previewTitle,
  htmlFileName: lessonMetadata.htmlFileName,
  cssFileName: lessonMetadata.cssFileName,
  jsFileName: lessonMetadata.jsFileName,
  templateJsFileName: lessonMetadata.templateJsFileName,
  shadowCssFileName: lessonMetadata.shadowCssFileName,
  ideMode: true,
  goalTitle: 'Cilj: Potpuno Modularna Komponenta',
  goalImageSrc: goalImage,
  goalImageAlt: 'Referentna slika Feature Callout komponente sa pet fajlova.',
  goalImageCaption: 'U ovoj lekciji razdvajamo template markup u sopstveni modul: component.html.js.',
  steps: lessonSteps,
  buildHtmlAtStep,
  buildCssAtStep,
  buildJsAtStep,
  buildTemplateJsAtStep,
  buildShadowCssAtStep
};
