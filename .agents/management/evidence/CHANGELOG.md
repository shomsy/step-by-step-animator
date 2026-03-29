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

1. `[doc][medium] 2026-03-30 01:57 CEST - Closed TODO-012 by removing the repo-local lesson authoring split-brain across README, AGENTS, and local lesson architecture/authoring docs so Write Mode, the authoring store, Save / Play / Publish / Export, and migration posture now use one explicit contract`
   owner: codex
   actual: 25m
1. `[review][medium] 2026-03-30 01:33 CEST - Closed TODO-011 by refactoring lesson-scoped authoring entry and paired-draft synchronization so Write Mode opens the requested shipped lesson, untouched paired drafts refresh from shipped source updates, and normal player selection ignores unpaired same-id drafts`
   owner: codex
   actual: 20m
1. `[review][medium] 2026-03-30 01:15 CEST - Closed TODO-010 by locking the UI-backed authoring contract into shared runtime-state labels, documenting Save / Play / Publish semantics, and adding browser smoke coverage for restoring a published version snapshot back into the draft`
   owner: codex
   actual: 1h 15m
1. `[review][medium] 2026-03-30 01:04 CEST - Closed TODO-009 and the UI-backed authoring review loop by shipping the store-first UI lesson bridge, explicit Draft Saved / Playable Draft / Published Lesson / Broken Draft Fallback state labels, and end-to-end coverage for save, publish, and fail-closed playback`
   owner: codex
   actual: 2h 30m
1. `[review][medium] 2026-03-29 20:20 CEST - Closed TODO-008 by making the normal player prefer the latest healthy saved paired draft through a read-only SQLite override seam, fail closed to the shipped lesson when the saved draft is broken, and revalidating with unit, browser, and build coverage`
   owner: codex
   actual: 35m
1. `[review][medium] 2026-03-29 19:36 CEST - Closed TODO-007 by removing large-paste bottlenecks from Write Mode, deferring heavy analysis after document edits, adding full lesson source paste import without hidden-frontmatter corruption, and revalidating with browser smoke plus the full test/build path`
   owner: codex
   actual: 45m
1. `[review][medium] 2026-03-29 18:29 CEST - Closed TODO-006 and the requested cold review/remediation loop by tightening the Write Mode runtime: lighter outline rail, stronger DSL hierarchy, clearer slash insert path, exact outline/validation jumps, and stronger active preview verification`
   owner: codex
   actual: 1h
1. `[review][medium] 2026-03-29 17:43 CEST - Closed TODO-005 and the requested whole-system cold review by shipping CodeMirror as the canonical Write Mode editor, lazy-loading BlockNote for prose metadata fields, keeping CKEditor 5 out of the shipped path, and revalidating with tests plus a production build`
   owner: codex
   actual: 2h
1. `[review][medium] 2026-03-29 04:45 CEST - Closed TODO-004 and re-ran the whole-system cold review by shipping Write Mode V2: hidden frontmatter body view, right inspector, lighter outline, stronger DSL hierarchy, exact save/publish cursor preservation, and V2 smoke coverage`
   owner: codex
   actual: 15m
1. `[review][medium] 2026-03-29 04:13 CEST - Closed TODO-003 and the requested whole-system cold review by shipping the compact Write Mode workspace, fixing the export dead path and hidden-overlay hit-test bug, and revalidating with tests plus a production build`
   owner: codex
   actual: 3h
1. `[feature][medium] 2026-03-28 22:00 CET - Closed TODO-001 and TODO-002 by migrating every shipped lesson to lesson.script.md and shipping a SQLite-backed lesson authoring studio with browser SCRUD, publish snapshots, export, and live compile preview`
   owner: codex
   actual: 4h
1. `[doc][medium] 2026-03-28 17:54 CET - Locked the local implementation and bugfix closure sequence to: validate, run ./merge-files.sh ., commit, then push`
   owner: codex
   actual: 10m
1. `[feature][medium] 2026-03-28 17:04 CET - Shipped the human-first lesson.script.md source path with a script compiler, mixed-format source validation, generated lesson docs, and a registered script-authored demo lesson`
   owner: codex
   actual: 1h
1. `[review][medium] 2026-03-28 15:40 CET - Closed BUG-002 whole-system review remediation after removing the remote font dependency, aligning narration product copy, and adding narration runtime regression coverage`
   owner: codex
   actual: 1h
1. `[bug][low] 2026-03-28 03:30 CET - Closed BUG-001 after escaping lesson tag rendering, aligning active queues, and validating the production-ready path`
   owner: codex
   actual: 30m
1. `[doc][medium] 2026-03-27 18:01 - Thinned AGENTS.md and wired the required questions into .agents`
   owner: codex
   actual: 1h
