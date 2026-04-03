import test from 'node:test';
import assert from 'node:assert/strict';
import { compileLessonScript } from '../../system/lesson-engine/compile-lesson-script.js';
import { createLessonScriptFixture } from '../fixtures/lesson-script-fixture.js';

test('compileLessonScript compiles the human-first lesson script into lesson runtime data', () => {
  const fixture = createLessonScriptFixture();
  const compiled = compileLessonScript({
    scriptMarkdown: fixture.scriptMarkdown,
  });

  assert.equal(compiled.schemaVersion, 1);
  assert.equal(compiled.meta.lessonId, '09-human-first-script-demo');
  assert.equal(compiled.lessonTitle, 'Human-First Script Demo');
  assert.equal(compiled.steps.length, 38);
  assert.equal(compiled.steps[0].scenes[0].sceneId, 'empty-shell-scene');
  assert.deepEqual(
    compiled.artifacts.map((artifact) => artifact.kind),
    Array(5).fill('snapshot')
  );
  assert.ok(
    compiled.statesByStep[0].artifacts.html.some((line) => line.includes('<div class="app-shell">'))
  );
  assert.ok(
    compiled.statesByStep[0].artifacts.html.some((line) => line.includes('Ovde će ući'))
  );
  assert.ok(
    compiled.statesByStep.some(state => 
      state.artifacts.html && state.artifacts.html.some((line) => line.includes('ui-user-avatar'))
    )
  );
  assert.ok(
    compiled.statesByStep.some(state => 
      state.artifacts['shadow-css'] && state.artifacts['shadow-css'].some((line) => line.includes(':host'))
    )
  );
  assert.ok(
    compiled.statesByStep.some(state => 
      state.artifacts['shadow-css'] && state.artifacts['shadow-css'].some((line) => line.includes('.avatar-container'))
    )
  );

  // Bugfix regression check for step 7 in lesson narrative: container CSS should include baseline app-shell and avatar-layout.
  const step7Css = compiled.buildCssAtStep(6).join('\n');
  assert.ok(step7Css.includes('.app-shell')); // app-shell style must persist on first css step
  assert.ok(step7Css.includes('.avatar-container'));

  const step8Css = compiled.buildCssAtStep(7).join('\n');
  assert.ok(step8Css.includes('.avatar-container:hover'));

  // Enterprise-grade safety: ensure CSS state stays cumulative across CSS steps (no accidental wipes)
  for (let idx = 6; idx < 12; idx += 1) {
    const cssText = compiled.buildCssAtStep(idx).join('\n');
    assert.ok(cssText.includes('.app-shell'), `Step ${idx + 1} css must include .app-shell`);
    assert.ok(cssText.includes('.avatar-container'), `Step ${idx + 1} css must include .avatar-container`);
  }

  assert.deepEqual(compiled.buildHtmlAtStep(1), compiled.statesByStep[1].artifacts.html);
  assert.deepEqual(compiled.buildCssAtStep(2), compiled.statesByStep[2].artifacts.css);
});

test('compileLessonScript rejects unknown scene artifacts', () => {
  const fixture = createLessonScriptFixture();
  const brokenScript = fixture.scriptMarkdown.replace('### Show Code: html', '### Show Code: unknown-artifact');

  assert.throws(
    () =>
      compileLessonScript({
        scriptMarkdown: brokenScript,
      }),
    /unknown artifact/
  );
});
