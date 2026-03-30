# .agents

This folder is the project workspace and local memory layer.

The reusable `.agents` project is mounted in `.agents/.rules/`.
Repo-local docs and queues live in the visible `.agents/` tree.

## Domains

| Domain | Responsibility | Reusable |
|--------|----------------|----------|
| `.rules/` | Mounted reusable `.agents` project | Yes |
| `business-logic/` | Product/domain meaning, user value model, software behavior meaning | No |
| `language-specific/` | Project-local stack overlays when reusable profiles are not enough | No |
| `management/` | Active planning, defects, decisions, risks, evidence, and test records | Yes |
| `review/` | Review logs and archive | Yes |

There are no repo-local overlays inside `.rules/`; local project guidance lives
in the visible `.agents/` tree.

For lesson authoring, the live repo-local user-facing composition contract is
`.agents/business-logic/content/LessonAuthoringRules.md`, and the supporting
engineering architecture contract is
`.agents/business-logic/software/lesson-authoring/architecture/LESSON_ARCHITECTURE.md`.
Mounted
`.agents/.rules/project-local/governance/app-architecture/lesson-architecture*.md`
files remain reusable baseline or migration references and are not the live
default authoring contract for this repo.

## Required Questions

Every idea, plan, architecture decision, and lesson change must answer:

1. What does the user want to achieve?
2. What should animator software do to make that possible?
3. What should the user see, and does the UX meet the highest standard?
4. What should the user learn visually and step by step?

## Reading Order

1. `../AGENTS.md`
2. `.rules/AGENTS.md`
3. `.rules/governance/quality-gates.md`
4. `.rules/governance/profile-resolution-algorithm.md`
5. `.rules/governance/app-architecture/README.md`
6. `.rules/governance/security/README.md`
7. `language-specific/README.md`
8. `business-logic/README.md`
9. `business-logic/content/LessonAuthoringRules.md`
10. `business-logic/software/lesson-authoring/architecture/LESSON_ARCHITECTURE.md`
11. `management/README.md`
12. `management/ACTIVE.md`
13. `management/TIMELINE.md`
14. `management/TODO.md`
15. `management/BUGS.md`
16. `review/REVIEWS.md`

## Governance Index

- `.rules/governance/quality-gates.md`
- `.rules/governance/profile-resolution-algorithm.md`
- `.rules/governance/execution-policy.md`
- `.rules/governance/how-to-code-review.md`
- `.rules/governance/how-to-coding-standards.md`
- `.rules/governance/how-to-document.md`
- `.rules/governance/release-and-rollback-policy.md`
- `.rules/governance/app-architecture/architecture-standard.md`
- `.rules/governance/app-architecture/ARCHITECTURE.md`
- `.rules/governance/security/README.md`

## Legacy Compatibility

Older paths still in repo history remain readable, but the active canonical paths are:

- `code-review/` is an older review log path; use `review/`
- `management/TODO.md` and `management/BUGS.md` (instead of deep legacy status files)

## Rule

- Write user outcome first, then technical detail.
- Keep UX and step-by-step learning path explicit.
- If an item cannot answer required questions, it is not ready.
