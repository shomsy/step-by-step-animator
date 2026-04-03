import { escapeInlineText } from '../escape-inline-text.js';
import {
  readLessonRuntimeLabel,
  readLessonRuntimeTone,
} from '../../../author-lessons/lesson-runtime-state.js';

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
    .map((item) => `<li>${escapeInlineText(item)}</li>`)
    .join('');
}

export function showLessonShell({ ownerDocument, lessonParts, lesson }) {
  const hasJavaScriptFile = typeof lesson.buildJsAtStep === 'function';
  const hasTemplateJsFile = typeof lesson.buildTemplateJsAtStep === 'function';
  const hasShadowCssFile = typeof lesson.buildShadowCssAtStep === 'function';
  const paneCount =
    2 + (hasJavaScriptFile ? 1 : 0) + (hasTemplateJsFile ? 1 : 0) + (hasShadowCssFile ? 1 : 0);
  const isIdeMode = !!lesson.ideMode;

  lessonParts.lessonHeading.textContent = lesson.lessonTitle;
  lessonParts.liveEditorPanel.classList.toggle('has-ide-mode', isIdeMode);

  if (lesson.lessonIntroHtml) {
    lessonParts.lessonIntro.innerHTML = lesson.lessonIntroHtml;
  } else {
    lessonParts.lessonIntro.textContent = lesson.lessonIntro;
  }

  lessonParts.lessonRuntimeState.hidden = false;
  lessonParts.lessonRuntimeState.dataset.tone = readLessonRuntimeTone(lesson);
  lessonParts.lessonRuntimeState.textContent = readLessonRuntimeLabel(lesson);

  lessonParts.previewAddress.textContent = lesson.previewAddress;
  lessonParts.livePreviewFrame.setAttribute('sandbox', 'allow-scripts');
  lessonParts.livePreviewFrame.setAttribute('referrerpolicy', 'no-referrer');
  lessonParts.htmlFileLabel.textContent = lesson.htmlFileName;
  lessonParts.cssFileLabel.textContent = lesson.cssFileName;

  if (isIdeMode) {
    const files = [
      { id: 'htmlPane', name: lesson.htmlFileName, type: 'html' },
      { id: 'cssPane', name: lesson.cssFileName, type: 'css' },
    ];

    if (hasJavaScriptFile) {
      files.push({ id: 'jsPane', name: lesson.jsFileName || 'component.js', type: 'js' });
    }

    if (hasTemplateJsFile) {
      files.push({
        id: 'templateJsPane',
        name: lesson.templateJsFileName || 'component.html.js',
        type: 'js',
      });
    }

    if (hasShadowCssFile) {
      files.push({
        id: 'shadowCssPane',
        name: lesson.shadowCssFileName || 'shadow-dom-style.css',
        type: 'css',
      });
    }

    lessonParts.ideFileList.innerHTML = files
      .map(
        (file, index) => `
      <div class="ide-file-item${index === 0 ? ' active' : ''}" data-pane-id="${file.id}">
        <svg class="ide-file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
        <span class="ide-file-name">${escapeInlineText(file.name)}</span>
        <div class="ide-file-dot"></div>
      </div>
    `
      )
      .join('');

    lessonParts.htmlPane.classList.add('active');
    lessonParts.cssPane.classList.remove('active');
    lessonParts.jsPane.classList.remove('active');
    lessonParts.templateJsPane.classList.remove('active');
    lessonParts.shadowCssPane.classList.remove('active');
  } else {
    lessonParts.ideFileList.innerHTML = '';
    lessonParts.htmlPane.classList.remove('active');
    lessonParts.cssPane.classList.remove('active');
    lessonParts.jsPane.classList.remove('active');
    lessonParts.templateJsPane.classList.remove('active');
    lessonParts.shadowCssPane.classList.remove('active');
  }

  lessonParts.jsPane.hidden = !hasJavaScriptFile;
  lessonParts.templateJsPane.hidden = !hasTemplateJsFile;
  lessonParts.shadowCssPane.hidden = !hasShadowCssFile;
  lessonParts.liveEditorBody.dataset.paneCount = String(paneCount);

  if (hasJavaScriptFile) {
    lessonParts.jsFileLabel.textContent = lesson.jsFileName || 'component.js';
  } else {
    lessonParts.jsCodePane.innerHTML = '';
  }

  if (hasTemplateJsFile) {
    lessonParts.templateJsFileLabel.textContent = lesson.templateJsFileName || 'component.html.js';
  } else {
    lessonParts.templateJsCodePane.innerHTML = '';
  }

  if (hasShadowCssFile) {
    lessonParts.shadowCssFileLabel.textContent = lesson.shadowCssFileName || 'shadow-dom-style.css';
  } else {
    lessonParts.shadowCssCodePane.innerHTML = '';
  }

  lessonParts.livePreviewFrame.title =
    lesson.previewTitle || lesson.lessonTitle || 'Lesson preview';
  showLessonGoal({ lessonParts, lesson });
  ownerDocument.title = `Step By Step Animator · ${lesson.lessonTitle}`;

  lessonParts.ideFileList.onclick = (e) => {
    const item = e.target.closest('.ide-file-item');
    if (!item) {
      return;
    }

    const paneId = item.dataset.paneId;
    lessonParts.ideFileList
      .querySelectorAll('.ide-file-item')
      .forEach((el) => el.classList.toggle('active', el === item));
    [
      lessonParts.htmlPane,
      lessonParts.cssPane,
      lessonParts.jsPane,
      lessonParts.templateJsPane,
      lessonParts.shadowCssPane,
    ].forEach((pane) => {
      if (pane) {
        pane.classList.toggle('active', pane.id === paneId);
      }
    });
  };
}
