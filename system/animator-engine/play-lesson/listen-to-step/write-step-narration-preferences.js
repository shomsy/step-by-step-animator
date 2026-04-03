function composeStepNarrationStorageKey() {
  return 'stepByStepAnimator:stepNarration';
}

export function writeStepNarrationPreferences({
  narrationLanguagePreference,
  shouldAutoNarrateStep,
  speechRate,
  voiceSourcePreference,
  browserVoiceUriPreference,
}) {
  try {
    localStorage.setItem(
      composeStepNarrationStorageKey(),
      JSON.stringify({
        narrationLanguagePreference,
        shouldAutoNarrateStep,
        speechRate,
        voiceSourcePreference,
        browserVoiceUriPreference,
      })
    );
  } catch {
    // Ignore storage write failures so narration stays usable in restrictive browsers.
  }
}
