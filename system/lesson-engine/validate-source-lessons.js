import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileSourceLesson } from './compile-source-lesson.js';

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const lessonsRoot = path.resolve(currentDir, '../../product/education/lessons');

function collectLessonFolders() {
  if (!fs.existsSync(lessonsRoot)) {
    return [];
  }

  return fs
    .readdirSync(lessonsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      lessonSlug: entry.name,
      sourceRoot: path.join(lessonsRoot, entry.name, 'source'),
    }))
    .filter(
      (entry) =>
        fs.existsSync(path.join(entry.sourceRoot, 'lesson.md')) ||
        fs.existsSync(path.join(entry.sourceRoot, 'lesson.script.md'))
    );
}

function validateLessonSource({ lessonSlug, sourceRoot }) {
  const { compiledLesson, sourceFormat } = compileSourceLesson({ sourceRoot });

  const sceneCount = compiledLesson.steps.reduce(
    (count, step) => count + (Array.isArray(step.scenes) ? step.scenes.length : 0),
    0
  );

  return `${lessonSlug}: ok (${compiledLesson.steps.length} steps, ${sceneCount} scenes, ${sourceFormat})`;
}

export function readSourceLessonValidationReport() {
  const lessonFolders = collectLessonFolders();
  const outputLines = lessonFolders.map(validateLessonSource);

  outputLines.push(`Validated ${lessonFolders.length} lesson source packages.`);

  return {
    lessonCount: lessonFolders.length,
    outputLines,
  };
}

async function flushValidationReport(lines) {
  const report = `${lines.join('\n')}\n`;

  await new Promise((resolve, reject) => {
    process.stdout.write(report, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

async function main() {
  const { outputLines } = readSourceLessonValidationReport();
  await flushValidationReport(outputLines);
}

if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
