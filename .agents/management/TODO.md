# TODO

Canonical active implementation queue.

## Rules

- keep newest items first
- keep each item outcome-oriented
- record `id`, `created_at`, `updated_at`, `status`, and `estimate`
- include acceptance criteria
- include owner only when needed

## Current Items

1. `TODO-003 | Implement compact Write Mode shell | updated 2026-03-29 03:45 CEST`
   - `id`: `TODO-003`
   - `created_at`: `2026-03-29 03:45 CEST`
   - `updated_at`: `2026-03-29 03:45 CEST`
   - `status`: `in_progress`
   - `owner`: `codex`
   - `estimate`: `1-2d`
   - `acceptance`:
     - `Write Mode renders as a calm 3-column layout.`
     - `Outline jumps to step and scene sections.`
     - `Insert Block` is context-aware at root, step, and scene levels.
     - `Inspector` is secondary and contains validation, preview, and snapshot only.
     - `Metadata` is removed from the primary authoring flow and lives in a drawer or modal.
     - `browser-authoring-smoke` passes against the new flow.

## Legacy Reference

See legacy queue at `.agents/management/evidence/TODO.md`.
