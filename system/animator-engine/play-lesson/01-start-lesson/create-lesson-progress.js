export function createLessonProgress() {
  return {
    currentStepNumber: 0,
    playbackTimer: null,
    activePanel: 'steps',
    playbackSpeedMultiplier: 1,
  };
}
