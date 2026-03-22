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

  appendVisibleCssRuleBlock(lines, 'callout-card {', [
    { from: 'host_outline', untilBefore: 'host_summary', line: 'outline: 1px solid #f97316;' },
    { from: 'host_display', line: 'display: block;' },
    { from: 'host_width', line: 'width: min(100%, 420px);' },
    { from: 'host_summary', line: '/* helper outline removed in final callout-card host summary */' }
  ], stepNumber, 'component_html');

  appendVisibleCssRuleBlock(lines, 'callout-card .card {', [
    { from: 'card_outline', untilBefore: 'card_summary', line: 'outline: 1px dashed #38bdf8;' },
    { from: 'card_display', line: 'display: grid;' },
    { from: 'card_gap', line: 'gap: 16px;' },
    { from: 'card_padding', line: 'padding: 24px;' },
    { from: 'card_radius', line: 'border-radius: 28px;' },
    { from: 'card_border', line: 'border: 1px solid rgba(148,163,184,0.24);' },
    { from: 'card_background', line: 'background: linear-gradient(180deg, rgba(15,23,42,0.98), rgba(15,23,42,0.92));' },
    { from: 'card_shadow', line: 'box-shadow: 0 26px 60px rgba(15,23,42,0.24);' },
    { from: 'card_summary', line: '/* helper outline removed in final .card summary */' }
  ], stepNumber);

  appendVisibleCssRuleBlock(lines, 'callout-card .eyebrow {', [
    { from: 'eyebrow_outline', untilBefore: 'eyebrow_summary', line: 'outline: 1px dotted #facc15;' },
    { from: 'eyebrow_display', line: 'display: inline-flex;' },
    { from: 'eyebrow_padding', line: 'padding: 8px 12px;' },
    { from: 'eyebrow_radius', line: 'border-radius: 999px;' },
    { from: 'eyebrow_background', line: 'background: rgba(56,189,248,0.14);' },
    { from: 'eyebrow_color', line: 'color: #38bdf8;' },
    { from: 'eyebrow_font_size', line: 'font-size: 12px;' },
    { from: 'eyebrow_font_weight', line: 'font-weight: 700;' },
    { from: 'eyebrow_summary', line: '/* helper outline removed in final .eyebrow summary */' }
  ], stepNumber);

  appendVisibleCssRuleBlock(lines, 'callout-card .title {', [
    { from: 'title_font_size', line: 'font-size: 28px;' },
    { from: 'title_font_weight', line: 'font-weight: 800;' }
  ], stepNumber);

  appendVisibleCssRuleBlock(lines, 'callout-card .summary {', [
    { from: 'summary_margin', line: 'margin: 0;' },
    { from: 'summary_color', line: 'color: #cbd5e1;' },
    { from: 'summary_line_height', line: 'line-height: 1.65;' }
  ], stepNumber);

  appendVisibleCssRuleBlock(lines, 'callout-card .cta {', [
    { from: 'cta_outline', untilBefore: 'cta_summary', line: 'outline: 1px dashed #34d399;' },
    { from: 'cta_padding', line: 'padding: 12px 16px;' },
    { from: 'cta_border', line: 'border: 0;' },
    { from: 'cta_radius', line: 'border-radius: 999px;' },
    { from: 'cta_background', line: 'background: linear-gradient(135deg, #38bdf8, #2563eb);' },
    { from: 'cta_color', line: 'color: #ffffff;' },
    { from: 'cta_font_weight', line: 'font-weight: 700;' },
    { from: 'cta_summary', line: '/* helper outline removed in final .cta summary */' }
  ], stepNumber);

  return lines;
}
