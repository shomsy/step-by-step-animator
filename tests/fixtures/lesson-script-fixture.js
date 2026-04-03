import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function createLessonScriptFixture() {
  const scriptPath = join(__dirname, '../../product/education/lessons/09-human-first-script-demo/source/lesson.script.md');
  const scriptMarkdown = readFileSync(scriptPath, 'utf8');
  return {
    scriptMarkdown,
  };
}
