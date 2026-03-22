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
teach-components/
  build-sidebar/
    build-sidebar.pipeline.js
    lesson.css
    escape-inline-text.js
    01-start-lesson/
      find-lesson-parts.js
      create-lesson-progress.js
    02-follow-lesson/
      lesson-step-script.js
      show-current-step.js
    find-step/
      present-step-finder.js
    save-step/
      remember-saved-steps.js
    03-watch-code/
      build-html-at-step.js
      show-growing-code.js
    04-watch-sidebar/
      show-current-sidebar.js
    05-check-understanding/
      present-knowledge-check.js
    choose-theme/
      choose-theme.js
    06-download-sidebar-files/
      download-sidebar-files.js
```

## Naming Rules

### 1. Folder says flow

Use a folder name that tells what the product is doing.

Good:

```txt
teach-components/
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
build-sidebar/
publish-lesson/
retry-payment/
```

Bad:

```txt
sidebar/
lesson/
payment/
```

## File Rules

### 3. Root file tells the feature flow

If the feature is sequential, use:

```txt
feature-name.pipeline.js
```

If the feature is not strictly sequential, use a facade or orchestrator file that still owns the complete flow.

### 4. Every other file owns one clear responsibility

Good:

```txt
lesson-step-script.js
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

Use `01-...`, `02-...` only when the file order itself carries meaning without opening the pipeline.

If names are already naturally readable, do not add numbers.

This repo uses numeric prefixes only on the main lesson journey inside `build-sidebar/`:

```txt
01-start-lesson/
02-follow-lesson/
03-watch-code/
04-watch-sidebar/
05-check-understanding/
06-download-sidebar-files/
```

Support flows such as `find-step/`, `save-step/`, and `choose-theme/` stay unnumbered because they are available across the lesson and are not mandatory sequence steps.

### 6. Do not repeat the feature name inside the feature folder

If the folder already says `build-sidebar`, do not keep repeating `build-sidebar` in every child file and function.

Good:

```txt
build-sidebar/
  02-follow-lesson/
    lesson-step-script.js
  03-watch-code/
    show-growing-code.js
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
teachBuildSidebar()
goToStepNumber()
goToNextStep()
showGrowingCode()
downloadSidebarFiles()
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
- `read...` is reserved for persistence reads, while `find...` is used for locating existing page parts.

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
