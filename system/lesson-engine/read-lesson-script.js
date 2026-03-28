import YAML from 'yaml';
import { parseFrontmatter } from '../foundation/frontmatter/parse-frontmatter.js';
import {
  assertKebabCase,
  assertOneOf,
  isPlainObject,
  normalizeString
} from './build-compiled-lesson.js';

const SCENE_SECTION_NAMES = new Set(['narration', 'preview', 'theory']);

function trimBlankEdges(lines) {
  let start = 0;
  let end = lines.length;

  while (start < end && !normalizeString(lines[start])) {
    start += 1;
  }

  while (end > start && !normalizeString(lines[end - 1])) {
    end -= 1;
  }

  return lines.slice(start, end);
}

function parseYamlFragment(label, rawLines) {
  const lines = trimBlankEdges(rawLines);

  if (!lines.length) {
    return {};
  }

  try {
    return YAML.parse(lines.join('\n')) || {};
  } catch (error) {
    throw new Error(`Failed to parse ${label}: ${error.message}`);
  }
}

function readInlineScalarValue(value) {
  const normalizedValue = normalizeString(value);

  if (
    (normalizedValue.startsWith('"') && normalizedValue.endsWith('"'))
    || (normalizedValue.startsWith('\'') && normalizedValue.endsWith('\''))
  ) {
    return normalizedValue.slice(1, -1);
  }

  return normalizedValue;
}

function readNarrationSection(lines, stepId, sceneId) {
  const narration = trimBlankEdges(lines)
    .map(line => line.trimEnd())
    .join('\n')
    .trim();

  if (!narration) {
    throw new Error(`Scene "${sceneId}" in step "${stepId}" must define narration.`);
  }

  return narration;
}

function readCodeFence(lines, stepId, sceneId, artifactId) {
  const trimmedLines = trimBlankEdges(lines);
  const openingFence = trimmedLines[0]?.match(/^```([\w-]*)\s*$/);
  const closingFence = trimmedLines.at(-1)?.trim();

  if (!openingFence || closingFence !== '```') {
    throw new Error(`Scene "${sceneId}" in step "${stepId}" must wrap "Show Code: ${artifactId}" in a fenced code block.`);
  }

  return {
    fenceLanguage: normalizeString(openingFence[1]),
    codeText: trimmedLines.slice(1, -1).join('\n')
  };
}

function normalizePreviewSection(previewValue, stepId, sceneId) {
  if (!isPlainObject(previewValue)) {
    throw new Error(`Scene "${sceneId}" in step "${stepId}" must define preview as an object.`);
  }

  const action = normalizeString(previewValue.action);
  const target = normalizeString(previewValue.target);

  assertOneOf(action, new Set(['apply-state', 'none']), `Scene "${sceneId}" preview.action`);

  if (action !== 'none' && !target) {
    throw new Error(`Scene "${sceneId}" in step "${stepId}" must define preview.target when preview.action is "${action}".`);
  }

  return {
    action,
    ...(target ? { target } : {})
  };
}

function normalizeTheorySection(theoryValue, stepId, sceneId) {
  if (!isPlainObject(theoryValue)) {
    throw new Error(`Scene "${sceneId}" in step "${stepId}" must define theory as an object.`);
  }

  const anchor = normalizeString(theoryValue.anchor);

  if (!anchor) {
    throw new Error(`Scene "${sceneId}" in step "${stepId}" must define theory.anchor.`);
  }

  return { anchor };
}

function normalizeStepMetadata(stepId, metadataLines) {
  const lines = trimBlankEdges(metadataLines);
  const stepValue = {
    title: '',
    summary: '',
    intent: '',
    tag: '',
    proTip: '',
    focusHtmlNeedles: []
  };
  let currentKey = '';

  lines.forEach(line => {
    const fieldMatch = line.match(/^([a-zA-Z][\w-]*):\s*(.*)$/);

    if (fieldMatch) {
      currentKey = fieldMatch[1];

      if (currentKey === 'focusHtmlNeedles') {
        stepValue.focusHtmlNeedles = [];
        return;
      }

      if (!Object.hasOwn(stepValue, currentKey)) {
        throw new Error(`Step "${stepId}" uses unsupported metadata field "${currentKey}".`);
      }

      stepValue[currentKey] = readInlineScalarValue(fieldMatch[2]);
      return;
    }

    if (currentKey === 'focusHtmlNeedles') {
      const listItemMatch = line.match(/^\s*-\s+(.+)$/);

      if (listItemMatch) {
        stepValue.focusHtmlNeedles.push(normalizeString(listItemMatch[1]));
        return;
      }
    }

    if (currentKey && /^\s+/.test(line) && normalizeString(line)) {
      if (currentKey === 'focusHtmlNeedles') {
        throw new Error(`Step "${stepId}" must express focusHtmlNeedles as a YAML list item.`);
      }

      stepValue[currentKey] = `${stepValue[currentKey]} ${normalizeString(line)}`.trim();
      return;
    }

    if (!normalizeString(line)) {
      return;
    }

    throw new Error(`Step "${stepId}" contains unsupported metadata content: "${line}".`);
  });

  const title = normalizeString(stepValue.title);
  const summary = normalizeString(stepValue.summary);
  const intent = normalizeString(stepValue.intent);

  if (!title) {
    throw new Error(`Step "${stepId}" must define title.`);
  }

  if (!summary) {
    throw new Error(`Step "${stepId}" must define summary.`);
  }

  if (!intent) {
    throw new Error(`Step "${stepId}" must define intent.`);
  }

  const focusHtmlNeedles = Array.isArray(stepValue.focusHtmlNeedles)
    ? stepValue.focusHtmlNeedles.map(needle => normalizeString(needle)).filter(Boolean)
    : [];

  return {
    stepId,
    title,
    summary,
    intent,
    tag: normalizeString(stepValue.tag),
    proTip: normalizeString(stepValue.proTip),
    focusHtmlNeedles: stepValue.focusHtmlNeedles
  };
}

function normalizeSceneSectionHeading(rawHeading, stepId, sceneId) {
  const showCodeMatch = rawHeading.match(/^show code:\s*(.+)$/i);

  if (showCodeMatch) {
    return {
      type: 'show-code',
      artifactId: normalizeString(showCodeMatch[1])
    };
  }

  const normalizedHeading = normalizeString(rawHeading).toLowerCase();

  if (!SCENE_SECTION_NAMES.has(normalizedHeading)) {
    throw new Error(`Scene "${sceneId}" in step "${stepId}" uses unsupported section "${rawHeading}".`);
  }

  return {
    type: normalizedHeading
  };
}

function normalizeScene(stepId, rawScene, artifactLanguageById, previewType) {
  const sceneId = normalizeString(rawScene.sceneId);
  const seenSectionTypes = new Set();
  let narration = '';
  let preview = null;
  let theory = null;
  const showCodeBlocks = [];

  assertKebabCase(sceneId, 'Scene ID');

  rawScene.sections.forEach(section => {
    const heading = normalizeSceneSectionHeading(section.heading, stepId, sceneId);
    const sectionKey = heading.type === 'show-code'
      ? `show-code:${heading.artifactId}`
      : heading.type;

    if (seenSectionTypes.has(sectionKey)) {
      throw new Error(`Scene "${sceneId}" in step "${stepId}" defines "${section.heading}" more than once.`);
    }

    seenSectionTypes.add(sectionKey);

    if (heading.type === 'narration') {
      narration = readNarrationSection(section.lines, stepId, sceneId);
      return;
    }

    if (heading.type === 'preview') {
      preview = normalizePreviewSection(parseYamlFragment(`preview in scene "${sceneId}"`, section.lines), stepId, sceneId);
      return;
    }

    if (heading.type === 'theory') {
      theory = normalizeTheorySection(parseYamlFragment(`theory in scene "${sceneId}"`, section.lines), stepId, sceneId);
      return;
    }

    if (!heading.artifactId) {
      throw new Error(`Scene "${sceneId}" in step "${stepId}" must name the artifact in "Show Code: <artifactId>".`);
    }

    const artifactLanguage = artifactLanguageById[heading.artifactId];

    if (!artifactLanguage) {
      throw new Error(`Scene "${sceneId}" in step "${stepId}" references unknown artifact "${heading.artifactId}".`);
    }

    const codeFence = readCodeFence(section.lines, stepId, sceneId, heading.artifactId);
    const normalizedFenceLanguage = codeFence.fenceLanguage.toLowerCase();
    const languageAliasesByArtifactLanguage = {
      html: new Set(['html']),
      css: new Set(['css']),
      js: new Set(['js', 'javascript']),
      yaml: new Set(['yaml', 'yml']),
      md: new Set(['md', 'markdown']),
      sql: new Set(['sql']),
      php: new Set(['php'])
    };
    const allowedFenceLanguages = languageAliasesByArtifactLanguage[artifactLanguage] || new Set([artifactLanguage]);

    if (normalizedFenceLanguage && !allowedFenceLanguages.has(normalizedFenceLanguage)) {
      throw new Error(`Scene "${sceneId}" in step "${stepId}" must use a ${artifactLanguage} code fence for artifact "${heading.artifactId}".`);
    }

    showCodeBlocks.push({
      artifactId: heading.artifactId,
      codeText: codeFence.codeText,
      fenceLanguage: normalizedFenceLanguage || artifactLanguage
    });
  });

  if (!narration) {
    throw new Error(`Scene "${sceneId}" in step "${stepId}" must define a "Narration" section.`);
  }

  if (!showCodeBlocks.length) {
    throw new Error(`Scene "${sceneId}" in step "${stepId}" must define at least one "Show Code" section.`);
  }

  return {
    sceneId,
    narration,
    showCodeBlocks,
    preview: preview || (previewType === 'none'
      ? { action: 'none' }
      : { action: 'apply-state', target: previewType }),
    ...(theory ? { theory } : {})
  };
}

export function readLessonScript(markdown) {
  const { attributes, body } = parseFrontmatter(markdown);
  const schemaVersion = Number(attributes.schemaVersion);
  const lessonId = normalizeString(attributes.lessonId);
  const previewType = normalizeString(attributes.preview?.type);
  const artifacts = Array.isArray(attributes.artifacts) ? attributes.artifacts : [];

  if (!Number.isInteger(schemaVersion) || schemaVersion < 1) {
    throw new Error('lesson.script.md must define schemaVersion.');
  }

  if (!lessonId) {
    throw new Error('lesson.script.md must define lessonId.');
  }

  assertKebabCase(lessonId, 'Lesson ID');

  if (!previewType) {
    throw new Error('lesson.script.md must define preview.type.');
  }

  if (!artifacts.length) {
    throw new Error('lesson.script.md must declare at least one artifact.');
  }

  const artifactLanguageById = Object.fromEntries(
    artifacts.map(artifact => [normalizeString(artifact.artifactId), normalizeString(artifact.language)])
  );

  const lines = String(body || '').split('\n');
  const steps = [];
  let currentStepId = '';
  let currentStepMetadataLines = [];
  let currentScenes = [];
  let currentSceneId = '';
  let currentSceneSections = [];
  let currentSceneSectionHeading = '';
  let currentSceneSectionLines = [];

  function flushSceneSection() {
    if (!currentSceneSectionHeading) {
      return;
    }

    currentSceneSections.push({
      heading: currentSceneSectionHeading,
      lines: currentSceneSectionLines
    });
    currentSceneSectionHeading = '';
    currentSceneSectionLines = [];
  }

  function flushScene() {
    if (!currentSceneId) {
      return;
    }

    flushSceneSection();
    currentScenes.push({
      sceneId: currentSceneId,
      sections: currentSceneSections
    });
    currentSceneId = '';
    currentSceneSections = [];
  }

  function flushStep() {
    if (!currentStepId) {
      return;
    }

    flushScene();

    if (!currentScenes.length) {
      throw new Error(`Step "${currentStepId}" must contain at least one scene.`);
    }

    const normalizedStep = normalizeStepMetadata(currentStepId, currentStepMetadataLines);
    const sceneIds = new Set();
    normalizedStep.scenes = currentScenes.map(scene => {
      const normalizedScene = normalizeScene(currentStepId, scene, artifactLanguageById, previewType);

      if (sceneIds.has(normalizedScene.sceneId)) {
        throw new Error(`Step "${currentStepId}" defines scene "${normalizedScene.sceneId}" more than once.`);
      }

      sceneIds.add(normalizedScene.sceneId);
      return normalizedScene;
    });

    steps.push(normalizedStep);
    currentStepId = '';
    currentStepMetadataLines = [];
    currentScenes = [];
  }

  lines.forEach(line => {
    const stepMatch = line.match(/^# Step:\s*(.+)$/);

    if (stepMatch) {
      flushStep();
      currentStepId = normalizeString(stepMatch[1]);

      if (!currentStepId) {
        throw new Error('Each "Step" heading must define a step id.');
      }

      assertKebabCase(currentStepId, 'Step ID');
      return;
    }

    const sceneMatch = line.match(/^## Scene:\s*(.+)$/);

    if (sceneMatch) {
      if (!currentStepId) {
        throw new Error(`Scene heading "${sceneMatch[1]}" appears before any step heading.`);
      }

      flushScene();
      currentSceneId = normalizeString(sceneMatch[1]);

      if (!currentSceneId) {
        throw new Error(`Step "${currentStepId}" contains a scene without a scene id.`);
      }

      return;
    }

    const sectionMatch = line.match(/^###\s+(.+)$/);

    if (sectionMatch) {
      if (!currentSceneId) {
        throw new Error(`Step "${currentStepId}" contains a scene section before any scene heading.`);
      }

      flushSceneSection();
      currentSceneSectionHeading = normalizeString(sectionMatch[1]);
      return;
    }

    if (!currentStepId) {
      if (normalizeString(line)) {
        throw new Error('lesson.script.md body must start with a step heading.');
      }

      return;
    }

    if (!currentSceneId) {
      currentStepMetadataLines.push(line);
      return;
    }

    if (!currentSceneSectionHeading) {
      if (normalizeString(line)) {
        throw new Error(`Scene "${currentSceneId}" in step "${currentStepId}" must start with a "Narration" or "Show Code" section.`);
      }

      return;
    }

    currentSceneSectionLines.push(line);
  });

  flushStep();

  if (!steps.length) {
    throw new Error('lesson.script.md must declare at least one step.');
  }

  return {
    schemaVersion,
    lessonId,
    attributes,
    body,
    steps
  };
}
