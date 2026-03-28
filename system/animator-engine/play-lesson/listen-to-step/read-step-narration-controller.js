export async function readStepNarrationController({
  ownerWindow,
  narrationText,
  speechRate,
  narrationLanguagePreference,
  voiceSourcePreference,
  preferredBrowserVoice,
  browserVoiceUriPreference = '',
  readNarrationLanguageLabel,
  prepareOpenSourceVoice,
  speakWithOpenSourceVoice,
  speakWithBrowserVoice,
  onStatusChange
}) {
  const hasPreferredBrowserVoice = Boolean(preferredBrowserVoice);

  function readBrowserNarrationController({ allowGenericBrowserVoiceFallback = false } = {}) {
    return speakWithBrowserVoice({
      ownerWindow,
      text: narrationText,
      speechRate,
      onStatusChange,
      narrationLanguagePreference,
      preferredVoiceUri: browserVoiceUriPreference,
      allowGenericBrowserVoiceFallback
    });
  }

  if (voiceSourcePreference === 'browser' && hasPreferredBrowserVoice) {
    return {
      controller: await readBrowserNarrationController(),
      nextShouldUseBrowserFallback: false
    };
  }

  if (voiceSourcePreference === 'browser' && !hasPreferredBrowserVoice) {
    onStatusChange?.(
      `Nema lokalnog ${readNarrationLanguageLabel(narrationLanguagePreference)} sistemskog glasa. Prelazim na open-source Piper.`
    );
  }

  if (voiceSourcePreference === 'auto' && hasPreferredBrowserVoice) {
    return {
      controller: await readBrowserNarrationController(),
      nextShouldUseBrowserFallback: false
    };
  }

  try {
    await prepareOpenSourceVoice();

    return {
      controller: await speakWithOpenSourceVoice({
        ownerWindow,
        text: narrationText,
        speechRate,
        onStatusChange,
        narrationLanguagePreference
      }),
      nextOpenSourceVoiceReady: true,
      nextShouldUseBrowserFallback: false
    };
  } catch {
    if (!hasPreferredBrowserVoice) {
      throw new Error(
        `Nema lokalnog ${readNarrationLanguageLabel(narrationLanguagePreference)} glasa, a open-source Piper trenutno nije uspeo.`
      );
    }

    onStatusChange?.(
      `Open-source Piper glas nije uspeo za ${readNarrationLanguageLabel(narrationLanguagePreference)} naraciju. Prelazim na sistemski glas.`
    );

    return {
      controller: await readBrowserNarrationController(),
      nextOpenSourceVoiceReady: false,
      nextShouldUseBrowserFallback: true
    };
  }
}
