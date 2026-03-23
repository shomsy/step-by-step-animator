function triggerFileDownload(fileName, mimeType, fileContent) {
  const blob = new Blob([fileContent], { type: mimeType });
  const downloadLink = document.createElement('a');
  const objectUrl = URL.createObjectURL(blob);

  downloadLink.href = objectUrl;
  downloadLink.download = fileName;
  downloadLink.click();

  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 1000);
}

export function downloadLessonFiles({ lesson }) {
  const finalStep = lesson.steps.length - 1;
  const htmlCode = lesson.buildHtmlAtStep(finalStep).join('\n');
  const cssCode = lesson.buildCssAtStep(finalStep).join('\n');
  const jsCode = typeof lesson.buildJsAtStep === 'function'
    ? lesson.buildJsAtStep(finalStep).join('\n')
    : '';
  const shadowCssCode = typeof lesson.buildShadowCssAtStep === 'function'
    ? lesson.buildShadowCssAtStep(finalStep).join('\n')
    : '';

  triggerFileDownload(lesson.htmlFileName, 'text/html', htmlCode);

  window.setTimeout(() => {
    triggerFileDownload(lesson.cssFileName, 'text/css', cssCode);
  }, 500);

  if (!jsCode) {
    if (shadowCssCode) {
      window.setTimeout(() => {
        triggerFileDownload(lesson.shadowCssFileName || 'shadow-dom-style.css', 'text/css', shadowCssCode);
      }, 1000);
    }

    return;
  }

  window.setTimeout(() => {
    triggerFileDownload(lesson.jsFileName || 'component.js', 'text/javascript', jsCode);
  }, 1000);

  if (!shadowCssCode) {
    return;
  }

  window.setTimeout(() => {
    triggerFileDownload(lesson.shadowCssFileName || 'shadow-dom-style.css', 'text/css', shadowCssCode);
  }, 1500);
}
