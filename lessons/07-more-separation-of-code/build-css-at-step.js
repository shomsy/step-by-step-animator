import cssRulesDocument from './content/documents/files/css.rules.md?raw';
import { buildLinesFromRuleBlocks } from '../../animator/lesson-documents/build-lines-from-rule-blocks.js';
import { readRuleBlocks } from '../../animator/lesson-documents/read-rule-blocks.js';
import { stepNumberById } from './describe-steps.js';

const cssRuleBlocks = readRuleBlocks(cssRulesDocument);

export function buildCssAtStep(stepNumber) {
  return buildLinesFromRuleBlocks({
    ruleBlocks: cssRuleBlocks,
    stepNumberById,
    stepNumber
  });
}
