# JS Timeline

```json
[
  {
    "from": "template_declaration",
    "target": "root",
    "lines": [
      "const featureCalloutTemplate = document.createElement('template');",
      "@@slot:after-template-declaration@@"
    ]
  },
  {
    "from": "template_markup_open",
    "target": "after-template-declaration",
    "lines": [
      "",
      "featureCalloutTemplate.innerHTML = `",
      "  <style>",
      "    @@slot:template-style-rules@@",
      "  </style>",
      "  @@slot:template-markup@@",
      "`;",
      "@@slot:after-template-markup@@"
    ]
  },
  {
    "from": "host_font",
    "target": "template-style-rules",
    "lines": [
      "    :host {",
      "      font-family: Inter, ui-sans-serif, system-ui, sans-serif;",
      "      @@slot:host-style-body@@",
      "    }"
    ]
  },
  {
    "from": "host_color",
    "target": "host-style-body",
    "lines": [
      "      color: var(--callout-text, #e2e8f0);"
    ]
  },
  {
    "from": "card_outline",
    "target": "template-style-rules",
    "lines": [
      "",
      "    .card {",
      "      outline: 1px dashed #38bdf8;",
      "      @@slot:card-style-body@@",
      "      @@slot:card-summary-comment@@",
      "    }"
    ]
  },
  {
    "from": "card_display",
    "target": "card-style-body",
    "lines": [
      "      display: grid;"
    ]
  },
  {
    "from": "card_gap",
    "target": "card-style-body",
    "lines": [
      "      gap: 16px;"
    ]
  },
  {
    "from": "card_padding",
    "target": "card-style-body",
    "lines": [
      "      padding: 24px;"
    ]
  },
  {
    "from": "card_radius",
    "target": "card-style-body",
    "lines": [
      "      border-radius: 28px;"
    ]
  },
  {
    "from": "card_border",
    "target": "card-style-body",
    "lines": [
      "      border: 1px solid var(--callout-border, rgba(148,163,184,0.24));"
    ]
  },
  {
    "from": "card_background",
    "target": "card-style-body",
    "lines": [
      "      background: linear-gradient(180deg, rgba(15,23,42,0.98), rgba(15,23,42,0.92));"
    ]
  },
  {
    "from": "card_shadow",
    "target": "card-style-body",
    "lines": [
      "      box-shadow: 0 26px 60px rgba(15,23,42,0.24);"
    ]
  },
  {
    "from": "card_summary",
    "target": "card-summary-comment",
    "lines": [
      "      /* helper outline removed in final .card summary */"
    ]
  },
  {
    "from": "eyebrow_outline",
    "target": "template-style-rules",
    "lines": [
      "",
      "    .eyebrow {",
      "      outline: 1px dotted #facc15;",
      "      @@slot:eyebrow-style-body@@",
      "      @@slot:eyebrow-summary-comment@@",
      "    }"
    ]
  },
  {
    "from": "eyebrow_display",
    "target": "eyebrow-style-body",
    "lines": [
      "      display: inline-flex;"
    ]
  },
  {
    "from": "eyebrow_padding",
    "target": "eyebrow-style-body",
    "lines": [
      "      padding: 8px 12px;"
    ]
  },
  {
    "from": "eyebrow_radius",
    "target": "eyebrow-style-body",
    "lines": [
      "      border-radius: 999px;"
    ]
  },
  {
    "from": "eyebrow_background",
    "target": "eyebrow-style-body",
    "lines": [
      "      background: rgba(56,189,248,0.14);"
    ]
  },
  {
    "from": "eyebrow_color",
    "target": "eyebrow-style-body",
    "lines": [
      "      color: var(--callout-accent, #38bdf8);"
    ]
  },
  {
    "from": "eyebrow_font_size",
    "target": "eyebrow-style-body",
    "lines": [
      "      font-size: 12px;"
    ]
  },
  {
    "from": "eyebrow_font_weight",
    "target": "eyebrow-style-body",
    "lines": [
      "      font-weight: 700;"
    ]
  },
  {
    "from": "eyebrow_summary",
    "target": "eyebrow-summary-comment",
    "lines": [
      "      /* helper outline removed in final .eyebrow summary */"
    ]
  },
  {
    "from": "title_display",
    "target": "template-style-rules",
    "lines": [
      "",
      "    .title {",
      "      display: block;",
      "      @@slot:title-style-body@@",
      "    }"
    ]
  },
  {
    "from": "title_font_size",
    "target": "title-style-body",
    "lines": [
      "      font-size: 28px;"
    ]
  },
  {
    "from": "title_font_weight",
    "target": "title-style-body",
    "lines": [
      "      font-weight: 800;"
    ]
  },
  {
    "from": "summary_margin",
    "target": "template-style-rules",
    "lines": [
      "",
      "    .summary {",
      "      margin: 0;",
      "      @@slot:summary-style-body@@",
      "    }"
    ]
  },
  {
    "from": "summary_color",
    "target": "summary-style-body",
    "lines": [
      "      color: #cbd5e1;"
    ]
  },
  {
    "from": "summary_line_height",
    "target": "summary-style-body",
    "lines": [
      "      line-height: 1.65;"
    ]
  },
  {
    "from": "cta_outline",
    "target": "template-style-rules",
    "lines": [
      "",
      "    .cta {",
      "      outline: 1px dashed #34d399;",
      "      @@slot:cta-style-body@@",
      "      @@slot:cta-summary-comment@@",
      "    }"
    ]
  },
  {
    "from": "cta_justify_self",
    "target": "cta-style-body",
    "lines": [
      "      justify-self: start;"
    ]
  },
  {
    "from": "cta_padding",
    "target": "cta-style-body",
    "lines": [
      "      padding: 12px 16px;"
    ]
  },
  {
    "from": "cta_border",
    "target": "cta-style-body",
    "lines": [
      "      border: 0;"
    ]
  },
  {
    "from": "cta_radius",
    "target": "cta-style-body",
    "lines": [
      "      border-radius: 999px;"
    ]
  },
  {
    "from": "cta_background",
    "target": "cta-style-body",
    "lines": [
      "      background: linear-gradient(135deg, var(--callout-accent, #38bdf8), #2563eb);"
    ]
  },
  {
    "from": "cta_color",
    "target": "cta-style-body",
    "lines": [
      "      color: #ffffff;"
    ]
  },
  {
    "from": "cta_font_weight",
    "target": "cta-style-body",
    "lines": [
      "      font-weight: 700;"
    ]
  },
  {
    "from": "cta_summary",
    "target": "cta-summary-comment",
    "lines": [
      "      /* helper outline removed in final .cta summary */"
    ]
  },
  {
    "from": "card_markup",
    "target": "template-markup",
    "lines": [
      "",
      "  <article class=\"card\">",
      "    <span class=\"eyebrow\">",
      "      <slot name=\"eyebrow\">Vanilla JS</slot>",
      "    </span>",
      "",
      "    <strong class=\"title\"></strong>",
      "",
      "    <p class=\"summary\">",
      "      <slot>Dodaj opis komponente kroz default slot.</slot>",
      "    </p>",
      "",
      "    <button class=\"cta\" type=\"button\"></button>",
      "  </article>"
    ]
  },
  {
    "from": "class_declaration",
    "target": "after-template-markup",
    "lines": [
      "",
      "class FeatureCallout extends HTMLElement {",
      "  @@slot:class-head@@",
      "  @@slot:class-body@@",
      "}",
      "",
      "@@slot:after-class@@"
    ]
  },
  {
    "from": "observed_attributes",
    "target": "class-head",
    "lines": [
      "  static observedAttributes = ['title', 'cta-label'];",
      ""
    ]
  },
  {
    "from": "constructor_shadow",
    "target": "class-body",
    "lines": [
      "  constructor() {",
      "    super();",
      "    this.attachShadow({ mode: 'open' });",
      "    @@slot:constructor-body@@",
      "  }",
      ""
    ]
  },
  {
    "from": "constructor_clone",
    "target": "constructor-body",
    "lines": [
      "    this.shadowRoot.appendChild(featureCalloutTemplate.content.cloneNode(true));"
    ]
  },
  {
    "from": "constructor_cache_title",
    "target": "constructor-body",
    "lines": [
      "    this.titleElement = this.shadowRoot.querySelector('.title');"
    ]
  },
  {
    "from": "constructor_cache_cta",
    "target": "constructor-body",
    "lines": [
      "    this.ctaElement = this.shadowRoot.querySelector('.cta');"
    ]
  },
  {
    "from": "render_declaration",
    "target": "class-body",
    "lines": [
      "  render() {",
      "    @@slot:render-body@@",
      "  }",
      ""
    ]
  },
  {
    "from": "render_title",
    "target": "render-body",
    "lines": [
      "    this.titleElement.textContent = this.getAttribute('title') || 'Naslov komponente';"
    ]
  },
  {
    "from": "render_cta",
    "target": "render-body",
    "lines": [
      "    this.ctaElement.textContent = this.getAttribute('cta-label') || 'Saznaj više';"
    ]
  },
  {
    "from": "connected_callback",
    "target": "class-body",
    "lines": [
      "  connectedCallback() {",
      "    this.render();",
      "  }",
      ""
    ]
  },
  {
    "from": "attribute_changed_callback",
    "target": "class-body",
    "lines": [
      "  attributeChangedCallback() {",
      "    this.render();",
      "  }"
    ]
  },
  {
    "from": "define_element",
    "target": "after-class",
    "lines": [
      "customElements.define('feature-callout', FeatureCallout);"
    ]
  }
]
```
