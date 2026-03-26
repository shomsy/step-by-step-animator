# Step By Step Animator

Step By Step Animator is an interactive lesson engine for HTML, CSS, and JavaScript tutorials that feel like watching a developer work live over screen share.

The repo is organized around a source-only lesson model:

- `app/` is the canonical app shell and runtime entry
- `education/` contains lesson source
- `lesson-engine/` compiles lesson source into canonical lesson packages
- `animator-engine/` plays compiled lesson packages
- `foundation/` holds shared low-level primitives
- `generated/` holds derived output

## Install

```bash
npm install
```

## Run Locally

Start the dev server:

```bash
npm run dev
```

Then open the app in your browser:

- `http://localhost:5173/`
- or directly `http://localhost:5173/app/index.html`

The root `index.html` is a compatibility alias and redirects to the canonical app shell in `app/index.html`.

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
- `npm run sync:lesson-documents` regenerates lesson documents from source

## Lesson Source

Source-only lessons live under:

```txt
education/lessons/<lesson-slug>/source/
```

Each lesson is authored through:

- `lesson.md`
- `scenes.md`
- optional `theory.md`
- `artifacts/`
- `assets/`

## Notes

- Do not edit generated output by hand.
- The legacy `animator/` and `lessons/` trees are frozen archives.
- The canonical app entry is `app/main.js`.
