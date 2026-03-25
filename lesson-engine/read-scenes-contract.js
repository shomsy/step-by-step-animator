import { parseFrontmatter } from './parse-frontmatter.js';

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
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

function readSectionHeadings(body) {
  const stepHeadings = [];
  const sceneHeadings = [];
  const lines = String(body || '').split('\n');
  let currentStepId = '';
  let currentStepSceneCount = 0;
  const sceneCountByStep = new Map();

  lines.forEach(line => {
    const stepMatch = line.match(/^# Step:\s*(.+)$/);

    if (stepMatch) {
      currentStepId = normalizeString(stepMatch[1]);
      currentStepSceneCount = 0;
      stepHeadings.push(currentStepId);
      sceneCountByStep.set(currentStepId, 0);
      return;
    }

    const sceneMatch = line.match(/^## Scene:\s*(.+)$/);

    if (sceneMatch) {
      if (!currentStepId) {
        throw new Error(`Scene heading "${sceneMatch[1]}" appears before any step heading.`);
      }

      currentStepSceneCount += 1;
      sceneHeadings.push({
        stepId: currentStepId,
        sceneId: normalizeString(sceneMatch[1])
      });
      sceneCountByStep.set(currentStepId, currentStepSceneCount);
    }
  });

  return {
    stepHeadings,
    sceneHeadings,
    sceneCountByStep
  };
}

export function readScenesContract(markdown) {
  const { attributes, body } = parseFrontmatter(markdown);
  const steps = Array.isArray(attributes.steps) ? attributes.steps.map(normalizeSceneStep) : [];

  if (!attributes.schemaVersion) {
    throw new Error('scenes.md must define schemaVersion.');
  }

  if (normalizeString(attributes.lessonId) === '') {
    throw new Error('scenes.md must define lessonId.');
  }

  if (!steps.length) {
    throw new Error('scenes.md must declare at least one step.');
  }

  const { stepHeadings, sceneHeadings, sceneCountByStep } = readSectionHeadings(body);

  if (stepHeadings.length !== steps.length) {
    throw new Error('scenes.md body must list every declared step exactly once.');
  }

  steps.forEach((step, index) => {
    if (stepHeadings[index] !== step.stepId) {
      throw new Error(`Step order mismatch in scenes.md around "${step.stepId}".`);
    }

    if ((sceneCountByStep.get(step.stepId) || 0) === 0) {
      throw new Error(`Step "${step.stepId}" must contain at least one scene.`);
    }
  });

  return {
    schemaVersion: attributes.schemaVersion,
    lessonId: normalizeString(attributes.lessonId),
    steps,
    body,
    stepHeadings,
    sceneHeadings
  };
}
