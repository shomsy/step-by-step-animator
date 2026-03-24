# JS Timeline

```json
[
  {
    "from": "import_template",
    "target": "root",
    "lines": [
      "import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';",
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
    "from": "allowed_statuses_set",
    "target": "after-normalize-text",
    "lines": [
      "const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);",
      "",
      "@@slot:after-allowed-statuses@@"
    ]
  },
  {
    "from": "normalize_status_helper",
    "target": "after-allowed-statuses",
    "lines": [
      "function normalizeStatusValue(value) {",
      "  const v = String(value ?? '').trim().toLowerCase();",
      "  return allowedStatuses.has(v) ? v : 'offline';",
      "}",
      "",
      "@@slot:after-normalize-status@@"
    ]
  },
  {
    "from": "status_label_map",
    "target": "after-normalize-status",
    "lines": [
      "const statusAriaLabel = {",
      "  online: 'Online',",
      "  idle: 'Idle',",
      "  away: 'Away',",
      "  offline: 'Offline'",
      "};",
      "",
      "@@slot:after-status-label-map@@"
    ]
  },
  {
    "from": "class_declaration",
    "target": "after-status-label-map",
    "lines": [
      "class UiUserAvatar extends HTMLElement {",
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
      "  static observedAttributes = ['username', 'role', 'status', 'profile-url'];",
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
      "    this.handleAvatarClick = this.handleAvatarClick.bind(this);"
    ]
  },
  {
    "from": "constructor_state",
    "target": "constructor-body",
    "lines": [
      "    this.usernameElement = null;",
      "    this.roleElement = null;",
      "    this.statusBadgeElement = null;",
      "    this.isClickBound = false;"
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
      "    @@slot:attribute-switch-body@@"
    ]
  },
  {
    "from": "attribute_changed_switch",
    "target": "attribute-switch-body",
    "lines": [
      "    switch (name) {",
      "      case 'username':",
      "        this.updateUsername();",
      "        break;",
      "      case 'role':",
      "        this.updateRole();",
      "        break;",
      "      case 'status':",
      "        this.updateStatus();",
      "        break;",
      "      default:",
      "        break;",
      "    }"
    ]
  },
  {
    "from": "property_username_getter",
    "target": "class-body",
    "lines": [
      "  get username() {",
      "    return normalizeTextValue(this.getAttribute('username'), 'Team Member');",
      "  }",
      ""
    ]
  },
  {
    "from": "property_username_setter",
    "target": "class-body",
    "lines": [
      "  set username(value) {",
      "    this.setAttribute('username', normalizeTextValue(value, 'Team Member'));",
      "  }",
      ""
    ]
  },
  {
    "from": "property_role_getter",
    "target": "class-body",
    "lines": [
      "  get role() {",
      "    return normalizeTextValue(this.getAttribute('role'), '');",
      "  }",
      ""
    ]
  },
  {
    "from": "property_role_setter",
    "target": "class-body",
    "lines": [
      "  set role(value) {",
      "    this.setAttribute('role', normalizeTextValue(value, ''));",
      "  }",
      ""
    ]
  },
  {
    "from": "property_status_getter",
    "target": "class-body",
    "lines": [
      "  get status() {",
      "    return normalizeStatusValue(this.getAttribute('status'));",
      "  }",
      ""
    ]
  },
  {
    "from": "property_status_setter",
    "target": "class-body",
    "lines": [
      "  set status(value) {",
      "    this.setAttribute('status', normalizeStatusValue(value));",
      "  }",
      ""
    ]
  },
  {
    "from": "property_profile_url_getter",
    "target": "class-body",
    "lines": [
      "  get profileUrl() {",
      "    return this.getAttribute('profile-url') || '';",
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
      "      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));",
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
    "from": "cache_dom_username",
    "target": "cache-dom-body",
    "lines": [
      "    if (!this.usernameElement) {",
      "      this.usernameElement = this.shadowRoot.querySelector('.username');",
      "    }",
      ""
    ]
  },
  {
    "from": "cache_dom_role",
    "target": "cache-dom-body",
    "lines": [
      "    if (!this.roleElement) {",
      "      this.roleElement = this.shadowRoot.querySelector('.role');",
      "    }",
      ""
    ]
  },
  {
    "from": "cache_dom_status_badge",
    "target": "cache-dom-body",
    "lines": [
      "    if (!this.statusBadgeElement) {",
      "      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');",
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
      "    this.updateUsername();",
      "    this.updateRole();",
      "    this.updateStatus();"
    ]
  },
  {
    "from": "update_username",
    "target": "class-body",
    "lines": [
      "  updateUsername() {",
      "    if (!this.usernameElement) {",
      "      return;",
      "    }",
      "",
      "    this.usernameElement.textContent = this.username;",
      "  }",
      ""
    ]
  },
  {
    "from": "update_role",
    "target": "class-body",
    "lines": [
      "  updateRole() {",
      "    if (!this.roleElement) {",
      "      return;",
      "    }",
      "",
      "    this.roleElement.textContent = this.role;",
      "  }",
      ""
    ]
  },
  {
    "from": "update_status",
    "target": "class-body",
    "lines": [
      "  updateStatus() {",
      "    if (!this.statusBadgeElement) {",
      "      return;",
      "    }",
      "",
      "    const normalizedStatus = this.status;",
      "    this.statusBadgeElement.setAttribute('aria-label', statusAriaLabel[normalizedStatus] || 'Unknown');",
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
      "    if (this.isClickBound) {",
      "      return;",
      "    }",
      "",
      "    this.addEventListener('click', this.handleAvatarClick);",
      "    this.setAttribute('tabindex', '0');",
      "    this.setAttribute('role', 'button');",
      "    this.isClickBound = true;"
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
      "    if (!this.isClickBound) {",
      "      return;",
      "    }",
      "",
      "    this.removeEventListener('click', this.handleAvatarClick);",
      "    this.isClickBound = false;"
    ]
  },
  {
    "from": "handle_avatar_click",
    "target": "class-body",
    "lines": [
      "  handleAvatarClick() {",
      "    @@slot:click-body@@",
      "  }",
      ""
    ]
  },
  {
    "from": "handle_avatar_click_event",
    "target": "click-body",
    "lines": [
      "    this.dispatchEvent(",
      "      new CustomEvent('ui-user-avatar:profile-open', {",
      "        bubbles: true,",
      "        composed: true,",
      "        cancelable: true,",
      "        detail: {",
      "          username: this.username,",
      "          role: this.role,",
      "          status: this.status,",
      "          profileUrl: this.profileUrl,",
      "          source: 'ui-user-avatar'",
      "        }",
      "      })",
      "    );"
    ]
  },
  {
    "from": "define_guard",
    "target": "after-class",
    "lines": [
      "if (!customElements.get('ui-user-avatar')) {",
      "  @@slot:define-body@@",
      "}"
    ]
  },
  {
    "from": "define_element",
    "target": "define-body",
    "lines": [
      "  customElements.define('ui-user-avatar', UiUserAvatar);"
    ]
  }
]
```
