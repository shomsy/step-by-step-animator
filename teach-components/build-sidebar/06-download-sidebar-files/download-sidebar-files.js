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

export function downloadSidebarFiles({
  steps,
  buildHtmlAtStep,
  buildCssAtStep
}) {
  const finalStep = steps.length - 1;
  const htmlCode = buildHtmlAtStep(finalStep).join('\n');
  const cssCode = buildCssAtStep(finalStep).join('\n');

  triggerFileDownload('sidebar.html', 'text/html', htmlCode);

  window.setTimeout(() => {
    triggerFileDownload('style.css', 'text/css', cssCode);
  }, 500);
}
