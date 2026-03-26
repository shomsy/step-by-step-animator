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

### 2026-03-26 15:00 - Product/System Refactor Realignment
- **owner**: shomsy
- **estimate**: 6h
- **acceptance**: `product/app` boots from `product/app/main.js`, authoring docs and runtime code reference the `product/` and `system/` paths, and the remaining `lesson-engine` and generated-output migrations are isolated and explicit.

#### Phase 1: Keep Paths Truthful
- **estimate**: 2h
- **acceptance**: `README.md`, `AGENTS.md`, and the architecture docs use `product/` and `system/` paths consistently, including `product/education/lessons/` and `system/animator-engine/`.

#### Phase 2: Finish Remaining Migration Targets
- **estimate**: 3h
- **acceptance**: `lesson-engine/` and generated output have explicit migration targets, with the remaining work named and tracked precisely.

#### Phase 3: Verify And Clean Up
- **estimate**: 1h
- **acceptance**: validation, build, and merge snapshot pass with no stale root `app/` or `education/` references.
