# Lesson Authoring

This file defines the live lesson writing contract for Step By Step Animator.

## 1. Live Authoring Truth

The live default is UI-first authoring.

- Write Mode is the default authoring surface.
- The browser-backed authoring store is the draft source of truth for in-progress lessons.
- The canonical authored document shape remains `lesson.script.md`.
- During normal authoring that `lesson.script.md` shape is persisted through the authoring store, not through a required filesystem scaffold.
- Files under `product/education/lessons/**/source/` are publish/export outputs and migration compatibility inputs, not the required starting point for a new lesson.

## 2. What The Author Does

The day-to-day path is:

1. open Write Mode
2. write the lesson body as `Step -> Scene -> Narration -> Show Code`
3. click `Save`
4. click `Play`
5. optionally `Publish` or `Export`

The author does not need to create `lesson.md`, `scenes.md`, `theory.md`, or `artifacts/` before a lesson can exist.

## 3. Operational Contract

### 3.1 Save

`Save` persists the draft to the authoring store only.

Meaning:

- draft text is stored in the browser-backed authoring store
- the author stays in Write Mode
- filesystem files are not required

### 3.2 Play

`Play` compiles from the latest healthy saved draft.

Meaning:

- the lesson engine validates the saved draft
- if the draft is healthy, the lesson engine compiles it into the canonical lesson package
- the animator engine plays only the compiled lesson package
- if the saved draft is broken, the system fails closed to the shipped lesson package
- if the lesson id belongs to an unpaired custom draft, the normal player can still open that healthy saved draft directly by lesson id

### 3.3 Publish

`Publish` is the explicit snapshot or shipped-output step.

Meaning:

- the authoring workflow records a recoverable published snapshot
- shipped output materialization stays explicit; it is not implied by `Save`

### 3.4 Export

`Export` materializes filesystem artifacts.

Meaning:

- export can write or download `lesson.script.md`
- export or publish may materialize repository-facing lesson files
- filesystem artifacts are off the critical path for creating or editing drafts

## 4. Write Mode Surface

Write Mode must stay writer-first.

- the center editor owns the lesson body
- the left outline is structure navigation
- the right inspector is preview, compile, validation, and snapshot feedback
- metadata stays secondary in the drawer
- frontmatter is editable, but it is not the first frame

Surface ownership:

- `CodeMirror` owns the canonical `lesson.script.md` editing surface
- `BlockNote` owns prose-rich metadata fields inside the metadata drawer when a block editor is the best fit
- `CKEditor 5` is not part of the shipped authoring path unless a concrete unresolved requirement proves otherwise

## 5. Runtime Labels

The terminology must stay explicit:

- `Draft Saved`
- `Unsaved Changes`
- `Playable Draft`
- `Broken Draft Fallback`
- `Published Lesson`
- `No Draft`
- `Authoring Store`
- `Shipped Lesson Package`
- `Publish/Export Artifacts`

## 6. Canonical Lesson Shape

The canonical authored document shape is still `lesson.script.md`.

Rules:

- frontmatter carries lesson metadata such as `lessonId`, `lessonTitle`, `lessonIntro`, `status`, `courseId`, `order`, `artifacts`, and `preview`
- each step is declared as `# Step: <stepId>`
- each step defines `title`, `summary`, and `intent`
- each scene is declared as `## Scene: <sceneId>`
- each scene defines `### Narration`
- each scene defines one-or-more `### Show Code: <artifactId>` blocks
- `Show Code` uses fenced code blocks that match the artifact language
- `theory.md` stays optional and external when a lesson needs separate theory prose

Canonical shape:

````md
---
schemaVersion: 1
lessonId: 09-human-first-script-demo
lessonTitle: Human-First Script Demo
lessonIntro: Build a tiny callout card from one lesson script.
status: active
courseId: step-by-step-animator
order: 9
artifacts:
  - artifactId: html
    language: html
    label: index.html
    isPrimary: true
preview:
  type: dom
  title: Script preview
  address: browser://09-human-first-script-demo-preview
---

# Step: add-card-html
title: HTML: Add the Card
summary: Insert the first real component shell.
intent: Show semantic structure before styling.

## Scene: add-card-html-scene

### Narration
First we place the visible card shell into the app shell.

### Show Code: html
```html
<div class="app-shell">
  <aside class="callout-card"></aside>
</div>
```
````

## 7. Filesystem And Migration Posture

Filesystem lesson folders still matter, but not as the live default authoring path.

- shipped lessons can still be materialized under `product/education/lessons/<lesson-slug>/source/`
- `lesson.script.md` is the preferred shipped lesson source file
- optional shipped companions remain `theory.md` and `assets/`
- legacy split source such as `lesson.md`, `scenes.md`, and `artifacts/` remains importable only as migration or compatibility input
- do not present the split file set as the preferred authoring path for new day-to-day work

## 8. Paired Draft Rules

When a shipped lesson is opened in Write Mode, the system may pair it to a draft.

Rules:

- the normal player prefers the latest healthy saved paired draft for the same shipped lesson
- the normal player can also open a healthy unpaired custom draft when the browser lesson id matches that draft exactly
- invalid paired drafts fail closed to the shipped lesson package
- entering Write Mode with `?workspace=authoring&lesson=<shipped-lesson-id>` must open that lesson's paired draft instead of an unrelated most-recent draft
- Write Mode must keep the browser `lesson` query aligned with the active draft context so refresh and back-to-player do not drift to a different lesson
- paired drafts may auto-refresh from shipped source updates only while they still match the previous shipped source exactly
- once the author edits the paired draft, the store must preserve those edits

## 9. Migration Posture

The repo is intentionally in migration, not denial.

- legacy shipped file-based lessons still exist
- they remain importable
- they are not the preferred path for new day-to-day authoring
- the system is moving toward UI-first authoring without breaking shipped lesson compatibility
