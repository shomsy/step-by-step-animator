import { compileLessonScript } from '../compile-lesson-script.js';

export function compileRegisteredLessonScript({
  scriptMarkdown,
  goalImageSrc = undefined,
  theoryMarkdown = '',
}) {
  return compileLessonScript({
    scriptMarkdown,
    goalImageSrc,
    theoryMarkdown,
  });
}
