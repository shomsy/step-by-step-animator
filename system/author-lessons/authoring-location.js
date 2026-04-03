function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export const AUTHORING_LESSON_COLLECTION_PATH = '/content/lesson';

function normalizePathname(pathname) {
  const normalizedPathname = normalizeText(pathname) || '/';

  if (normalizedPathname === '/') {
    return '/';
  }

  return normalizedPathname.replace(/\/+$/, '');
}

export function readAuthoringLocationState(ownerLocation) {
  const currentUrl = new URL(ownerLocation.href);
  const normalizedPathname = normalizePathname(currentUrl.pathname);
  const legacyWorkspace = normalizeText(currentUrl.searchParams.get('workspace'));
  const legacyLessonId = normalizeText(currentUrl.searchParams.get('lesson'));

  if (normalizedPathname === AUTHORING_LESSON_COLLECTION_PATH) {
    return {
      isAuthoringLocation: true,
      requestedLessonId: '',
    };
  }

  if (normalizedPathname.startsWith(`${AUTHORING_LESSON_COLLECTION_PATH}/`)) {
    return {
      isAuthoringLocation: true,
      requestedLessonId: decodeURIComponent(
        normalizedPathname.slice(`${AUTHORING_LESSON_COLLECTION_PATH}/`.length)
      ),
    };
  }

  if (legacyWorkspace === 'authoring') {
    return {
      isAuthoringLocation: true,
      requestedLessonId: legacyLessonId,
    };
  }

  return {
    isAuthoringLocation: false,
    requestedLessonId: '',
  };
}

export function buildAuthoringLessonCollectionUrl(ownerLocation) {
  const nextUrl = new URL(ownerLocation.href);

  nextUrl.pathname = AUTHORING_LESSON_COLLECTION_PATH;
  nextUrl.searchParams.delete('workspace');
  nextUrl.searchParams.delete('lesson');

  return nextUrl.toString();
}

export function buildAuthoringLessonEditorUrl(ownerLocation, lessonId = '') {
  const normalizedLessonId = normalizeText(lessonId);

  if (!normalizedLessonId) {
    return buildAuthoringLessonCollectionUrl(ownerLocation);
  }

  const nextUrl = new URL(ownerLocation.href);

  nextUrl.pathname = `${AUTHORING_LESSON_COLLECTION_PATH}/${encodeURIComponent(normalizedLessonId)}`;
  nextUrl.searchParams.delete('workspace');
  nextUrl.searchParams.delete('lesson');

  return nextUrl.toString();
}

export function buildPlayerLessonUrl(ownerLocation, lessonId = '') {
  const normalizedLessonId = normalizeText(lessonId);
  const nextUrl = new URL(ownerLocation.href);

  nextUrl.pathname = '/';
  nextUrl.searchParams.delete('workspace');

  if (normalizedLessonId) {
    nextUrl.searchParams.set('lesson', normalizedLessonId);
  } else {
    nextUrl.searchParams.delete('lesson');
  }

  return nextUrl.toString();
}
