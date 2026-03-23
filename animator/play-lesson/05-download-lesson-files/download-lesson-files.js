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
  const templateJsCode = typeof lesson.buildTemplateJsAtStep === 'function'
    ? lesson.buildTemplateJsAtStep(finalStep).join('\n')
    : '';
  const shadowCssCode = typeof lesson.buildShadowCssAtStep === 'function'
    ? lesson.buildShadowCssAtStep(finalStep).join('\n')
    : '';

  let delay = 0;

  triggerFileDownload(lesson.htmlFileName, 'text/html', htmlCode);
  delay += 500;

  window.setTimeout(() => {
    triggerFileDownload(lesson.cssFileName, 'text/css', cssCode);
  }, delay);

  if (jsCode) {
    delay += 500;
    window.setTimeout(() => {
      triggerFileDownload(lesson.jsFileName || 'component.js', 'text/javascript', jsCode);
    }, delay);
  }

  if (templateJsCode) {
    delay += 500;
    window.setTimeout(() => {
      triggerFileDownload(lesson.templateJsFileName || 'component.html.js', 'text/javascript', templateJsCode);
    }, delay);
  }

  if (shadowCssCode) {
    delay += 500;
    window.setTimeout(() => {
      triggerFileDownload(lesson.shadowCssFileName || 'shadow-dom-style.css', 'text/css', shadowCssCode);
    }, delay);
  }
}
