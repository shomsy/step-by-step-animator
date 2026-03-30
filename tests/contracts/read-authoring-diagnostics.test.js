import test from 'node:test';
import assert from 'node:assert/strict';
import { readEditorContextFromScan, scanLessonScriptSource } from '../../system/author-lessons/lesson-script-workbench.js';
import { readAuthoringDiagnostics } from '../../system/author-lessons/read-authoring-diagnostics.js';

function buildLessonSource(lines) {
  return [
    '---',
    'schemaVersion: 1',
    'lessonId: lint-smoke',
    'lessonTitle: Lint Smoke',
    'lessonIntro: Human-readable diagnostics coverage.',
    'status: draft',
    'courseId: step-by-step-animator',
    'order: 1',
    'artifacts:',
    '  - artifactId: html',
    '    language: html',
    '    label: index.html',
    '    isPrimary: true',
    'preview:',
    '  title: Preview',
    '  address: browser://lint-smoke',
    '---',
    ...lines
  ].join('\n');
}

test('readAuthoringDiagnostics translates metadata validation into metadata drawer guidance', () => {
  const sourceMarkdown = buildLessonSource([
    '# Step: intro-step',
    'title: Intro step',
    'summary: Explain the first move.',
    'intent: Start the lesson.',
    '',
    '## Scene: intro-scene',
    '',
    '### Narration',
    'Explain the scene.',
    '',
    '### Show Code: html',
    '```html',
    '<div>Hello</div>',
    '```'
  ]);
  const editorScan = scanLessonScriptSource(sourceMarkdown, null);
  const diagnostics = readAuthoringDiagnostics({
    analysis: {
      editorContext: readEditorContextFromScan(editorScan, 0),
      parseErrorMessage: 'lesson.script.md must define preview.type.'
    }
  });

  assert.equal(diagnostics.length, 1);
  assert.equal(diagnostics[0].contextLabel, 'Metadata · preview.type');
  assert.equal(diagnostics[0].lineNumber, 14);
  assert.equal(
    diagnostics[0].humanMessage,
    'U Metadata drawer-u nedostaje "preview.type". Otvori Metadata i popuni to polje.'
  );
});

test('readAuthoringDiagnostics points broken show-code fences to the failing section with human copy', () => {
  const sourceMarkdown = buildLessonSource([
    '# Step: intro-step',
    'title: Intro step',
    'summary: Explain the first move.',
    'intent: Start the lesson.',
    '',
    '## Scene: intro-scene',
    '',
    '### Narration',
    'Explain the scene.',
    '',
    '### Show Code: html',
    '```html',
    '<div>Hello</div>'
  ]);
  const showCodeOffset = sourceMarkdown.indexOf('### Show Code: html');
  const editorScan = scanLessonScriptSource(sourceMarkdown, null);
  const diagnostics = readAuthoringDiagnostics({
    analysis: {
      editorContext: readEditorContextFromScan(editorScan, showCodeOffset),
      parseErrorMessage: 'Scene "intro-scene" in step "intro-step" must wrap "Show Code: html" in a fenced code block.'
    }
  });

  assert.equal(diagnostics.length, 1);
  assert.equal(diagnostics[0].contextLabel, 'Show Code: html');
  assert.equal(diagnostics[0].lineNumber, 28);
  assert.equal(
    diagnostics[0].humanMessage,
    'Show Code blok za "html" nije pravilno zatvoren. Otvori ga sa ``` i zatvori sa ``` oko koda.'
  );
});
