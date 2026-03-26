import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(currentDir, '../../');

test('validate-source-lessons passes on the shipped source-only lessons', async () => {
  const { stdout } = await execFileAsync('node', ['lesson-engine/validate-source-lessons.js'], {
    cwd: repoRoot,
    maxBuffer: 1024 * 1024
  });

  assert.match(stdout, /Validated \d+ lesson source packages\./);
});
