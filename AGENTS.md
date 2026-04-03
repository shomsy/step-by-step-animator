# AGENTS.md — Local Project Contract

Version: 1.10.0
Status: Normative / Local
Scope: `./**`

This file is the project-specific child contract.
The reusable `.agents` project is mounted in `.agents/.rules/`.
The mounted copy is the source of reusable rules for the child repo.
The visible `.agents/` folders are the project workspace skeleton.

## 0) Order Of Precedence

Agents MUST follow this order:

1. `AGENTS.md`
2. `.agents/.rules/AGENTS.md`
3. `.agents/.rules/governance/core/quality/quality-gates.md`
4. `.agents/.rules/governance/core/resolution/profile-resolution-algorithm.md`
5. `.agents/.rules/governance/profiles/**`
6. `.agents/.rules/governance/architecture/**`
7. `.agents/.rules/governance/security/**`
8. `.agents/.rules/governance/execution/policy/execution-policy.md`
9. `.agents/.rules/governance/execution/routing/prompt-to-governance-flow.md`
10. `.agents/.rules/governance/execution/hooks/hooks-policy.md`
11. `.agents/.rules/governance/execution/approvals/approval-policy.md`
12. `.agents/.rules/governance/core/flags/feature-flags.md`
13. `.agents/.rules/governance/standards/review/how-to-code-review.md`
14. `.agents/.rules/governance/standards/review/how-to-strict-review.md`
15. `.agents/.rules/governance/standards/coding/how-to-coding-standards.md`
16. `.agents/.rules/governance/standards/coding/naming-standard.md`
17. `.agents/.rules/governance/standards/documentation/how-to-document-flow.md`
18. `.agents/.rules/governance/standards/documentation/how-to-document.md`
19. `.agents/.rules/governance/standards/governance/governance-authoring-standard.md`
20. `.agents/.rules/governance/standards/governance/governance-evolution-policy.md`
21. `.agents/.rules/governance/delivery/release/release-and-rollback-policy.md`
22. `.agents/.rules/governance/intelligence/memory/memory-lifecycle.md`
23. `.agents/.rules/governance/skills/contract/skill-contract.md`
24. `.agents/.rules/governance/agents/roles/agent-roles.md`
25. `.agents/.rules/governance/delivery/workflows/workflow-pipelines.md`
26. `.agents/.rules/governance/intelligence/context/context-management.md`
27. `.agents/.rules/governance/intelligence/learning/continuous-learning.md`
28. `.agents/.rules/governance/intelligence/learning/instincts-policy.md`
29. `.agents/.rules/governance/integrations/platforms/platform-compatibility.md`
30. `.agents/.rules/governance/integrations/mcp/mcp-integration-policy.md`
31. `.agents/.rules/governance/execution/sandbox/sandbox-boundary-policy.md`
32. `.agents/.rules/governance/agents/orchestration/society-of-mind-pattern.md`
33. `.agents/.rules/governance/delivery/operations/**`
34. `.agents/skills/**`
35. `.agents/management/ACTIVE.md`
36. `.agents/management/TIMELINE.md`
37. `.agents/management/TODO.md`
38. `.agents/management/BUGS.md`
39. `.agents/review/REVIEWS.md`
40. `README.md`
41. `docs/**`

## 1. Local Definitions

Project-specific truth for Step By Step Animator:

1. **Canonical Validation Entrypoint**: `npm test`
2. **Canonical Local Development Entrypoint**: `npm run dev`
3. **Canonical Release or Publish Entrypoint**: `npm run build`
4. **Project-Specific Architecture Boundaries**:
   - `product/` for the live web app shell, content, and lesson package consumer
   - `system/` for engine, compilation, and authoring services
   - `tests/` for contract/flow/smoke validation harness
   - `.agents/` for governance/workflow/mgmt rigor
5. **Applied Governance Stack**:
   - **Delivery Kind**: `web app`
   - **Applied Repository Profiles**: `frontend`, `lesson-engine`, `governance-driven`
   - **Languages**: `JavaScript` (ESM), `Markdown` disciplines
   - **Frameworks Or Runtimes**: `Vite`, browser, Node.js scripts
   - **Applied Coding Profiles**: `eslint:recommended`, `prettier`
   - **Applied Architecture Profiles**: `monorepo-with-submodules`, `dual-run-mode` (authoring + playback)
   - **Security Lanes Required**: `security/**` (review and checklist for 3rd-party lib safety)
   - **Operations Lanes Required**: `delivery/operations/**` (deployment, smoke tests, release gating)
6. **Project Workspace**:
   - `.agents/business-logic/`
   - `.agents/language-specific/`
   - `.agents/management/`
   - `.agents/hooks/`
   - `.agents/review/`
7. **Project-Specific Exceptions or Forbidden Shortcuts**:
   - No direct edits in `.agents/.rules/`; use local `.agents/` artifacts only.
   - Preserve the `ensure:rules` submodule guard before any test/build (`pre*` script wrappers).
   - Avoid using `applyTo: "**"` for non-global instruction files; keep scope explicit.
   - **CRITICAL AI ASSISTANT RULE**: When generating or editing `Show Code` blocks in `lesson.script.md` files, you MUST NEVER abbreviate code (e.g., using `// ...ostatak koda...`, `/* ... */`, or `...`). You must ALWAYS output the complete, unabbreviated file snapshot. Abbreviating code breaks the `buildArtifactLineDiff` engine and causes unchanged lines to be erroneously marked as "removed" which visually deletes them from the UI.

Keep this file short. Long procedures belong in governance docs, and active
queues belong in `.agents/management/**`.

---
*No offload recommended for this step.*
