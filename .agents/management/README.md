# Management

This folder is the execution memory layer.

## Canonical Files

- `TODO.md` for active implementation queue
- `BUGS.md` for active defects and regressions
- `ACTIVE.md` for the current visual board view of active tasks and bugs
- `IDEAS.md` for raw opportunities
- `DECISIONS.md` for ADR-lite decision log
- `PROJECTS_PORTFOLIO.md` for cross-repo technology and governance inventory (`~/projects` scope)
- `TIMELINE.md` for timestamp format and estimation law
- `evidence/CHANGELOG.md` for completed evidence
- `evidence/RELEASE_CHECKLIST.md` for release readiness snapshots
- `evidence/RISK_REGISTER.md` for active and accepted risks
- `evidence/TEST_STRATEGY.md` for current test approach
- `evidence/TEST_REPORTS.md` for concrete test runs and outcomes

## Legacy Compatibility

Older folderized files remain readable:

- `backlog/BACKLOG.md`
- `bugs/BUGS.md`
- `planning/PLAN.md`
- `planning/ARCHIVE.md`
- `evidence/TODO.md`

New work should be recorded in the canonical files above.

## Rule

- all new management and evidence records must follow `TIMELINE.md`
- queues without timestamps cannot support honest estimation or aging analysis
- `ACTIVE.md` is a visualization layer and must mirror `TODO.md` and `BUGS.md`
