export function showStepTimeline({
  lessonParts,
  steps,
  currentStepNumber,
  savedStepNumbers,
  goToStepNumber,
}) {
  lessonParts.stepTimeline.innerHTML = '';

  steps.forEach((_, index) => {
    const dot = lessonParts.ownerDocument.createElement('div');
    dot.className =
      'dot' +
      (index === currentStepNumber ? ' active' : '') +
      (savedStepNumbers.includes(index) ? ' bookmarked' : '');

    dot.addEventListener('click', () => {
      goToStepNumber(index);
    });

    lessonParts.stepTimeline.appendChild(dot);
  });
}
