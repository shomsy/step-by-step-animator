# Architecture

This document applies the reusable standard from `architecture-standard.md` to the Step By Step Animator repo.

## Scope and Authority

- `AGENTS.md` governs execution, delivery discipline, and collaboration.
- `architecture-standard.md` defines the reusable architecture baseline.
- This file binds that baseline to this repo and keeps it concrete.

If a repo-specific exception is needed, it must be documented here and it must not lower the baseline quality bar.

## Vertical Slice Intent

This repo uses vertical-slice, feature-first architecture.

- the same model applies to animator runtime slices and lesson business slices
- folder names must describe flow or capability
- file names must describe responsibility
- function names must describe exact action
- the reader should be able to predict what a folder, file or function does before opening it
- the business flow should stay readable from the first feature to the last feature without changing the mental model
- technical slices and product slices should both read as vertical slices

## Repo Shape

This repo has two top-level areas:

- `animator/` for technical runtime and document tooling
- `lessons/` for business lesson slices

The same flow-first reading order applies to both areas.

Read the tree in this order:

1. Flow
2. Feature slice
3. File responsibility
4. Function action

Representative example:

This block is illustrative, not exhaustive. The live lesson set is tracked in `AGENTS.md` and registered in `lessons/register-lessons.js`.

```txt
animator/
  choose-lesson/
    select-lesson-from-location.js
    present-lesson-picker.js
  play-lesson/
    play-lesson.pipeline.js
    lesson-player.css
    01-start-lesson/
      find-lesson-parts.js
      create-lesson-progress.js
      show-lesson-shell.js
    02-follow-lesson/
      show-current-step.js
    03-watch-code/
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
      remember-saved-steps.js
    choose-theme/
      choose-theme.js
  lesson-documents/
    build-lines-from-rule-blocks.js
    build-lines-from-timeline-blocks.js
    read-fenced-json-value.js
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

## Naming Rules

### 1. Folder says flow

Use a folder name that tells what the product is doing.

Good:

```txt
animator/
lessons/
sell-subscriptions/
review-progress/
```

Bad:

```txt
src/
modules/
features/
services/
```

### 2. Feature folder says use case

The next folder must tell which concrete product scenario is being handled.

Good:

```txt
play-lesson/
01-build-sidebar/
retry-payment/
```

Bad:

```txt
lesson/
sidebar/
payment/
```

## File Rules

### 3. Root file tells the feature flow

If the feature is sequential, use:

```txt
feature-name.pipeline.js
```

If the feature is a concrete lesson contract, use:

```txt
feature-name.lesson.js
```

Markdown lesson documents may live next to the lesson contract:

```txt
content/documents/files/lesson.sr.md
content/documents/files/html.timeline.md
content/documents/files/css.rules.md
content/documents/files/js.timeline.md
content/documents/files/template-js.timeline.md
content/documents/files/shadow-dom-style.css.md
```

Use markdown for lesson metadata and for the canonical HTML/CSS/JS step DSL.
When a lesson separates template markup into a dedicated module such as `component.html.js`, use `template-js.timeline.md` as the canonical template JS source and keep `build-template-js-at-step.js` thin as well.
When a lesson separates inner shadow DOM styles into a fourth editor/download file, use `shadow-dom-style.css.md` as the canonical shadow CSS source and keep `build-shadow-css-at-step.js` thin as well.
Keep `build-*-at-step.js` files thin; they should parse markdown lesson documents and return derived lines, not re-encode the whole lesson by hand.

## Root Ownership Rules

Each feature slice must have one root owner that makes the whole slice obvious.

- use `*.pipeline.js` when the flow is sequential
- use `*.facade.js` when the feature needs one stable entry into a larger interior
- use `*.orchestrator.js` when the root coordinates branches, events or multiple subflows
- use a single root function or single root file when that is the clearest composition root
- use a banal main name when that is more readable than a pattern name

If none of the named patterns is the clearest answer, use the smallest construct that can still own the whole feature slice.

The same rule applies to both runtime slices under `animator/` and lesson slices under `lessons/`.

### 4. Every other file owns one clear responsibility

Good:

```txt
describe-steps.js
build-css-at-step.js
present-step-finder.js
show-growing-code.js
```

Bad:

```txt
helpers.js
utils.js
shared.js
common.js
manager.js
processor.js
```

### 5. Use numbers only when sequence truly matters

Use `01-...`, `02-...` only when the folder order itself carries product meaning without opening the pipeline.

This repo uses numeric prefixes on ordered lesson flows in `lessons/` and on the generic lesson journey inside `play-lesson/`:

```txt
01-build-sidebar/
02-build-top-navigation/
03-build-custom-element/
04-build-web-component/
05-clean-web-component-with-adopted-stylesheets/
06-modular-web-components/
07-more-separation-of-code/
08-smell-of-enterprise/
```

```txt
01-start-lesson/
02-follow-lesson/
03-watch-code/
04-watch-preview/
05-download-lesson-files/
```

Support flows such as `find-step/`, `save-step/`, and `choose-theme/` stay unnumbered because they are available across the lesson and are not mandatory sequence steps.

### 6. Do not repeat the feature name inside the feature folder

If the folder already says `01-build-sidebar`, do not keep repeating `build-sidebar` in every child file and function.

Good:

```txt
01-build-sidebar/
  describe-steps.js
  build-html-at-step.js
```

Bad:

```txt
01-build-sidebar/
  build-sidebar-steps.js
  build-sidebar-view.js
```

## Function Rules

### 7. Function name says the exact action

Good:

```txt
playLesson()
selectLessonFromLocation()
showGrowingCode()
downloadLessonFiles()
```

Bad:

```txt
handle()
run()
process()
manage()
doStuff()
```

### 8. Keep one vocabulary per responsibility kind

Use verbs consistently by responsibility:

- `build...` creates derived lesson code for a specific step.
- `show...` writes current lesson content into already-found page parts.
- `present...` owns an interactive user flow such as lesson picker or step finder.
- `create...` initializes progress for a flow.
- `find...` locates a selected lesson or existing page parts.
- `read...` is reserved for persistence reads.
- `write...` is reserved for persistence writes.
- `play...` orchestrates the complete lesson flow.

## Quality Targets

The repo applies the standard's quality goals without exception.

- SOLID, DRY, KISS and YAGNI
- composition over inheritance, Law of Demeter, clean code principles and low-level design clarity
- security by default, OWASP, authentication, authorization, data encryption, vulnerability management and secure APIs
- usability, flexibility, scalability, interoperability and cost efficiency
- cache, rate limiting, checksum, integrity and reproducibility where relevant
- latency vs throughput trade-offs chosen deliberately
- CAP and consistency patterns made explicit when they matter
- long polling vs WebSockets chosen deliberately when transport behavior matters
- observability and operational simplicity

Quality must live inside the slice, but it must not hide the folder/file/function story.

## Functional Programming and Non-OOP Languages

When a language or slice is not OOP-first, low-level design must be expressed as functional design with the same clarity bar.

- use pure functions as the smallest meaningful design unit when possible
- keep inputs explicit and outputs deterministic
- isolate side effects at the edges
- prefer immutable data and data transformation pipelines
- compose behavior through modules, higher-order functions and explicit dependency passing
- if a feature slice is sequential, a pipeline root still owns the flow
- if a feature slice is not sequential, use the smallest root composition unit that makes the whole slice obvious

In non-OOP environments, LLD becomes functional clarity, not a weaker version of architecture.

## Anti-Patterns

Do not introduce these unless there is a very strong reason:

- `utils`
- `helpers`
- `shared`
- `common`
- `base`
- `manager`
- `service`
- `controller`

Avoid tight coupling, premature reuse, over-engineering and insufficient abstraction.

## Standard

Use this sentence as the filter before every new file:

> If the folder does not say the flow, the file does not say the responsibility, or the function does not say the exact action, the name is not good enough.

## Change Policy

- if a change affects repo shape, update this document in the same change
- if a change affects the reusable standard, update `architecture-standard.md`
- do not invent invisible exceptions
- do not add a folder, file, or abstraction unless it reduces mental noise

## Lesson Authoring

How a lesson becomes animated is documented in [LESSON_AUTHORING.md](/home/shomsy/projects/step-by-step-animator/LESSON_AUTHORING.md).
