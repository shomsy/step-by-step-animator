import jsTimelineDocument from './content/documents/files/js.timeline.md?raw';
import { buildLinesFromTimelineBlocks } from '../../animator/lesson-documents/build-lines-from-timeline-blocks.js';
import { readTimelineBlocks } from '../../animator/lesson-documents/read-timeline-blocks.js';
import { stepNumberById } from './describe-steps.js';

const jsTimelineBlocks = readTimelineBlocks(jsTimelineDocument);

export function buildJsAtStep(stepNumber) {
  return buildLinesFromTimelineBlocks({
    timelineBlocks: jsTimelineBlocks,
    stepNumberById,
    stepNumber
  });
}
