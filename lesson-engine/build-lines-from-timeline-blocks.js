const ROOT_SLOT = 'root';

function readStepBoundary(stepReference, stepNumberById) {
  if (typeof stepReference === 'number') {
    return stepReference;
  }

  if (!stepReference) {
    return Number.POSITIVE_INFINITY;
  }

  return stepNumberById[stepReference] ?? Number.POSITIVE_INFINITY;
}

function createSlotMarker(slotName) {
  return `@@slot:${slotName}@@`;
}

function isSlotMarker(line) {
  return /^@@slot:[a-zA-Z0-9_-]+@@$/.test(line.trim());
}

function insertTimelineBlock(lines, timelineBlock) {
  const slotMarker = createSlotMarker(timelineBlock.target);
  const slotIndex = lines.findIndex(line => line.trim() === slotMarker);

  if (slotIndex === -1) {
    throw new Error(`Missing target slot "${timelineBlock.target}" while composing timeline lines.`);
  }

  lines.splice(slotIndex, 0, ...timelineBlock.lines);
}

export function buildLinesFromTimelineBlocks({ timelineBlocks, stepNumberById, stepNumber }) {
  const lines = [createSlotMarker(ROOT_SLOT)];

  timelineBlocks.forEach(timelineBlock => {
    if (stepNumber >= readStepBoundary(timelineBlock.from, stepNumberById)) {
      insertTimelineBlock(lines, timelineBlock);
    }
  });

  return lines.filter(line => !isSlotMarker(line));
}
