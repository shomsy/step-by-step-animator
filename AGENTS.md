# AGENTS.md — step-by-step-animator Local Contract

Version: 1.0.0
Status: Normative / Local
Scope: `./**`

This repo uses `.agents/.rules/` as the mounted reusable `.agents` project.
Repo-local working docs live in the visible `.agents/` tree.

## 0) Order Of Precedence

Agents MUST follow this order in this repository:

1. `AGENTS.md`
2. `.agents/.rules/AGENTS.md`
3. `.agents/.rules/governance/quality-gates.md`
4. `.agents/.rules/governance/profile-resolution-algorithm.md`
5. `.agents/.rules/governance/profiles/**`
6. `.agents/.rules/governance/app-architecture/**`
7. `.agents/.rules/governance/security/**`
8. `.agents/.rules/governance/execution-policy.md`
9. `.agents/.rules/governance/how-to-code-review.md`
10. `.agents/.rules/governance/how-to-strict-review.md`
11. `.agents/.rules/governance/how-to-coding-standards.md`
12. `.agents/.rules/governance/naming-standard.md`
13. `.agents/.rules/governance/how-to-document-flow.md`
14. `.agents/.rules/governance/how-to-document.md`
15. `.agents/.rules/governance/release-and-rollback-policy.md`
16. `.agents/.rules/governance/operations/**`
17. `.agents/management/ACTIVE.md`
18. `.agents/management/TIMELINE.md`
19. `.agents/management/TODO.md`
20. `.agents/management/BUGS.md`
21. `.agents/review/REVIEWS.md`
22. `README.md`
23. `docs/**`

## 1) Local Definitions

1. **Canonical Validation Entrypoint**: `npm test`
2. **Canonical Local Development Entrypoint**: `npm run dev`
3. **Canonical Release or Publish Entrypoint**: `npm run build`
4. **Project-Specific Architecture Boundaries**: `product/`, `system/`
5. **Applied Governance Stack**:
   - **Delivery Kind**: `web app`
   - **Languages**: `javascript, css`
   - **Frameworks Or Runtimes**: `nodejs`
   - **Applied Coding Profiles**: `.agents/.rules/governance/profiles/languages/javascript.md, .agents/.rules/governance/profiles/languages/css.md, .agents/.rules/governance/profiles/languages/nodejs.md`
   - **Applied Architecture Profiles**: `.agents/.rules/governance/app-architecture/profiles/languages/javascript.md`
   - **Security Lanes Required**: `security/**`
   - **Operations Lanes Required**: `operations/**`
6. **Project Workspace**:
   - `.agents/business-logic/`
   - `.agents/language-specific/`
   - `.agents/management/`
   - `.agents/review/`
7. **Code Review Mode**:
   - review is stop-the-line
   - findings are blocking until fixed, validated, and re-reviewed
   - no review closes with a known defect still open
8. **Project-Specific Exceptions or Forbidden Shortcuts**:
   - Repo-local guidance may remain under `.agents/.rules/project-local/**` while it is being migrated, but it does not override `.agents/.rules/**`.

Keep this file short. Long procedures belong in governance docs, and active
queues belong in `.agents/management/**`.
