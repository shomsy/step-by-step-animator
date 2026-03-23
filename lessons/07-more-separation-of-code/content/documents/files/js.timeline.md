# JS Timeline

```json
[
  {
    "from": "import_template",
    "target": "root",
    "lines": [
      "import { myFirstComponentTemplate } from './component.html.js';",
      "@@slot:after-import-template@@"
    ]
  },
  {
    "from": "class_declaration",
    "target": "after-import-template",
    "lines": [
      "",
      "class MyFirstComponent extends HTMLElement {",
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
    "from": "constructor_component_state",
    "target": "constructor-body",
    "lines": [
      "    this.handleClick = this.handleClick.bind(this);",
      "    this.titleElement = null;",
      "    this.ctaElement = null;",
      "    this.isCtaBound = false;"
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
    "from": "connected_callback_cache",
    "target": "connected-callback-body",
    "lines": [
      "    this.cacheDom();"
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
    "from": "connected_callback_bind",
    "target": "connected-callback-body",
    "lines": [
      "    this.bindEvents();"
    ]
  },
  {
    "from": "disconnected_callback",
    "target": "class-body",
    "lines": [
      "  disconnectedCallback() {",
      "    this.unbindEvents();",
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
    "from": "cache_dom",
    "target": "class-body",
    "lines": [
      "  cacheDom() {",
      "    @@slot:cache-dom-body@@",
      "  }",
      ""
    ]
  },
  {
    "from": "cache_dom_clone",
    "target": "cache-dom-body",
    "lines": [
      "    if (!this.shadowRoot.hasChildNodes()) {",
      "      this.shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));",
      "    }",
      ""
    ]
  },
  {
    "from": "cache_dom_title",
    "target": "cache-dom-body",
    "lines": [
      "    if (!this.titleElement) {",
      "      this.titleElement = this.shadowRoot.querySelector('.title');",
      "    }",
      ""
    ]
  },
  {
    "from": "cache_dom_cta",
    "target": "cache-dom-body",
    "lines": [
      "    if (!this.ctaElement) {",
      "      this.ctaElement = this.shadowRoot.querySelector('.cta');",
      "    }"
    ]
  },
  {
    "from": "bind_events",
    "target": "class-body",
    "lines": [
      "  bindEvents() {",
      "    @@slot:bind-events-body@@",
      "  }",
      ""
    ]
  },
  {
    "from": "bind_events_guard",
    "target": "bind-events-body",
    "lines": [
      "    if (!this.ctaElement || this.isCtaBound) {",
      "      return;",
      "    }",
      "    this.ctaElement.addEventListener('click', this.handleClick);",
      "    this.isCtaBound = true;"
    ]
  },
  {
    "from": "unbind_events",
    "target": "class-body",
    "lines": [
      "  unbindEvents() {",
      "    @@slot:unbind-events-body@@",
      "  }",
      ""
    ]
  },
  {
    "from": "unbind_events_guard",
    "target": "unbind-events-body",
    "lines": [
      "    if (!this.ctaElement || !this.isCtaBound) {",
      "      return;",
      "    }",
      "    this.ctaElement.removeEventListener('click', this.handleClick);",
      "    this.isCtaBound = false;"
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
    "from": "render_guard",
    "target": "render-body",
    "lines": [
      "    if (!this.titleElement || !this.ctaElement) {",
      "      return;",
      "    }",
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
    "from": "handle_click_dispatch_event",
    "target": "class-body",
    "lines": [
      "  handleClick() {",
      "    this.dispatchEvent(",
      "      new CustomEvent('component-action', {",
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
      "if (!customElements.get('my-first-component')) {",
      "  @@slot:define-body@@",
      "}"
    ]
  },
  {
    "from": "define_element",
    "target": "define-body",
    "lines": [
      "  customElements.define('my-first-component', MyFirstComponent);"
    ]
  }
]
```
