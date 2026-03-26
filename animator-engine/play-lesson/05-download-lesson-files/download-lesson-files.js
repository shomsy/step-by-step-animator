function triggerFileDownload({ ownerDocument, ownerWindow, fileName, mimeType, fileContent }) {
  const blob = new ownerWindow.Blob([fileContent], { type: mimeType });
  const downloadLink = ownerDocument.createElement('a');
  const objectUrl = ownerWindow.URL.createObjectURL(blob);

  downloadLink.href = objectUrl;
  downloadLink.download = fileName;
  downloadLink.style.display = 'none';
  ownerDocument.body.append(downloadLink);
  downloadLink.click();
  downloadLink.remove();

  ownerWindow.setTimeout(() => {
    ownerWindow.URL.revokeObjectURL(objectUrl);
  }, 1000);
}

export function downloadLessonFiles({ lesson, ownerDocument, ownerWindow }) {
  const finalStep = lesson.steps.length - 1;
  const htmlCode = lesson.buildHtmlAtStep(finalStep).join('\n');
  const cssCode = lesson.buildCssAtStep(finalStep).join('\n');
  const jsCode = typeof lesson.buildJsAtStep === 'function'
    ? lesson.buildJsAtStep(finalStep).join('\n')
    : '';
  const templateJsCode = typeof lesson.buildTemplateJsAtStep === 'function'
    ? lesson.buildTemplateJsAtStep(finalStep).join('\n')
    : '';
  const shadowCssCode = typeof lesson.buildShadowCssAtStep === 'function'
    ? lesson.buildShadowCssAtStep(finalStep).join('\n')
    : '';

  let delay = 0;

  triggerFileDownload({
    ownerDocument,
    ownerWindow,
    fileName: lesson.htmlFileName,
    mimeType: 'text/html',
    fileContent: htmlCode
  });
  delay += 500;

  ownerWindow.setTimeout(() => {
    triggerFileDownload({
      ownerDocument,
      ownerWindow,
      fileName: lesson.cssFileName,
      mimeType: 'text/css',
      fileContent: cssCode
    });
  }, delay);

  if (jsCode) {
    delay += 500;
    ownerWindow.setTimeout(() => {
      triggerFileDownload({
        ownerDocument,
        ownerWindow,
        fileName: lesson.jsFileName || 'component.js',
        mimeType: 'text/javascript',
        fileContent: jsCode
      });
    }, delay);
  }

  if (templateJsCode) {
    delay += 500;
    ownerWindow.setTimeout(() => {
      triggerFileDownload({
        ownerDocument,
        ownerWindow,
        fileName: lesson.templateJsFileName || 'component.html.js',
        mimeType: 'text/javascript',
        fileContent: templateJsCode
      });
    }, delay);
  }

  if (shadowCssCode) {
    delay += 500;
    ownerWindow.setTimeout(() => {
      triggerFileDownload({
        ownerDocument,
        ownerWindow,
        fileName: lesson.shadowCssFileName || 'shadow-dom-style.css',
        mimeType: 'text/css',
        fileContent: shadowCssCode
      });
    }, delay);
  }
}
