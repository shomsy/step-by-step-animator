function composeSavedStepStorageKey(lessonId) {
  return `stepByStepAnimator:${lessonId}:savedSteps`;
}

export function writeSavedStepNumbers({ lessonId, savedStepNumbers }) {
  localStorage.setItem(composeSavedStepStorageKey(lessonId), JSON.stringify(savedStepNumbers));
}
