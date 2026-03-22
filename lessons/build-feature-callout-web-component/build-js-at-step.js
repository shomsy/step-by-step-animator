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

function hasStep(stepNumber, stepReference) {
  return stepNumber >= readStepBoundary(stepReference);
}

function appendTemplateCssRuleBlock(lines, selector, entries, stepNumber, showFrom = Number.POSITIVE_INFINITY) {
  const activeEntries = entries.filter(entry =>
    stepNumber >= readStepBoundary(entry.from) &&
    (entry.untilBefore === undefined || stepNumber < readStepBoundary(entry.untilBefore))
  );

  if (!activeEntries.length && stepNumber < readStepBoundary(showFrom)) {
    return;
  }

  if (lines.at(-1) !== '  <style>') {
    lines.push('');
  }

  lines.push(`    ${selector} {`);

  activeEntries.forEach(entry => {
    lines.push(`      ${entry.line}`);
  });

  lines.push('    }');
}

export function buildJsAtStep(stepNumber) {
  const lines = [];

  if (hasStep(stepNumber, 'template_declaration')) {
    lines.push("const featureCalloutTemplate = document.createElement('template');");
  }

  if (hasStep(stepNumber, 'template_markup_open')) {
    lines.push('', 'featureCalloutTemplate.innerHTML = `');

    appendTemplateCssRuleBlock(lines, ':host', [
      { from: 'host_font', line: "font-family: Inter, ui-sans-serif, system-ui, sans-serif;" },
      { from: 'host_color', line: 'color: var(--callout-text, #e2e8f0);' }
    ], stepNumber, 'template_markup_open');

    appendTemplateCssRuleBlock(lines, '.card', [
      { from: 'card_outline', untilBefore: 'card_summary', line: 'outline: 1px dashed #38bdf8;' },
      { from: 'card_display', line: 'display: grid;' },
      { from: 'card_gap', line: 'gap: 16px;' },
      { from: 'card_padding', line: 'padding: 24px;' },
      { from: 'card_radius', line: 'border-radius: 28px;' },
      { from: 'card_border', line: 'border: 1px solid var(--callout-border, rgba(148,163,184,0.24));' },
      { from: 'card_background', line: 'background: linear-gradient(180deg, rgba(15,23,42,0.98), rgba(15,23,42,0.92));' },
      { from: 'card_shadow', line: 'box-shadow: 0 26px 60px rgba(15,23,42,0.24);' },
      { from: 'card_summary', line: '/* helper outline removed in final .card summary */' }
    ], stepNumber);

    appendTemplateCssRuleBlock(lines, '.eyebrow', [
      { from: 'eyebrow_outline', untilBefore: 'eyebrow_summary', line: 'outline: 1px dotted #facc15;' },
      { from: 'eyebrow_display', line: 'display: inline-flex;' },
      { from: 'eyebrow_padding', line: 'padding: 8px 12px;' },
      { from: 'eyebrow_radius', line: 'border-radius: 999px;' },
      { from: 'eyebrow_background', line: 'background: rgba(56,189,248,0.14);' },
      { from: 'eyebrow_color', line: 'color: var(--callout-accent, #38bdf8);' },
      { from: 'eyebrow_font_size', line: 'font-size: 12px;' },
      { from: 'eyebrow_font_weight', line: 'font-weight: 700;' },
      { from: 'eyebrow_summary', line: '/* helper outline removed in final .eyebrow summary */' }
    ], stepNumber);

    appendTemplateCssRuleBlock(lines, '.title', [
      { from: 'title_display', line: 'display: block;' },
      { from: 'title_font_size', line: 'font-size: 28px;' },
      { from: 'title_font_weight', line: 'font-weight: 800;' }
    ], stepNumber);

    appendTemplateCssRuleBlock(lines, '.summary', [
      { from: 'summary_margin', line: 'margin: 0;' },
      { from: 'summary_color', line: 'color: #cbd5e1;' },
      { from: 'summary_line_height', line: 'line-height: 1.65;' }
    ], stepNumber);

    appendTemplateCssRuleBlock(lines, '.cta', [
      { from: 'cta_outline', untilBefore: 'cta_summary', line: 'outline: 1px dashed #34d399;' },
      { from: 'cta_justify_self', line: 'justify-self: start;' },
      { from: 'cta_padding', line: 'padding: 12px 16px;' },
      { from: 'cta_border', line: 'border: 0;' },
      { from: 'cta_radius', line: 'border-radius: 999px;' },
      { from: 'cta_background', line: 'background: linear-gradient(135deg, var(--callout-accent, #38bdf8), #2563eb);' },
      { from: 'cta_color', line: 'color: #ffffff;' },
      { from: 'cta_font_weight', line: 'font-weight: 700;' },
      { from: 'cta_summary', line: '/* helper outline removed in final .cta summary */' }
    ], stepNumber);

    lines.push('  </style>');

    if (hasStep(stepNumber, 'card_markup')) {
      lines.push(
        '',
        '  <article class="card">',
        '    <span class="eyebrow">',
        '      <slot name="eyebrow">Vanilla JS</slot>',
        '    </span>',
        '',
        '    <strong class="title"></strong>',
        '',
        '    <p class="summary">',
        '      <slot>Dodaj opis komponente kroz default slot.</slot>',
        '    </p>',
        '',
        '    <button class="cta" type="button"></button>',
        '  </article>'
      );
    }

    lines.push('`;');
  }

  if (hasStep(stepNumber, 'class_declaration')) {
    lines.push('', 'class FeatureCallout extends HTMLElement {');

    if (hasStep(stepNumber, 'observed_attributes')) {
      lines.push("  static observedAttributes = ['title', 'cta-label'];", '');
    }

    if (hasStep(stepNumber, 'constructor_shadow')) {
      lines.push('  constructor() {', '    super();', "    this.attachShadow({ mode: 'open' });");

      if (hasStep(stepNumber, 'constructor_clone')) {
        lines.push('    this.shadowRoot.appendChild(featureCalloutTemplate.content.cloneNode(true));');
      }

      if (hasStep(stepNumber, 'constructor_cache_title')) {
        lines.push("    this.titleElement = this.shadowRoot.querySelector('.title');");
      }

      if (hasStep(stepNumber, 'constructor_cache_cta')) {
        lines.push("    this.ctaElement = this.shadowRoot.querySelector('.cta');");
      }

      lines.push('  }', '');
    }

    if (hasStep(stepNumber, 'render_declaration')) {
      lines.push('  render() {');

      if (hasStep(stepNumber, 'render_title')) {
        lines.push("    this.titleElement.textContent = this.getAttribute('title') || 'Naslov komponente';");
      }

      if (hasStep(stepNumber, 'render_cta')) {
        lines.push("    this.ctaElement.textContent = this.getAttribute('cta-label') || 'Saznaj više';");
      }

      lines.push('  }', '');
    }

    if (hasStep(stepNumber, 'connected_callback')) {
      lines.push('  connectedCallback() {', '    this.render();', '  }', '');
    }

    if (hasStep(stepNumber, 'attribute_changed_callback')) {
      lines.push('  attributeChangedCallback() {', '    this.render();', '  }', '');
    }

    if (lines.at(-1) === '') {
      lines.pop();
    }

    lines.push('}');
  }

  if (hasStep(stepNumber, 'define_element')) {
    lines.push('', "customElements.define('feature-callout', FeatureCallout);");
  }

  return lines;
}
