# Step By Step Animator

Step By Step Animator is an interactive lesson engine for HTML, CSS, and JavaScript tutorials that feel like watching a developer work live over screen share.

## Where To Start

- `AGENTS.md` defines the operational contract for work in this repo.
- `.agents/README.md` maps the visible project workspace and local memory.
- `.agents/.rules/AGENTS.md` is the mounted copy of the reusable `.agents` project from the upstream `agent-governance` repo. If it is missing in a fresh clone, run `git submodule update --init --recursive`.
- `.agents/management/TIMELINE.md` defines the timestamp and estimation law.
- `.agents/management/ACTIVE.md` mirrors the current active task and bug board.
- `.agents/business-logic/README.md` defines the plain-language business meaning.
- `product/app/index.html` and `product/app/main.js` are the live app entry points.
- `product/education/lessons/01-build-sidebar/source/lesson.script.md` is the default shipped lesson source for the cold-start experience.
- `system/lesson-engine/register-lesson-packages/index.js` registers the live lesson set and declares the default lesson id.

## Repository Map

### Canonical Live Shape

The live repo is organized around these boundaries:

- `product/` is the product surface
  - `product/app/` is the canonical browser shell and Vite root
  - `product/education/` is source-only lesson authoring
- `system/lesson-engine/` translates lesson source into compiled lesson data and writes derived docs to `system/lesson-engine/output/`
- `system/` is the runtime boundary
  - `system/animator-engine/` plays compiled lesson packages
- `system/foundation/` contains shared frontmatter and markdown primitives
- `system/lesson-engine/output/` holds derived output

### Governance And Documentation

- `.agents/` contains the visible project workspace and local memory
- `.agents/.rules/` contains the mounted reusable `.agents` project
- `.agents/README.md` gives the project map and required questions in one place
- `.agents/management/TODO.md`, `BUGS.md`, `ACTIVE.md`, and `TIMELINE.md` capture active work and queue discipline
- `.agents/management/evidence/CHANGELOG.md` captures closed history
- `.agents/management/evidence/RELEASE_CHECKLIST.md` captures release readiness
- `.agents/language-specific/README.md` captures repo-local language and framework overlays
- `.agents/business-logic/README.md` captures the user and software perspectives
- `.agents/review/REVIEWS.md` captures active review findings
- `AGENTS.md` is the canonical operational contract for the repo
- `README.md` is the human-friendly start-here document

### Tests And Tooling

- `tests/` contains the contract, flow, and browser smoke validation harness
- `merge-files.sh` creates the merged repository snapshot
- implementation and bugfix closure in this repo is: validate, run `./merge-files.sh .`, commit, then push
- `vite.config.js` configures the Vite build

### Local Working Directories And Mounted Dependencies

- `dist/` is the build output directory
- `node_modules/` contains installed dependencies
- `.agents/.rules/vendor/agent-governance/` is the mounted upstream rules submodule
- `step-by-step-animator.txt` is the merged snapshot and working backup

### Git Metadata

- `.git/` is repository metadata and is intentionally not part of the product surface

## Install

```bash
git clone --recurse-submodules <repo-url>
cd step-by-step-animator
npm install
```

If the repo was already cloned without submodules, recover the mounted rules tree first:

```bash
git submodule update --init --recursive
```

`npm install` and the canonical repo commands also re-check the mounted `.agents/.rules` tree before running.

## Run Locally

Start the dev server:

```bash
npm run dev
```

Then open the app in your browser:

- `http://localhost:5173/`
- `http://localhost:5173/?workspace=authoring`

Vite is rooted at `product/app/`, so the canonical shell is served from the server root.

## Application Flow

```mermaid
flowchart TD
  Browser[Browser]
  AppIndex[product/app/index.html]
  AppMain[product/app/main.js]
  SelectLesson[system/animator-engine/choose-lesson/select-lesson-from-location.js]
  Registry[system/lesson-engine/register-lesson-packages/index.js]
  LessonPackage[Compiled lesson package]
  PlayPipeline[system/animator-engine/play-lesson/play-lesson.pipeline.js]
  LessonShell[Lesson shell]
  CodePanel[Live code panels]
  PreviewPanel[Live preview panel]

  Browser --> AppIndex --> AppMain --> SelectLesson --> Registry --> LessonPackage --> PlayPipeline --> LessonShell
  LessonShell --> CodePanel
  LessonShell --> PreviewPanel
```

Source authoring flows in the opposite direction:

- `product/education/lessons/<lesson-slug>/source/`
- `system/lesson-engine/`
- `system/lesson-engine/output/`
- `system/animator-engine/`
- `product/app/`

## Available Commands

```bash
npm run dev
npm run build
npm run preview
npm test
npm run validate:lessons
npm run sync:lesson-documents
```

- `npm run build` creates a production bundle with Vite
- `npm run preview` serves the production build locally
- `npm test` runs the contract, flow, and smoke tests
- `npm run validate:lessons` validates the shipped source-only lessons
- `npm run sync:lesson-documents` regenerates lesson documents under `system/lesson-engine/output/`

## Lesson Source

Source-only lessons live under:

```txt
product/education/lessons/<lesson-slug>/source/
```

Each shipped lesson is authored through this canonical source contract:

- `lesson.script.md`
- optional `theory.md`
- optional `assets/`

`lesson.script.md` keeps step, scene, narration, and one-or-more `Show Code` snapshots in one scrollable file. The legacy split source (`lesson.md`, `scenes.md`, `artifacts/`) remains only as an import/migration bridge; the shipped lesson estate uses `lesson.script.md` as the source of truth.

## Authoring Workspace

The browser app now exposes a dedicated authoring workspace at `?workspace=authoring`.

- shipped lesson source is loaded as immutable input
- editable drafts live in browser-side SQLite persistence backed by IndexedDB
- authors can create, open, update, duplicate, delete, publish snapshots, and export `lesson.script.md`
- Write Mode opens on the first real `# Step:` block instead of the raw frontmatter contract
- metadata stays in the `Metadata` drawer while the main editor focuses on the lesson body
- the workspace is split into `Outline | Editor | Inspector`, with live preview, compile state, validation, and snapshots kept in the right column
- `CodeMirror` owns the canonical `lesson.script.md` editing surface in the center panel
- `BlockNote` is lazy-loaded only inside the metadata drawer for prose-rich fields such as `lessonIntro` and `goal.imageCaption`
- `CKEditor 5` is not part of the shipped authoring path because no unresolved WYSIWYG requirement remains
- the editor remains DSL-aware, with slash-triggered block insertion and inline `+ Insert Block` authoring
- drafts still compile back through the same lesson engine contract before save and publish
- the normal player prefers the latest healthy saved paired draft for the selected shipped lesson; broken saved drafts fail closed back to the shipped lesson package
- the authoring state model is explicit: `Draft Saved`, `Unsaved Changes`, `Playable Draft`, `Broken Draft Fallback`, `Published Lesson`, and `No Draft`
- `Save` persists draft content to SQLite only
- `Play` uses the latest healthy saved draft, or fails closed to the shipped lesson package when the saved draft is unhealthy
- `Publish` stores a recoverable version snapshot in SQLite
- `Export` downloads the current `lesson.script.md`, but filesystem materialization is not required for day-to-day authoring
- a restored version snapshot should return the draft to a recoverable saved state instead of acting like a second source of truth

## Notes

- Do not edit generated output by hand.
- The canonical app entry is `product/app/main.js`, and the canonical shell file is `product/app/index.html`.
