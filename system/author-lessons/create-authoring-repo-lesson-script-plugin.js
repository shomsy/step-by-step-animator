import { normalizePath } from 'vite';
import path from 'node:path';
import { compileLessonScript } from '../lesson-engine/compile-lesson-script.js';
import { AUTHORING_REPO_LESSON_SCRIPT_ENDPOINT } from './authoring-repo-lesson-script-endpoint.js';
import {
  resolveRepoLessonScriptFilePath,
  writeRepoLessonScript,
} from './write-repo-lesson-script.js';

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function createOperationId() {
  const timestamp = Date.now().toString(36);
  const randomSegment = Math.random().toString(36).slice(2, 8);
  return `authoring-repo-sync-${timestamp}-${randomSegment}`;
}

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader('content-type', 'application/json; charset=utf-8');
  response.end(JSON.stringify(payload));
}

function buildErrorPayload({
  operationId,
  status,
  code,
  errorMessage,
  filePath = '',
  relativeFilePath = '',
  reason = '',
}) {
  return {
    status,
    code,
    errorMessage,
    message: errorMessage,
    operationId,
    filePath,
    relativeFilePath,
    reason,
  };
}

function readJsonRequestBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    let requestBody = '';

    request.on('data', (chunk) => {
      requestBody += chunk;
    });
    request.on('end', () => {
      try {
        resolveBody(requestBody ? JSON.parse(requestBody) : {});
      } catch (error) {
        rejectBody(error);
      }
    });
    request.on('error', rejectBody);
  });
}

async function invalidateRepoLessonScriptModules(server, filePath) {
  const normalizedFilePath = normalizePath(filePath);

  await Promise.all(
    Object.values(server.environments).map((environment) =>
      environment.pluginContainer.watchChange(normalizedFilePath, {
        event: 'update',
      })
    )
  );

  Object.values(server.environments).forEach((environment) => {
    environment.moduleGraph.onFileChange(normalizedFilePath);
  });
}

async function writeRepoLessonScriptWithoutReload({
  server,
  lessonId,
  shippedLessonId,
  sourceMarkdown,
  lessonsRoot,
}) {
  const repoLessonScriptFilePath = resolveRepoLessonScriptFilePath({
    lessonId,
    shippedLessonId,
    lessonsRoot,
  });

  if (server?.watcher?.unwatch) {
    await server.watcher.unwatch(repoLessonScriptFilePath);
  }

  const writeResult = await writeRepoLessonScript({
    lessonId,
    shippedLessonId,
    sourceMarkdown,
    lessonsRoot,
  });

  await invalidateRepoLessonScriptModules(server, repoLessonScriptFilePath);
  return writeResult;
}

export function createAuthoringRepoLessonScriptPlugin({
  repoRoot = path.resolve(process.cwd()),
} = {}) {
  const lessonsRoot = path.resolve(repoRoot, 'product/education/lessons');

  return {
    name: 'authoring-repo-lesson-script',
    configureServer(server) {
      server.middlewares.use(
        AUTHORING_REPO_LESSON_SCRIPT_ENDPOINT,
        async (request, response, next) => {
          if (request.method !== 'POST') {
            next();
            return;
          }

          const operationId = createOperationId();

          try {
            const requestBody = await readJsonRequestBody(request);
            const sourceMarkdown =
              typeof requestBody?.sourceMarkdown === 'string' ? requestBody.sourceMarkdown : '';
            const shippedLessonId = normalizeText(requestBody?.shippedLessonId);

            if (!normalizeText(sourceMarkdown)) {
              sendJson(
                response,
                400,
                buildErrorPayload({
                  operationId,
                  status: 'failed',
                  code: 'AUTHORING_REPO_SYNC_INVALID_REQUEST',
                  errorMessage: 'Repo lesson sync requires sourceMarkdown.',
                })
              );
              return;
            }

            let compiledLesson;

            try {
              compiledLesson = compileLessonScript({
                scriptMarkdown: sourceMarkdown,
                goalImageSrc: '',
              });
            } catch (error) {
              sendJson(
                response,
                200,
                buildErrorPayload({
                  operationId,
                  status: 'unhealthy',
                  code: 'AUTHORING_REPO_SYNC_UNHEALTHY_DRAFT',
                  errorMessage:
                    error?.message || 'Repo lesson sync requires a healthy saved draft.',
                })
              );
              return;
            }

            if (shippedLessonId && compiledLesson.lessonId !== shippedLessonId) {
              sendJson(
                response,
                200,
                buildErrorPayload({
                  operationId,
                  status: 'conflict',
                  code: 'AUTHORING_REPO_SYNC_LESSON_ID_CONFLICT',
                  errorMessage: `Repo lesson sync refused to overwrite "${shippedLessonId}" because the saved draft lessonId is "${compiledLesson.lessonId}".`,
                })
              );
              return;
            }

            const writeResult = await writeRepoLessonScriptWithoutReload({
              server,
              lessonId: compiledLesson.lessonId,
              shippedLessonId,
              sourceMarkdown,
              lessonsRoot,
            });

            sendJson(response, 200, {
              ...writeResult,
              code: 'AUTHORING_REPO_SYNC_OK',
              operationId,
            });
          } catch (error) {
            sendJson(
              response,
              500,
              buildErrorPayload({
                operationId,
                status: 'failed',
                code: 'AUTHORING_REPO_SYNC_FAILED',
                errorMessage: error?.message || 'Failed to sync repo lesson.script.md.',
              })
            );
          }
        }
      );
    },
  };
}
