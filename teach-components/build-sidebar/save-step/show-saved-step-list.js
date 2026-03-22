import { escapeInlineText } from '../escape-inline-text.js';

export function showSavedStepList({
  lessonParts,
  savedStepNumbers,
  currentStepNumber,
  steps
}) {
  const savedItems = savedStepNumbers
    .map(stepNumber => ({ stepNumber, step: steps[stepNumber] }))
    .filter(({ step }) => Boolean(step));

  lessonParts.saveStepButton.classList.toggle('active', savedStepNumbers.includes(currentStepNumber));
  lessonParts.savedStepCount.textContent = String(savedStepNumbers.length);
  lessonParts.savedStepSummary.textContent = `${savedItems.length} sačuvano`;
  lessonParts.savedStepEmptyState.hidden = savedItems.length > 0;
  lessonParts.savedStepList.hidden = savedItems.length === 0;

  if (!savedItems.length) {
    lessonParts.savedStepList.innerHTML = '';
    return;
  }

  lessonParts.savedStepList.innerHTML = savedItems.map(({ stepNumber, step }) => `
    <div class="bookmark-item${stepNumber === currentStepNumber ? ' current' : ''}">
      <button type="button" class="bookmark-link" data-step-number="${stepNumber}">
        <span class="bookmark-meta">Prizor ${stepNumber + 1} <span class="bookmark-tag">${escapeInlineText(step.tag)}</span></span>
        <strong>${escapeInlineText(step.title)}</strong>
        <p>${escapeInlineText(step.desc)}</p>
      </button>
      <button type="button" class="bookmark-remove" data-remove-step-number="${stepNumber}" title="Ukloni bookmark">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
  `).join('');
}
