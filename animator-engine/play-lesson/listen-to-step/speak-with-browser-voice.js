const LANGUAGE_VARIANTS = {
  sr: ['sr-RS', 'sr'],
  hr: ['hr-HR', 'hr']
};

function readLanguageVariants(narrationLanguagePreference) {
  return LANGUAGE_VARIANTS[narrationLanguagePreference] || LANGUAGE_VARIANTS.sr;
}

function languageMatchesPreference(languageTag, narrationLanguagePreference) {
  if (typeof languageTag !== 'string') {
    return false;
  }

  const normalizedLanguageTag = languageTag.toLowerCase();

  return readLanguageVariants(narrationLanguagePreference).some(preferredLanguage =>
    normalizedLanguageTag === preferredLanguage.toLowerCase() ||
    normalizedLanguageTag.startsWith(`${preferredLanguage.toLowerCase()}-`)
  );
}

function readVoiceLabel(voice) {
  const voiceName = typeof voice?.name === 'string' ? voice.name.trim() : '';
  const voiceLanguage = typeof voice?.lang === 'string' ? voice.lang.trim() : '';

  if (voiceName && voiceLanguage) {
    return `${voiceName} · ${voiceLanguage}`;
  }

  return voiceName || voiceLanguage || 'Podrazumevani sistemski glas';
}

function sortVoicesByName(firstVoice, secondVoice) {
  return readVoiceLabel(firstVoice).localeCompare(readVoiceLabel(secondVoice), 'sr');
}

function readMatchingVoices(voices, narrationLanguagePreference) {
  return voices
    .filter(voice => languageMatchesPreference(voice.lang, narrationLanguagePreference))
    .sort(sortVoicesByName);
}

function findVoiceByUri(voices, preferredVoiceUri) {
  if (typeof preferredVoiceUri !== 'string' || !preferredVoiceUri.trim()) {
    return null;
  }

  return voices.find(voice => voice.voiceURI === preferredVoiceUri) || null;
}

function findPreferredVoice(voices, narrationLanguagePreference, preferredVoiceUri = '') {
  const explicitlySelectedVoice = findVoiceByUri(voices, preferredVoiceUri);

  if (explicitlySelectedVoice) {
    return explicitlySelectedVoice;
  }

  for (const preferredLanguage of readLanguageVariants(narrationLanguagePreference)) {
    const exactVoice = voices.find(voice => voice.lang === preferredLanguage);

    if (exactVoice) {
      return exactVoice;
    }

    const localeVoice = voices.find(voice =>
      typeof voice.lang === 'string' &&
      voice.lang.toLowerCase().startsWith(preferredLanguage.toLowerCase())
    );

    if (localeVoice) {
      return localeVoice;
    }
  }

  return null;
}

function readAvailableVoices(ownerWindow) {
  const synthesis = ownerWindow.speechSynthesis;

  if (!synthesis) {
    return Promise.resolve([]);
  }

  const voices = synthesis.getVoices();

  if (voices.length) {
    return Promise.resolve(voices);
  }

  return new Promise(resolve => {
    let hasResolved = false;

    function resolveVoices() {
      if (hasResolved) {
        return;
      }

      hasResolved = true;
      synthesis.removeEventListener('voiceschanged', resolveVoices);
      resolve(synthesis.getVoices());
    }

    synthesis.addEventListener('voiceschanged', resolveVoices, { once: true });
    ownerWindow.setTimeout(resolveVoices, 1200);
  });
}

function readLanguageLabel(narrationLanguagePreference) {
  return narrationLanguagePreference === 'hr' ? 'hrvatski' : 'srpski';
}

export function describeBrowserVoice(voice) {
  return readVoiceLabel(voice);
}

export async function readBrowserVoiceChoices(ownerWindow, narrationLanguagePreference) {
  const availableVoices = await readAvailableVoices(ownerWindow);

  return readMatchingVoices(availableVoices, narrationLanguagePreference).map(voice => ({
    voiceURI: voice.voiceURI,
    name: voice.name,
    lang: voice.lang,
    label: readVoiceLabel(voice)
  }));
}

export async function readPreferredBrowserVoice(ownerWindow, narrationLanguagePreference, preferredVoiceUri = '') {
  const availableVoices = await readAvailableVoices(ownerWindow);
  const matchingVoices = readMatchingVoices(availableVoices, narrationLanguagePreference);

  return findPreferredVoice(matchingVoices, narrationLanguagePreference, preferredVoiceUri);
}

export async function speakWithBrowserVoice({
  ownerWindow,
  text,
  speechRate,
  onStatusChange,
  narrationLanguagePreference,
  preferredVoiceUri = '',
  allowGenericBrowserVoiceFallback = false
}) {
  const synthesis = ownerWindow.speechSynthesis;

  if (!synthesis || typeof ownerWindow.SpeechSynthesisUtterance !== 'function') {
    throw new Error('SpeechSynthesis is not available in this browser.');
  }

  const availableVoices = await readAvailableVoices(ownerWindow);
  const matchingVoices = readMatchingVoices(availableVoices, narrationLanguagePreference);
  const preferredVoice = findPreferredVoice(matchingVoices, narrationLanguagePreference, preferredVoiceUri);

  if (!preferredVoice && !allowGenericBrowserVoiceFallback) {
    throw new Error(`Nema lokalnog ${readLanguageLabel(narrationLanguagePreference)} sistemskog glasa u ovom browseru.`);
  }

  const utterance = new ownerWindow.SpeechSynthesisUtterance(text);
  let hasFinished = false;
  let resolveFinished = null;

  const whenFinished = new Promise(resolve => {
    resolveFinished = resolve;
  });

  function finishNarration() {
    if (hasFinished) {
      return;
    }

    hasFinished = true;
    resolveFinished();
  }

  utterance.rate = speechRate;
  utterance.lang = readLanguageVariants(narrationLanguagePreference)[0];

  if (preferredVoice) {
    utterance.lang = preferredVoice.lang;
    utterance.voice = preferredVoice;
  }

  utterance.addEventListener('end', finishNarration, { once: true });
  utterance.addEventListener('error', finishNarration, { once: true });

  synthesis.cancel();
  synthesis.speak(utterance);

  onStatusChange?.(
    preferredVoice
      ? `Sistemski glas čita trenutni korak · ${readVoiceLabel(preferredVoice)}`
      : `Browser fallback pokušava generički ${readLanguageLabel(narrationLanguagePreference)} TTS.`
  );

  return {
    providerLabel: preferredVoice
      ? `Sistemski glas · ${readVoiceLabel(preferredVoice)}`
      : `Browser fallback · ${readLanguageLabel(narrationLanguagePreference)}`,
    supportsLiveRateChange: false,
    whenFinished,
    isPaused() {
      return synthesis.paused;
    },
    pause() {
      synthesis.pause();
    },
    resume() {
      synthesis.resume();
      return Promise.resolve();
    },
    setRate() {
      // Browser voices apply rate per utterance, so changes affect the next narration.
    },
    stop() {
      synthesis.cancel();
      finishNarration();
    }
  };
}
