import scriptMarkdown from '../../../product/education/lessons/02-build-top-navigation/source/lesson.script.md?raw';
import goalImage from '../../../product/education/lessons/02-build-top-navigation/source/assets/top-navigation-goal.svg';
import { compileRegisteredLessonScript } from './compile-registered-lesson-script.js';

export const BuildTopNavigationLesson = compileRegisteredLessonScript({
  scriptMarkdown,
  goalImageSrc: goalImage
});
