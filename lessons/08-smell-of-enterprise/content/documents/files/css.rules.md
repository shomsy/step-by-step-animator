# CSS Rule Blocks

```json
[
  {
    "header": ".app-shell {",
    "showFrom": "empty_shell",
    "entries": [
      { "from": "shell_outline", "untilBefore": "shell_summary", "line": "outline: 1px dashed #94a3b8;" },
      { "from": "shell_padding", "line": "padding: 48px 24px;" },
      { "from": "shell_display", "line": "display: grid;" },
      { "from": "shell_place_items", "line": "place-items: center;" },
      { "from": "shell_min_height", "line": "min-height: 100vh;" },
      { "from": "shell_background", "line": "background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);" },
      { "from": "shell_summary", "line": "/* helper outline removed */" }
    ]
  },
  {
    "header": "ui-pricing-card {",
    "showFrom": "component_html",
    "entries": [
      { "from": "host_outline", "untilBefore": "host_summary", "line": "outline: 1px solid #f97316;" },
      { "from": "host_display", "line": "display: block;" },
      { "from": "host_width", "line": "width: min(100%, 380px);" },
      { "from": "host_position", "line": "position: relative;" },
      { "from": "host_surface_token", "line": "--pricing-surface: #1e293b;" },
      { "from": "host_surface_alt_token", "line": "--pricing-surface-alt: rgba(15,23,42,0.92);" },
      { "from": "host_border_token", "line": "--pricing-border: rgba(148,163,184,0.18);" },
      { "from": "host_accent_token", "line": "--pricing-accent: #38bdf8;" },
      { "from": "host_accent_strong_token", "line": "--pricing-accent-strong: #2563eb;" },
      { "from": "host_text_token", "line": "--pricing-text: #f1f5f9;" },
      { "from": "host_muted_token", "line": "--pricing-muted: #94a3b8;" },
      { "from": "host_shadow_token", "line": "--pricing-shadow: 0 16px 48px rgba(15,23,42,0.4);" },
      { "from": "host_popular_glow_token", "line": "--pricing-popular-glow: 0 0 0 2px rgba(56,189,248,0.35);" },
      { "from": "host_summary", "line": "/* helper outline removed */" }
    ]
  },
  {
    "header": "ui-pricing-card[tier=\"starter\"] {",
    "showFrom": "tier_starter_accent",
    "entries": [
      { "from": "tier_starter_accent", "line": "--pricing-accent: #a78bfa;" },
      { "from": "tier_starter_accent_strong", "line": "--pricing-accent-strong: #7c3aed;" }
    ]
  },
  {
    "header": "ui-pricing-card[tier=\"pro\"] {",
    "showFrom": "tier_pro_accent",
    "entries": [
      { "from": "tier_pro_accent", "line": "--pricing-accent: #38bdf8;" },
      { "from": "tier_pro_accent_strong", "line": "--pricing-accent-strong: #2563eb;" }
    ]
  },
  {
    "header": "ui-pricing-card[tier=\"enterprise\"] {",
    "showFrom": "tier_enterprise_accent",
    "entries": [
      { "from": "tier_enterprise_accent", "line": "--pricing-accent: #f59e0b;" },
      { "from": "tier_enterprise_accent_strong", "line": "--pricing-accent-strong: #d97706;" }
    ]
  },
  {
    "header": "ui-pricing-card[popular] {",
    "showFrom": "popular_host_shadow",
    "entries": [
      { "from": "popular_host_shadow", "line": "box-shadow: var(--pricing-popular-glow, 0 0 0 2px rgba(56,189,248,0.35));" },
      { "from": "popular_host_transform", "line": "transform: scale(1.03);" },
      { "from": "popular_host_z_index", "line": "z-index: 1;" }
    ]
  }
]
```
