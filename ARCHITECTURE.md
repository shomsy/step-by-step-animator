# Architecture

This repo follows a business-first screaming architecture.

## Shape

Read the tree in this order:

1. Flow
2. Feature slice
3. File responsibility
4. Function action

Current example:

```txt
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
          quiz.sr.md
lesson-player/
  select-lesson-from-location.js
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
    find-step/
      present-step-finder.js
    save-step/
      remember-saved-steps.js
    05-check-understanding/
      present-knowledge-check.js
    choose-theme/
      choose-theme.js
    06-download-lesson-files/
      download-lesson-files.js
lesson-documents/
  read-lesson-metadata.js
  read-knowledge-check-questions.js
  sync-lesson-documents.js
```

## Naming Rules

### 1. Folder says flow

Use a folder name that tells what the product is doing.

Good:

```txt
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
content/documents/files/quiz.sr.md
```

Use markdown for lesson metadata and question content.
Keep step-by-step HTML/CSS builder logic explicit until a dedicated step DSL exists.

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
05-check-understanding/
06-download-lesson-files/
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
- `present...` owns an interactive user flow such as finder or knowledge check.
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
