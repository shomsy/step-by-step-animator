import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(process.cwd(), 'index.html'),
        sidebarTutorial: resolve(process.cwd(), 'sidebar-step-by-step.html')
      }
    }
  }
});
