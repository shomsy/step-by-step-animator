import { buildCssAtStep } from './build-css-at-step.js';
import { buildHtmlAtStep } from './build-html-at-step.js';
import { buildJsAtStep } from './build-js-at-step.js';
import { buildTemplateJsAtStep } from './build-template-js-at-step.js';
import { buildShadowCssAtStep } from './build-shadow-css-at-step.js';
import { lessonSteps } from './describe-steps.js';
import lessonDocument from './content/documents/files/lesson.sr.md?raw';
import goalImage from './content/assets/web-component-goal.svg';
import { readLessonMetadata } from '../../animator/lesson-documents/read-lesson-metadata.js';

const lessonMetadata = readLessonMetadata(lessonDocument, {
  lessonTitle: '08 · Smell Of Enterprise',
  lessonIntro: 'Peta Web Components lekcija pretvara demo komponentu u ozbiljniji UI primitive. Tag i class dobijaju domain-driven ime, template i shadow CSS ostaju odvojeni, a JavaScript dobija property API, precizan attributeChangedCallback, disabled i variant state, namespaced event contract i jasniji lifecycle.',
  previewAddress: 'browser://08-smell-of-enterprise-preview',
  previewTitle: 'Live enterprise Web Component preview',
  htmlFileName: 'index.html',
  cssFileName: 'style.css',
  jsFileName: 'ui-callout-card.js',
  templateJsFileName: 'ui-callout-card.template.js',
  shadowCssFileName: 'ui-callout-card.shadow.css'
});

export const smellOfEnterpriseLesson = {
  lessonId: '08-smell-of-enterprise',
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
  goalTitle: 'Cilj: Enterprise-smelling UI Primitive',
  goalImageSrc: goalImage,
  goalImageAlt: 'Referentna slika tamnog callout card Web Component-a sa jasnim API i styling contract slojevima.',
  goalImageCaption: 'U ovoj lekciji ista card komponenta dobija ozbiljniji public API, state i styling contract, bez framework-a i bez gubljenja Web Components čistote.',
  steps: lessonSteps,
  buildHtmlAtStep,
  buildCssAtStep,
  buildJsAtStep,
  buildTemplateJsAtStep,
  buildShadowCssAtStep
};
