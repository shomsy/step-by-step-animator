import './animator-engine/play-lesson/lesson-player.css';
import { selectLessonFromLocation } from './animator-engine/choose-lesson/select-lesson-from-location.js';
import { playLesson } from './animator-engine/play-lesson/play-lesson.js';
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
