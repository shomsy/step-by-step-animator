import { composeStepNarrationText } from './compose-step-narration-text.js';
import { readStepNarrationPreferences } from './read-step-narration-preferences.js';
import { speakWithBrowserVoice } from './speak-with-browser-voice.js';
import { readOpenSourceVoiceLabel, speakWithOpenSourceVoice } from './speak-with-open-source-voice.js';
import { writeStepNarrationPreferences } from './write-step-narration-preferences.js';

const DEFAULT_SPEECH_RATE = 1;
const MIN_SPEECH_RATE = 0.8;
const MAX_SPEECH_RATE = 1.3;
const DEFAULT_READY_STATUS = `${readOpenSourceVoiceLabel()} je spreman na zahtev.`;

function clampSpeechRate(nextSpeechRate) {
  return Math.max(MIN_SPEECH_RATE, Math.min(MAX_SPEECH_RATE, nextSpeechRate));
}

function showStepSpeechRate(lessonParts, speechRate) {
  lessonParts.stepSpeechSpeedValue.textContent = `${speechRate.toFixed(2)}x`;
}

function showStepSpeechStatus(lessonParts, statusText) {
  lessonParts.stepSpeechStatus.textContent = statusText;
}

function showStepSpeechControls({ lessonParts, activeNarration, isStartingNarration }) {
  const hasActiveNarration = Boolean(activeNarration);
  const isNarrationPaused = hasActiveNarration && activeNarration.isPaused();
  const speakLabel = isNarrationPaused ? 'Nastavi' : 'Čitaj korak';
  const speakButtonLabel = lessonParts.speakStepButton.querySelector('span');

  if (speakButtonLabel) {
    speakButtonLabel.textContent = speakLabel;
  }

  lessonParts.speakStepButton.disabled = isStartingNarration || (hasActiveNarration && !isNarrationPaused);
  lessonParts.pauseStepSpeechButton.disabled = isStartingNarration || !hasActiveNarration || isNarrationPaused;
  lessonParts.stopStepSpeechButton.disabled = !isStartingNarration && !hasActiveNarration;
}

export function presentStepNarration({ lessonParts, ownerWindow }) {
  let currentStep = null;
  let currentStepNumber = 0;
  let totalSteps = 0;
  let lastShownStepNumber = -1;
  let shouldAutoNarrateStep = false;
  let speechRate = DEFAULT_SPEECH_RATE;
  let activeNarration = null;
  let isStartingNarration = false;
  let activeNarrationRequestId = 0;
  let shouldUseBrowserFallback = false;

  lessonParts.speakStepButton.addEventListener('click', async () => {
    if (activeNarration?.isPaused()) {
      await resumeCurrentStepNarration();
      return;
    }

    await speakCurrentStep();
  });

  lessonParts.pauseStepSpeechButton.addEventListener('click', () => {
    pauseCurrentStepNarration();
  });

  lessonParts.stopStepSpeechButton.addEventListener('click', () => {
    stopCurrentStepNarration({ announceStop: true });
  });

  lessonParts.autoSpeakStepToggle.addEventListener('change', async event => {
    shouldAutoNarrateStep = event.target.checked;
    writeCurrentPreferences();

    if (!shouldAutoNarrateStep) {
      showStepSpeechStatus(lessonParts, 'Automatsko čitanje je isključeno.');
      return;
    }

    await speakCurrentStep();
  });

  lessonParts.stepSpeechSpeedSlider.addEventListener('input', event => {
    speechRate = clampSpeechRate(parseFloat(event.target.value));
    lessonParts.stepSpeechSpeedSlider.value = String(speechRate);
    showStepSpeechRate(lessonParts, speechRate);
    writeCurrentPreferences();

    if (activeNarration?.supportsLiveRateChange) {
      activeNarration.setRate(speechRate);
      showStepSpeechStatus(lessonParts, `${activeNarration.providerLabel} je ubrzan na ${speechRate.toFixed(2)}x.`);
      return;
    }

    if (activeNarration && !activeNarration.supportsLiveRateChange) {
      showStepSpeechStatus(lessonParts, `Nova brzina glasa važi od sledećeg čitanja · ${speechRate.toFixed(2)}x.`);
    }
  });

  function initializeStepNarration() {
    const preferences = readStepNarrationPreferences();

    shouldAutoNarrateStep = preferences.shouldAutoNarrateStep === true;
    speechRate = clampSpeechRate(preferences.speechRate);
    lessonParts.autoSpeakStepToggle.checked = shouldAutoNarrateStep;
    lessonParts.stepSpeechSpeedSlider.value = String(speechRate);

    showStepSpeechRate(lessonParts, speechRate);
    showStepSpeechStatus(lessonParts, DEFAULT_READY_STATUS);
    showStepSpeechControls({
      lessonParts,
      activeNarration,
      isStartingNarration
    });
  }

  function writeCurrentPreferences() {
    writeStepNarrationPreferences({
      shouldAutoNarrateStep,
      speechRate
    });
  }

  async function speakCurrentStep() {
    const narrationText = composeStepNarrationText({
      step: currentStep,
      currentStepNumber,
      totalSteps
    });

    if (!narrationText) {
      showStepSpeechStatus(lessonParts, 'Trenutni korak nema tekst spreman za naraciju.');
      return;
    }

    stopCurrentStepNarration();

    const narrationRequestId = ++activeNarrationRequestId;

    isStartingNarration = true;
    showStepSpeechControls({
      lessonParts,
      activeNarration,
      isStartingNarration
    });

    try {
      const narration = await readNarrationController({
        narrationRequestId,
        narrationText
      });

      if (narrationRequestId !== activeNarrationRequestId) {
        narration.stop();
        return;
      }

      activeNarration = narration;
      isStartingNarration = false;
      showStepSpeechControls({
        lessonParts,
        activeNarration,
        isStartingNarration
      });

      narration.whenFinished.then(() => {
        if (activeNarration !== narration) {
          return;
        }

        activeNarration = null;
        showStepSpeechStatus(lessonParts, 'Naracija za trenutni korak je završena.');
        showStepSpeechControls({
          lessonParts,
          activeNarration,
          isStartingNarration: false
        });
      });
    } catch (error) {
      if (narrationRequestId !== activeNarrationRequestId) {
        return;
      }

      activeNarration = null;
      isStartingNarration = false;
      showStepSpeechStatus(lessonParts, `Naracija nije uspela: ${error.message}`);
      showStepSpeechControls({
        lessonParts,
        activeNarration,
        isStartingNarration
      });
    }
  }

  async function readNarrationController({ narrationRequestId, narrationText }) {
    const showNarrationStatus = statusText => {
      if (narrationRequestId !== activeNarrationRequestId) {
        return;
      }

      showStepSpeechStatus(lessonParts, statusText);
    };

    if (!shouldUseBrowserFallback) {
      try {
        return await speakWithOpenSourceVoice({
          ownerWindow,
          text: narrationText,
          speechRate,
          onStatusChange: showNarrationStatus
        });
      } catch {
        shouldUseBrowserFallback = true;
        showNarrationStatus('Open-source Piper glas nije uspeo, prelazim na browser fallback glas.');
      }
    }

    return speakWithBrowserVoice({
      ownerWindow,
      text: narrationText,
      speechRate,
      onStatusChange: showNarrationStatus
    });
  }

  function pauseCurrentStepNarration() {
    if (!activeNarration) {
      return;
    }

    activeNarration.pause();
    showStepSpeechStatus(lessonParts, 'Naracija je pauzirana.');
    showStepSpeechControls({
      lessonParts,
      activeNarration,
      isStartingNarration
    });
  }

  async function resumeCurrentStepNarration() {
    if (!activeNarration) {
      return;
    }

    await activeNarration.resume();
    showStepSpeechStatus(lessonParts, `${activeNarration.providerLabel} nastavlja čitanje.`);
    showStepSpeechControls({
      lessonParts,
      activeNarration,
      isStartingNarration
    });
  }

  function stopCurrentStepNarration(options = {}) {
    const { announceStop = false } = options;

    activeNarrationRequestId += 1;
    isStartingNarration = false;

    if (activeNarration) {
      activeNarration.stop();
      activeNarration = null;
    }

    if (announceStop) {
      showStepSpeechStatus(lessonParts, 'Naracija je zaustavljena.');
    }

    showStepSpeechControls({
      lessonParts,
      activeNarration,
      isStartingNarration
    });
  }

  function showCurrentStepNarration({ step, currentStepNumber: nextStepNumber, totalSteps: nextTotalSteps }) {
    const didStepChange = nextStepNumber !== lastShownStepNumber;

    currentStep = step;
    currentStepNumber = nextStepNumber;
    totalSteps = nextTotalSteps;

    if (!didStepChange) {
      return;
    }

    lastShownStepNumber = nextStepNumber;
    stopCurrentStepNarration();

    if (shouldAutoNarrateStep) {
      void speakCurrentStep();
      return;
    }

    showStepSpeechStatus(lessonParts, 'Naracija je spremna za trenutni korak.');
  }

  return {
    initializeStepNarration,
    showCurrentStepNarration,
    stopCurrentStepNarration
  };
}
