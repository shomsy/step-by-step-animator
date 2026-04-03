import { normalizeString } from '../lesson-engine/build-compiled-lesson.js';

function readLineOffsets(sourceMarkdown) {
  const lines = String(sourceMarkdown || '').split('\n');
  const lineStarts = [];
  let offset = 0;

  lines.forEach((line) => {
    lineStarts.push(offset);
    offset += line.length + 1;
  });

  return {
    lines,
    lineStarts,
  };
}

function readLineIndexFromOffset(lineStarts, offset) {
  if (!lineStarts.length) {
    return 0;
  }

  let low = 0;
  let high = lineStarts.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const lineStart = lineStarts[mid];
    const nextLineStart = lineStarts[mid + 1] ?? Number.POSITIVE_INFINITY;

    if (offset < lineStart) {
      high = mid - 1;
      continue;
    }

    if (offset >= nextLineStart) {
      low = mid + 1;
      continue;
    }

    return mid;
  }

  return Math.max(0, Math.min(lineStarts.length - 1, low));
}

export function readEditorContextFromScan(scan, cursorOffset) {
  const lineIndex = readLineIndexFromOffset(scan?.lineStarts || [], cursorOffset);

  return {
    ...scan,
    lineIndex,
    lineNumber: lineIndex + 1,
    context: scan?.contextByLine?.[lineIndex] || {
      kind: 'root',
      lineIndex,
      lineNumber: lineIndex + 1,
      stepIndex: -1,
      sceneIndex: -1,
      sectionType: '',
      artifactId: '',
      insideCodeFence: false,
    },
  };
}

function isFrontmatterBoundary(line, lineIndex) {
  return lineIndex === 0 && normalizeString(line) === '---';
}

function readShowCodeArtifactId(heading) {
  const match = normalizeString(heading).match(/^show code:\s*(.+)$/i);

  return match ? normalizeString(match[1]) : '';
}

function createOutlineNodeMap(parsedLesson) {
  if (!parsedLesson) {
    return {
      stepTitles: [],
      sceneTitlesByStep: [],
    };
  }

  return {
    stepTitles: parsedLesson.steps.map((step) => step.title),
    sceneTitlesByStep: parsedLesson.steps.map((step) => step.scenes.map((scene) => scene.sceneId)),
  };
}

export function scanLessonScriptSource(sourceMarkdown, parsedLesson = null) {
  const { lines, lineStarts } = readLineOffsets(sourceMarkdown);
  const labels = createOutlineNodeMap(parsedLesson);
  const steps = [];
  const contextByLine = [];
  const existingStepIds = new Set();
  const existingSceneIdsByStep = [];
  let currentStepIndex = -1;
  let currentSceneIndex = -1;
  let currentSectionType = '';
  let currentArtifactId = '';
  let insideFrontmatter = false;
  let insideCodeFence = false;
  let frontmatterBoundaryCount = 0;

  lines.forEach((line, lineIndex) => {
    const trimmedLine = normalizeString(line);
    const stepMatch = line.match(/^# Step:\s*(.+)$/);
    const sceneMatch = line.match(/^## Scene:\s*(.+)$/);
    const sectionMatch = line.match(/^###\s+(.+)$/);

    if (isFrontmatterBoundary(line, lineIndex)) {
      insideFrontmatter = true;
    } else if (insideFrontmatter && trimmedLine === '---') {
      insideFrontmatter = false;
      frontmatterBoundaryCount += 1;
    } else if (insideFrontmatter) {
      contextByLine.push({
        kind: 'root',
        lineIndex,
        lineNumber: lineIndex + 1,
        stepIndex: -1,
        sceneIndex: -1,
        sectionType: '',
        artifactId: '',
        insideCodeFence: false,
      });
      return;
    }

    if (stepMatch) {
      currentStepIndex += 1;
      currentSceneIndex = -1;
      currentSectionType = '';
      currentArtifactId = '';
      insideCodeFence = false;

      const stepId = normalizeString(stepMatch[1]);
      existingStepIds.add(stepId);
      existingSceneIdsByStep[currentStepIndex] = [];

      steps.push({
        stepIndex: currentStepIndex,
        stepId,
        title: labels.stepTitles[currentStepIndex] || stepId,
        lineIndex,
        lineNumber: lineIndex + 1,
        startOffset: lineStarts[lineIndex],
        scenes: [],
      });
    } else if (sceneMatch) {
      currentSceneIndex += 1;
      currentSectionType = '';
      currentArtifactId = '';
      insideCodeFence = false;

      const sceneId = normalizeString(sceneMatch[1]);
      const stepNode = steps[currentStepIndex];

      if (stepNode) {
        existingSceneIdsByStep[currentStepIndex] ||= [];
        existingSceneIdsByStep[currentStepIndex].push(sceneId);
        stepNode.scenes.push({
          sceneIndex: currentSceneIndex,
          sceneId,
          title: labels.sceneTitlesByStep[currentStepIndex]?.[currentSceneIndex] || sceneId,
          lineIndex,
          lineNumber: lineIndex + 1,
          startOffset: lineStarts[lineIndex],
          sections: [],
        });
      }
    } else if (sectionMatch) {
      const sectionHeading = normalizeString(sectionMatch[1]);
      const showCodeArtifactId = readShowCodeArtifactId(sectionHeading);

      if (showCodeArtifactId) {
        currentSectionType = 'show-code';
        currentArtifactId = showCodeArtifactId;
      } else {
        currentSectionType = sectionHeading.toLowerCase();
        currentArtifactId = '';
      }

      insideCodeFence = false;

      const sceneNode = steps[currentStepIndex]?.scenes[currentSceneIndex];

      if (sceneNode) {
        sceneNode.sections.push({
          heading: sectionHeading,
          lineIndex,
          lineNumber: lineIndex + 1,
          startOffset: lineStarts[lineIndex],
        });
      }
    } else if (/^```/.test(trimmedLine) && currentSectionType === 'show-code') {
      insideCodeFence = !insideCodeFence;
    }

    contextByLine.push({
      kind:
        currentStepIndex < 0
          ? 'root'
          : currentSceneIndex < 0
            ? 'step'
            : currentSectionType === 'show-code' || insideCodeFence
              ? 'show-code'
              : 'scene',
      lineIndex,
      lineNumber: lineIndex + 1,
      stepIndex: currentStepIndex,
      sceneIndex: currentSceneIndex,
      sectionType: currentSectionType,
      artifactId: currentArtifactId,
      insideCodeFence,
    });
  });

  const outlinedSteps = steps.map((stepNode, stepIndex) => ({
    ...stepNode,
    title: labels.stepTitles[stepIndex] || stepNode.title || stepNode.stepId,
    scenes: stepNode.scenes.map((sceneNode, sceneIndex) => ({
      ...sceneNode,
      title:
        labels.sceneTitlesByStep[stepIndex]?.[sceneIndex] || sceneNode.title || sceneNode.sceneId,
    })),
  }));

  return {
    lineStarts,
    lines,
    frontmatterBoundaryCount,
    steps: outlinedSteps,
    contextByLine,
    existingStepIds,
    existingSceneIdsByStep,
  };
}

export function readEditorContext(sourceMarkdown, cursorOffset, parsedLesson = null) {
  const scan = scanLessonScriptSource(sourceMarkdown, parsedLesson);

  return readEditorContextFromScan(scan, cursorOffset);
}

function suggestUniqueId(prefix, existingIds) {
  let sequence = 1;
  let candidate = `${prefix}-${sequence}`;

  while (existingIds.has(candidate)) {
    sequence += 1;
    candidate = `${prefix}-${sequence}`;
  }

  return candidate;
}

function readDefaultPreviewTarget(parsedLesson) {
  return normalizeString(parsedLesson?.attributes?.preview?.type) || 'dom';
}

function readFenceLanguageForArtifact(parsedLesson, artifactId) {
  const declaredLanguage = normalizeString(
    parsedLesson?.attributes?.artifacts?.find((artifact) => artifact.artifactId === artifactId)
      ?.language
  );

  if (declaredLanguage === 'html' || declaredLanguage === 'css') {
    return declaredLanguage;
  }

  if (declaredLanguage === 'js' || declaredLanguage === 'template-js') {
    return 'javascript';
  }

  if (declaredLanguage === 'shadow-css') {
    return 'css';
  }

  if (artifactId === 'html') {
    return 'html';
  }

  if (artifactId === 'css' || artifactId === 'shadow-css') {
    return 'css';
  }

  return 'javascript';
}

export function buildInsertMenuItems(context) {
  if (context.kind === 'root') {
    return [{ action: 'insert-step', label: 'Insert Step', hint: 'Insert a new step block.' }];
  }

  if (context.kind === 'step') {
    return [
      {
        action: 'insert-scene',
        label: 'Insert Scene',
        hint: 'Insert a scene block under the current step.',
      },
      {
        action: 'insert-step-summary',
        label: 'Insert Step Summary',
        hint: 'Insert the step summary field.',
      },
      { action: 'insert-intent', label: 'Insert Intent', hint: 'Insert the step intent field.' },
    ];
  }

  return [
    {
      action: 'insert-narration',
      label: 'Insert Narration',
      hint: 'Insert the narration section.',
    },
    {
      action: 'insert-show-code:html',
      label: 'Insert Show Code → HTML',
      hint: 'Insert an HTML code block.',
    },
    {
      action: 'insert-show-code:css',
      label: 'Insert Show Code → CSS',
      hint: 'Insert a CSS code block.',
    },
    {
      action: 'insert-show-code:js',
      label: 'Insert Show Code → JS',
      hint: 'Insert a JS code block.',
    },
    {
      action: 'insert-show-code:template-js',
      label: 'Insert Show Code → Template JS',
      hint: 'Insert a template JS code block.',
    },
    {
      action: 'insert-show-code:shadow-css',
      label: 'Insert Show Code → Shadow CSS',
      hint: 'Insert a shadow CSS code block.',
    },
    {
      action: 'insert-theory-link',
      label: 'Insert Theory Link',
      hint: 'Insert the theory section.',
    },
    {
      action: 'insert-preview-action',
      label: 'Insert Preview Action',
      hint: 'Insert the preview section.',
    },
  ];
}

function createSnippet(text, selectionStart, selectionEnd = selectionStart) {
  return {
    text,
    selectionStart,
    selectionEnd,
  };
}

export function buildInsertSnippet(actionName, parsedLesson, scan) {
  const existingStepIds = scan.existingStepIds;
  const existingSceneIds = scan.existingSceneIdsByStep[scan.context.stepIndex] || [];
  const primaryArtifact =
    parsedLesson?.attributes?.artifacts?.find((artifact) => artifact.isPrimary) ||
    parsedLesson?.attributes?.artifacts?.[0];
  const previewTarget = readDefaultPreviewTarget(parsedLesson);

  if (actionName === 'insert-step') {
    const stepId = suggestUniqueId('new-step', existingStepIds);
    const snippet = [
      `# Step: ${stepId}`,
      'title: New Step',
      'summary: Explain what changes in this step.',
      'intent: State why this step exists.',
      '',
    ].join('\n');

    return createSnippet(snippet, '# Step: '.length, `# Step: ${stepId}`.length);
  }

  if (actionName === 'insert-scene') {
    const sceneId = suggestUniqueId('new-scene', new Set(existingSceneIds));
    const snippet = [`## Scene: ${sceneId}`, ''].join('\n');

    return createSnippet(snippet, '## Scene: '.length, `## Scene: ${sceneId}`.length);
  }

  if (actionName === 'insert-step-summary') {
    const snippet = ['summary: Explain what changes in this step.', ''].join('\n');

    return createSnippet(snippet, 'summary: '.length, snippet.indexOf('\n'));
  }

  if (actionName === 'insert-intent') {
    const snippet = ['intent: State why this step exists.', ''].join('\n');

    return createSnippet(snippet, 'intent: '.length, snippet.indexOf('\n'));
  }

  if (actionName === 'insert-narration') {
    const snippet = ['### Narration', '', ''].join('\n');

    return createSnippet(snippet, snippet.indexOf('\n') + 1, snippet.indexOf('\n') + 1);
  }

  if (actionName.startsWith('insert-show-code:')) {
    const artifactId = actionName.split(':')[1];
    const fenceLanguage = readFenceLanguageForArtifact(parsedLesson, artifactId);
    const snippet = [`### Show Code: ${artifactId}`, `\`\`\`${fenceLanguage}`, '', '```', ''].join(
      '\n'
    );

    return createSnippet(
      snippet,
      `### Show Code: ${artifactId}\n\`\`\`${fenceLanguage}\n`.length,
      `### Show Code: ${artifactId}\n\`\`\`${fenceLanguage}\n`.length
    );
  }

  if (actionName === 'insert-theory-link') {
    const snippet = ['### Theory', 'anchor: theory-anchor', ''].join('\n');

    return createSnippet(
      snippet,
      'anchor: '.length + '### Theory\n'.length,
      'anchor: '.length + '### Theory\n'.length + 'theory-anchor'.length
    );
  }

  if (actionName === 'insert-preview-action') {
    const snippet = ['### Preview', 'action: apply-state', `target: ${previewTarget}`, ''].join(
      '\n'
    );

    const selectionStart = '### Preview\naction: '.length;
    const selectionEnd = selectionStart + 'apply-state'.length;

    return createSnippet(snippet, selectionStart, selectionEnd);
  }

  const fallbackArtifactId = primaryArtifact?.artifactId || 'html';
  const fallbackFenceLanguage = readFenceLanguageForArtifact(parsedLesson, fallbackArtifactId);
  return createSnippet(
    [`### Show Code: ${fallbackArtifactId}`, `\`\`\`${fallbackFenceLanguage}`, '', '```', ''].join(
      '\n'
    ),
    `### Show Code: ${fallbackArtifactId}\n\`\`\`${fallbackFenceLanguage}\n`.length,
    `### Show Code: ${fallbackArtifactId}\n\`\`\`${fallbackFenceLanguage}\n`.length
  );
}
