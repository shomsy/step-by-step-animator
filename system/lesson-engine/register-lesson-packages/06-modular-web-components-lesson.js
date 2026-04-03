import scriptMarkdown from '../../../product/education/lessons/06-modular-web-components/source/lesson.script.md?raw';
import goalImage from '../../../product/education/lessons/06-modular-web-components/source/assets/web-component-goal.svg';
import { compileRegisteredLessonScript } from './compile-registered-lesson-script.js';

export const ModularWebComponentsLesson = compileRegisteredLessonScript({
  scriptMarkdown,
  goalImageSrc: goalImage,
});
