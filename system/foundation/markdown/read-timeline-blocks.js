import { readFencedJsonValue } from './read-fenced-json-value.js';

function normalizeTimelineBlock(timelineBlock) {
  if (!timelineBlock || typeof timelineBlock !== 'object') {
    throw new Error('Each timeline block must be an object.');
  }

  if (typeof timelineBlock.target !== 'string' || !timelineBlock.target.trim()) {
    throw new Error('Each timeline block must define a non-empty target slot.');
  }

  if (
    !Array.isArray(timelineBlock.lines) ||
    timelineBlock.lines.some((line) => typeof line !== 'string')
  ) {
    throw new Error('Each timeline block must define a lines array of strings.');
  }

  return {
    from: timelineBlock.from,
    target: timelineBlock.target.trim(),
    lines: timelineBlock.lines,
  };
}

export function readTimelineBlocks(markdown) {
  const parsedValue = readFencedJsonValue(markdown);

  if (!Array.isArray(parsedValue)) {
    throw new Error('Timeline markdown must contain a JSON array of timeline blocks.');
  }

  return parsedValue.map(normalizeTimelineBlock);
}
