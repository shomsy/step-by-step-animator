import { readSavedStepNumbers } from './read-saved-step-numbers.js';
import { showSavedStepList } from './show-saved-step-list.js';
import { writeSavedStepNumbers } from './write-saved-step-numbers.js';

export function rememberSavedSteps({
  lessonId,
  lessonParts,
  steps,
  goToStepNumber,
  showCurrentLesson,
}) {
  const savedStepNumbers = readSavedStepNumbers({
    lessonId,
    totalSteps: steps.length,
  });

  lessonParts.savedStepList.addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-remove-step-number]');

    if (removeButton) {
      toggleSavedStepNumber(parseInt(removeButton.dataset.removeStepNumber, 10));
      return;
    }

    const stepButton = event.target.closest('[data-step-number]');

    if (stepButton) {
      goToStepNumber(parseInt(stepButton.dataset.stepNumber, 10), { showStepPanel: true });
    }
  });

  function toggleSavedStepNumber(stepNumber) {
    const existingIndex = savedStepNumbers.indexOf(stepNumber);

    if (existingIndex > -1) {
      savedStepNumbers.splice(existingIndex, 1);
    } else {
      savedStepNumbers.push(stepNumber);
      savedStepNumbers.sort((left, right) => left - right);
    }

    writeSavedStepNumbers({
      lessonId,
      savedStepNumbers,
    });
    showCurrentLesson();
  }

  function showSavedStepListForCurrentStep(currentStepNumber) {
    showSavedStepList({
      lessonParts,
      savedStepNumbers,
      currentStepNumber,
      steps,
    });
  }

  function listSavedStepNumbers() {
    return [...savedStepNumbers];
  }

  return {
    listSavedStepNumbers,
    showSavedStepList: showSavedStepListForCurrentStep,
    toggleSavedStepNumber,
  };
}
