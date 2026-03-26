# Active TODO

This is the active backlog for follow-up work.
It is fed by `.agents/planning/PLAN.md`.

Update rules:

- keep newest items at the top
- mark each item with a status tag
- add `owner`, `estimate`, and `blocked_by` when the follow-up is substantial
- move completed items to the evidence ledger when they are closed
- use `YYYY-MM-DD HH:MM` timestamps for new items so task age and cycle time can be estimated

## Current Items

### 2026-03-26 15:00 - Product/System Refactor Backlog
- **owner**: shomsy
- **estimate**: 6h
- **acceptance**: the remaining migration work is explicitly tracked and the live repo no longer depends on stale root `app/` or `education/` paths.

#### A. Remaining repo shape
- [ ] Move `lesson-engine/` to `system/lesson-engine/`
- [ ] Move generated output to `system/lesson-engine/output/`
- [ ] Populate `system/foundation/`
- [ ] Remove any stale root-path references from code, docs, and generated snapshots

#### B. Lesson engine
- [ ] Complete `discover-source-lessons`
- [ ] Complete `read-source-lesson`
- [ ] Complete `read-lesson-manifest`
- [ ] Complete `read-scenes-source`
- [ ] Complete `read-theory-source`
- [ ] Complete `read-artifact-sources`
- [ ] Complete `validate-source-lesson`
- [ ] Complete `validate-lesson-manifest`
- [ ] Complete `validate-scenes-contract`
- [ ] Complete `validate-theory-contract`
- [ ] Complete `validate-artifact-sources`
- [ ] Complete `parse-source-lesson`
- [ ] Complete `parse-scenes-source`
- [ ] Complete `parse-theory-source`
- [ ] Complete `parse-artifact-source`
- [ ] Complete `normalize-source-lesson`
- [ ] Complete `project-artifact-state`
- [ ] Introduce `by-kind` contract for projectors (html, css, js, template-js, shadow-css)
- [ ] Complete `compile-lesson-package`
- [ ] Complete `write-lesson-documents`
- [ ] Complete cleanup for stale generated docs
- [ ] Complete `register-compiled-lessons`

#### C. Animator engine
- [ ] `choose-lesson` to read from compiled registry
- [ ] `select-lesson-from-location`
- [ ] `play-lesson.pipeline.js` to receive compiled package
- [ ] `start-playback`
- [ ] `follow-step` to use normalized step model
- [ ] `play-scene` to use normalized scene model
- [ ] `show-code-focus` to use compiled artifact state
- [ ] `show-preview-state` to use compiled preview state
- [ ] `speak-step` to use compiled narration
- [ ] `save-playback-state` to work on runtime state model
- [ ] `present-lesson-documents`

#### D. Foundation
- [ ] Introduce `filesystem/`
- [ ] Introduce `markdown/`
- [ ] Introduce `frontmatter/`
- [ ] Introduce `validation/`
- [ ] Introduce `logging/`
- [ ] Introduce `storage/`
- [ ] Introduce `hashing/`
- [ ] Do not allow feature logic in foundation

#### E. Tests
- [ ] Introduce `tests/contracts/`
- [ ] Introduce `tests/flows/`
- [ ] Introduce `tests/smoke/`
- [ ] Write `compile-valid-lesson-flow`
- [ ] Write `reject-invalid-lesson-flow`
- [ ] Write `broken-theory-anchor-flow`
- [ ] Write `broken-artifact-reference-flow`
- [ ] Write `register-compiled-lesson-flow`
- [ ] Write `play-compiled-lesson-flow`
- [ ] Write deterministic compiler output test
