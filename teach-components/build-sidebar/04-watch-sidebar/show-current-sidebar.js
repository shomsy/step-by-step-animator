function composeLivePreviewDocument(currentStepNumber, buildHtmlAtStep, buildCssAtStep) {
  const htmlMarkup = buildHtmlAtStep(currentStepNumber).join('\n');
  const cssMarkup = buildCssAtStep(currentStepNumber).join('\n');
  const cssBlock = cssMarkup ? `<style>${cssMarkup}</style>` : '';

  return `<!DOCTYPE html>
<html lang="sr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${cssBlock}
  </head>
  <body>
${htmlMarkup}
  </body>
</html>`;
}

export function showCurrentSidebar({
  lessonParts,
  currentStepNumber,
  buildHtmlAtStep,
  buildCssAtStep
}) {
  const livePreviewDocument = composeLivePreviewDocument(
    currentStepNumber,
    buildHtmlAtStep,
    buildCssAtStep
  );

  if (lessonParts.livePreviewFrame.srcdoc === livePreviewDocument) {
    return;
  }

  lessonParts.livePreviewFrame.srcdoc = livePreviewDocument;
}
