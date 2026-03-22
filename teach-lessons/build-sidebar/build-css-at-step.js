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

  appendVisibleCssRuleBlock(lines, '.sidebar {', [
    { from: 'sidebar_outline', untilBefore: 'sidebar_background', line: '/* privremeni pomoćni border radi lakšeg snalaženja; uklanjamo ga kasnije */' },
    { from: 'sidebar_outline', untilBefore: 'sidebar_background', line: 'outline: 2px solid #ff4757;' },
    { from: 'sidebar_width', line: 'width: 280px;' },
    { from: 'sidebar_min_height', line: 'min-height: 100vh;' },
    { from: 'sidebar_border_right', line: 'border-right: 1px solid rgba(255,255,255,0.12);' },
    { from: 'sidebar_background', line: 'background: #0b1020;' },
    { from: 'sidebar_color', line: 'color: #edf2ff;' },
    { from: 'sidebar_display_flex', line: 'display: flex;' },
    { from: 'sidebar_flex_direction', line: 'flex-direction: column;' }
  ], stepNumber, 'sidebar_html');

  appendVisibleCssRuleBlock(lines, '.sidebar-brand {', [
    { from: 'brand_outline', untilBefore: 'nav_html', line: '/* helper boja za wrapper; držimo je dok ne završimo celu brand celinu */' },
    { from: 'brand_outline', untilBefore: 'nav_html', line: 'outline: 2px solid #2ed573;' },
    { from: 'brand_padding', line: 'padding: 24px;' },
    { from: 'brand_margin_bottom', line: 'margin-bottom: 28px;' },
    { from: 'brand_display', line: 'display: flex;' },
    { from: 'brand_align_items', line: 'align-items: center;' },
    { from: 'brand_gap', line: 'gap: 14px;' },
  ], stepNumber, 'brand_html');

  appendVisibleCssRuleBlock(lines, '.logo {', [
    { from: 'logo_outline', untilBefore: 'nav_html', line: '/* helper boja za logo; držimo je dok ne završimo celu brand celinu */' },
    { from: 'logo_outline', untilBefore: 'nav_html', line: 'outline: 2px dotted #7dd3fc;' },
    { from: 'logo_width', line: 'width: 48px;' },
    { from: 'logo_height', line: 'height: 48px;' },
    { from: 'logo_display', line: 'display: grid;' },
    { from: 'logo_place_items', line: 'place-items: center;' },
    { from: 'logo_radius', line: 'border-radius: 12px;' },
    { from: 'logo_font_weight', line: 'font-weight: 800;' },
    { from: 'logo_background', line: 'background: linear-gradient(135deg, #6d73ff, #8f5cff);' },
    { from: 'logo_color', line: 'color: white;' },
    { from: 'logo_shadow', line: 'box-shadow: 0 12px 24px rgba(109,115,255,0.30);' }
  ], stepNumber, 'logo_html');

  appendVisibleCssRuleBlock(lines, '.brand-copy {', [
    { from: 'brand_copy_outline', untilBefore: 'nav_html', line: '/* helper boja za brand-copy; držimo je dok ne završimo celu brand celinu */' },
    { from: 'brand_copy_outline', untilBefore: 'nav_html', line: 'outline: 1px dashed #f59e0b;' }
  ], stepNumber, 'brand_copy_html');

  appendVisibleCssRuleBlock(lines, '.brand-copy strong {', [
    { from: 'brand_strong_display', line: 'display: block;' },
    { from: 'brand_strong_font_size', line: 'font-size: 16px;' }
  ], stepNumber);

  appendVisibleCssRuleBlock(lines, '.brand-copy span {', [
    { from: 'brand_span_display', line: 'display: block;' },
    { from: 'brand_span_margin_top', line: 'margin-top: 4px;' },
    { from: 'brand_span_font_size', line: 'font-size: 13px;' },
    { from: 'brand_span_color', line: 'color: #9aa6c8;' }
  ], stepNumber);

  appendVisibleCssRuleBlock(lines, '.nav-list {', [
    { from: 'nav_list_outline', untilBefore: 'footer_html', line: '/* helper boja za nav wrapper; držimo je dok ne završimo celu navigacionu celinu */' },
    { from: 'nav_list_outline', untilBefore: 'footer_html', line: 'outline: 1px dashed #38bdf8;' },
    { from: 'nav_list_padding', untilBefore: 'footer_html', line: 'padding: 10px 8px;' },
    { from: 'nav_list_display', line: 'display: grid;' },
    { from: 'nav_list_gap', line: 'gap: 10px;' }
  ], stepNumber, 'nav_html');

  appendVisibleCssRuleBlock(lines, '.nav-item {', [
    { from: 'nav_item_outline', untilBefore: 'footer_html', line: '/* helper boja za nav item; držimo je dok ne završimo celu navigacionu celinu */' },
    { from: 'nav_item_outline', untilBefore: 'footer_html', line: 'outline: 1px solid #ffa502;' },
    { from: 'nav_item_display', line: 'display: flex;' },
    { from: 'nav_item_min_height', line: 'min-height: 52px;' },
    { from: 'nav_item_padding', line: 'padding: 12px 16px;' },
    { from: 'nav_item_align_items', line: 'align-items: center;' },
    { from: 'nav_item_gap', line: 'gap: 12px;' },
    { from: 'nav_item_radius', line: 'border-radius: 14px;' },
    { from: 'nav_item_margin', line: 'margin: 0 8px;' },
    { from: 'nav_item_transition', line: 'transition: all 0.4s ease;' }
  ], stepNumber, 'nav_items_html');

  appendVisibleCssRuleBlock(lines, '.nav-item .icon {', [
    { from: 'nav_icon_outline', untilBefore: 'footer_html', line: '/* helper boja za icon; držimo je dok ne završimo celu navigacionu celinu */' },
    { from: 'nav_icon_outline', untilBefore: 'footer_html', line: 'outline: 1px dotted #7dd3fc;' },
    { from: 'nav_icon_width', line: 'width: 22px;' },
    { from: 'nav_icon_height', line: 'height: 22px;' },
    { from: 'nav_icon_display', line: 'display: grid;' },
    { from: 'nav_icon_place_items', line: 'place-items: center;' }
  ], stepNumber);

  appendVisibleCssRuleBlock(lines, '.nav-item .label {', [
    { from: 'nav_label_font_size', line: 'font-size: 15px;' },
    { from: 'nav_label_font_weight', line: 'font-weight: 600;' }
  ], stepNumber);

  appendVisibleCssRuleBlock(lines, '.nav-item.active {', [
    { from: 'nav_item_active_background', line: 'background: rgba(109,115,255,0.14);' },
    { from: 'nav_item_active_color', line: 'color: white;' }
  ], stepNumber);

  appendVisibleCssRuleBlock(lines, '.nav-item:hover {', [
    { from: 'nav_item_hover_background', line: 'background: rgba(255,255,255,0.05);' }
  ], stepNumber);

  appendVisibleCssRuleBlock(lines, '.sidebar.is-collapsed {', [
    { from: 'collapse_width', line: 'width: 108px;' }
  ], stepNumber);

  appendVisibleCssRuleBlock(lines, [
    '.sidebar.is-collapsed .brand-copy,',
    '.sidebar.is-collapsed .nav-item .label {'
  ], [
    { from: 'hide_labels', line: 'display: none;' }
  ], stepNumber);

  appendVisibleCssRuleBlock(lines, '.sidebar-footer {', [
    { from: 'footer_border', line: 'border: 1px solid rgba(255,255,255,0.12);' },
    { from: 'footer_background', line: 'background: rgba(255,255,255,0.05);' },
    { from: 'footer_padding', line: 'padding: 16px;' },
    { from: 'footer_radius', line: 'border-radius: 14px;' },
    { from: 'footer_margin_top', line: 'margin-top: auto;' }
  ], stepNumber, 'footer_html');

  appendVisibleCssRuleBlock(lines, '.sidebar-footer p {', [
    { from: 'footer_text_margin', line: 'margin: 6px 0 0;' },
    { from: 'footer_text_color', line: 'color: #9aa6c8;' },
    { from: 'footer_text_line_height', line: 'line-height: 1.5;' }
  ], stepNumber);

  if (stepNumber >= stepNumberById.responsive_sidebar_min_height) {
    lines.push(
      '',
      '@media (max-width: 980px) {',
      '  .sidebar {',
      '    min-height: auto;',
      '  }',
      '}'
    );
  }

  return lines;
}
