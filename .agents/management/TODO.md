# TODO

Canonical active implementation queue.

## Rules

- keep newest items first
- keep each item outcome-oriented
- record `id`, `created_at`, `updated_at`, `status`, and `estimate`
- include acceptance criteria
- include owner only when needed

## Current Items

### TODO-009 | Build the first store-first bridge for UI lesson authoring
- created_at: `2026-03-29 20:20 CEST`
- updated_at: `2026-03-29 20:20 CEST`
- status: `in_progress`
- owner: `codex`
- estimate: `1-2 iterations`
- outcome:
  - a lesson can be authored in Write Mode, saved, reopened, and played without depending on manual filesystem source-file setup
- scope:
  - make the authoring store the primary persistence path for in-progress lesson drafts
  - keep the lesson script DSL as the canonical authored document shape inside the UI flow
  - bridge the player to the latest healthy saved draft with explicit fail-closed fallback to the shipped lesson package
  - keep import/export compatibility for existing source-file lessons
  - add tests that prove the UI draft round-trip and playback behavior end to end
- acceptance:
  - Write Mode can save and reopen a draft without requiring manual file creation
  - the player prefers the saved draft when it is healthy
  - the player fails closed to the shipped lesson when the saved draft is broken
  - filesystem artifacts are treated as publish/export output, not the required authoring input
  - validation proves the bridge from UI draft to playback works end to end

## Legacy Reference

See legacy queue at `.agents/management/evidence/TODO.md`.
