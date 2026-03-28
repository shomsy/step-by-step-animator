import scriptMarkdown from '../../../product/education/lessons/07-build-ui-user-avatar/source/lesson.script.md?raw';
import goalImage from '../../../product/education/lessons/07-build-ui-user-avatar/source/assets/web-component-goal.svg';
import { compileRegisteredLessonScript } from './compile-registered-lesson-script.js';

export const BuildUiUserAvatarLesson = compileRegisteredLessonScript({
  scriptMarkdown,
  goalImageSrc: goalImage
});
