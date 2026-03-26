import lessonMarkdown from '../../product/education/lessons/04-build-web-component/source/lesson.md?raw';
import scenesMarkdown from '../../product/education/lessons/04-build-web-component/source/scenes.md?raw';
import htmlArtifactMarkdown from '../../product/education/lessons/04-build-web-component/source/artifacts/html.timeline.md?raw';
import cssArtifactMarkdown from '../../product/education/lessons/04-build-web-component/source/artifacts/css.rules.md?raw';
import jsArtifactMarkdown from '../../product/education/lessons/04-build-web-component/source/artifacts/js.timeline.md?raw';
import goalImage from '../../product/education/lessons/04-build-web-component/source/assets/web-component-goal.svg';
import { compileLessonPackage } from '../compile-lesson-package.js';

export const BuildWebComponentLesson = compileLessonPackage({
  lessonMarkdown,
  scenesMarkdown,
  artifactMarkdownById: {
    html: htmlArtifactMarkdown,
    css: cssArtifactMarkdown,
    js: jsArtifactMarkdown
  },
  goalImageSrc: goalImage
});
