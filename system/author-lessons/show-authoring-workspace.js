import { compileLessonScript } from '../lesson-engine/compile-lesson-script.js';
import { buildLessonScriptMarkdown } from '../lesson-engine/build-lesson-script-markdown.js';
import { composeLivePreviewDocument } from '../animator-engine/play-lesson/04-watch-preview/show-current-preview.js';
import { openAuthoringSqlite } from './open-authoring-sqlite.js';
import { readShippedLessonScripts } from './read-shipped-lesson-scripts.js';
import { readLessonScript } from '../lesson-engine/read-lesson-script.js';
import {
  buildInsertMenuItems,
  buildInsertSnippet,
  readEditorContext
} from './lesson-script-workbench.js';
import { createLessonScriptEditor } from './create-lesson-script-editor.js';

let metadataProseEditorFactoryPromise = null;

const METADATA_STATUS_OPTIONS = ['draft', 'active', 'broken', 'deprecated'];
const PREVIEW_TYPE_OPTIONS = ['dom', 'terminal', 'markdown', 'diagram', 'none'];

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

async function loadMetadataProseEditorFactory() {
  if (!metadataProseEditorFactoryPromise) {
    metadataProseEditorFactoryPromise = import('./create-metadata-prose-editor.js')
      .then(module => module.createMetadataProseEditor)
      .catch(error => {
        metadataProseEditorFactoryPromise = null;
        throw error;
      });
  }

  return metadataProseEditorFactoryPromise;
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

function downloadScriptMarkdown(ownerWindow, lessonId, sourceMarkdown) {
  const blob = new Blob([sourceMarkdown], {
    type: 'text/markdown;charset=utf-8'
  });
  const downloadUrl = ownerWindow.URL.createObjectURL(blob);
  const downloadAnchor = ownerWindow.document.createElement('a');

  downloadAnchor.href = downloadUrl;
  downloadAnchor.download = `${lessonId || 'lesson'}.script.md`;
  downloadAnchor.style.display = 'none';
  ownerWindow.document.body.append(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  ownerWindow.URL.revokeObjectURL(downloadUrl);
}

function readArtifactDeclarations(parsedLesson) {
  return Array.isArray(parsedLesson?.attributes?.artifacts)
    ? parsedLesson.attributes.artifacts
    : [];
}

function readPrimaryArtifactId(parsedLesson) {
  return readArtifactDeclarations(parsedLesson).find(artifact => artifact.isPrimary)?.artifactId
    || readArtifactDeclarations(parsedLesson)[0]?.artifactId
    || '';
}

function readArtifactFileName(artifact) {
  return normalizeText(artifact?.label)
    || `${normalizeText(artifact?.artifactId) || 'artifact'}.${normalizeText(artifact?.language) || 'txt'}`;
}

function splitCodeText(codeText) {
  return codeText === '' ? [] : String(codeText || '').split('\n');
}

function cloneArtifactLineMap(linesByArtifactId) {
  return Object.fromEntries(
    Object.entries(linesByArtifactId).map(([artifactId, lines]) => [artifactId, [...lines]])
  );
}

function readDraftOriginLabel(sourceOrigin) {
  if (sourceOrigin === 'paired-shipped') {
    return 'paired draft';
  }

  if (sourceOrigin === 'duplicate') {
    return 'duplicate draft';
  }

  return 'custom draft';
}

function buildHeaderTitle(state) {
  const parsedLesson = state.analysis?.parsedLesson;
  const selectedDraft = state.workspaceSnapshot.selectedDraft;
  const lessonTitle = parsedLesson?.attributes?.lessonTitle
    || selectedDraft?.lessonTitle
    || 'No draft selected';
  const order = parsedLesson?.attributes?.order;

  if (Number.isInteger(order) && order > 0) {
    return `${String(order).padStart(2, '0')} · ${lessonTitle}`;
  }

  return lessonTitle;
}

function buildHeaderMeta(state) {
  const parsedLesson = state.analysis?.parsedLesson;
  const selectedDraft = state.workspaceSnapshot.selectedDraft;

  if (!selectedDraft) {
    return 'Open or create a draft to start writing.';
  }

  return `${parsedLesson?.attributes?.lessonId || selectedDraft.lessonId} · ${readDraftOriginLabel(selectedDraft.sourceOrigin)}`;
}

function readWriterFallbackStartLineIndex(lines) {
  if (!lines.length) {
    return 0;
  }

  let insideFrontmatter = false;
  let firstBodyLineIndex = 0;

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const trimmedLine = normalizeText(lines[lineIndex]);

    if (lineIndex === 0 && trimmedLine === '---') {
      insideFrontmatter = true;
      firstBodyLineIndex = Math.min(lines.length - 1, lineIndex + 1);
      continue;
    }

    if (insideFrontmatter) {
      firstBodyLineIndex = Math.min(lines.length - 1, lineIndex + 1);

      if (trimmedLine === '---') {
        insideFrontmatter = false;
      }

      continue;
    }

    if (/^# Step:\s*/.test(lines[lineIndex])) {
      return lineIndex;
    }

    if (trimmedLine) {
      return lineIndex;
    }
  }

  return firstBodyLineIndex;
}

function buildWriterView(sourceMarkdown, editorContext) {
  const lines = editorContext?.lines || String(sourceMarkdown || '').split('\n');
  const lineStarts = editorContext?.lineStarts || [0];
  const firstStepNode = editorContext?.steps?.[0] || null;
  const startLineIndex = firstStepNode
    ? firstStepNode.lineIndex
    : readWriterFallbackStartLineIndex(lines);
  const startOffset = lineStarts[startLineIndex] || 0;

  return {
    hiddenPrefixMarkdown: String(sourceMarkdown || '').slice(0, startOffset),
    bodyMarkdown: String(sourceMarkdown || '').slice(startOffset),
    startOffset,
    startLineIndex,
    startLineNumber: startLineIndex + 1
  };
}

function readDefaultWriterSelectionOffset(sourceMarkdown) {
  const seedContext = readEditorContext(String(sourceMarkdown || ''), 0, null);
  const writerView = buildWriterView(sourceMarkdown, seedContext);

  return writerView.startOffset;
}

function readVisibleEditorOffset(state, sourceOffset) {
  return Math.max(0, Number(sourceOffset || 0) - (state.writerView?.startOffset || 0));
}

function readSourceEditorOffset(state, visibleOffset) {
  return Math.max(0, (state.writerView?.startOffset || 0) + Number(visibleOffset || 0));
}

function readVisibleLineNumber(state, sourceLineNumber) {
  return Math.max(1, Number(sourceLineNumber || 1) - ((state.writerView?.startLineNumber || 1) - 1));
}

function buildSaveChipLabel(state) {
  return state.dirty ? 'Unsaved changes' : 'Saved';
}

function buildSaveChipTone(state) {
  return state.dirty ? 'warning' : 'success';
}

function buildCompileChipTone(state) {
  if (state.analysis?.parseErrorMessage || state.analysis?.compileErrorMessage) {
    return 'danger';
  }

  if (state.analysis?.compiledLesson) {
    return 'success';
  }

  return 'muted';
}

function buildCompileChipLabel(state) {
  if (state.analysis?.parseErrorMessage) {
    return 'Syntax issue';
  }

  if (state.analysis?.compileErrorMessage) {
    return 'Compile issue';
  }

  if (state.analysis?.compiledLesson) {
    return `Valid · ${state.analysis.compiledLesson.steps.length} steps`;
  }

  return 'No compiled preview';
}

function buildContextLabel(context) {
  if (!context || context.stepIndex < 0) {
    return 'Before the first step';
  }

  const stepLabel = `Step ${context.stepIndex + 1}`;

  if (context.sceneIndex < 0) {
    return stepLabel;
  }

  const sceneLabel = `Scene ${context.sceneIndex + 1}`;

  if (context.kind === 'show-code' && context.artifactId) {
    return `${stepLabel} · ${sceneLabel} · Show Code: ${context.artifactId}`;
  }

  return `${stepLabel} · ${sceneLabel}`;
}

function buildStatusMessageTone(state) {
  if (state.analysis?.parseErrorMessage || state.analysis?.compileErrorMessage) {
    return 'danger';
  }

  return state.statusMessageTone || 'muted';
}

function buildStatusMessage(state) {
  if (state.analysis?.parseErrorMessage) {
    return state.analysis.parseErrorMessage;
  }

  if (state.analysis?.compileErrorMessage) {
    return state.analysis.compileErrorMessage;
  }

  if (state.statusMessage) {
    return state.statusMessage;
  }

  if (state.workspaceSnapshot.selectedDraft) {
    return state.dirty ? 'Draft has unsaved changes.' : 'Draft is in sync with SQLite.';
  }

  return 'Open or create a draft to start writing.';
}

function readSceneNode(editorContext, stepId, sceneId) {
  const stepNode = editorContext?.steps?.find(step => step.stepId === stepId);

  return stepNode?.scenes?.find(scene => scene.sceneId === sceneId) || null;
}

function readStepNode(editorContext, stepId) {
  return editorContext?.steps?.find(step => step.stepId === stepId) || null;
}

function resolveValidationLocation(editorContext, message) {
  const sceneMatch = String(message).match(/Scene "([^"]+)" in step "([^"]+)"/);

  if (sceneMatch) {
    const sceneNode = readSceneNode(editorContext, sceneMatch[2], sceneMatch[1]);

    if (sceneNode) {
      return {
        lineNumber: sceneNode.lineNumber,
        contextLabel: sceneNode.title || sceneNode.sceneId
      };
    }
  }

  const stepMatch = String(message).match(/Step "([^"]+)"/);

  if (stepMatch) {
    const stepNode = readStepNode(editorContext, stepMatch[1]);

    if (stepNode) {
      return {
        lineNumber: stepNode.lineNumber,
        contextLabel: stepNode.title || stepNode.stepId
      };
    }
  }

  if (String(message).includes('lesson.script.md')) {
    return {
      lineNumber: 1,
      contextLabel: 'Frontmatter'
    };
  }

  return {
    lineNumber: editorContext?.context?.lineNumber || 1,
    contextLabel: buildContextLabel(editorContext?.context)
  };
}

function readValidationItems(state) {
  const items = [];
  const editorContext = state.analysis?.editorContext;

  if (state.analysis?.parseErrorMessage) {
    const location = resolveValidationLocation(editorContext, state.analysis.parseErrorMessage);

    items.push({
      tone: 'danger',
      label: 'Syntax',
      message: state.analysis.parseErrorMessage,
      lineNumber: location.lineNumber,
      contextLabel: location.contextLabel
    });
  }

  if (state.analysis?.compileErrorMessage) {
    const location = resolveValidationLocation(editorContext, state.analysis.compileErrorMessage);

    items.push({
      tone: 'danger',
      label: 'Compile',
      message: state.analysis.compileErrorMessage,
      lineNumber: location.lineNumber,
      contextLabel: location.contextLabel
    });
  }

  return items;
}

function readPreviewTargetContext(parsedLesson, context) {
  const steps = Array.isArray(parsedLesson?.steps) ? parsedLesson.steps : [];

  if (!steps.length) {
    return {
      stepIndex: -1,
      sceneIndex: -1
    };
  }

  if (context?.stepIndex >= 0 && steps[context.stepIndex]) {
    const scenes = steps[context.stepIndex].scenes || [];

    if (context.sceneIndex >= 0 && scenes[context.sceneIndex]) {
      return {
        stepIndex: context.stepIndex,
        sceneIndex: context.sceneIndex
      };
    }

    return {
      stepIndex: context.stepIndex,
      sceneIndex: Math.max(0, scenes.length - 1)
    };
  }

  return {
    stepIndex: 0,
    sceneIndex: 0
  };
}

function buildParsedPreviewModel(parsedLesson, context) {
  const artifactDeclarations = readArtifactDeclarations(parsedLesson);
  const steps = Array.isArray(parsedLesson?.steps) ? parsedLesson.steps : [];

  if (!artifactDeclarations.length || !steps.length) {
    return null;
  }

  const target = readPreviewTargetContext(parsedLesson, context);
  const linesByArtifactId = Object.fromEntries(
    artifactDeclarations.map(artifact => [artifact.artifactId, []])
  );

  for (let stepIndex = 0; stepIndex <= target.stepIndex; stepIndex += 1) {
    const step = steps[stepIndex];
    const scenes = Array.isArray(step.scenes) ? step.scenes : [];
    const lastSceneIndex = stepIndex === target.stepIndex
      ? Math.min(target.sceneIndex, Math.max(0, scenes.length - 1))
      : scenes.length - 1;

    for (let sceneIndex = 0; sceneIndex <= lastSceneIndex; sceneIndex += 1) {
      const scene = scenes[sceneIndex];

      scene.showCodeBlocks.forEach(showCodeBlock => {
        linesByArtifactId[showCodeBlock.artifactId] = splitCodeText(showCodeBlock.codeText);
      });
    }
  }

  const activeStep = steps[target.stepIndex];
  const activeScene = activeStep?.scenes?.[target.sceneIndex] || null;

  return {
    stepIndex: target.stepIndex,
    sceneIndex: activeScene ? target.sceneIndex : -1,
    stepId: activeStep?.stepId || '',
    stepTitle: activeStep?.title || activeStep?.stepId || '',
    sceneId: activeScene?.sceneId || '',
    artifactDeclarations,
    artifactLinesById: cloneArtifactLineMap(linesByArtifactId)
  };
}

function buildPreviewLessonRuntime(previewModel) {
  if (!previewModel) {
    return null;
  }

  const artifactFileNames = Object.fromEntries(
    previewModel.artifactDeclarations.map(artifact => [artifact.artifactId, readArtifactFileName(artifact)])
  );
  const previewLesson = {
    documentLanguage: 'sr',
    templateJsFileName: artifactFileNames['template-js'] || 'template.js',
    shadowCssFileName: artifactFileNames['shadow-css'] || 'shadow-dom-style.css'
  };

  if (Object.hasOwn(previewModel.artifactLinesById, 'html')) {
    previewLesson.buildHtmlAtStep = () => previewModel.artifactLinesById.html;
  }

  if (Object.hasOwn(previewModel.artifactLinesById, 'css')) {
    previewLesson.buildCssAtStep = () => previewModel.artifactLinesById.css;
  }

  if (Object.hasOwn(previewModel.artifactLinesById, 'js')) {
    previewLesson.buildJsAtStep = () => previewModel.artifactLinesById.js;
  }

  if (Object.hasOwn(previewModel.artifactLinesById, 'template-js')) {
    previewLesson.buildTemplateJsAtStep = () => previewModel.artifactLinesById['template-js'];
  }

  if (Object.hasOwn(previewModel.artifactLinesById, 'shadow-css')) {
    previewLesson.buildShadowCssAtStep = () => previewModel.artifactLinesById['shadow-css'];
  }

  return previewLesson;
}

function buildPreviewDocument(previewModel) {
  const previewLesson = buildPreviewLessonRuntime(previewModel);

  if (!previewLesson) {
    return '';
  }

  return composeLivePreviewDocument(previewLesson, 0);
}

function readPreviewModel(state) {
  if (state.previewModel) {
    return {
      ...state.previewModel,
      isStale: false
    };
  }

  if (state.lastHealthyPreviewModel) {
    return {
      ...state.lastHealthyPreviewModel,
      isStale: true
    };
  }

  return null;
}

function readSelectedArtifactId(state, previewModel) {
  const availableArtifactIds = previewModel?.artifactDeclarations?.map(artifact => artifact.artifactId) || [];
  const contextArtifactId = state.analysis?.editorContext?.context?.artifactId;

  if (contextArtifactId && availableArtifactIds.includes(contextArtifactId)) {
    return contextArtifactId;
  }

  if (availableArtifactIds.includes(state.currentArtifactId)) {
    return state.currentArtifactId;
  }

  return availableArtifactIds[0] || '';
}

function readPreviewArtifactText(previewModel, artifactId) {
  return (previewModel?.artifactLinesById?.[artifactId] || []).join('\n');
}

function buildPreviewContextText(previewModel) {
  if (!previewModel) {
    return 'No preview yet';
  }

  const stepLabel = `${previewModel.stepIndex + 1}. ${previewModel.stepTitle || previewModel.stepId}`;

  if (previewModel.sceneId) {
    return `${stepLabel} · ${previewModel.sceneId}`;
  }

  return stepLabel;
}

function buildPreviewNote(state, previewModel) {
  if (!state.workspaceSnapshot.selectedDraft) {
    return 'Open a draft to preview the lesson state.';
  }

  if (!previewModel) {
    return 'Preview appears here once the script defines a readable state.';
  }

  if (state.analysis?.parseErrorMessage) {
    return 'Showing the last valid preview while the current script is invalid.';
  }

  if (state.analysis?.compileErrorMessage) {
    return 'Preview is synced from script snapshots while compile validation is failing.';
  }

  return 'Preview follows the active step or scene.';
}

function buildOutlineMarkup(state) {
  const outlineSteps = state.analysis?.editorContext?.steps || [];
  const context = state.analysis?.editorContext?.context;

  if (!state.workspaceSnapshot.selectedDraft) {
    return '<div class="authoring-empty">Create or open a draft to see the outline.</div>';
  }

  if (!outlineSteps.length) {
    return '<div class="authoring-empty">No step headings were found yet.</div>';
  }

  return `
    <div class="authoring-outline-root">
      ${outlineSteps.map((step, stepIndex) => {
        const stepSelected = context?.stepIndex === stepIndex;
        const sceneMarkup = step.scenes.map((scene, sceneIndex) => {
          const sceneSelected = stepSelected && context?.sceneIndex === sceneIndex;

          return `
            <button
              type="button"
              class="authoring-outline-scene${sceneSelected ? ' is-active' : ''}"
              data-action="jump-to-source-line:${scene.lineNumber}"
            >
              <span class="authoring-outline-index">Scene ${sceneIndex + 1}</span>
              <strong>${escapeHtml(scene.title || scene.sceneId)}</strong>
            </button>
          `;
        }).join('');

        return `
          <div class="authoring-outline-step-group">
            <button
              type="button"
              class="authoring-outline-step${stepSelected ? ' is-active' : ''}"
              data-action="jump-to-source-line:${step.lineNumber}"
            >
              <span class="authoring-outline-index">${stepIndex + 1}</span>
              <strong>${escapeHtml(step.title || step.stepId)}</strong>
            </button>
            <div class="authoring-outline-scenes">
              ${sceneMarkup || '<div class="authoring-empty">No scenes yet.</div>'}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function buildCompileStatusMarkup(state) {
  const validationItems = readValidationItems(state);
  const errorCount = validationItems.length;
  const warningCount = 0;

  if (!state.workspaceSnapshot.selectedDraft) {
    return '<div class="authoring-empty">Open a draft to inspect compile state.</div>';
  }

  if (state.analysis?.parseErrorMessage) {
    return `
      <div class="authoring-compile-summary" data-tone="danger">
        <strong>Syntax issue</strong>
        <p>Fix the script structure before the lesson can compile again.</p>
        <span>${errorCount} errors · ${warningCount} warnings</span>
      </div>
    `;
  }

  if (state.analysis?.compileErrorMessage) {
    return `
      <div class="authoring-compile-summary" data-tone="danger">
        <strong>Compile issue</strong>
        <p>The script parses, but compile validation is still failing.</p>
        <span>${errorCount} errors · ${warningCount} warnings</span>
      </div>
    `;
  }

  if (!state.analysis?.compiledLesson) {
    return `
      <div class="authoring-compile-summary" data-tone="muted">
        <strong>Waiting for content</strong>
        <p>Start writing the lesson script to generate a compiled preview.</p>
        <span>0 errors · 0 warnings</span>
      </div>
    `;
  }

  return `
    <div class="authoring-compile-summary" data-tone="success">
      <strong>Valid</strong>
      <p>The lesson script compiles through the canonical lesson engine path.</p>
      <span>0 errors · 0 warnings</span>
    </div>
  `;
}

function buildValidationMarkup(state) {
  const validationItems = readValidationItems(state);
  const context = state.analysis?.editorContext?.context;

  if (!state.workspaceSnapshot.selectedDraft) {
    return '<div class="authoring-empty">Open a draft to inspect validation.</div>';
  }

  if (!validationItems.length) {
    return `
      <div class="authoring-validation-list">
        <div class="authoring-validation-summary" data-tone="success">
          <strong>No errors</strong>
          <p>${escapeHtml(buildContextLabel(context))}</p>
        </div>
      </div>
    `;
  }

  return `
    <div class="authoring-validation-list">
      <div class="authoring-validation-summary" data-tone="danger">
        <strong>${validationItems.length} issue${validationItems.length === 1 ? '' : 's'}</strong>
        <p>${escapeHtml(buildContextLabel(context))}</p>
      </div>
      ${validationItems.map(item => `
        <button
          type="button"
          class="authoring-validation-item"
          data-tone="${item.tone}"
          data-action="jump-to-source-line:${item.lineNumber}"
        >
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.contextLabel)}</strong>
          <p>${escapeHtml(item.message)}</p>
        </button>
      `).join('')}
    </div>
  `;
}

function buildSnapshotTabsMarkup(previewModel, selectedArtifactId) {
  if (!previewModel) {
    return '<div class="authoring-empty">No snapshot yet.</div>';
  }

  return previewModel.artifactDeclarations.map(artifact => `
    <button
      type="button"
      class="authoring-artifact-chip${artifact.artifactId === selectedArtifactId ? ' is-active' : ''}"
      data-action="select-artifact:${artifact.artifactId}"
    >
      ${escapeHtml(artifact.artifactId)}
    </button>
  `).join('');
}

function buildInsertMenuMarkup(state) {
  const context = state.analysis?.editorContext?.context || {
    kind: 'root',
    stepIndex: -1,
    sceneIndex: -1
  };
  const menuItems = buildInsertMenuItems(context);

  return `
    <div class="authoring-popover-head">
      <strong>Insert block</strong>
      <span>${escapeHtml(buildContextLabel(context))}</span>
    </div>
    <div class="authoring-popover-list">
      ${menuItems.map(item => `
        <button type="button" class="authoring-popover-item" data-action="${item.action}">
          <strong>${escapeHtml(item.label)}</strong>
          <small>${escapeHtml(item.hint)}</small>
        </button>
      `).join('')}
    </div>
  `;
}

function buildMoreMenuMarkup(state) {
  const selectedDraft = state.workspaceSnapshot.selectedDraft;

  return `
    <div class="authoring-popover-section">
      <span class="authoring-popover-section-label">Workspace</span>
      <div class="authoring-popover-list">
        <button type="button" class="authoring-popover-item" data-action="new-draft">New draft</button>
        <button type="button" class="authoring-popover-item" data-action="duplicate-draft" ${selectedDraft ? '' : 'disabled'}>Duplicate</button>
        <button type="button" class="authoring-popover-item" data-action="export-draft" ${selectedDraft ? '' : 'disabled'}>Export markdown</button>
        <button type="button" class="authoring-popover-item" data-action="delete-draft" ${selectedDraft ? '' : 'disabled'}>Delete draft</button>
        <button type="button" class="authoring-popover-item" data-action="back-to-player">Back to player</button>
      </div>
    </div>

    <div class="authoring-popover-section">
      <span class="authoring-popover-section-label">Drafts</span>
      <div class="authoring-popover-list">
        ${state.workspaceSnapshot.drafts.map(draft => `
          <button
            type="button"
            class="authoring-popover-item${selectedDraft?.draftId === draft.draftId ? ' is-active' : ''}"
            data-action="open-draft:${draft.draftId}"
          >
            <strong>${escapeHtml(draft.lessonTitle)}</strong>
            <small>${escapeHtml(draft.lessonId)} · ${escapeHtml(draft.sourceOrigin)}</small>
          </button>
        `).join('')}
      </div>
    </div>

    <div class="authoring-popover-section">
      <span class="authoring-popover-section-label">Snapshots</span>
      <div class="authoring-popover-list">
        ${selectedDraft?.versions?.length
          ? selectedDraft.versions.map(version => `
            <button type="button" class="authoring-popover-item" data-action="restore-version:${version.versionId}">
              <strong>${escapeHtml(version.versionKind)}</strong>
              <small>${escapeHtml(version.createdAt)}</small>
            </button>
          `).join('')
          : '<div class="authoring-empty">No published snapshots yet.</div>'
        }
      </div>
    </div>

    <div class="authoring-popover-section">
      <span class="authoring-popover-section-label">Shipped lessons</span>
      <div class="authoring-popover-list">
        ${state.workspaceSnapshot.shippedLessons.map(shippedLesson => `
          <button type="button" class="authoring-popover-item" data-action="open-shipped:${shippedLesson.lessonId}">
            <strong>${escapeHtml(shippedLesson.lessonTitle)}</strong>
            <small>${escapeHtml(shippedLesson.lessonId)}</small>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function readMetadataFormFromParsedLesson(parsedLesson) {
  if (!parsedLesson) {
    return null;
  }

  const attributes = parsedLesson.attributes || {};
  const preview = attributes.preview || {};
  const goal = attributes.goal || {};

  return {
    lessonId: normalizeText(attributes.lessonId),
    lessonTitle: normalizeText(attributes.lessonTitle),
    lessonIntro: normalizeText(attributes.lessonIntro),
    status: normalizeText(attributes.status) || 'draft',
    courseId: normalizeText(attributes.courseId),
    order: String(attributes.order || 1),
    previewType: normalizeText(preview.type) || 'dom',
    previewTitle: normalizeText(preview.title),
    previewAddress: normalizeText(preview.address),
    goalTitle: normalizeText(goal.title),
    goalImageSrc: normalizeText(goal.imageSrc),
    goalImageAlt: normalizeText(goal.imageAlt),
    goalImageCaption: normalizeText(goal.imageCaption)
  };
}

function buildMetadataAttributesFromForm(parsedLesson, metadataForm) {
  const nextAttributes = {
    ...parsedLesson.attributes,
    lessonId: normalizeText(metadataForm.lessonId),
    lessonTitle: normalizeText(metadataForm.lessonTitle),
    lessonIntro: normalizeText(metadataForm.lessonIntro),
    status: normalizeText(metadataForm.status) || 'draft',
    courseId: normalizeText(metadataForm.courseId),
    order: Math.max(1, Number.parseInt(metadataForm.order, 10) || 1),
    preview: {
      ...(parsedLesson.attributes.preview || {}),
      type: normalizeText(metadataForm.previewType) || 'dom',
      title: normalizeText(metadataForm.previewTitle),
      address: normalizeText(metadataForm.previewAddress)
    }
  };
  const goal = {
    title: normalizeText(metadataForm.goalTitle),
    imageSrc: normalizeText(metadataForm.goalImageSrc),
    imageAlt: normalizeText(metadataForm.goalImageAlt),
    imageCaption: normalizeText(metadataForm.goalImageCaption)
  };
  const hasGoalValues = Object.values(goal).some(Boolean);

  if (hasGoalValues) {
    nextAttributes.goal = goal;
  } else {
    delete nextAttributes.goal;
  }

  return nextAttributes;
}

function buildOptionMarkup(options, selectedValue) {
  return options.map(option => `
    <option value="${option}" ${option === selectedValue ? 'selected' : ''}>${escapeHtml(option)}</option>
  `).join('');
}

function buildMetadataDrawerMarkup(state) {
  const selectedDraft = state.workspaceSnapshot.selectedDraft;
  const parsedLesson = state.analysis?.parsedLesson;
  const metadataForm = state.metadataForm;

  if (!selectedDraft) {
    return '<div class="authoring-empty">Open a draft to inspect metadata.</div>';
  }

  if (!parsedLesson || !metadataForm) {
    return `
      <div class="authoring-drawer-head">
        <div>
          <span class="authoring-pane-label">Metadata</span>
          <h2>Frontmatter editor</h2>
        </div>
        <button type="button" class="authoring-inline-action" data-action="close-metadata">Close</button>
      </div>
      <div class="authoring-empty">
        Fix the lesson script first, then reopen this drawer to edit frontmatter safely.
      </div>
    `;
  }

  return `
    <div class="authoring-drawer-head">
      <div>
        <span class="authoring-pane-label">Metadata</span>
        <h2>Frontmatter editor</h2>
      </div>
      <button type="button" class="authoring-inline-action" data-action="close-metadata">Close</button>
    </div>

    <div class="authoring-drawer-grid">
      <label class="authoring-drawer-field">
        <span>lessonId</span>
        <input type="text" value="${escapeHtml(metadataForm.lessonId)}" data-metadata-field="lessonId" />
      </label>
      <label class="authoring-drawer-field">
        <span>lessonTitle</span>
        <input type="text" value="${escapeHtml(metadataForm.lessonTitle)}" data-metadata-field="lessonTitle" />
      </label>
      <div class="authoring-drawer-field authoring-drawer-field-wide">
        <span>lessonIntro</span>
        <div class="authoring-prose-shell">
          <div class="authoring-prose-editor" data-metadata-prose="lessonIntro"></div>
        </div>
        <small class="authoring-drawer-field-note">BlockNote prose editor. Apply serializes this field back into frontmatter markdown.</small>
      </div>
      <label class="authoring-drawer-field">
        <span>status</span>
        <select data-metadata-field="status">
          ${buildOptionMarkup(METADATA_STATUS_OPTIONS, metadataForm.status)}
        </select>
      </label>
      <label class="authoring-drawer-field">
        <span>courseId</span>
        <input type="text" value="${escapeHtml(metadataForm.courseId)}" data-metadata-field="courseId" />
      </label>
      <label class="authoring-drawer-field">
        <span>order</span>
        <input type="number" min="1" value="${escapeHtml(metadataForm.order)}" data-metadata-field="order" />
      </label>
      <label class="authoring-drawer-field">
        <span>preview.type</span>
        <select data-metadata-field="previewType">
          ${buildOptionMarkup(PREVIEW_TYPE_OPTIONS, metadataForm.previewType)}
        </select>
      </label>
      <label class="authoring-drawer-field">
        <span>preview.title</span>
        <input type="text" value="${escapeHtml(metadataForm.previewTitle)}" data-metadata-field="previewTitle" />
      </label>
      <label class="authoring-drawer-field authoring-drawer-field-wide">
        <span>preview.address</span>
        <input type="text" value="${escapeHtml(metadataForm.previewAddress)}" data-metadata-field="previewAddress" />
      </label>
      <label class="authoring-drawer-field">
        <span>goal.title</span>
        <input type="text" value="${escapeHtml(metadataForm.goalTitle)}" data-metadata-field="goalTitle" />
      </label>
      <label class="authoring-drawer-field">
        <span>goal.imageSrc</span>
        <input type="text" value="${escapeHtml(metadataForm.goalImageSrc)}" data-metadata-field="goalImageSrc" />
      </label>
      <label class="authoring-drawer-field">
        <span>goal.imageAlt</span>
        <input type="text" value="${escapeHtml(metadataForm.goalImageAlt)}" data-metadata-field="goalImageAlt" />
      </label>
      <div class="authoring-drawer-field authoring-drawer-field-wide">
        <span>goal.imageCaption</span>
        <div class="authoring-prose-shell">
          <div class="authoring-prose-editor" data-metadata-prose="goalImageCaption"></div>
        </div>
        <small class="authoring-drawer-field-note">BlockNote prose editor. Apply serializes this field back into frontmatter markdown.</small>
      </div>
    </div>

    <div class="authoring-drawer-actions">
      <button type="button" class="authoring-inline-action" data-action="apply-metadata">Apply metadata</button>
      <button type="button" class="authoring-inline-action" data-action="reset-metadata">Reset</button>
    </div>

    <p class="authoring-drawer-note">
      Apply updates the frontmatter inside <code>lesson.script.md</code>. Save persists the draft into SQLite.
    </p>
  `;
}

function createWorkspaceParts(ownerDocument) {
  ownerDocument.body.innerHTML = `
    <div class="authoring-app">
      <header class="authoring-topbar">
        <div class="authoring-brand">
          <span class="authoring-kicker">Write mode</span>
          <h1 id="authoringLessonTitle">Step By Step Animator</h1>
          <p id="authoringLessonMeta">Open or create a draft to start writing.</p>
        </div>

        <div class="authoring-topbar-actions">
          <span class="authoring-chip" id="authoringSaveState" data-tone="muted">Saved</span>
          <span class="authoring-chip" id="authoringCompileChip" data-tone="muted">No compiled preview</span>
          <button type="button" id="authoringPreviewBtn">Preview</button>
          <button type="button" id="authoringSaveDraftBtn">Save</button>
          <button type="button" id="authoringPublishBtn">Publish</button>
          <button type="button" id="authoringMetadataBtn">Metadata</button>
          <div class="authoring-popover-shell">
            <button type="button" id="authoringMoreBtn">More</button>
            <div class="authoring-popover" id="authoringMoreMenu" hidden></div>
          </div>
        </div>
      </header>

      <div class="authoring-status" id="authoringStatus" data-tone="muted"></div>

      <main class="authoring-shell">
        <section class="authoring-frame">
          <aside class="authoring-outline-pane">
            <div class="authoring-pane-head">
              <div>
                <span class="authoring-pane-label">Outline</span>
                <h2>Steps and scenes</h2>
              </div>
              <span class="authoring-pane-note">Jump by structure</span>
            </div>
            <div id="authoringOutline"></div>
            <div class="authoring-outline-actions">
              <button type="button" id="authoringAddStepBtn">+ Step</button>
              <button type="button" id="authoringAddSceneBtn">+ Scene</button>
            </div>
          </aside>

          <section class="authoring-editor-pane">
            <div class="authoring-pane-head">
              <div>
                <span class="authoring-pane-label">Lesson script</span>
                <h2>One continuous script</h2>
              </div>
              <span class="authoring-pane-note" id="authoringCursorInfo">Open a draft to start writing.</span>
            </div>

            <div class="authoring-editor-meta">
              <span>Metadata stays hidden in Write Mode.</span>
              <button type="button" class="authoring-inline-action" data-action="open-metadata">Metadata</button>
            </div>

            <div class="authoring-editor-surface">
              <div id="authoringScriptEditor" aria-label="Lesson script editor"></div>
            </div>

            <div class="authoring-editor-footer">
              <span id="authoringDirtyBadge" data-tone="success">Saved</span>
              <span id="authoringLineBadge">Line 1</span>
            </div>

            <div class="authoring-editor-insert">
              <div class="authoring-popover-shell">
                <button type="button" id="authoringInsertBtn">+ Insert Block</button>
                <div class="authoring-popover" id="authoringInsertMenu" hidden></div>
              </div>
            </div>
          </section>

          <aside class="authoring-inspector-pane" id="authoringInspectorPane">
            <section class="authoring-inspector-card authoring-inspector-preview-card" id="authoringPreviewCard">
              <div class="authoring-inspector-head">
                <span class="authoring-pane-label">Preview</span>
                <h2>Live panel</h2>
              </div>
              <div class="authoring-preview-meta">
                <strong id="authoringPreviewContext">No preview yet</strong>
                <span id="authoringPreviewNote">Preview appears here once the script defines a readable state.</span>
              </div>
              <iframe class="authoring-preview-frame" id="authoringPreviewFrame" title="Lesson authoring preview" sandbox="allow-scripts"></iframe>
            </section>

            <section class="authoring-inspector-card">
              <div class="authoring-inspector-head">
                <span class="authoring-pane-label">Compile status</span>
                <h2>State</h2>
              </div>
              <div id="authoringCompileStatus"></div>
            </section>

            <section class="authoring-inspector-card">
              <div class="authoring-inspector-head">
                <span class="authoring-pane-label">Validation errors</span>
                <h2>Fix list</h2>
              </div>
              <div id="authoringValidation"></div>
            </section>

            <section class="authoring-inspector-card">
              <div class="authoring-inspector-head">
                <span class="authoring-pane-label">Current snapshot</span>
                <h2>Artifact state</h2>
              </div>
              <div class="authoring-snapshot-tabs" id="authoringSnapshotTabs"></div>
              <pre class="authoring-snapshot-code" id="authoringSnapshotCode"></pre>
            </section>
          </aside>
        </section>
      </main>

      <aside class="authoring-drawer" id="authoringMetadataDrawer" hidden></aside>
    </div>
  `;

  return {
    lessonTitle: ownerDocument.getElementById('authoringLessonTitle'),
    lessonMeta: ownerDocument.getElementById('authoringLessonMeta'),
    saveState: ownerDocument.getElementById('authoringSaveState'),
    compileChip: ownerDocument.getElementById('authoringCompileChip'),
    previewButton: ownerDocument.getElementById('authoringPreviewBtn'),
    saveDraftButton: ownerDocument.getElementById('authoringSaveDraftBtn'),
    publishButton: ownerDocument.getElementById('authoringPublishBtn'),
    metadataButton: ownerDocument.getElementById('authoringMetadataBtn'),
    moreButton: ownerDocument.getElementById('authoringMoreBtn'),
    moreMenu: ownerDocument.getElementById('authoringMoreMenu'),
    status: ownerDocument.getElementById('authoringStatus'),
    outline: ownerDocument.getElementById('authoringOutline'),
    addStepButton: ownerDocument.getElementById('authoringAddStepBtn'),
    addSceneButton: ownerDocument.getElementById('authoringAddSceneBtn'),
    editorPane: ownerDocument.getElementById('authoringScriptEditor').closest('.authoring-editor-pane'),
    editorHost: ownerDocument.getElementById('authoringScriptEditor'),
    cursorInfo: ownerDocument.getElementById('authoringCursorInfo'),
    dirtyBadge: ownerDocument.getElementById('authoringDirtyBadge'),
    lineBadge: ownerDocument.getElementById('authoringLineBadge'),
    insertButton: ownerDocument.getElementById('authoringInsertBtn'),
    insertMenu: ownerDocument.getElementById('authoringInsertMenu'),
    compileStatus: ownerDocument.getElementById('authoringCompileStatus'),
    validation: ownerDocument.getElementById('authoringValidation'),
    previewCard: ownerDocument.getElementById('authoringPreviewCard'),
    previewContext: ownerDocument.getElementById('authoringPreviewContext'),
    previewNote: ownerDocument.getElementById('authoringPreviewNote'),
    previewFrame: ownerDocument.getElementById('authoringPreviewFrame'),
    snapshotTabs: ownerDocument.getElementById('authoringSnapshotTabs'),
    snapshotCode: ownerDocument.getElementById('authoringSnapshotCode'),
    metadataDrawer: ownerDocument.getElementById('authoringMetadataDrawer'),
    metadataProseEditors: {}
  };
}

function renderMetadataDrawer(state, parts) {
  const renderKey = `${state.metadataDrawerOpen}:${state.metadataFormVersion}:${Boolean(state.analysis?.parsedLesson)}`;

  if (!state.metadataDrawerOpen) {
    Object.values(parts.metadataProseEditors).forEach(editor => {
      editor?.destroy();
    });
    parts.metadataProseEditors = {};
    parts.metadataDrawer.hidden = true;
    return;
  }

  if (parts.metadataDrawer.dataset.renderKey !== renderKey) {
    Object.values(parts.metadataProseEditors).forEach(editor => {
      editor?.destroy();
    });
    parts.metadataProseEditors = {};
    parts.metadataDrawer.innerHTML = buildMetadataDrawerMarkup(state);
    parts.metadataDrawer.dataset.renderKey = renderKey;
  }

  if (!state.metadataProseEditorFactory && !state.metadataProseEditorLoading) {
    state.metadataProseEditorLoading = true;
    void loadMetadataProseEditorFactory()
      .then(factory => {
        state.metadataProseEditorFactory = factory;
      })
      .catch(error => {
        state.statusMessage = `Failed to load BlockNote metadata editor: ${error.message}`;
        state.statusMessageTone = 'danger';
      })
      .finally(() => {
        state.metadataProseEditorLoading = false;
        state.onDeferredMetadataSurfaceReady?.();
      });
  }

  if (state.metadataProseEditorFactory && !Object.keys(parts.metadataProseEditors).length) {
    ['lessonIntro', 'goalImageCaption'].forEach(fieldName => {
      const hostElement = parts.metadataDrawer.querySelector(`[data-metadata-prose="${fieldName}"]`);

      if (!hostElement) {
        return;
      }

      parts.metadataProseEditors[fieldName] = state.metadataProseEditorFactory({
        hostElement,
        initialMarkdown: state.metadataForm?.[fieldName] || '',
        onChange(nextMarkdown) {
          if (state.metadataForm) {
            state.metadataForm[fieldName] = nextMarkdown;
          }
        }
      });
    });
  }

  parts.metadataDrawer.hidden = false;
}

function renderWorkspace(state, parts) {
  const selectedDraft = state.workspaceSnapshot.selectedDraft;
  const context = state.analysis?.editorContext?.context || {
    kind: 'root',
    lineNumber: 1,
    stepIndex: -1,
    sceneIndex: -1
  };
  const previewModel = readPreviewModel(state);
  const selectedArtifactId = readSelectedArtifactId(state, previewModel);
  const previewDocument = buildPreviewDocument(previewModel);

  state.currentArtifactId = selectedArtifactId;
  parts.lessonTitle.textContent = buildHeaderTitle(state);
  parts.lessonMeta.textContent = buildHeaderMeta(state);
  parts.saveState.textContent = buildSaveChipLabel(state);
  parts.saveState.dataset.tone = buildSaveChipTone(state);
  parts.compileChip.textContent = buildCompileChipLabel(state);
  parts.compileChip.dataset.tone = buildCompileChipTone(state);
  parts.status.textContent = buildStatusMessage(state);
  parts.status.dataset.tone = buildStatusMessageTone(state);
  parts.outline.innerHTML = buildOutlineMarkup(state);
  parts.compileStatus.innerHTML = buildCompileStatusMarkup(state);
  parts.validation.innerHTML = buildValidationMarkup(state);
  parts.previewContext.textContent = buildPreviewContextText(previewModel);
  parts.previewNote.textContent = buildPreviewNote(state, previewModel);
  parts.snapshotTabs.innerHTML = buildSnapshotTabsMarkup(previewModel, selectedArtifactId);
  parts.snapshotCode.textContent = previewModel
    ? readPreviewArtifactText(previewModel, selectedArtifactId)
    : 'Preview snapshot appears here once the script defines a readable state.';
  parts.moreMenu.innerHTML = buildMoreMenuMarkup(state);
  parts.moreMenu.hidden = !state.moreMenuOpen;
  parts.insertMenu.innerHTML = buildInsertMenuMarkup(state);
  parts.insertMenu.hidden = !state.insertMenuOpen;
  renderMetadataDrawer(state, parts);
  parts.cursorInfo.textContent = buildContextLabel(context);
  parts.lineBadge.textContent = `Line ${readVisibleLineNumber(state, context.lineNumber || 1)}`;
  parts.dirtyBadge.textContent = state.dirty ? 'Unsaved changes' : 'Saved';
  parts.dirtyBadge.dataset.tone = state.dirty ? 'warning' : 'success';

  if (parts.editorController.getValue() !== state.writerView.bodyMarkdown) {
    parts.editorController.setValue(state.writerView.bodyMarkdown);
  }

  parts.editorController.setEditable(Boolean(selectedDraft));
  parts.editorController.setPlaceholderText(selectedDraft
    ? 'Write the lesson flow here.'
    : 'Create or open a draft to start writing.');
  parts.saveDraftButton.disabled = !selectedDraft || !state.dirty;
  parts.publishButton.disabled = !selectedDraft || Boolean(state.analysis?.parseErrorMessage || state.analysis?.compileErrorMessage);
  parts.previewButton.disabled = !selectedDraft;
  parts.metadataButton.disabled = !selectedDraft;
  parts.insertButton.disabled = !selectedDraft;
  parts.addStepButton.disabled = !selectedDraft;
  parts.addSceneButton.disabled = !selectedDraft || context.stepIndex < 0;
  parts.editorPane.dataset.context = context.kind;
  parts.previewFrame.srcdoc = previewDocument;
  parts.lessonTitle.ownerDocument.title = selectedDraft
    ? `${buildHeaderTitle(state)} · Step By Step Animator`
    : 'Step By Step Animator';
}

function refreshAnalysis(state, cursorOffset) {
  const sourceMarkdown = state.editorSourceMarkdown;
  let parsedLesson = null;
  let parseErrorMessage = '';

  try {
    parsedLesson = readLessonScript(sourceMarkdown);
  } catch (error) {
    parseErrorMessage = error.message;
  }

  let compiledLesson = null;
  let compileErrorMessage = '';

  if (parsedLesson) {
    try {
      compiledLesson = compileLessonScript({
        scriptMarkdown: sourceMarkdown
      });
    } catch (error) {
      compileErrorMessage = error.message;
    }
  }

  const editorContext = readEditorContext(sourceMarkdown, cursorOffset, parsedLesson);
  const writerView = buildWriterView(sourceMarkdown, editorContext);

  state.analysis = {
    parsedLesson,
    parseErrorMessage,
    compiledLesson,
    compileErrorMessage,
    editorContext
  };
  state.writerView = writerView;
  state.previewModel = parsedLesson
    ? buildParsedPreviewModel(parsedLesson, editorContext.context)
    : null;

  if (state.previewModel) {
    state.lastHealthyPreviewModel = state.previewModel;
  }

  if (editorContext.context.artifactId) {
    state.currentArtifactId = editorContext.context.artifactId;
  } else {
    const fallbackArtifactId = readPrimaryArtifactId(parsedLesson);

    if (!state.currentArtifactId || !readArtifactDeclarations(parsedLesson).some(artifact => artifact.artifactId === state.currentArtifactId)) {
      state.currentArtifactId = fallbackArtifactId;
    }
  }
}

function maybeConfirmNavigation(state, ownerWindow) {
  if (!state.dirty) {
    return true;
  }

  return ownerWindow.confirm('This draft has unsaved changes. Continue and lose them?');
}

function applyVisibleEditorSelection(state, parts, selectionStart, selectionEnd = selectionStart, focusEditor = true) {
  const visibleSelectionStart = readVisibleEditorOffset(state, selectionStart);
  const visibleSelectionEnd = readVisibleEditorOffset(state, selectionEnd);

  if (focusEditor) {
    parts.editorController.focus();
  }

  parts.editorController.setSelectionRange(visibleSelectionStart, visibleSelectionEnd, true);
}

function focusEditorAtSourceLine(state, parts, lineNumber) {
  const lineIndex = Math.max(0, lineNumber - 1);
  const offset = state.analysis?.editorContext?.lineStarts?.[lineIndex] || 0;

  if (offset < (state.writerView?.startOffset || 0)) {
    openMetadataDrawer(state);
    state.statusMessage = 'Metadata stays hidden in Write Mode. Edit it from the drawer.';
    state.statusMessageTone = 'muted';
    return;
  }

  applyVisibleEditorSelection(state, parts, offset, offset, true);
}

function buildInsertedSource({
  currentValue,
  snippet,
  insertionStart,
  insertionEnd = insertionStart
}) {
  const prefix = insertionStart > 0 && currentValue[insertionStart - 1] !== '\n' ? '\n' : '';
  const suffix = insertionEnd < currentValue.length && currentValue[insertionEnd] !== '\n' ? '\n' : '';
  const nextValue = [
    currentValue.slice(0, insertionStart),
    prefix,
    snippet.text,
    suffix,
    currentValue.slice(insertionEnd)
  ].join('');

  return {
    value: nextValue,
    selectionStart: insertionStart + prefix.length + snippet.selectionStart,
    selectionEnd: insertionStart + prefix.length + snippet.selectionEnd
  };
}

function applyEditorSourceChange(state, parts, {
  nextValue,
  selectionStart,
  selectionEnd = selectionStart,
  statusMessage = 'Draft has unsaved changes.',
  statusTone = 'warning',
  focusEditor = true
}) {
  state.editorSourceMarkdown = nextValue;
  state.dirty = true;
  state.statusMessage = statusMessage;
  state.statusMessageTone = statusTone;

  refreshAnalysis(state, selectionStart);
  parts.editorController.setValue(state.writerView.bodyMarkdown);
  applyVisibleEditorSelection(state, parts, selectionStart, selectionEnd, focusEditor);
}

function insertSnippetIntoEditor(state, parts, {
  actionName,
  insertionStart,
  insertionEnd = insertionStart,
  scan = state.analysis.editorContext
}) {
  const snippet = buildInsertSnippet(actionName, state.analysis.parsedLesson, scan);
  const insertedSource = buildInsertedSource({
    currentValue: state.editorSourceMarkdown,
    snippet,
    insertionStart,
    insertionEnd
  });

  applyEditorSourceChange(state, parts, {
    nextValue: insertedSource.value,
    selectionStart: insertedSource.selectionStart,
    selectionEnd: insertedSource.selectionEnd
  });
}

function readInsertOffsetAfterStep(state, stepIndex) {
  const nextStep = state.analysis?.editorContext?.steps?.[stepIndex + 1];

  return nextStep ? nextStep.startOffset : state.editorSourceMarkdown.length;
}

function readSelectionOffsetForContext(sourceMarkdown, editorContext) {
  const context = editorContext?.context;

  if (context?.stepIndex >= 0) {
    const stepNode = editorContext.steps?.[context.stepIndex];

    if (context.sceneIndex >= 0) {
      const sceneNode = stepNode?.scenes?.[context.sceneIndex];

      if (sceneNode) {
        const sceneOffset = sourceMarkdown.indexOf(`## Scene: ${sceneNode.sceneId}`);

        if (sceneOffset >= 0) {
          return sceneOffset;
        }
      }
    }

    if (stepNode) {
      const stepOffset = sourceMarkdown.indexOf(`# Step: ${stepNode.stepId}`);

      if (stepOffset >= 0) {
        return stepOffset;
      }
    }
  }

  return readDefaultWriterSelectionOffset(sourceMarkdown);
}

function readMetadataEditorContextScan(editorContext, stepIndex) {
  return {
    ...editorContext,
    context: {
      ...(editorContext?.context || {}),
      kind: 'step',
      stepIndex,
      sceneIndex: -1,
      artifactId: '',
      sectionType: '',
      insideCodeFence: false
    }
  };
}

function closeAuthoringMenus(state) {
  state.insertMenuOpen = false;
  state.moreMenuOpen = false;
}

function closeAuthoringOverlays(state) {
  closeAuthoringMenus(state);
  state.metadataDrawerOpen = false;
}

function openWorkspaceSnapshot(state, parts, workspaceSnapshot, statusMessage, tone = 'success', selectionOffset = null) {
  state.workspaceSnapshot = workspaceSnapshot;
  state.editorSourceMarkdown = workspaceSnapshot.selectedDraft?.sourceMarkdown || '';
  state.dirty = false;
  state.statusMessage = statusMessage;
  state.statusMessageTone = tone;
  state.currentArtifactId = '';
  state.metadataForm = null;
  state.metadataFormVersion += 1;
  closeAuthoringOverlays(state);
  refreshAnalysis(
    state,
    Number.isInteger(selectionOffset)
      ? selectionOffset
      : readDefaultWriterSelectionOffset(state.editorSourceMarkdown)
  );
  parts.editorController.setValue(state.writerView.bodyMarkdown);
  applyVisibleEditorSelection(
    state,
    parts,
    Number.isInteger(selectionOffset)
      ? selectionOffset
      : state.writerView.startOffset,
    Number.isInteger(selectionOffset)
      ? selectionOffset
      : state.writerView.startOffset,
    false
  );
}

function getActiveMenuKey(actionElement) {
  const actionValue = actionElement.dataset.action || '';
  const [actionName, ...parts] = actionValue.split(':');

  return {
    actionName,
    parts
  };
}

function openMetadataDrawer(state) {
  state.metadataDrawerOpen = true;
  state.metadataForm = readMetadataFormFromParsedLesson(state.analysis?.parsedLesson);
  state.metadataFormVersion += 1;
  closeAuthoringMenus(state);
}

function applyMetadataFormToScript(state, parts) {
  if (!state.analysis?.parsedLesson || !state.metadataForm) {
    state.statusMessage = 'Fix the lesson script before editing metadata.';
    state.statusMessageTone = 'danger';
    return;
  }

  const nextSourceMarkdown = buildLessonScriptMarkdown({
    lessonAttributes: buildMetadataAttributesFromForm(state.analysis.parsedLesson, state.metadataForm),
    steps: state.analysis.parsedLesson.steps
  });
  const selectionOffset = readSelectionOffsetForContext(nextSourceMarkdown, state.analysis.editorContext);

  applyEditorSourceChange(state, parts, {
    nextValue: nextSourceMarkdown,
    selectionStart: selectionOffset,
    selectionEnd: selectionOffset,
    statusMessage: 'Metadata changes applied to the lesson script.',
    focusEditor: false
  });

  state.metadataForm = readMetadataFormFromParsedLesson(state.analysis?.parsedLesson);
  state.metadataFormVersion += 1;
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
  const initialDraftWorkspace = firstDraftId
    ? authoringStore.readWorkspaceSnapshot(firstDraftId)
    : initialWorkspace;
  const state = {
    workspaceSnapshot: initialDraftWorkspace,
    editorSourceMarkdown: initialDraftWorkspace.selectedDraft?.sourceMarkdown || '',
    writerView: {
      hiddenPrefixMarkdown: '',
      bodyMarkdown: initialDraftWorkspace.selectedDraft?.sourceMarkdown || '',
      startOffset: 0,
      startLineIndex: 0,
      startLineNumber: 1
    },
    dirty: false,
    statusMessage: 'SQLite workspace loaded.',
    statusMessageTone: 'success',
    currentArtifactId: '',
    insertMenuOpen: false,
    moreMenuOpen: false,
    metadataDrawerOpen: false,
    metadataForm: null,
    metadataFormVersion: 0,
    metadataProseEditorFactory: null,
    metadataProseEditorLoading: false,
    previewModel: null,
    lastHealthyPreviewModel: null,
    analysis: {
      parsedLesson: null,
      parseErrorMessage: '',
      compiledLesson: null,
      compileErrorMessage: '',
      editorContext: {
        context: {
          kind: 'root',
          lineIndex: 0,
          lineNumber: 1,
          stepIndex: -1,
          sceneIndex: -1,
          sectionType: '',
          artifactId: '',
          insideCodeFence: false
        },
        steps: [],
        lineStarts: []
      }
    },
    onDeferredMetadataSurfaceReady: null
  };
  const parts = createWorkspaceParts(ownerDocument);
  state.onDeferredMetadataSurfaceReady = () => {
    if (state.metadataDrawerOpen) {
      renderWorkspace(state, parts);
    }
  };

  refreshAnalysis(state, readDefaultWriterSelectionOffset(state.editorSourceMarkdown));
  parts.editorController = createLessonScriptEditor({
    hostElement: parts.editorHost,
    initialValue: state.writerView.bodyMarkdown,
    placeholderText: state.workspaceSnapshot.selectedDraft
      ? 'Write the lesson flow here.'
      : 'Create or open a draft to start writing.',
    readSlashMenuEligibility() {
      return Boolean(state.workspaceSnapshot.selectedDraft)
        && state.analysis?.editorContext?.context?.kind !== 'show-code';
    },
    onChange({ value, selectionStart }) {
      state.editorSourceMarkdown = `${state.writerView.hiddenPrefixMarkdown}${value}`;
      state.dirty = true;
      state.statusMessage = 'Draft has unsaved changes.';
      state.statusMessageTone = 'warning';
      refreshAnalysis(state, readSourceEditorOffset(state, selectionStart));
      renderWorkspace(state, parts);
    },
    onCursorChange() {
      syncCursorState();
    },
    onInsertMenuRequest() {
      if (!state.workspaceSnapshot.selectedDraft) {
        return;
      }

      state.insertMenuOpen = true;
      state.moreMenuOpen = false;
      renderWorkspace(state, parts);
    },
    onEscapeRequest() {
      if (state.insertMenuOpen || state.moreMenuOpen || state.metadataDrawerOpen) {
        closeAuthoringOverlays(state);
        renderWorkspace(state, parts);
      }
    }
  });

  async function safelyRunWorkspaceAction(workspaceAction, successMessage, readSelectionOffset = null) {
    try {
      const result = await workspaceAction();

      if (result?.workspaceSnapshot) {
        const selectionOffset = typeof readSelectionOffset === 'function'
          ? readSelectionOffset(result.workspaceSnapshot)
          : null;

        openWorkspaceSnapshot(
          state,
          parts,
          result.workspaceSnapshot,
          successMessage || 'Draft updated.',
          'success',
          selectionOffset
        );
      } else {
        state.statusMessage = successMessage || 'Action completed.';
        state.statusMessageTone = 'success';
      }

      renderWorkspace(state, parts);
    } catch (error) {
      state.statusMessage = error.message;
      state.statusMessageTone = 'danger';
      renderWorkspace(state, parts);
    }
  }

  async function saveCurrentDraft() {
    if (!state.workspaceSnapshot.selectedDraft || !state.dirty) {
      return;
    }

    const selectionOffset = readSourceEditorOffset(state, parts.editorController.getSelectionStart());

    await safelyRunWorkspaceAction(async () => {
      const nextWorkspaceSnapshot = await authoringStore.saveLessonDraft({
        draftId: state.workspaceSnapshot.selectedDraft.draftId,
        sourceMarkdown: state.editorSourceMarkdown
      });

      return {
        workspaceSnapshot: nextWorkspaceSnapshot
      };
    }, 'Draft saved into SQLite.', () => selectionOffset);
  }

  async function publishCurrentDraft() {
    if (!state.workspaceSnapshot.selectedDraft || state.analysis?.parseErrorMessage || state.analysis?.compileErrorMessage) {
      return;
    }

    const selectionOffset = readSourceEditorOffset(state, parts.editorController.getSelectionStart());

    await safelyRunWorkspaceAction(async () => {
      const nextWorkspaceSnapshot = await authoringStore.publishLessonDraft(state.workspaceSnapshot.selectedDraft.draftId);

      return {
        workspaceSnapshot: nextWorkspaceSnapshot
      };
    }, 'Published snapshot stored in SQLite.', () => selectionOffset);
  }

  function syncCursorState() {
    refreshAnalysis(state, readSourceEditorOffset(state, parts.editorController.getSelectionStart()));
    renderWorkspace(state, parts);
  }

  parts.previewButton.addEventListener('click', () => {
    refreshAnalysis(state, readSourceEditorOffset(state, parts.editorController.getSelectionStart()));
    state.statusMessage = 'Preview refreshed from the active writing context.';
    state.statusMessageTone = 'success';
    renderWorkspace(state, parts);
  });

  parts.saveDraftButton.addEventListener('click', async () => {
    await saveCurrentDraft();
  });

  parts.publishButton.addEventListener('click', async () => {
    await publishCurrentDraft();
  });

  parts.metadataButton.addEventListener('click', () => {
    openMetadataDrawer(state);
    renderWorkspace(state, parts);
  });

  parts.insertButton.addEventListener('click', () => {
    state.insertMenuOpen = !state.insertMenuOpen;
    state.moreMenuOpen = false;
    renderWorkspace(state, parts);
  });

  parts.moreButton.addEventListener('click', () => {
    state.moreMenuOpen = !state.moreMenuOpen;
    state.insertMenuOpen = false;
    renderWorkspace(state, parts);
  });

  parts.addStepButton.addEventListener('click', () => {
    if (!state.workspaceSnapshot.selectedDraft) {
      return;
    }

    const activeStepIndex = state.analysis.editorContext.context.stepIndex;
    const insertionStart = activeStepIndex >= 0
      ? readInsertOffsetAfterStep(state, activeStepIndex)
      : state.editorSourceMarkdown.length;

    insertSnippetIntoEditor(state, parts, {
      actionName: 'insert-step',
      insertionStart
    });
    renderWorkspace(state, parts);
  });

  parts.addSceneButton.addEventListener('click', () => {
    const activeStepIndex = state.analysis.editorContext.context.stepIndex;

    if (activeStepIndex < 0) {
      return;
    }

    insertSnippetIntoEditor(state, parts, {
      actionName: 'insert-scene',
      insertionStart: readInsertOffsetAfterStep(state, activeStepIndex),
      scan: readMetadataEditorContextScan(state.analysis.editorContext, activeStepIndex)
    });
    renderWorkspace(state, parts);
  });

  function syncMetadataFieldFromEvent(event) {
    const field = event.target?.dataset?.metadataField;

    if (!field || !state.metadataForm) {
      return;
    }

    state.metadataForm[field] = event.target.value;
  }

  parts.metadataDrawer.addEventListener('input', syncMetadataFieldFromEvent);
  parts.metadataDrawer.addEventListener('change', syncMetadataFieldFromEvent);

  ownerDocument.body.addEventListener('click', async event => {
    const actionElement = event.target.closest('[data-action]');
    const popoverShell = event.target.closest('.authoring-popover-shell');
    const metadataDrawer = event.target.closest('.authoring-drawer');

    if (!actionElement && !popoverShell && !metadataDrawer) {
      if (state.insertMenuOpen || state.moreMenuOpen) {
        closeAuthoringMenus(state);
        renderWorkspace(state, parts);
      }

      return;
    }

    if (!actionElement) {
      return;
    }

    const { actionName, parts: actionParts } = getActiveMenuKey(actionElement);

    if (actionName === 'jump-to-source-line') {
      focusEditorAtSourceLine(state, parts, Number(actionParts[0]));
      refreshAnalysis(state, readSourceEditorOffset(state, parts.editorController.getSelectionStart()));
      renderWorkspace(state, parts);
      return;
    }

    if (actionName === 'select-artifact') {
      state.currentArtifactId = actionParts[0];
      renderWorkspace(state, parts);
      return;
    }

    if (actionName === 'restore-version') {
      if (!state.workspaceSnapshot.selectedDraft) {
        return;
      }

      if (!maybeConfirmNavigation(state, ownerWindow)) {
        return;
      }

      await safelyRunWorkspaceAction(async () => {
        const nextWorkspaceSnapshot = await authoringStore.restoreLessonDraftVersion({
          draftId: state.workspaceSnapshot.selectedDraft.draftId,
          versionId: actionParts[0]
        });

        return {
          workspaceSnapshot: nextWorkspaceSnapshot
        };
      }, 'Published snapshot restored into the draft.');
      return;
    }

    if (actionName === 'open-draft') {
      if (!maybeConfirmNavigation(state, ownerWindow)) {
        return;
      }

      openWorkspaceSnapshot(
        state,
        parts,
        authoringStore.readWorkspaceSnapshot(actionParts[0]),
        'Draft opened.'
      );
      renderWorkspace(state, parts);
      return;
    }

    if (actionName === 'open-shipped') {
      if (!maybeConfirmNavigation(state, ownerWindow)) {
        return;
      }

      const nextWorkspaceSnapshot = await authoringStore.openDraftForShippedLesson(actionParts[0]);

      openWorkspaceSnapshot(
        state,
        parts,
        nextWorkspaceSnapshot,
        'Paired draft opened from shipped source.'
      );
      renderWorkspace(state, parts);
      return;
    }

    if (actionName === 'new-draft') {
      if (!maybeConfirmNavigation(state, ownerWindow)) {
        return;
      }

      openWorkspaceSnapshot(
        state,
        parts,
        await authoringStore.createLessonDraft(),
        'New draft created.'
      );
      renderWorkspace(state, parts);
      return;
    }

    if (actionName === 'duplicate-draft') {
      if (!state.workspaceSnapshot.selectedDraft) {
        return;
      }

      openWorkspaceSnapshot(
        state,
        parts,
        await authoringStore.duplicateLessonDraft(state.workspaceSnapshot.selectedDraft.draftId),
        'Draft duplicated.'
      );
      renderWorkspace(state, parts);
      return;
    }

    if (actionName === 'delete-draft') {
      if (!state.workspaceSnapshot.selectedDraft) {
        return;
      }

      if (!maybeConfirmNavigation(state, ownerWindow)) {
        return;
      }

      if (!ownerWindow.confirm(`Delete draft "${state.workspaceSnapshot.selectedDraft.lessonTitle}"?`)) {
        return;
      }

      openWorkspaceSnapshot(
        state,
        parts,
        await authoringStore.deleteLessonDraft(state.workspaceSnapshot.selectedDraft.draftId),
        'Draft deleted.'
      );
      renderWorkspace(state, parts);
      return;
    }

    if (actionName === 'publish-draft') {
      await publishCurrentDraft();
      return;
    }

    if (actionName === 'export-draft') {
      if (!state.workspaceSnapshot.selectedDraft) {
        return;
      }

      downloadScriptMarkdown(
        ownerWindow,
        state.analysis?.parsedLesson?.attributes?.lessonId || state.workspaceSnapshot.selectedDraft.lessonId,
        state.editorSourceMarkdown
      );
      state.statusMessage = 'Draft exported as lesson.script.md.';
      state.statusMessageTone = 'success';
      renderWorkspace(state, parts);
      return;
    }

    if (actionName === 'back-to-player') {
      if (!maybeConfirmNavigation(state, ownerWindow)) {
        return;
      }

      ownerWindow.location.href = buildWorkspaceUrl(ownerLocation, '');
      return;
    }

    if (actionName === 'open-metadata') {
      openMetadataDrawer(state);
      renderWorkspace(state, parts);
      return;
    }

    if (actionName === 'close-metadata') {
      state.metadataDrawerOpen = false;
      state.metadataFormVersion += 1;
      renderWorkspace(state, parts);
      return;
    }

    if (actionName === 'apply-metadata') {
      applyMetadataFormToScript(state, parts);
      renderWorkspace(state, parts);
      return;
    }

    if (actionName === 'reset-metadata') {
      state.metadataForm = readMetadataFormFromParsedLesson(state.analysis?.parsedLesson);
      state.metadataFormVersion += 1;
      renderWorkspace(state, parts);
      return;
    }

    if (actionName === 'insert-step'
      || actionName === 'insert-scene'
      || actionName === 'insert-step-summary'
      || actionName === 'insert-intent'
      || actionName === 'insert-narration'
      || actionName.startsWith('insert-show-code')
      || actionName === 'insert-theory-link'
      || actionName === 'insert-preview-action') {
      insertSnippetIntoEditor(state, parts, {
        actionName: actionElement.dataset.action,
        insertionStart: readSourceEditorOffset(state, parts.editorController.getSelectionStart()),
        insertionEnd: readSourceEditorOffset(
          state,
          parts.editorController.getSelectionEnd()
        )
      });
      state.insertMenuOpen = false;
      renderWorkspace(state, parts);
    }
  });

  ownerDocument.addEventListener('keydown', async event => {
    const isSaveShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's';

    if (isSaveShortcut) {
      event.preventDefault();
      await saveCurrentDraft();
      return;
    }

    if (event.key === 'Escape' && (state.insertMenuOpen || state.moreMenuOpen || state.metadataDrawerOpen)) {
      closeAuthoringOverlays(state);
      renderWorkspace(state, parts);
    }
  });

  ownerWindow.addEventListener('beforeunload', event => {
    if (!state.dirty) {
      return;
    }

    event.preventDefault();
    event.returnValue = '';
  });

  renderWorkspace(state, parts);
}
