import test from 'node:test';
import assert from 'node:assert/strict';
import { selectLessonFromLocation } from '../../animator-engine/choose-lesson/select-lesson-from-location.js';

test('selectLessonFromLocation picks an explicit lesson when the query is present', async () => {
  const lessonDescriptors = [
    {
      lessonId: 'alpha',
      lessonTitle: 'Alpha',
      loadLesson: async () => ({ lessonId: 'alpha' })
    },
    {
      lessonId: 'beta',
      lessonTitle: 'Beta',
      loadLesson: async () => ({ lessonId: 'beta' })
    }
  ];

  const selection = await selectLessonFromLocation({
    ownerLocation: { href: 'https://example.test/?lesson=beta' },
    lessonRegistry: {
      registeredLessons: lessonDescriptors,
      findLesson: lessonId => lessonDescriptors.find(lesson => lesson.lessonId === lessonId),
      getDefaultLessonId: () => lessonDescriptors[0].lessonId
    }
  });

  assert.equal(selection.lesson.lessonId, 'beta');
  assert.equal(selection.lessons, lessonDescriptors);
});

test('selectLessonFromLocation falls back to the default lesson when no query is present', async () => {
  const lessonDescriptors = [
    {
      lessonId: 'alpha',
      lessonTitle: 'Alpha',
      loadLesson: async () => ({ lessonId: 'alpha' })
    },
    {
      lessonId: 'beta',
      lessonTitle: 'Beta',
      loadLesson: async () => ({ lessonId: 'beta' })
    }
  ];

  const selection = await selectLessonFromLocation({
    ownerLocation: { href: 'https://example.test/' },
    lessonRegistry: {
      registeredLessons: lessonDescriptors,
      findLesson: lessonId => lessonDescriptors.find(lesson => lesson.lessonId === lessonId),
      getDefaultLessonId: () => lessonDescriptors[0].lessonId
    }
  });

  assert.equal(selection.lesson.lessonId, 'alpha');
  assert.equal(selection.lessons, lessonDescriptors);
});
