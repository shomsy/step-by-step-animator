import { readFencedJsonValue } from './read-fenced-json-value.js';

function isValidHeader(header) {
  return (
    typeof header === 'string' ||
    (Array.isArray(header) && header.length > 0 && header.every((line) => typeof line === 'string'))
  );
}

function normalizeRuleBlock(ruleBlock) {
  if (!ruleBlock || typeof ruleBlock !== 'object') {
    throw new Error('Each CSS rule block must be an object.');
  }

  if (!isValidHeader(ruleBlock.header)) {
    throw new Error(
      'Each CSS rule block must define a string header or an array of string header lines.'
    );
  }

  if (!Array.isArray(ruleBlock.entries)) {
    throw new Error('Each CSS rule block must define an entries array.');
  }

  return {
    header: ruleBlock.header,
    showFrom: ruleBlock.showFrom,
    entries: ruleBlock.entries.map((entry) => {
      if (!entry || typeof entry !== 'object' || typeof entry.line !== 'string') {
        throw new Error('Each CSS rule entry must be an object with a string line.');
      }

      return {
        from: entry.from,
        untilBefore: entry.untilBefore,
        line: entry.line,
      };
    }),
  };
}

export function readRuleBlocks(markdown) {
  const parsedValue = readFencedJsonValue(markdown);

  if (!Array.isArray(parsedValue)) {
    throw new Error('CSS rules markdown must contain a JSON array of rule blocks.');
  }

  return parsedValue.map(normalizeRuleBlock);
}
