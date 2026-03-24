# JS Timeline

```json
[
  {
    "from": "import_template",
    "target": "root",
    "lines": [
      "import { uiCalloutCardTemplate } from './ui-callout-card.template.js';",
      "@@slot:after-import-template@@"
    ]
  },
  {
    "from": "normalize_text_helper",
    "target": "after-import-template",
    "lines": [
      "",
      "function normalizeTextValue(value, fallback) {",
      "  return String(value ?? '').trim() || fallback;",
      "}",
      "",
      "@@slot:after-normalize-text@@"
    ]
  },
  {
    "from": "allowed_variants_set",
    "target": "after-normalize-text",
    "lines": [
      "const allowedVariants = new Set(['info', 'success', 'warning', 'danger']);",
      "",
      "@@slot:after-allowed-variants@@"
    ]
  },
  {
    "from": "normalize_variant_helper",
    "target": "after-allowed-variants",
    "lines": [
      "function normalizeVariantValue(value) {",
      "  const normalizedValue = String(value ?? '').trim().toLowerCase();",
      "  return allowedVariants.has(normalizedValue) ? normalizedValue : 'info';",
      "}",
      "",
      "@@slot:after-normalize-variant@@"
    ]
  },
  {
    "from": "class_declaration",
    "target": "after-normalize-variant",
    "lines": [
      "class UiCalloutCard extends HTMLElement {",
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
      "  static observedAttributes = ['title', 'cta-label', 'disabled', 'variant'];",
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
    "from": "constructor_bind",
    "target": "constructor-body",
    "lines": [
      "    this.handleActionClick = this.handleActionClick.bind(this);"
    ]
  },
  {
    "from": "constructor_state",
    "target": "constructor-body",
    "lines": [
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
      "    @@slot:connected-body@@",
      "  }",
      ""
    ]
  },
  {
    "from": "connected_callback_setup",
    "target": "connected-body",
    "lines": [
      "    this.setupTemplateOnce();"
    ]
  },
  {
    "from": "connected_callback_cache",
    "target": "connected-body",
    "lines": [
      "    this.cacheDom();"
    ]
  },
  {
    "from": "connected_callback_sync",
    "target": "connected-body",
    "lines": [
      "    this.syncFromAttributes();"
    ]
  },
  {
    "from": "connected_callback_bind",
    "target": "connected-body",
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
      "  attributeChangedCallback(name, oldValue, newValue) {",
      "    @@slot:attribute-changed-body@@",
      "  }",
      ""
    ]
  },
  {
    "from": "attribute_changed_guard",
    "target": "attribute-changed-body",
    "lines": [
      "    if (oldValue === newValue || !this.isConnected) {",
      "      return;",
      "    }",
      "",
      "    @@slot:update-switch-body@@"
    ]
  },
  {
    "from": "attribute_changed_switch",
    "target": "update-switch-body",
    "lines": [
      "    switch (name) {",
      "      case 'title':",
      "        this.updateTitle();",
      "        break;",
      "      case 'cta-label':",
      "        this.updateCtaLabel();",
      "        break;",
      "      case 'disabled':",
      "        this.updateDisabledState();",
      "        break;",
      "      case 'variant':",
      "        this.updateVariant();",
      "        break;",
      "      default:",
      "        break;",
      "    }"
    ]
  },
  {
    "from": "property_title_getter",
    "target": "class-body",
    "lines": [
      "  get title() {",
      "    return normalizeTextValue(this.getAttribute('title'), 'Enterprise Callout');",
      "  }",
      ""
    ]
  },
  {
    "from": "property_title_setter",
    "target": "class-body",
    "lines": [
      "  set title(value) {",
      "    this.setAttribute('title', normalizeTextValue(value, 'Enterprise Callout'));",
      "  }",
      ""
    ]
  },
  {
    "from": "property_cta_getter",
    "target": "class-body",
    "lines": [
      "  get ctaLabel() {",
      "    return normalizeTextValue(this.getAttribute('cta-label'), 'Review contract');",
      "  }",
      ""
    ]
  },
  {
    "from": "property_cta_setter",
    "target": "class-body",
    "lines": [
      "  set ctaLabel(value) {",
      "    this.setAttribute('cta-label', normalizeTextValue(value, 'Review contract'));",
      "  }",
      ""
    ]
  },
  {
    "from": "property_disabled_getter",
    "target": "class-body",
    "lines": [
      "  get disabled() {",
      "    return this.hasAttribute('disabled');",
      "  }",
      ""
    ]
  },
  {
    "from": "property_disabled_setter",
    "target": "class-body",
    "lines": [
      "  set disabled(value) {",
      "    this.toggleAttribute('disabled', Boolean(value));",
      "  }",
      ""
    ]
  },
  {
    "from": "property_variant_getter",
    "target": "class-body",
    "lines": [
      "  get variant() {",
      "    return normalizeVariantValue(this.getAttribute('variant'));",
      "  }",
      ""
    ]
  },
  {
    "from": "property_variant_setter",
    "target": "class-body",
    "lines": [
      "  set variant(value) {",
      "    this.setAttribute('variant', normalizeVariantValue(value));",
      "  }",
      ""
    ]
  },
  {
    "from": "setup_template_once",
    "target": "class-body",
    "lines": [
      "  setupTemplateOnce() {",
      "    @@slot:setup-template-body@@",
      "  }",
      ""
    ]
  },
  {
    "from": "setup_template_once_guard",
    "target": "setup-template-body",
    "lines": [
      "    if (!this.shadowRoot.hasChildNodes()) {",
      "      this.shadowRoot.appendChild(uiCalloutCardTemplate.content.cloneNode(true));",
      "    }"
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
    "from": "sync_from_attributes",
    "target": "class-body",
    "lines": [
      "  syncFromAttributes() {",
      "    @@slot:sync-body@@",
      "  }",
      ""
    ]
  },
  {
    "from": "sync_from_attributes_calls",
    "target": "sync-body",
    "lines": [
      "    this.updateTitle();",
      "    this.updateCtaLabel();",
      "    this.updateDisabledState();",
      "    this.updateVariant();"
    ]
  },
  {
    "from": "update_title",
    "target": "class-body",
    "lines": [
      "  updateTitle() {",
      "    if (!this.titleElement) {",
      "      return;",
      "    }",
      "",
      "    this.titleElement.textContent = this.title;",
      "  }",
      ""
    ]
  },
  {
    "from": "update_cta_label",
    "target": "class-body",
    "lines": [
      "  updateCtaLabel() {",
      "    if (!this.ctaElement) {",
      "      return;",
      "    }",
      "",
      "    this.ctaElement.textContent = this.ctaLabel;",
      "    this.ctaElement.setAttribute('aria-label', `${this.ctaLabel}: ${this.title}`);",
      "  }",
      ""
    ]
  },
  {
    "from": "update_disabled_state",
    "target": "class-body",
    "lines": [
      "  updateDisabledState() {",
      "    if (!this.ctaElement) {",
      "      return;",
      "    }",
      "",
      "    this.ctaElement.disabled = this.disabled;",
      "    this.setAttribute('aria-disabled', String(this.disabled));",
      "  }",
      ""
    ]
  },
  {
    "from": "update_variant",
    "target": "class-body",
    "lines": [
      "  updateVariant() {",
      "    const normalizedVariant = this.variant;",
      "",
      "    if (this.getAttribute('variant') !== normalizedVariant) {",
      "      this.setAttribute('variant', normalizedVariant);",
      "      return;",
      "    }",
      "",
      "    this.dataset.variant = normalizedVariant;",
      "  }",
      ""
    ]
  },
  {
    "from": "bind_events",
    "target": "class-body",
    "lines": [
      "  bindEvents() {",
      "    @@slot:bind-body@@",
      "  }",
      ""
    ]
  },
  {
    "from": "bind_events_guard",
    "target": "bind-body",
    "lines": [
      "    if (!this.ctaElement || this.isCtaBound) {",
      "      return;",
      "    }",
      "",
      "    this.ctaElement.addEventListener('click', this.handleActionClick);",
      "    this.isCtaBound = true;"
    ]
  },
  {
    "from": "unbind_events",
    "target": "class-body",
    "lines": [
      "  unbindEvents() {",
      "    @@slot:unbind-body@@",
      "  }",
      ""
    ]
  },
  {
    "from": "unbind_events_guard",
    "target": "unbind-body",
    "lines": [
      "    if (!this.ctaElement || !this.isCtaBound) {",
      "      return;",
      "    }",
      "",
      "    this.ctaElement.removeEventListener('click', this.handleActionClick);",
      "    this.isCtaBound = false;"
    ]
  },
  {
    "from": "handle_click_disabled_guard",
    "target": "class-body",
    "lines": [
      "  handleActionClick(event) {",
      "    @@slot:handle-click-body@@",
      "  }",
      ""
    ]
  },
  {
    "from": "handle_click_disabled_guard_body",
    "target": "handle-click-body",
    "lines": [
      "    if (this.disabled) {",
      "      event.preventDefault();",
      "      return;",
      "    }",
      ""
    ]
  },
  {
    "from": "handle_click_event",
    "target": "handle-click-body",
    "lines": [
      "    const componentActionEvent = new CustomEvent('ui-callout-card:action', {",
      "      bubbles: true,",
      "      composed: true,",
      "      cancelable: true,",
      "      detail: {",
      "        title: this.title,",
      "        ctaLabel: this.ctaLabel,",
      "        variant: this.variant,",
      "        source: 'ui-callout-card'",
      "      }",
      "    });",
      "",
      "    this.dispatchEvent(componentActionEvent);"
    ]
  },
  {
    "from": "define_guard",
    "target": "after-class",
    "lines": [
      "if (!customElements.get('ui-callout-card')) {",
      "  @@slot:define-body@@",
      "}"
    ]
  },
  {
    "from": "define_element",
    "target": "define-body",
    "lines": [
      "  customElements.define('ui-callout-card', UiCalloutCard);"
    ]
  }
]
```
