# Planning Archive

This file keeps legacy planning notes that are no longer active work.
The active ideas live in `.agents/management/backlog/BACKLOG.md`.
The active bug queue lives in `.agents/management/bugs/BUGS.md`.
The active plan lives in `.agents/management/planning/PLAN.md`.
The active implementation queue lives in `.agents/management/TODO.md`.
The evidence ledger lives in `.agents/management/evidence/CHANGELOG.md`.

- 2026-03-30 03:23 CEST - PLAN-009 completed: added shared human-readable authoring diagnostics so Write Mode keeps one validation truth across the right inspector and inline editor lint markers, with plain-language guidance and exact location jumps.
- 2026-03-30 03:38 CEST - PLAN-010 completed: made real browser paste deterministic in Write Mode so full lesson sources and large multi-step lesson bodies replace the starter scaffold correctly, then proved the behavior through the actual `paste` event path with save and reload coverage.
- 2026-03-29 20:20 CEST - PLAN-006 completed: shipped a read-only player draft-override seam so the normal player prefers the latest healthy saved paired draft, fails closed to the shipped lesson when the saved draft is broken, and keeps the lesson picker deterministic.
- 2026-03-30 01:15 CEST - PLAN-008 completed: tightened the UI-backed authoring contract with a shared runtime-state module, explicit Save/Play/Publish labels, a browser restore-version recovery proof, and updated authoring docs so the draft/play/publish contract stays explicit.
- 2026-03-30 01:04 CEST - PLAN-007 completed: shipped the UI-backed lesson authoring bridge so Write Mode owns draft creation, save/reopen, playability state, published snapshot visibility, and fail-closed fallback semantics without requiring filesystem source scaffolds during authoring.
- 2026-03-29 19:36 CEST - PLAN-005 completed: removed large-paste friction from Write Mode by deferring heavy analysis after document edits, keeping cursor-only updates cheap, and safely importing full lesson sources through the body-first editor without duplicating hidden frontmatter.
- 2026-03-29 18:29 CEST - PLAN-004 completed: tightened Write Mode runtime into a calmer writer-first workspace by lightening the outline rail, strengthening the DSL hierarchy, making slash insert more explicit, improving exact validation jumps, and closing TODO-006 with a zero-finding cold review.
- 2026-03-29 17:43 CEST - PLAN-003 completed: shipped the hybrid Write Mode authoring surface with CodeMirror owning canonical `lesson.script.md`, lazy-loaded BlockNote metadata prose editors, maintained the writer-first layout, and closed TODO-005 after a zero-finding cold review/remediation loop.
- 2026-03-29 04:45 CEST - PLAN-002 completed: shipped Write Mode V2 with a body-first lesson editor, a true right inspector, hidden metadata-by-drawer flow, and closed TODO-004 plus the follow-up cold review/remediation loop.
- 2026-03-29 04:13 CEST - PLAN-001 completed: shipped the compact Write Mode authoring workspace, closed TODO-003, and finished the whole-system cold review/remediation loop.
- 2026-03-26 15:26 - Product/System Refactor Realignment completed: moved lesson-engine into `system/lesson-engine/`, moved generated lesson docs into `system/lesson-engine/output/`, populated `system/foundation/` with `frontmatter/` and `markdown/`, and cleared the active follow-up queue.
- 2026-03-26 15:34 - Production readiness review completed: fixed the stale lesson-doc sync root and updated runtime test imports to the `system/` tree; validation, build, and tests passed afterward.
