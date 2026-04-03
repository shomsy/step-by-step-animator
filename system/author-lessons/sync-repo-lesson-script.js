import { AUTHORING_REPO_LESSON_SCRIPT_ENDPOINT } from './authoring-repo-lesson-script-endpoint.js';

function buildUnavailableRepoLessonScriptStatus(reason = 'bridge-unavailable') {
  return {
    status: 'unavailable',
    reason,
    filePath: '',
    relativeFilePath: '',
  };
}

export async function syncRepoLessonScript({
  ownerWindow,
  lessonId,
  shippedLessonId = '',
  sourceMarkdown,
}) {
  if (!ownerWindow?.fetch) {
    return buildUnavailableRepoLessonScriptStatus();
  }

  let response;

  try {
    response = await ownerWindow.fetch(AUTHORING_REPO_LESSON_SCRIPT_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        lessonId,
        shippedLessonId,
        sourceMarkdown,
      }),
    });
  } catch {
    return buildUnavailableRepoLessonScriptStatus();
  }

  if (response.status === 404 || response.status === 405) {
    return buildUnavailableRepoLessonScriptStatus();
  }

  let responseBody = null;

  try {
    responseBody = await response.json();
  } catch {
    responseBody = null;
  }

  if (!response.ok) {
    return {
      status: responseBody?.status || 'failed',
      filePath: responseBody?.filePath || '',
      relativeFilePath: responseBody?.relativeFilePath || '',
      errorMessage: responseBody?.errorMessage || 'Failed to sync repo lesson.script.md.',
    };
  }

  return {
    status: responseBody?.status || 'updated',
    reason: responseBody?.reason || '',
    filePath: responseBody?.filePath || '',
    relativeFilePath: responseBody?.relativeFilePath || '',
  };
}
