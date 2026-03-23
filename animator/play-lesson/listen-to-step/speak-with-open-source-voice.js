const OPEN_SOURCE_VOICE_ID = 'sr_RS-serbski_institut-medium';
const OPEN_SOURCE_PROVIDER_LABEL = 'Open-source Piper glas';
const OPEN_SOURCE_PROVIDER_SHORT_LABEL = 'Open-source Piper · srpski medium';

let piperTtsModulePromise = null;

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

export function readOpenSourceVoiceLabel() {
  return OPEN_SOURCE_PROVIDER_SHORT_LABEL;
}

export async function readOpenSourceVoiceAvailability() {
  const piperTts = await readPiperTtsModule();
  const storedVoices = await piperTts.stored();

  return storedVoices.includes(OPEN_SOURCE_VOICE_ID);
}

export async function prepareOpenSourceVoice({ onStatusChange } = {}) {
  const piperTts = await readPiperTtsModule();

  if (await readOpenSourceVoiceAvailability()) {
    onStatusChange?.(`${OPEN_SOURCE_PROVIDER_LABEL} je već preuzet i spreman.`);
    return;
  }

  onStatusChange?.(`${OPEN_SOURCE_PROVIDER_LABEL} priprema model…`);

  await piperTts.download(OPEN_SOURCE_VOICE_ID, progress => {
    onStatusChange?.(composeOpenSourceStatus(progress));
  });

  onStatusChange?.(`${OPEN_SOURCE_PROVIDER_LABEL} je preuzet i spreman.`);
}

export async function speakWithOpenSourceVoice({
  ownerWindow,
  text,
  speechRate,
  onStatusChange
}) {
  const piperTts = await readPiperTtsModule();

  onStatusChange?.(`${OPEN_SOURCE_PROVIDER_LABEL} priprema glas…`);

  const audioBlob = await piperTts.predict({
    text,
    voiceId: OPEN_SOURCE_VOICE_ID
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
    providerLabel: readOpenSourceVoiceLabel()
  });

  try {
    await audioElement.play();
  } catch (error) {
    controller.stop();
    throw error;
  }

  onStatusChange?.(`${OPEN_SOURCE_PROVIDER_LABEL} čita trenutni korak.`);

  return controller;
}
