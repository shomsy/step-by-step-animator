import scriptMarkdown from '../../../product/education/lessons/01-build-sidebar/source/lesson.script.md?raw';
import { compileRegisteredLessonScript } from './compile-registered-lesson-script.js';

export const BuildSidebarLesson = compileRegisteredLessonScript({
  scriptMarkdown,
});
