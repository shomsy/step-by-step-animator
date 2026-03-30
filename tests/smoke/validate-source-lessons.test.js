import test from 'node:test';
import assert from 'node:assert/strict';
import { readSourceLessonValidationReport } from '../../system/lesson-engine/validate-source-lessons.js';

test('validate-source-lessons reports healthy shipped source lessons', () => {
  const { lessonCount, outputLines } = readSourceLessonValidationReport();

  assert.ok(lessonCount > 0);
  assert.equal(outputLines.length, lessonCount + 1);
  assert.match(outputLines.at(-1) || '', /Validated \d+ lesson source packages\./);
});
