export function showLessonShell({ ownerDocument, lessonParts, lesson }) {
  lessonParts.lessonHeading.textContent = lesson.lessonTitle;

  if (lesson.lessonIntroHtml) {
    lessonParts.lessonIntro.innerHTML = lesson.lessonIntroHtml;
  } else {
    lessonParts.lessonIntro.textContent = lesson.lessonIntro;
  }

  lessonParts.previewAddress.textContent = lesson.previewAddress;
  lessonParts.htmlFileLabel.textContent = lesson.htmlFileName;
  lessonParts.cssFileLabel.textContent = lesson.cssFileName;
  lessonParts.livePreviewFrame.title = lesson.previewTitle;
  ownerDocument.title = `Step By Step Animator · ${lesson.lessonTitle}`;
}
