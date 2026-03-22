import './teach-lessons/teach-lesson/lesson-shell.css';
import { findSelectedLesson } from './teach-lessons/find-selected-lesson.js';
import { listLessons } from './teach-lessons/list-lessons.js';
import { teachLesson } from './teach-lessons/teach-lesson/teach-lesson.pipeline.js';

const selectedLesson = findSelectedLesson({
  ownerLocation: window.location,
  lessons: listLessons()
});

teachLesson({
  ownerDocument: document,
  lesson: selectedLesson
});
