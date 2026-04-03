const EXACT_MIDDLE_DIFF_CELL_LIMIT = 40000;

function normalizeLines(lines) {
  return Array.isArray(lines) ? lines.map((line) => String(line)) : [];
}

function readCommonPrefixLength(previousLines, currentLines) {
  const maxLength = Math.min(previousLines.length, currentLines.length);
  let index = 0;

  while (index < maxLength && previousLines[index] === currentLines[index]) {
    index += 1;
  }

  return index;
}

function readCommonSuffixLength(previousLines, currentLines, prefixLength) {
  const maxSuffixLength = Math.min(previousLines.length, currentLines.length) - prefixLength;
  let suffixLength = 0;

  while (
    suffixLength < maxSuffixLength &&
    previousLines[previousLines.length - 1 - suffixLength] ===
      currentLines[currentLines.length - 1 - suffixLength]
  ) {
    suffixLength += 1;
  }

  return suffixLength;
}

function createDiffEntry(kind, lineText, previousLineNumber, currentLineNumber) {
  return {
    kind,
    lineText,
    previousLineNumber,
    currentLineNumber,
    isEmptyLine: lineText === '',
  };
}

function buildUnchangedEntries(lines, previousLineOffset, currentLineOffset) {
  return lines.map((lineText, index) =>
    createDiffEntry(
      'unchanged',
      lineText,
      previousLineOffset + index + 1,
      currentLineOffset + index + 1
    )
  );
}

function buildFallbackChangedEntries(
  previousLines,
  currentLines,
  previousLineOffset,
  currentLineOffset
) {
  const removedEntries = previousLines.map((lineText, index) =>
    createDiffEntry('removed', lineText, previousLineOffset + index + 1, null)
  );
  const addedEntries = currentLines.map((lineText, index) =>
    createDiffEntry('added', lineText, null, currentLineOffset + index + 1)
  );

  return [...removedEntries, ...addedEntries];
}

function buildExactMiddleEntries(
  previousLines,
  currentLines,
  previousLineOffset,
  currentLineOffset
) {
  const rowCount = previousLines.length + 1;
  const columnCount = currentLines.length + 1;
  const table = Array.from({ length: rowCount }, () => new Uint32Array(columnCount));

  for (let previousIndex = previousLines.length - 1; previousIndex >= 0; previousIndex -= 1) {
    for (let currentIndex = currentLines.length - 1; currentIndex >= 0; currentIndex -= 1) {
      if (previousLines[previousIndex] === currentLines[currentIndex]) {
        table[previousIndex][currentIndex] = table[previousIndex + 1][currentIndex + 1] + 1;
        continue;
      }

      table[previousIndex][currentIndex] = Math.max(
        table[previousIndex + 1][currentIndex],
        table[previousIndex][currentIndex + 1]
      );
    }
  }

  const entries = [];
  let previousIndex = 0;
  let currentIndex = 0;

  while (previousIndex < previousLines.length && currentIndex < currentLines.length) {
    if (previousLines[previousIndex] === currentLines[currentIndex]) {
      entries.push(
        createDiffEntry(
          'unchanged',
          previousLines[previousIndex],
          previousLineOffset + previousIndex + 1,
          currentLineOffset + currentIndex + 1
        )
      );
      previousIndex += 1;
      currentIndex += 1;
      continue;
    }

    if (table[previousIndex + 1][currentIndex] >= table[previousIndex][currentIndex + 1]) {
      entries.push(
        createDiffEntry(
          'removed',
          previousLines[previousIndex],
          previousLineOffset + previousIndex + 1,
          null
        )
      );
      previousIndex += 1;
      continue;
    }

    entries.push(
      createDiffEntry(
        'added',
        currentLines[currentIndex],
        null,
        currentLineOffset + currentIndex + 1
      )
    );
    currentIndex += 1;
  }

  while (previousIndex < previousLines.length) {
    entries.push(
      createDiffEntry(
        'removed',
        previousLines[previousIndex],
        previousLineOffset + previousIndex + 1,
        null
      )
    );
    previousIndex += 1;
  }

  while (currentIndex < currentLines.length) {
    entries.push(
      createDiffEntry(
        'added',
        currentLines[currentIndex],
        null,
        currentLineOffset + currentIndex + 1
      )
    );
    currentIndex += 1;
  }

  return entries;
}

function buildMiddleEntries(previousLines, currentLines, previousLineOffset, currentLineOffset) {
  if (!previousLines.length && !currentLines.length) {
    return [];
  }

  if (!previousLines.length || !currentLines.length) {
    return buildFallbackChangedEntries(
      previousLines,
      currentLines,
      previousLineOffset,
      currentLineOffset
    );
  }

  if (previousLines.length * currentLines.length > EXACT_MIDDLE_DIFF_CELL_LIMIT) {
    return buildFallbackChangedEntries(
      previousLines,
      currentLines,
      previousLineOffset,
      currentLineOffset
    );
  }

  return buildExactMiddleEntries(
    previousLines,
    currentLines,
    previousLineOffset,
    currentLineOffset
  );
}

export function buildArtifactLineDiff(previousLines, currentLines) {
  const normalizedPreviousLines = normalizeLines(previousLines);
  const normalizedCurrentLines = normalizeLines(currentLines);
  const prefixLength = readCommonPrefixLength(normalizedPreviousLines, normalizedCurrentLines);
  const suffixLength = readCommonSuffixLength(
    normalizedPreviousLines,
    normalizedCurrentLines,
    prefixLength
  );
  const previousMiddleEnd = normalizedPreviousLines.length - suffixLength;
  const currentMiddleEnd = normalizedCurrentLines.length - suffixLength;
  const unchangedPrefix = buildUnchangedEntries(
    normalizedPreviousLines.slice(0, prefixLength),
    0,
    0
  );
  const changedMiddle = buildMiddleEntries(
    normalizedPreviousLines.slice(prefixLength, previousMiddleEnd),
    normalizedCurrentLines.slice(prefixLength, currentMiddleEnd),
    prefixLength,
    prefixLength
  );
  const unchangedSuffix = buildUnchangedEntries(
    normalizedPreviousLines.slice(previousMiddleEnd),
    previousMiddleEnd,
    currentMiddleEnd
  );
  const entries = [...unchangedPrefix, ...changedMiddle, ...unchangedSuffix];
  const addedCount = entries.filter((entry) => entry.kind === 'added').length;
  const removedCount = entries.filter((entry) => entry.kind === 'removed').length;
  const unchangedCount = entries.filter((entry) => entry.kind === 'unchanged').length;

  return {
    entries,
    addedCount,
    removedCount,
    unchangedCount,
    hasChanges: addedCount > 0 || removedCount > 0,
  };
}
