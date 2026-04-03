import { compareCodeLines } from './compare-code-lines.js';
import { describeCssLineRole } from './describe-css-line-role.js';
import { escapeCodeText } from './escape-code-text.js';
import { scrollToAddedLine } from './scroll-to-added-line.js';

function isFocusedHtmlLine(lineText, focusHtmlNeedles) {
  if (!focusHtmlNeedles.length) {
    return false;
  }

  return focusHtmlNeedles.some((needle) => lineText.includes(needle));
}

function showCodePane(
  container,
  buildLinesAtStep,
  currentStepNumber,
  paneType = 'html',
  focusHtmlNeedles = []
) {
  if (typeof buildLinesAtStep !== 'function') {
    container.innerHTML = '';
    return false;
  }

  let lineNumber = 0;
  let revealOrder = 0;
  const currentLines = buildLinesAtStep(currentStepNumber);
  const previousLines = currentStepNumber > 0 ? buildLinesAtStep(currentStepNumber - 1) : [];
  const diff = compareCodeLines(currentLines, previousLines);
  const renderedLines = diff.entries;
  const hasChangedLines = diff.hasChanges;

  container.innerHTML = renderedLines
    .map((entry) => {
      lineNumber += 1;
      const lineMarkup = entry.isEmptyLine ? '&nbsp;' : escapeCodeText(entry.lineText);
      const lineKind = paneType === 'css' ? describeCssLineRole(entry.lineText) : 'plain';
      const isAddedLine = entry.kind === 'added';
      const isRemovedLine = entry.kind === 'removed';
      const shouldStaggerReveal =
        (paneType === 'css' || paneType === 'js') && isAddedLine && !entry.isEmptyLine;
      const inlineStyle = shouldStaggerReveal ? ` style="--reveal-order:${revealOrder};"` : '';
      const isFocusedTarget =
        paneType === 'html' &&
        !isRemovedLine &&
        isFocusedHtmlLine(entry.lineText, focusHtmlNeedles);
      const displayLineNumber = entry.currentLineNumber ?? entry.previousLineNumber ?? lineNumber;
      const diffMarker = isAddedLine ? '+' : isRemovedLine ? '-' : '·';

      if (shouldStaggerReveal) {
        revealOrder += 1;
      }

      return `
      <div class="live-line is-${entry.kind}${entry.isEmptyLine ? ' is-empty' : ''}${isFocusedTarget ? ' is-focus-target' : ''}${paneType === 'css' ? ` is-css-${lineKind}` : ''}" data-pane="${paneType}" data-change-kind="${entry.kind}"${entry.kind !== 'unchanged' ? ' data-changed="true"' : ''}${isAddedLine ? ' data-added="true"' : ''}${inlineStyle}>
        <span class="live-line-marker" aria-hidden="true">${diffMarker}</span>
        <span class="live-line-number">${String(displayLineNumber).padStart(2, '0')}</span>
        <span class="live-line-code">${lineMarkup}</span>
      </div>
    `;
    })
    .join('');

  return hasChangedLines;
}

const TAG_TO_PANE = {
  html: 'htmlPane',
  css: 'cssPane',
  js: 'jsPane',
  'js-style': 'jsPane',
  'template-js': 'templateJsPane',
  'shadow-css': 'shadowCssPane',
  teaching: 'htmlPane',
  summary: 'htmlPane',
  success: 'htmlPane',
};

function switchActiveIdePane(lessonParts, paneId) {
  const allPanes = [
    lessonParts.htmlPane,
    lessonParts.cssPane,
    lessonParts.jsPane,
    lessonParts.templateJsPane,
    lessonParts.shadowCssPane,
  ];

  const ideFileItems = lessonParts.ideFileList.querySelectorAll('.ide-file-item');

  allPanes.forEach((pane) => {
    if (pane) {
      pane.classList.toggle('active', pane.id === paneId);
    }
  });

  ideFileItems.forEach((item) => {
    item.classList.toggle('active', item.dataset.paneId === paneId);
  });
}

export function showGrowingCode({
  lessonParts,
  step,
  currentStepNumber,
  buildHtmlAtStep,
  buildCssAtStep,
  buildJsAtStep,
  buildTemplateJsAtStep,
  buildShadowCssAtStep,
}) {
  // IDE Mode: switch active pane FIRST, before rendering code
  const isIdeMode = lessonParts.liveEditorPanel.classList.contains('has-ide-mode');

  if (isIdeMode) {
    const tagType = step.tag ? step.tag.split(':')[0] : '';
    const paneToFocus = TAG_TO_PANE[tagType] || 'htmlPane';
    switchActiveIdePane(lessonParts, paneToFocus);
  }

  // Render code in all panes
  const focusHtmlNeedles = Array.isArray(step.focusHtmlNeedles) ? step.focusHtmlNeedles : [];

  const changes = {
    htmlPane: showCodePane(
      lessonParts.htmlCodePane,
      buildHtmlAtStep,
      currentStepNumber,
      'html',
      focusHtmlNeedles
    ),
    cssPane: showCodePane(lessonParts.cssCodePane, buildCssAtStep, currentStepNumber, 'css'),
    jsPane: showCodePane(lessonParts.jsCodePane, buildJsAtStep, currentStepNumber, 'js'),
    templateJsPane: showCodePane(
      lessonParts.templateJsCodePane,
      buildTemplateJsAtStep,
      currentStepNumber,
      'js'
    ),
    shadowCssPane: showCodePane(
      lessonParts.shadowCssCodePane,
      buildShadowCssAtStep,
      currentStepNumber,
      'css'
    ),
  };

  // Sync sidebar change dots
  const ideFileItems = lessonParts.ideFileList.querySelectorAll('.ide-file-item');
  ideFileItems.forEach((item) => {
    const paneId = item.dataset.paneId;
    item.classList.toggle('has-changes', !!changes[paneId]);
  });

  lessonParts.currentStepBadge.textContent = `Prizor ${currentStepNumber + 1}`;
  scrollToAddedLine(lessonParts.htmlCodePane);
  scrollToAddedLine(lessonParts.cssCodePane);
  scrollToAddedLine(lessonParts.jsCodePane);
  scrollToAddedLine(lessonParts.templateJsCodePane);
  scrollToAddedLine(lessonParts.shadowCssCodePane);
}
