import htmlTimelineDocument from './content/documents/files/html.timeline.md?raw';
import { buildLinesFromTimelineBlocks } from '../../animator/lesson-documents/build-lines-from-timeline-blocks.js';
import { readTimelineBlocks } from '../../animator/lesson-documents/read-timeline-blocks.js';
import { stepNumberById } from './describe-steps.js';

const htmlTimelineBlocks = readTimelineBlocks(htmlTimelineDocument);

export function buildHtmlAtStep(stepNumber) {
  return buildLinesFromTimelineBlocks({
    timelineBlocks: htmlTimelineBlocks,
    stepNumberById,
    stepNumber
  });
}
