const SAVED_STEP_STORAGE_KEY = 'sidebarBookmarks';

export function readSavedStepNumbers(totalSteps) {
  try {
    const rawValue = localStorage.getItem(SAVED_STEP_STORAGE_KEY) || '[]';
    const parsedStepNumbers = JSON.parse(rawValue);

    return [...new Set(
      parsedStepNumbers.filter(stepNumber =>
        Number.isInteger(stepNumber) &&
        stepNumber >= 0 &&
        stepNumber < totalSteps
      )
    )];
  } catch {
    return [];
  }
}
