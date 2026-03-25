import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const lessonsRoot = path.resolve(currentDir, '../../lessons');

function collectLessonDocumentFolders() {
  return fs.readdirSync(lessonsRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(lessonsRoot, entry.name, 'content', 'documents', 'files'))
    .filter(documentsFolder => fs.existsSync(documentsFolder));
}

function readDocumentPart(documentsFolder, fileName) {
  const documentPath = path.join(documentsFolder, fileName);

  if (!fs.existsSync(documentPath)) {
    return '';
  }

  return fs.readFileSync(documentPath, 'utf8').trim();
}

function stripFrontmatter(markdown) {
  const source = String(markdown || '').trim();

  if (!source.startsWith('---\n')) {
    return source;
  }

  const match = source.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);

  if (!match) {
    return source;
  }

  return source.slice(match[0].length).trim();
}

function isGeneratedLessonBookFile(fileName) {
  return /^\d{2}_.+\.md$/.test(fileName);
}

function removeObsoleteGeneratedFiles(outputFolder, currentOutputFileName) {
  fs.readdirSync(outputFolder, { withFileTypes: true })
    .filter(entry =>
      entry.isFile() &&
      entry.name.endsWith('.md') &&
      entry.name !== currentOutputFileName &&
      isGeneratedLessonBookFile(entry.name)
    )
    .forEach(entry => {
      fs.unlinkSync(path.join(outputFolder, entry.name));
      console.log(`Removed obsolete: ${path.relative(process.cwd(), path.join(outputFolder, entry.name))}`);
    });
}

function buildLessonBook(documentsFolder) {
  const lessonFolder = path.basename(path.resolve(documentsFolder, '../../..'));
  const lessonPart = stripFrontmatter(readDocumentPart(documentsFolder, 'lesson.sr.md'));

  const parts = [
    '<!-- Generated from the same markdown sources used by the web lesson. -->',
    `# ${lessonFolder}`,
    lessonPart
  ].filter(Boolean);

  const outputFolder = path.resolve(documentsFolder, '..');
  const outputFile = path.join(outputFolder, `${lessonFolder.replace(/-/g, '_')}.md`);

  removeObsoleteGeneratedFiles(outputFolder, path.basename(outputFile));
  fs.writeFileSync(outputFile, parts.join('\n\n') + '\n');
  return outputFile;
}

const generatedFiles = collectLessonDocumentFolders().map(buildLessonBook);

generatedFiles.forEach(filePath => {
  console.log(`Generated: ${path.relative(process.cwd(), filePath)}`);
});
