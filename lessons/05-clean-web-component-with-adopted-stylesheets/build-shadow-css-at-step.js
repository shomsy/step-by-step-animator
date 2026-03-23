import shadowCssRulesDocument from './content/documents/files/shadow-dom-style.css.md?raw';
import { buildLinesFromRuleBlocks } from '../../animator/lesson-documents/build-lines-from-rule-blocks.js';
import { readRuleBlocks } from '../../animator/lesson-documents/read-rule-blocks.js';
import { stepNumberById } from './describe-steps.js';

const shadowCssRuleBlocks = readRuleBlocks(shadowCssRulesDocument);

export function buildShadowCssAtStep(stepNumber) {
  return buildLinesFromRuleBlocks({
    ruleBlocks: shadowCssRuleBlocks,
    stepNumberById,
    stepNumber
  });
}
