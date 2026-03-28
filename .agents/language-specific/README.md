# `language-specific/` — Project Overlay Space

This folder holds project-local language and framework overlays for
`step-by-step-animator`.

Shared reusable rules live in `.agents/.rules/governance/profiles/`.

## Use This Folder Only For

1. repo-local stack constraints that are not reusable across unrelated projects
2. team idioms that must stay close to this repository
3. temporary overlays during a tracked migration

## Generalization Rule

If a rule becomes reusable across unrelated repositories that use the same
language or framework, move it into `.agents/.rules/governance/profiles/`.
