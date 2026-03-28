import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileSourceLesson } from '../compile-source-lesson.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const educationLessonsRoot = path.resolve(currentDir, '../../../product/education/lessons');
const lessonDocumentsOutputRoot = path.resolve(currentDir, '../output');

function ensureDir(directoryPath) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

function collectSourceLessonFolders() {
  if (!fs.existsSync(educationLessonsRoot)) {
    return [];
  }

  return fs.readdirSync(educationLessonsRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(educationLessonsRoot, entry.name, 'source'))
    .filter(sourceFolder => (
      fs.existsSync(path.join(sourceFolder, 'lesson.md'))
      || fs.existsSync(path.join(sourceFolder, 'lesson.script.md'))
    ));
}

function removeObsoleteGeneratedFiles(outputFolder, currentFileNames) {
  if (!fs.existsSync(outputFolder)) {
    return;
  }

  fs.readdirSync(outputFolder, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith('.md') && !currentFileNames.has(entry.name))
    .forEach(entry => {
      fs.unlinkSync(path.join(outputFolder, entry.name));
      console.log(`Removed obsolete: ${path.relative(process.cwd(), path.join(outputFolder, entry.name))}`);
    });
}

function buildLessonDocument({ lessonFolder, compiledLesson }) {
  const lessonTitle = compiledLesson.lessonTitle || lessonFolder;
  const lessonIntro = compiledLesson.lessonIntro || '';
  const goal = {
    title: compiledLesson.goalTitle,
    imageCaption: compiledLesson.goalImageCaption
  };
  const homework = {
    enabled: Array.isArray(compiledLesson.homeworkItems) && compiledLesson.homeworkItems.length > 0,
    items: compiledLesson.homeworkItems || []
  };

  const parts = [
    '<!-- Generated from the source-only lesson package. -->',
    `# ${lessonTitle}`,
    lessonIntro
  ].filter(Boolean);

  if (goal.title || goal.imageCaption) {
    parts.push('## Goal');
    if (goal.title) {
      parts.push(`- ${goal.title}`);
    }
    if (goal.imageCaption) {
      parts.push(goal.imageCaption);
    }
  }

  if (Array.isArray(compiledLesson.steps) && compiledLesson.steps.length) {
    parts.push('## Steps');
    compiledLesson.steps.forEach((step, index) => {
      const summary = step.desc || step.proTip || '';
      parts.push(`${index + 1}. ${step.title}${summary ? ` - ${summary}` : ''}`);
    });
  }

  const homeworkItems = Array.isArray(homework.items) ? homework.items : [];
  if (homework.enabled && homeworkItems.length) {
    parts.push('## Homework');
    homeworkItems.forEach(item => {
      parts.push(`- ${item}`);
    });
  }

  return `${parts.join('\n\n')}\n`;
}

function writeLessonDocument(sourceFolder) {
  const lessonFolder = path.basename(path.dirname(sourceFolder));
  const outputFileName = `${lessonFolder}.md`;
  const outputFilePath = path.join(lessonDocumentsOutputRoot, outputFileName);
  const { compiledLesson } = compileSourceLesson({ sourceRoot: sourceFolder });

  fs.writeFileSync(
    outputFilePath,
    buildLessonDocument({
      lessonFolder,
      compiledLesson
    }),
    'utf8'
  );

  return outputFileName;
}

ensureDir(lessonDocumentsOutputRoot);

const currentFileNames = new Set(
  collectSourceLessonFolders().map(writeLessonDocument)
);

removeObsoleteGeneratedFiles(lessonDocumentsOutputRoot, currentFileNames);

currentFileNames.forEach(fileName => {
  console.log(`Generated: ${path.relative(process.cwd(), path.join(lessonDocumentsOutputRoot, fileName))}`);
});
