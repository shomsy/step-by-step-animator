import './animator/play-lesson/lesson-player.css';
import { selectLessonFromLocation } from './animator/choose-lesson/select-lesson-from-location.js';
import { playLesson } from './animator/play-lesson/play-lesson.pipeline.js';
import { registeredLessons } from './lessons/register-lessons.js';

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
