import lessonMarkdown from '../../education/lessons/06-modular-web-components/source/lesson.md?raw';
import scenesMarkdown from '../../education/lessons/06-modular-web-components/source/scenes.md?raw';
import htmlArtifactMarkdown from '../../education/lessons/06-modular-web-components/source/artifacts/html.timeline.md?raw';
import cssArtifactMarkdown from '../../education/lessons/06-modular-web-components/source/artifacts/css.rules.md?raw';
import jsArtifactMarkdown from '../../education/lessons/06-modular-web-components/source/artifacts/js.timeline.md?raw';
import shadowCssArtifactMarkdown from '../../education/lessons/06-modular-web-components/source/artifacts/shadow-dom-style.css.md?raw';
import goalImage from '../../education/lessons/06-modular-web-components/source/assets/web-component-goal.svg';
import { compileLessonPackage } from '../compile-lesson-package.js';

export const ModularWebComponentsLesson = compileLessonPackage({
  lessonMarkdown,
  scenesMarkdown,
  artifactMarkdownById: {
    html: htmlArtifactMarkdown,
    css: cssArtifactMarkdown,
    js: jsArtifactMarkdown,
    "shadow-css": shadowCssArtifactMarkdown
  },
  goalImageSrc: goalImage
});
