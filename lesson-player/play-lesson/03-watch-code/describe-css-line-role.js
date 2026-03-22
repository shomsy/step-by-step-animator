export function describeCssLineRole(lineText) {
  const trimmedLine = lineText.trim();

  if (!trimmedLine) {
    return 'empty';
  }

  if (trimmedLine === '}') {
    return 'brace';
  }

  if (trimmedLine.endsWith('{') || trimmedLine.endsWith(',')) {
    return 'selector';
  }

  if (/^[\w-]+\s*:/.test(trimmedLine)) {
    return 'property';
  }

  return 'plain';
}
