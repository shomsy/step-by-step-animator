import lessonMarkdown from '../../education/lessons/02-build-top-navigation/source/lesson.md?raw';
import scenesMarkdown from '../../education/lessons/02-build-top-navigation/source/scenes.md?raw';
import htmlArtifactMarkdown from '../../education/lessons/02-build-top-navigation/source/artifacts/html.timeline.md?raw';
import cssArtifactMarkdown from '../../education/lessons/02-build-top-navigation/source/artifacts/css.rules.md?raw';
import goalImage from '../../education/lessons/02-build-top-navigation/source/assets/top-navigation-goal.svg';
import { compileLessonPackage } from '../compile-lesson-package.js';

export const buildTopNavigationLesson = compileLessonPackage({
  lessonMarkdown,
  scenesMarkdown,
  artifactMarkdownById: {
    html: htmlArtifactMarkdown,
    css: cssArtifactMarkdown
  },
  goalImageSrc: goalImage
});
