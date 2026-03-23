function composeStepNarrationStorageKey() {
  return 'stepByStepAnimator:stepNarration';
}

export function writeStepNarrationPreferences({
  shouldAutoNarrateStep,
  speechRate,
  voiceSourcePreference,
  browserVoiceUriPreference
}) {
  try {
    localStorage.setItem(composeStepNarrationStorageKey(), JSON.stringify({
      shouldAutoNarrateStep,
      speechRate,
      voiceSourcePreference,
      browserVoiceUriPreference
    }));
  } catch {
    // Ignore storage write failures so narration stays usable in restrictive browsers.
  }
}
