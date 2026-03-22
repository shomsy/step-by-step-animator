import { stepNumberById } from './describe-steps.js';

export function buildHtmlAtStep(stepNumber) {
  const lines = ['<div class="app-shell">'];

  if (stepNumber >= stepNumberById.topbar_html) {
    lines.push('  <header class="topbar">');

    if (stepNumber >= stepNumberById.logo_html) {
      lines.push('    <a href="#" class="topbar-logo">LOGOBAKERY</a>');
    }

    if (stepNumber >= stepNumberById.nav_html) {
      lines.push(
        '',
        '    <nav class="topbar-links">',
        '      <a href="#">Services</a>',
        '      <a href="#">Projects</a>',
        '      <a href="#">About</a>',
        '    </nav>'
      );
    }

    if (stepNumber >= stepNumberById.cta_html) {
      lines.push('', '    <a href="#" class="topbar-cta">Contact</a>');
    }

    lines.push('  </header>');
  }

  lines.push('</div>');
  return lines;
}
