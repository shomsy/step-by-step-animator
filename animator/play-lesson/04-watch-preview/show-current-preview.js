function composeLivePreviewDocument(lesson, currentStepNumber) {
  const htmlMarkup = lesson.buildHtmlAtStep(currentStepNumber).join('\n');
  const cssMarkup = lesson.buildCssAtStep(currentStepNumber).join('\n');
  const jsMarkup = typeof lesson.buildJsAtStep === 'function'
    ? lesson.buildJsAtStep(currentStepNumber).join('\n')
    : '';
  const cssBlock = cssMarkup ? `<style>${cssMarkup}</style>` : '';
  const jsBlock = jsMarkup ? `<script>${jsMarkup}<\/script>` : '';

  return `<!DOCTYPE html>
<html lang="${lesson.documentLanguage || 'sr'}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${cssBlock}
  </head>
  <body>
${htmlMarkup}
    ${jsBlock}
  </body>
</html>`;
}

export function showCurrentPreview({
  lessonParts,
  lesson,
  currentStepNumber
}) {
  const livePreviewDocument = composeLivePreviewDocument(lesson, currentStepNumber);

  if (lessonParts.livePreviewFrame.srcdoc === livePreviewDocument) {
    return;
  }

  lessonParts.livePreviewFrame.srcdoc = livePreviewDocument;
}
