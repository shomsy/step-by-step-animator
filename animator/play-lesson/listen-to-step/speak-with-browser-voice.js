const PREFERRED_BROWSER_LANGUAGES = ['sr-RS', 'hr-HR', 'bs-BA', 'sr', 'hr', 'bs'];

function findPreferredVoice(voices) {
  for (const preferredLanguage of PREFERRED_BROWSER_LANGUAGES) {
    const exactVoice = voices.find(voice => voice.lang === preferredLanguage);

    if (exactVoice) {
      return exactVoice;
    }

    const localeVoice = voices.find(voice => voice.lang.toLowerCase().startsWith(preferredLanguage.toLowerCase()));

    if (localeVoice) {
      return localeVoice;
    }
  }

  return voices[0] || null;
}

function readAvailableVoices(ownerWindow) {
  const synthesis = ownerWindow.speechSynthesis;
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

export async function speakWithBrowserVoice({
  ownerWindow,
  text,
  speechRate,
  onStatusChange
}) {
  const synthesis = ownerWindow.speechSynthesis;

  if (!synthesis || typeof ownerWindow.SpeechSynthesisUtterance !== 'function') {
    throw new Error('SpeechSynthesis is not available in this browser.');
  }

  const availableVoices = await readAvailableVoices(ownerWindow);
  const preferredVoice = findPreferredVoice(availableVoices);
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
  utterance.lang = preferredVoice?.lang || 'sr-RS';

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.addEventListener('end', finishNarration, { once: true });
  utterance.addEventListener('error', finishNarration, { once: true });

  synthesis.cancel();
  synthesis.speak(utterance);

  onStatusChange?.(
    preferredVoice
      ? `Browser fallback glas čita trenutni korak · ${preferredVoice.name}`
      : 'Browser fallback glas čita trenutni korak.'
  );

  return {
    providerLabel: preferredVoice
      ? `Browser fallback · ${preferredVoice.name}`
      : 'Browser fallback glas',
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
