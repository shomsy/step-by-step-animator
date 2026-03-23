function readRequiredElement(ownerDocument, id) {
  const element = ownerDocument.getElementById(id);

  if (!element) {
    throw new Error(`Missing required element: #${id}`);
  }

  return element;
}

function readRequiredSelector(ownerDocument, selector) {
  const element = ownerDocument.querySelector(selector);

  if (!element) {
    throw new Error(`Missing required element: ${selector}`);
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
    playbackSpeedSlider: readRequiredElement(ownerDocument, 'playbackSpeedSlider'),
    playbackSpeedValue: readRequiredElement(ownerDocument, 'playbackSpeedValue'),
    speakStepButton: readRequiredElement(ownerDocument, 'speakStepBtn'),
    pauseStepSpeechButton: readRequiredElement(ownerDocument, 'pauseStepSpeechBtn'),
    stopStepSpeechButton: readRequiredElement(ownerDocument, 'stopStepSpeechBtn'),
    prepareStepSpeechButton: readRequiredElement(ownerDocument, 'prepareStepSpeechBtn'),
    autoSpeakStepToggle: readRequiredElement(ownerDocument, 'autoSpeakStepToggle'),
    stepSpeechBadge: readRequiredElement(ownerDocument, 'stepSpeechBadge'),
    stepSpeechLanguageSelect: readRequiredElement(ownerDocument, 'stepSpeechLanguageSelect'),
    stepSpeechSourceSelect: readRequiredElement(ownerDocument, 'stepSpeechSourceSelect'),
    stepSpeechBrowserVoiceSelect: readRequiredElement(ownerDocument, 'stepSpeechBrowserVoiceSelect'),
    stepSpeechSpeedSlider: readRequiredElement(ownerDocument, 'stepSpeechSpeedSlider'),
    stepSpeechSpeedValue: readRequiredElement(ownerDocument, 'stepSpeechSpeedValue'),
    stepSpeechStatus: readRequiredElement(ownerDocument, 'stepSpeechStatus'),
    saveStepButton: readRequiredElement(ownerDocument, 'bookmarkBtn'),
    savedStepCount: readRequiredElement(ownerDocument, 'bookmarkCount'),
    stepFinderModal: readRequiredElement(ownerDocument, 'searchModal'),
    stepFinderInput: readRequiredElement(ownerDocument, 'searchInput'),
    stepFinderResults: readRequiredElement(ownerDocument, 'searchResults'),
    themeButton: readRequiredElement(ownerDocument, 'themeBtn'),
    downloadFilesButton: readRequiredElement(ownerDocument, 'downloadBtn'),
    openStepFinderButton: readRequiredElement(ownerDocument, 'searchBtn'),
    stepPanel: readRequiredElement(ownerDocument, 'stepsPanel'),
    savedStepsPanel: readRequiredElement(ownerDocument, 'bookmarksPanel'),
    savedStepList: readRequiredElement(ownerDocument, 'bookmarkList'),
    savedStepEmptyState: readRequiredElement(ownerDocument, 'bookmarkEmpty'),
    savedStepSummary: readRequiredElement(ownerDocument, 'bookmarkSummary'),
    liveEditorPanel: readRequiredSelector(ownerDocument, '.live-editor-panel'),
    liveEditorBody: readRequiredElement(ownerDocument, 'liveEditorBody'),
    htmlCodePane: readRequiredElement(ownerDocument, 'liveHtmlPane'),
    cssCodePane: readRequiredElement(ownerDocument, 'liveCssPane'),
    jsPane: readRequiredElement(ownerDocument, 'jsPane'),
    jsCodePane: readRequiredElement(ownerDocument, 'liveJsPane'),
    htmlPane: readRequiredElement(ownerDocument, 'htmlPane'),
    cssPane: readRequiredElement(ownerDocument, 'cssPane'),
    templateJsPane: readRequiredElement(ownerDocument, 'templateJsPane'),
    templateJsCodePane: readRequiredElement(ownerDocument, 'liveTemplateJsPane'),
    templateJsFileLabel: readRequiredElement(ownerDocument, 'templateJsFileLabel'),
    shadowCssPane: readRequiredElement(ownerDocument, 'shadowCssPane'),
    shadowCssCodePane: readRequiredElement(ownerDocument, 'liveShadowCssPane'),
    htmlFileLabel: readRequiredElement(ownerDocument, 'htmlFileLabel'),
    cssFileLabel: readRequiredElement(ownerDocument, 'cssFileLabel'),
    jsFileLabel: readRequiredElement(ownerDocument, 'jsFileLabel'),
    shadowCssFileLabel: readRequiredElement(ownerDocument, 'shadowCssFileLabel'),
    ideFileList: readRequiredElement(ownerDocument, 'ideFileList'),
    currentStepBadge: readRequiredElement(ownerDocument, 'liveStepBadge'),
    lessonPanelButtons: [...ownerDocument.querySelectorAll('.tab-btn')]
  };
}
