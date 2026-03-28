import scriptMarkdown from '../../../product/education/lessons/09-human-first-script-demo/source/lesson.script.md?raw';
import { compileRegisteredLessonScript } from './compile-registered-lesson-script.js';

export const HumanFirstScriptDemoLesson = compileRegisteredLessonScript({
  scriptMarkdown
});
