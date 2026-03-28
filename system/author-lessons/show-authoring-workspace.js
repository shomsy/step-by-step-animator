import { buildLessonScriptMarkdown } from '../lesson-engine/build-lesson-script-markdown.js';
import { compileLessonScript } from '../lesson-engine/compile-lesson-script.js';
import { composeLivePreviewDocument } from '../animator-engine/play-lesson/04-watch-preview/show-current-preview.js';
import { openAuthoringSqlite } from './open-authoring-sqlite.js';
import { readShippedLessonScripts } from './read-shipped-lesson-scripts.js';

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function normalizeSelection(selection) {
  return selection || { kind: 'lesson' };
}

function findSelectedDraft(state) {
  return state.workspaceSnapshot.selectedDraft;
}

function findSelectedStep(state) {
  const selectedDraft = findSelectedDraft(state);

  if (!selectedDraft || state.selection.kind === 'lesson') {
    return null;
  }

  return selectedDraft.contract.steps[state.selection.stepIndex] || null;
}

function findSelectedScene(state) {
  const selectedStep = findSelectedStep(state);

  if (!selectedStep || state.selection.kind === 'step') {
    return null;
  }

  return selectedStep.scenes[state.selection.sceneIndex] || null;
}

function findSelectedShowCodeBlock(state) {
  const selectedScene = findSelectedScene(state);

  if (!selectedScene || state.selection.kind !== 'show-code') {
    return null;
  }

  return selectedScene.showCodeBlocks[state.selection.blockIndex] || null;
}

function buildStatusTone(state) {
  if (state.compileErrorMessage) {
    return 'danger';
  }

  if (state.statusMessageTone) {
    return state.statusMessageTone;
  }

  return state.dirty ? 'warning' : 'success';
}

function readDraftMarkdown(selectedDraft) {
  return buildLessonScriptMarkdown({
    lessonAttributes: selectedDraft.contract.attributes,
    steps: selectedDraft.contract.steps
  });
}

function readCompiledDraftState(selectedDraft) {
  const scriptMarkdown = readDraftMarkdown(selectedDraft);

  return {
    scriptMarkdown,
    compiledLesson: compileLessonScript({
      scriptMarkdown
    })
  };
}

function updateCompileState(state) {
  const selectedDraft = findSelectedDraft(state);

  state.scriptMarkdown = '';
  state.compiledLesson = null;
  state.compileErrorMessage = '';

  if (!selectedDraft) {
    return;
  }

  try {
    const compiledDraftState = readCompiledDraftState(selectedDraft);

    state.scriptMarkdown = compiledDraftState.scriptMarkdown;
    state.compiledLesson = compiledDraftState.compiledLesson;
    state.previewStepIndex = Math.min(
      state.previewStepIndex,
      Math.max(0, compiledDraftState.compiledLesson.steps.length - 1)
    );
  } catch (error) {
    state.compileErrorMessage = error.message;
  }
}

function buildWorkspaceUrl(ownerLocation, workspaceName) {
  const nextUrl = new URL(ownerLocation.href);

  if (workspaceName) {
    nextUrl.searchParams.set('workspace', workspaceName);
  } else {
    nextUrl.searchParams.delete('workspace');
  }

  return nextUrl.toString();
}

function buildSelectionButton({
  label,
  action,
  selected = false
}) {
  return `<button type="button" class="authoring-outline-item${selected ? ' is-selected' : ''}" data-action="${action}">${label}</button>`;
}

function buildOutlineMarkup(state) {
  const selectedDraft = findSelectedDraft(state);

  if (!selectedDraft) {
    return '<div class="authoring-empty">No draft selected.</div>';
  }

  const stepButtons = selectedDraft.contract.steps.map((step, stepIndex) => {
    const sceneButtons = step.scenes.map((scene, sceneIndex) => {
      const showCodeButtons = scene.showCodeBlocks.map((showCodeBlock, blockIndex) => `
        <div class="authoring-outline-depth">
          ${buildSelectionButton({
            label: `Code · ${escapeHtml(showCodeBlock.artifactId)}`,
            action: `select-show-code:${stepIndex}:${sceneIndex}:${blockIndex}`,
            selected: state.selection.kind === 'show-code'
              && state.selection.stepIndex === stepIndex
              && state.selection.sceneIndex === sceneIndex
              && state.selection.blockIndex === blockIndex
          })}
        </div>
      `).join('');

      return `
        <div class="authoring-outline-depth">
          ${buildSelectionButton({
            label: `Scene · ${escapeHtml(scene.sceneId)}`,
            action: `select-scene:${stepIndex}:${sceneIndex}`,
            selected: state.selection.kind === 'scene'
              && state.selection.stepIndex === stepIndex
              && state.selection.sceneIndex === sceneIndex
          })}
          ${showCodeButtons}
        </div>
      `;
    }).join('');

    return `
      <div class="authoring-outline-step">
        ${buildSelectionButton({
          label: `${stepIndex + 1}. ${escapeHtml(step.title)}`,
          action: `select-step:${stepIndex}`,
          selected: state.selection.kind === 'step' && state.selection.stepIndex === stepIndex
        })}
        ${sceneButtons}
      </div>
    `;
  }).join('');

  return `
    <div class="authoring-outline-root">
      ${buildSelectionButton({
        label: `Lesson · ${escapeHtml(selectedDraft.lessonTitle)}`,
        action: 'select-lesson',
        selected: state.selection.kind === 'lesson'
      })}
      ${stepButtons}
    </div>
  `;
}

function buildDraftListMarkup(state) {
  const shippedLessons = state.workspaceSnapshot.shippedLessons.map(shippedLesson => `
    <button type="button" class="authoring-draft-item" data-action="open-shipped:${shippedLesson.lessonId}">
      <strong>${escapeHtml(shippedLesson.lessonTitle)}</strong>
      <span>${escapeHtml(shippedLesson.lessonId)}</span>
    </button>
  `).join('');
  const draftButtons = state.workspaceSnapshot.drafts.map(draft => `
    <button type="button" class="authoring-draft-item${findSelectedDraft(state)?.draftId === draft.draftId ? ' is-selected' : ''}" data-action="open-draft:${draft.draftId}">
      <strong>${escapeHtml(draft.lessonTitle)}</strong>
      <span>${escapeHtml(draft.lessonId)} · ${escapeHtml(draft.sourceOrigin)}</span>
    </button>
  `).join('');
  const versionButtons = findSelectedDraft(state)
    ? findSelectedDraft(state).versions.map(version => `
        <button type="button" class="authoring-version-item" data-action="restore-version:${version.versionId}">
          <strong>${escapeHtml(version.versionKind)}</strong>
          <span>${escapeHtml(version.createdAt)}</span>
        </button>
      `).join('') || '<div class="authoring-empty">No published snapshots yet.</div>'
    : '<div class="authoring-empty">Select a draft to inspect versions.</div>';

  return `
    <section class="authoring-sidebar-card">
      <div class="authoring-sidebar-head">
        <span class="authoring-kicker">Shipped Source</span>
        <h2>${state.workspaceSnapshot.shippedLessons.length}</h2>
      </div>
      <div class="authoring-sidebar-list">${shippedLessons}</div>
    </section>

    <section class="authoring-sidebar-card">
      <div class="authoring-sidebar-head">
        <span class="authoring-kicker">Draft Workspace</span>
        <h2>${state.workspaceSnapshot.drafts.length}</h2>
      </div>
      <div class="authoring-sidebar-list">${draftButtons}</div>
    </section>

    <section class="authoring-sidebar-card">
      <div class="authoring-sidebar-head">
        <span class="authoring-kicker">Published Snapshots</span>
        <h2>${findSelectedDraft(state)?.versions.length || 0}</h2>
      </div>
      <div class="authoring-sidebar-list">${versionButtons}</div>
    </section>
  `;
}

function buildArtifactRows(attributes) {
  return (attributes.artifacts || []).map((artifact, artifactIndex) => `
    <div class="authoring-artifact-row">
      <label>
        <span>artifactId</span>
        <input type="text" data-action="change-artifact-id:${artifactIndex}" value="${escapeHtml(artifact.artifactId)}" />
      </label>
      <label>
        <span>language</span>
        <input type="text" data-action="change-artifact-language:${artifactIndex}" value="${escapeHtml(artifact.language)}" />
      </label>
      <label>
        <span>label</span>
        <input type="text" data-action="change-artifact-label:${artifactIndex}" value="${escapeHtml(artifact.label || '')}" />
      </label>
      <label class="authoring-checkbox">
        <input type="radio" name="authoringPrimaryArtifact" data-action="choose-primary-artifact:${artifactIndex}" ${artifact.isPrimary ? 'checked' : ''} />
        <span>Primary</span>
      </label>
      <button type="button" class="authoring-inline-action" data-action="remove-artifact:${artifactIndex}">Remove</button>
    </div>
  `).join('');
}

function buildLessonEditorMarkup(state) {
  const selectedDraft = findSelectedDraft(state);
  const attributes = selectedDraft.contract.attributes;

  return `
    <section class="authoring-editor-card">
      <div class="authoring-editor-head">
        <div>
          <span class="authoring-kicker">Lesson Meta</span>
          <h2>${escapeHtml(selectedDraft.lessonTitle)}</h2>
        </div>
        <div class="authoring-inline-actions">
          <button type="button" class="authoring-inline-action" data-action="add-step">Add Step</button>
          <button type="button" class="authoring-inline-action" data-action="add-artifact">Add Artifact</button>
        </div>
      </div>
      <div class="authoring-grid">
        <label><span>lessonId</span><input type="text" data-action="change-lesson-attribute:lessonId" value="${escapeHtml(attributes.lessonId)}" /></label>
        <label><span>lessonTitle</span><input type="text" data-action="change-lesson-attribute:lessonTitle" value="${escapeHtml(attributes.lessonTitle)}" /></label>
        <label><span>status</span><input type="text" data-action="change-lesson-attribute:status" value="${escapeHtml(attributes.status)}" /></label>
        <label><span>courseId</span><input type="text" data-action="change-lesson-attribute:courseId" value="${escapeHtml(attributes.courseId)}" /></label>
        <label><span>order</span><input type="number" data-action="change-lesson-attribute:order" value="${escapeHtml(String(attributes.order))}" /></label>
        <label><span>preview title</span><input type="text" data-action="change-preview-attribute:title" value="${escapeHtml(attributes.preview?.title || '')}" /></label>
        <label><span>preview type</span><input type="text" data-action="change-preview-attribute:type" value="${escapeHtml(attributes.preview?.type || '')}" /></label>
        <label><span>preview address</span><input type="text" data-action="change-preview-attribute:address" value="${escapeHtml(attributes.preview?.address || '')}" /></label>
      </div>
      <label class="authoring-field authoring-field-wide">
        <span>lessonIntro</span>
        <textarea data-action="change-lesson-attribute:lessonIntro">${escapeHtml(attributes.lessonIntro || '')}</textarea>
      </label>
      <div class="authoring-subsection">
        <div class="authoring-subsection-head">
          <span class="authoring-kicker">Artifacts</span>
          <p>Shipped source stays immutable. Draft artifacts only change here.</p>
        </div>
        <div class="authoring-artifact-list">
          ${buildArtifactRows(attributes)}
        </div>
      </div>
    </section>
  `;
}

function buildStepEditorMarkup(state) {
  const selectedStep = findSelectedStep(state);

  return `
    <section class="authoring-editor-card">
      <div class="authoring-editor-head">
        <div>
          <span class="authoring-kicker">Step</span>
          <h2>${escapeHtml(selectedStep.stepId)}</h2>
        </div>
        <div class="authoring-inline-actions">
          <button type="button" class="authoring-inline-action" data-action="move-step-up">Move Up</button>
          <button type="button" class="authoring-inline-action" data-action="move-step-down">Move Down</button>
          <button type="button" class="authoring-inline-action" data-action="add-scene">Add Scene</button>
          <button type="button" class="authoring-inline-action" data-action="remove-step">Delete Step</button>
        </div>
      </div>
      <div class="authoring-grid">
        <label><span>stepId</span><input type="text" data-action="change-step-field:stepId" value="${escapeHtml(selectedStep.stepId)}" /></label>
        <label><span>tag</span><input type="text" data-action="change-step-field:tag" value="${escapeHtml(selectedStep.tag || '')}" /></label>
      </div>
      <label class="authoring-field"><span>title</span><input type="text" data-action="change-step-field:title" value="${escapeHtml(selectedStep.title)}" /></label>
      <label class="authoring-field"><span>summary</span><textarea data-action="change-step-field:summary">${escapeHtml(selectedStep.summary)}</textarea></label>
      <label class="authoring-field"><span>intent</span><textarea data-action="change-step-field:intent">${escapeHtml(selectedStep.intent)}</textarea></label>
      <label class="authoring-field"><span>proTip</span><textarea data-action="change-step-field:proTip">${escapeHtml(selectedStep.proTip || '')}</textarea></label>
      <label class="authoring-field"><span>focusHtmlNeedles</span><textarea data-action="change-step-field:focusHtmlNeedles">${escapeHtml((selectedStep.focusHtmlNeedles || []).join('\n'))}</textarea></label>
    </section>
  `;
}

function buildSceneEditorMarkup(state) {
  const selectedScene = findSelectedScene(state);

  return `
    <section class="authoring-editor-card">
      <div class="authoring-editor-head">
        <div>
          <span class="authoring-kicker">Scene</span>
          <h2>${escapeHtml(selectedScene.sceneId)}</h2>
        </div>
        <div class="authoring-inline-actions">
          <button type="button" class="authoring-inline-action" data-action="move-scene-up">Move Up</button>
          <button type="button" class="authoring-inline-action" data-action="move-scene-down">Move Down</button>
          <button type="button" class="authoring-inline-action" data-action="add-show-code">Add Show Code</button>
          <button type="button" class="authoring-inline-action" data-action="remove-scene">Delete Scene</button>
        </div>
      </div>
      <div class="authoring-grid">
        <label><span>sceneId</span><input type="text" data-action="change-scene-field:sceneId" value="${escapeHtml(selectedScene.sceneId)}" /></label>
        <label><span>preview action</span><input type="text" data-action="change-scene-preview:action" value="${escapeHtml(selectedScene.preview?.action || '')}" /></label>
        <label><span>preview target</span><input type="text" data-action="change-scene-preview:target" value="${escapeHtml(selectedScene.preview?.target || '')}" /></label>
        <label><span>theory anchor</span><input type="text" data-action="change-scene-theory:anchor" value="${escapeHtml(selectedScene.theory?.anchor || '')}" /></label>
      </div>
      <label class="authoring-field"><span>narration</span><textarea data-action="change-scene-field:narration">${escapeHtml(selectedScene.narration)}</textarea></label>
    </section>
  `;
}

function buildShowCodeEditorMarkup(state) {
  const selectedShowCodeBlock = findSelectedShowCodeBlock(state);
  const selectedDraft = findSelectedDraft(state);
  const artifactOptions = (selectedDraft.contract.attributes.artifacts || []).map(artifact => `
    <option value="${escapeHtml(artifact.artifactId)}" ${artifact.artifactId === selectedShowCodeBlock.artifactId ? 'selected' : ''}>
      ${escapeHtml(artifact.artifactId)}
    </option>
  `).join('');

  return `
    <section class="authoring-editor-card">
      <div class="authoring-editor-head">
        <div>
          <span class="authoring-kicker">Show Code</span>
          <h2>${escapeHtml(selectedShowCodeBlock.artifactId)}</h2>
        </div>
        <div class="authoring-inline-actions">
          <button type="button" class="authoring-inline-action" data-action="move-show-code-up">Move Up</button>
          <button type="button" class="authoring-inline-action" data-action="move-show-code-down">Move Down</button>
          <button type="button" class="authoring-inline-action" data-action="remove-show-code">Delete Block</button>
        </div>
      </div>
      <div class="authoring-grid">
        <label>
          <span>artifact</span>
          <select data-action="change-show-code-field:artifactId">${artifactOptions}</select>
        </label>
        <label>
          <span>fence language</span>
          <input type="text" data-action="change-show-code-field:fenceLanguage" value="${escapeHtml(selectedShowCodeBlock.fenceLanguage || '')}" />
        </label>
      </div>
      <label class="authoring-field authoring-field-wide">
        <span>code</span>
        <textarea class="authoring-code-input" data-action="change-show-code-field:codeText">${escapeHtml(selectedShowCodeBlock.codeText)}</textarea>
      </label>
    </section>
  `;
}

function buildEditorMarkup(state) {
  if (!findSelectedDraft(state)) {
    return '<div class="authoring-empty">Create or open a draft to start authoring.</div>';
  }

  if (state.selection.kind === 'lesson') {
    return buildLessonEditorMarkup(state);
  }

  if (state.selection.kind === 'step') {
    return buildStepEditorMarkup(state);
  }

  if (state.selection.kind === 'scene') {
    return buildSceneEditorMarkup(state);
  }

  return buildShowCodeEditorMarkup(state);
}

function buildPreviewStepOptions(state) {
  if (!state.compiledLesson) {
    return '';
  }

  return state.compiledLesson.steps.map((step, stepIndex) => `
    <option value="${stepIndex}" ${stepIndex === state.previewStepIndex ? 'selected' : ''}>
      ${stepIndex + 1}. ${escapeHtml(step.title)}
    </option>
  `).join('');
}

function readArtifactCodeText(compiledLesson, stepIndex, artifactId) {
  return (compiledLesson.statesByStep[stepIndex]?.artifacts?.[artifactId] || []).join('\n');
}

function buildPreviewMarkup(state) {
  const selectedDraft = findSelectedDraft(state);

  if (!selectedDraft) {
    return '<div class="authoring-empty">No preview without a selected draft.</div>';
  }

  const compileStatus = state.compileErrorMessage
    ? `<div class="authoring-compile-error">${escapeHtml(state.compileErrorMessage)}</div>`
    : `<div class="authoring-compile-ok">Compiled cleanly at step ${state.previewStepIndex + 1} of ${state.compiledLesson.steps.length}.</div>`;
  const htmlCode = state.compiledLesson ? readArtifactCodeText(state.compiledLesson, state.previewStepIndex, 'html') : '';
  const cssCode = state.compiledLesson ? readArtifactCodeText(state.compiledLesson, state.previewStepIndex, 'css') : '';

  return `
    <section class="authoring-preview-card">
      <div class="authoring-preview-head">
        <div>
          <span class="authoring-kicker">Compile State</span>
          <h2>${escapeHtml(selectedDraft.lessonTitle)}</h2>
        </div>
        <label class="authoring-preview-step">
          <span>Preview step</span>
          <select id="authoringPreviewStepSelect">${buildPreviewStepOptions(state)}</select>
        </label>
      </div>
      ${compileStatus}
      <iframe class="authoring-preview-frame" id="authoringPreviewFrame" title="Lesson authoring preview" sandbox="allow-scripts"></iframe>
      <div class="authoring-preview-code">
        <div>
          <span class="authoring-kicker">HTML Snapshot</span>
          <pre>${escapeHtml(htmlCode)}</pre>
        </div>
        <div>
          <span class="authoring-kicker">CSS Snapshot</span>
          <pre>${escapeHtml(cssCode)}</pre>
        </div>
      </div>
      <div class="authoring-script-preview">
        <span class="authoring-kicker">Generated lesson.script.md</span>
        <textarea id="authoringScriptPreview" readonly>${escapeHtml(state.scriptMarkdown || '')}</textarea>
      </div>
    </section>
  `;
}

function moveItem(list, fromIndex, toIndex) {
  const nextList = [...list];
  const [item] = nextList.splice(fromIndex, 1);
  nextList.splice(toIndex, 0, item);
  return nextList;
}

function readPreviousArtifactCodeText(state, stepIndex, artifactId) {
  if (!state.compiledLesson) {
    return '';
  }

  const previousStepIndex = Math.max(0, stepIndex - 1);
  return readArtifactCodeText(state.compiledLesson, previousStepIndex, artifactId);
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

function markDirty(state, message) {
  state.dirty = true;
  state.statusMessage = message;
  state.statusMessageTone = 'warning';
}

function changeLessonAttribute(state, fieldName, value) {
  findSelectedDraft(state).contract.attributes[fieldName] = fieldName === 'order' ? Number(value) : value;
  markDirty(state, 'Lesson metadata changed.');
}

function changePreviewAttribute(state, fieldName, value) {
  findSelectedDraft(state).contract.attributes.preview ||= {};
  findSelectedDraft(state).contract.attributes.preview[fieldName] = value;
  markDirty(state, 'Preview metadata changed.');
}

function changeStepField(state, fieldName, value) {
  const selectedStep = findSelectedStep(state);

  if (fieldName === 'focusHtmlNeedles') {
    selectedStep.focusHtmlNeedles = String(value).split('\n').map(line => line.trim()).filter(Boolean);
  } else {
    selectedStep[fieldName] = value;
  }

  markDirty(state, `Step ${fieldName} changed.`);
}

function changeSceneField(state, fieldName, value) {
  const selectedScene = findSelectedScene(state);
  selectedScene[fieldName] = value;
  markDirty(state, `Scene ${fieldName} changed.`);
}

function changeScenePreview(state, fieldName, value) {
  const selectedScene = findSelectedScene(state);
  selectedScene.preview ||= { action: 'apply-state', target: findSelectedDraft(state).contract.attributes.preview?.type || 'dom' };
  selectedScene.preview[fieldName] = value;
  markDirty(state, 'Scene preview changed.');
}

function changeSceneTheory(state, fieldName, value) {
  const selectedScene = findSelectedScene(state);

  if (!value.trim()) {
    delete selectedScene.theory;
  } else {
    selectedScene.theory ||= {};
    selectedScene.theory[fieldName] = value.trim();
  }

  markDirty(state, 'Scene theory changed.');
}

function changeShowCodeField(state, fieldName, value) {
  const selectedShowCodeBlock = findSelectedShowCodeBlock(state);

  if (fieldName === 'artifactId') {
    const matchingArtifact = findSelectedDraft(state).contract.attributes.artifacts.find(artifact => artifact.artifactId === value);
    selectedShowCodeBlock.artifactId = value;
    selectedShowCodeBlock.fenceLanguage = matchingArtifact?.language || selectedShowCodeBlock.fenceLanguage || '';
  } else {
    selectedShowCodeBlock[fieldName] = value;
  }

  markDirty(state, 'Show code block changed.');
}

function changeArtifactId(state, artifactIndex, nextArtifactId) {
  const attributes = findSelectedDraft(state).contract.attributes;
  const previousArtifactId = attributes.artifacts[artifactIndex].artifactId;

  attributes.artifacts[artifactIndex].artifactId = nextArtifactId;

  findSelectedDraft(state).contract.steps.forEach(step => {
    step.scenes.forEach(scene => {
      scene.showCodeBlocks.forEach(showCodeBlock => {
        if (showCodeBlock.artifactId === previousArtifactId) {
          showCodeBlock.artifactId = nextArtifactId;
        }
      });
    });
  });

  markDirty(state, 'Artifact id changed.');
}

function changeArtifactLanguage(state, artifactIndex, nextLanguage) {
  const artifact = findSelectedDraft(state).contract.attributes.artifacts[artifactIndex];
  artifact.language = nextLanguage;

  findSelectedDraft(state).contract.steps.forEach(step => {
    step.scenes.forEach(scene => {
      scene.showCodeBlocks.forEach(showCodeBlock => {
        if (showCodeBlock.artifactId === artifact.artifactId) {
          showCodeBlock.fenceLanguage = nextLanguage;
        }
      });
    });
  });

  markDirty(state, 'Artifact language changed.');
}

function choosePrimaryArtifact(state, artifactIndex) {
  findSelectedDraft(state).contract.attributes.artifacts.forEach((artifact, index) => {
    artifact.isPrimary = index === artifactIndex;
  });
  markDirty(state, 'Primary artifact changed.');
}

function addArtifact(state) {
  const attributes = findSelectedDraft(state).contract.attributes;
  const existingArtifactIds = new Set(attributes.artifacts.map(artifact => artifact.artifactId));
  const artifactId = suggestUniqueId('artifact', existingArtifactIds);

  attributes.artifacts.push({
    artifactId,
    language: 'txt',
    label: `${artifactId}.txt`,
    isPrimary: false
  });
  markDirty(state, 'Artifact added.');
}

function removeArtifact(state, artifactIndex) {
  const attributes = findSelectedDraft(state).contract.attributes;

  if (attributes.artifacts.length === 1) {
    throw new Error('A lesson must keep at least one artifact.');
  }

  const [removedArtifact] = attributes.artifacts.splice(artifactIndex, 1);

  findSelectedDraft(state).contract.steps.forEach(step => {
    step.scenes.forEach(scene => {
      scene.showCodeBlocks = scene.showCodeBlocks.filter(showCodeBlock => showCodeBlock.artifactId !== removedArtifact.artifactId);

      if (!scene.showCodeBlocks.length) {
        const fallbackArtifact = attributes.artifacts[0];
        scene.showCodeBlocks.push({
          artifactId: fallbackArtifact.artifactId,
          language: fallbackArtifact.language,
          fenceLanguage: fallbackArtifact.language,
          codeText: ''
        });
      }
    });
  });

  if (!attributes.artifacts.some(artifact => artifact.isPrimary)) {
    attributes.artifacts[0].isPrimary = true;
  }

  markDirty(state, 'Artifact removed.');
}

function addStep(state) {
  const selectedDraft = findSelectedDraft(state);
  const existingStepIds = new Set(selectedDraft.contract.steps.map(step => step.stepId));
  const primaryArtifact = selectedDraft.contract.attributes.artifacts.find(artifact => artifact.isPrimary) || selectedDraft.contract.attributes.artifacts[0];
  const stepId = suggestUniqueId('new-step', existingStepIds);
  const sceneId = `${stepId}-scene`;
  const stepIndex = selectedDraft.contract.steps.length;

  selectedDraft.contract.steps.push({
    stepId,
    title: 'New Step',
    summary: 'Explain what changes in this step.',
    intent: 'State the teaching reason for this step.',
    tag: `${primaryArtifact.artifactId}:${stepId}`,
    proTip: 'Keep the step honest and focused.',
    focusHtmlNeedles: [],
    scenes: [
      {
        sceneId,
        narration: 'Add the first narration for this new step.',
        showCodeBlocks: [
          {
            artifactId: primaryArtifact.artifactId,
            language: primaryArtifact.language,
            fenceLanguage: primaryArtifact.language,
            codeText: readPreviousArtifactCodeText(state, stepIndex, primaryArtifact.artifactId)
          }
        ]
      }
    ]
  });
  state.selection = { kind: 'step', stepIndex };
  markDirty(state, 'Step added.');
}

function removeStep(state) {
  const selectedDraft = findSelectedDraft(state);

  if (selectedDraft.contract.steps.length === 1) {
    throw new Error('A lesson must keep at least one step.');
  }

  selectedDraft.contract.steps.splice(state.selection.stepIndex, 1);
  state.selection = { kind: 'lesson' };
  markDirty(state, 'Step deleted.');
}

function moveStep(state, direction) {
  const steps = findSelectedDraft(state).contract.steps;
  const nextIndex = state.selection.stepIndex + direction;

  if (nextIndex < 0 || nextIndex >= steps.length) {
    return;
  }

  findSelectedDraft(state).contract.steps = moveItem(steps, state.selection.stepIndex, nextIndex);
  state.selection = { kind: 'step', stepIndex: nextIndex };
  markDirty(state, 'Step reordered.');
}

function addScene(state) {
  const selectedStep = findSelectedStep(state);
  const selectedDraft = findSelectedDraft(state);
  const existingSceneIds = new Set(selectedStep.scenes.map(scene => scene.sceneId));
  const primaryArtifact = selectedDraft.contract.attributes.artifacts.find(artifact => artifact.isPrimary) || selectedDraft.contract.attributes.artifacts[0];
  const sceneIndex = selectedStep.scenes.length;
  const sceneId = suggestUniqueId(`${selectedStep.stepId}-scene`, existingSceneIds);

  selectedStep.scenes.push({
    sceneId,
    narration: 'Add the next narration beat here.',
    showCodeBlocks: [
      {
        artifactId: primaryArtifact.artifactId,
        language: primaryArtifact.language,
        fenceLanguage: primaryArtifact.language,
        codeText: readPreviousArtifactCodeText(state, state.selection.stepIndex, primaryArtifact.artifactId)
      }
    ]
  });
  state.selection = { kind: 'scene', stepIndex: state.selection.stepIndex, sceneIndex };
  markDirty(state, 'Scene added.');
}

function removeScene(state) {
  const selectedStep = findSelectedStep(state);

  if (selectedStep.scenes.length === 1) {
    throw new Error('A step must keep at least one scene.');
  }

  selectedStep.scenes.splice(state.selection.sceneIndex, 1);
  state.selection = { kind: 'step', stepIndex: state.selection.stepIndex };
  markDirty(state, 'Scene deleted.');
}

function moveScene(state, direction) {
  const selectedStep = findSelectedStep(state);
  const nextIndex = state.selection.sceneIndex + direction;

  if (nextIndex < 0 || nextIndex >= selectedStep.scenes.length) {
    return;
  }

  selectedStep.scenes = moveItem(selectedStep.scenes, state.selection.sceneIndex, nextIndex);
  state.selection = { kind: 'scene', stepIndex: state.selection.stepIndex, sceneIndex: nextIndex };
  markDirty(state, 'Scene reordered.');
}

function addShowCode(state) {
  const selectedScene = findSelectedScene(state);
  const selectedDraft = findSelectedDraft(state);
  const primaryArtifact = selectedDraft.contract.attributes.artifacts[0];

  selectedScene.showCodeBlocks.push({
    artifactId: primaryArtifact.artifactId,
    language: primaryArtifact.language,
    fenceLanguage: primaryArtifact.language,
    codeText: readPreviousArtifactCodeText(state, state.selection.stepIndex, primaryArtifact.artifactId)
  });
  state.selection = {
    kind: 'show-code',
    stepIndex: state.selection.stepIndex,
    sceneIndex: state.selection.sceneIndex,
    blockIndex: selectedScene.showCodeBlocks.length - 1
  };
  markDirty(state, 'Show Code block added.');
}

function removeShowCode(state) {
  const selectedScene = findSelectedScene(state);

  if (selectedScene.showCodeBlocks.length === 1) {
    throw new Error('A scene must keep at least one Show Code block.');
  }

  selectedScene.showCodeBlocks.splice(state.selection.blockIndex, 1);
  state.selection = {
    kind: 'scene',
    stepIndex: state.selection.stepIndex,
    sceneIndex: state.selection.sceneIndex
  };
  markDirty(state, 'Show Code block deleted.');
}

function moveShowCode(state, direction) {
  const selectedScene = findSelectedScene(state);
  const nextIndex = state.selection.blockIndex + direction;

  if (nextIndex < 0 || nextIndex >= selectedScene.showCodeBlocks.length) {
    return;
  }

  selectedScene.showCodeBlocks = moveItem(selectedScene.showCodeBlocks, state.selection.blockIndex, nextIndex);
  state.selection = {
    kind: 'show-code',
    stepIndex: state.selection.stepIndex,
    sceneIndex: state.selection.sceneIndex,
    blockIndex: nextIndex
  };
  markDirty(state, 'Show Code block reordered.');
}

function downloadScriptMarkdown(ownerWindow, selectedDraft, scriptMarkdown) {
  const blob = new Blob([scriptMarkdown], {
    type: 'text/markdown;charset=utf-8'
  });
  const downloadHref = ownerWindow.URL.createObjectURL(blob);
  const anchor = ownerWindow.document.createElement('a');

  anchor.href = downloadHref;
  anchor.download = `${selectedDraft.contract.attributes.lessonId}.script.md`;
  anchor.click();
  ownerWindow.URL.revokeObjectURL(downloadHref);
}

function renderWorkspace(state, parts) {
  updateCompileState(state);
  parts.sidebar.innerHTML = buildDraftListMarkup(state);
  parts.outline.innerHTML = buildOutlineMarkup(state);
  parts.editor.innerHTML = buildEditorMarkup(state);
  parts.preview.innerHTML = buildPreviewMarkup(state);
  parts.status.textContent = state.compileErrorMessage || state.statusMessage || (state.dirty ? 'Draft has unsaved changes.' : 'Draft is in sync with SQLite.');
  parts.status.dataset.tone = buildStatusTone(state);
  parts.saveDraftButton.disabled = !findSelectedDraft(state) || Boolean(state.compileErrorMessage);
  parts.publishDraftButton.disabled = !findSelectedDraft(state) || Boolean(state.compileErrorMessage);
  parts.exportDraftButton.disabled = !findSelectedDraft(state) || Boolean(state.compileErrorMessage);
  parts.duplicateDraftButton.disabled = !findSelectedDraft(state);
  parts.deleteDraftButton.disabled = !findSelectedDraft(state);

  const previewFrame = parts.preview.querySelector('#authoringPreviewFrame');

  if (previewFrame && state.compiledLesson) {
    previewFrame.srcdoc = composeLivePreviewDocument(state.compiledLesson, state.previewStepIndex);
  }
}

function createWorkspaceParts(ownerDocument) {
  ownerDocument.body.innerHTML = `
    <div class="authoring-app">
      <header class="authoring-topbar">
        <div class="authoring-brand">
          <span class="authoring-kicker">Lesson Authoring Studio</span>
          <h1>Human-first lesson DSL workspace</h1>
        </div>
        <div class="authoring-toolbar">
          <button type="button" id="authoringBackToPlayerBtn">Player</button>
          <button type="button" id="authoringCreateDraftBtn">New Draft</button>
          <button type="button" id="authoringSaveDraftBtn">Save</button>
          <button type="button" id="authoringDuplicateDraftBtn">Duplicate</button>
          <button type="button" id="authoringDeleteDraftBtn">Delete</button>
          <button type="button" id="authoringPublishDraftBtn">Publish Snapshot</button>
          <button type="button" id="authoringExportDraftBtn">Export</button>
        </div>
      </header>
      <div class="authoring-status" id="authoringStatus" data-tone="success"></div>
      <div class="authoring-layout">
        <aside class="authoring-sidebar" id="authoringSidebar"></aside>
        <aside class="authoring-outline" id="authoringOutline"></aside>
        <main class="authoring-editor" id="authoringEditor"></main>
        <aside class="authoring-preview" id="authoringPreview"></aside>
      </div>
    </div>
  `;

  return {
    sidebar: ownerDocument.getElementById('authoringSidebar'),
    outline: ownerDocument.getElementById('authoringOutline'),
    editor: ownerDocument.getElementById('authoringEditor'),
    preview: ownerDocument.getElementById('authoringPreview'),
    status: ownerDocument.getElementById('authoringStatus'),
    backToPlayerButton: ownerDocument.getElementById('authoringBackToPlayerBtn'),
    createDraftButton: ownerDocument.getElementById('authoringCreateDraftBtn'),
    saveDraftButton: ownerDocument.getElementById('authoringSaveDraftBtn'),
    duplicateDraftButton: ownerDocument.getElementById('authoringDuplicateDraftBtn'),
    deleteDraftButton: ownerDocument.getElementById('authoringDeleteDraftBtn'),
    publishDraftButton: ownerDocument.getElementById('authoringPublishDraftBtn'),
    exportDraftButton: ownerDocument.getElementById('authoringExportDraftBtn')
  };
}

export async function showAuthoringWorkspace({
  ownerDocument,
  ownerLocation,
  ownerWindow
}) {
  const shippedLessons = await readShippedLessonScripts();
  const authoringStore = await openAuthoringSqlite({
    ownerWindow,
    shippedLessons
  });
  const initialWorkspace = authoringStore.readWorkspaceSnapshot();
  const firstDraftId = initialWorkspace.drafts[0]?.draftId || '';
  const state = {
    workspaceSnapshot: authoringStore.readWorkspaceSnapshot(firstDraftId),
    selection: { kind: 'lesson' },
    previewStepIndex: 0,
    dirty: false,
    statusMessage: 'SQLite workspace loaded.',
    statusMessageTone: 'success',
    scriptMarkdown: '',
    compiledLesson: null,
    compileErrorMessage: ''
  };
  const parts = createWorkspaceParts(ownerDocument);

  function applyWorkspaceSnapshot(workspaceSnapshot, statusMessage, tone = 'success') {
    state.workspaceSnapshot = workspaceSnapshot;
    state.selection = { kind: 'lesson' };
    state.previewStepIndex = 0;
    state.dirty = false;
    state.statusMessage = statusMessage;
    state.statusMessageTone = tone;
    renderWorkspace(state, parts);
  }

  async function safelyRunWorkspaceAction(workspaceAction) {
    try {
      await workspaceAction();
      renderWorkspace(state, parts);
    } catch (error) {
      state.statusMessage = error.message;
      state.statusMessageTone = 'danger';
      renderWorkspace(state, parts);
    }
  }

  function maybeConfirmNavigation() {
    if (!state.dirty) {
      return true;
    }

    return ownerWindow.confirm('This draft has unsaved changes. Continue and lose them?');
  }

  parts.backToPlayerButton.addEventListener('click', () => {
    if (!maybeConfirmNavigation()) {
      return;
    }

    ownerWindow.location.href = buildWorkspaceUrl(ownerLocation, '');
  });

  parts.createDraftButton.addEventListener('click', async () => {
    applyWorkspaceSnapshot(await authoringStore.createLessonDraft(), 'New draft created.');
  });

  parts.saveDraftButton.addEventListener('click', async () => {
    await safelyRunWorkspaceAction(async () => {
      applyWorkspaceSnapshot(
        await authoringStore.saveLessonDraft({
          draftId: findSelectedDraft(state).draftId,
          lessonAttributes: findSelectedDraft(state).contract.attributes,
          steps: findSelectedDraft(state).contract.steps
        }),
        'Draft saved into SQLite.'
      );
    });
  });

  parts.duplicateDraftButton.addEventListener('click', async () => {
    await safelyRunWorkspaceAction(async () => {
      applyWorkspaceSnapshot(
        await authoringStore.duplicateLessonDraft(findSelectedDraft(state).draftId),
        'Draft duplicated.'
      );
    });
  });

  parts.deleteDraftButton.addEventListener('click', async () => {
    if (!findSelectedDraft(state)) {
      return;
    }

    if (!ownerWindow.confirm(`Delete draft "${findSelectedDraft(state).lessonTitle}"?`)) {
      return;
    }

    applyWorkspaceSnapshot(
      await authoringStore.deleteLessonDraft(findSelectedDraft(state).draftId),
      'Draft deleted.'
    );
  });

  parts.publishDraftButton.addEventListener('click', async () => {
    await safelyRunWorkspaceAction(async () => {
      applyWorkspaceSnapshot(
        await authoringStore.publishLessonDraft(findSelectedDraft(state).draftId),
        'Published snapshot stored in SQLite.'
      );
    });
  });

  parts.exportDraftButton.addEventListener('click', () => {
    if (!findSelectedDraft(state) || state.compileErrorMessage) {
      return;
    }

    downloadScriptMarkdown(ownerWindow, findSelectedDraft(state), state.scriptMarkdown);
    state.statusMessage = 'Draft exported as lesson.script.md.';
    state.statusMessageTone = 'success';
    renderWorkspace(state, parts);
  });

  ownerDocument.body.addEventListener('click', async event => {
    const actionButton = event.target.closest('[data-action]');

    if (!actionButton) {
      return;
    }

    const [actionName, ...actionParts] = actionButton.dataset.action.split(':');

    if (actionName === 'open-draft') {
      if (!maybeConfirmNavigation()) {
        return;
      }

      applyWorkspaceSnapshot(
        authoringStore.readWorkspaceSnapshot(actionParts[0]),
        'Draft opened.'
      );
      return;
    }

    if (actionName === 'open-shipped') {
      if (!maybeConfirmNavigation()) {
        return;
      }

      applyWorkspaceSnapshot(
        await authoringStore.openDraftForShippedLesson(actionParts[0]),
        'Paired draft opened from shipped source.'
      );
      return;
    }

    if (actionName === 'restore-version') {
      if (!findSelectedDraft(state)) {
        return;
      }

      applyWorkspaceSnapshot(
        await authoringStore.restoreLessonDraftVersion({
          draftId: findSelectedDraft(state).draftId,
          versionId: actionParts[0]
        }),
        'Published snapshot restored into the draft.'
      );
      return;
    }

    if (actionName === 'select-lesson') {
      state.selection = { kind: 'lesson' };
      renderWorkspace(state, parts);
      return;
    }

    if (actionName === 'select-step') {
      state.selection = {
        kind: 'step',
        stepIndex: Number(actionParts[0])
      };
      renderWorkspace(state, parts);
      return;
    }

    if (actionName === 'select-scene') {
      state.selection = {
        kind: 'scene',
        stepIndex: Number(actionParts[0]),
        sceneIndex: Number(actionParts[1])
      };
      renderWorkspace(state, parts);
      return;
    }

    if (actionName === 'select-show-code') {
      state.selection = {
        kind: 'show-code',
        stepIndex: Number(actionParts[0]),
        sceneIndex: Number(actionParts[1]),
        blockIndex: Number(actionParts[2])
      };
      renderWorkspace(state, parts);
      return;
    }

    await safelyRunWorkspaceAction(() => {
      if (actionName === 'add-artifact') {
        addArtifact(state);
        return;
      }

      if (actionName === 'remove-artifact') {
        removeArtifact(state, Number(actionParts[0]));
        return;
      }

      if (actionName === 'choose-primary-artifact') {
        choosePrimaryArtifact(state, Number(actionParts[0]));
        return;
      }

      if (actionName === 'add-step') {
        addStep(state);
        return;
      }

      if (actionName === 'remove-step') {
        removeStep(state);
        return;
      }

      if (actionName === 'move-step-up') {
        moveStep(state, -1);
        return;
      }

      if (actionName === 'move-step-down') {
        moveStep(state, 1);
        return;
      }

      if (actionName === 'add-scene') {
        addScene(state);
        return;
      }

      if (actionName === 'remove-scene') {
        removeScene(state);
        return;
      }

      if (actionName === 'move-scene-up') {
        moveScene(state, -1);
        return;
      }

      if (actionName === 'move-scene-down') {
        moveScene(state, 1);
        return;
      }

      if (actionName === 'add-show-code') {
        addShowCode(state);
        return;
      }

      if (actionName === 'remove-show-code') {
        removeShowCode(state);
        return;
      }

      if (actionName === 'move-show-code-up') {
        moveShowCode(state, -1);
        return;
      }

      if (actionName === 'move-show-code-down') {
        moveShowCode(state, 1);
        return;
      }
    });
  });

  ownerDocument.body.addEventListener('input', async event => {
    const actionElement = event.target.closest('[data-action]');

    if (!actionElement) {
      return;
    }

    const [actionName, ...actionParts] = actionElement.dataset.action.split(':');
    const value = actionElement.value;

    await safelyRunWorkspaceAction(() => {
      if (actionName === 'change-lesson-attribute') {
        changeLessonAttribute(state, actionParts[0], value);
        return;
      }

      if (actionName === 'change-preview-attribute') {
        changePreviewAttribute(state, actionParts[0], value);
        return;
      }

      if (actionName === 'change-step-field') {
        changeStepField(state, actionParts[0], value);
        return;
      }

      if (actionName === 'change-scene-field') {
        changeSceneField(state, actionParts[0], value);
        return;
      }

      if (actionName === 'change-scene-preview') {
        changeScenePreview(state, actionParts[0], value);
        return;
      }

      if (actionName === 'change-scene-theory') {
        changeSceneTheory(state, actionParts[0], value);
        return;
      }

      if (actionName === 'change-show-code-field') {
        changeShowCodeField(state, actionParts[0], value);
        return;
      }

      if (actionName === 'change-artifact-id') {
        changeArtifactId(state, Number(actionParts[0]), value.trim());
        return;
      }

      if (actionName === 'change-artifact-language') {
        changeArtifactLanguage(state, Number(actionParts[0]), value.trim());
        return;
      }

      if (actionName === 'change-artifact-label') {
        findSelectedDraft(state).contract.attributes.artifacts[Number(actionParts[0])].label = value;
        markDirty(state, 'Artifact label changed.');
      }
    });
  });

  ownerDocument.body.addEventListener('change', event => {
    if (event.target.id === 'authoringPreviewStepSelect') {
      state.previewStepIndex = Number(event.target.value);
      renderWorkspace(state, parts);
    }
  });

  renderWorkspace(state, parts);
}
