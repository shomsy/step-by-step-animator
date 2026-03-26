# Evidence Log

This is the single running list for feature work, bugs, TODOs, plans, decisions, and follow-up items.

Update rules:

- keep newest items at the top
- use one line per item
- keep each item short and concrete
- link to the owning doc or code when useful
- if a status changes, update this file in the same work item

## Current Ledger

1. `[feature][done] 2026-03-26 - App shell moved under app/ with root compatibility aliases` - `app/index.html`, `app/main.js`, `index.html`, `main.js`, `vite.config.js`, `sidebar-step-by-step.html`
2. `[feature][done] 2026-03-26 - Source-only lesson authoring contract locked` - `.agents/authoring/LESSON_AUTHORING.md`, `.agents/architecture/lesson-architecture.md`, `AGENTS.md`
3. `[feature][done] 2026-03-26 - Lesson engine compiler boundary introduced` - `lesson-engine/compile-lesson-package.js`, `lesson-engine/read-scenes-contract.js`, `animator-engine/play-lesson/listen-to-step/compose-step-narration-text.js`
4. `[feature][done] 2026-03-26 - Lesson source validation command added` - `lesson-engine/validate-source-lessons.js`, `package.json`, `AGENTS.md`
5. `[governance][done] 2026-03-26 - Source-only migration governance completed` - `.agents/architecture/migration-governance.md`
6. `[decision][done] 2026-03-26 - Merge dump kept as portable working backup` - `merge-files.sh`, `step-by-step-animator.txt`
7. `[todo][stale] 2026-03-26 - Legacy TODO.md still reflects old Lesson 07/08 recovery notes` - `.agents/planning/TODO.md`
8. `[bug][done] 2026-03-26 - bugs.md has no open items` - `.agents/review/bugs.md`
9. `[perf][follow-up] 2026-03-26 - Vite still warns about a large main chunk` - `npm run build`
