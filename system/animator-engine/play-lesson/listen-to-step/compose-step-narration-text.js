function readNarrationValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function composeStepNarrationText({ step, currentStepNumber, totalSteps }) {
  const sceneNarrationText = readNarrationValue(step?.narration);
  const stepDescriptionText = sceneNarrationText || readNarrationValue(step?.desc);
  const fragments = [
    `Korak ${currentStepNumber + 1} od ${totalSteps}.`,
    readNarrationValue(step?.title),
    stepDescriptionText,
  ];

  const proTipText = readNarrationValue(step?.proTip);

  if (proTipText) {
    fragments.push(`Pro tip. ${proTipText}`);
  }

  return fragments.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
}
