import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { writeRepoLessonScript } from '../../system/author-lessons/write-repo-lesson-script.js';

async function createTempLessonsRoot() {
  return fs.mkdtemp(path.join(os.tmpdir(), 'step-by-step-animator-lessons-'));
}

test('writeRepoLessonScript creates, skips, and updates the repo lesson script materialization', async () => {
  const lessonsRoot = await createTempLessonsRoot();
  const createdSourceMarkdown = 'first saved lesson source';
  const updatedSourceMarkdown = 'updated saved lesson source';

  try {
    const createdResult = await writeRepoLessonScript({
      lessonId: 'custom-lesson',
      sourceMarkdown: createdSourceMarkdown,
      lessonsRoot,
    });

    assert.equal(createdResult.status, 'created');
    assert.equal(
      await fs.readFile(path.join(lessonsRoot, 'custom-lesson/source/lesson.script.md'), 'utf8'),
      createdSourceMarkdown
    );

    const unchangedResult = await writeRepoLessonScript({
      lessonId: 'custom-lesson',
      sourceMarkdown: createdSourceMarkdown,
      lessonsRoot,
    });

    assert.equal(unchangedResult.status, 'unchanged');

    const updatedResult = await writeRepoLessonScript({
      lessonId: 'custom-lesson',
      sourceMarkdown: updatedSourceMarkdown,
      lessonsRoot,
    });

    assert.equal(updatedResult.status, 'updated');
    assert.equal(
      await fs.readFile(path.join(lessonsRoot, 'custom-lesson/source/lesson.script.md'), 'utf8'),
      updatedSourceMarkdown
    );
  } finally {
    await fs.rm(lessonsRoot, {
      recursive: true,
      force: true,
    });
  }
});

test('writeRepoLessonScript prefers the shipped lesson folder when one is provided', async () => {
  const lessonsRoot = await createTempLessonsRoot();

  try {
    const writeResult = await writeRepoLessonScript({
      lessonId: 'custom-lesson',
      shippedLessonId: '09-human-first-script-demo',
      sourceMarkdown: 'saved paired draft source',
      lessonsRoot,
    });

    assert.equal(writeResult.status, 'created');
    assert.equal(
      await fs.readFile(
        path.join(lessonsRoot, '09-human-first-script-demo/source/lesson.script.md'),
        'utf8'
      ),
      'saved paired draft source'
    );
  } finally {
    await fs.rm(lessonsRoot, {
      recursive: true,
      force: true,
    });
  }
});
