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

### PLAN-007 | Make UI-backed lesson authoring the canonical source of truth
- created_at: `2026-03-29 20:20 CEST`
- updated_at: `2026-03-30 00:54 CEST`
- status: `in_progress`
- owner: `codex`
- estimate: `2-3 iterations`
- user goal:
  - write, save, reopen, and play lessons entirely through Write Mode without manually creating or editing lesson source files first
  - keep the authoring flow centered on the UI so copy-paste, step-by-step drafting, and play feel immediate
  - move filesystem dependence out of the authoring path and into publish/export only
- visible result:
  - Write Mode is the canonical place where lessons are authored
  - saved drafts live in the authoring store and reopen instantly in the editor
  - the player uses the latest healthy saved draft or fails closed to the shipped lesson package
  - publish/export can materialize files, but day-to-day authoring does not depend on them
  - a new lesson can start entirely in the UI with no pre-existing folder or source-file scaffold
- technical execution:
  - define Save as draft persistence to the authoring store, Play as compile from the latest healthy saved draft, and Publish/Export as explicit filesystem materialization
  - define the UI-backed authoring store as the canonical source of truth for in-progress lessons
  - keep `lesson.script.md` as the authored document shape, but treat it as persisted draft content rather than a required filesystem contract for authoring
  - separate responsibilities cleanly: authoring store for draft truth, lesson engine for validation and compilation, export/publish for filesystem materialization
  - keep filesystem source files off the critical path for lesson creation, draft editing, and immediate playback
  - keep legacy source-file import/export bridges so shipped lessons can still enter and leave the new model safely
  - preserve the fail-closed player fallback when a saved draft is broken or unplayable
  - preserve a recoverable draft snapshot or last healthy saved draft state on save
  - update authoring docs and validation coverage so the contract matches the UI-first flow
- architecture boundaries:
  - `system/author-lessons/**`
  - `system/lesson-engine/**`
  - `system/animator-engine/**`
  - `product/education/**`
  - `tests/**`
  - `.agents/management/**`
- cold review risks to watch:
  - dual source of truth between the authoring store and the filesystem
  - Save feeling successful without making it clear whether the result is a draft, a publish, or both
  - export/publish diverging from the compiled lesson behavior
  - legacy file-first paths staying on the critical path and undermining the UI-first contract
- acceptance:
  - a lesson can be created, edited, saved, reopened, and played from the UI-backed authoring flow without manually creating lesson source files first
  - a new lesson can be started entirely from the UI without any pre-existing folder or source file scaffold
  - the author does not need filesystem folder work to begin authoring a lesson
  - Save persists draft content to the authoring store only
  - Play compiles from the latest healthy saved draft
  - Publish/Export materializes filesystem artifacts or shipped lesson outputs
  - filesystem source files are not on the critical path for lesson creation, draft editing, or immediate playback
  - play uses the latest healthy saved draft and fails closed to the shipped lesson package when the draft is unhealthy
  - publish/export can generate filesystem artifacts, but authoring itself does not depend on them
  - legacy file-based shipped lessons remain importable until the migration is complete
  - the author can recover the last healthy compiled draft state or a recoverable snapshot after save
  - the UI clearly distinguishes Draft Saved, Playable Draft, Published Lesson, and Broken Draft Fallback states
