import scriptMarkdown from '../../../product/education/lessons/03-build-custom-element/source/lesson.script.md?raw';
import goalImage from '../../../product/education/lessons/03-build-custom-element/source/assets/custom-element-goal.svg';
import { compileRegisteredLessonScript } from './compile-registered-lesson-script.js';

export const BuildCustomElementLesson = compileRegisteredLessonScript({
  scriptMarkdown,
  goalImageSrc: goalImage
});
