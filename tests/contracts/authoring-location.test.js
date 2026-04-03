import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AUTHORING_LESSON_COLLECTION_PATH,
  buildAuthoringLessonCollectionUrl,
  buildAuthoringLessonEditorUrl,
  buildPlayerLessonUrl,
  readAuthoringLocationState,
} from '../../system/author-lessons/authoring-location.js';

test('readAuthoringLocationState treats the collection route as authoring mode', () => {
  const locationState = readAuthoringLocationState({
    href: 'https://example.test/content/lesson',
  });

  assert.deepEqual(locationState, {
    isAuthoringLocation: true,
    requestedLessonId: '',
  });
});

test('readAuthoringLocationState reads a clean lesson editor route', () => {
  const locationState = readAuthoringLocationState({
    href: 'https://example.test/content/lesson/07-bla-bla-bla',
  });

  assert.deepEqual(locationState, {
    isAuthoringLocation: true,
    requestedLessonId: '07-bla-bla-bla',
  });
});

test('readAuthoringLocationState keeps the legacy query route as a compatibility fallback', () => {
  const locationState = readAuthoringLocationState({
    href: 'https://example.test/?workspace=authoring&lesson=legacy-lesson',
  });

  assert.deepEqual(locationState, {
    isAuthoringLocation: true,
    requestedLessonId: 'legacy-lesson',
  });
});

test('authoring location builders emit clean path-based URLs and clear legacy query state', () => {
  const originUrl = 'https://example.test/?workspace=authoring&lesson=stale-lesson&debug=1';
  const collectionUrl = new URL(buildAuthoringLessonCollectionUrl({ href: originUrl }));
  const editorUrl = new URL(buildAuthoringLessonEditorUrl({ href: originUrl }, '07-bla-bla-bla'));

  assert.equal(collectionUrl.pathname, AUTHORING_LESSON_COLLECTION_PATH);
  assert.equal(collectionUrl.searchParams.get('workspace'), null);
  assert.equal(collectionUrl.searchParams.get('lesson'), null);
  assert.equal(collectionUrl.searchParams.get('debug'), '1');

  assert.equal(editorUrl.pathname, `${AUTHORING_LESSON_COLLECTION_PATH}/07-bla-bla-bla`);
  assert.equal(editorUrl.searchParams.get('workspace'), null);
  assert.equal(editorUrl.searchParams.get('lesson'), null);
  assert.equal(editorUrl.searchParams.get('debug'), '1');
});

test('buildPlayerLessonUrl returns the normal player route and keeps the explicit lesson query', () => {
  const playerUrl = new URL(
    buildPlayerLessonUrl(
      { href: 'https://example.test/content/lesson/07-bla-bla-bla?debug=1' },
      '07-bla-bla-bla'
    )
  );

  assert.equal(playerUrl.pathname, '/');
  assert.equal(playerUrl.searchParams.get('lesson'), '07-bla-bla-bla');
  assert.equal(playerUrl.searchParams.get('workspace'), null);
  assert.equal(playerUrl.searchParams.get('debug'), '1');
});
