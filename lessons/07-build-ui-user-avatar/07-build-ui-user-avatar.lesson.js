import { buildCssAtStep } from './build-css-at-step.js';
import { buildHtmlAtStep } from './build-html-at-step.js';
import { buildJsAtStep } from './build-js-at-step.js';
import { buildShadowCssAtStep } from './build-shadow-css-at-step.js';
import { buildTemplateJsAtStep } from './build-template-js-at-step.js';
import { lessonSteps } from './describe-steps.js';
import lessonDocument from './content/documents/files/lesson.sr.md?raw';
import goalImage from './content/assets/web-component-goal.svg';
import { readLessonMetadata } from '../../animator/lesson-documents/read-lesson-metadata.js';

const lessonMetadata = readLessonMetadata(lessonDocument, {
  lessonTitle: '07 · UI User Avatar — Dashboard Widget',
  lessonIntro: 'Gradimo `ui-user-avatar` — enterprise dashboard widget koji prikazuje team member kartice sa status badge-om (online/idle/away/offline), tooltip-om, slotovima za inicijale ili sliku i klik interakcijom ka profile modal-u.',
  previewAddress: 'browser://07-build-ui-user-avatar-preview',
  previewTitle: 'Live Dashboard Avatar Widget Preview',
  htmlFileName: 'index.html',
  cssFileName: 'style.css',
  jsFileName: 'ui-user-avatar.js',
  templateJsFileName: 'ui-user-avatar.template.js',
  shadowCssFileName: 'ui-user-avatar.shadow.css'
});

export const buildUIUserAvatarLesson = {
  lessonId: '07-build-ui-user-avatar',
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
  goalTitle: 'Cilj: UI User Avatar Widget',
  goalImageSrc: goalImage,
  goalImageAlt: 'Referentna slika ui-user-avatar dashboard widgeta sa status badge-om, tooltip-om i inizialima.',
  goalImageCaption: 'U ovoj lekciji gradimo enterprise team member card sa deklarativnim status API-jem i namespaced event contract-om.',
  homeworkTitle: 'Varijante za samostalnu vežbu',
  homeworkItems: [
    'Dodaj `<img>` podršku u `initials` slot — komponenta treba da sakrije inicijale kada postoji slika.',
    'Implementiraj drag-to-reorder na grid od više `ui-user-avatar` widget-a uz `draggable="true"` i `dragover`/`drop` event contract.',
    'Dodaj context menu event: `ui-user-avatar:context-menu` koji se emituje na desni klik sa `{username, role, status, x, y}` payload-om.',
    'Dodaj `size` atribut sa varijantama `sm`, `md`, `lg` koji menja dimenzije avatara kroz host CSS tokenе.'
  ],
  steps: lessonSteps,
  buildHtmlAtStep,
  buildCssAtStep,
  buildJsAtStep,
  buildTemplateJsAtStep,
  buildShadowCssAtStep
};
