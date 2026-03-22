function composeStepTagMarkup(tag) {
  return `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg> ${tag}`;
}

export function showCurrentStep({ lessonParts, step, currentStepNumber, totalSteps }) {
  const progressPercent = ((currentStepNumber + 1) / totalSteps) * 100;
  const remainingMinutes = Math.ceil((totalSteps - currentStepNumber - 1) * 0.1);

  lessonParts.stepTitle.innerHTML = step.title + (currentStepNumber === totalSteps - 1 ? ' <span class="badge">GOTOV</span>' : '');
  lessonParts.stepDescription.textContent = step.desc;
  lessonParts.stepNumber.textContent = `Prizor ${currentStepNumber + 1} / ${totalSteps}`;
  lessonParts.tagText.innerHTML = composeStepTagMarkup(step.tag);
  lessonParts.proTipText.textContent = step.proTip;
  lessonParts.progressBar.style.width = `${progressPercent}%`;
  lessonParts.progressText.textContent = `${Math.round(progressPercent)}% završeno`;
  lessonParts.timeEstimate.textContent = remainingMinutes > 0 ? `~${remainingMinutes} min preostalo` : 'Završeno!';
  lessonParts.previousButton.disabled = currentStepNumber === 0;
  lessonParts.nextButton.disabled = currentStepNumber === totalSteps - 1;
}
