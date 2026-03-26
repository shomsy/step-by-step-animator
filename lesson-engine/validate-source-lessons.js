import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from './parse-frontmatter.js';
import { compileLessonPackage } from './compile-lesson-package.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const lessonsRoot = path.resolve(currentDir, '../product/education/lessons');

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function collectLessonFolders() {
  if (!fs.existsSync(lessonsRoot)) {
    return [];
  }

  return fs.readdirSync(lessonsRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => ({ lessonSlug: entry.name, sourceRoot: path.join(lessonsRoot, entry.name, 'source') }))
    .filter(entry => fs.existsSync(path.join(entry.sourceRoot, 'lesson.md')));
}

function validateLessonSource({ lessonSlug, sourceRoot }) {
  const lessonMarkdown = readText(path.join(sourceRoot, 'lesson.md'));
  const scenesMarkdown = readText(path.join(sourceRoot, 'scenes.md'));
  const { attributes } = parseFrontmatter(lessonMarkdown);
  const theoryMarkdown = attributes.theory?.enabled
    ? readText(path.join(sourceRoot, normalizeString(attributes.theory.file)))
    : '';
  const artifactMarkdownById = Object.fromEntries(
    (attributes.artifacts || []).map(artifact => [
      artifact.artifactId,
      readText(path.join(sourceRoot, artifact.file))
    ])
  );

  const compiledLesson = compileLessonPackage({
    lessonMarkdown,
    scenesMarkdown,
    artifactMarkdownById,
    goalImageSrc: attributes.goal?.imageSrc || '',
    theoryMarkdown
  });

  const sceneCount = compiledLesson.steps.reduce(
    (count, step) => count + (Array.isArray(step.scenes) ? step.scenes.length : 0),
    0
  );

  console.log(`${lessonSlug}: ok (${compiledLesson.steps.length} steps, ${sceneCount} scenes)`);
}

function main() {
  const lessonFolders = collectLessonFolders();

  lessonFolders.forEach(validateLessonSource);
  console.log(`Validated ${lessonFolders.length} lesson source packages.`);
}

main();

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}
