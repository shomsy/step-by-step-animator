import { escapeInlineText } from '../escape-inline-text.js';

function composeStepTagMarkup(tag) {
  if (!tag) {
    return '';
  }

  return `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg> ${escapeInlineText(tag)}`;
}

export function showCurrentStep({ lessonParts, step, currentStepNumber, totalSteps }) {
  const progressPercent = ((currentStepNumber + 1) / totalSteps) * 100;
  const remainingMinutes = Math.ceil((totalSteps - currentStepNumber - 1) * 0.1);
  const titleText = typeof step.title === 'string' ? step.title : '';
  const descText = typeof step.desc === 'string' ? step.desc : '';
  const tagText = typeof step.tag === 'string' ? step.tag : '';
  const proTipText = typeof step.proTip === 'string' ? step.proTip : '';

  lessonParts.stepTitle.textContent = titleText;

  if (currentStepNumber === totalSteps - 1) {
    const badge = lessonParts.ownerDocument.createElement('span');
    badge.className = 'badge';
    badge.textContent = 'GOTOV';
    lessonParts.stepTitle.append(' ', badge);
  }

  lessonParts.stepDescription.textContent = descText;
  lessonParts.stepNumber.textContent = `Prizor ${currentStepNumber + 1} / ${totalSteps}`;
  lessonParts.tagText.innerHTML = composeStepTagMarkup(tagText);
  lessonParts.tagText.hidden = !tagText;
  lessonParts.proTipText.textContent = proTipText;
  lessonParts.progressBar.style.width = `${progressPercent}%`;
  lessonParts.progressText.textContent = `${Math.round(progressPercent)}% završeno`;
  lessonParts.timeEstimate.textContent =
    remainingMinutes > 0 ? `~${remainingMinutes} min preostalo` : 'Završeno!';
  lessonParts.previousButton.disabled = currentStepNumber === 0;
  lessonParts.nextButton.disabled = currentStepNumber === totalSteps - 1;
}
