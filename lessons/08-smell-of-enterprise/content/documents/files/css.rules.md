# CSS Rule Blocks

```json
[
  {
    "header": ".app-shell {",
    "showFrom": "empty_shell",
    "entries": [
      { "from": "shell_outline", "untilBefore": "shell_summary", "line": "outline: 1px dashed #94a3b8;" },
      { "from": "shell_padding", "line": "padding: 40px;" },
      { "from": "shell_display", "line": "display: grid;" },
      { "from": "shell_place_items", "line": "place-items: center;" },
      { "from": "shell_min_height", "line": "min-height: 100vh;" },
      { "from": "shell_background", "line": "background: linear-gradient(180deg, #e2e8f0, #cbd5e1);" },
      { "from": "shell_summary", "line": "/* helper outline removed in final .app-shell summary */" }
    ]
  },
  {
    "header": "ui-callout-card {",
    "showFrom": "component_html",
    "entries": [
      { "from": "host_outline", "untilBefore": "host_summary", "line": "outline: 1px solid #f97316;" },
      { "from": "host_display", "line": "display: block;" },
      { "from": "host_width", "line": "width: min(100%, 460px);" },
      { "from": "host_surface_token", "line": "--callout-surface: #0f172a;" },
      { "from": "host_surface_alt_token", "line": "--callout-surface-alt: rgba(15, 23, 42, 0.92);" },
      { "from": "host_border_token", "line": "--callout-border: rgba(148,163,184,0.24);" },
      { "from": "host_accent_token", "line": "--callout-accent: #38bdf8;" },
      { "from": "host_accent_strong_token", "line": "--callout-accent-strong: #2563eb;" },
      { "from": "host_text_token", "line": "--callout-text: #e2e8f0;" },
      { "from": "host_muted_token", "line": "--callout-muted: #cbd5e1;" },
      { "from": "host_shadow_token", "line": "--callout-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);" },
      { "from": "host_summary", "line": "/* helper outline removed in final ui-callout-card host summary */" }
    ]
  },
  {
    "header": "ui-callout-card[variant=\"success\"] {",
    "showFrom": "variant_success_accent",
    "entries": [
      { "from": "variant_success_accent", "line": "--callout-accent: #22c55e;" },
      { "from": "variant_success_accent_strong", "line": "--callout-accent-strong: #15803d;" }
    ]
  },
  {
    "header": "ui-callout-card[variant=\"warning\"] {",
    "showFrom": "variant_warning_accent",
    "entries": [
      { "from": "variant_warning_accent", "line": "--callout-accent: #f59e0b;" },
      { "from": "variant_warning_accent_strong", "line": "--callout-accent-strong: #d97706;" },
      { "from": "variant_warning_text", "line": "--callout-text: #fff7ed;" },
      { "from": "variant_warning_muted", "line": "--callout-muted: #fed7aa;" }
    ]
  },
  {
    "header": "ui-callout-card[variant=\"danger\"] {",
    "showFrom": "variant_danger_accent",
    "entries": [
      { "from": "variant_danger_accent", "line": "--callout-accent: #f87171;" },
      { "from": "variant_danger_accent_strong", "line": "--callout-accent-strong: #dc2626;" }
    ]
  },
  {
    "header": "ui-callout-card[disabled] {",
    "showFrom": "host_disabled_opacity",
    "entries": [
      { "from": "host_disabled_opacity", "line": "opacity: 0.72;" }
    ]
  }
]
```
