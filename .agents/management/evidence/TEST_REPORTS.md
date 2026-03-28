# Test Reports

Concrete records of executed verification.

## Entry Template

- `date`:
- `scope`:
- `environment`:
- `checks`:
- `result`: pass | fail | partial
- `notes`:

## Reports

1. `executed_at`: `2026-03-28 22:00 CET`
   - scope: `all-lesson DSL migration, browser authoring studio, SQLite-backed draft persistence, publish snapshots, and runtime integration`
   - environment: `local workspace, Node test runner, Puppeteer headless browser, Vite build`
   - checks: `npm test`; `npm run validate:lessons`; `npm run sync:lesson-documents`; `npm run build`
   - result: `pass`
   - notes: `All shipped lessons now validate as script sources, the browser app loads both player and authoring workspaces, authoring drafts persist through IndexedDB-backed SQLite, and publish snapshots restore cleanly from the browser flow.`
1. `executed_at`: `2026-03-28 17:04 CET`
   - scope: `human-first lesson script DSL, mixed source-format validation, script-authored demo lesson, and browser runtime loading`
   - environment: `local workspace, Node test runner, Puppeteer headless browser, Vite build`
   - checks: `npm run test:contracts`; `npm run validate:lessons`; `npm run sync:lesson-documents`; `npm test`; `npm run build`
   - result: `pass`
   - notes: `The lesson engine now compiles lesson.script.md sources, validate-source-lessons accepts split and script lessons in the same tree, and the browser smoke loads the new script-authored lesson through the live registry.`
1. `executed_at`: `2026-03-28 15:40 CET`
   - scope: `whole-system review remediation for narration runtime coverage, local-font shell hardening, and product-truth alignment`
   - environment: `local workspace, Node test runner, Puppeteer headless browser, Vite build`
   - checks: `npm test`; `npm run build`; `npm run validate:lessons`
   - result: `pass`
   - notes: `Browser smoke now covers the browser-voice narration lifecycle with a deterministic stub, and the app shell no longer depends on Google Fonts at runtime.`
1. `executed_at`: `2026-03-28 03:30 CET`
   - scope: `strict-review closure and precedence-chain validation`
   - environment: `local workspace, Node test runner, Puppeteer headless browser, Vite build`
   - checks: `npm test`; `npm run build`; `npm run validate:lessons`
   - result: `pass`
   - notes: `Browser smoke covered boot, step navigation, lesson switch, and preview iframe isolation.`
