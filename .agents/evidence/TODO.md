# Active TODO

This is the active backlog for follow-up work.
It is fed by `.agents/planning/PLAN.md`.

Update rules:

- keep newest items at the top
- mark each item with a status tag
- add `owner`, `estimate`, and `blocked_by` when the follow-up is substantial
- move completed items to the evidence ledger when they are closed
- use `YYYY-MM-DD HH:MM` timestamps for new items so task age and cycle time can be estimated

## Current Items

1. `[follow-up] 2026-03-26 02:07 - Add node:test harness | owner: codex | estimate: 1 session | blocked_by: none` - introduce `tests/contracts`, `tests/flows`, and `tests/smoke` with a small package script wrapper
2. `[follow-up] 2026-03-26 02:07 - Cover lesson compiler contracts | owner: codex | estimate: 1-2 sessions | blocked_by: test harness` - add deterministic compiler, manifest, scenes DSL, and cross-reference tests
3. `[follow-up] 2026-03-26 02:07 - Cover runtime seams | owner: codex | estimate: 1 session | blocked_by: compiler contracts` - add registry selection, lazy lesson loading, and narration fallback smoke tests
