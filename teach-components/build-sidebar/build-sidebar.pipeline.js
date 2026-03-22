import { findLessonParts } from './01-start-lesson/find-lesson-parts.js';
import { createLessonProgress } from './01-start-lesson/create-lesson-progress.js';
import { lessonStepScript } from './02-follow-lesson/lesson-step-script.js';
import { knowledgeCheckQuestions } from './05-check-understanding/knowledge-check-questions.js';
import { buildHtmlAtStep } from './03-watch-code/build-html-at-step.js';
import { buildCssAtStep } from './03-watch-code/build-css-at-step.js';
import { showGrowingCode } from './03-watch-code/show-growing-code.js';
import { showCurrentStep } from './02-follow-lesson/show-current-step.js';
import { showStepTimeline } from './02-follow-lesson/show-step-timeline.js';
import { showCurrentSidebar } from './04-watch-sidebar/show-current-sidebar.js';
import { showActiveLessonPanel } from './02-follow-lesson/show-active-lesson-panel.js';
import { rememberSavedSteps } from './save-step/remember-saved-steps.js';
import { presentStepFinder } from './find-step/present-step-finder.js';
import { presentKnowledgeCheck } from './05-check-understanding/present-knowledge-check.js';
import { chooseTheme } from './choose-theme/choose-theme.js';
import { listenForLessonKeys } from './02-follow-lesson/listen-for-lesson-keys.js';
import { downloadSidebarFiles } from './06-download-sidebar-files/download-sidebar-files.js';

export function teachBuildSidebar(ownerDocument) {
  const lessonParts = findLessonParts(ownerDocument);
  const lessonProgress = createLessonProgress();

  const savedSteps = rememberSavedSteps({
    lessonParts,
    steps: lessonStepScript,
    goToStepNumber,
    showCurrentLesson
  });

  const stepFinder = presentStepFinder({
    lessonParts,
    steps: lessonStepScript,
    goToStepNumber
  });

  const knowledgeCheck = presentKnowledgeCheck({
    lessonParts,
    knowledgeCheckQuestions
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
  lessonParts.openKnowledgeCheckButton.addEventListener('click', knowledgeCheck.openKnowledgeCheck);
  lessonParts.themeButton.addEventListener('click', themeChoice.toggleTheme);
  lessonParts.downloadFilesButton.addEventListener('click', () => {
    downloadSidebarFiles({
      steps: lessonStepScript,
      buildHtmlAtStep,
      buildCssAtStep
    });
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
    closeStepFinder: stepFinder.closeStepFinder,
    closeKnowledgeCheck: knowledgeCheck.closeKnowledgeCheck
  });

  themeChoice.initializeChosenTheme();
  showCurrentLesson();

  function hasOpenLessonDialog() {
    return stepFinder.isStepFinderOpen() || knowledgeCheck.isKnowledgeCheckOpen();
  }

  function goToStepNumber(stepNumber, options = {}) {
    const { showStepPanel = false } = options;
    const boundedStep = Math.max(0, Math.min(stepNumber, lessonStepScript.length - 1));

    pausePlayback();
    lessonProgress.currentStepNumber = boundedStep;

    if (showStepPanel) {
      lessonProgress.activePanel = 'steps';
    }

    showCurrentLesson();
  }

  function goToNextStep() {
    if (lessonProgress.currentStepNumber < lessonStepScript.length - 1) {
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
    if (lessonProgress.playbackTimer || lessonProgress.currentStepNumber === lessonStepScript.length - 1) {
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
    const isAtLastStep = lessonProgress.currentStepNumber === lessonStepScript.length - 1;

    lessonParts.playButton.disabled = isPlaying || isAtLastStep;
    lessonParts.pauseButton.disabled = !isPlaying;
    lessonParts.stopButton.disabled = !isPlaying && lessonProgress.currentStepNumber === 0;
  }

  function showCurrentLesson() {
    const step = lessonStepScript[lessonProgress.currentStepNumber];
    const savedStepNumbers = savedSteps.listSavedStepNumbers();

    showCurrentSidebar({
      lessonParts,
      currentStepNumber: lessonProgress.currentStepNumber,
      buildHtmlAtStep,
      buildCssAtStep
    });

    showCurrentStep({
      lessonParts,
      step,
      currentStepNumber: lessonProgress.currentStepNumber,
      totalSteps: lessonStepScript.length
    });

    showStepTimeline({
      lessonParts,
      steps: lessonStepScript,
      currentStepNumber: lessonProgress.currentStepNumber,
      savedStepNumbers,
      goToStepNumber: stepNumber => {
        goToStepNumber(stepNumber, { showStepPanel: true });
      }
    });

    showGrowingCode({
      lessonParts,
      currentStepNumber: lessonProgress.currentStepNumber,
      buildHtmlAtStep,
      buildCssAtStep
    });

    savedSteps.showSavedStepList(lessonProgress.currentStepNumber);
    showActiveLessonPanel(lessonParts, lessonProgress.activePanel);
    updatePlaybackControls();
  }
}
