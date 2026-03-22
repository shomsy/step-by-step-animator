import './lesson-player/play-lesson/lesson-player.css';
import { selectLessonFromLocation } from './lesson-player/select-lesson-from-location.js';
import { playLesson } from './lesson-player/play-lesson/play-lesson.pipeline.js';

const selectedLesson = selectLessonFromLocation({
  ownerLocation: window.location
});

playLesson({
  ownerDocument: document,
  lesson: selectedLesson
});
