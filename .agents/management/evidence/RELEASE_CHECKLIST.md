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

1. `recorded_at`: `2026-03-28 15:40 CET`
   - scope: `whole-system review remediation for narration coverage, local-font shell hardening, and product-truth alignment`
   - critical_high_findings: `resolved in local closure scope`
   - test_strategy: `.agents/management/evidence/TEST_STRATEGY.md`
   - test_report: `.agents/management/evidence/TEST_REPORTS.md`
   - known_risks: `Accepted R-002 documents the Piper bundle warning that still appears during Vite build; the local narration runtime path was revalidated.`
   - rollback_route: `Revert the narration-controller, smoke-test, and local-font shell change set if playback, narration, or shell rendering regresses.`
   - changelog: `.agents/management/evidence/CHANGELOG.md`
   - decision: `Closure evidence is complete for local review scope; no deployed release was performed from this workspace state.`
