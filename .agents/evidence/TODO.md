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

### 2026-03-26 15:00 - Major Repository Reorganization Tasks

#### A. Repo shape
- [ ] Uvedi `product/`
- [ ] Premesti `app/` u `product/app/`
- [ ] Premesti `education/` u `product/education/`
- [ ] Uvedi `system/`
- [ ] Premesti `lesson-engine/` u `system/lesson-engine/`
- [ ] Premesti `animator-engine/` u `system/animator-engine/`
- [ ] Uvedi `system/foundation/`
- [ ] Premesti generated output u `system/lesson-engine/output/`
- [ ] Ne uvoditi `scripts/` dok ne postoji realna potreba

#### B. Dokumentacija
- [ ] README uskladiti sa `product/` i `system/`
- [ ] AGENTS uskladiti sa `product/` i `system/`
- [ ] Sve stare tree primere obrisati ili označiti kao legacy
- [ ] Dodati jasan “Where to start” deo u README
- [ ] Jasno napisati da je `education` source-only

#### C. Authoring contract
- [ ] Zaključati `lesson.md` required fields
- [ ] Zaključati `lesson.md` optional fields
- [ ] Zaključati `scenes.md` DSL
- [ ] Zaključati da svaki step ima `stepId`, `title`, `summary`, `intent`
- [ ] Zaključati da svaka scena ima `sceneId`
- [ ] Zaključati `theory.anchor` referenciranje
- [ ] Zaključati kada je `preview.action: none` dozvoljen
- [ ] Zaključati artifact source naming pravila
- [ ] Zaključati allowed artifact kinds i languages

#### D. Lesson engine
- [ ] Dovršiti `discover-source-lessons`
- [ ] Dovršiti `read-source-lesson`
- [ ] Dovršiti `read-lesson-manifest`
- [ ] Dovršiti `read-scenes-source`
- [ ] Dovršiti `read-theory-source`
- [ ] Dovršiti `read-artifact-sources`
- [ ] Dovršiti `validate-source-lesson`
- [ ] Dovršiti `validate-lesson-manifest`
- [ ] Dovršiti `validate-scenes-contract`
- [ ] Dovršiti `validate-theory-contract`
- [ ] Dovršiti `validate-artifact-sources`
- [ ] Dovršiti `parse-source-lesson`
- [ ] Dovršiti `parse-scenes-source`
- [ ] Dovršiti `parse-theory-source`
- [ ] Dovršiti `parse-artifact-source`
- [ ] Dovršiti `normalize-source-lesson`
- [ ] Dovršiti `project-artifact-state`
- [ ] Uvesti `by-kind` contract za projectore (html, css, js, template-js, shadow-css)
- [ ] Dovršiti `compile-lesson-package`
- [ ] Dovršiti `write-lesson-documents`
- [ ] Dovršiti cleanup za stale generated docs
- [ ] Dovršiti `register-compiled-lessons`

#### E. Animator engine
- [ ] `choose-lesson` da čita compiled registry
- [ ] `select-lesson-from-location`
- [ ] `play-lesson.pipeline.js` da prima compiled package
- [ ] `start-playback`
- [ ] `follow-step` da koristi normalized step model
- [ ] `play-scene` da koristi normalized scene model
- [ ] `show-code-focus` da koristi compiled artifact state
- [ ] `show-preview-state` da koristi compiled preview state
- [ ] `speak-step` da koristi compiled narration
- [ ] `save-playback-state` da radi nad runtime state modelom
- [ ] `present-lesson-documents`

#### F. Foundation
- [ ] Uvesti `filesystem/`
- [ ] Uvesti `markdown/`
- [ ] Uvesti `frontmatter/`
- [ ] Uvesti `validation/`
- [ ] Uvesti `logging/`
- [ ] Uvesti `storage/`
- [ ] Uvesti `hashing/`
- [ ] Ne dozvoliti feature logiku u foundation

#### G. Tests
- [ ] Uvesti `tests/contracts/`
- [ ] Uvesti `tests/flows/`
- [ ] Uvesti `tests/smoke/`
- [ ] Napisati `compile-valid-lesson-flow`
- [ ] Napisati `reject-invalid-lesson-flow`
- [ ] Napisati `broken-theory-anchor-flow`
- [ ] Napisati `broken-artifact-reference-flow`
- [ ] Napisati `register-compiled-lesson-flow`
- [ ] Napisati `play-compiled-lesson-flow`
- [ ] Napisati deterministic compiler output test

#### H. Legacy cleanup
- [ ] Označiti `animator/` kao delete candidate
- [ ] Označiti `lessons/` kao delete candidate
- [ ] Proveriti da nema live import-a iz legacy foldera
- [ ] Napraviti git tag pre brisanja
- [ ] Obrisati legacy foldere kad svi gates prođu
