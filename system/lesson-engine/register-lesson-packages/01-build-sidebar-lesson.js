import lessonMarkdown from '../../../product/education/lessons/01-build-sidebar/source/lesson.md?raw';
import scenesMarkdown from '../../../product/education/lessons/01-build-sidebar/source/scenes.md?raw';
import htmlArtifactMarkdown from '../../../product/education/lessons/01-build-sidebar/source/artifacts/html.timeline.md?raw';
import cssArtifactMarkdown from '../../../product/education/lessons/01-build-sidebar/source/artifacts/css.rules.md?raw';
import { compileLessonPackage } from '../compile-lesson-package.js';

export const BuildSidebarLesson = compileLessonPackage({
  lessonMarkdown,
  scenesMarkdown,
  artifactMarkdownById: {
    html: htmlArtifactMarkdown,
    css: cssArtifactMarkdown
  },
  goalImageSrc: undefined
});
