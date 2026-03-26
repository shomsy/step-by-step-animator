function readStepBoundary(stepReference, stepNumberById) {
  if (typeof stepReference === 'number') {
    return stepReference;
  }

  if (!stepReference) {
    return Number.POSITIVE_INFINITY;
  }

  return stepNumberById[stepReference] ?? Number.POSITIVE_INFINITY;
}

function appendVisibleRuleBlock(lines, ruleBlock, stepNumber, stepNumberById) {
  const activeEntries = ruleBlock.entries.filter(entry =>
    stepNumber >= readStepBoundary(entry.from, stepNumberById) &&
    (entry.untilBefore === undefined || stepNumber < readStepBoundary(entry.untilBefore, stepNumberById))
  );

  if (!activeEntries.length && stepNumber < readStepBoundary(ruleBlock.showFrom, stepNumberById)) {
    return;
  }

  if (lines.length) {
    lines.push('');
  }

  if (Array.isArray(ruleBlock.header)) {
    ruleBlock.header.forEach(headerLine => lines.push(headerLine));
  } else {
    lines.push(ruleBlock.header);
  }

  activeEntries.forEach(entry => {
    lines.push(`  ${entry.line}`);
  });

  lines.push('}');
}

export function buildLinesFromRuleBlocks({ ruleBlocks, stepNumberById, stepNumber }) {
  const lines = [];

  ruleBlocks.forEach(ruleBlock => {
    appendVisibleRuleBlock(lines, ruleBlock, stepNumber, stepNumberById);
  });

  return lines;
}
