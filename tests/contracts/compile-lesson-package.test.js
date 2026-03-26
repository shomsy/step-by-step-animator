import test from 'node:test';
import assert from 'node:assert/strict';
import { compileLessonPackage } from '../../system/lesson-engine/compile-lesson-package.js';
import { createSourceOnlyLessonFixture } from '../fixtures/source-only-lesson-fixture.js';

test('compileLessonPackage compiles the canonical source-only lesson package', () => {
  const fixture = createSourceOnlyLessonFixture();
  const compiled = compileLessonPackage({
    lessonMarkdown: fixture.lessonMarkdown,
    scenesMarkdown: fixture.scenesMarkdown,
    artifactMarkdownById: fixture.artifactMarkdownById,
    theoryMarkdown: fixture.theoryMarkdown
  });

  assert.equal(compiled.schemaVersion, 1);
  assert.equal(compiled.meta.lessonId, '01-build-sidebar');
  assert.equal(compiled.meta.lessonTitle, 'Build Sidebar');
  assert.equal(compiled.previewTitle, 'Sidebar preview');
  assert.equal(compiled.htmlFileName, 'index.html');
  assert.equal(compiled.cssFileName, 'style.css');
  assert.equal(compiled.teaching.steps.length, 2);
  assert.equal(compiled.teaching.steps[0].scenes[0].sceneId, 'intro-shell');
  assert.equal(compiled.teaching.steps[0].narration, 'First, we introduce the smallest possible sidebar shell.');
  assert.equal(compiled.teaching.steps[1].narration, 'Now we add a navigation block inside the sidebar.');

  assert.deepEqual(compiled.artifacts.map(artifact => artifact.artifactId), ['html', 'css']);
  assert.deepEqual(compiled.statesByStep[0].artifacts.html, [
    '<aside class="sidebar">',
    '  <nav>',
    '    <a href="#">Home</a>',
    '  </nav>',
    '</aside>'
  ]);
  assert.deepEqual(compiled.statesByStep[1].artifacts.html, [
    '<aside class="sidebar">',
    '  <nav>',
    '    <a href="#">Home</a>',
    '  </nav>',
    '</aside>',
    '<footer class="sidebar-footer">Footer</footer>'
  ]);
  assert.deepEqual(compiled.statesByStep[0].artifacts.css, [
    '.sidebar {',
    '  display: block;',
    '}'
  ]);
  assert.ok(compiled.statesByStep[1].artifacts.css.some(line => line.includes('color: rebeccapurple;')));
  assert.deepEqual(compiled.buildHtmlAtStep(1), compiled.statesByStep[1].artifacts.html);
  assert.deepEqual(compiled.buildCssAtStep(1), compiled.statesByStep[1].artifacts.css);
});

test('compileLessonPackage rejects missing theory markdown when theory is enabled', () => {
  const fixture = createSourceOnlyLessonFixture();

  assert.throws(() => compileLessonPackage({
    lessonMarkdown: fixture.lessonMarkdown,
    scenesMarkdown: fixture.scenesMarkdown,
    artifactMarkdownById: fixture.artifactMarkdownById
  }), /theoryMarkdown/);
});

test('compileLessonPackage rejects unknown artifact and theory references', () => {
  const fixture = createSourceOnlyLessonFixture();
  const unknownArtifactScenes = fixture.scenesMarkdown.replace('artifactId: html', 'artifactId: missing-artifact');
  const unknownTheoryScenes = fixture.scenesMarkdown.replace('why-shell-first', 'missing-theory-anchor');

  assert.throws(() => compileLessonPackage({
    lessonMarkdown: fixture.lessonMarkdown,
    scenesMarkdown: unknownArtifactScenes,
    artifactMarkdownById: fixture.artifactMarkdownById,
    theoryMarkdown: fixture.theoryMarkdown
  }), /unknown artifact/);

  assert.throws(() => compileLessonPackage({
    lessonMarkdown: fixture.lessonMarkdown,
    scenesMarkdown: unknownTheoryScenes,
    artifactMarkdownById: fixture.artifactMarkdownById,
    theoryMarkdown: fixture.theoryMarkdown
  }), /unknown theory\.anchor/);
});
