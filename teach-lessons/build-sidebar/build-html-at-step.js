import { stepNumberById } from './describe-steps.js';

export function buildHtmlAtStep(stepNumber) {
  const lines = ['<div class="app-shell">'];

  if (stepNumber >= stepNumberById.sidebar_html) {
    lines.push('  <aside class="sidebar">');

    if (stepNumber >= stepNumberById.brand_html) {
      lines.push('    <div class="sidebar-brand">');

      if (stepNumber >= stepNumberById.logo_html) {
        lines.push('      <div class="logo">A</div>');
      }

      if (stepNumber >= stepNumberById.brand_copy_html) {
        lines.push(
          '      <div class="brand-copy">',
          '        <strong>AdminPro</strong>',
          '        <span>Dashboard</span>',
          '      </div>'
        );
      }

      lines.push('    </div>');
    }

    if (stepNumber >= stepNumberById.nav_html) {
      lines.push('', '    <nav class="nav-list">');

      if (stepNumber >= stepNumberById.nav_items_html) {
        lines.push(
          '      <a href="#" class="nav-item active"><span class="icon">⌂</span><span class="label">Overview</span></a>',
          '      <a href="#" class="nav-item"><span class="icon">◫</span><span class="label">Analytics</span></a>',
          '      <a href="#" class="nav-item"><span class="icon">◧</span><span class="label">Orders</span></a>',
          '      <a href="#" class="nav-item"><span class="icon">◎</span><span class="label">Customers</span></a>',
          '      <a href="#" class="nav-item"><span class="icon">▣</span><span class="label">Products</span></a>',
          '      <a href="#" class="nav-item"><span class="icon">⚙</span><span class="label">Settings</span></a>'
        );
      }

      lines.push('    </nav>');
    }

    if (stepNumber >= stepNumberById.footer_html) {
      lines.push(
        '',
        '    <div class="sidebar-footer">',
        '      <strong>Pro Tip</strong>',
        '      <p>Sidebar nije samo lista linkova. On je layout zona sa ritmom, hijerarhijom i stanjima.</p>',
        '    </div>'
      );
    }

    lines.push('  </aside>');
  }

  lines.push('</div>');
  return lines;
}
