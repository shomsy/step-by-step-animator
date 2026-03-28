import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildLessonScriptFromSource } from '../../system/lesson-engine/build-lesson-script-from-source.js';
import { compileSourceLesson } from '../../system/lesson-engine/compile-source-lesson.js';
import { compileLessonScript } from '../../system/lesson-engine/compile-lesson-script.js';
import { createSourceOnlyLessonFixture } from '../fixtures/source-only-lesson-fixture.js';

function writeFixtureSourceRoot(rootPath, fixture) {
  fs.mkdirSync(path.join(rootPath, 'artifacts'), { recursive: true });
  fs.writeFileSync(path.join(rootPath, 'lesson.md'), fixture.lessonMarkdown);
  fs.writeFileSync(path.join(rootPath, 'scenes.md'), fixture.scenesMarkdown);
  fs.writeFileSync(path.join(rootPath, 'theory.md'), fixture.theoryMarkdown);

  Object.entries(fixture.artifactMarkdownById).forEach(([artifactId, artifactMarkdown]) => {
    const fileNameByArtifactId = {
      html: 'html.timeline.md',
      css: 'css.rules.md'
    };

    fs.writeFileSync(
      path.join(rootPath, 'artifacts', fileNameByArtifactId[artifactId]),
      artifactMarkdown
    );
  });
}

test('buildLessonScriptFromSource preserves lesson runtime parity when exporting split source', () => {
  const fixture = createSourceOnlyLessonFixture();
  const sourceRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'lesson-script-export-'));

  try {
    writeFixtureSourceRoot(sourceRoot, fixture);

    const scriptMarkdown = buildLessonScriptFromSource({ sourceRoot });
    const { compiledLesson: splitCompiledLesson } = compileSourceLesson({ sourceRoot });
    const scriptCompiledLesson = compileLessonScript({
      scriptMarkdown,
      theoryMarkdown: fixture.theoryMarkdown
    });

    assert.match(scriptMarkdown, /^---\nschemaVersion: 1/m);
    assert.match(scriptMarkdown, /^# Step: add-sidebar-shell$/m);
    assert.match(scriptMarkdown, /^## Scene: intro-shell$/m);
    assert.match(scriptMarkdown, /^### Show Code: css$/m);
    assert.deepEqual(
      scriptCompiledLesson.meta,
      splitCompiledLesson.meta
    );
    assert.deepEqual(
      scriptCompiledLesson.steps.map(step => step.id),
      splitCompiledLesson.steps.map(step => step.id)
    );
    assert.deepEqual(
      scriptCompiledLesson.steps.map(step => step.scenes.map(scene => ({
        sceneId: scene.sceneId,
        narration: scene.narration,
        preview: {
          action: scene.preview?.action || '',
          target: scene.preview?.target || ''
        },
        theory: scene.theory || null
      }))),
      splitCompiledLesson.steps.map(step => step.scenes.map(scene => ({
        sceneId: scene.sceneId,
        narration: scene.narration,
        preview: {
          action: scene.preview?.action || '',
          target: scene.preview?.target || ''
        },
        theory: scene.theory || null
      })))
    );
    assert.deepEqual(
      scriptCompiledLesson.statesByStep.map(stepState => stepState.artifacts),
      splitCompiledLesson.statesByStep.map(stepState => stepState.artifacts)
    );
    assert.deepEqual(
      scriptCompiledLesson.artifacts.map(artifact => ({
        artifactId: artifact.artifactId,
        language: artifact.language,
        fileName: artifact.fileName
      })),
      splitCompiledLesson.artifacts.map(artifact => ({
        artifactId: artifact.artifactId,
        language: artifact.language,
        fileName: artifact.fileName
      }))
    );
  } finally {
    fs.rmSync(sourceRoot, {
      recursive: true,
      force: true
    });
  }
});
