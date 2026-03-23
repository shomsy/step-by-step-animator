import { presentLessonPicker } from '../choose-lesson/present-lesson-picker.js';
import { createLessonProgress } from './01-start-lesson/create-lesson-progress.js';
import { findLessonParts } from './01-start-lesson/find-lesson-parts.js';
import { showLessonShell } from './01-start-lesson/show-lesson-shell.js';
import { listenForLessonKeys } from './02-follow-lesson/listen-for-lesson-keys.js';
import { showActiveLessonPanel } from './02-follow-lesson/show-active-lesson-panel.js';
import { showCurrentStep } from './02-follow-lesson/show-current-step.js';
import { showStepTimeline } from './02-follow-lesson/show-step-timeline.js';
import { showGrowingCode } from './03-watch-code/show-growing-code.js';
import { showCurrentPreview } from './04-watch-preview/show-current-preview.js';
import { downloadLessonFiles } from './05-download-lesson-files/download-lesson-files.js';
import { chooseTheme } from './choose-theme/choose-theme.js';
import { presentStepFinder } from './find-step/present-step-finder.js';
import { rememberSavedSteps } from './save-step/remember-saved-steps.js';

export function playLesson({ ownerDocument, ownerLocation, ownerWindow, lesson, lessons }) {
  const lessonParts = findLessonParts(ownerDocument);
  const lessonProgress = createLessonProgress();

  showLessonShell({ ownerDocument, lessonParts, lesson });
  presentLessonPicker({
    lessonPicker: lessonParts.lessonPicker,
    lessons,
    currentLessonId: lesson.lessonId,
    ownerLocation,
    ownerWindow
  });

  const savedSteps = rememberSavedSteps({
    lessonId: lesson.lessonId,
    lessonParts,
    steps: lesson.steps,
    goToStepNumber,
    showCurrentLesson
  });

  const stepFinder = presentStepFinder({
    lessonParts,
    steps: lesson.steps,
    goToStepNumber
  });

  const themeChoice = chooseTheme({
    rootElement: ownerDocument.documentElement,
    themeButton: lessonParts.themeButton
  });

  lessonParts.nextButton.addEventListener('click', () => {
    pausePlayback();
    goToNextStep();
  });

  lessonParts.previousButton.addEventListener('click', () => {
    pausePlayback();
    goToPreviousStep();
  });

  lessonParts.playButton.addEventListener('click', startPlayback);
  lessonParts.pauseButton.addEventListener('click', pausePlayback);
  lessonParts.stopButton.addEventListener('click', stopPlayback);
  lessonParts.saveStepButton.addEventListener('click', () => {
    savedSteps.toggleSavedStepNumber(lessonProgress.currentStepNumber);
  });
  lessonParts.openStepFinderButton.addEventListener('click', stepFinder.openStepFinder);
  lessonParts.themeButton.addEventListener('click', themeChoice.toggleTheme);
  lessonParts.downloadFilesButton.addEventListener('click', () => {
    downloadLessonFiles({ lesson });
  });

  lessonParts.lessonPanelButtons.forEach(button => {
    button.addEventListener('click', () => {
      lessonProgress.activePanel = button.dataset.tab;
      showCurrentLesson();
    });
  });

  listenForLessonKeys({
    ownerDocument,
    hasOpenLessonDialog,
    goToNextStep,
    goToPreviousStep,
    togglePlayback,
    toggleSavedStep: () => savedSteps.toggleSavedStepNumber(lessonProgress.currentStepNumber),
    openStepFinder: stepFinder.openStepFinder,
    closeStepFinder: stepFinder.closeStepFinder
  });

  themeChoice.initializeTheme();
  showCurrentLesson();

  function hasOpenLessonDialog() {
    return stepFinder.isStepFinderOpen();
  }

  function goToStepNumber(stepNumber, options = {}) {
    const { showStepPanel = false } = options;
    const boundedStep = Math.max(0, Math.min(stepNumber, lesson.steps.length - 1));

    pausePlayback();
    lessonProgress.currentStepNumber = boundedStep;

    if (showStepPanel) {
      lessonProgress.activePanel = 'steps';
    }

    showCurrentLesson();
  }

  function goToNextStep() {
    if (lessonProgress.currentStepNumber < lesson.steps.length - 1) {
      lessonProgress.currentStepNumber += 1;
      lessonProgress.activePanel = 'steps';
      showCurrentLesson();
      return;
    }

    pausePlayback();
  }

  function goToPreviousStep() {
    if (lessonProgress.currentStepNumber === 0) {
      return;
    }

    lessonProgress.currentStepNumber -= 1;
    lessonProgress.activePanel = 'steps';
    showCurrentLesson();
  }

  function startPlayback() {
    if (lessonProgress.playbackTimer || lessonProgress.currentStepNumber === lesson.steps.length - 1) {
      return;
    }

    lessonProgress.playbackTimer = window.setInterval(goToNextStep, 4000);
    updatePlaybackControls();
  }

  function pausePlayback() {
    if (!lessonProgress.playbackTimer) {
      updatePlaybackControls();
      return;
    }

    window.clearInterval(lessonProgress.playbackTimer);
    lessonProgress.playbackTimer = null;
    updatePlaybackControls();
  }

  function togglePlayback() {
    if (lessonProgress.playbackTimer) {
      pausePlayback();
      return;
    }

    startPlayback();
  }

  function stopPlayback() {
    pausePlayback();
    lessonProgress.currentStepNumber = 0;
    lessonProgress.activePanel = 'steps';
    showCurrentLesson();
  }

  function updatePlaybackControls() {
    const isPlaying = Boolean(lessonProgress.playbackTimer);
    const isAtLastStep = lessonProgress.currentStepNumber === lesson.steps.length - 1;

    lessonParts.playButton.disabled = isPlaying || isAtLastStep;
    lessonParts.pauseButton.disabled = !isPlaying;
    lessonParts.stopButton.disabled = !isPlaying && lessonProgress.currentStepNumber === 0;
  }

  function showCurrentLesson() {
    const step = lesson.steps[lessonProgress.currentStepNumber];
    const savedStepNumbers = savedSteps.listSavedStepNumbers();

    showCurrentPreview({
      lessonParts,
      lesson,
      currentStepNumber: lessonProgress.currentStepNumber
    });

    showCurrentStep({
      lessonParts,
      step,
      currentStepNumber: lessonProgress.currentStepNumber,
      totalSteps: lesson.steps.length
    });

    showStepTimeline({
      lessonParts,
      steps: lesson.steps,
      currentStepNumber: lessonProgress.currentStepNumber,
      savedStepNumbers,
      goToStepNumber: stepNumber => {
        goToStepNumber(stepNumber, { showStepPanel: true });
      }
    });

    showGrowingCode({
      lessonParts,
      step,
      currentStepNumber: lessonProgress.currentStepNumber,
      buildHtmlAtStep: lesson.buildHtmlAtStep,
      buildCssAtStep: lesson.buildCssAtStep,
      buildJsAtStep: lesson.buildJsAtStep,
      buildShadowCssAtStep: lesson.buildShadowCssAtStep
    });

    savedSteps.showSavedStepList(lessonProgress.currentStepNumber);
    showActiveLessonPanel(lessonParts, lessonProgress.activePanel);
    updatePlaybackControls();
  }
}
