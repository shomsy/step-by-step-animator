import { buildCssAtStep } from './build-css-at-step.js';
import { buildHtmlAtStep } from './build-html-at-step.js';
import { lessonSteps } from './describe-steps.js';
import lessonDocument from './content/documents/files/lesson.sr.md?raw';
import goalImage from './content/assets/top-navigation-goal.svg';
import { readLessonMetadata } from '../../animator/lesson-documents/read-lesson-metadata.js';

const lessonMetadata = readLessonMetadata(lessonDocument, {
  lessonTitle: 'Kako se pravi top navigation bar',
  lessonIntro: 'Koraci po korak gradiš prvi navbar iz reference: logo levo, linkovi u sredini i CTA dugme desno. Druga dva rasporeda iz iste slike ostaju kao domaći zadatak.',
  previewAddress: 'browser://build-top-navigation-preview',
  previewTitle: 'Live top navigation preview',
  htmlFileName: 'index.html',
  cssFileName: 'style.css'
});

export const buildTopNavigationLesson = {
  lessonId: 'build-top-navigation',
  lessonTitle: lessonMetadata.lessonTitle,
  lessonIntro: lessonMetadata.lessonIntro,
  lessonIntroHtml: lessonMetadata.lessonIntroHtml,
  previewAddress: lessonMetadata.previewAddress,
  previewTitle: lessonMetadata.previewTitle,
  htmlFileName: lessonMetadata.htmlFileName,
  cssFileName: lessonMetadata.cssFileName,
  goalTitle: 'Šta gradimo u ovoj lekciji',
  goalImageSrc: goalImage,
  goalImageAlt: 'Referentna slika sa tri tamna navigation bara na svetloj pozadini. U lekciji se gradi prvi: logo levo, linkovi u sredini i contact dugme desno.',
  goalImageCaption: 'U ovoj lekciji gradimo samo prvi raspored iz reference: logo levo, linkovi u sredini i plavo Contact dugme desno.',
  homeworkTitle: 'Domaći zadatak',
  homeworkItems: [
    'Drugu varijantu iz reference napravi kao samostalnu lekciju ili kao vlastitu vežbu: linkovi levo, CTA u sredini, logo desno.',
    'Treću varijantu iz reference napravi kao drugu vežbu: logo levo, a kompletna navigaciona grupa i CTA dugme desno.'
  ],
  steps: lessonSteps,
  buildHtmlAtStep,
  buildCssAtStep
};
