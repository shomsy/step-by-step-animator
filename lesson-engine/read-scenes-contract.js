import YAML from 'yaml';
import { parseFrontmatter } from './parse-frontmatter.js';

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function assertKebabCase(value, label) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    throw new Error(`${label} must use kebab-case. Received "${value}".`);
  }
}

function normalizeSceneStep(step) {
  if (!step || typeof step !== 'object') {
    throw new Error('Each scenes.md step must be an object.');
  }

  const stepId = normalizeString(step.stepId);
  const title = normalizeString(step.title);
  const summary = normalizeString(step.summary);
  const intent = normalizeString(step.intent);

  if (!stepId) {
    throw new Error('Each scenes.md step must define stepId.');
  }

  if (!title) {
    throw new Error(`Step "${stepId}" must define title.`);
  }

  if (!summary) {
    throw new Error(`Step "${stepId}" must define summary.`);
  }

  if (!intent) {
    throw new Error(`Step "${stepId}" must define intent.`);
  }

  assertKebabCase(stepId, 'Step ID');

  const focusHtmlNeedles = Array.isArray(step.focusHtmlNeedles)
    ? step.focusHtmlNeedles.map(needle => normalizeString(needle)).filter(Boolean)
    : [];

  return {
    stepId,
    title,
    summary,
    intent,
    tag: normalizeString(step.tag),
    proTip: normalizeString(step.proTip),
    focusHtmlNeedles
  };
}

const SCENE_FIELD_NAMES = new Set(['narration', 'focus', 'code', 'preview', 'theory']);
const PREVIEW_ACTIONS = new Set(['apply-state', 'none']);

function parseSceneFieldFragment(fieldName, fieldLines, stepId, sceneId) {
  const fragment = fieldLines.length
    ? `${fieldName}:\n${fieldLines.join('\n')}`
    : `${fieldName}:`;

  let parsedValue;

  try {
    parsedValue = YAML.parse(fragment);
  } catch (error) {
    throw new Error(`Failed to parse "${fieldName}" block in scene "${sceneId}" of step "${stepId}": ${error.message}`);
  }

  return parsedValue?.[fieldName];
}

function normalizeSceneNarration(fieldValue, stepId, sceneId) {
  const narration = Array.isArray(fieldValue)
    ? fieldValue.map(line => normalizeString(line)).filter(Boolean).join('\n')
    : normalizeString(fieldValue);

  if (!narration) {
    throw new Error(`Scene "${sceneId}" in step "${stepId}" must define narration.`);
  }

  return narration;
}

function normalizeSceneFieldObject(fieldName, fieldValue, stepId, sceneId) {
  if (fieldName === 'preview' && typeof fieldValue === 'string') {
    return { action: normalizeString(fieldValue) };
  }

  if (!fieldValue || typeof fieldValue !== 'object' || Array.isArray(fieldValue)) {
    throw new Error(`Scene "${sceneId}" in step "${stepId}" must define a valid "${fieldName}" block.`);
  }

  return fieldValue;
}

function normalizeSceneBlock({ sceneId, lines }, stepId) {
  assertKebabCase(sceneId, 'Scene ID');

  const collectedFields = [];
  let currentFieldName = '';
  let currentFieldLines = [];

  function flushCurrentField() {
    if (!currentFieldName) {
      return;
    }

    collectedFields.push({
      fieldName: currentFieldName,
      fieldLines: currentFieldLines
    });

    currentFieldName = '';
    currentFieldLines = [];
  }

  lines.forEach(line => {
    const topLevelFieldMatch = line.match(/^([a-z][\w-]*):\s*(.*)$/i);

    if (topLevelFieldMatch && SCENE_FIELD_NAMES.has(topLevelFieldMatch[1])) {
      flushCurrentField();
      currentFieldName = topLevelFieldMatch[1];
      currentFieldLines = topLevelFieldMatch[2] ? [topLevelFieldMatch[2]] : [];
      return;
    }

    if (!currentFieldName) {
      if (normalizeString(line)) {
        throw new Error(`Scene "${sceneId}" in step "${stepId}" must start with a known field such as narration.`);
      }

      return;
    }

    currentFieldLines.push(line);
  });

  flushCurrentField();

  const scene = { sceneId };
  const seenFields = new Set();

  collectedFields.forEach(({ fieldName, fieldLines }) => {
    if (seenFields.has(fieldName)) {
      throw new Error(`Scene "${sceneId}" in step "${stepId}" defines "${fieldName}" more than once.`);
    }

    seenFields.add(fieldName);

    if (fieldName === 'narration') {
      scene.narration = normalizeSceneNarration(fieldLines, stepId, sceneId);
      return;
    }

    const fieldValue = normalizeSceneFieldObject(
      fieldName,
      parseSceneFieldFragment(fieldName, fieldLines, stepId, sceneId),
      stepId,
      sceneId
    );

    scene[fieldName] = fieldValue;
  });

  if (!scene.narration) {
    throw new Error(`Scene "${sceneId}" in step "${stepId}" must define narration.`);
  }

  if (!scene.focus && !scene.code && !scene.preview && !scene.theory) {
    throw new Error(`Scene "${sceneId}" in step "${stepId}" must define focus, code, preview, or theory.`);
  }

  if (scene.focus && !normalizeString(scene.focus.artifactId)) {
    throw new Error(`Scene "${sceneId}" in step "${stepId}" must define focus.artifactId.`);
  }

  if (scene.code && !normalizeString(scene.code.activeArtifactId)) {
    throw new Error(`Scene "${sceneId}" in step "${stepId}" must define code.activeArtifactId.`);
  }

  if (scene.preview) {
    const previewAction = normalizeString(scene.preview.action);

    if (!PREVIEW_ACTIONS.has(previewAction)) {
      throw new Error(`Scene "${sceneId}" in step "${stepId}" must use a valid preview.action.`);
    }

    scene.preview.action = previewAction;
    scene.preview.target = normalizeString(scene.preview.target);

    if (previewAction !== 'none' && !scene.preview.target) {
      throw new Error(`Scene "${sceneId}" in step "${stepId}" must define preview.target when preview.action is "${previewAction}".`);
    }
  }

  if (scene.theory && !normalizeString(scene.theory.anchor)) {
    throw new Error(`Scene "${sceneId}" in step "${stepId}" must define theory.anchor.`);
  }

  return scene;
}

function readSectionHeadings(body) {
  const stepHeadings = [];
  const sceneHeadings = [];
  const lines = String(body || '').split('\n');
  let currentStepId = '';
  let currentScene = null;
  let currentSceneLines = [];
  const scenesByStep = new Map();

  function flushCurrentScene() {
    if (!currentScene) {
      return;
    }

    const parsedScene = normalizeSceneBlock({
      sceneId: currentScene.sceneId,
      lines: currentSceneLines
    }, currentStepId);

    scenesByStep.get(currentStepId).push(parsedScene);
    currentScene = null;
    currentSceneLines = [];
  }

  lines.forEach((line, index) => {
    const stepMatch = line.match(/^# Step:\s*(.+)$/);

    if (stepMatch) {
      flushCurrentScene();
      currentStepId = normalizeString(stepMatch[1]);

      if (!currentStepId) {
        throw new Error('Each scenes.md step heading must define a step id.');
      }

      if (scenesByStep.has(currentStepId)) {
        throw new Error(`scenes.md defines step "${currentStepId}" more than once.`);
      }

      stepHeadings.push(currentStepId);
      scenesByStep.set(currentStepId, []);
      return;
    }

    const sceneMatch = line.match(/^## Scene:\s*(.+)$/);

    if (sceneMatch) {
      if (!currentStepId) {
        throw new Error(`Scene heading "${sceneMatch[1]}" appears before any step heading.`);
      }

      flushCurrentScene();
      currentScene = {
        sceneId: normalizeString(sceneMatch[1]),
        lineNumber: index + 1
      };
      currentSceneLines = [];
      sceneHeadings.push({
        stepId: currentStepId,
        sceneId: currentScene.sceneId
      });
      return;
    }

    if (!currentStepId) {
      if (normalizeString(line)) {
        throw new Error('scenes.md body must start with a step heading.');
      }
      return;
    }

    if (!currentScene) {
      if (normalizeString(line)) {
        throw new Error(`Step "${currentStepId}" contains content before its first scene.`);
      }
      return;
    }

    currentSceneLines.push(line);
  });

  flushCurrentScene();

  return {
    stepHeadings,
    sceneHeadings,
    scenesByStep
  };
}

export function readScenesContract(markdown) {
  const { attributes, body } = parseFrontmatter(markdown);
  const steps = Array.isArray(attributes.steps) ? attributes.steps.map(normalizeSceneStep) : [];
  const schemaVersion = Number(attributes.schemaVersion);
  const lessonId = normalizeString(attributes.lessonId);

  if (!Number.isInteger(schemaVersion) || schemaVersion < 1) {
    throw new Error('scenes.md must define schemaVersion.');
  }

  if (lessonId === '') {
    throw new Error('scenes.md must define lessonId.');
  }

  assertKebabCase(lessonId, 'Lesson ID');

  if (!steps.length) {
    throw new Error('scenes.md must declare at least one step.');
  }

  const stepIds = new Set();

  steps.forEach(step => {
    if (stepIds.has(step.stepId)) {
      throw new Error(`scenes.md declares step "${step.stepId}" more than once in frontmatter.`);
    }

    stepIds.add(step.stepId);
  });

  const { stepHeadings, sceneHeadings, scenesByStep } = readSectionHeadings(body);

  if (stepHeadings.length !== steps.length) {
    throw new Error('scenes.md body must list every declared step exactly once.');
  }

  steps.forEach((step, index) => {
    if (stepHeadings[index] !== step.stepId) {
      throw new Error(`Step order mismatch in scenes.md around "${step.stepId}".`);
    }

    const stepScenes = scenesByStep.get(step.stepId) || [];

    if (!stepScenes.length) {
      throw new Error(`Step "${step.stepId}" must contain at least one scene.`);
    }

    const sceneIds = new Set();
    const normalizedScenes = stepScenes.map(scene => {
      if (sceneIds.has(scene.sceneId)) {
        throw new Error(`Step "${step.stepId}" defines scene "${scene.sceneId}" more than once.`);
      }

      sceneIds.add(scene.sceneId);
      return scene;
    });

    step.scenes = normalizedScenes;
  });

  return {
    schemaVersion,
    lessonId,
    steps,
    body,
    stepHeadings,
    sceneHeadings
  };
}
