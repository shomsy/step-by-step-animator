import { stepNumberById } from './describe-steps.js';

function readStepBoundary(stepReference) {
  if (typeof stepReference === 'number') {
    return stepReference;
  }

  if (!stepReference) {
    return Number.POSITIVE_INFINITY;
  }

  return stepNumberById[stepReference] ?? Number.POSITIVE_INFINITY;
}

function appendVisibleCssRuleBlock(lines, header, entries, stepNumber, showFrom = Number.POSITIVE_INFINITY) {
  const activeEntries = entries.filter(entry =>
    stepNumber >= readStepBoundary(entry.from) &&
    (entry.untilBefore === undefined || stepNumber < readStepBoundary(entry.untilBefore))
  );

  if (!activeEntries.length && stepNumber < readStepBoundary(showFrom)) {
    return;
  }

  if (lines.length) {
    lines.push('');
  }

  lines.push(header);

  activeEntries.forEach(entry => {
    lines.push(`  ${entry.line}`);
  });

  lines.push('}');
}

export function buildCssAtStep(stepNumber) {
  const lines = [];

  appendVisibleCssRuleBlock(lines, '.app-shell {', [
    { from: 'shell_outline', untilBefore: 'shell_summary', line: 'outline: 1px dashed #94a3b8;' },
    { from: 'shell_padding', line: 'padding: 40px;' },
    { from: 'shell_display', line: 'display: grid;' },
    { from: 'shell_place_items', line: 'place-items: center;' },
    { from: 'shell_min_height', line: 'min-height: 100vh;' },
    { from: 'shell_background', line: 'background: linear-gradient(180deg, #e2e8f0, #cbd5e1);' },
    { from: 'shell_summary', line: '/* helper outline removed in final .app-shell summary */' }
  ], stepNumber, 'empty_shell');

  appendVisibleCssRuleBlock(lines, 'feature-callout {', [
    { from: 'host_outline', untilBefore: 'host_summary', line: 'outline: 1px solid #f97316;' },
    { from: 'host_display', line: 'display: block;' },
    { from: 'host_width', line: 'width: min(100%, 420px);' },
    { from: 'host_surface_token', line: '--callout-surface: #0f172a;' },
    { from: 'host_border_token', line: '--callout-border: rgba(148,163,184,0.24);' },
    { from: 'host_accent_token', line: '--callout-accent: #38bdf8;' },
    { from: 'host_text_token', line: '--callout-text: #e2e8f0;' },
    { from: 'host_summary', line: '/* helper outline removed in final feature-callout host summary */' }
  ], stepNumber, 'component_html');

  return lines;
}
