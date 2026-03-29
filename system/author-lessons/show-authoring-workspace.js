import { compileLessonScript } from '../lesson-engine/compile-lesson-script.js';
import { composeLivePreviewDocument } from '../animator-engine/play-lesson/04-watch-preview/show-current-preview.js';
import { openAuthoringSqlite } from './open-authoring-sqlite.js';
import { readShippedLessonScripts } from './read-shipped-lesson-scripts.js';
import { readLessonScript } from '../lesson-engine/read-lesson-script.js';
import {
  buildInsertMenuItems,
  buildInsertSnippet,
  readEditorContext
} from './lesson-script-workbench.js';

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
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

function readPrimaryArtifactId(parsedLesson) {
  return parsedLesson?.attributes?.artifacts?.find(artifact => artifact.isPrimary)?.artifactId
    || parsedLesson?.attributes?.artifacts?.[0]?.artifactId
    || '';
}

function readCompiledArtifactText(compiledLesson, stepIndex, artifactId) {
  return (compiledLesson?.statesByStep?.[stepIndex]?.artifacts?.[artifactId] || []).join('\n');
}

function buildStatusTone(state) {
  if (state.analysis?.parseErrorMessage || state.analysis?.compileErrorMessage) {
    return 'danger';
  }

  if (state.statusMessageTone) {
    return state.statusMessageTone;
  }

  return state.dirty ? 'warning' : 'success';
}

function buildCompileChipLabel(state) {
  const parseError = state.analysis?.parseErrorMessage;
  const compileError = state.analysis?.compileErrorMessage;

  if (parseError) {
    return 'Syntax issue';
  }

  if (compileError) {
    return 'Compile issue';
  }

  if (state.analysis?.compiledLesson) {
    return `Clean · ${state.analysis.compiledLesson.steps.length} steps`;
  }

  return 'No compiled preview';
}

function buildLessonStatusLabel(state) {
  const parsedLesson = state.analysis?.parsedLesson;

  if (!parsedLesson) {
    return state.workspaceSnapshot.selectedDraft ? 'draft' : 'idle';
  }

  return parsedLesson.attributes.status || 'draft';
}

function buildContextLabel(context) {
  if (!context || context.stepIndex < 0) {
    return 'Frontmatter or before the first step';
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

function readValidationMessages(state) {
  const messages = [];

  if (state.analysis?.parseErrorMessage) {
    messages.push({
      tone: 'danger',
      label: 'Syntax',
      message: state.analysis.parseErrorMessage
    });
  }

  if (state.analysis?.compileErrorMessage) {
    messages.push({
      tone: 'danger',
      label: 'Compile',
      message: state.analysis.compileErrorMessage
    });
  }

  return messages;
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
            <button type="button" class="authoring-outline-scene${sceneSelected ? ' is-active' : ''}" data-action="jump-to-line:${scene.lineNumber}">
              <span class="authoring-outline-kicker">Scene ${sceneIndex + 1}</span>
              <strong>${escapeHtml(scene.title || scene.sceneId)}</strong>
              <small>${escapeHtml(scene.sceneId)}</small>
            </button>
          `;
        }).join('');

        return `
          <div class="authoring-outline-step-group">
            <button type="button" class="authoring-outline-step${stepSelected ? ' is-active' : ''}" data-action="jump-to-line:${step.lineNumber}">
              <span class="authoring-outline-kicker">Step ${stepIndex + 1}</span>
              <strong>${escapeHtml(step.title || step.stepId)}</strong>
              <small>${escapeHtml(step.stepId)}</small>
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

function buildValidationMarkup(state) {
  const context = state.analysis?.editorContext?.context;
  const validationMessages = readValidationMessages(state);

  if (!state.workspaceSnapshot.selectedDraft) {
    return '<div class="authoring-empty">Open a draft to inspect validation.</div>';
  }

  if (validationMessages.length) {
    return `
      <div class="authoring-validation-list">
        <div class="authoring-validation-summary is-danger">
          <strong>${validationMessages.length} issue${validationMessages.length === 1 ? '' : 's'}</strong>
          <p>${escapeHtml(buildContextLabel(context))}</p>
        </div>
        ${validationMessages.map(item => `
          <div class="authoring-validation-item" data-tone="${item.tone}">
            <span>${escapeHtml(item.label)}</span>
            <p>${escapeHtml(item.message)}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  return `
    <div class="authoring-validation-list">
      <div class="authoring-validation-summary is-success">
        <strong>Script is clean</strong>
        <p>${escapeHtml(buildContextLabel(context))}</p>
      </div>
      <div class="authoring-validation-item" data-tone="success">
        <span>Compile</span>
        <p>The lesson script parses and compiles successfully.</p>
      </div>
    </div>
  `;
}

function buildPreviewStepOptions(state) {
  const compiledLesson = state.analysis?.compiledLesson;

  if (!compiledLesson) {
    return '';
  }

  return compiledLesson.steps.map((step, stepIndex) => `
    <option value="${stepIndex}" ${stepIndex === state.previewStepIndex ? 'selected' : ''}>
      ${stepIndex + 1}. ${escapeHtml(step.title)}
    </option>
  `).join('');
}

function buildPreviewMarkup(state) {
  const compiledLesson = state.analysis?.compiledLesson;
  const parsedLesson = state.analysis?.parsedLesson;

  if (!compiledLesson) {
    return '<div class="authoring-empty">Preview appears here once the script compiles.</div>';
  }

  const stepIndex = Math.min(
    Math.max(0, state.previewStepIndex),
    Math.max(0, compiledLesson.steps.length - 1)
  );
  const selectedArtifactId = state.currentArtifactId || readPrimaryArtifactId(parsedLesson);
  const availableArtifactIds = Object.keys(compiledLesson.statesByStep?.[stepIndex]?.artifacts || {});
  const snapshotArtifactId = availableArtifactIds.includes(selectedArtifactId)
    ? selectedArtifactId
    : availableArtifactIds[0] || selectedArtifactId;
  const artifactButtons = (parsedLesson?.attributes?.artifacts || []).map(artifact => `
    <button
      type="button"
      class="authoring-artifact-chip${artifact.artifactId === selectedArtifactId ? ' is-active' : ''}"
      data-action="select-artifact:${artifact.artifactId}"
    >
      ${escapeHtml(artifact.artifactId)}
    </button>
  `).join('');

  return `
    <div class="authoring-preview-headline">
      <label class="authoring-preview-step">
        <span>Preview step</span>
        <select id="authoringPreviewStepSelect">
          ${buildPreviewStepOptions(state)}
        </select>
      </label>
      <div class="authoring-artifact-chip-list">
        ${artifactButtons}
      </div>
    </div>
    <iframe class="authoring-preview-frame" id="authoringPreviewFrame" title="Lesson authoring preview" sandbox="allow-scripts"></iframe>
    <div class="authoring-snapshot-head">
      <div>
        <span class="authoring-kicker">Current artifact snapshot</span>
        <h3>${escapeHtml(snapshotArtifactId || 'No artifact selected')}</h3>
      </div>
      <span class="authoring-inline-note">Step ${stepIndex + 1} of ${compiledLesson.steps.length}</span>
    </div>
    <pre class="authoring-snapshot-code">${escapeHtml(readCompiledArtifactText(compiledLesson, stepIndex, snapshotArtifactId))}</pre>
  `;
}

function buildInsertMenuMarkup(state) {
  const context = state.analysis?.editorContext?.context || { kind: 'root', stepIndex: -1, sceneIndex: -1 };
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
  const canPublish = Boolean(selectedDraft) && !state.analysis?.parseErrorMessage && !state.analysis?.compileErrorMessage;
  const canExport = canPublish;

  return `
    <div class="authoring-popover-section">
      <span class="authoring-popover-section-label">Workspace</span>
      <div class="authoring-popover-list">
        <button type="button" class="authoring-popover-item" data-action="new-draft">New draft</button>
        <button type="button" class="authoring-popover-item" data-action="duplicate-draft" ${selectedDraft ? '' : 'disabled'}>Duplicate</button>
        <button type="button" class="authoring-popover-item" data-action="publish-draft" ${canPublish ? '' : 'disabled'}>Publish snapshot</button>
        <button type="button" class="authoring-popover-item" data-action="export-draft" ${canExport ? '' : 'disabled'}>Export markdown</button>
        <button type="button" class="authoring-popover-item" data-action="delete-draft" ${selectedDraft ? '' : 'disabled'}>Delete draft</button>
        <button type="button" class="authoring-popover-item" data-action="open-metadata" ${selectedDraft ? '' : 'disabled'}>Metadata</button>
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

function buildMetadataDrawerMarkup(state) {
  const parsedLesson = state.analysis?.parsedLesson;
  const selectedDraft = state.workspaceSnapshot.selectedDraft;

  if (!selectedDraft) {
    return '<div class="authoring-empty">Open a draft to inspect metadata.</div>';
  }

  if (!parsedLesson) {
    return `
      <div class="authoring-drawer-head">
        <div>
          <span class="authoring-kicker">Metadata</span>
          <h2>Draft frontmatter</h2>
        </div>
        <button type="button" class="authoring-inline-action" data-action="close-metadata">Close</button>
      </div>
      <div class="authoring-empty">
        The current script does not parse cleanly yet. Fix the script, then reopen this drawer.
      </div>
      <button type="button" class="authoring-inline-action" data-action="jump-to-line:1">Jump to top</button>
    `;
  }

  const attributes = parsedLesson.attributes;
  const artifactList = (attributes.artifacts || []).map(artifact => `
    <li>
      <strong>${escapeHtml(artifact.artifactId)}</strong>
      <span>${escapeHtml(artifact.language)} · ${escapeHtml(artifact.label || '')}</span>
    </li>
  `).join('');

  return `
    <div class="authoring-drawer-head">
      <div>
        <span class="authoring-kicker">Metadata</span>
        <h2>Frontmatter snapshot</h2>
      </div>
      <button type="button" class="authoring-inline-action" data-action="close-metadata">Close</button>
    </div>
    <dl class="authoring-metadata-grid">
      <div><dt>lessonId</dt><dd>${escapeHtml(attributes.lessonId)}</dd></div>
      <div><dt>lessonTitle</dt><dd>${escapeHtml(attributes.lessonTitle)}</dd></div>
      <div><dt>lessonIntro</dt><dd>${escapeHtml(attributes.lessonIntro)}</dd></div>
      <div><dt>status</dt><dd>${escapeHtml(attributes.status)}</dd></div>
      <div><dt>courseId</dt><dd>${escapeHtml(attributes.courseId)}</dd></div>
      <div><dt>order</dt><dd>${escapeHtml(String(attributes.order))}</dd></div>
      <div><dt>preview</dt><dd>${escapeHtml(attributes.preview ? `${attributes.preview.type} · ${attributes.preview.title}` : 'none')}</dd></div>
    </dl>
    <div class="authoring-metadata-list">
      <span class="authoring-kicker">Artifacts</span>
      <ul>${artifactList}</ul>
    </div>
    <div class="authoring-inline-actions">
      <button type="button" class="authoring-inline-action" data-action="jump-to-line:1">Jump to frontmatter</button>
    </div>
    <p class="authoring-drawer-note">
      The writer flow keeps the lesson script as the source of truth. Use the editor for body changes and this drawer for a quick metadata readout.
    </p>
  `;
}

function buildWorkspaceStatusText(state) {
  return buildStatusMessage(state);
}

function createWorkspaceParts(ownerDocument) {
  ownerDocument.body.innerHTML = `
    <div class="authoring-app">
      <header class="authoring-topbar">
        <div class="authoring-brand">
          <span class="authoring-kicker">Lesson writer</span>
          <h1 id="authoringLessonTitle">Step By Step Animator</h1>
          <p id="authoringLessonMeta">Write the lesson script from top to bottom.</p>
        </div>
        <div class="authoring-topbar-actions">
          <span class="authoring-chip" id="authoringLessonStatus" data-tone="neutral">draft</span>
          <span class="authoring-chip" id="authoringCompileChip" data-tone="neutral">No compiled preview</span>
          <button type="button" id="authoringPreviewBtn">Preview</button>
          <button type="button" id="authoringSaveDraftBtn">Save</button>
          <div class="authoring-popover-shell">
            <button type="button" id="authoringMoreBtn">More</button>
            <div class="authoring-popover" id="authoringMoreMenu" hidden></div>
          </div>
        </div>
      </header>

      <div class="authoring-status" id="authoringStatus" data-tone="success"></div>

      <main class="authoring-layout">
        <aside class="authoring-pane authoring-outline-pane">
          <div class="authoring-pane-head">
            <div>
              <span class="authoring-kicker">Outline</span>
              <h2>Steps and scenes</h2>
            </div>
            <span class="authoring-inline-note">Click to jump</span>
          </div>
          <div id="authoringOutline"></div>
        </aside>

        <section class="authoring-pane authoring-editor-pane">
          <div class="authoring-pane-head">
            <div>
              <span class="authoring-kicker">Script</span>
              <h2>One markdown file</h2>
            </div>
            <div class="authoring-editor-actions">
              <div class="authoring-popover-shell">
                <button type="button" id="authoringInsertBtn">+ Insert</button>
                <div class="authoring-popover" id="authoringInsertMenu" hidden></div>
              </div>
            </div>
          </div>
          <p class="authoring-helper" id="authoringCursorInfo">Use / or Cmd/Ctrl+K to insert a block at the cursor.</p>
          <textarea id="authoringScriptEditor" spellcheck="false" placeholder="Create or open a draft to start writing."></textarea>
          <div class="authoring-editor-footer">
            <span id="authoringDirtyBadge">Synced</span>
            <span id="authoringLineBadge">Line 1</span>
          </div>
        </section>

        <aside class="authoring-pane authoring-inspector-pane">
          <section class="authoring-card">
            <div class="authoring-pane-head">
              <div>
                <span class="authoring-kicker">Validation</span>
                <h2>Compile status</h2>
              </div>
            </div>
            <div id="authoringValidation"></div>
          </section>

          <section class="authoring-card">
            <div class="authoring-pane-head">
              <div>
                <span class="authoring-kicker">Preview</span>
                <h2>Live step preview</h2>
              </div>
            </div>
            <div id="authoringPreview"></div>
          </section>
        </aside>
      </main>

      <aside class="authoring-drawer" id="authoringMetadataDrawer" hidden></aside>
    </div>
  `;

  return {
    lessonTitle: ownerDocument.getElementById('authoringLessonTitle'),
    lessonMeta: ownerDocument.getElementById('authoringLessonMeta'),
    lessonStatus: ownerDocument.getElementById('authoringLessonStatus'),
    compileChip: ownerDocument.getElementById('authoringCompileChip'),
    previewButton: ownerDocument.getElementById('authoringPreviewBtn'),
    saveDraftButton: ownerDocument.getElementById('authoringSaveDraftBtn'),
    moreButton: ownerDocument.getElementById('authoringMoreBtn'),
    moreMenu: ownerDocument.getElementById('authoringMoreMenu'),
    status: ownerDocument.getElementById('authoringStatus'),
    outline: ownerDocument.getElementById('authoringOutline'),
    editorPane: ownerDocument.getElementById('authoringScriptEditor').closest('.authoring-editor-pane'),
    editorTextarea: ownerDocument.getElementById('authoringScriptEditor'),
    cursorInfo: ownerDocument.getElementById('authoringCursorInfo'),
    dirtyBadge: ownerDocument.getElementById('authoringDirtyBadge'),
    lineBadge: ownerDocument.getElementById('authoringLineBadge'),
    insertButton: ownerDocument.getElementById('authoringInsertBtn'),
    insertMenu: ownerDocument.getElementById('authoringInsertMenu'),
    validation: ownerDocument.getElementById('authoringValidation'),
    preview: ownerDocument.getElementById('authoringPreview'),
    metadataDrawer: ownerDocument.getElementById('authoringMetadataDrawer')
  };
}

function renderWorkspace(state, parts) {
  const selectedDraft = state.workspaceSnapshot.selectedDraft;
  const parsedLesson = state.analysis?.parsedLesson;
  const compiledLesson = state.analysis?.compiledLesson;
  const statusText = buildWorkspaceStatusText(state);
  const context = state.analysis?.editorContext?.context || { stepIndex: -1, sceneIndex: -1, kind: 'root', lineNumber: 1 };
  const currentArtifactId = state.currentArtifactId || readPrimaryArtifactId(parsedLesson);

  parts.lessonTitle.textContent = selectedDraft?.lessonTitle || 'No draft selected';
  parts.lessonMeta.textContent = selectedDraft
    ? `${selectedDraft.lessonId} · ${selectedDraft.sourceOrigin} · ${parsedLesson?.attributes?.courseId || 'no course'}`
    : 'Open or create a draft to start writing.';
  parts.lessonStatus.textContent = buildLessonStatusLabel(state);
  parts.lessonStatus.dataset.tone = selectedDraft ? 'neutral' : 'muted';
  parts.compileChip.textContent = buildCompileChipLabel(state);
  parts.compileChip.dataset.tone = buildStatusTone(state);
  parts.status.textContent = statusText;
  parts.status.dataset.tone = buildStatusTone(state);
  parts.outline.innerHTML = buildOutlineMarkup(state);
  parts.validation.innerHTML = buildValidationMarkup(state);
  parts.preview.innerHTML = buildPreviewMarkup(state);
  parts.moreMenu.innerHTML = buildMoreMenuMarkup(state);
  parts.moreMenu.hidden = !state.moreMenuOpen;
  parts.insertMenu.innerHTML = buildInsertMenuMarkup(state);
  parts.insertMenu.hidden = !state.insertMenuOpen;
  parts.metadataDrawer.innerHTML = buildMetadataDrawerMarkup(state);
  parts.metadataDrawer.hidden = !state.metadataDrawerOpen;
  parts.cursorInfo.textContent = buildContextLabel(context);
  parts.lineBadge.textContent = `Line ${context.lineNumber || 1}`;
  parts.dirtyBadge.textContent = state.dirty ? 'Unsaved changes' : 'Synced';
  parts.dirtyBadge.dataset.tone = state.dirty ? 'warning' : 'success';
  parts.editorTextarea.value = state.editorSourceMarkdown;
  parts.editorTextarea.disabled = !selectedDraft;
  parts.editorTextarea.readOnly = !selectedDraft;
  parts.editorTextarea.placeholder = selectedDraft
    ? 'Write the lesson script here.'
    : 'Create or open a draft to start writing.';
  parts.saveDraftButton.disabled = !selectedDraft || !state.dirty;
  parts.previewButton.disabled = !selectedDraft;
  parts.editorPane.dataset.context = context.kind;
  parts.preview.dataset.artifact = currentArtifactId || '';
  parts.lessonTitle.ownerDocument.title = selectedDraft
    ? `${selectedDraft.lessonTitle} · Step By Step Animator`
    : 'Step By Step Animator';

  if (compiledLesson) {
    const stepIndex = Math.min(
      Math.max(0, state.previewStepIndex),
      Math.max(0, compiledLesson.steps.length - 1)
    );
    const previewFrame = parts.preview.querySelector('#authoringPreviewFrame');
    const previewStepSelect = parts.preview.querySelector('#authoringPreviewStepSelect');

    if (previewFrame) {
      previewFrame.srcdoc = composeLivePreviewDocument(compiledLesson, stepIndex);
    }

    if (previewStepSelect) {
      previewStepSelect.value = String(stepIndex);
    }
  }
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

  state.analysis = {
    parsedLesson,
    parseErrorMessage,
    compiledLesson,
    compileErrorMessage,
    editorContext
  };
  state.previewStepIndex = editorContext.context.stepIndex >= 0
    ? editorContext.context.stepIndex
    : 0;
  state.currentArtifactId = editorContext.context.artifactId || readPrimaryArtifactId(parsedLesson);
}

function maybeConfirmNavigation(state, ownerWindow) {
  if (!state.dirty) {
    return true;
  }

  return ownerWindow.confirm('This draft has unsaved changes. Continue and lose them?');
}

function focusEditorAtLine(parts, lineStarts, lineNumber) {
  const lineIndex = Math.max(0, lineNumber - 1);
  const offset = lineStarts[lineIndex] || 0;

  parts.editorTextarea.focus();
  parts.editorTextarea.setSelectionRange(offset, offset);
}

function insertSnippetAtCursor(state, parts, actionName) {
  const selectionStart = parts.editorTextarea.selectionStart ?? 0;
  const selectionEnd = parts.editorTextarea.selectionEnd ?? selectionStart;
  const snippet = buildInsertSnippet(actionName, state.analysis.parsedLesson, state.analysis.editorContext);
  const currentValue = parts.editorTextarea.value;
  const prefix = selectionStart > 0 && currentValue[selectionStart - 1] !== '\n' ? '\n' : '';
  const suffix = selectionEnd < currentValue.length && currentValue[selectionEnd] !== '\n' ? '\n' : '';
  const nextValue = [
    currentValue.slice(0, selectionStart),
    prefix,
    snippet.text,
    suffix,
    currentValue.slice(selectionEnd)
  ].join('');
  const nextSelectionStart = selectionStart + prefix.length + snippet.selectionStart;
  const nextSelectionEnd = selectionStart + prefix.length + snippet.selectionEnd;

  state.editorSourceMarkdown = nextValue;
  state.dirty = true;
  state.statusMessage = 'Draft has unsaved changes.';
  state.statusMessageTone = 'warning';
  parts.editorTextarea.value = nextValue;
  parts.editorTextarea.focus();
  parts.editorTextarea.setSelectionRange(nextSelectionStart, nextSelectionEnd);
  refreshAnalysis(state, nextSelectionStart);
}

function closeFloatingPanels(state) {
  state.insertMenuOpen = false;
  state.moreMenuOpen = false;
  state.metadataDrawerOpen = false;
}

function openWorkspaceSnapshot(state, parts, workspaceSnapshot, statusMessage, tone = 'success') {
  state.workspaceSnapshot = workspaceSnapshot;
  state.editorSourceMarkdown = workspaceSnapshot.selectedDraft?.sourceMarkdown || '';
  state.dirty = false;
  state.statusMessage = statusMessage;
  state.statusMessageTone = tone;
  state.previewStepIndex = 0;
  state.currentArtifactId = '';
  closeFloatingPanels(state);
  parts.editorTextarea.value = state.editorSourceMarkdown;
  parts.editorTextarea.setSelectionRange(0, 0);
  refreshAnalysis(state, 0);
}

function getActiveMenuKey(actionElement) {
  const actionValue = actionElement.dataset.action || '';
  const [actionName, ...parts] = actionValue.split(':');

  return {
    actionName,
    parts
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
  const initialDraftWorkspace = firstDraftId
    ? authoringStore.readWorkspaceSnapshot(firstDraftId)
    : initialWorkspace;
  const state = {
    workspaceSnapshot: initialDraftWorkspace,
    editorSourceMarkdown: initialDraftWorkspace.selectedDraft?.sourceMarkdown || '',
    dirty: false,
    statusMessage: 'SQLite workspace loaded.',
    statusMessageTone: 'success',
    previewStepIndex: 0,
    currentArtifactId: '',
    insertMenuOpen: false,
    moreMenuOpen: false,
    metadataDrawerOpen: false,
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
    }
  };
  const parts = createWorkspaceParts(ownerDocument);

  refreshAnalysis(state, 0);

  async function safelyRunWorkspaceAction(workspaceAction, successMessage) {
    try {
      const result = await workspaceAction();

      if (result?.workspaceSnapshot) {
        openWorkspaceSnapshot(state, parts, result.workspaceSnapshot, successMessage || 'Draft updated.');
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

  parts.editorTextarea.addEventListener('input', () => {
    state.editorSourceMarkdown = parts.editorTextarea.value;
    state.dirty = true;
    state.statusMessage = 'Draft has unsaved changes.';
    state.statusMessageTone = 'warning';
    refreshAnalysis(state, parts.editorTextarea.selectionStart ?? 0);
    renderWorkspace(state, parts);
  });

  function syncCursorState() {
    refreshAnalysis(state, parts.editorTextarea.selectionStart ?? 0);
    renderWorkspace(state, parts);
  }

  parts.editorTextarea.addEventListener('keyup', syncCursorState);
  parts.editorTextarea.addEventListener('mouseup', syncCursorState);
  parts.editorTextarea.addEventListener('click', syncCursorState);
  parts.editorTextarea.addEventListener('focus', syncCursorState);

  parts.editorTextarea.addEventListener('keydown', event => {
    const isCommandK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
    const currentContext = state.analysis.editorContext.context;
    const lineText = state.analysis.editorContext.lines[currentContext.lineIndex] || '';
    const cursorColumn = (parts.editorTextarea.selectionStart ?? 0) - (state.analysis.editorContext.lineStarts[currentContext.lineIndex] || 0);
    const slashTriggerEligible = event.key === '/'
      && !event.metaKey
      && !event.ctrlKey
      && !event.altKey
      && currentContext.kind !== 'show-code'
      && lineText.slice(0, Math.max(0, cursorColumn)).trim() === '';

    if (isCommandK || slashTriggerEligible) {
      event.preventDefault();
      state.insertMenuOpen = true;
      state.moreMenuOpen = false;
      state.metadataDrawerOpen = false;
      renderWorkspace(state, parts);
      return;
    }

    if (event.key === 'Escape' && (state.insertMenuOpen || state.moreMenuOpen || state.metadataDrawerOpen)) {
      event.preventDefault();
      closeFloatingPanels(state);
      renderWorkspace(state, parts);
    }
  });

  parts.previewButton.addEventListener('click', () => {
    const previewFrame = parts.preview.querySelector('#authoringPreviewFrame');

    previewFrame?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  parts.saveDraftButton.addEventListener('click', async () => {
    if (!state.workspaceSnapshot.selectedDraft || !state.dirty) {
      return;
    }

    await safelyRunWorkspaceAction(async () => {
      const nextWorkspaceSnapshot = await authoringStore.saveLessonDraft({
        draftId: state.workspaceSnapshot.selectedDraft.draftId,
        sourceMarkdown: state.editorSourceMarkdown
      });

      return {
        workspaceSnapshot: nextWorkspaceSnapshot
      };
    }, 'Draft saved into SQLite.');
  });

  parts.insertButton.addEventListener('click', () => {
    state.insertMenuOpen = !state.insertMenuOpen;
    state.moreMenuOpen = false;
    state.metadataDrawerOpen = false;
    renderWorkspace(state, parts);
  });

  parts.moreButton.addEventListener('click', () => {
    state.moreMenuOpen = !state.moreMenuOpen;
    state.insertMenuOpen = false;
    state.metadataDrawerOpen = false;
    renderWorkspace(state, parts);
  });

  ownerDocument.body.addEventListener('click', async event => {
    const actionElement = event.target.closest('[data-action]');
    const popoverShell = event.target.closest('.authoring-popover-shell');
    const metadataDrawer = event.target.closest('.authoring-drawer');

    if (!actionElement && !popoverShell && !metadataDrawer) {
      if (state.insertMenuOpen || state.moreMenuOpen || state.metadataDrawerOpen) {
        closeFloatingPanels(state);
        renderWorkspace(state, parts);
      }

      return;
    }

    if (!actionElement) {
      return;
    }

    const { actionName, parts: actionParts } = getActiveMenuKey(actionElement);

    if (actionName === 'jump-to-line') {
      focusEditorAtLine(parts, state.analysis.editorContext.lineStarts, Number(actionParts[0]));
      refreshAnalysis(state, parts.editorTextarea.selectionStart ?? 0);
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
      if (!state.workspaceSnapshot.selectedDraft || state.analysis.parseErrorMessage || state.analysis.compileErrorMessage) {
        return;
      }

      await safelyRunWorkspaceAction(async () => {
        const nextWorkspaceSnapshot = await authoringStore.publishLessonDraft(state.workspaceSnapshot.selectedDraft.draftId);

        return {
          workspaceSnapshot: nextWorkspaceSnapshot
        };
      }, 'Published snapshot stored in SQLite.');
      return;
    }

    if (actionName === 'export-draft') {
      if (!state.workspaceSnapshot.selectedDraft || state.analysis.parseErrorMessage || state.analysis.compileErrorMessage) {
        return;
      }

      downloadScriptMarkdown(ownerWindow, state.workspaceSnapshot.selectedDraft, state.editorSourceMarkdown);
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
      state.metadataDrawerOpen = true;
      state.insertMenuOpen = false;
      state.moreMenuOpen = false;
      renderWorkspace(state, parts);
      return;
    }

    if (actionName === 'close-metadata') {
      state.metadataDrawerOpen = false;
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
      insertSnippetAtCursor(state, parts, actionElement.dataset.action);
      state.insertMenuOpen = false;
      renderWorkspace(state, parts);
    }
  });

  parts.preview.addEventListener('change', event => {
    if (event.target.id === 'authoringPreviewStepSelect') {
      state.previewStepIndex = Number(event.target.value);
      renderWorkspace(state, parts);
    }
  });

  ownerDocument.addEventListener('keydown', event => {
    if (event.key === 'Escape' && (state.insertMenuOpen || state.moreMenuOpen || state.metadataDrawerOpen)) {
      closeFloatingPanels(state);
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
