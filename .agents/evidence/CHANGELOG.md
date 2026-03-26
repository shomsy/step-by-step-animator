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

1. `[plan][done] 2026-03-26 02:22 - Root README and run instructions completed` - `README.md`, `.agents/planning/PLAN.md`, `.agents/evidence/TODO.md`
2. `[todo][done] 2026-03-26 02:22 - Write root README completed` - `README.md`
3. `[governance][done] 2026-03-26 02:11 - Review and test gate locked before git/push` - `AGENTS.md`, `.agents/planning/PLAN.md`
4. `[plan][done] 2026-03-26 02:15 - Test harness and contract coverage completed` - `.agents/planning/PLAN.md`, `.agents/evidence/TODO.md`, `tests/contracts`, `tests/flows`, `tests/smoke`
5. `[todo][done] 2026-03-26 02:15 - Add node:test harness completed` - `package.json`, `tests/contracts`, `tests/flows`, `tests/smoke`
6. `[todo][done] 2026-03-26 02:15 - Cover lesson compiler contracts completed` - `lesson-engine/compile-lesson-package.js`, `tests/contracts`
7. `[todo][done] 2026-03-26 02:15 - Cover runtime seams completed` - `animator-engine/choose-lesson/select-lesson-from-location.js`, `tests/flows`
8. `[todo][done] 2026-03-26 01:58 - Active TODO emptied after closing current items` - `.agents/evidence/TODO.md`, `.agents/evidence/CHANGELOG.md`
9. `[perf][done] 2026-03-26 01:58 - Split the large Vite main chunk` - `app/main.js`, `animator-engine/choose-lesson/select-lesson-from-location.js`, `lesson-engine/register-lesson-packages/index.js`
10. `[governance][done] 2026-03-26 01:58 - Legacy archive docs banner sweep completed` - `animator/agents.md`, `lessons/lesson-architecture.md`
11. `[feature][done] 2026-03-26 - App shell moved under app/ with root compatibility aliases` - `app/index.html`, `app/main.js`, `index.html`, `main.js`, `vite.config.js`, `sidebar-step-by-step.html`
12. `[feature][done] 2026-03-26 - Source-only lesson authoring contract locked` - `.agents/authoring/LESSON_AUTHORING.md`, `.agents/architecture/lesson-architecture.md`, `AGENTS.md`
13. `[feature][done] 2026-03-26 - Lesson engine compiler boundary introduced` - `lesson-engine/compile-lesson-package.js`, `lesson-engine/read-scenes-contract.js`, `animator-engine/play-lesson/listen-to-step/compose-step-narration-text.js`
14. `[feature][done] 2026-03-26 - Lesson source validation command added` - `lesson-engine/validate-source-lessons.js`, `package.json`, `AGENTS.md`
15. `[governance][done] 2026-03-26 - Source-only migration governance completed` - `.agents/architecture/migration-governance.md`
16. `[decision][done] 2026-03-26 - Merge dump kept as portable working backup` - `merge-files.sh`, `step-by-step-animator.txt`
17. `[governance][done] 2026-03-26 01:47 - Mandatory work flow locked as plan -> todo -> evidence` - `AGENTS.md`, `.agents/planning/PLAN.md`, `.agents/evidence/TODO.md`, `.agents/evidence/CHANGELOG.md`
