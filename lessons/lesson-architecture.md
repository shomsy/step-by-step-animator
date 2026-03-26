# ARCHIVED LEGACY SHAPE

DO NOT EXTEND.
REFERENCE ONLY.
LIVE CONTRACT IS `.agents/architecture/ARCHITECTURE.md`, `.agents/architecture/migration-governance.md`, and `AGENTS.md`.

# Lesson Architecture

This document is the repo-level governance for the lesson system.

## Target Model

- `education/` is source-only.
- `lesson-engine/` owns discovery, validation, parsing, normalization, projection, compilation, and generated documentation.
- `animator-engine/` replays compiled lesson packages only.
- `app/` mounts the runtime and presents the product shell.
- `foundation/` holds shared primitives.
- `generated/` holds derived outputs.

## Source Contract

Each lesson slice lives under `education/lessons/<lesson-slug>/source/` and contains:

- `lesson.md`
- `theory.md`
- `scenes.md`
- `artifacts/`
- `assets/` beside the source

Education contains source only. No lesson build glue lives there.

## Authoring DSL

- `lesson.md` is the manifest and machine contract for the lesson
- `theory.md` is the explanation layer and can be optional when explicitly declared
- `scenes.md` is the strict storyboard DSL
- `artifacts/` contains the canonical source artifacts for the lesson
- `assets/` contains reference visuals and other non-executable authoring assets
- `step` is the pedagogical unit
- `scene` is the directed frame inside a step
- the lesson engine validates, normalizes, projects, and compiles this source into a canonical lesson package
- the animator engine replays only the compiled package

## Migration Note

The completed migration governance record lives in `.agents/architecture/migration-governance.md`.
This tracked document keeps the repo-level target model and source contract only.

## Engine Contract

`lesson-engine/` is the content-to-lesson compiler.

It owns:

- discovery
- read / validate / parse / normalize
- artifact projection by kind
- lesson package compilation
- documentation generation
- compiled package registration

Artifact projection is artifact-first. Supported kinds include:

- `html`
- `css`
- `js`
- `template-js`
- `shadow-css`
- `php`
- `sql`
- `yaml`
- `readme`
- future kinds through adapters

## Runtime Contract

`animator-engine/` consumes only compiled lesson packages.

It does not parse raw lesson source.
It may present docs and playback UI, but it does not own source translation.

## Foundation Contract

`foundation/` is allowed for:

- filesystem
- markdown
- frontmatter
- validation
- logging
- storage
- hashing

Foundation must stay small and generic.

## Governance Rules

- folder says flow
- file says responsibility
- function says exact action
- `theory.md` is real and must not be implied without a file
- source-only education is mandatory
- generated docs are derived, not hand-edited
- validation runs before compilation
- the compiled lesson package is the single truth the animator needs

## Representative Tree

```txt
step-by-step-animator/
  AGENTS.md
  app/
    index.html
    main.js
  education/
    lessons/
      <lesson-slug>/
        source/
          lesson.md
          theory.md
          html.timeline.md
          css.rules.md
          js.timeline.md
          template-js.timeline.md
          shadow-dom-style.css.md
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

## Migration Rule

If a feature still needs executable lesson-specific glue, that glue belongs in `lesson-engine/` during migration. It does not belong under `education/`.
