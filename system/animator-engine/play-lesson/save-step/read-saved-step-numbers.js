function composeSavedStepStorageKey(lessonId) {
  return `stepByStepAnimator:${lessonId}:savedSteps`;
}

export function readSavedStepNumbers({ lessonId, totalSteps }) {
  try {
    const rawValue = localStorage.getItem(composeSavedStepStorageKey(lessonId)) || '[]';
    const parsedStepNumbers = JSON.parse(rawValue);

    return [
      ...new Set(
        parsedStepNumbers.filter(
          (stepNumber) => Number.isInteger(stepNumber) && stepNumber >= 0 && stepNumber < totalSteps
        )
      ),
    ];
  } catch {
    return [];
  }
}
