# AGENTS

This file is the canonical operational contract for working on this repo.

## 1. Product Intent

This repo is `Step By Step Animator`.

It is a lesson engine for interactive HTML/CSS/JS lessons that should look like you're watching a programmer over share screen.

The engine is generic.

Currently shipped lessons are:

- `01-build-sidebar`
- `02-build-top-navigation`
- `03-build-custom-element`
- `04-build-web-component`
- `05-clean-web-component-with-adopted-stylesheets`
- `06-modular-web-components`
- `07-build-ui-user-avatar`
- `08-smell-of-enterprise`

Every new lesson must use the same shell and the same teaching model:

- HTML goes element by element
- CSS goes property by property
- when the lesson requires it, JS goes action by action
- preview shows exactly the same cumulative HTML/CSS/JS that is currently written
- changes must be clear, predictable and easy to verbalize
- for Web Components lessons, JS must first create the actual rendered DOM, only then CSS may style those parts

This is not a showcase.
This is not a fake storyboard.
This is a teaching product.

## 1.1 Document Authority

This repo has three levels of documents:

- `.agents/architecture/architecture-standard.md` is the reusable architectural baseline.
- `.agents/architecture/ARCHITECTURE.md` is the repo-specific application of that baseline.
- `AGENTS.md` is the operational contract for work, delivery and collaboration in this repo.

## 1.2 Evidence Ledger

`.agents/evidence/CHANGELOG.md` is the single running evidence ledger for features, bugs, TODOs, plans, and major decisions.

Evidence ledger rules:

- if the state of a feature, bug, TODO, or plan changes, update the ledger in the same work item
- keep detailed docs in their owning folders; the ledger only tracks current state and links to the detail when useful
- use `YYYY-MM-DD HH:MM` timestamps for new evidence and backlog entries so duration and aging can be estimated

## 1.3 Active Backlog

`.agents/evidence/TODO.md` is the active backlog for follow-up work.

Backlog rules:

- when a review or implementation pass leaves follow-up work, add it to `.agents/evidence/TODO.md`
- when an item is completed, remove it from `.agents/evidence/TODO.md` and mirror the state change in `.agents/evidence/CHANGELOG.md`
- do not rely on memory or chat history as the source of truth for pending work
- use `YYYY-MM-DD HH:MM` timestamps for new backlog entries so duration and aging can be estimated
- only `.agents/evidence/TODO.md` is the active TODO list; planning archive files are historical only
- if `.agents/evidence/TODO.md` has no active work, it should say `No active items.`

### Legacy Removal Governance

When something is confirmed legacy and no longer part of the live contract, delete it from the repo surface instead of keeping a parallel compatibility layer.

Rules:

- delete legacy files and folders physically when they are no longer required by the live app
- remove their active references from README, AGENTS, and architecture docs in the same work item
- keep closed migration history only in `.agents/evidence/CHANGELOG.md`
- do not leave a legacy surface in the product tree

## 1.4 Mandatory Work Flow

Every substantial work item must flow through these three layers in order:

1. `.agents/planning/PLAN.md`
2. `.agents/evidence/TODO.md`
3. `.agents/evidence/CHANGELOG.md`

Rules:

- `PLAN.md` captures the current workstream and intent
- `TODO.md` captures actionable follow-up work
- `CHANGELOG.md` captures closed evidence and final state
- `planning/ARCHIVE.md` may exist for legacy notes, but it is not an active TODO list
- the active TODO file is not an archive; completed items do not stay there
- do not skip a layer when the item is substantial enough to merit tracking
- keep the three layers aligned in the same work item when the state changes

## 1.5 Work Item Metadata

To keep project management professional and measurable, substantial items should carry lightweight metadata in the trackers:

- `owner`: who is currently responsible for the item
- `estimate`: rough time budget for the current phase
- `blocked_by`: only when the item is waiting on something specific
- `acceptance`: one-line definition of what done means for that item
- `actual`: the real time spent, recorded when the item closes

Rules:

- use the same metadata language across `PLAN.md`, `TODO.md`, and `CHANGELOG.md`
- do not create a new tracker file before using these fields
- keep the metadata short and factual, not essay-like
- if an item grows beyond a single work session, give it an estimate before starting

Document authority rules:

- if we change structure, naming or responsibility boundaries, we change the owning document in the same work item
- no silent exceptions
- repo-specific rule may narrow the standard, but may not weaken it without explicit record

## 2. Technical Contract

### 2.1 Architecture Shape

The repo follows business-first screaming architecture.
The completed migration governance record lives in `.agents/architecture/migration-governance.md`.

Repo-level shape must stay in sync with `.agents/architecture/architecture-standard.md`, and repo-specific rules are documented in `.agents/architecture/ARCHITECTURE.md`.

Read the tree in this order:

1. flow
2. feature slice
3. file responsibility
4. function action

Live canonical shape:

```txt
product/
  app/
    index.html
    main.js
  education/
    lessons/
      <lesson-slug>/
        source/
          lesson.md
          theory.md
          scenes.md
          artifacts/
          assets/
lesson-engine/
  discover-education-content/
  read-education-entry/
  validate-education-entry/
  parse-education-source/
  normalize-lesson-source/
  project-artifact-state/
  compile-lesson-package/
  documentation/
  register-lesson-packages/
  contracts/
  adapters/
system/
  animator-engine/
    choose-lesson/
    play-lesson/
  foundation/
generated/
  lesson-documents/
```

Current live lesson set is registered in `lesson-engine/register-lesson-packages/index.js`.

### 2.2 Lesson Contract

New lesson work must use the source-only contract from `.agents/authoring/LESSON_AUTHORING.md`.

That means:

- source lives under `product/education/lessons/<lesson-slug>/source/`
- the author writes `lesson.md`, `scenes.md`, optional `theory.md`, `artifacts/`, and `assets/`
- `lesson-engine/` owns parsing, validation, normalization, projection, compilation and generated docs
- do not introduce new `lesson.js`, `describe-steps.js`, or per-lesson `build-*` files for source-only lessons
- all lessons are source-only; do not reintroduce the old per-lesson build-glue shape

### 2.3 Lesson Documents

The exact source-only authoring contract is documented in `.agents/authoring/LESSON_AUTHORING.md`.

### 2.4 Runtime and Entry Rules

- no `src/` folder
- `product/app/index.html` is the canonical lesson shell and Vite root entry
- `product/app/main.js` is the canonical app entry
- the live app surface is rooted at `product/app/index.html`
- build goes through Vite
- `system/animator-engine/` is the runtime boundary used by the app entrypoint
- `lesson-engine/` owns source translation for source-only lessons
- the current pilot lesson is compiled from `product/education/lessons/02-build-top-navigation/source/`

### 2.5 Naming Rules

Use this filter before every new name:

> If the folder does not say the flow, the file does not say the responsibility, or the function does not say the exact action, the name is not good enough.

Prohibited bucket names:

- `utils`
- `helpers`
- `shared`
- `common`
- `base`
- `manager`
- `service`
- `controller`

Prohibited verbs:

- `handle`
- `run`
- `process`
- `manage`
- `doStuff`

### 2.6 Vocabulary Rules

In this repo, verbs have locked meaning:

- these buckets are the first filter for file and function names
- before you pick the exact file or function name, classify the work in this order:
  - CRUD: touch one record
  - Query: look at data without changing it
  - Business: do what the business wants
  - System: help the system move, sync, validate or recover
  - State transition: move a thing from one state to another
- `build...` builds derived lesson output for a specific step
- `show...` writes current state to already found page parts
- `present...` holds an interactive user flow
- `create...` initializes progress for a flow
- `find...` finds existing page parts in DOM or in list
- `read...` reads from persistence layer
- `write...` writes to persistence layer
- `play...` orchestrates the complete lesson flow

Do not introduce new synonym generation if existing verb already covers the responsibility.

### 2.7 Numbering Rules

Numbers are used only on flow folders when the order truly carries meaning in the product story.

In `product/education/lessons/` this applies to the shipped learning path:

- `01-build-sidebar`
- `02-build-top-navigation`
- `03-build-custom-element`
- `04-build-web-component`
- `05-clean-web-component-with-adopted-stylesheets`
- `06-modular-web-components`
- `07-more-separation-of-code`
- `08-smell-of-enterprise`

In player runtime this applies to main lesson journey:

- `01-start-lesson`
- `02-follow-lesson`
- `03-watch-code`
- `04-watch-preview`
- `05-download-lesson-files`

Support flows remain unnumbered:

- `find-step`
- `save-step`
- `choose-theme`

Do not number responsibility files.

### 2.8 Preview Integrity Rules

The right preview must be the actual render of the same cumulative HTML/CSS/JS code that the middle panel shows.

This means:

- no manually directed fake preview
- no special preview DOM that deviates from lesson code
- preview must be fed from the same builder functions that feed the lesson contract
- HTML preview must show raw browser result when CSS is not yet added
- CSS preview must affect only as much as currently written
- JS preview must execute exactly the same cumulative JavaScript that the middle panel currently shows

### 2.8a Teaching Visibility Rules

These rules apply to all lessons, without exception:

- `.app-shell` must get its thin helper outline and keep it through the entire lesson, until the final shell summary
- every important HTML element or teaching unit must get its thin helper outline as early as possible
- that outline is not removed immediately when the first final style is added
- outline stays active until the final summary step for that element or unit
- the final summary step for a given element should show its complete CSS and only then turn off the helper outline
- while a CSS step is active for a certain element, the corresponding HTML target in the editor panel must be clearly highlighted in yellow

### 2.9 Verification Rules

After every significant change, обязательно запустите:

```bash
find product system lesson-engine tests scripts -name '*.js' -print0 | xargs -0 -n1 node --check && node --check product/app/main.js
npm run validate:lessons
npm run sync:lesson-documents
npm run build
./merge-files.sh .
```

If you change documentation or flow tree, also refresh the merge dump.
The merged `.txt` dump is a portable repository snapshot and may be used as a working backup during refactor passes.
If you change the architectural structure, check that `.agents/architecture/architecture-standard.md`, `.agents/architecture/ARCHITECTURE.md` and `AGENTS.md` are still in sync.

### 2.10 Delivery Discipline

At the end of every iteration, mandatory final discipline from the repo root is required, even when the change is small.

This means:

1. if the change touched architecture or naming, sync relevant documents
2. update `.agents/planning/PLAN.md` if the work changes plan scope or priority
3. update `.agents/evidence/TODO.md` if the iteration leaves any follow-up work
4. update `.agents/evidence/CHANGELOG.md` if the work changed feature, bug, TODO, or plan state
5. run `./merge-files.sh .` from repo root
6. do `git add -A`
7. make a normal `git commit`
8. do `git push`

Do not finish an implementation pass without this closing, unless the user explicitly asks not to commit or push.

### 2.11 Review and Test Gate

Code review in this repo means iterative quality closure, not a one-shot comment pass.

Rules:

- keep fixing findings until the code matches the requested standards
- relevant tests must pass before the work item can be closed
- if tests fail, the work item stays open
- if review finds a problem, fix it and rerun validation in the same work item
- only after review and tests are green, run `./merge-files.sh .`, then `git add -A`, `git commit`, and `git push`
- do not treat commit/push as a substitute for validation
- do not leave a known-bad state in TODO as if it were done

## 3. Feature Contract

For making new animated lessons and AI prompt template, see [.agents/authoring/LESSON_AUTHORING.md](/home/shomsy/projects/step-by-step-animator/.agents/authoring/LESSON_AUTHORING.md).

### 3.1 Lesson Layout

The application has three main panels:

1. left lesson panel
2. middle live editor panel
3. right live preview panel

Left panel:

- shows current step
- shows description and pro tip
- shows progress
- contains bookmark flow
- contains controls for navigation and playback
- contains open-source narration of current step with auto-read and voice speed control

Middle panel:

- shows HTML file
- shows CSS file
- when the lesson requires it, shows JS file
- all displays are cumulative
- existing lines are muted
- newly added lines are highlighted
- when CSS step is active, the HTML part for the same element must be highlighted in yellow

Right panel:

- takes the entire viewer panel
- imitates browser
- renders the actual cumulative HTML/CSS/JS output

### 3.2 Current Shipped Lessons

`01-build-sidebar` is the reference lesson for the engine.

`02-build-top-navigation` shows additional shell capability:

- goal image showing what we're building
- homework notes for variants we don't implement yet
- the current pilot version is compiled from `product/education/lessons/02-build-top-navigation/source/` through `lesson-engine/`

For it, special teaching rules still apply:

- starts with empty `.app-shell` space
- sidebar is added as the first thing
- no filler content outside of what the lesson actually explains
- helper lines and helper borders stay until the entire visual unit is finished
- outline helpers stay until the final summary step for that element or unit, only then removed

`03-build-custom-element` opens the Web Components path:

- host tag with dash
- registration through `customElements.define`
- attribute API
- first render through light DOM

`04-build-web-component` is the Web Components continuation:

- third, optional JS file in the middle panel
- actual live preview that executes the same cumulative JavaScript
- Web Components teaching flow through custom element, shadow DOM, slot and lifecycle

`05-clean-web-component-with-adopted-stylesheets` closes the cleanup story:

- fourth, optional shadow CSS file in the middle panel
- JavaScript imports `shadow-dom-style.css` as text via `?raw`
- shadow root adopts separated stylesheet via `adoptedStyleSheets`

### 3.3 How To Add A New Lesson

For a new lesson:

1. create new source folder under `product/education/lessons/<lesson-slug>/source/`
2. add `lesson.md`
3. add `scenes.md`
4. add optional `theory.md` only if the lesson actually needs theory prose
5. add `artifacts/` with the source artifacts declared in `lesson.md`
6. add `assets/` if the lesson uses reference images or other authoring assets
7. compile the lesson through `lesson-engine/`
8. register the compiled package through the registry adapter, not through a new per-lesson build file

Do not add new `lesson.js`, `describe-steps.js`, or per-lesson `build-*` files for new source-only lessons.
Do not copy player runtime code into lesson source folders.
New lesson should only add its source contract and its content.
