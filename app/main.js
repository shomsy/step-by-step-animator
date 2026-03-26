import '../animator-engine/play-lesson/lesson-player.css';
import { selectLessonFromLocation } from '../animator-engine/choose-lesson/select-lesson-from-location.js';
import { playLesson } from '../animator-engine/play-lesson/play-lesson.pipeline.js';
import { registeredLessons } from '../lesson-engine/register-lesson-packages/index.js';

const selectedLesson = selectLessonFromLocation({
  ownerLocation: window.location
});

playLesson({
  ownerDocument: document,
  ownerLocation: window.location,
  ownerWindow: window,
  lessons: registeredLessons,
  lesson: selectedLesson
});
