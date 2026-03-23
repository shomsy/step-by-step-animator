function composeSavedStepStorageKey(lessonId) {
  return `stepByStepAnimator:${lessonId}:savedSteps`;
}

export function writeSavedStepNumbers({ lessonId, savedStepNumbers }) {
  try {
    localStorage.setItem(composeSavedStepStorageKey(lessonId), JSON.stringify(savedStepNumbers));
  } catch {
    // Ignore storage write failures so the lesson runtime stays usable.
  }
}
