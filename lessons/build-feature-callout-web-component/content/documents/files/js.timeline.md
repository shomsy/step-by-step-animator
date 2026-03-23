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
      "      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;",
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
      "      background: linear-gradient(",
      "        180deg,",
      "        var(--callout-surface, rgba(15, 23, 42, 0.98)),",
      "        var(--callout-surface-alt, rgba(15, 23, 42, 0.92))",
      "      );"
    ]
  },
  {
    "from": "card_shadow",
    "target": "card-style-body",
    "lines": [
      "      box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));"
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
    "from": "eyebrow_align_items",
    "target": "eyebrow-style-body",
    "lines": [
      "      align-items: center;"
    ]
  },
  {
    "from": "eyebrow_justify_content",
    "target": "eyebrow-style-body",
    "lines": [
      "      justify-content: center;"
    ]
  },
  {
    "from": "eyebrow_width",
    "target": "eyebrow-style-body",
    "lines": [
      "      width: fit-content;"
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
    "from": "eyebrow_letter_spacing",
    "target": "eyebrow-style-body",
    "lines": [
      "      letter-spacing: 0.04em;"
    ]
  },
  {
    "from": "eyebrow_text_transform",
    "target": "eyebrow-style-body",
    "lines": [
      "      text-transform: uppercase;"
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
    "from": "title_margin",
    "target": "title-style-body",
    "lines": [
      "      margin: 0;"
    ]
  },
  {
    "from": "title_font_size",
    "target": "title-style-body",
    "lines": [
      "      font-size: clamp(1.75rem, 4vw, 2rem);"
    ]
  },
  {
    "from": "title_line_height",
    "target": "title-style-body",
    "lines": [
      "      line-height: 1.1;"
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
      "      color: var(--callout-muted, #cbd5e1);"
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
    "from": "cta_appearance",
    "target": "cta-style-body",
    "lines": [
      "      appearance: none;"
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
      "      background: linear-gradient(",
      "        135deg,",
      "        var(--callout-accent, #38bdf8),",
      "        var(--callout-accent-strong, #2563eb)",
      "      );"
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
    "from": "cta_font",
    "target": "cta-style-body",
    "lines": [
      "      font: inherit;"
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
    "from": "cta_cursor",
    "target": "cta-style-body",
    "lines": [
      "      cursor: pointer;"
    ]
  },
  {
    "from": "cta_transition",
    "target": "cta-style-body",
    "lines": [
      "      transition: transform 160ms ease, filter 160ms ease, box-shadow 160ms ease;"
    ]
  },
  {
    "from": "cta_box_shadow",
    "target": "cta-style-body",
    "lines": [
      "      box-shadow: 0 14px 30px rgba(37, 99, 235, 0.28);"
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
    "from": "cta_hover_filter",
    "target": "template-style-rules",
    "lines": [
      "",
      "    .cta:hover {",
      "      filter: brightness(1.06);",
      "      @@slot:cta-hover-body@@",
      "    }"
    ]
  },
  {
    "from": "cta_hover_transform",
    "target": "cta-hover-body",
    "lines": [
      "      transform: translateY(-1px);"
    ]
  },
  {
    "from": "cta_active_transform",
    "target": "template-style-rules",
    "lines": [
      "",
      "    .cta:active {",
      "      transform: translateY(0);",
      "    }"
    ]
  },
  {
    "from": "cta_focus_outline",
    "target": "template-style-rules",
    "lines": [
      "",
      "    .cta:focus-visible {",
      "      outline: 3px solid rgba(56, 189, 248, 0.45);",
      "      @@slot:cta-focus-body@@",
      "    }"
    ]
  },
  {
    "from": "cta_focus_outline_offset",
    "target": "cta-focus-body",
    "lines": [
      "      outline-offset: 3px;"
    ]
  },
  {
    "from": "card_markup",
    "target": "template-markup",
    "lines": [
      "",
      "  <article class=\"card\" part=\"card\">",
      "    <span class=\"eyebrow\" part=\"eyebrow\">",
      "      <slot name=\"eyebrow\">Vanilla JS</slot>",
      "    </span>",
      "",
      "    <h2 class=\"title\" part=\"title\"></h2>",
      "",
      "    <p class=\"summary\" part=\"summary\">",
      "      <slot>Dodaj opis komponente kroz default slot.</slot>",
      "    </p>",
      "",
      "    <button class=\"cta\" part=\"cta\" type=\"button\"></button>",
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
      "    const shadowRoot = this.attachShadow({ mode: 'open' });",
      "    @@slot:constructor-body@@",
      "  }",
      ""
    ]
  },
  {
    "from": "constructor_clone",
    "target": "constructor-body",
    "lines": [
      "    shadowRoot.appendChild(featureCalloutTemplate.content.cloneNode(true));"
    ]
  },
  {
    "from": "constructor_cache_title",
    "target": "constructor-body",
    "lines": [
      "    this.titleElement = shadowRoot.querySelector('.title');"
    ]
  },
  {
    "from": "constructor_cache_cta",
    "target": "constructor-body",
    "lines": [
      "    this.ctaElement = shadowRoot.querySelector('.cta');"
    ]
  },
  {
    "from": "constructor_bind_click",
    "target": "constructor-body",
    "lines": [
      "    this.handleClick = this.handleClick.bind(this);"
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
      "    @@slot:connected-callback-body@@",
      "  }",
      ""
    ]
  },
  {
    "from": "connected_callback_render",
    "target": "connected-callback-body",
    "lines": [
      "    this.render();"
    ]
  },
  {
    "from": "connected_callback_listener",
    "target": "connected-callback-body",
    "lines": [
      "    this.ctaElement.addEventListener('click', this.handleClick);"
    ]
  },
  {
    "from": "disconnected_callback",
    "target": "class-body",
    "lines": [
      "  disconnectedCallback() {",
      "    this.ctaElement.removeEventListener('click', this.handleClick);",
      "  }",
      ""
    ]
  },
  {
    "from": "attribute_changed_callback",
    "target": "class-body",
    "lines": [
      "  attributeChangedCallback() {",
      "    if (this.isConnected) {",
      "      this.render();",
      "    }",
      "  }",
      ""
    ]
  },
  {
    "from": "handle_click_dispatch_event",
    "target": "class-body",
    "lines": [
      "  handleClick() {",
      "    this.dispatchEvent(",
      "      new CustomEvent('callout-action', {",
      "        bubbles: true,",
      "        composed: true,",
      "        detail: {",
      "          title: this.getAttribute('title') || 'Naslov komponente',",
      "          ctaLabel: this.getAttribute('cta-label') || 'Saznaj više'",
      "        }",
      "      })",
      "    );",
      "  }"
    ]
  },
  {
    "from": "define_guard",
    "target": "after-class",
    "lines": [
      "if (!customElements.get('feature-callout')) {",
      "  @@slot:define-body@@",
      "}"
    ]
  },
  {
    "from": "define_element",
    "target": "define-body",
    "lines": [
      "  customElements.define('feature-callout', FeatureCallout);"
    ]
  }
]
```
