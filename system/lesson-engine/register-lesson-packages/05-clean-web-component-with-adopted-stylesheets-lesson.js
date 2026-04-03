import scriptMarkdown from '../../../product/education/lessons/05-clean-web-component-with-adopted-stylesheets/source/lesson.script.md?raw';
import goalImage from '../../../product/education/lessons/05-clean-web-component-with-adopted-stylesheets/source/assets/web-component-goal.svg';
import { compileRegisteredLessonScript } from './compile-registered-lesson-script.js';

export const CleanWebComponentWithAdoptedStylesheetsLesson = compileRegisteredLessonScript({
  scriptMarkdown,
  goalImageSrc: goalImage,
});
