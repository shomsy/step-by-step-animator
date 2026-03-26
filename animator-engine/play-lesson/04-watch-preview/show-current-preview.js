function escapeRegExp(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeTemplateLiteralText(text) {
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

function escapeClosingHtmlTag(text, tagName) {
  return String(text).replace(new RegExp(`</${tagName}`, 'gi'), `<\\/${tagName}`);
}

function readShadowCssMarkup(lesson, currentStepNumber) {
  if (typeof lesson.buildShadowCssAtStep !== 'function') {
    return '';
  }

  return lesson.buildShadowCssAtStep(currentStepNumber).join('\n');
}

function inlineShadowCssTextImport(jsMarkup, lesson, shadowCssMarkup) {
  if (typeof lesson.buildShadowCssAtStep !== 'function') {
    return jsMarkup;
  }

  const importPath = `./${lesson.shadowCssFileName || 'shadow-dom-style.css'}?raw`;
  const importLinePattern = new RegExp(
    `^import\\s+shadowDomStyleCssText\\s+from\\s+['"]${escapeRegExp(importPath)}['"]\\s*;?\\s*$`,
    'm'
  );

  if (importLinePattern.test(jsMarkup)) {
    return jsMarkup.replace(
      importLinePattern,
      `const shadowDomStyleCssText = ${JSON.stringify(shadowCssMarkup)};`
    );
  }

  return jsMarkup;
}

function inlineTemplateModule({ lesson, currentStepNumber, jsMarkup, shadowCssMarkup }) {
  if (typeof lesson.buildTemplateJsAtStep !== 'function') {
    return jsMarkup;
  }

  let templateJsMarkup = lesson.buildTemplateJsAtStep(currentStepNumber).join('\n');

  if (!templateJsMarkup.trim()) {
    return jsMarkup;
  }

  const templateFileName = lesson.templateJsFileName || 'component.html.js';
  const exportedTemplateMatch = templateJsMarkup.match(
    /export\s+const\s+(\w+)\s*=\s*document\.createElement\(\s*['"]template['"]\s*\)\s*;/i
  );
  const exportedTemplateName = exportedTemplateMatch?.[1] || 'componentTemplate';
  const shadowCssStyleTag = `<style>${escapeTemplateLiteralText(escapeClosingHtmlTag(shadowCssMarkup, 'style'))}</style>`;
  const templateImportPattern = new RegExp(
    `^import\\s+\\{\\s*${escapeRegExp(exportedTemplateName)}\\s*\\}\\s+from\\s+['"]\\./${escapeRegExp(templateFileName)}['"]\\s*;?\\s*$\\n?`,
    'm'
  );

  templateJsMarkup = templateJsMarkup
    .replace(/<link\s+rel=(["'])stylesheet\1\s+href=(["'])\.\/[^"']+\2\s*\/?>/i, shadowCssStyleTag)
    .replace(/\bexport const\b/g, 'const');

  return `${templateJsMarkup}\n\n${jsMarkup.replace(templateImportPattern, '').trimStart()}`.trim();
}

function composePreviewJavaScript(lesson, currentStepNumber) {
  if (typeof lesson.buildJsAtStep !== 'function') {
    return '';
  }

  const shadowCssMarkup = readShadowCssMarkup(lesson, currentStepNumber);
  let jsMarkup = lesson.buildJsAtStep(currentStepNumber).join('\n');

  jsMarkup = inlineShadowCssTextImport(jsMarkup, lesson, shadowCssMarkup);
  jsMarkup = inlineTemplateModule({
    lesson,
    currentStepNumber,
    jsMarkup,
    shadowCssMarkup
  });

  return jsMarkup;
}

function composeLivePreviewDocument(lesson, currentStepNumber) {
  const htmlMarkup = lesson.buildHtmlAtStep(currentStepNumber).join('\n');
  const cssMarkup = lesson.buildCssAtStep(currentStepNumber).join('\n');
  const jsMarkup = composePreviewJavaScript(lesson, currentStepNumber);
  const cssBlock = cssMarkup ? `<style>${escapeClosingHtmlTag(cssMarkup, 'style')}</style>` : '';
  const jsBlock = jsMarkup ? `<script>${escapeClosingHtmlTag(jsMarkup, 'script')}<\/script>` : '';

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
