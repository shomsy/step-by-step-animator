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

### PLAN-003 | Hybrid editor architecture for lesson authoring
- created_at: `2026-03-29 04:45 CEST`
- updated_at: `2026-03-29 16:34 CEST`
- status: `in_progress`
- owner: `codex`
- estimate: `1-2 iterations`
- user goal:
  - manage lesson content with the editor that fits the content instead of forcing one editor to do everything
  - keep the DSL lesson script fast and precise while giving prose and metadata a friendlier rich-text surface
  - preserve the writer-first workflow and avoid turning authoring into a generic CMS
  - make Write Mode open on the first real lesson step instead of the raw frontmatter contract
- visible result:
  - CodeMirror-style surface for canonical `lesson.script.md`
  - BlockNote surface for block and prose content
  - CKEditor 5 only if a specific classic WYSIWYG surface still proves necessary
  - one unified authoring experience where each surface edits the slice it is best suited for
  - lesson opens on `# Step`, with frontmatter hidden or collapsed by default
  - right inspector keeps preview, compile, validation, and snapshot visible while writing
  - outline reads as a compact navigation rail instead of a second dashboard
  - `/ Insert block` becomes the primary authoring path for valid DSL templates
- technical execution:
  - define a canonical lesson model and explicit ownership boundaries per content slice
  - keep `lesson.script.md` as the owner of DSL steps, scenes, narration, and code blocks
  - move prose-rich fields and metadata into a BlockNote-backed drawer or secondary workspace
  - use CodeMirror for line-oriented DSL editing, slash insert, and validation jump targets
  - reserve CKEditor 5 for any legacy or narrow WYSIWYG requirement after proving BlockNote cannot cover it
  - model synchronization as projection and serialization, not three editors mutating the same raw string concurrently
  - add migration and validation tests for round-tripping content between projections and canonical source
  - apply the writer-first Write Mode V2 layout rules: body-first opening, compact outline, right inspector, stronger DSL hierarchy, and context-aware insert flow
- architecture boundaries:
  - `system/author-lessons/**`
  - `system/lesson-engine/**`
  - `product/education/**`
  - `tests/**`
- cold review risks to watch:
  - multiple editors fighting over the same canonical content
  - serialization drift between projections
  - accidental downgrade of the writer-first lesson DSL flow
  - introducing rich text where plain text remains the safer contract
  - the first frame still feeling like a system document instead of a lesson
  - the inspector collapsing into badges or hidden tabs instead of a real side panel
- acceptance:
  - the plan explicitly names which content slice each editor owns
  - the canonical lesson script remains the source of truth
  - BlockNote is selected for the most natural prose and block surface
  - CodeMirror remains the primary DSL authoring surface
  - CKEditor 5 is either justified or removed from the final implementation scope
  - a follow-up TODO can be sliced cleanly from this plan without ambiguity
  - the next executable slice can start from the Write Mode V2 UI rules without any further clarification
