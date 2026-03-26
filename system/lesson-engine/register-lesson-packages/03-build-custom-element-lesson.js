import lessonMarkdown from '../../../product/education/lessons/03-build-custom-element/source/lesson.md?raw';
import scenesMarkdown from '../../../product/education/lessons/03-build-custom-element/source/scenes.md?raw';
import htmlArtifactMarkdown from '../../../product/education/lessons/03-build-custom-element/source/artifacts/html.timeline.md?raw';
import cssArtifactMarkdown from '../../../product/education/lessons/03-build-custom-element/source/artifacts/css.rules.md?raw';
import jsArtifactMarkdown from '../../../product/education/lessons/03-build-custom-element/source/artifacts/js.timeline.md?raw';
import goalImage from '../../../product/education/lessons/03-build-custom-element/source/assets/custom-element-goal.svg';
import { compileLessonPackage } from '../compile-lesson-package.js';

export const BuildCustomElementLesson = compileLessonPackage({
  lessonMarkdown,
  scenesMarkdown,
  artifactMarkdownById: {
    html: htmlArtifactMarkdown,
    css: cssArtifactMarkdown,
    js: jsArtifactMarkdown
  },
  goalImageSrc: goalImage
});
