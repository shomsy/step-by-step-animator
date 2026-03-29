# TODO

Canonical active implementation queue.

## Rules

- keep newest items first
- keep each item outcome-oriented
- record `id`, `created_at`, `updated_at`, `status`, and `estimate`
- include acceptance criteria
- include owner only when needed

## Current Items

### TODO-005 | Implement writer-first Write Mode V2
- created_at: `2026-03-29 16:34 CEST`
- updated_at: `2026-03-29 16:34 CEST`
- status: `in_progress`
- estimate: `1 iteration`
- owner: `codex`
- scope:
  - hide frontmatter from the default opening frame and land the lesson on the first real `# Step`
  - restore a right inspector panel with preview, compile status, validation errors, and current snapshot
  - make the outline compact and list-like instead of card-heavy
  - strengthen DSL hierarchy in the central editor for `Step`, `Scene`, `Narration`, and `Show Code`
  - make `/ Insert block` the primary context-aware authoring path with valid templates
  - keep Write Mode writer-first and keep admin/studio surfaces secondary
  - define clear ownership for CodeMirror, BlockNote, and CKEditor 5 so multiple editors never fight over the same raw content
- acceptance criteria:
  - opening a lesson shows the first `Step`, not the frontmatter
  - the inspector stays visible and useful without switching modes
  - outline navigation is compact and secondary to the editor
  - slash insert opens the correct context-aware DSL menu
  - BlockNote is used where prose/block authoring is a better fit, not as a second source of truth
  - CKEditor 5 is only kept if a specific WYSIWYG surface still justifies it
  - the canonical lesson script remains the owned source of truth
  - tests and build are updated before closure

## Legacy Reference

See legacy queue at `.agents/management/evidence/TODO.md`.
