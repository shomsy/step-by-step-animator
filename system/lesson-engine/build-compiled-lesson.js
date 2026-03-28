import { renderMarkdown } from '../foundation/markdown/render-markdown.js';

export function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export function assertKebabCase(value, label) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    throw new Error(`${label} must use kebab-case. Received "${value}".`);
  }
}

export function assertOneOf(value, allowedValues, label) {
  if (!allowedValues.has(value)) {
    throw new Error(`${label} must be one of: ${Array.from(allowedValues).join(', ')}.`);
  }
}

export function assertPositiveInteger(value, label) {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`${label} must be a positive integer.`);
  }
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
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
    throw new Error('Lesson scenes reference theory anchors, but the lesson manifest does not enable theory.');
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

export function normalizeLessonMeta(attributes, body, goalImageSrcOverride) {
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

function readArtifactFileName(artifact) {
  if (normalizeString(artifact.label)) {
    return normalizeString(artifact.label);
  }

  if (normalizeString(artifact.file)) {
    return normalizeString(artifact.file).split('/').pop();
  }

  return `${artifact.artifactId}.${artifact.language || 'txt'}`;
}

export function buildCompiledLesson({
  lessonAttributes,
  lessonBody,
  sceneSteps,
  artifactDeclarations,
  buildArtifactAtStepById,
  goalImageSrc = '',
  theoryMarkdown = ''
}) {
  const lessonMeta = normalizeLessonMeta(lessonAttributes, lessonBody, goalImageSrc);
  const theoryEnabled = Boolean(lessonAttributes.theory?.enabled);
  const artifactIds = new Set(artifactDeclarations.map(artifact => artifact.artifactId));
  const theoryAnchors = theoryEnabled ? readTheoryAnchors(theoryMarkdown) : new Set();

  validateSceneCrossReferences({
    sceneSteps,
    artifactIds,
    theoryAnchors,
    theoryEnabled
  });

  const teachingSteps = sceneSteps.map(step => createRuntimeStep(step, lessonMeta.preview.type, deriveFocusArtifactId(step)));
  const scenesByStep = Object.fromEntries(sceneSteps.map(step => [step.stepId, step.scenes]));
  const statesByStep = sceneSteps.map((step, stepNumber) => ({
    stepId: step.stepId,
    scenes: step.scenes,
    artifacts: Object.fromEntries(
      artifactDeclarations.map(artifact => [
        artifact.artifactId,
        buildArtifactAtStepById[artifact.artifactId]?.(stepNumber) || []
      ])
    )
  }));

  const artifacts = artifactDeclarations.map(artifact => {
    const fileName = readArtifactFileName(artifact);

    return {
      artifactId: artifact.artifactId,
      kind: artifact.kind,
      language: artifact.language,
      fileName,
      sourceFile: normalizeString(artifact.file),
      editorLabel: fileName,
      runtimeTarget: artifact.isPrimary ? 'primary' : 'secondary',
      isPrimary: artifact.isPrimary
    };
  });

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

  return {
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
    lessonIntroHtml: renderMarkdown(lessonBody) || (lessonMeta.lessonIntro ? `<p>${escapeHtml(lessonMeta.lessonIntro)}</p>` : ''),
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
}
