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

export function showGrowingCode({
  lessonParts,
  step,
  currentStepNumber,
  buildHtmlAtStep,
  buildCssAtStep,
  buildJsAtStep,
  buildShadowCssAtStep
}) {
  const focusHtmlNeedles = Array.isArray(step.focusHtmlNeedles) ? step.focusHtmlNeedles : [];

  const changes = {
    htmlPane: showCodePane(lessonParts.htmlCodePane, buildHtmlAtStep, currentStepNumber, 'html', focusHtmlNeedles),
    cssPane: showCodePane(lessonParts.cssCodePane, buildCssAtStep, currentStepNumber, 'css'),
    jsPane: showCodePane(lessonParts.jsCodePane, buildJsAtStep, currentStepNumber, 'js'),
    shadowCssPane: showCodePane(lessonParts.shadowCssCodePane, buildShadowCssAtStep, currentStepNumber, 'css')
  };

  // Sync sidebar dots
  lessonParts.ownerDocument.querySelectorAll('.ide-file-item').forEach(item => {
    const paneId = item.dataset.paneId;
    const hasChanges = changes[paneId];
    item.classList.toggle('has-changes', hasChanges);
  });

  // Calculate smart pane focus for IDE Mode
  const activePane = lessonParts.ownerDocument.querySelector('.live-pane.active');
  const activePaneId = activePane ? activePane.id : null;
  
  // If we are in IDE mode and the current pane has NO changes, 
  // but another pane DOES have changes, switch to the first one with changes.
  if (activePaneId && !changes[activePaneId]) {
    const paneWithChanges = Object.keys(changes).find(id => changes[id]);
    if (paneWithChanges) {
      lessonParts.ownerDocument.querySelectorAll('.ide-file-item').forEach(el => el.classList.toggle('active', el.dataset.paneId === paneWithChanges));
      lessonParts.ownerDocument.querySelectorAll('.live-pane').forEach(el => el.classList.toggle('active', el.id === paneWithChanges));
    }
  } else if (!activePaneId) {
    // If nothing is active (initial state), focus first one with changes or htmlPane
    const paneToFocus = Object.keys(changes).find(id => changes[id]) || 'htmlPane';
    lessonParts.ownerDocument.querySelectorAll('.ide-file-item').forEach(el => el.classList.toggle('active', el.dataset.paneId === paneToFocus));
    lessonParts.ownerDocument.querySelectorAll('.live-pane').forEach(el => el.classList.toggle('active', el.id === paneToFocus));
  }

  lessonParts.currentStepBadge.textContent = `Prizor ${currentStepNumber + 1}`;
  scrollToAddedLine(lessonParts.htmlCodePane);
  scrollToAddedLine(lessonParts.cssCodePane);
  scrollToAddedLine(lessonParts.jsCodePane);
  scrollToAddedLine(lessonParts.shadowCssCodePane);
}
