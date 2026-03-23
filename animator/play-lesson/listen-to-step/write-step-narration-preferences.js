function composeStepNarrationStorageKey() {
  return 'stepByStepAnimator:stepNarration';
}

export function writeStepNarrationPreferences({ shouldAutoNarrateStep, speechRate }) {
  try {
    localStorage.setItem(composeStepNarrationStorageKey(), JSON.stringify({
      shouldAutoNarrateStep,
      speechRate
    }));
  } catch {
    // Ignore storage write failures so narration stays usable in restrictive browsers.
  }
}
