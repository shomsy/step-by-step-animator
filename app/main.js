import '../animator-engine/play-lesson/lesson-player.css';
import { selectLessonFromLocation } from '../animator-engine/choose-lesson/select-lesson-from-location.js';

void bootstrap().catch(error => {
  console.error(error);
});

async function bootstrap() {
  const [{ playLesson }, lessonSelection] = await Promise.all([
    import('../animator-engine/play-lesson/play-lesson.pipeline.js'),
    selectLessonFromLocation({
      ownerLocation: window.location
    })
  ]);

  playLesson({
    ownerDocument: document,
    ownerLocation: window.location,
    ownerWindow: window,
    lessons: lessonSelection.lessons,
    lesson: lessonSelection.lesson
  });
}
