import scriptMarkdown from '../../../product/education/lessons/04-build-web-component/source/lesson.script.md?raw';
import goalImage from '../../../product/education/lessons/04-build-web-component/source/assets/web-component-goal.svg';
import { compileRegisteredLessonScript } from './compile-registered-lesson-script.js';

export const BuildWebComponentLesson = compileRegisteredLessonScript({
  scriptMarkdown,
  goalImageSrc: goalImage
});
