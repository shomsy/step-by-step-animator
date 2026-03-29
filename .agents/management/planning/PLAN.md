# Active Plan

This is the selected workstream layer for substantial work.
It sits after backlog or bug capture and before TODO execution.

Update rules:

- keep newest items at the top
- use `YYYY-MM-DD HH:MM TZ` timestamps so duration and aging can be estimated
- keep the plan high-level and outcome-oriented
- keep the user goal, the visible result, and the learning path explicit
- keep the required questions from `AGENTS.md` and `.agents/.rules/governance/quality-gates.md` visible in every workstream
- promote selected ideas or bug triage from the capture lanes into plan workstreams
- write the plan in plain user language first, then technical execution
- add `owner`, `estimate`, and `acceptance` when the workstream is substantial
- add `blocked_by` only when the workstream is waiting on an external dependency
- when a plan item becomes actionable, move it into `.agents/management/TODO.md`
- when an item closes, mirror it in `.agents/management/evidence/CHANGELOG.md`

## Current Workstreams

1. `PLAN-001 | Compact Write Mode shell | updated 2026-03-29 03:45 CEST`
   - `id`: `PLAN-001`
   - `created_at`: `2026-03-29 03:45 CEST`
   - `updated_at`: `2026-03-29 03:45 CEST`
   - `status`: `active`
   - `owner`: `codex`
   - `estimate`: `1-2d`
   - `linked_todo`: `TODO-003`
   - `user_goal`: `Make the authoring workspace feel like a writer-first editor instead of an admin studio.`
   - `visible_result`: `A calm 3-column layout with outline, lesson script editor, and inspector panels.`
   - `learning_path`: `Open lesson -> jump by outline -> insert DSL blocks -> validate -> preview -> save -> continue.`
   - `quality_gates`: `trust, operator clarity, rollback posture, contract stability, state ownership, async containment, deterministic automation, observability, runtime hardening, performance posture, source truth, evidence integrity, self-healing loop`
   - `acceptance`:
     - `Header stays minimal and does not compete with the editor.`
     - `Editor remains the primary work surface.`
     - `Insert Block` is context-aware and inserts valid DSL templates.
     - `Outline` only navigates step and scene structure.
     - `Inspector` shows compile status, validation, preview, and current snapshot only.
     - `Metadata` lives in a drawer or modal instead of the primary flow.
   - `technical_execution`:
     - `system/author-lessons/show-authoring-workspace.js`
     - `system/author-lessons/authoring-workspace.css`
     - `system/author-lessons/lesson-script-workbench.js`
     - `tests/smoke/browser-authoring-smoke.test.js`
