import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter } from '../foundation/frontmatter/parse-frontmatter.js';
import { compileLessonPackage } from './compile-lesson-package.js';
import { compileLessonScript } from './compile-lesson-script.js';
import { normalizeString } from './build-compiled-lesson.js';

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readTheoryMarkdown(sourceRoot, theoryFile) {
  const normalizedTheoryFile = normalizeString(theoryFile);

  if (!normalizedTheoryFile) {
    return '';
  }

  return readText(path.join(sourceRoot, normalizedTheoryFile));
}

function readArtifactMarkdownById(sourceRoot, artifacts) {
  return Object.fromEntries(
    (artifacts || []).map(artifact => [
      artifact.artifactId,
      readText(path.join(sourceRoot, artifact.file))
    ])
  );
}

export function compileSourceLesson({ sourceRoot }) {
  const scriptFilePath = path.join(sourceRoot, 'lesson.script.md');

  if (fs.existsSync(scriptFilePath)) {
    const scriptMarkdown = readText(scriptFilePath);
    const { attributes } = parseFrontmatter(scriptMarkdown);

    return {
      sourceFormat: 'script',
      compiledLesson: compileLessonScript({
        scriptMarkdown,
        goalImageSrc: attributes.goal?.imageSrc || '',
        theoryMarkdown: attributes.theory?.enabled
          ? readTheoryMarkdown(sourceRoot, attributes.theory.file)
          : ''
      })
    };
  }

  const lessonFilePath = path.join(sourceRoot, 'lesson.md');
  const scenesFilePath = path.join(sourceRoot, 'scenes.md');
  const lessonMarkdown = readText(lessonFilePath);
  const scenesMarkdown = readText(scenesFilePath);
  const { attributes } = parseFrontmatter(lessonMarkdown);

  return {
    sourceFormat: 'split',
    compiledLesson: compileLessonPackage({
      lessonMarkdown,
      scenesMarkdown,
      artifactMarkdownById: readArtifactMarkdownById(sourceRoot, attributes.artifacts),
      goalImageSrc: attributes.goal?.imageSrc || '',
      theoryMarkdown: attributes.theory?.enabled
        ? readTheoryMarkdown(sourceRoot, attributes.theory.file)
        : ''
    })
  };
}
