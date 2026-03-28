import test from 'node:test';
import assert from 'node:assert/strict';
import { readStepNarrationController } from '../../system/animator-engine/play-lesson/listen-to-step/read-step-narration-controller.js';

function readNarrationLanguageLabel(narrationLanguagePreference) {
  return narrationLanguagePreference === 'hr' ? 'hrvatski' : 'srpski';
}

function createNarrationController(providerLabel) {
  return {
    providerLabel,
    supportsLiveRateChange: false,
    whenFinished: Promise.resolve(),
    isPaused() {
      return false;
    },
    pause() {},
    resume() {
      return Promise.resolve();
    },
    setRate() {},
    stop() {}
  };
}

test('readStepNarrationController keeps the preferred browser voice on the browser path', async () => {
  const browserController = createNarrationController('browser');
  const calls = [];

  const result = await readStepNarrationController({
    ownerWindow: {},
    narrationText: 'Korak 1.',
    speechRate: 1,
    narrationLanguagePreference: 'sr',
    voiceSourcePreference: 'browser',
    preferredBrowserVoice: { voiceURI: 'sr-browser-voice' },
    browserVoiceUriPreference: 'sr-browser-voice',
    readNarrationLanguageLabel,
    prepareOpenSourceVoice: async () => {
      calls.push('prepare-open-source');
    },
    speakWithOpenSourceVoice: async () => {
      calls.push('speak-open-source');
      return createNarrationController('open-source');
    },
    speakWithBrowserVoice: async input => {
      calls.push({
        type: 'browser',
        preferredVoiceUri: input.preferredVoiceUri,
        allowGenericBrowserVoiceFallback: input.allowGenericBrowserVoiceFallback
      });
      return browserController;
    },
    onStatusChange() {}
  });

  assert.equal(result.controller, browserController);
  assert.equal(result.nextShouldUseBrowserFallback, false);
  assert.equal(result.nextOpenSourceVoiceReady, undefined);
  assert.deepEqual(calls, [
    {
      type: 'browser',
      preferredVoiceUri: 'sr-browser-voice',
      allowGenericBrowserVoiceFallback: false
    }
  ]);
});

test('readStepNarrationController promotes the browser request to Piper when no local voice exists', async () => {
  const openSourceController = createNarrationController('open-source');
  const calls = [];
  const statuses = [];

  const result = await readStepNarrationController({
    ownerWindow: {},
    narrationText: 'Korak 2.',
    speechRate: 1,
    narrationLanguagePreference: 'sr',
    voiceSourcePreference: 'browser',
    preferredBrowserVoice: null,
    browserVoiceUriPreference: '',
    readNarrationLanguageLabel,
    prepareOpenSourceVoice: async () => {
      calls.push('prepare-open-source');
    },
    speakWithOpenSourceVoice: async input => {
      calls.push({
        type: 'open-source',
        narrationLanguagePreference: input.narrationLanguagePreference
      });
      return openSourceController;
    },
    speakWithBrowserVoice: async () => {
      calls.push('browser');
      return createNarrationController('browser');
    },
    onStatusChange(statusText) {
      statuses.push(statusText);
    }
  });

  assert.equal(result.controller, openSourceController);
  assert.equal(result.nextOpenSourceVoiceReady, true);
  assert.equal(result.nextShouldUseBrowserFallback, false);
  assert.deepEqual(calls, [
    'prepare-open-source',
    {
      type: 'open-source',
      narrationLanguagePreference: 'sr'
    }
  ]);
  assert.match(statuses[0], /Nema lokalnog srpski sistemskog glasa/);
});

test('readStepNarrationController falls back to the browser voice when Piper fails but a local voice exists', async () => {
  const browserController = createNarrationController('browser');
  const calls = [];
  const statuses = [];

  const result = await readStepNarrationController({
    ownerWindow: {},
    narrationText: 'Korak 3.',
    speechRate: 1,
    narrationLanguagePreference: 'hr',
    voiceSourcePreference: 'open-source',
    preferredBrowserVoice: { voiceURI: 'hr-browser-voice' },
    browserVoiceUriPreference: 'hr-browser-voice',
    readNarrationLanguageLabel,
    prepareOpenSourceVoice: async () => {
      calls.push('prepare-open-source');
      throw new Error('Piper unavailable');
    },
    speakWithOpenSourceVoice: async () => {
      calls.push('open-source');
      return createNarrationController('open-source');
    },
    speakWithBrowserVoice: async input => {
      calls.push({
        type: 'browser',
        preferredVoiceUri: input.preferredVoiceUri,
        allowGenericBrowserVoiceFallback: input.allowGenericBrowserVoiceFallback
      });
      return browserController;
    },
    onStatusChange(statusText) {
      statuses.push(statusText);
    }
  });

  assert.equal(result.controller, browserController);
  assert.equal(result.nextOpenSourceVoiceReady, false);
  assert.equal(result.nextShouldUseBrowserFallback, true);
  assert.deepEqual(calls, [
    'prepare-open-source',
    {
      type: 'browser',
      preferredVoiceUri: 'hr-browser-voice',
      allowGenericBrowserVoiceFallback: false
    }
  ]);
  assert.match(statuses.at(-1), /Prelazim na sistemski glas/);
});

test('readStepNarrationController fails closed when neither Piper nor a local voice is available', async () => {
  await assert.rejects(() => readStepNarrationController({
    ownerWindow: {},
    narrationText: 'Korak 4.',
    speechRate: 1,
    narrationLanguagePreference: 'sr',
    voiceSourcePreference: 'open-source',
    preferredBrowserVoice: null,
    browserVoiceUriPreference: '',
    readNarrationLanguageLabel,
    prepareOpenSourceVoice: async () => {
      throw new Error('Piper unavailable');
    },
    speakWithOpenSourceVoice: async () => {
      throw new Error('should not speak with Piper');
    },
    speakWithBrowserVoice: async () => {
      throw new Error('should not fall back to the browser voice');
    },
    onStatusChange() {}
  }), /open-source Piper trenutno nije uspeo/);
});
