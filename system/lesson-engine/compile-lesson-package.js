import { parseFrontmatter } from '../foundation/frontmatter/parse-frontmatter.js';
import { readScenesContract } from './read-scenes-contract.js';
import { readTimelineBlocks } from '../foundation/markdown/read-timeline-blocks.js';
import { buildLinesFromTimelineBlocks } from '../foundation/markdown/build-lines-from-timeline-blocks.js';
import { readRuleBlocks } from '../foundation/markdown/read-rule-blocks.js';
import { buildLinesFromRuleBlocks } from '../foundation/markdown/build-lines-from-rule-blocks.js';
import {
  assertKebabCase,
  assertOneOf,
  assertPositiveInteger,
  buildCompiledLesson,
  isPlainObject,
  normalizeString
} from './build-compiled-lesson.js';

function normalizeArtifactDeclaration(artifact) {
  if (!artifact || typeof artifact !== 'object') {
    throw new Error('Each artifact declaration must be an object.');
  }

  const artifactId = normalizeString(artifact.artifactId);
  const file = normalizeString(artifact.file);
  const language = normalizeString(artifact.language);
  const kind = normalizeString(artifact.kind);
  const label = normalizeString(artifact.label);

  if (!artifactId) {
    throw new Error('Each artifact declaration must define artifactId.');
  }

  if (!file) {
    throw new Error(`Artifact "${artifactId}" must define file.`);
  }

  if (!language) {
    throw new Error(`Artifact "${artifactId}" must define language.`);
  }

  if (!kind) {
    throw new Error(`Artifact "${artifactId}" must define kind.`);
  }

  assertKebabCase(artifactId, 'Artifact ID');

  return {
    artifactId,
    file,
    language,
    kind,
    label: label || file.split('/').pop(),
    isPrimary: Boolean(artifact.isPrimary)
  };
}

function validateLessonManifest(attributes) {
  const schemaVersion = Number(attributes.schemaVersion);
  const lessonId = normalizeString(attributes.lessonId);
  const lessonTitle = normalizeString(attributes.lessonTitle);
  const lessonIntro = normalizeString(attributes.lessonIntro);
  const status = normalizeString(attributes.status);
  const courseId = normalizeString(attributes.courseId);
  const preview = attributes.preview;
  const scenes = attributes.scenes;
  const artifacts = attributes.artifacts;
  const theory = attributes.theory;

  if (!Number.isInteger(schemaVersion) || schemaVersion < 1) {
    throw new Error('lesson.md must define schemaVersion.');
  }

  if (!lessonId) {
    throw new Error('lesson.md must define lessonId.');
  }

  assertKebabCase(lessonId, 'Lesson ID');

  if (!lessonTitle) {
    throw new Error('lesson.md must define lessonTitle.');
  }

  if (!lessonIntro) {
    throw new Error('lesson.md must define lessonIntro.');
  }

  if (!status) {
    throw new Error('lesson.md must define status.');
  }

  assertOneOf(status, new Set(['draft', 'active', 'broken', 'deprecated']), 'lesson.md status');

  if (!courseId) {
    throw new Error('lesson.md must define courseId.');
  }

  assertPositiveInteger(Number(attributes.order), 'lesson.md order');

  if (!isPlainObject(preview)) {
    throw new Error('lesson.md must define a preview object.');
  }

  const previewType = normalizeString(preview.type);
  const previewTitle = normalizeString(preview.title);
  const previewAddress = normalizeString(preview.address);

  if (!previewType) {
    throw new Error('lesson.md must define preview.type.');
  }

  assertOneOf(previewType, new Set(['dom', 'terminal', 'markdown', 'diagram', 'none']), 'lesson.md preview.type');

  if (!previewTitle) {
    throw new Error('lesson.md must define preview.title.');
  }

  if (!previewAddress) {
    throw new Error('lesson.md must define preview.address.');
  }

  if (!isPlainObject(scenes) || !normalizeString(scenes.file)) {
    throw new Error('lesson.md must define scenes.file.');
  }

  if (isPlainObject(theory) && theory.enabled === true && !normalizeString(theory.file)) {
    throw new Error('lesson.md must define theory.file when theory.enabled is true.');
  }

  if (!Array.isArray(artifacts) || !artifacts.length) {
    throw new Error('lesson.md must declare at least one artifact.');
  }

  const artifactIds = new Set();

  artifacts.forEach((artifact, index) => {
    if (!isPlainObject(artifact)) {
      throw new Error(`Artifact declaration at index ${index} must be an object.`);
    }

    const artifactId = normalizeString(artifact.artifactId);
    const file = normalizeString(artifact.file);
    const kind = normalizeString(artifact.kind);
    const language = normalizeString(artifact.language);

    if (!artifactId) {
      throw new Error(`Artifact declaration at index ${index} must define artifactId.`);
    }

    if (artifactIds.has(artifactId)) {
      throw new Error(`Artifact "${artifactId}" is declared more than once.`);
    }

    artifactIds.add(artifactId);
    assertKebabCase(artifactId, 'Artifact ID');

    if (!file) {
      throw new Error(`Artifact "${artifactId}" must define file.`);
    }

    if (!file.endsWith('.md')) {
      throw new Error(`Artifact "${artifactId}" must point to a markdown source file.`);
    }

    if (!language) {
      throw new Error(`Artifact "${artifactId}" must define language.`);
    }

    if (!kind) {
      throw new Error(`Artifact "${artifactId}" must define kind.`);
    }

    assertOneOf(kind, new Set(['timeline', 'rules']), `Artifact "${artifactId}" kind`);
  });
}

function createArtifactBuilders({ artifactDeclarations, artifactMarkdownById, stepNumberById }) {
  return artifactDeclarations.map(artifact => {
    const sourceMarkdown = artifactMarkdownById[artifact.artifactId];

    if (typeof sourceMarkdown !== 'string' || !sourceMarkdown.trim()) {
      throw new Error(`Missing source markdown for artifact "${artifact.artifactId}".`);
    }

    if (artifact.kind === 'timeline') {
      const timelineBlocks = readTimelineBlocks(sourceMarkdown);

      return {
        artifact,
        buildAtStep(stepNumber) {
          return buildLinesFromTimelineBlocks({ timelineBlocks, stepNumberById, stepNumber });
        }
      };
    }

    if (artifact.kind === 'rules') {
      const ruleBlocks = readRuleBlocks(sourceMarkdown);

      return {
        artifact,
        buildAtStep(stepNumber) {
          return buildLinesFromRuleBlocks({ ruleBlocks, stepNumberById, stepNumber });
        }
      };
    }

    throw new Error(`Unsupported artifact kind "${artifact.kind}" for artifact "${artifact.artifactId}".`);
  });
}

function createArtifactBuilderLookup(artifactBuilders) {
  return Object.fromEntries(
    artifactBuilders.map(({ artifact, buildAtStep }) => [artifact.artifactId, buildAtStep])
  );
}

export function compileLessonPackage({
  lessonMarkdown,
  scenesMarkdown,
  artifactMarkdownById = {},
  goalImageSrc = '',
  theoryMarkdown = ''
}) {
  const { attributes: lessonAttributes, body: lessonBody } = parseFrontmatter(lessonMarkdown);
  const scenesContract = readScenesContract(scenesMarkdown);

  if (Number(lessonAttributes.schemaVersion) !== Number(scenesContract.schemaVersion)) {
    throw new Error('schemaVersion must match between lesson.md and scenes.md.');
  }

  if (normalizeString(lessonAttributes.lessonId) !== scenesContract.lessonId) {
    throw new Error(`Lesson ID mismatch between lesson.md and scenes.md for "${lessonAttributes.lessonId}".`);
  }

  validateLessonManifest(lessonAttributes);

  const sceneSteps = scenesContract.steps;
  const theoryEnabled = Boolean(lessonAttributes.theory?.enabled);
  const stepNumberById = Object.fromEntries(sceneSteps.map((step, index) => [step.stepId, index]));
  const artifactDeclarations = Array.isArray(lessonAttributes.artifacts)
    ? lessonAttributes.artifacts.map(normalizeArtifactDeclaration)
    : [];

  if (theoryEnabled && !normalizeString(theoryMarkdown)) {
    throw new Error('lesson.md declares theory.enabled=true but no theoryMarkdown was provided.');
  }

  const artifactBuilders = createArtifactBuilders({
    artifactDeclarations,
    artifactMarkdownById,
    stepNumberById
  });
  const buildArtifactAtStepById = createArtifactBuilderLookup(artifactBuilders);
  return buildCompiledLesson({
    lessonAttributes,
    lessonBody,
    sceneSteps,
    artifactDeclarations,
    buildArtifactAtStepById,
    goalImageSrc,
    theoryMarkdown
  });
}
