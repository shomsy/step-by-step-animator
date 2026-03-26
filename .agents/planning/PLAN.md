# Active Plan

This is the mandatory first tracking layer for substantial work.

Update rules:

- keep newest items at the top
- use `YYYY-MM-DD HH:MM` timestamps so duration and aging can be estimated
- keep the plan high-level and outcome-oriented
- add `owner`, `estimate`, and `acceptance` when the workstream is substantial
- add `blocked_by` only when the workstream is waiting on an external dependency
- when a plan item becomes actionable, move it into `.agents/evidence/TODO.md`
- when an item closes, mirror it in `.agents/evidence/CHANGELOG.md`

## Current Workstreams

1. `[active] 2026-03-26 02:07 - Test harness and contract coverage | owner: codex | estimate: 2 sessions | acceptance: core compiler, registry, and runtime seams are covered by focused node:test suites without chasing 100% line coverage` - build a small, contract-first test harness for the lesson engine and runtime seams

Closed workstreams are tracked in `.agents/evidence/CHANGELOG.md`.
