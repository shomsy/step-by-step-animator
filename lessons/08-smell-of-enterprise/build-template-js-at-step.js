import templateJsTimelineDocument from './content/documents/files/template-js.timeline.md?raw';
import { buildLinesFromTimelineBlocks } from '../../animator/lesson-documents/build-lines-from-timeline-blocks.js';
import { readTimelineBlocks } from '../../animator/lesson-documents/read-timeline-blocks.js';
import { stepNumberById } from './describe-steps.js';

const templateJsTimelineBlocks = readTimelineBlocks(templateJsTimelineDocument);

export function buildTemplateJsAtStep(stepNumber) {
  return buildLinesFromTimelineBlocks({
    timelineBlocks: templateJsTimelineBlocks,
    stepNumberById,
    stepNumber
  });
}
