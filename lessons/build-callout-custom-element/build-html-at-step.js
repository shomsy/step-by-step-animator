import { stepNumberById } from './describe-steps.js';

export function buildHtmlAtStep(stepNumber) {
  const lines = ['<div class="app-shell">'];

  if (stepNumber >= stepNumberById.component_html) {
    lines.push(
      '  <callout-card',
      '    title="Custom element od nule"',
      '    cta-label="Nastavi dalje"',
      '  ></callout-card>'
    );
  }

  lines.push('</div>');
  return lines;
}
