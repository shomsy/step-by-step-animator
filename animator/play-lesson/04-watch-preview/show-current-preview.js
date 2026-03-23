function composePreviewJavaScript(lesson, currentStepNumber) {
  if (typeof lesson.buildJsAtStep !== 'function') {
    return '';
  }

  const jsMarkup = lesson.buildJsAtStep(currentStepNumber).join('\n');

  if (typeof lesson.buildShadowCssAtStep !== 'function') {
    return jsMarkup;
  }

  const shadowCssMarkup = lesson.buildShadowCssAtStep(currentStepNumber).join('\n');
  const importPath = `./${lesson.shadowCssFileName || 'shadow-dom-style.css'}?raw`;
  const importLine = `import shadowDomStyleCssText from '${importPath}';`;

  if (jsMarkup.includes(importLine)) {
    return jsMarkup.replace(
      importLine,
      `const shadowDomStyleCssText = ${JSON.stringify(shadowCssMarkup)};`
    );
  }

  return `const shadowDomStyleCssText = ${JSON.stringify(shadowCssMarkup)};\n${jsMarkup}`;
}

function composeLivePreviewDocument(lesson, currentStepNumber) {
  const htmlMarkup = lesson.buildHtmlAtStep(currentStepNumber).join('\n');
  const cssMarkup = lesson.buildCssAtStep(currentStepNumber).join('\n');
  const jsMarkup = composePreviewJavaScript(lesson, currentStepNumber);
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
