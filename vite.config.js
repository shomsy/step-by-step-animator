import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { createAuthoringRepoLessonScriptPlugin } from './system/author-lessons/create-authoring-repo-lesson-script-plugin.js';

const repoRoot = resolve(process.cwd());

export default defineConfig({
  root: resolve(repoRoot, 'product/app'),
  plugins: [createAuthoringRepoLessonScriptPlugin({ repoRoot })],
  server: {
    fs: {
      allow: [repoRoot],
    },
  },
  build: {
    outDir: resolve(repoRoot, 'dist'),
    emptyOutDir: true,
  },
});
