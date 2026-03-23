import { compareCodeLines } from './compare-code-lines.js';
import { describeCssLineRole } from './describe-css-line-role.js';
import { escapeCodeText } from './escape-code-text.js';
import { scrollToAddedLine } from './scroll-to-added-line.js';

function isFocusedHtmlLine(lineText, focusHtmlNeedles) {
  if (!focusHtmlNeedles.length) {
    return false;
  }

  return focusHtmlNeedles.some(needle => lineText.includes(needle));
}

function showCodePane(container, buildLinesAtStep, currentStepNumber, paneType = 'html', focusHtmlNeedles = []) {
  if (typeof buildLinesAtStep !== 'function') {
    container.innerHTML = '';
    return false;
  }

  let lineNumber = 0;
  let revealOrder = 0;
  const currentLines = buildLinesAtStep(currentStepNumber);
  const previousLines = currentStepNumber > 0 ? buildLinesAtStep(currentStepNumber - 1) : [];
  const renderedLines = compareCodeLines(currentLines, previousLines);
  const hasAddedLines = renderedLines.some(entry => entry.isNewLine && !entry.isEmptyLine);

  container.innerHTML = renderedLines.map(entry => {
    lineNumber += 1;
    const lineMarkup = entry.isEmptyLine ? '&nbsp;' : escapeCodeText(entry.lineText);
    const lineKind = paneType === 'css' ? describeCssLineRole(entry.lineText) : 'plain';
    const shouldStaggerReveal = (paneType === 'css' || paneType === 'js') && entry.isNewLine && !entry.isEmptyLine;
    const inlineStyle = shouldStaggerReveal ? ` style="--reveal-order:${revealOrder};"` : '';
    const isFocusedTarget = paneType === 'html' && isFocusedHtmlLine(entry.lineText, focusHtmlNeedles);

    if (shouldStaggerReveal) {
      revealOrder += 1;
    }

    return `
      <div class="live-line${entry.isNewLine ? ' is-added' : ''}${entry.isEmptyLine ? ' is-empty' : ''}${isFocusedTarget ? ' is-focus-target' : ''}${paneType === 'css' ? ` is-css-${lineKind}` : ''}" data-pane="${paneType}"${entry.isNewLine ? ' data-added="true"' : ''}${inlineStyle}>
        <span class="live-line-number">${String(lineNumber).padStart(2, '0')}</span>
        <span class="live-line-code">${lineMarkup}</span>
      </div>
    `;
  }).join('');

  return hasAddedLines;
}

const TAG_TO_PANE = {
  'html': 'htmlPane',
  'css': 'cssPane',
  'js': 'jsPane',
  'shadow-css': 'shadowCssPane',
  'summary': 'htmlPane',
  'success': 'htmlPane'
};

function switchActiveIdePane(lessonParts, paneId) {
  const allPanes = [lessonParts.htmlPane, lessonParts.cssPane, lessonParts.jsPane, lessonParts.shadowCssPane];
  const ideFileItems = lessonParts.ideFileList.querySelectorAll('.ide-file-item');

  allPanes.forEach(pane => {
    if (pane) {
      pane.classList.toggle('active', pane.id === paneId);
    }
  });

  ideFileItems.forEach(item => {
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
  buildShadowCssAtStep
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
    htmlPane: showCodePane(lessonParts.htmlCodePane, buildHtmlAtStep, currentStepNumber, 'html', focusHtmlNeedles),
    cssPane: showCodePane(lessonParts.cssCodePane, buildCssAtStep, currentStepNumber, 'css'),
    jsPane: showCodePane(lessonParts.jsCodePane, buildJsAtStep, currentStepNumber, 'js'),
    shadowCssPane: showCodePane(lessonParts.shadowCssCodePane, buildShadowCssAtStep, currentStepNumber, 'css')
  };

  // Sync sidebar change dots
  const ideFileItems = lessonParts.ideFileList.querySelectorAll('.ide-file-item');
  ideFileItems.forEach(item => {
    const paneId = item.dataset.paneId;
    item.classList.toggle('has-changes', !!changes[paneId]);
  });

  lessonParts.currentStepBadge.textContent = `Prizor ${currentStepNumber + 1}`;
  scrollToAddedLine(lessonParts.htmlCodePane);
  scrollToAddedLine(lessonParts.cssCodePane);
  scrollToAddedLine(lessonParts.jsCodePane);
  scrollToAddedLine(lessonParts.shadowCssCodePane);
}
