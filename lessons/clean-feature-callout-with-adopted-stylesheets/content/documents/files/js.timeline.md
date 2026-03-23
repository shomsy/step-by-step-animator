# JS Timeline

```json
[
  {
    "from": "shadow_css_import",
    "target": "root",
    "lines": [
      "import shadowDomStyleCssText from './shadow-dom-style.css?raw';",
      ""
    ]
  },
  {
    "from": "template_declaration",
    "target": "root",
    "lines": [
      "const featureCalloutTemplate = document.createElement('template');",
      "@@slot:after-template-declaration@@"
    ]
  },
  {
    "from": "stylesheet_declaration",
    "target": "after-template-declaration",
    "lines": [
      "",
      "const featureCalloutStyles = new CSSStyleSheet();",
      "@@slot:after-stylesheet-declaration@@"
    ]
  },
  {
    "from": "stylesheet_replace_sync",
    "target": "after-stylesheet-declaration",
    "lines": [
      "",
      "featureCalloutStyles.replaceSync(shadowDomStyleCssText);",
      "@@slot:after-stylesheet-replace-sync@@"
    ]
  },
  {
    "from": "template_markup_open",
    "target": "after-stylesheet-replace-sync",
    "lines": [
      "",
      "featureCalloutTemplate.innerHTML = `",
      "  @@slot:template-markup@@",
      "`;",
      "@@slot:after-template-markup@@"
    ]
  },
  {
    "from": "card_markup",
    "target": "template-markup",
    "lines": [
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
    "from": "constructor_adopt_stylesheet",
    "target": "constructor-body",
    "lines": [
      "    this.shadowRoot.adoptedStyleSheets = [featureCalloutStyles];"
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
