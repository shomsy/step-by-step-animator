import test from 'node:test';
import assert from 'node:assert/strict';
import { readLessonScript } from '../../system/lesson-engine/read-lesson-script.js';
import { createLessonScriptFixture } from '../fixtures/lesson-script-fixture.js';

test('readLessonScript parses the canonical human-first lesson script', () => {
  const fixture = createLessonScriptFixture();
  const contract = readLessonScript(fixture.scriptMarkdown);

  assert.equal(contract.schemaVersion, 1);
  assert.equal(contract.lessonId, '09-human-first-script-demo');
  assert.equal(contract.steps.length, 4);
  assert.equal(contract.steps[0].stepId, 'empty-shell');
  assert.equal(contract.steps[0].scenes[0].sceneId, 'empty-shell-scene');
  assert.equal(contract.steps[1].scenes[0].showCodeBlocks[0].artifactId, 'html');
  assert.equal(contract.steps[2].scenes[0].showCodeBlocks[0].artifactId, 'css');
});

test('readLessonScript rejects a scene before any step heading', () => {
  const fixture = createLessonScriptFixture();
  const brokenScript = fixture.scriptMarkdown.replace('# Step: empty-shell', '## Scene: orphan-scene');

  assert.throws(() => readLessonScript(brokenScript), /before any step heading/);
});
