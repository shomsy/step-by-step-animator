import { escapeInlineText } from '../escape-inline-text.js';

export function presentStepFinder({ lessonParts, steps, goToStepNumber }) {
  lessonParts.stepFinderInput.addEventListener('input', event => {
    showMatchingStepResults(event.target.value);
  });

  lessonParts.stepFinderModal.addEventListener('click', event => {
    if (event.target === lessonParts.stepFinderModal) {
      closeStepFinder();
    }
  });

  lessonParts.stepFinderResults.addEventListener('click', event => {
    const result = event.target.closest('[data-index]');

    if (!result) {
      return;
    }

    goToStepNumber(parseInt(result.dataset.index, 10), { showStepPanel: true });
    closeStepFinder();
  });

  function showMatchingStepResults(query) {
    const normalizedQuery = query.toLowerCase();
    const matchingSteps = steps
      .map((step, index) => ({ ...step, index }))
      .filter(step =>
        step.title.toLowerCase().includes(normalizedQuery) ||
        step.desc.toLowerCase().includes(normalizedQuery) ||
        step.tag.toLowerCase().includes(normalizedQuery)
      );

    lessonParts.stepFinderResults.innerHTML = matchingSteps.map(step => `
      <div class="search-result" data-index="${step.index}">
        <div class="search-result-num">${step.index + 1}</div>
        <div class="search-result-info">
          <h4>${escapeInlineText(step.title)}</h4>
          <p>${escapeInlineText(step.desc)}</p>
        </div>
      </div>
    `).join('');
  }

  function openStepFinder() {
    lessonParts.stepFinderModal.classList.add('active');
    lessonParts.stepFinderInput.focus();
    showMatchingStepResults('');
  }

  function closeStepFinder() {
    lessonParts.stepFinderModal.classList.remove('active');
    lessonParts.stepFinderInput.value = '';
  }

  function isStepFinderOpen() {
    return lessonParts.stepFinderModal.classList.contains('active');
  }

  return {
    closeStepFinder,
    isStepFinderOpen,
    openStepFinder
  };
}
