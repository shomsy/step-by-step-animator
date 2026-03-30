import test from 'node:test';
import assert from 'node:assert/strict';
import { buildArtifactLineDiff } from '../../system/lesson-engine/build-artifact-line-diff.js';

test('buildArtifactLineDiff keeps unchanged lines and marks inserted additions', () => {
  const diff = buildArtifactLineDiff(
    ['<div>', '  <p>Old</p>', '</div>'],
    ['<div>', '  <p>Old</p>', '  <span>New</span>', '</div>']
  );

  assert.equal(diff.addedCount, 1);
  assert.equal(diff.removedCount, 0);
  assert.deepEqual(
    diff.entries.map(entry => [entry.kind, entry.lineText, entry.previousLineNumber, entry.currentLineNumber]),
    [
      ['unchanged', '<div>', 1, 1],
      ['unchanged', '  <p>Old</p>', 2, 2],
      ['added', '  <span>New</span>', null, 3],
      ['unchanged', '</div>', 3, 4]
    ]
  );
});

test('buildArtifactLineDiff marks replaced lines as removed and added with stable neighbors', () => {
  const diff = buildArtifactLineDiff(
    ['<div>', '  <p>Before</p>', '  <small>Keep</small>', '</div>'],
    ['<div>', '  <section>After</section>', '  <small>Keep</small>', '</div>']
  );

  assert.equal(diff.addedCount, 1);
  assert.equal(diff.removedCount, 1);
  assert.deepEqual(
    diff.entries.map(entry => [entry.kind, entry.lineText, entry.previousLineNumber, entry.currentLineNumber]),
    [
      ['unchanged', '<div>', 1, 1],
      ['removed', '  <p>Before</p>', 2, null],
      ['added', '  <section>After</section>', null, 2],
      ['unchanged', '  <small>Keep</small>', 3, 3],
      ['unchanged', '</div>', 4, 4]
    ]
  );
});
