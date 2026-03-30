import { buildArtifactLineDiff } from '../../../lesson-engine/build-artifact-line-diff.js';

export function compareCodeLines(currentLines, previousLines) {
  return buildArtifactLineDiff(previousLines, currentLines);
}
