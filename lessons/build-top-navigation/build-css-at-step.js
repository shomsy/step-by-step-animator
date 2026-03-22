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

  if (Array.isArray(header)) {
    header.forEach(line => lines.push(line));
  } else {
    lines.push(header);
  }

  activeEntries.forEach(entry => {
    lines.push(`  ${entry.line}`);
  });

  lines.push('}');
}

export function buildCssAtStep(stepNumber) {
  const lines = [];

  appendVisibleCssRuleBlock(lines, '.app-shell {', [
    { from: 'shell_padding', line: 'padding: 40px;' },
    { from: 'shell_background', line: 'background: #d6e1eb;' },
    { from: 'shell_min_height', line: 'min-height: 100vh;' }
  ], stepNumber, 'empty_shell');

  appendVisibleCssRuleBlock(lines, '.topbar {', [
    { from: 'topbar_outline', untilBefore: 'topbar_background', line: '/* privremeni pomoćni border radi lakšeg snalaženja; uklanjamo ga kasnije */' },
    { from: 'topbar_outline', untilBefore: 'topbar_background', line: 'outline: 2px solid #ff5d8f;' },
    { from: 'topbar_padding', line: 'padding: 18px 28px;' },
    { from: 'topbar_background', line: 'background: #25262c;' },
    { from: 'topbar_border', line: 'border: 1px solid rgba(0,0,0,0.22);' },
    { from: 'topbar_shadow', line: 'box-shadow: 0 12px 24px rgba(0,0,0,0.18);' },
    { from: 'topbar_display', line: 'display: flex;' },
    { from: 'topbar_align_items', line: 'align-items: center;' },
    { from: 'topbar_justify_content', line: 'justify-content: space-between;' }
  ], stepNumber, 'topbar_html');

  appendVisibleCssRuleBlock(lines, '.topbar-logo {', [
    { from: 'logo_color', line: 'color: #ffffff;' },
    { from: 'logo_font_size', line: 'font-size: 18px;' },
    { from: 'logo_font_weight', line: 'font-weight: 800;' },
    { from: 'logo_letter_spacing', line: 'letter-spacing: 0.04em;' },
    { from: 'logo_text_decoration', line: 'text-decoration: none;' }
  ], stepNumber, 'logo_html');

  appendVisibleCssRuleBlock(lines, '.topbar-links {', [
    { from: 'nav_outline', untilBefore: 'cta_html', line: '/* helper linija za centralnu link zonu; držimo je dok ne završimo celu nav celinu */' },
    { from: 'nav_outline', untilBefore: 'cta_html', line: 'outline: 1px dashed #38bdf8;' },
    { from: 'nav_display', line: 'display: flex;' },
    { from: 'nav_gap', line: 'gap: 36px;' },
    { from: 'nav_margin_left', line: 'margin-left: auto;' },
    { from: 'nav_margin_right', line: 'margin-right: auto;' }
  ], stepNumber, 'nav_html');

  appendVisibleCssRuleBlock(lines, '.topbar-links a {', [
    { from: 'nav_link_color', line: 'color: #ffffff;' },
    { from: 'nav_link_font_size', line: 'font-size: 15px;' },
    { from: 'nav_link_text_decoration', line: 'text-decoration: none;' },
    { from: 'nav_link_transition', line: 'transition: color 0.3s ease;' }
  ], stepNumber);

  appendVisibleCssRuleBlock(lines, '.topbar-links a:hover {', [
    { from: 'nav_link_hover_color', line: 'color: #cbd5e1;' }
  ], stepNumber);

  appendVisibleCssRuleBlock(lines, '.topbar-cta {', [
    { from: 'cta_outline', untilBefore: 'cta_background', line: '/* privremeni pomoćni border radi lakšeg snalaženja; uklanjamo ga kada se pojavi završna boja */' },
    { from: 'cta_outline', untilBefore: 'cta_background', line: 'outline: 1px dashed #11a4d3;' },
    { from: 'cta_display', line: 'display: inline-flex;' },
    { from: 'cta_align_items', line: 'align-items: center;' },
    { from: 'cta_padding', line: 'padding: 12px 28px;' },
    { from: 'cta_radius', line: 'border-radius: 999px;' },
    { from: 'cta_background', line: 'background: #11a4d3;' },
    { from: 'cta_color', line: 'color: #ffffff;' },
    { from: 'cta_text_decoration', line: 'text-decoration: none;' },
    { from: 'cta_shadow', line: 'box-shadow: 0 10px 20px rgba(17,164,211,0.28);' }
  ], stepNumber, 'cta_html');

  return lines;
}
