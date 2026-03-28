import test from 'node:test';
import assert from 'node:assert/strict';
import { compileLessonScript } from '../../system/lesson-engine/compile-lesson-script.js';
import { createLessonScriptFixture } from '../fixtures/lesson-script-fixture.js';

test('compileLessonScript compiles the human-first lesson script into lesson runtime data', () => {
  const fixture = createLessonScriptFixture();
  const compiled = compileLessonScript({
    scriptMarkdown: fixture.scriptMarkdown
  });

  assert.equal(compiled.schemaVersion, 1);
  assert.equal(compiled.meta.lessonId, '09-human-first-script-demo');
  assert.equal(compiled.lessonTitle, 'Human-First Script Demo');
  assert.equal(compiled.steps.length, 4);
  assert.equal(compiled.steps[0].scenes[0].sceneId, 'empty-shell-scene');
  assert.deepEqual(compiled.artifacts.map(artifact => artifact.kind), ['snapshot', 'snapshot']);
  assert.deepEqual(compiled.statesByStep[0].artifacts.html, ['<div class="app-shell"></div>']);
  assert.deepEqual(compiled.statesByStep[1].artifacts.html, [
    '<div class="app-shell">',
    '  <aside class="callout-card">',
    '    <strong>Ship the DSL</strong>',
    '    <p>One lesson script should stay readable from top to bottom.</p>',
    '  </aside>',
    '</div>'
  ]);
  assert.deepEqual(compiled.statesByStep[1].artifacts.css, []);
  assert.ok(compiled.statesByStep[3].artifacts.css.some(line => line.includes('.callout-card {')));
  assert.deepEqual(compiled.buildHtmlAtStep(1), compiled.statesByStep[1].artifacts.html);
  assert.deepEqual(compiled.buildCssAtStep(3), compiled.statesByStep[3].artifacts.css);
});

test('compileLessonScript rejects unknown scene artifacts', () => {
  const fixture = createLessonScriptFixture();
  const brokenScript = fixture.scriptMarkdown.replace('### Show Code: html', '### Show Code: js');

  assert.throws(() => compileLessonScript({
    scriptMarkdown: brokenScript
  }), /unknown artifact/);
});
