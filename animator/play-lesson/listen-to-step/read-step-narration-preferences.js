function composeStepNarrationStorageKey() {
  return 'stepByStepAnimator:stepNarration';
}

export function readStepNarrationPreferences() {
  try {
    const rawValue = localStorage.getItem(composeStepNarrationStorageKey()) || '{}';
    const parsedValue = JSON.parse(rawValue);

    return {
      shouldAutoNarrateStep: parsedValue.shouldAutoNarrateStep === true,
      speechRate: typeof parsedValue.speechRate === 'number' ? parsedValue.speechRate : 1,
      browserVoiceUriPreference: typeof parsedValue.browserVoiceUriPreference === 'string'
        ? parsedValue.browserVoiceUriPreference
        : '',
      voiceSourcePreference: typeof parsedValue.voiceSourcePreference === 'string'
        ? parsedValue.voiceSourcePreference
        : 'auto'
    };
  } catch {
    return {
      shouldAutoNarrateStep: false,
      speechRate: 1,
      browserVoiceUriPreference: '',
      voiceSourcePreference: 'auto'
    };
  }
}
