import YAML from 'yaml';
import { normalizeString } from './build-compiled-lesson.js';

function stringifyYamlBlock(value) {
  return YAML.stringify(value, {
    lineWidth: 0,
  }).trimEnd();
}

function buildDefaultPreview(previewType) {
  const normalizedPreviewType = normalizeString(previewType);

  if (normalizedPreviewType === 'none') {
    return { action: 'none' };
  }

  return {
    action: 'apply-state',
    target: normalizedPreviewType,
  };
}

function isSamePreview(left, right) {
  return (
    normalizeString(left?.action) === normalizeString(right?.action) &&
    normalizeString(left?.target) === normalizeString(right?.target)
  );
}

function buildStepMetadata(step) {
  const metadata = {
    title: step.title,
    summary: step.summary,
    intent: step.intent,
  };

  if (normalizeString(step.tag)) {
    metadata.tag = step.tag;
  }

  if (normalizeString(step.proTip)) {
    metadata.proTip = step.proTip;
  }

  if (Array.isArray(step.focusHtmlNeedles) && step.focusHtmlNeedles.length) {
    metadata.focusHtmlNeedles = step.focusHtmlNeedles;
  }

  return stringifyYamlBlock(metadata);
}

function buildPreviewSection(scene, defaultPreview) {
  if (!scene.preview || isSamePreview(scene.preview, defaultPreview)) {
    return '';
  }

  return ['### Preview', stringifyYamlBlock(scene.preview)].join('\n');
}

function buildTheorySection(scene) {
  if (!scene.theory) {
    return '';
  }

  return ['### Theory', stringifyYamlBlock(scene.theory)].join('\n');
}

function buildCodeSection(showCodeBlock) {
  return [
    `### Show Code: ${showCodeBlock.artifactId}`,
    `\`\`\`${showCodeBlock.fenceLanguage || showCodeBlock.language}`,
    ...String(showCodeBlock.codeText || '').split('\n'),
    '```',
  ].join('\n');
}

function buildSceneMarkdown(scene, defaultPreview) {
  const previewSection = buildPreviewSection(scene, defaultPreview);
  const theorySection = buildTheorySection(scene);

  return [
    `## Scene: ${scene.sceneId}`,
    '',
    '### Narration',
    scene.narration,
    ...(previewSection ? ['', previewSection] : []),
    ...(theorySection ? ['', theorySection] : []),
    '',
    scene.showCodeBlocks.map(buildCodeSection).join('\n\n'),
  ].join('\n');
}

function buildStepMarkdown(step, defaultPreview) {
  return [
    `# Step: ${step.stepId}`,
    buildStepMetadata(step),
    '',
    step.scenes.map((scene) => buildSceneMarkdown(scene, defaultPreview)).join('\n\n'),
  ].join('\n');
}

export function buildLessonScriptMarkdown({ lessonAttributes, steps }) {
  const defaultPreview = buildDefaultPreview(lessonAttributes.preview?.type);

  return [
    '---',
    stringifyYamlBlock(lessonAttributes),
    '---',
    steps.map((step) => buildStepMarkdown(step, defaultPreview)).join('\n\n'),
    '',
  ].join('\n');
}
