import test from 'node:test';
import assert from 'node:assert/strict';
import { selectLessonFromLocation } from '../../system/animator-engine/choose-lesson/select-lesson-from-location.js';

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

test('selectLessonFromLocation prefers a saved draft override for the selected lesson when one is playable', async () => {
  const lessonDescriptors = [
    {
      lessonId: 'alpha',
      lessonTitle: 'Alpha',
      loadLesson: async () => ({ lessonId: 'alpha', lessonTitle: 'Alpha' })
    },
    {
      lessonId: 'beta',
      lessonTitle: 'Beta',
      loadLesson: async () => ({ lessonId: 'beta', lessonTitle: 'Beta' })
    }
  ];

  const selection = await selectLessonFromLocation({
    ownerLocation: { href: 'https://example.test/?lesson=beta' },
    ownerWindow: {},
    lessonRegistry: {
      registeredLessons: lessonDescriptors,
      findLesson: lessonId => lessonDescriptors.find(lesson => lesson.lessonId === lessonId),
      getDefaultLessonId: () => lessonDescriptors[0].lessonId
    },
    resolveDraftLessonOverride: async ({ shippedLessonId }) => ({
      lessonId: shippedLessonId,
      lessonTitle: 'Beta Draft',
      lessonRuntimeSource: 'playable-draft',
      lessonRuntimeSourceLabel: 'Playable Draft · SQLite · 2026-03-30 00:00 CEST'
    })
  });

  assert.equal(selection.lesson.lessonId, 'beta');
  assert.equal(selection.lesson.lessonTitle, 'Beta Draft');
  assert.equal(selection.lesson.lessonRuntimeSource, 'playable-draft');
  assert.equal(selection.lessons[1].lessonTitle, 'Beta Draft');
});

test('selectLessonFromLocation picks a healthy custom draft when the explicit query is not a shipped lesson', async () => {
  const lessonDescriptors = [
    {
      lessonId: 'alpha',
      lessonTitle: 'Alpha',
      loadLesson: async () => ({ lessonId: 'alpha', lessonTitle: 'Alpha' })
    },
    {
      lessonId: 'beta',
      lessonTitle: 'Beta',
      loadLesson: async () => ({ lessonId: 'beta', lessonTitle: 'Beta' })
    }
  ];

  const selection = await selectLessonFromLocation({
    ownerLocation: { href: 'https://example.test/?lesson=custom-lesson' },
    ownerWindow: {},
    lessonRegistry: {
      registeredLessons: lessonDescriptors,
      findLesson: lessonId => lessonDescriptors.find(lesson => lesson.lessonId === lessonId),
      getDefaultLessonId: () => lessonDescriptors[0].lessonId
    },
    resolveDraftLessonOverride: async ({ requestedLessonId, shippedLessonId }) => {
      assert.equal(requestedLessonId, 'custom-lesson');
      assert.equal(shippedLessonId, '');

      return {
        lessonId: 'custom-lesson',
        lessonTitle: 'Custom Lesson Draft',
        lessonRuntimeSource: 'playable-draft',
        lessonRuntimeSourceLabel: 'Playable Draft · SQLite · 2026-03-30 02:33 CEST'
      };
    }
  });

  assert.equal(selection.lesson.lessonId, 'custom-lesson');
  assert.equal(selection.lesson.lessonTitle, 'Custom Lesson Draft');
  assert.equal(selection.lesson.lessonRuntimeSource, 'playable-draft');
  assert.equal(selection.lessons[0].lessonId, 'custom-lesson');
  assert.equal(selection.lessons[0].lessonTitle, 'Custom Lesson Draft');
});

test('selectLessonFromLocation preserves a broken draft fallback runtime marker when one is returned', async () => {
  const lessonDescriptors = [
    {
      lessonId: 'alpha',
      lessonTitle: 'Alpha',
      loadLesson: async () => ({ lessonId: 'alpha', lessonTitle: 'Alpha' })
    }
  ];

  const selection = await selectLessonFromLocation({
    ownerLocation: { href: 'https://example.test/?lesson=alpha' },
    ownerWindow: {},
    lessonRegistry: {
      registeredLessons: lessonDescriptors,
      findLesson: lessonId => lessonDescriptors.find(lesson => lesson.lessonId === lessonId),
      getDefaultLessonId: () => lessonDescriptors[0].lessonId
    },
    resolveDraftLessonOverride: async () => ({
      lessonId: 'alpha',
      lessonTitle: 'Alpha',
      lessonRuntimeSource: 'broken-draft-fallback',
      lessonRuntimeSourceLabel: 'Broken Draft Fallback · Shipped lesson package'
    })
  });

  assert.equal(selection.lesson.lessonId, 'alpha');
  assert.equal(selection.lesson.lessonRuntimeSource, 'broken-draft-fallback');
  assert.equal(selection.lesson.lessonRuntimeSourceLabel, 'Broken Draft Fallback · Shipped lesson package');
  assert.equal(selection.lessons, lessonDescriptors);
});

test('selectLessonFromLocation fails closed to the shipped lesson when the draft override is unavailable', async () => {
  const lessonDescriptors = [
    {
      lessonId: 'alpha',
      lessonTitle: 'Alpha',
      loadLesson: async () => ({ lessonId: 'alpha', lessonTitle: 'Alpha' })
    }
  ];

  const selection = await selectLessonFromLocation({
    ownerLocation: { href: 'https://example.test/?lesson=alpha' },
    ownerWindow: {},
    lessonRegistry: {
      registeredLessons: lessonDescriptors,
      findLesson: lessonId => lessonDescriptors.find(lesson => lesson.lessonId === lessonId),
      getDefaultLessonId: () => lessonDescriptors[0].lessonId
    },
    resolveDraftLessonOverride: async () => null
  });

  assert.equal(selection.lesson.lessonId, 'alpha');
  assert.equal(selection.lesson.lessonTitle, 'Alpha');
  assert.equal(selection.lessons, lessonDescriptors);
});

test('selectLessonFromLocation fails closed to the shipped lesson when the draft override resolver throws', async () => {
  const lessonDescriptors = [
    {
      lessonId: 'alpha',
      lessonTitle: 'Alpha',
      loadLesson: async () => ({ lessonId: 'alpha', lessonTitle: 'Alpha' })
    }
  ];

  const selection = await selectLessonFromLocation({
    ownerLocation: { href: 'https://example.test/?lesson=alpha' },
    ownerWindow: {},
    lessonRegistry: {
      registeredLessons: lessonDescriptors,
      findLesson: lessonId => lessonDescriptors.find(lesson => lesson.lessonId === lessonId),
      getDefaultLessonId: () => lessonDescriptors[0].lessonId
    },
    resolveDraftLessonOverride: async () => {
      throw new Error('SQLite unavailable');
    }
  });

  assert.equal(selection.lesson.lessonId, 'alpha');
  assert.equal(selection.lesson.lessonTitle, 'Alpha');
  assert.equal(selection.lessons, lessonDescriptors);
});
