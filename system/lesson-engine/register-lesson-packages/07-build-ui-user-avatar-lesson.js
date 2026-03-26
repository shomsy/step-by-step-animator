import lessonMarkdown from '../../../product/education/lessons/07-build-ui-user-avatar/source/lesson.md?raw';
import scenesMarkdown from '../../../product/education/lessons/07-build-ui-user-avatar/source/scenes.md?raw';
import htmlArtifactMarkdown from '../../../product/education/lessons/07-build-ui-user-avatar/source/artifacts/html.timeline.md?raw';
import cssArtifactMarkdown from '../../../product/education/lessons/07-build-ui-user-avatar/source/artifacts/css.rules.md?raw';
import jsArtifactMarkdown from '../../../product/education/lessons/07-build-ui-user-avatar/source/artifacts/js.timeline.md?raw';
import templateJsArtifactMarkdown from '../../../product/education/lessons/07-build-ui-user-avatar/source/artifacts/template-js.timeline.md?raw';
import shadowCssArtifactMarkdown from '../../../product/education/lessons/07-build-ui-user-avatar/source/artifacts/shadow-dom-style.css.md?raw';
import goalImage from '../../../product/education/lessons/07-build-ui-user-avatar/source/assets/web-component-goal.svg';
import { compileLessonPackage } from '../compile-lesson-package.js';

export const BuildUiUserAvatarLesson = compileLessonPackage({
  lessonMarkdown,
  scenesMarkdown,
  artifactMarkdownById: {
    html: htmlArtifactMarkdown,
    css: cssArtifactMarkdown,
    js: jsArtifactMarkdown,
    "template-js": templateJsArtifactMarkdown,
    "shadow-css": shadowCssArtifactMarkdown
  },
  goalImageSrc: goalImage
});
