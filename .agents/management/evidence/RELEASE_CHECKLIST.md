# Release Checklist

Use this checklist before every release decision.

## Checklist

- scope of release is explicit
- critical/high review findings resolved
- test strategy referenced
- test report recorded
- known risks reviewed and accepted
- rollback route documented
- changelog updated

## Latest Snapshot

1. `recorded_at`: `2026-03-28 22:00 CET`
   - scope: `all shipped lessons migrated to lesson.script.md plus the browser authoring studio with SQLite-backed drafts, SCRUD flows, publish snapshots, and live compile preview`
   - critical_high_findings: `resolved in local closure scope`
   - test_strategy: `.agents/management/evidence/TEST_STRATEGY.md`
   - test_report: `.agents/management/evidence/TEST_REPORTS.md`
   - known_risks: `Accepted R-002 remains unchanged for Piper; accepted R-003 now records the build chunk-size warning introduced by the full lesson-script estate and authoring studio assets.`
   - rollback_route: `Revert the lesson script migration script and generated source files, the authoring workspace slice under system/author-lessons/, the app workspace switch in product/app/main.js, and the SQLite dependency if authoring persistence, authoring boot, or lesson loading regresses.`
   - changelog: `.agents/management/evidence/CHANGELOG.md`
   - decision: `Closure evidence is complete for the local feature slice; no deployed release was performed from this workspace state.`
1. `recorded_at`: `2026-03-28 17:04 CET`
   - scope: `human-first lesson.script.md source path, script compiler, mixed-format source validation, and runtime registration of the script-authored demo lesson`
   - critical_high_findings: `resolved in local closure scope`
   - test_strategy: `.agents/management/evidence/TEST_STRATEGY.md`
   - test_report: `.agents/management/evidence/TEST_REPORTS.md`
   - known_risks: `Accepted R-002 remains unchanged: the Piper dependency still emits the known Vite externalization warning during build.`
   - rollback_route: `Revert the lesson script compiler, source-format detection, registry entry for 09-human-first-script-demo, and the script lesson source if lesson loading, docs sync, or validation regress.`
   - changelog: `.agents/management/evidence/CHANGELOG.md`
   - decision: `Closure evidence is complete for the local feature slice; no deployed release was performed from this workspace state.`
1. `recorded_at`: `2026-03-28 15:40 CET`
   - scope: `whole-system review remediation for narration coverage, local-font shell hardening, and product-truth alignment`
   - critical_high_findings: `resolved in local closure scope`
   - test_strategy: `.agents/management/evidence/TEST_STRATEGY.md`
   - test_report: `.agents/management/evidence/TEST_REPORTS.md`
   - known_risks: `Accepted R-002 documents the Piper bundle warning that still appears during Vite build; the local narration runtime path was revalidated.`
   - rollback_route: `Revert the narration-controller, smoke-test, and local-font shell change set if playback, narration, or shell rendering regresses.`
   - changelog: `.agents/management/evidence/CHANGELOG.md`
   - decision: `Closure evidence is complete for local review scope; no deployed release was performed from this workspace state.`
