import { stepNumberById } from './describe-steps.js';

function hasStep(stepNumber, stepReference) {
  return stepNumber >= (stepNumberById[stepReference] ?? Number.POSITIVE_INFINITY);
}

export function buildJsAtStep(stepNumber) {
  const lines = [];

  if (hasStep(stepNumber, 'class_declaration')) {
    lines.push('class CalloutCard extends HTMLElement {');

    if (hasStep(stepNumber, 'connected_callback')) {
      lines.push('  connectedCallback() {');

      if (hasStep(stepNumber, 'read_title_attribute')) {
        lines.push("    const title = this.getAttribute('title') || 'Naslov komponente';");
      }

      if (hasStep(stepNumber, 'read_cta_attribute')) {
        lines.push("    const ctaLabel = this.getAttribute('cta-label') || 'Saznaj više';");
      }

      if (hasStep(stepNumber, 'render_inner_html')) {
        lines.push(
          '    this.innerHTML = `',
          '      <article class="card">',
          '        <span class="eyebrow">Custom element</span>',
          '        <strong class="title">${title}</strong>',
          '        <p class="summary">Light DOM verzija nam prvo objašnjava registraciju, atribut API i render bez shadow DOM sloja.</p>',
          '        <button class="cta" type="button">${ctaLabel}</button>',
          '      </article>',
          '    `;'
        );
      }

      lines.push('  }');
    }

    lines.push('}');
  }

  if (hasStep(stepNumber, 'define_element')) {
    lines.push('', "customElements.define('callout-card', CalloutCard);");
  }

  return lines;
}
