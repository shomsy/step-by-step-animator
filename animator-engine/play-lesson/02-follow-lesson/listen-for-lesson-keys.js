function isTypingSurface(target) {
  return target instanceof HTMLElement && (
    target.matches('input, textarea, select') ||
    target.isContentEditable
  );
}

export function listenForLessonKeys({
  ownerDocument,
  hasOpenLessonDialog,
  goToNextStep,
  goToPreviousStep,
  togglePlayback,
  toggleSavedStep,
  openStepFinder,
  closeStepFinder
}) {
  ownerDocument.addEventListener('keydown', event => {
    const typing = isTypingSurface(ownerDocument.activeElement);

    if (!typing && !hasOpenLessonDialog() && event.key === 'ArrowRight') {
      goToNextStep();
    }

    if (!typing && !hasOpenLessonDialog() && event.key === 'ArrowLeft') {
      goToPreviousStep();
    }

    if (!typing && !hasOpenLessonDialog() && event.key === ' ') {
      event.preventDefault();
      togglePlayback();
    }

    if (!typing && !hasOpenLessonDialog() && event.key === 'b' && !event.ctrlKey && !event.metaKey) {
      toggleSavedStep();
    }

    if (event.key === 'k' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      openStepFinder();
    }

    if (event.key === 'Escape') {
      closeStepFinder();
    }
  });
}
