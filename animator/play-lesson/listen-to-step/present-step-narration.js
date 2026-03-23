import { composeStepNarrationText } from './compose-step-narration-text.js';
import { readStepNarrationPreferences } from './read-step-narration-preferences.js';
import {
  describeBrowserVoice,
  readBrowserVoiceChoices,
  readPreferredBrowserVoice,
  speakWithBrowserVoice
} from './speak-with-browser-voice.js';
import {
  prepareOpenSourceVoice,
  readOpenSourceVoiceAvailability,
  readOpenSourceVoiceLabel,
  readOpenSourceVoiceStatusLabel,
  speakWithOpenSourceVoice
} from './speak-with-open-source-voice.js';
import { writeStepNarrationPreferences } from './write-step-narration-preferences.js';

const DEFAULT_SPEECH_RATE = 1;
const MIN_SPEECH_RATE = 0.8;
const MAX_SPEECH_RATE = 1.3;
const VOICE_SOURCE_PREFERENCES = new Set(['auto', 'browser', 'open-source']);
const NARRATION_LANGUAGE_PREFERENCES = new Set(['sr', 'hr']);

function clampSpeechRate(nextSpeechRate) {
  return Math.max(MIN_SPEECH_RATE, Math.min(MAX_SPEECH_RATE, nextSpeechRate));
}

function readNarrationLanguageLabel(narrationLanguagePreference) {
  return narrationLanguagePreference === 'hr' ? 'hrvatski' : 'srpski';
}

function showStepSpeechRate(lessonParts, speechRate) {
  lessonParts.stepSpeechSpeedValue.textContent = `${speechRate.toFixed(2)}x`;
}

function showStepSpeechStatus(lessonParts, statusText) {
  lessonParts.stepSpeechStatus.textContent = statusText;
}

function showStepSpeechBadge(lessonParts, label, state) {
  lessonParts.stepSpeechBadge.textContent = label;
  lessonParts.stepSpeechBadge.dataset.state = state;
}

function showPrepareStepSpeechButton({
  lessonParts,
  isPreparingOpenSourceVoice,
  isOpenSourceVoiceReady,
  shouldUseBrowserFallback
}) {
  if (isPreparingOpenSourceVoice) {
    lessonParts.prepareStepSpeechButton.textContent = 'Preuzimam Piper…';
    lessonParts.prepareStepSpeechButton.disabled = true;
    return;
  }

  if (isOpenSourceVoiceReady && !shouldUseBrowserFallback) {
    lessonParts.prepareStepSpeechButton.textContent = 'Piper spreman';
    lessonParts.prepareStepSpeechButton.disabled = true;
    return;
  }

  lessonParts.prepareStepSpeechButton.textContent = shouldUseBrowserFallback
    ? 'Probaj Piper opet'
    : 'Pripremi Piper';
  lessonParts.prepareStepSpeechButton.disabled = false;
}

function showStepSpeechControls({
  lessonParts,
  activeNarration,
  isStartingNarration,
  isPreparingOpenSourceVoice
}) {
  const hasActiveNarration = Boolean(activeNarration);
  const isNarrationPaused = hasActiveNarration && activeNarration.isPaused();
  const speakLabel = isNarrationPaused ? 'Nastavi' : 'Čitaj korak';
  const speakButtonLabel = lessonParts.speakStepButton.querySelector('span');

  if (speakButtonLabel) {
    speakButtonLabel.textContent = speakLabel;
  }

  lessonParts.speakStepButton.disabled = isStartingNarration || isPreparingOpenSourceVoice || (hasActiveNarration && !isNarrationPaused);
  lessonParts.pauseStepSpeechButton.disabled = isStartingNarration || isPreparingOpenSourceVoice || !hasActiveNarration || isNarrationPaused;
  lessonParts.stopStepSpeechButton.disabled = !isStartingNarration && !hasActiveNarration;
}

function showBrowserVoiceChoices({
  lessonParts,
  browserVoiceChoices,
  browserVoiceUriPreference,
  voiceSourcePreference,
  narrationLanguagePreference
}) {
  const browserVoiceSelect = lessonParts.stepSpeechBrowserVoiceSelect;
  const optionValues = new Set(['']);
  const optionDefinitions = [
    {
      value: '',
      label: browserVoiceChoices.length
        ? 'Automatski izbor sistemskog glasa'
        : `Nema lokalnog ${readNarrationLanguageLabel(narrationLanguagePreference)} glasa u browseru`
    },
    ...browserVoiceChoices
      .filter(voiceChoice => {
        if (!voiceChoice?.voiceURI || optionValues.has(voiceChoice.voiceURI)) {
          return false;
        }

        optionValues.add(voiceChoice.voiceURI);
        return true;
      })
  ];

  browserVoiceSelect.replaceChildren(
    ...optionDefinitions.map(optionDefinition => {
      const optionElement = lessonParts.ownerDocument.createElement('option');
      optionElement.value = optionDefinition.value;
      optionElement.textContent = optionDefinition.label;
      return optionElement;
    })
  );

  browserVoiceSelect.value = optionValues.has(browserVoiceUriPreference)
    ? browserVoiceUriPreference
    : '';
  browserVoiceSelect.disabled = voiceSourcePreference === 'open-source' || browserVoiceChoices.length === 0;
}

function showVoiceStatusSummary({
  lessonParts,
  narrationLanguagePreference,
  voiceSourcePreference,
  preferredBrowserVoice,
  browserVoiceChoices,
  isOpenSourceVoiceReady,
  shouldUseBrowserFallback
}) {
  if (voiceSourcePreference === 'browser') {
    showStepSpeechStatus(
      lessonParts,
      preferredBrowserVoice
        ? `Koristiću sistemski glas · ${describeBrowserVoice(preferredBrowserVoice)}`
        : browserVoiceChoices.length
          ? 'Koristiću podrazumevani sistemski glas. Po potrebi izaberi drugu varijantu iz liste iznad.'
          : `U browseru nema lokalnog ${readNarrationLanguageLabel(narrationLanguagePreference)} glasa. Prelazim na open-source Piper.`
    );
    return;
  }

  if (voiceSourcePreference === 'open-source') {
    showStepSpeechStatus(
      lessonParts,
      isOpenSourceVoiceReady
        ? `${readOpenSourceVoiceLabel(narrationLanguagePreference)} je spreman za čitanje.`
        : `${readOpenSourceVoiceStatusLabel(narrationLanguagePreference)} Pri prvom čitanju ili ručnoj pripremi model će se preuzeti u browser.`
    );
    return;
  }

  if (preferredBrowserVoice) {
    showStepSpeechStatus(
      lessonParts,
      `Automatski režim koristi prirodniji sistemski glas · ${describeBrowserVoice(preferredBrowserVoice)}`
    );
    return;
  }

  if (shouldUseBrowserFallback) {
    showStepSpeechStatus(
      lessonParts,
      `Automatski režim je ostao bez lokalnog ${readNarrationLanguageLabel(narrationLanguagePreference)} glasa. Probaj Piper ili promeni jezik naracije.`
    );
    return;
  }

  if (isOpenSourceVoiceReady) {
    showStepSpeechStatus(
      lessonParts,
      `${readOpenSourceVoiceLabel(narrationLanguagePreference)} je spreman i automatski će se koristiti ako nema prirodnijeg lokalnog glasa.`
    );
    return;
  }

  showStepSpeechStatus(
    lessonParts,
    `Automatski režim prvo traži prirodniji lokalni ${readNarrationLanguageLabel(narrationLanguagePreference)} glas, a ako ga nema koristiće open-source Piper.`
  );
}

function showVoiceBadge({
  lessonParts,
  narrationLanguagePreference,
  voiceSourcePreference,
  preferredBrowserVoice,
  isPreparingOpenSourceVoice,
  isOpenSourceVoiceReady,
  shouldUseBrowserFallback
}) {
  if (isPreparingOpenSourceVoice) {
    showStepSpeechBadge(lessonParts, 'Piper download', 'preparing');
    return;
  }

  if (voiceSourcePreference === 'browser') {
    showStepSpeechBadge(lessonParts, 'Sistemski', 'system');
    return;
  }

  if (voiceSourcePreference === 'open-source') {
    showStepSpeechBadge(
      lessonParts,
      isOpenSourceVoiceReady ? 'Piper ready' : narrationLanguagePreference === 'hr' ? 'Piper sr→hr' : 'Piper',
      isOpenSourceVoiceReady ? 'ready' : 'idle'
    );
    return;
  }

  if (preferredBrowserVoice) {
    showStepSpeechBadge(lessonParts, 'Auto → sistemski', 'auto');
    return;
  }

  if (shouldUseBrowserFallback) {
    showStepSpeechBadge(lessonParts, 'Fallback', 'fallback');
    return;
  }

  showStepSpeechBadge(
    lessonParts,
    isOpenSourceVoiceReady ? 'Auto → Piper' : 'Automatski',
    isOpenSourceVoiceReady ? 'ready' : 'auto'
  );
}

export function presentStepNarration({ lessonParts, ownerWindow }) {
  let currentStep = null;
  let currentStepNumber = 0;
  let totalSteps = 0;
  let lastShownStepNumber = -1;
  let shouldAutoNarrateStep = false;
  let speechRate = DEFAULT_SPEECH_RATE;
  let narrationLanguagePreference = 'sr';
  let voiceSourcePreference = 'auto';
  let browserVoiceUriPreference = '';
  let browserVoiceChoices = [];
  let preferredBrowserVoice = null;
  let activeNarration = null;
  let isStartingNarration = false;
  let activeNarrationRequestId = 0;
  let shouldUseBrowserFallback = false;
  let isPreparingOpenSourceVoice = false;
  let isOpenSourceVoiceReady = false;
  let openSourceVoicePreparationPromise = null;

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

  lessonParts.prepareStepSpeechButton.addEventListener('click', async () => {
    await prepareCurrentOpenSourceVoice({ forceRetry: true });
    showVoiceStatusSummary({
      lessonParts,
      narrationLanguagePreference,
      voiceSourcePreference,
      preferredBrowserVoice,
      browserVoiceChoices,
      isOpenSourceVoiceReady,
      shouldUseBrowserFallback
    });
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

  lessonParts.stepSpeechLanguageSelect.addEventListener('change', async event => {
    narrationLanguagePreference = NARRATION_LANGUAGE_PREFERENCES.has(event.target.value)
      ? event.target.value
      : 'sr';
    browserVoiceUriPreference = '';
    shouldUseBrowserFallback = false;
    await refreshVoiceAvailability();
    writeCurrentPreferences();
  });

  lessonParts.stepSpeechSourceSelect.addEventListener('change', event => {
    voiceSourcePreference = VOICE_SOURCE_PREFERENCES.has(event.target.value)
      ? event.target.value
      : 'auto';

    showBrowserVoiceChoices({
      lessonParts,
      browserVoiceChoices,
      browserVoiceUriPreference,
      voiceSourcePreference,
      narrationLanguagePreference
    });
    showVoiceBadge({
      lessonParts,
      narrationLanguagePreference,
      voiceSourcePreference,
      preferredBrowserVoice,
      isPreparingOpenSourceVoice,
      isOpenSourceVoiceReady,
      shouldUseBrowserFallback
    });
    showVoiceStatusSummary({
      lessonParts,
      narrationLanguagePreference,
      voiceSourcePreference,
      preferredBrowserVoice,
      browserVoiceChoices,
      isOpenSourceVoiceReady,
      shouldUseBrowserFallback
    });
    writeCurrentPreferences();
  });

  lessonParts.stepSpeechBrowserVoiceSelect.addEventListener('change', async event => {
    browserVoiceUriPreference = event.target.value;

    try {
      preferredBrowserVoice = await readPreferredBrowserVoice(
        ownerWindow,
        narrationLanguagePreference,
        browserVoiceUriPreference
      );
    } catch {
      preferredBrowserVoice = null;
    }

    showVoiceBadge({
      lessonParts,
      narrationLanguagePreference,
      voiceSourcePreference,
      preferredBrowserVoice,
      isPreparingOpenSourceVoice,
      isOpenSourceVoiceReady,
      shouldUseBrowserFallback
    });
    showVoiceStatusSummary({
      lessonParts,
      narrationLanguagePreference,
      voiceSourcePreference,
      preferredBrowserVoice,
      browserVoiceChoices,
      isOpenSourceVoiceReady,
      shouldUseBrowserFallback
    });
    writeCurrentPreferences();
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
    narrationLanguagePreference = NARRATION_LANGUAGE_PREFERENCES.has(preferences.narrationLanguagePreference)
      ? preferences.narrationLanguagePreference
      : 'sr';
    voiceSourcePreference = VOICE_SOURCE_PREFERENCES.has(preferences.voiceSourcePreference)
      ? preferences.voiceSourcePreference
      : 'auto';
    browserVoiceUriPreference = typeof preferences.browserVoiceUriPreference === 'string'
      ? preferences.browserVoiceUriPreference
      : '';

    lessonParts.autoSpeakStepToggle.checked = shouldAutoNarrateStep;
    lessonParts.stepSpeechSpeedSlider.value = String(speechRate);
    lessonParts.stepSpeechLanguageSelect.value = narrationLanguagePreference;
    lessonParts.stepSpeechSourceSelect.value = voiceSourcePreference;

    showStepSpeechRate(lessonParts, speechRate);
    showPrepareStepSpeechButton({
      lessonParts,
      isPreparingOpenSourceVoice,
      isOpenSourceVoiceReady,
      shouldUseBrowserFallback
    });
    showStepSpeechControls({
      lessonParts,
      activeNarration,
      isStartingNarration,
      isPreparingOpenSourceVoice
    });
    showBrowserVoiceChoices({
      lessonParts,
      browserVoiceChoices,
      browserVoiceUriPreference,
      voiceSourcePreference,
      narrationLanguagePreference
    });
    showVoiceBadge({
      lessonParts,
      narrationLanguagePreference,
      voiceSourcePreference,
      preferredBrowserVoice,
      isPreparingOpenSourceVoice,
      isOpenSourceVoiceReady,
      shouldUseBrowserFallback
    });
    showVoiceStatusSummary({
      lessonParts,
      narrationLanguagePreference,
      voiceSourcePreference,
      preferredBrowserVoice,
      browserVoiceChoices,
      isOpenSourceVoiceReady,
      shouldUseBrowserFallback
    });

    void refreshVoiceAvailability();
  }

  function writeCurrentPreferences() {
    writeStepNarrationPreferences({
      narrationLanguagePreference,
      shouldAutoNarrateStep,
      speechRate,
      voiceSourcePreference,
      browserVoiceUriPreference
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
      isStartingNarration,
      isPreparingOpenSourceVoice
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
        isStartingNarration,
        isPreparingOpenSourceVoice
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
          isStartingNarration: false,
          isPreparingOpenSourceVoice
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
        isStartingNarration,
        isPreparingOpenSourceVoice
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

    if (voiceSourcePreference === 'browser' && preferredBrowserVoice) {
      return speakWithBrowserVoice({
        ownerWindow,
        text: narrationText,
        speechRate,
        onStatusChange: showNarrationStatus,
        narrationLanguagePreference,
        preferredVoiceUri: browserVoiceUriPreference
      });
    }

    if (voiceSourcePreference === 'browser' && !preferredBrowserVoice) {
      showNarrationStatus(`Nema lokalnog ${readNarrationLanguageLabel(narrationLanguagePreference)} sistemskog glasa. Prelazim na open-source Piper.`);
    }

    if (voiceSourcePreference === 'auto' && preferredBrowserVoice) {
      return speakWithBrowserVoice({
        ownerWindow,
        text: narrationText,
        speechRate,
        onStatusChange: showNarrationStatus,
        narrationLanguagePreference,
        preferredVoiceUri: browserVoiceUriPreference
      });
    }

    if (!shouldUseBrowserFallback || voiceSourcePreference === 'open-source') {
      try {
        await prepareCurrentOpenSourceVoice();

        return await speakWithOpenSourceVoice({
          ownerWindow,
          text: narrationText,
          speechRate,
          onStatusChange: showNarrationStatus,
          narrationLanguagePreference
        });
      } catch {
        isOpenSourceVoiceReady = false;
        shouldUseBrowserFallback = true;
        showVoiceBadge({
          lessonParts,
          narrationLanguagePreference,
          voiceSourcePreference,
          preferredBrowserVoice,
          isPreparingOpenSourceVoice,
          isOpenSourceVoiceReady,
          shouldUseBrowserFallback
        });
        showPrepareStepSpeechButton({
          lessonParts,
          isPreparingOpenSourceVoice,
          isOpenSourceVoiceReady,
          shouldUseBrowserFallback
        });
        showNarrationStatus(`Open-source Piper glas nije uspeo za ${readNarrationLanguageLabel(narrationLanguagePreference)} naraciju.`);
      }
    }

    return speakWithBrowserVoice({
      ownerWindow,
      text: narrationText,
      speechRate,
      onStatusChange: showNarrationStatus,
      narrationLanguagePreference,
      preferredVoiceUri: browserVoiceUriPreference
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
      isStartingNarration,
      isPreparingOpenSourceVoice
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
      isStartingNarration,
      isPreparingOpenSourceVoice
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
      isStartingNarration,
      isPreparingOpenSourceVoice
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

    showVoiceStatusSummary({
      lessonParts,
      narrationLanguagePreference,
      voiceSourcePreference,
      preferredBrowserVoice,
      browserVoiceChoices,
      isOpenSourceVoiceReady,
      shouldUseBrowserFallback
    });
  }

  async function refreshVoiceAvailability() {
    try {
      browserVoiceChoices = await readBrowserVoiceChoices(ownerWindow, narrationLanguagePreference);
    } catch {
      browserVoiceChoices = [];
    }

    try {
      preferredBrowserVoice = await readPreferredBrowserVoice(
        ownerWindow,
        narrationLanguagePreference,
        browserVoiceUriPreference
      );
    } catch {
      preferredBrowserVoice = null;
    }

    try {
      isOpenSourceVoiceReady = await readOpenSourceVoiceAvailability(narrationLanguagePreference);
    } catch {
      isOpenSourceVoiceReady = false;
    }

    showBrowserVoiceChoices({
      lessonParts,
      browserVoiceChoices,
      browserVoiceUriPreference,
      voiceSourcePreference,
      narrationLanguagePreference
    });
    showVoiceBadge({
      lessonParts,
      narrationLanguagePreference,
      voiceSourcePreference,
      preferredBrowserVoice,
      isPreparingOpenSourceVoice,
      isOpenSourceVoiceReady,
      shouldUseBrowserFallback
    });
    showPrepareStepSpeechButton({
      lessonParts,
      isPreparingOpenSourceVoice,
      isOpenSourceVoiceReady,
      shouldUseBrowserFallback
    });
    showVoiceStatusSummary({
      lessonParts,
      narrationLanguagePreference,
      voiceSourcePreference,
      preferredBrowserVoice,
      browserVoiceChoices,
      isOpenSourceVoiceReady,
      shouldUseBrowserFallback
    });
  }

  async function prepareCurrentOpenSourceVoice(options = {}) {
    const { forceRetry = false } = options;

    if (forceRetry) {
      shouldUseBrowserFallback = false;
    }

    if (openSourceVoicePreparationPromise) {
      return openSourceVoicePreparationPromise;
    }

    if (isOpenSourceVoiceReady && !forceRetry) {
      return;
    }

    isPreparingOpenSourceVoice = true;
    showVoiceBadge({
      lessonParts,
      narrationLanguagePreference,
      voiceSourcePreference,
      preferredBrowserVoice,
      isPreparingOpenSourceVoice,
      isOpenSourceVoiceReady,
      shouldUseBrowserFallback
    });
    showPrepareStepSpeechButton({
      lessonParts,
      isPreparingOpenSourceVoice,
      isOpenSourceVoiceReady,
      shouldUseBrowserFallback
    });
    showStepSpeechControls({
      lessonParts,
      activeNarration,
      isStartingNarration,
      isPreparingOpenSourceVoice
    });

    openSourceVoicePreparationPromise = prepareOpenSourceVoice({
      narrationLanguagePreference,
      onStatusChange(statusText) {
        showStepSpeechStatus(lessonParts, statusText);
      }
    })
      .then(() => {
        isOpenSourceVoiceReady = true;
        shouldUseBrowserFallback = false;
      })
      .catch(error => {
        isOpenSourceVoiceReady = false;
        throw error;
      })
      .finally(() => {
        isPreparingOpenSourceVoice = false;
        openSourceVoicePreparationPromise = null;
        showVoiceBadge({
          lessonParts,
          narrationLanguagePreference,
          voiceSourcePreference,
          preferredBrowserVoice,
          isPreparingOpenSourceVoice,
          isOpenSourceVoiceReady,
          shouldUseBrowserFallback
        });
        showPrepareStepSpeechButton({
          lessonParts,
          isPreparingOpenSourceVoice,
          isOpenSourceVoiceReady,
          shouldUseBrowserFallback
        });
        showStepSpeechControls({
          lessonParts,
          activeNarration,
          isStartingNarration,
          isPreparingOpenSourceVoice
        });
      });

    return openSourceVoicePreparationPromise;
  }

  return {
    initializeStepNarration,
    showCurrentStepNarration,
    stopCurrentStepNarration
  };
}
