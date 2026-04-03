void bootstrap().catch((error) => {
  console.error(error);
});

function readActivePlayerLessonId(ownerDocument, fallbackLessonId = '') {
  const lessonPicker = ownerDocument.getElementById('lessonPicker');

  if (lessonPicker instanceof HTMLSelectElement) {
    return lessonPicker.value.trim() || fallbackLessonId;
  }

  return fallbackLessonId;
}

async function bootstrap() {
  const { readAuthoringLocationState, buildAuthoringLessonEditorUrl } =
    await import('../../system/author-lessons/authoring-location.js');
  const activeAuthoringLocation = readAuthoringLocationState(window.location);

  if (activeAuthoringLocation.isAuthoringLocation) {
    await import('../../system/author-lessons/authoring-workspace.css');
    const { showAuthoringWorkspace } =
      await import('../../system/author-lessons/show-authoring-workspace.js');

    await showAuthoringWorkspace({
      ownerDocument: document,
      ownerLocation: window.location,
      ownerWindow: window,
    });
    return;
  }

  await import('../../system/animator-engine/play-lesson/lesson-player.css');

  const [{ playLesson }, { selectLessonFromLocation }, { readPlayableDraftOverride }] =
    await Promise.all([
      import('../../system/animator-engine/play-lesson/play-lesson.pipeline.js'),
      import('../../system/animator-engine/choose-lesson/select-lesson-from-location.js'),
      import('../../system/author-lessons/read-playable-draft-override.js'),
    ]);
  const lessonSelection = await selectLessonFromLocation({
    ownerLocation: window.location,
    ownerWindow: window,
    resolveDraftLessonOverride: readPlayableDraftOverride,
  });
  const authoringButton = document.getElementById('authoringBtn');

  if (authoringButton) {
    authoringButton.addEventListener('click', () => {
      window.location.href = buildAuthoringLessonEditorUrl(
        window.location,
        readActivePlayerLessonId(document, lessonSelection.lesson?.lessonId || '')
      );
    });
  }

  playLesson({
    ownerDocument: document,
    ownerLocation: window.location,
    ownerWindow: window,
    lessons: lessonSelection.lessons,
    lesson: lessonSelection.lesson,
  });
}
