import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import process from 'node:process';

const rulesMarkerPath = '.agents/.rules/AGENTS.md';

if (existsSync(rulesMarkerPath)) {
  process.exit(0);
}

const result = spawnSync('git', ['submodule', 'update', '--init', '--recursive'], {
  stdio: 'inherit',
});

if (result.error) {
  throw new Error(`Failed to initialize the .agents/.rules submodule: ${result.error.message}`);
}

if (result.status !== 0) {
  process.exit(result.status || 1);
}
