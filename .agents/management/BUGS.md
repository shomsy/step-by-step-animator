# BUGS

Canonical active defect and regression queue.

## Rules

- keep newest items first
- record `id`, `created_at`, `updated_at`, `status`, and `estimate`
- describe user-visible failure first
- include expected fixed behavior
- capture severity and risk

## Current Items

1. `id`: `BUG-001`
   - created_at: `2026-03-27 15:15 CET`
   - updated_at: `2026-03-28 01:57 CET`
   - status: `open`
   - estimate: `15m`
   - severity: `low`
   - risk: currently low because lesson content is controlled
   - visible_failure: `The lesson step renderer still interpolates tag text via innerHTML.`
   - expected_fixed_behavior: `Tag text is rendered safely without changing lesson output.`
   - next: validate if additional sanitization should be enforced by policy

## Legacy Reference

See detailed historical capture at `.agents/management/bugs/BUGS.md`.
