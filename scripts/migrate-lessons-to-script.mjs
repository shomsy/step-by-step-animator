import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLessonScriptFromSource } from '../system/lesson-engine/build-lesson-script-from-source.js';

const currentFilePath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(currentFilePath), '..');
const lessonsRoot = path.join(repoRoot, 'product/education/lessons');

function readLessonSourceRoots() {
  return fs
    .readdirSync(lessonsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(lessonsRoot, entry.name, 'source'))
    .filter((sourceRoot) => fs.existsSync(sourceRoot))
    .sort();
}

function removeLegacySplitSource(sourceRoot) {
  const lessonFilePath = path.join(sourceRoot, 'lesson.md');
  const scenesFilePath = path.join(sourceRoot, 'scenes.md');
  const artifactsRoot = path.join(sourceRoot, 'artifacts');

  if (fs.existsSync(lessonFilePath)) {
    fs.rmSync(lessonFilePath);
  }

  if (fs.existsSync(scenesFilePath)) {
    fs.rmSync(scenesFilePath);
  }

  if (fs.existsSync(artifactsRoot)) {
    fs.rmSync(artifactsRoot, {
      recursive: true,
      force: true,
    });
  }
}

function migrateLessonSource(sourceRoot) {
  const scriptMarkdown = buildLessonScriptFromSource({ sourceRoot });

  fs.writeFileSync(path.join(sourceRoot, 'lesson.script.md'), scriptMarkdown);
  removeLegacySplitSource(sourceRoot);
}

for (const sourceRoot of readLessonSourceRoots()) {
  migrateLessonSource(sourceRoot);
  console.log(`Migrated ${path.relative(repoRoot, sourceRoot)}`);
}
