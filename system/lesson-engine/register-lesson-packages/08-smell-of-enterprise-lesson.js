import scriptMarkdown from '../../../product/education/lessons/08-smell-of-enterprise/source/lesson.script.md?raw';
import goalImage from '../../../product/education/lessons/08-smell-of-enterprise/source/assets/web-component-goal.svg';
import { compileRegisteredLessonScript } from './compile-registered-lesson-script.js';

export const SmellOfEnterpriseLesson = compileRegisteredLessonScript({
  scriptMarkdown,
  goalImageSrc: goalImage
});
