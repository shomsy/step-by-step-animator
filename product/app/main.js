void bootstrap().catch(error => {
  console.error(error);
});

async function bootstrap() {
  const activeUrl = new URL(window.location.href);
  const activeWorkspace = activeUrl.searchParams.get('workspace');

  if (activeWorkspace === 'authoring') {
    await import('../../system/author-lessons/authoring-workspace.css');
    const { showAuthoringWorkspace } = await import('../../system/author-lessons/show-authoring-workspace.js');

    await showAuthoringWorkspace({
      ownerDocument: document,
      ownerLocation: window.location,
      ownerWindow: window
    });
    return;
  }

  await import('../../system/animator-engine/play-lesson/lesson-player.css');

  const [{ playLesson }, { selectLessonFromLocation }, { readPlayableDraftOverride }] = await Promise.all([
    import('../../system/animator-engine/play-lesson/play-lesson.pipeline.js'),
    import('../../system/animator-engine/choose-lesson/select-lesson-from-location.js'),
    import('../../system/author-lessons/read-playable-draft-override.js')
  ]);
  const lessonSelection = await selectLessonFromLocation({
    ownerLocation: window.location,
    ownerWindow: window,
    resolveDraftLessonOverride: readPlayableDraftOverride
  });
  const authoringButton = document.getElementById('authoringBtn');

  if (authoringButton) {
    authoringButton.addEventListener('click', () => {
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set('workspace', 'authoring');
      window.location.href = nextUrl.toString();
    });
  }

  playLesson({
    ownerDocument: document,
    ownerLocation: window.location,
    ownerWindow: window,
    lessons: lessonSelection.lessons,
    lesson: lessonSelection.lesson
  });
}
