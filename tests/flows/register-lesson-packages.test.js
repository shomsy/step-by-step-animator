import test from 'node:test';
import assert from 'node:assert/strict';
import {
  registeredLessons,
  findLesson,
  getDefaultLessonId,
} from '../../system/lesson-engine/register-lesson-packages/index.js';

test('lesson registry exposes lazy lesson descriptors', () => {
  assert.ok(Array.isArray(registeredLessons));
  assert.ok(registeredLessons.length > 0);
  assert.equal(getDefaultLessonId(), '01-build-sidebar');

  const lesson = findLesson('02-build-top-navigation');

  assert.ok(lesson);
  assert.equal(lesson.lessonId, '02-build-top-navigation');
  assert.equal(lesson.lessonTitle, 'Build Top Navigation');
  assert.equal(typeof lesson.loadLesson, 'function');
});
