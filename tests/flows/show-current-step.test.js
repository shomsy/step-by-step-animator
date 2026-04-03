import test from 'node:test';
import assert from 'node:assert/strict';
import { showCurrentStep } from '../../system/animator-engine/play-lesson/02-follow-lesson/show-current-step.js';

function createLessonParts() {
  return {
    stepTitle: { textContent: '', append() {} },
    stepDescription: { textContent: '' },
    stepNumber: { textContent: '' },
    tagText: { innerHTML: '', hidden: false },
    proTipText: { textContent: '' },
    progressBar: { style: { width: '' } },
    progressText: { textContent: '' },
    timeEstimate: { textContent: '' },
    previousButton: { disabled: false },
    nextButton: { disabled: false },
  };
}

test('showCurrentStep escapes tag text before writing markup', () => {
  const lessonParts = createLessonParts();

  showCurrentStep({
    lessonParts,
    step: {
      title: 'Step title',
      desc: 'Step description',
      tag: '<img src=x onerror=alert(1)>',
      proTip: 'Pro tip',
    },
    currentStepNumber: 0,
    totalSteps: 2,
  });

  assert.equal(lessonParts.tagText.hidden, false);
  assert.equal(lessonParts.tagText.innerHTML.includes('<img'), false);
  assert.match(lessonParts.tagText.innerHTML, /&lt;img src=x onerror=alert\(1\)&gt;/);
});
