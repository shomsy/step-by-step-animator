# Animator Architecture

## Purpose

This document defines the canonical architecture for the player runtime in the `animator/` folder.

---

## Top-Level Shape

```
animator/
  choose-lesson/           # lesson picker flow
    select-lesson-from-location.js
    present-lesson-picker.js
  play-lesson/             # main playback pipeline
    play-lesson.pipeline.js # root orchestrator
    lesson-player.css
    escape-inline-text.js
    01-start-lesson/       # flow: initiate lesson
      find-lesson-parts.js
      create-lesson-progress.js
      show-lesson-shell.js
    02-follow-lesson/      # flow: step navigation
      listen-for-lesson-keys.js
      show-active-lesson-panel.js
      show-current-step.js
      show-step-timeline.js
    03-watch-code/        # flow: code panel
      compare-code-lines.js
      describe-css-line-role.js
      escape-code-text.js
      scroll-to-added-line.js
      show-growing-code.js
    04-watch-preview/     # flow: live preview
      show-current-preview.js
    05-download-lesson-files/
      download-lesson-files.js
    find-step/             # flow: step finder
      present-step-finder.js
    save-step/             # flow: bookmarks
      read-saved-step-numbers.js
      write-saved-step-numbers.js
      show-saved-step-list.js
      remember-saved-steps.js
    choose-theme/          # flow: theming
      choose-theme.js
    listen-to-step/         # flow: narration
      compose-step-narration-text.js
      present-step-narration.js
      read-step-narration-preferences.js
      speak-with-browser-voice.js
      speak-with-open-source-voice.js
      write-step-narration-preferences.js
  lesson-documents/        # document tooling
    build-lines-from-rule-blocks.js
    build-lines-from-timeline-blocks.js
    parse-frontmatter.js
    read-fenced-json-value.js
    read-lesson-metadata.js
    read-rule-blocks.js
    read-timeline-blocks.js
    render-markdown.js
    read-rule-blocks.js
    sync-lesson-documents.js
```

---

## Flow Responsibility

### `01-start-lesson/`
Initializes lesson context:
- `findLessonParts()` - finds DOM elements
- `createLessonProgress()` - creates progress state
- `showLessonShell()` - renders lesson UI

### `02-follow-lesson/`
Manages step navigation:
- `listenForLessonKeys()` - keyboard input
- `showActiveLessonPanel()` - panel visibility
- `showCurrentStep()` - step content
- `showStepTimeline()` - progress bar

### `03-watch-code/`
Manages code editor panel:
- `showGrowingCode()` - displays cumulative code
- `scrollToAddedLine()` - scroll to new line
- `compareCodeLines()` - diff highlighting
- `describeCssLineRole()` - code annotations

### `04-watch-preview/`
Manages live preview:
- `showCurrentPreview()` - renders cumulative output

### `05-download-lesson-files/`
Manages download:
- `downloadLessonFiles()` - generates and downloads files

### `find-step/`
Step search:
- `presentStepFinder()` - search modal

### `save-step/`
Bookmarks:
- `readSavedStepNumbers()` - reads saved steps
- `writeSavedStepNumbers()` - writes saved steps
- `showSavedStepList()` - displays list
- `rememberSavedSteps()` - save logic

### `choose-theme/`
Theming:
- `chooseTheme()` - changes appearance

### `listen-to-step/`
Narration:
- `composeStepNarrationText()` - prepares text
- `presentStepNarration()` - displays narration
- `speakWithBrowserVoice()` - TTS
- `readStepNarrationPreferences()` - reads preferences
- `writeStepNarrationPreferences()` - writes preferences

---

## Pipeline Responsibility

`play-lesson.pipeline.js` is the composition root. It must not:
- contain business logic
- directly manipulate DOM
- parse lesson content

Only orchestrates flow and passes dependencies.

---

## Document Tooling Responsibility

`lesson-documents/` modules are read-only pipeline:
- Read Markdown files
- Parse timeline and rule blocks
- Return structured data

They don't mutate files directly. `sync-lesson-documents.js` is a build script, not runtime.

---

## Prohibited Patterns

- Don't add new numbers to folders without clear flow
- Don't use `manager`, `handler`, `service` as names
- Don't mix orchestration with business logic
- Don't use global `window`, `document` in deeper modules

---

## Dependency Injection

All modules receive dependencies as parameters:

```javascript
export function showCurrentPreview({ ownerDocument, ownerWindow, lessonParts, lessonContract, currentStep }) {
  // ...
}
```

Exceptions for low-level primitives (fetch, URL parsing) must be explicitly documented.
