import { stepNumberById } from './describe-steps.js';

export function buildHtmlAtStep(stepNumber) {
  const lines = ['<div class="app-shell">'];

  if (stepNumber >= stepNumberById.component_html) {
    lines.push(
      '  <feature-callout',
      '    title="Web Components u praksi"',
      '    cta-label="Otvori lekciju"',
      '  >'
    );

    if (stepNumber >= stepNumberById.eyebrow_slot_html) {
      lines.push('    <span slot="eyebrow">Vanilla JS</span>');
    }

    if (stepNumber >= stepNumberById.summary_text_html) {
      lines.push('    Gradiš custom element, shadow DOM i slot projekciju bez framework-a.');
    }

    lines.push('  </feature-callout>');
  }

  lines.push('</div>');
  return lines;
}
