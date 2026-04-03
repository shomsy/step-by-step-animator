import test from 'node:test';
import assert from 'node:assert/strict';
import { readScenesContract } from '../../system/lesson-engine/read-scenes-contract.js';
import { createSourceOnlyLessonFixture } from '../fixtures/source-only-lesson-fixture.js';

test('readScenesContract parses the canonical storyboard DSL', () => {
  const fixture = createSourceOnlyLessonFixture();
  const contract = readScenesContract(fixture.scenesMarkdown);

  assert.equal(contract.schemaVersion, 1);
  assert.equal(contract.lessonId, '01-build-sidebar');
  assert.equal(contract.steps.length, 2);
  assert.deepEqual(contract.stepHeadings, ['add-sidebar-shell', 'add-sidebar-navigation']);
  assert.equal(contract.steps[0].scenes[0].sceneId, 'intro-shell');
  assert.equal(contract.steps[0].scenes[1].sceneId, 'empty-css-state');
  assert.equal(contract.steps[1].scenes[0].sceneId, 'add-nav-block');
});

test('readScenesContract rejects scenes before a declared step', () => {
  const fixture = createSourceOnlyLessonFixture();
  const brokenScenesMarkdown = fixture.scenesMarkdown.replace(
    '# Step: add-sidebar-shell',
    '## Scene: orphan-scene'
  );

  assert.throws(() => readScenesContract(brokenScenesMarkdown), /before any step heading/);
});
