# Architecture

This repo follows a business-first screaming architecture with two top-level areas:

- `animator/` for technical runtime and document tooling
- `lessons/` for business lesson slices

## Shape

Read the tree in this order:

1. Flow
2. Feature slice
3. File responsibility
4. Function action

Current example:

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
  build-sidebar/
    build-sidebar.lesson.js
    describe-steps.js
    build-html-at-step.js
    build-css-at-step.js
    content/
      documents/
        build_sidebar.md
        files/
          lesson.sr.md
          html.timeline.md
          css.rules.md
  build-top-navigation/
    build-top-navigation.lesson.js
    describe-steps.js
    build-html-at-step.js
    build-css-at-step.js
    content/
      assets/
        top-navigation-goal.svg
      documents/
        build_top_navigation.md
        files/
          lesson.sr.md
          html.timeline.md
          css.rules.md
  build-callout-custom-element/
    build-callout-custom-element.lesson.js
    describe-steps.js
    build-html-at-step.js
    build-css-at-step.js
    build-js-at-step.js
    content/
      assets/
        callout-custom-element-goal.svg
      documents/
        build_callout_custom_element.md
        files/
          lesson.sr.md
          html.timeline.md
          css.rules.md
          js.timeline.md
  build-feature-callout-web-component/
    build-feature-callout-web-component.lesson.js
    describe-steps.js
    build-html-at-step.js
    build-css-at-step.js
    build-js-at-step.js
    content/
      assets/
        feature-callout-goal.svg
      documents/
        build_feature_callout_web_component.md
        files/
          lesson.sr.md
          html.timeline.md
          css.rules.md
          js.timeline.md
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
build-sidebar/
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
```

Use markdown for lesson metadata and for the canonical HTML/CSS/JS step DSL.
Keep `build-*-at-step.js` files thin; they should parse markdown lesson documents and return derived lines, not re-encode the whole lesson by hand.

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

This repo uses numeric prefixes only on the generic lesson journey inside `play-lesson/`:

```txt
01-start-lesson/
02-follow-lesson/
03-watch-code/
04-watch-preview/
05-download-lesson-files/
```

Support flows such as `find-step/`, `save-step/`, and `choose-theme/` stay unnumbered because they are available across the lesson and are not mandatory sequence steps.

### 6. Do not repeat the feature name inside the feature folder

If the folder already says `build-sidebar`, do not keep repeating `build-sidebar` in every child file and function.

Good:

```txt
build-sidebar/
  describe-steps.js
  build-html-at-step.js
```

Bad:

```txt
build-sidebar/
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

## Standard

Use this sentence as the filter before every new file:

> If the folder does not say the flow, the file does not say the responsibility, or the function does not say the exact action, the name is not good enough.

## Lesson Authoring

How a lesson becomes animated is documented in [LESSON_AUTHORING.md](/home/shomsy/projects/step-by-step-animator/LESSON_AUTHORING.md).
