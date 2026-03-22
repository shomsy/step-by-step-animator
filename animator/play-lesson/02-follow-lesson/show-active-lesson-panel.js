export function showActiveLessonPanel(lessonParts, activePanel) {
  lessonParts.stepPanel.hidden = activePanel !== 'steps';
  lessonParts.savedStepsPanel.hidden = activePanel !== 'bookmarks';

  lessonParts.lessonPanelButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.tab === activePanel);
  });
}
