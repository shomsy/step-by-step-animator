import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: resolve(process.cwd(), 'product/app'),
  server: {
    fs: {
      allow: [resolve(process.cwd())]
    }
  },
  build: {
    outDir: resolve(process.cwd(), 'dist'),
    emptyOutDir: true
  }
});
