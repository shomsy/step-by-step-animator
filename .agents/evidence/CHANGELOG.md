# Evidence Log

This is the single running list for feature work, bugs, TODOs, plans, decisions, and follow-up items.

Update rules:

- keep newest items at the top
- use one line per item
- keep each item short and concrete
- link to the owning doc or code when useful
- if a status changes, update this file in the same work item
- add `actual` when the effort is known and worth recording
- add `owner` only when the closure needs accountability context
- use `YYYY-MM-DD HH:MM` timestamps for new entries so duration and aging can be estimated

## Current Ledger

1. `[feature][done] 2026-03-26 - App shell moved under app/ with root compatibility aliases` - `app/index.html`, `app/main.js`, `index.html`, `main.js`, `vite.config.js`, `sidebar-step-by-step.html`
2. `[feature][done] 2026-03-26 - Source-only lesson authoring contract locked` - `.agents/authoring/LESSON_AUTHORING.md`, `.agents/architecture/lesson-architecture.md`, `AGENTS.md`
3. `[feature][done] 2026-03-26 - Lesson engine compiler boundary introduced` - `lesson-engine/compile-lesson-package.js`, `lesson-engine/read-scenes-contract.js`, `animator-engine/play-lesson/listen-to-step/compose-step-narration-text.js`
4. `[feature][done] 2026-03-26 - Lesson source validation command added` - `lesson-engine/validate-source-lessons.js`, `package.json`, `AGENTS.md`
5. `[governance][done] 2026-03-26 - Source-only migration governance completed` - `.agents/architecture/migration-governance.md`
6. `[decision][done] 2026-03-26 - Merge dump kept as portable working backup` - `merge-files.sh`, `step-by-step-animator.txt`
7. `[governance][done] 2026-03-26 01:47 - Mandatory work flow locked as plan -> todo -> evidence` - `AGENTS.md`, `.agents/planning/PLAN.md`, `.agents/evidence/TODO.md`, `.agents/evidence/CHANGELOG.md`
8. `[todo][active] 2026-03-26 01:47 - Active backlog lives in .agents/evidence/TODO.md` - `.agents/evidence/TODO.md`
9. `[archive][done] 2026-03-26 01:47 - Legacy planning notes archived outside TODO naming` - `.agents/planning/ARCHIVE.md`
10. `[bug][done] 2026-03-26 01:47 - bugs.md has no open items` - `.agents/review/bugs.md`
11. `[perf][follow-up] 2026-03-26 01:47 - Vite still warns about a large main chunk` - `npm run build`
