# Active Plan

This is the mandatory first tracking layer for substantial work.

Update rules:

- keep newest items at the top
- use `YYYY-MM-DD HH:MM` timestamps so duration and aging can be estimated
- keep the plan high-level and outcome-oriented
- add `owner`, `estimate`, and `acceptance` when the workstream is substantial
- add `blocked_by` only when the workstream is waiting on an external dependency
- when a plan item becomes actionable, move it into `.agents/evidence/TODO.md`
- when an item closes, mirror it in `.agents/evidence/CHANGELOG.md`

## Current Workstreams

### 2026-03-26 15:00 - Major Repository Reorganization (Product/System split)
- **owner**: shomsy
- **estimate**: 10h
- **acceptance**: 02-build-top-navigation pilot lesson runs end-to-end using only compiled packages from the new system/ folder structure, all legacy folders removed.

#### Phase 1: Lock Repository Shape
- **estimate**: 1h
- **acceptance**: New top-level `product/` and `system/` folders created, all documents (README, AGENTS) updated to match the new tree.

#### Phase 2: Lock Authoring Contract
- **estimate**: 1h
- **acceptance**: Clear standards for `lesson.md`, `scenes.md`, `theory.md`, and artifacts in `product/education/standards/`.

#### Phase 3: Complete Lesson Engine Compiler
- **estimate**: 3h
- **acceptance**: Full compilation pipeline producing `compiled-lessons/`, `lesson-documents/`, and validation reports.

#### Phase 4: Complete Animator Engine Runtime
- **estimate**: 3h
- **acceptance**: Animator consumes only compiled lesson packages, no direct source reading.

#### Phase 5: Legacy Cleanup and Verification
- **estimate**: 2h
- **acceptance**: Old `animator/` and `lessons/` folders deleted, all tests passing.

