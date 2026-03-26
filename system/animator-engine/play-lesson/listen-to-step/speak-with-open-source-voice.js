const OPEN_SOURCE_SERBIAN_VOICE_ID = 'sr_RS-serbski_institut-medium';
const OPEN_SOURCE_PROVIDER_LABEL = 'Open-source Piper glas';

let piperTtsModulePromise = null;

function readOpenSourceVoiceProfile(narrationLanguagePreference) {
  if (narrationLanguagePreference === 'hr') {
    return {
      voiceId: OPEN_SOURCE_SERBIAN_VOICE_ID,
      shortLabel: 'Open-source Piper · srpski fallback',
      statusLabel: 'Open-source Piper koristi srpski fallback jer hrvatski model još nije dostupan.'
    };
  }

  return {
    voiceId: OPEN_SOURCE_SERBIAN_VOICE_ID,
    shortLabel: 'Open-source Piper · srpski medium',
    statusLabel: 'Open-source Piper koristi srpski model.'
  };
}

function formatDownloadPercent(progress) {
  if (!progress || typeof progress.loaded !== 'number' || typeof progress.total !== 'number' || progress.total <= 0) {
    return null;
  }

  return Math.max(0, Math.min(100, Math.round((progress.loaded / progress.total) * 100)));
}

function composeOpenSourceStatus(progress) {
  const downloadPercent = formatDownloadPercent(progress);

  if (downloadPercent === null) {
    return `${OPEN_SOURCE_PROVIDER_LABEL} priprema model…`;
  }

  return `${OPEN_SOURCE_PROVIDER_LABEL} preuzima model… ${downloadPercent}%`;
}

function readPiperTtsModule() {
  if (!piperTtsModulePromise) {
    piperTtsModulePromise = import('@mintplex-labs/piper-tts-web');
  }

  return piperTtsModulePromise;
}

function createAudioNarrationController({ ownerWindow, audioElement, audioUrl, providerLabel }) {
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
    ownerWindow.URL.revokeObjectURL(audioUrl);
    resolveFinished();
  }

  audioElement.addEventListener('ended', finishNarration, { once: true });
  audioElement.addEventListener('error', finishNarration, { once: true });

  return {
    providerLabel,
    supportsLiveRateChange: true,
    whenFinished,
    isPaused() {
      return audioElement.paused && audioElement.currentTime > 0 && !audioElement.ended;
    },
    pause() {
      audioElement.pause();
    },
    resume() {
      return audioElement.play();
    },
    setRate(speechRate) {
      audioElement.playbackRate = speechRate;
    },
    stop() {
      audioElement.pause();
      audioElement.currentTime = 0;
      finishNarration();
    }
  };
}

export function readOpenSourceVoiceLabel(narrationLanguagePreference = 'sr') {
  return readOpenSourceVoiceProfile(narrationLanguagePreference).shortLabel;
}

export function readOpenSourceVoiceStatusLabel(narrationLanguagePreference = 'sr') {
  return readOpenSourceVoiceProfile(narrationLanguagePreference).statusLabel;
}

export async function readOpenSourceVoiceAvailability(narrationLanguagePreference = 'sr') {
  const piperTts = await readPiperTtsModule();
  const storedVoices = await piperTts.stored();
  const { voiceId } = readOpenSourceVoiceProfile(narrationLanguagePreference);

  return storedVoices.includes(voiceId);
}

export async function prepareOpenSourceVoice({ narrationLanguagePreference = 'sr', onStatusChange } = {}) {
  const piperTts = await readPiperTtsModule();
  const { voiceId, statusLabel } = readOpenSourceVoiceProfile(narrationLanguagePreference);

  if (await readOpenSourceVoiceAvailability(narrationLanguagePreference)) {
    onStatusChange?.(`${statusLabel} Model je već preuzet i spreman.`);
    return;
  }

  onStatusChange?.(`${statusLabel} ${OPEN_SOURCE_PROVIDER_LABEL} priprema model…`);

  await piperTts.download(voiceId, progress => {
    onStatusChange?.(composeOpenSourceStatus(progress));
  });

  onStatusChange?.(`${statusLabel} Model je preuzet i spreman.`);
}

export async function speakWithOpenSourceVoice({
  ownerWindow,
  text,
  speechRate,
  onStatusChange,
  narrationLanguagePreference = 'sr'
}) {
  const piperTts = await readPiperTtsModule();
  const { voiceId, shortLabel, statusLabel } = readOpenSourceVoiceProfile(narrationLanguagePreference);

  onStatusChange?.(`${statusLabel} ${OPEN_SOURCE_PROVIDER_LABEL} priprema glas…`);

  const audioBlob = await piperTts.predict({
    text,
    voiceId
  }, progress => {
    onStatusChange?.(composeOpenSourceStatus(progress));
  });

  const audioUrl = ownerWindow.URL.createObjectURL(audioBlob);
  const audioElement = new ownerWindow.Audio(audioUrl);
  audioElement.preload = 'auto';
  audioElement.playbackRate = speechRate;

  const controller = createAudioNarrationController({
    ownerWindow,
    audioElement,
    audioUrl,
    providerLabel: shortLabel
  });

  try {
    await audioElement.play();
  } catch (error) {
    controller.stop();
    throw error;
  }

  onStatusChange?.(`${statusLabel} ${OPEN_SOURCE_PROVIDER_LABEL} čita trenutni korak.`);

  return controller;
}
