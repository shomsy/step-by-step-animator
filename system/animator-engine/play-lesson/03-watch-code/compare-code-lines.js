export function compareCodeLines(currentLines, previousLines) {
  let previousLineIndex = 0;

  return currentLines.map(lineText => {
    const matchesPreviousLine =
      previousLineIndex < previousLines.length &&
      lineText === previousLines[previousLineIndex];

    if (matchesPreviousLine) {
      previousLineIndex += 1;
    }

    return {
      lineText,
      isNewLine: !matchesPreviousLine,
      isEmptyLine: lineText === ''
    };
  });
}
