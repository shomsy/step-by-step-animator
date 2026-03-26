import test from 'node:test';
import assert from 'node:assert/strict';
import { composeStepNarrationText } from '../../system/animator-engine/play-lesson/listen-to-step/compose-step-narration-text.js';

test('composeStepNarrationText prefers scene narration and appends the pro tip', () => {
  const text = composeStepNarrationText({
    step: {
      title: 'Add sidebar shell',
      narration: 'First, we introduce the smallest possible sidebar shell.',
      proTip: 'Keep the first step as small as possible.'
    },
    currentStepNumber: 1,
    totalSteps: 3
  });

  assert.equal(
    text,
    'Korak 2 od 3. Add sidebar shell First, we introduce the smallest possible sidebar shell. Pro tip. Keep the first step as small as possible.'
  );
});

test('composeStepNarrationText falls back to the legacy description field', () => {
  const text = composeStepNarrationText({
    step: {
      title: 'Add sidebar shell',
      desc: 'Introduce the base sidebar container.'
    },
    currentStepNumber: 0,
    totalSteps: 1
  });

  assert.equal(text, 'Korak 1 od 1. Add sidebar shell Introduce the base sidebar container.');
});
