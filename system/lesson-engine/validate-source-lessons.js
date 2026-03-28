import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileSourceLesson } from './compile-source-lesson.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const lessonsRoot = path.resolve(currentDir, '../../product/education/lessons');

function collectLessonFolders() {
  if (!fs.existsSync(lessonsRoot)) {
    return [];
  }

  return fs.readdirSync(lessonsRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => ({ lessonSlug: entry.name, sourceRoot: path.join(lessonsRoot, entry.name, 'source') }))
    .filter(entry => (
      fs.existsSync(path.join(entry.sourceRoot, 'lesson.md'))
      || fs.existsSync(path.join(entry.sourceRoot, 'lesson.script.md'))
    ));
}

function validateLessonSource({ lessonSlug, sourceRoot }) {
  const { compiledLesson, sourceFormat } = compileSourceLesson({ sourceRoot });

  const sceneCount = compiledLesson.steps.reduce(
    (count, step) => count + (Array.isArray(step.scenes) ? step.scenes.length : 0),
    0
  );

  console.log(`${lessonSlug}: ok (${compiledLesson.steps.length} steps, ${sceneCount} scenes, ${sourceFormat})`);
}

function main() {
  const lessonFolders = collectLessonFolders();

  lessonFolders.forEach(validateLessonSource);
  console.log(`Validated ${lessonFolders.length} lesson source packages.`);
}

main();
