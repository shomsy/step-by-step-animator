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
  let lineNumber = 0;
  let revealOrder = 0;
  const currentLines = buildLinesAtStep(currentStepNumber);
  const previousLines = currentStepNumber > 0 ? buildLinesAtStep(currentStepNumber - 1) : [];
  const renderedLines = compareCodeLines(currentLines, previousLines);

  container.innerHTML = renderedLines.map(entry => {
    lineNumber += 1;
    const lineMarkup = entry.isEmptyLine ? '&nbsp;' : escapeCodeText(entry.lineText);
    const lineKind = paneType === 'css' ? describeCssLineRole(entry.lineText) : 'plain';
    const shouldStaggerReveal = paneType === 'css' && entry.isNewLine && !entry.isEmptyLine;
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
}

export function showGrowingCode({
  lessonParts,
  step,
  currentStepNumber,
  buildHtmlAtStep,
  buildCssAtStep
}) {
  const focusHtmlNeedles = Array.isArray(step.focusHtmlNeedles) ? step.focusHtmlNeedles : [];

  showCodePane(lessonParts.htmlCodePane, buildHtmlAtStep, currentStepNumber, 'html', focusHtmlNeedles);
  showCodePane(lessonParts.cssCodePane, buildCssAtStep, currentStepNumber, 'css');
  lessonParts.currentStepBadge.textContent = `Prizor ${currentStepNumber + 1}`;
  scrollToAddedLine(lessonParts.htmlCodePane);
  scrollToAddedLine(lessonParts.cssCodePane);
}
