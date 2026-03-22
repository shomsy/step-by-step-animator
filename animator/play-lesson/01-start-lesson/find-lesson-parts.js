function readRequiredElement(ownerDocument, id) {
  const element = ownerDocument.getElementById(id);

  if (!element) {
    throw new Error(`Missing required element: #${id}`);
  }

  return element;
}

export function findLessonParts(ownerDocument) {
  return {
    ownerDocument,
    lessonHeading: readRequiredElement(ownerDocument, 'lessonHeading'),
    lessonIntro: readRequiredElement(ownerDocument, 'lessonIntro'),
    lessonPicker: readRequiredElement(ownerDocument, 'lessonPicker'),
    lessonGoal: readRequiredElement(ownerDocument, 'lessonGoal'),
    goalHeading: readRequiredElement(ownerDocument, 'goalHeading'),
    goalCaption: readRequiredElement(ownerDocument, 'goalCaption'),
    goalImage: readRequiredElement(ownerDocument, 'goalImage'),
    goalHomework: readRequiredElement(ownerDocument, 'goalHomework'),
    goalHomeworkTitle: readRequiredElement(ownerDocument, 'goalHomeworkTitle'),
    goalHomeworkList: readRequiredElement(ownerDocument, 'goalHomeworkList'),
    livePreviewFrame: readRequiredElement(ownerDocument, 'livePreviewFrame'),
    previewAddress: readRequiredElement(ownerDocument, 'previewAddress'),
    stepTitle: readRequiredElement(ownerDocument, 'stepTitle'),
    stepDescription: readRequiredElement(ownerDocument, 'stepDesc'),
    stepNumber: readRequiredElement(ownerDocument, 'stepNumber'),
    progressBar: readRequiredElement(ownerDocument, 'progressBar'),
    progressText: readRequiredElement(ownerDocument, 'progressText'),
    timeEstimate: readRequiredElement(ownerDocument, 'timeEstimate'),
    stepTimeline: readRequiredElement(ownerDocument, 'dots'),
    tagText: readRequiredElement(ownerDocument, 'tagText'),
    proTipText: readRequiredElement(ownerDocument, 'proTipText'),
    nextButton: readRequiredElement(ownerDocument, 'nextBtn'),
    previousButton: readRequiredElement(ownerDocument, 'prevBtn'),
    playButton: readRequiredElement(ownerDocument, 'playBtn'),
    pauseButton: readRequiredElement(ownerDocument, 'pauseBtn'),
    stopButton: readRequiredElement(ownerDocument, 'stopBtn'),
    saveStepButton: readRequiredElement(ownerDocument, 'bookmarkBtn'),
    savedStepCount: readRequiredElement(ownerDocument, 'bookmarkCount'),
    stepFinderModal: readRequiredElement(ownerDocument, 'searchModal'),
    stepFinderInput: readRequiredElement(ownerDocument, 'searchInput'),
    stepFinderResults: readRequiredElement(ownerDocument, 'searchResults'),
    knowledgeCheckModal: readRequiredElement(ownerDocument, 'quizModal'),
    knowledgeCheckContent: readRequiredElement(ownerDocument, 'quizContent'),
    themeButton: readRequiredElement(ownerDocument, 'themeBtn'),
    downloadFilesButton: readRequiredElement(ownerDocument, 'downloadBtn'),
    openStepFinderButton: readRequiredElement(ownerDocument, 'searchBtn'),
    openKnowledgeCheckButton: readRequiredElement(ownerDocument, 'quizBtn'),
    stepPanel: readRequiredElement(ownerDocument, 'stepsPanel'),
    savedStepsPanel: readRequiredElement(ownerDocument, 'bookmarksPanel'),
    savedStepList: readRequiredElement(ownerDocument, 'bookmarkList'),
    savedStepEmptyState: readRequiredElement(ownerDocument, 'bookmarkEmpty'),
    savedStepSummary: readRequiredElement(ownerDocument, 'bookmarkSummary'),
    htmlCodePane: readRequiredElement(ownerDocument, 'liveHtmlPane'),
    cssCodePane: readRequiredElement(ownerDocument, 'liveCssPane'),
    htmlFileLabel: readRequiredElement(ownerDocument, 'htmlFileLabel'),
    cssFileLabel: readRequiredElement(ownerDocument, 'cssFileLabel'),
    currentStepBadge: readRequiredElement(ownerDocument, 'liveStepBadge'),
    lessonPanelButtons: [...ownerDocument.querySelectorAll('.tab-btn')]
  };
}
