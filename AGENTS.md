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
- `07-more-separation-of-code`
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

Rules:

- if we change structure, naming or responsibility boundaries, we change the owning document in the same work item
- no silent exceptions
- repo-specific rule may narrow the standard, but may not weaken it without explicit record

## 2. Technical Contract

### 2.1 Architecture Shape

The repo follows business-first screaming architecture.

This repo is currently in a big-bang migration window toward the source-only lesson-engine model. New work must follow the target boundaries even while the legacy tree still exists.
The execution order for that migration is defined in `.agents/architecture/big-bang-refactor-plan.md`.

Repo-level shape must stay in sync with `.agents/architecture/architecture-standard.md`, and repo-specific rules are documented in `.agents/architecture/ARCHITECTURE.md`.

Read the tree in this order:

1. flow
2. feature slice
3. file responsibility
4. function action

Root is intentionally divided into two areas:

- `animator/` is technical runtime, shell, playback and document tooling
- `lessons/` are business lesson slices and their content

Target canonical shape after migration:

```txt
app/
  index.html
  main.js
  shell/
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
animator-engine/
  choose-lesson/
  play-lesson/
foundation/
  filesystem/
  markdown/
  frontmatter/
  validation/
  logging/
  storage/
  hashing/
generated/
  lesson-packages/
  lesson-documents/
  validation-reports/
```

Legacy live shape until migration completes:

```txt
animator/
  choose-lesson/
    select-lesson-from-location.js
    present-lesson-picker.js
  play-lesson/
    play-lesson.pipeline.js
    lesson-player.css
    escape-inline-text.js
    01-start-lesson/
      find-lesson-parts.js
      create-lesson-progress.js
      show-lesson-shell.js
    02-follow-lesson/
      listen-for-lesson-keys.js
      show-active-lesson-panel.js
      show-current-step.js
      show-step-timeline.js
    03-watch-code/
      compare-code-lines.js
      describe-css-line-role.js
      escape-code-text.js
      scroll-to-added-line.js
      show-growing-code.js
    04-watch-preview/
      show-current-preview.js
    05-download-lesson-files/
      download-lesson-files.js
    listen-to-step/
      compose-step-narration-text.js
      present-step-narration.js
      read-step-narration-preferences.js
      speak-with-browser-voice.js
      speak-with-open-source-voice.js
      write-step-narration-preferences.js
    find-step/
      present-step-finder.js
    save-step/
      read-saved-step-numbers.js
      write-saved-step-numbers.js
      show-saved-step-list.js
      remember-saved-steps.js
    choose-theme/
      choose-theme.js
  lesson-documents/
    build-lines-from-rule-blocks.js
    build-lines-from-timeline-blocks.js
    parse-frontmatter.js
    read-fenced-json-value.js
    render-markdown.js
    read-lesson-metadata.js
    read-rule-blocks.js
    read-timeline-blocks.js
    sync-lesson-documents.js
lessons/
  register-lessons.js
  01-build-sidebar/
    build-sidebar.lesson.js
    describe-steps.js
    build-html-at-step.js
    build-css-at-step.js
    content/
      documents/
        01_build_sidebar.md
        files/
          lesson.sr.md
          html.timeline.md
          css.rules.md
  04-build-web-component/
    build-web-component.lesson.js
    describe-steps.js
    build-html-at-step.js
    build-css-at-step.js
    build-js-at-step.js
    content/
      assets/
        web-component-goal.svg
      documents/
        04_build_web_component.md
        files/
          lesson.sr.md
          html.timeline.md
          css.rules.md
          js.timeline.md
  03-build-custom-element/
    build-custom-element.lesson.js
    describe-steps.js
    build-html-at-step.js
    build-css-at-step.js
    build-js-at-step.js
    content/
      assets/
        custom-element-goal.svg
      documents/
        03_build_custom_element.md
        files/
          lesson.sr.md
          html.timeline.md
          css.rules.md
          js.timeline.md
  02-build-top-navigation/
    build-top-navigation.lesson.js
    describe-steps.js
    build-html-at-step.js
    build-css-at-step.js
    content/
      assets/
        top-navigation-goal.svg
      documents/
        02_build_top_navigation.md
        files/
          lesson.sr.md
          html.timeline.md
          css.rules.md
  05-clean-web-component-with-adopted-stylesheets/
    clean-web-component-with-adopted-stylesheets.lesson.js
    describe-steps.js
    build-html-at-step.js
    build-css-at-step.js
    build-js-at-step.js
    build-shadow-css-at-step.js
    content/
      assets/
        web-component-goal.svg
      documents/
        05_clean_web_component_with_adopted_stylesheets.md
        files/
          lesson.sr.md
          html.timeline.md
          css.rules.md
          js.timeline.md
          shadow-dom-style.css.md
  06-modular-web-components/
    06-modular-web-components.lesson.js
    describe-steps.js
    build-html-at-step.js
    build-css-at-step.js
    build-js-at-step.js
    build-shadow-css-at-step.js
    content/
      assets/
        web-component-goal.svg
      documents/
        06_modular_web_components.md
        files/
          lesson.sr.md
          html.timeline.md
          css.rules.md
          js.timeline.md
          shadow-dom-style.css.md
  07-more-separation-of-code/
    07-more-separation-of-code.lesson.js
    describe-steps.js
    build-html-at-step.js
    build-css-at-step.js
    build-js-at-step.js
    build-template-js-at-step.js
    build-shadow-css-at-step.js
    content/
      assets/
        web-component-goal.svg
      documents/
        07_more_separation_of_code.md
        files/
          lesson.sr.md
          html.timeline.md
          css.rules.md
          js.timeline.md
          template-js.timeline.md
          shadow-dom-style.css.md
```

### 2.2 Lesson Contract

New lesson work must use the source-only contract from `.agents/authoring/LESSON_AUTHORING.md`.

That means:

- source lives under `education/lessons/<lesson-slug>/source/`
- the author writes `lesson.md`, `scenes.md`, optional `theory.md`, `artifacts/`, and `assets/`
- `lesson-engine/` owns parsing, validation, normalization, projection, compilation and generated docs
- the legacy `feature-name.lesson.js` lesson slice shape is frozen for migrated lessons only
- do not introduce new `lesson.js`, `describe-steps.js`, or per-lesson `build-*` files for source-only lessons
- if a lesson is not yet migrated, treat the legacy slice as read-only and add a source-only pilot instead of extending the old shape

### 2.3 Lesson Documents

The exact source-only authoring contract is documented in `.agents/authoring/LESSON_AUTHORING.md`.

The legacy `content/documents/files/` shape still exists in migrated lessons until it is retired, but it is not the shape to extend for new work.

### 2.4 Runtime and Entry Rules

- no `src/` folder
- `main.js` is root entry
- `index.html` is generic lesson shell
- `sidebar-step-by-step.html` is compatible alias for `01-build-sidebar`
- build goes through Vite
- `animator-engine/` is the runtime boundary used by the app entrypoint
- `lesson-engine/` owns source translation for source-only lessons
- `animator/` remains the legacy runtime implementation area until migration completes
- `lessons/` remains the legacy lesson slice area until each lesson is migrated into `education/`
- the current pilot lesson is compiled from `education/lessons/02-build-top-navigation/source/`

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

In `lessons/` this applies to shipped learning path:

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
find animator lessons -name '*.js' -print0 | xargs -0 -n1 node --check && node --check main.js
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
2. run `./merge-files.sh .` from repo root
3. do `git add -A`
4. make a normal `git commit`
5. do `git push`

Do not finish an implementation pass without this closing, unless the user explicitly asks not to commit or push.

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
- the current pilot version is compiled from `education/lessons/02-build-top-navigation/source/` through `lesson-engine/`

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

1. create new source folder under `education/lessons/<lesson-slug>/source/`
2. add `lesson.md`
3. add `scenes.md`
4. add optional `theory.md` only if the lesson actually needs theory prose
5. add `artifacts/` with the source artifacts declared in `lesson.md`
6. add `assets/` if the lesson uses reference images or other authoring assets
7. compile the lesson through `lesson-engine/`
8. register the compiled package through the registry adapter, not through a new per-lesson build file

Do not add new `lesson.js`, `describe-steps.js`, or per-lesson `build-*` files for new source-only lessons.
Do not copy player runtime from `animator/play-lesson/`.
New lesson should only add its source contract and its content.
