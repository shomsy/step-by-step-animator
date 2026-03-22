import './animator/play-lesson/lesson-player.css';
import { selectLessonFromLocation } from './animator/choose-lesson/select-lesson-from-location.js';
import { playLesson } from './animator/play-lesson/play-lesson.pipeline.js';

const selectedLesson = selectLessonFromLocation({
  ownerLocation: window.location
});

playLesson({
  ownerDocument: document,
  lesson: selectedLesson
});
