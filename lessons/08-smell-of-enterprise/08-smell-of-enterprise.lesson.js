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
  lessonTitle: '08 · UI Pricing Card — SaaS Pricing Table',
  lessonIntro: 'Gradimo `ui-pricing-card` — enterprise SaaS pricing table komponentu sa tier varijantama (starter/pro/enterprise), popular highlight stanjem, yearly/monthly billing toggle-om koji dinamički menja cenu, CTA dugmetom sa urgency countdown timerom i feature matrix slotovima.',
  previewAddress: 'browser://08-ui-pricing-card-preview',
  previewTitle: 'Live SaaS Pricing Card Preview',
  htmlFileName: 'index.html',
  cssFileName: 'style.css',
  jsFileName: 'ui-pricing-card.js',
  templateJsFileName: 'ui-pricing-card.template.js',
  shadowCssFileName: 'ui-pricing-card.shadow.css'
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
  goalTitle: 'Cilj: SaaS Pricing Card Widget',
  goalImageSrc: goalImage,
  goalImageAlt: 'Referentna slika ui-pricing-card sa Pro tier-om, billing toggle-om, feature listom i urgency timer-om.',
  goalImageCaption: 'U ovoj lekciji gradimo enterprise pricing karticu sa tier varijantama, dinamičkim toggle-om i countdown urgency timer-om.',
  homeworkTitle: 'Varijante za samostalnu vežbu',
  homeworkItems: [
    'Napravi grid od tri kartice (starter/pro/enterprise) sa različitim feature listama i cenama.',
    'Dodaj `urgency-seconds` atribut umesto hardkodovanih 3600 sekundi za veću fleksibilnost.',
    'Implementiraj dynamic pricing calc: dodaj `seats` atribut i množji cenu sa brojem mesta.',
    'Dodaj `discount-code` atribut koji primeni popust i prikaže precrtan originalni iznos.'
  ],
  steps: lessonSteps,
  buildHtmlAtStep,
  buildCssAtStep,
  buildJsAtStep,
  buildTemplateJsAtStep,
  buildShadowCssAtStep
};
