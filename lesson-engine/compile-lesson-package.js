import { parseFrontmatter } from './parse-frontmatter.js';
import { renderMarkdown } from './render-markdown.js';
import { readScenesContract } from './read-scenes-contract.js';
import { readTimelineBlocks } from './read-timeline-blocks.js';
import { buildLinesFromTimelineBlocks } from './build-lines-from-timeline-blocks.js';
import { readRuleBlocks } from './read-rule-blocks.js';
import { buildLinesFromRuleBlocks } from './build-lines-from-rule-blocks.js';

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function assertKebabCase(value, label) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    throw new Error(`${label} must use kebab-case. Received "${value}".`);
  }
}

function assertOneOf(value, allowedValues, label) {
  if (!allowedValues.has(value)) {
    throw new Error(`${label} must be one of: ${Array.from(allowedValues).join(', ')}.`);
  }
}

function assertPositiveInteger(value, label) {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`${label} must be a positive integer.`);
  }
}

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

function slugifyHeading(value) {
  return normalizeString(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function readTheoryAnchors(theoryMarkdown) {
  const headings = String(theoryMarkdown || '')
    .split('\n')
    .map(line => line.match(/^#{1,6}\s+(.+?)\s*$/)?.[1])
    .filter(Boolean)
    .map(slugifyHeading)
    .filter(Boolean);

  return new Set(headings);
}

function validateSceneCrossReferences({ sceneSteps, artifactIds, theoryAnchors, theoryEnabled }) {
  const hasTheoryScenes = sceneSteps.some(step => (step.scenes || []).some(scene => Boolean(scene.theory)));

  if (hasTheoryScenes && !theoryEnabled) {
    throw new Error('scenes.md references theory anchors, but lesson.md does not enable theory.md.');
  }

  sceneSteps.forEach(step => {
    (step.scenes || []).forEach(scene => {
      if (scene.focus && !artifactIds.has(scene.focus.artifactId)) {
        throw new Error(`Scene "${scene.sceneId}" in step "${step.stepId}" references unknown artifact "${scene.focus.artifactId}".`);
      }

      if (scene.code && !artifactIds.has(scene.code.activeArtifactId)) {
        throw new Error(`Scene "${scene.sceneId}" in step "${step.stepId}" references unknown active artifact "${scene.code.activeArtifactId}".`);
      }

      if (scene.theory) {
        if (!theoryAnchors || !theoryAnchors.size) {
          throw new Error(`Scene "${scene.sceneId}" in step "${step.stepId}" references theory.anchor "${scene.theory.anchor}" but theory.md was not provided.`);
        }

        if (!theoryAnchors.has(scene.theory.anchor)) {
          throw new Error(`Scene "${scene.sceneId}" in step "${step.stepId}" references unknown theory.anchor "${scene.theory.anchor}".`);
        }
      }
    });
  });
}

function deriveFocusArtifactId(step) {
  const tagType = normalizeString(step.tag).split(':')[0];

  if (tagType === 'css' || tagType === 'summary') {
    return 'css';
  }

  if (tagType === 'js-style') {
    return 'js';
  }

  if (tagType === 'template-js') {
    return 'template-js';
  }

  if (tagType === 'shadow-css') {
    return 'shadow-css';
  }

  return 'html';
}

function deriveStepTag(step) {
  if (normalizeString(step.tag)) {
    return normalizeString(step.tag);
  }

  const tagType = step.stepId.includes('css') || step.stepId.includes('summary') ? 'css' : 'html';

  return `${tagType}:${step.stepId}`;
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

function normalizeLessonMeta(attributes, body, goalImageSrcOverride) {
  const preview = attributes.preview || {};
  const goal = attributes.goal || {};
  const homework = attributes.homework || {};
  const lessonIntro = normalizeString(attributes.lessonIntro) || normalizeString(body);

  return {
    schemaVersion: attributes.schemaVersion || 1,
    lessonId: normalizeString(attributes.lessonId),
    lessonTitle: normalizeString(attributes.lessonTitle),
    lessonIntro,
    status: normalizeString(attributes.status) || 'draft',
    courseId: normalizeString(attributes.courseId),
    order: Number(attributes.order || 0),
    preview: {
      type: normalizeString(preview.type) || 'dom',
      title: normalizeString(preview.title) || normalizeString(attributes.previewTitle),
      address: normalizeString(preview.address) || normalizeString(attributes.previewAddress)
    },
    goal: {
      title: normalizeString(goal.title) || normalizeString(attributes.goalTitle),
      imageSrc: normalizeString(goalImageSrcOverride || goal.imageSrc || attributes.goalImageSrc),
      imageAlt: normalizeString(goal.imageAlt) || normalizeString(attributes.goalImageAlt),
      imageCaption: normalizeString(goal.imageCaption) || normalizeString(attributes.goalImageCaption)
    },
    homework: {
      enabled: Boolean(homework.enabled ?? Array.isArray(attributes.homeworkItems)),
      title: normalizeString(homework.title) || normalizeString(attributes.homeworkTitle) || 'Homework',
      items: Array.isArray(homework.items) ? homework.items.map(item => normalizeString(item)).filter(Boolean) : []
    },
    references: Array.isArray(attributes.references)
      ? attributes.references.map(reference => {
        if (!reference || typeof reference !== 'object') {
          return null;
        }

        return {
          title: normalizeString(reference.title),
          href: normalizeString(reference.href)
        };
      }).filter(Boolean)
      : [],
    tags: Array.isArray(attributes.tags) ? attributes.tags.map(tag => normalizeString(tag)).filter(Boolean) : [],
    difficulty: normalizeString(attributes.difficulty),
    estimatedMinutes: Number(attributes.estimatedMinutes || 0) || undefined
  };
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

function createRuntimeStep(step, previewTarget, focusArtifactId) {
  const scenes = Array.isArray(step.scenes) ? step.scenes : [];

  return {
    id: step.stepId,
    title: step.title,
    desc: step.summary,
    tag: deriveStepTag(step),
    proTip: step.proTip || step.intent || step.summary,
    focusHtmlNeedles: step.focusHtmlNeedles,
    narration: scenes[0]?.narration || step.summary,
    scenes: scenes.length
      ? scenes
      : [
          {
            sceneId: `${step.stepId}-scene`,
            narration: step.summary,
            focus: {
              artifactId: focusArtifactId
            },
            code: {
              activeArtifactId: focusArtifactId
            },
            preview: {
              action: 'apply-state',
              target: previewTarget
            }
          }
        ]
  };
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

  const lessonMeta = normalizeLessonMeta(lessonAttributes, lessonBody, goalImageSrc);
  const sceneSteps = scenesContract.steps;
  const theoryEnabled = Boolean(lessonAttributes.theory?.enabled);
  const stepNumberById = Object.fromEntries(sceneSteps.map((step, index) => [step.stepId, index]));
  const artifactDeclarations = Array.isArray(lessonAttributes.artifacts)
    ? lessonAttributes.artifacts.map(normalizeArtifactDeclaration)
    : [];
  const artifactIds = new Set(artifactDeclarations.map(artifact => artifact.artifactId));

  if (theoryEnabled && !normalizeString(theoryMarkdown)) {
    throw new Error('lesson.md declares theory.enabled=true but no theoryMarkdown was provided.');
  }

  const theoryAnchors = theoryEnabled ? readTheoryAnchors(theoryMarkdown) : new Set();

  validateSceneCrossReferences({
    sceneSteps,
    artifactIds,
    theoryAnchors,
    theoryEnabled
  });

  const artifactBuilders = createArtifactBuilders({
    artifactDeclarations,
    artifactMarkdownById,
    stepNumberById
  });
  const buildArtifactAtStepById = createArtifactBuilderLookup(artifactBuilders);

  const teachingSteps = sceneSteps.map(step => createRuntimeStep(step, lessonMeta.preview.type, deriveFocusArtifactId(step)));
  const scenesByStep = Object.fromEntries(sceneSteps.map(step => [step.stepId, step.scenes]));

  const statesByStep = sceneSteps.map((step, stepNumber) => ({
    stepId: step.stepId,
    scenes: step.scenes,
    artifacts: Object.fromEntries(
      artifactBuilders.map(({ artifact, buildAtStep }) => [artifact.artifactId, buildAtStep(stepNumber)])
    )
  }));

  const artifacts = artifactDeclarations.map(artifact => ({
    artifactId: artifact.artifactId,
    kind: artifact.kind,
    language: artifact.language,
    fileName: artifact.label || artifact.file.split('/').pop(),
    sourceFile: artifact.file,
    editorLabel: artifact.label || artifact.file.split('/').pop(),
    runtimeTarget: artifact.isPrimary ? 'primary' : 'secondary',
    isPrimary: artifact.isPrimary
  }));

  const htmlArtifact = artifacts.find(artifact => artifact.artifactId === 'html');
  const cssArtifact = artifacts.find(artifact => artifact.artifactId === 'css');

  function buildAtStepForArtifactId(artifactId, stepNumber) {
    return buildArtifactAtStepById[artifactId]?.(stepNumber) || [];
  }

  const buildHtmlAtStep = buildArtifactAtStepById.html
    ? stepNumber => buildAtStepForArtifactId('html', stepNumber)
    : undefined;
  const buildCssAtStep = buildArtifactAtStepById.css
    ? stepNumber => buildAtStepForArtifactId('css', stepNumber)
    : undefined;
  const buildJsAtStep = buildArtifactAtStepById.js
    ? stepNumber => buildAtStepForArtifactId('js', stepNumber)
    : undefined;
  const buildTemplateJsAtStep = buildArtifactAtStepById['template-js']
    ? stepNumber => buildAtStepForArtifactId('template-js', stepNumber)
    : undefined;
  const buildShadowCssAtStep = buildArtifactAtStepById['shadow-css']
    ? stepNumber => buildAtStepForArtifactId('shadow-css', stepNumber)
    : undefined;

  const compiledLesson = {
    schemaVersion: lessonMeta.schemaVersion,
    meta: {
      lessonId: lessonMeta.lessonId,
      lessonTitle: lessonMeta.lessonTitle,
      lessonIntro: lessonMeta.lessonIntro,
      status: lessonMeta.status,
      preview: lessonMeta.preview,
      courseId: lessonMeta.courseId,
      order: lessonMeta.order,
      tags: lessonMeta.tags,
      difficulty: lessonMeta.difficulty,
      estimatedMinutes: lessonMeta.estimatedMinutes,
      ideMode: Boolean(lessonAttributes.ideMode)
    },
    teaching: {
      steps: teachingSteps,
      goal: lessonMeta.goal,
      homework: lessonMeta.homework,
      references: lessonMeta.references,
      summary: lessonMeta.lessonIntro
    },
    artifacts,
    statesByStep,
    lessonId: lessonMeta.lessonId,
    lessonTitle: lessonMeta.lessonTitle,
    lessonIntro: lessonMeta.lessonIntro,
    lessonIntroHtml: renderMarkdown(lessonBody) || (lessonMeta.lessonIntro ? `<p>${lessonMeta.lessonIntro}</p>` : ''),
    previewAddress: lessonMeta.preview.address,
    previewTitle: lessonMeta.preview.title,
    htmlFileName: htmlArtifact?.fileName || 'index.html',
    cssFileName: cssArtifact?.fileName || 'style.css',
    goalTitle: lessonMeta.goal.title,
    goalImageSrc: lessonMeta.goal.imageSrc,
    goalImageAlt: lessonMeta.goal.imageAlt,
    goalImageCaption: lessonMeta.goal.imageCaption,
    homeworkTitle: lessonMeta.homework.title,
    homeworkItems: lessonMeta.homework.items,
    steps: teachingSteps,
    scenesByStep,
    ideMode: Boolean(lessonAttributes.ideMode),
    buildHtmlAtStep,
    buildCssAtStep,
    buildJsAtStep,
    buildTemplateJsAtStep,
    buildShadowCssAtStep
  };

  return compiledLesson;
}
