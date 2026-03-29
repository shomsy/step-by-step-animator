# TODO

Canonical active implementation queue.

## Rules

- keep newest items first
- keep each item outcome-oriented
- record `id`, `created_at`, `updated_at`, `status`, and `estimate`
- include acceptance criteria
- include owner only when needed

## Current Items

1. `TODO-003 | Implement compact Write Mode shell | updated 2026-03-29 03:51 CEST`
   - `id`: `TODO-003`
   - `created_at`: `2026-03-29 03:45 CEST`
   - `updated_at`: `2026-03-29 03:51 CEST`
   - `status`: `in_progress`
   - `owner`: `codex`
   - `estimate`: `1-2d`
   - `wireframe_reference`:
     - `Mermaid compact layout is the canonical structural sketch for V1.`
     - `Keep the same component boundaries: TopBar, OutlinePanel, LessonScriptEditor, and InspectorStrip.`
     - `The attached compact dark wireframe is the visual target for the authoring shell.`
   - `scope`:
     - `Write Mode is editor-first, flow-first, and DSL-first.`
     - `The layout is exactly three columns: outline, lesson script editor, and inspector.`
     - `The header stays small and only shows lesson title, save status, compile status, Preview, Save, Publish, and Metadata.`
     - `The outline shows step and scene structure only, with + Step and + Scene actions for navigation-first authoring.`
     - `The editor is a single large lesson script surface with Step, Scene, Narration, and Show Code blocks in the main flow.`
     - `The Insert Block dropdown is context-aware at root, step, and scene levels and always inserts valid DSL templates.`
     - `The inspector shows compile status, validation errors, live preview, and current snapshot only.`
     - `Metadata moves to a drawer or modal and stays out of the primary writing loop.`
     - `Save state and compile state stay separate and are never conflated.`
     - `Secondary actions stay in secondary surfaces and do not dominate the workspace.`
   - `acceptance`:
     - `Write Mode renders as a calm 3-column layout.`
     - `Header stays smaller than the editor and does not read like a studio dashboard.`
     - `Outline jumps to step and scene sections.`
     - `+ Step` and `+ Scene` act like navigation-first authoring helpers.
     - `Insert Block` is context-aware at root, step, and scene levels.
     - `Inspector` is secondary and contains validation, preview, and snapshot only.
     - `Metadata` is removed from the primary authoring flow and lives in a drawer or modal.
     - `Preview follows the active step or scene and shows the current artifact snapshot without hijacking the editor.`
     - `Saved and Valid status indicators stay separate and readable.`
     - `browser-authoring-smoke` passes against the compact write flow.
   - `delivery_waves`:
     - `Wave 1: compact shell, 3-column layout, minimal header, and primary editor focus.`
     - `Wave 2: context-aware insert menu, outline jump behavior, and preview/validation sync.`
     - `Wave 3: metadata drawer, snapshot tabs, keyboard shortcuts, and polish.`

## Legacy Reference

See legacy queue at `.agents/management/evidence/TODO.md`.
