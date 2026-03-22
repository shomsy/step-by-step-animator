import { escapeInlineText } from '../escape-inline-text.js';

function hideLessonGoal(lessonParts) {
  lessonParts.lessonGoal.hidden = true;
  lessonParts.goalHomework.hidden = true;
  lessonParts.goalHomeworkList.innerHTML = '';
}

function showLessonGoal({ lessonParts, lesson }) {
  if (!lesson.goalImageSrc) {
    hideLessonGoal(lessonParts);
    return;
  }

  lessonParts.lessonGoal.hidden = false;
  lessonParts.goalHeading.textContent = lesson.goalTitle || 'Šta pravimo';
  lessonParts.goalCaption.textContent = lesson.goalImageCaption || '';
  lessonParts.goalImage.src = lesson.goalImageSrc;
  lessonParts.goalImage.alt = lesson.goalImageAlt || lesson.goalTitle || lesson.lessonTitle;

  const homeworkItems = Array.isArray(lesson.homeworkItems) ? lesson.homeworkItems : [];

  if (!homeworkItems.length) {
    lessonParts.goalHomework.hidden = true;
    lessonParts.goalHomeworkList.innerHTML = '';
    return;
  }

  lessonParts.goalHomework.hidden = false;
  lessonParts.goalHomeworkTitle.textContent = lesson.homeworkTitle || 'Domaći zadatak';
  lessonParts.goalHomeworkList.innerHTML = homeworkItems
    .map(item => `<li>${escapeInlineText(item)}</li>`)
    .join('');
}

export function showLessonShell({ ownerDocument, lessonParts, lesson }) {
  const hasJavaScriptFile = typeof lesson.buildJsAtStep === 'function';

  lessonParts.lessonHeading.textContent = lesson.lessonTitle;

  if (lesson.lessonIntroHtml) {
    lessonParts.lessonIntro.innerHTML = lesson.lessonIntroHtml;
  } else {
    lessonParts.lessonIntro.textContent = lesson.lessonIntro;
  }

  lessonParts.previewAddress.textContent = lesson.previewAddress;
  lessonParts.htmlFileLabel.textContent = lesson.htmlFileName;
  lessonParts.cssFileLabel.textContent = lesson.cssFileName;
  lessonParts.jsPane.hidden = !hasJavaScriptFile;
  lessonParts.liveEditorBody.dataset.paneCount = hasJavaScriptFile ? '3' : '2';

  if (hasJavaScriptFile) {
    lessonParts.jsFileLabel.textContent = lesson.jsFileName || 'component.js';
  } else {
    lessonParts.jsFileLabel.textContent = 'component.js';
    lessonParts.jsCodePane.innerHTML = '';
  }

  lessonParts.livePreviewFrame.title = lesson.previewTitle;
  showLessonGoal({ lessonParts, lesson });
  ownerDocument.title = `Step By Step Animator · ${lesson.lessonTitle}`;
}
