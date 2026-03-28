import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter } from '../foundation/frontmatter/parse-frontmatter.js';
import { compileSourceLesson } from './compile-source-lesson.js';
import { readScenesContract } from './read-scenes-contract.js';
import { buildLessonScriptMarkdown } from './build-lesson-script-markdown.js';
import { normalizeString } from './build-compiled-lesson.js';

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readLessonManifest(sourceRoot) {
  const lessonFilePath = path.join(sourceRoot, 'lesson.md');
  const lessonMarkdown = readText(lessonFilePath);
  const { attributes } = parseFrontmatter(lessonMarkdown);

  return {
    lessonMarkdown,
    lessonAttributes: attributes
  };
}

function readScriptManifest(sourceRoot) {
  return readText(path.join(sourceRoot, 'lesson.script.md'));
}

function readScenesByStep(sourceRoot) {
  const scenesMarkdown = readText(path.join(sourceRoot, 'scenes.md'));
  const scenesContract = readScenesContract(scenesMarkdown);

  return Object.fromEntries(
    scenesContract.steps.map(step => [step.stepId, step])
  );
}

function buildScriptFrontmatter(lessonAttributes) {
  const scriptAttributes = {
    ...lessonAttributes,
    artifacts: Array.isArray(lessonAttributes.artifacts)
      ? lessonAttributes.artifacts.map(artifact => ({
          artifactId: artifact.artifactId,
          language: artifact.language,
          label: artifact.label,
          isPrimary: Boolean(artifact.isPrimary)
        }))
      : []
  };

  delete scriptAttributes.scenes;

  return scriptAttributes;
}

function readChangedArtifactIds(currentArtifactStateById, previousArtifactStateById) {
  return Object.keys(currentArtifactStateById).filter(artifactId => {
    const currentSnapshot = JSON.stringify(currentArtifactStateById[artifactId] || []);
    const previousSnapshot = JSON.stringify(previousArtifactStateById?.[artifactId] || []);

    return currentSnapshot !== previousSnapshot;
  });
}

function buildSceneContract({
  stepId,
  scene,
  artifactLanguageById,
  artifactStateById,
  previousArtifactStateById,
}) {
  const activeArtifactId = normalizeString(scene.code?.activeArtifactId || scene.focus?.artifactId);
  const changedArtifactIds = readChangedArtifactIds(artifactStateById, previousArtifactStateById);
  const orderedArtifactIds = [
    activeArtifactId,
    ...changedArtifactIds.filter(artifactId => artifactId !== activeArtifactId)
  ];

  return {
    sceneId: scene.sceneId,
    narration: scene.narration,
    ...(scene.preview ? { preview: scene.preview } : {}),
    ...(scene.theory ? { theory: scene.theory } : {}),
    showCodeBlocks: orderedArtifactIds.map(artifactId => {
      const artifactLanguage = artifactLanguageById[artifactId];

      if (!artifactLanguage) {
        throw new Error(`Step "${stepId}" scene "${scene.sceneId}" references unknown artifact "${artifactId}".`);
      }

      return {
        artifactId,
        language: artifactLanguage,
        fenceLanguage: artifactLanguage,
        codeText: (artifactStateById[artifactId] || []).join('\n')
      };
    })
  };
}

function buildStepContract({
  step,
  artifactLanguageById,
  artifactStateById,
  previousArtifactStateById,
}) {
  const scenes = Array.isArray(step.scenes) ? step.scenes : [];

  if (!scenes.length) {
    throw new Error(`Step "${step.stepId}" must define at least one scene for script export.`);
  }

  return {
    stepId: step.stepId,
    title: step.title,
    summary: step.summary,
    intent: step.intent,
    tag: step.tag,
    proTip: step.proTip,
    focusHtmlNeedles: step.focusHtmlNeedles,
    scenes: scenes.map(scene => buildSceneContract({
      stepId: step.stepId,
      scene,
      artifactLanguageById,
      artifactStateById,
      previousArtifactStateById
    }))
  };
}

export function buildLessonScriptFromSource({ sourceRoot }) {
  const scriptFilePath = path.join(sourceRoot, 'lesson.script.md');

  if (fs.existsSync(scriptFilePath)) {
    return readScriptManifest(sourceRoot);
  }

  const { lessonAttributes } = readLessonManifest(sourceRoot);
  const scenesByStep = readScenesByStep(sourceRoot);
  const { compiledLesson } = compileSourceLesson({ sourceRoot });
  const artifactLanguageById = Object.fromEntries(
    (lessonAttributes.artifacts || []).map(artifact => [
      normalizeString(artifact.artifactId),
      normalizeString(artifact.language)
    ])
  );
  const steps = compiledLesson.steps.map((runtimeStep, stepIndex) => {
    const authoredStep = scenesByStep[runtimeStep.id];

    if (!authoredStep) {
      throw new Error(`Missing authored step "${runtimeStep.id}" while exporting lesson script.`);
    }

    const artifactStateById = compiledLesson.statesByStep[stepIndex]?.artifacts || {};
    const previousArtifactStateById = compiledLesson.statesByStep[stepIndex - 1]?.artifacts || {};

    return buildStepContract({
      step: authoredStep,
      artifactLanguageById,
      artifactStateById,
      previousArtifactStateById
    });
  });

  return buildLessonScriptMarkdown({
    lessonAttributes: buildScriptFrontmatter(lessonAttributes),
    steps
  });
}
