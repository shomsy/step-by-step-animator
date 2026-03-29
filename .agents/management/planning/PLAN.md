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

1. `PLAN-001 | Compact Write Mode shell | updated 2026-03-29 03:51 CEST`
   - `id`: `PLAN-001`
   - `created_at`: `2026-03-29 03:45 CEST`
   - `updated_at`: `2026-03-29 03:51 CEST`
   - `status`: `active`
   - `owner`: `codex`
   - `estimate`: `1-2d`
   - `linked_todo`: `TODO-003`
   - `user_goal`: `Make the authoring workspace feel like a writer-first editor instead of an admin studio.`
   - `visible_result`: `A calm 3-column layout with outline, lesson script editor, and inspector panels.`
   - `learning_path`: `Open lesson -> jump by outline -> insert DSL blocks -> validate -> preview -> save -> continue.`
   - `wireframe_reference`: `Mermaid compact layout: TopBar -> Workspace -> InspectorStrip, with OutlinePanel and LessonScriptEditor inside the main workspace; use it as the structural sketch for the writer-first shell, not as pixel-perfect art.`
   - `visual_reference`: `The attached dark compact wireframe is the UI target for the shell: small top bar, outline on the left, lesson script editor in the center, and a bottom inspector strip.`
   - `ui_scope`:
     - `Header shows lesson title, save status, compile status, Preview, Save, Publish, and Metadata only.`
     - `Outline is a light navigation panel for steps and scenes, with + Step and + Scene actions.`
     - `Editor is one large text-first lesson script surface with clear block spacing and no form-first editing.`
     - `Insert Block is a DSL insert tool opened by button, /, or shortcut, with context-aware options.`
     - `Inspector is a support panel for compile status, validation, live preview, and current snapshot.`
     - `Metadata lives in a drawer or modal and keeps lessonIntro and goal fields out of the main flow.`
     - `Preview follows the active step or scene context and never becomes the dominant workspace surface.`
     - `Save state and compile state remain distinct so Saved and Valid can be read independently.`
     - `Primary actions are Save, Preview, Insert Block, Add Step, and Add Scene; duplicate/delete/publish/export stay secondary.`
   - `implementation_waves`:
     - `Wave 1: compact shell, 3-column layout, minimal header, and editor-first visual hierarchy.`
     - `Wave 2: context-aware insert menu, outline jump behavior, validation links, and preview synchronization.`
     - `Wave 3: metadata drawer polish, snapshot presentation, keyboard shortcuts, and focus-state refinements.`
   - `quality_gates`: `trust, operator clarity, rollback posture, contract stability, state ownership, async containment, deterministic automation, observability, runtime hardening, performance posture, source truth, evidence integrity, self-healing loop`
   - `acceptance`:
     - `Header stays minimal and does not compete with the editor.`
     - `Editor remains the primary work surface.`
     - `Insert Block` is context-aware and inserts valid DSL templates.
     - `Outline` only navigates step and scene structure.
     - `Inspector` shows compile status, validation, preview, and current snapshot only.
     - `Metadata` lives in a drawer or modal instead of the primary flow.
     - `Save and compile status are separate and never conflated.`
     - `Outline clicks land on the correct step or scene in the editor.`
     - `Preview tracks the active step or scene context instead of acting as a random dashboard.`
     - `browser-authoring-smoke` validates the writer flow without falling back to the admin studio path.
   - `technical_execution`:
     - `system/author-lessons/show-authoring-workspace.js`
     - `system/author-lessons/authoring-workspace.css`
     - `system/author-lessons/lesson-script-workbench.js`
     - `tests/smoke/browser-authoring-smoke.test.js`
