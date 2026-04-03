import fs from 'node:fs/promises';
import path from 'node:path';

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function assertLessonFolderName(lessonFolderName) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(lessonFolderName)) {
    throw new Error(
      `Repo lesson sync requires a kebab-case lesson folder name. Received "${lessonFolderName}".`
    );
  }
}

export function resolveRepoLessonScriptFilePath({
  lessonId,
  shippedLessonId = '',
  lessonsRoot = path.resolve(process.cwd(), 'product/education/lessons'),
}) {
  const lessonFolderName = normalizeText(shippedLessonId) || normalizeText(lessonId);

  if (!lessonFolderName) {
    throw new Error('Repo lesson sync requires a lesson id.');
  }

  assertLessonFolderName(lessonFolderName);

  return path.join(lessonsRoot, lessonFolderName, 'source', 'lesson.script.md');
}

export async function writeRepoLessonScript({
  lessonId,
  shippedLessonId = '',
  sourceMarkdown,
  lessonsRoot = path.resolve(process.cwd(), 'product/education/lessons'),
}) {
  const scriptFilePath = resolveRepoLessonScriptFilePath({
    lessonId,
    shippedLessonId,
    lessonsRoot,
  });
  let previousSourceMarkdown = '';

  try {
    previousSourceMarkdown = await fs.readFile(scriptFilePath, 'utf8');
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }

  if (previousSourceMarkdown === sourceMarkdown) {
    return {
      status: 'unchanged',
      filePath: scriptFilePath,
      relativeFilePath: path.relative(process.cwd(), scriptFilePath),
    };
  }

  await fs.mkdir(path.dirname(scriptFilePath), {
    recursive: true,
  });
  await fs.writeFile(scriptFilePath, sourceMarkdown, 'utf8');

  return {
    status: previousSourceMarkdown ? 'updated' : 'created',
    filePath: scriptFilePath,
    relativeFilePath: path.relative(process.cwd(), scriptFilePath),
  };
}
