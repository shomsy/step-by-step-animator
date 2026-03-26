import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from '../parse-frontmatter.js';
import { readScenesContract } from '../read-scenes-contract.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const educationLessonsRoot = path.resolve(currentDir, '../../education/lessons');
const generatedDocumentsRoot = path.resolve(currentDir, '../../generated/lesson-documents');

function ensureDir(directoryPath) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function collectSourceLessonFolders() {
  if (!fs.existsSync(educationLessonsRoot)) {
    return [];
  }

  return fs.readdirSync(educationLessonsRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(educationLessonsRoot, entry.name, 'source'))
    .filter(sourceFolder => fs.existsSync(path.join(sourceFolder, 'lesson.md')));
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

function buildLessonDocument({ lessonFolder, lessonMarkdown, scenesMarkdown }) {
  const { attributes, body } = parseFrontmatter(lessonMarkdown);
  const scenesContract = readScenesContract(scenesMarkdown);
  const lessonTitle = attributes.lessonTitle || attributes.title || lessonFolder;
  const lessonIntro = attributes.lessonIntro || body || '';
  const goal = attributes.goal || {};
  const homework = attributes.homework || {};

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

  if (Array.isArray(scenesContract.steps) && scenesContract.steps.length) {
    parts.push('## Steps');
    scenesContract.steps.forEach((step, index) => {
      const summary = step.summary || step.intent || '';
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
  const lessonMarkdown = readText(path.join(sourceFolder, 'lesson.md'));
  const scenesMarkdown = readText(path.join(sourceFolder, 'scenes.md'));
  const outputFileName = `${lessonFolder}.md`;
  const outputFilePath = path.join(generatedDocumentsRoot, outputFileName);

  fs.writeFileSync(
    outputFilePath,
    buildLessonDocument({
      lessonFolder,
      lessonMarkdown,
      scenesMarkdown
    }),
    'utf8'
  );

  return outputFileName;
}

ensureDir(generatedDocumentsRoot);

const currentFileNames = new Set(
  collectSourceLessonFolders().map(writeLessonDocument)
);

removeObsoleteGeneratedFiles(generatedDocumentsRoot, currentFileNames);

currentFileNames.forEach(fileName => {
  console.log(`Generated: ${path.relative(process.cwd(), path.join(generatedDocumentsRoot, fileName))}`);
});
