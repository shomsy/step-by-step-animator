import {
  assertKebabCase,
  assertOneOf,
  assertPositiveInteger,
  buildCompiledLesson,
  isPlainObject,
  normalizeString
} from './build-compiled-lesson.js';
import { readLessonScript } from './read-lesson-script.js';

function normalizeScriptArtifactDeclaration(artifact) {
  if (!isPlainObject(artifact)) {
    throw new Error('Each lesson.script.md artifact declaration must be an object.');
  }

  const artifactId = normalizeString(artifact.artifactId);
  const language = normalizeString(artifact.language);
  const label = normalizeString(artifact.label);

  if (!artifactId) {
    throw new Error('Each lesson.script.md artifact declaration must define artifactId.');
  }

  if (!language) {
    throw new Error(`Artifact "${artifactId}" in lesson.script.md must define language.`);
  }

  assertKebabCase(artifactId, 'Artifact ID');

  return {
    artifactId,
    language,
    kind: 'snapshot',
    label: label || readDefaultArtifactLabel(artifactId, language),
    file: './lesson.script.md',
    isPrimary: Boolean(artifact.isPrimary)
  };
}

function readDefaultArtifactLabel(artifactId, language) {
  const fileNamesByArtifactId = {
    html: 'index.html',
    css: 'style.css',
    js: 'component.js',
    'template-js': 'template.js',
    'shadow-css': 'shadow-dom-style.css'
  };

  return fileNamesByArtifactId[artifactId] || `${artifactId}.${language}`;
}

function validateLessonScriptManifest(attributes) {
  const schemaVersion = Number(attributes.schemaVersion);
  const lessonId = normalizeString(attributes.lessonId);
  const lessonTitle = normalizeString(attributes.lessonTitle);
  const lessonIntro = normalizeString(attributes.lessonIntro);
  const status = normalizeString(attributes.status);
  const courseId = normalizeString(attributes.courseId);
  const preview = attributes.preview;
  const artifacts = attributes.artifacts;
  const theory = attributes.theory;

  if (!Number.isInteger(schemaVersion) || schemaVersion < 1) {
    throw new Error('lesson.script.md must define schemaVersion.');
  }

  if (!lessonId) {
    throw new Error('lesson.script.md must define lessonId.');
  }

  assertKebabCase(lessonId, 'Lesson ID');

  if (!lessonTitle) {
    throw new Error('lesson.script.md must define lessonTitle.');
  }

  if (!lessonIntro) {
    throw new Error('lesson.script.md must define lessonIntro.');
  }

  if (!status) {
    throw new Error('lesson.script.md must define status.');
  }

  assertOneOf(status, new Set(['draft', 'active', 'broken', 'deprecated']), 'lesson.script.md status');

  if (!courseId) {
    throw new Error('lesson.script.md must define courseId.');
  }

  assertPositiveInteger(Number(attributes.order), 'lesson.script.md order');

  if (!isPlainObject(preview)) {
    throw new Error('lesson.script.md must define a preview object.');
  }

  const previewType = normalizeString(preview.type);
  const previewTitle = normalizeString(preview.title);
  const previewAddress = normalizeString(preview.address);

  if (!previewType) {
    throw new Error('lesson.script.md must define preview.type.');
  }

  assertOneOf(previewType, new Set(['dom', 'terminal', 'markdown', 'diagram', 'none']), 'lesson.script.md preview.type');

  if (!previewTitle) {
    throw new Error('lesson.script.md must define preview.title.');
  }

  if (!previewAddress) {
    throw new Error('lesson.script.md must define preview.address.');
  }

  if (isPlainObject(theory) && theory.enabled === true && !normalizeString(theory.file)) {
    throw new Error('lesson.script.md must define theory.file when theory.enabled is true.');
  }

  if (!Array.isArray(artifacts) || !artifacts.length) {
    throw new Error('lesson.script.md must declare at least one artifact.');
  }

  const artifactIds = new Set();

  artifacts.forEach((artifact, index) => {
    if (!isPlainObject(artifact)) {
      throw new Error(`Artifact declaration at index ${index} in lesson.script.md must be an object.`);
    }

    const artifactId = normalizeString(artifact.artifactId);
    const language = normalizeString(artifact.language);

    if (!artifactId) {
      throw new Error(`Artifact declaration at index ${index} in lesson.script.md must define artifactId.`);
    }

    if (artifactIds.has(artifactId)) {
      throw new Error(`Artifact "${artifactId}" is declared more than once in lesson.script.md.`);
    }

    artifactIds.add(artifactId);
    assertKebabCase(artifactId, 'Artifact ID');

    if (!language) {
      throw new Error(`Artifact "${artifactId}" in lesson.script.md must define language.`);
    }
  });
}

function splitCodeLines(codeText) {
  return codeText === '' ? [] : String(codeText).split('\n');
}

function normalizePreview(scenePreview, previewType) {
  if (scenePreview) {
    return scenePreview;
  }

  if (previewType === 'none') {
    return { action: 'none' };
  }

  return {
    action: 'apply-state',
    target: previewType
  };
}

function normalizeScriptScene(stepId, scene, previewType) {
  const primaryShowCodeBlock = scene.showCodeBlocks[0];
  const codeLines = splitCodeLines(primaryShowCodeBlock.codeText);

  return {
    sceneId: scene.sceneId,
    narration: scene.narration,
    focus: {
      artifactId: primaryShowCodeBlock.artifactId,
      ...(codeLines.length
        ? {
            reveal: {
              from: 1,
              to: codeLines.length
            }
          }
        : {})
    },
    code: {
      activeArtifactId: primaryShowCodeBlock.artifactId,
      ...(codeLines.length
        ? {
            highlightLines: [
              {
                from: 1,
                to: codeLines.length
              }
            ]
          }
        : {})
    },
    preview: normalizePreview(scene.preview, previewType),
    ...(scene.theory ? { theory: scene.theory } : {})
  };
}

function createArtifactBuilderLookup(artifactDeclarations, scriptSteps) {
  const currentLinesByArtifactId = Object.fromEntries(
    artifactDeclarations.map(artifact => [artifact.artifactId, []])
  );
  const artifactStateByStep = scriptSteps.map(step => {
    step.scenes.forEach(scene => {
      scene.showCodeBlocks.forEach(showCodeBlock => {
        currentLinesByArtifactId[showCodeBlock.artifactId] = splitCodeLines(showCodeBlock.codeText);
      });
    });

    return Object.fromEntries(
      artifactDeclarations.map(artifact => [artifact.artifactId, [...currentLinesByArtifactId[artifact.artifactId]]])
    );
  });

  return Object.fromEntries(
    artifactDeclarations.map(artifact => [
      artifact.artifactId,
      stepNumber => artifactStateByStep[stepNumber]?.[artifact.artifactId] || []
    ])
  );
}

export function compileLessonScript({
  scriptMarkdown,
  goalImageSrc = '',
  theoryMarkdown = ''
}) {
  const lessonScript = readLessonScript(scriptMarkdown);
  const lessonAttributes = lessonScript.attributes;
  const theoryEnabled = Boolean(lessonAttributes.theory?.enabled);

  validateLessonScriptManifest(lessonAttributes);

  if (theoryEnabled && !normalizeString(theoryMarkdown)) {
    throw new Error('lesson.script.md declares theory.enabled=true but no theoryMarkdown was provided.');
  }

  const artifactDeclarations = lessonAttributes.artifacts.map(normalizeScriptArtifactDeclaration);
  const previewType = normalizeString(lessonAttributes.preview?.type);
  const sceneSteps = lessonScript.steps.map(step => ({
    stepId: step.stepId,
    title: step.title,
    summary: step.summary,
    intent: step.intent,
    tag: step.tag,
    proTip: step.proTip,
    focusHtmlNeedles: step.focusHtmlNeedles,
    scenes: step.scenes.map(scene => normalizeScriptScene(step.stepId, scene, previewType))
  }));
  const buildArtifactAtStepById = createArtifactBuilderLookup(artifactDeclarations, lessonScript.steps);

  return buildCompiledLesson({
    lessonAttributes,
    lessonBody: '',
    sceneSteps,
    artifactDeclarations,
    buildArtifactAtStepById,
    goalImageSrc,
    theoryMarkdown
  });
}
