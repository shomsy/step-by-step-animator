import { readLessonScript } from '../lesson-engine/read-lesson-script.js';

const shippedLessonModules = import.meta.glob(
  '../../product/education/lessons/*/source/lesson.script.md',
  {
    query: '?raw',
    import: 'default',
  }
);

export async function readShippedLessonScripts() {
  const shippedLessons = await Promise.all(
    Object.values(shippedLessonModules).map(async (loadScriptMarkdown) => {
      const scriptMarkdown = await loadScriptMarkdown();
      const script = readLessonScript(scriptMarkdown);

      return {
        lessonId: script.attributes.lessonId,
        lessonTitle: script.attributes.lessonTitle,
        order: Number(script.attributes.order || 0),
        sourceMarkdown: scriptMarkdown,
        repoSyncEnabled: true,
      };
    })
  );

  return shippedLessons.sort(
    (left, right) => left.order - right.order || left.lessonId.localeCompare(right.lessonId)
  );
}
