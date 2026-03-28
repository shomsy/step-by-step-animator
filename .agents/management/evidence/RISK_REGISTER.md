# Risk Register

Tracks active and accepted risks.

## Entry Format

- `id`:
- `severity`: low | medium | high | critical
- `likelihood`: low | medium | high
- `impact`:
- `mitigation`:
- `owner`:
- `status`: open | accepted | mitigated | closed

## Active Risks

1. `R-002`
   - severity: low
   - likelihood: medium
   - impact: Vite build still warns that the Piper package references `fs`, `path`, and `crypto`, so future dependency changes could break narration bundling unexpectedly.
   - mitigation: keep `npm run build` and browser narration smoke in the release proof set; re-check the Piper package on dependency upgrades.
   - owner: unassigned
   - status: accepted
2. `R-001`
   - severity: low
   - likelihood: low
   - impact: lesson text could have been rendered unsafely across tag-driven playback surfaces.
   - mitigation: escaped runtime tag rendering, kept markdown sanitization in place, and closed the stale queue item after regression coverage landed.
   - owner: unassigned
   - status: closed
