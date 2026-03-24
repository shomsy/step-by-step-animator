# CSS Rule Blocks

```json
[
  {
    "header": ".app-shell {",
    "showFrom": "empty_shell",
    "entries": [
      { "from": "shell_outline", "untilBefore": "shell_summary", "line": "outline: 1px dashed #94a3b8;" },
      { "from": "shell_padding", "line": "padding: 48px 32px;" },
      { "from": "shell_display", "line": "display: grid;" },
      { "from": "shell_place_items", "line": "place-items: center;" },
      { "from": "shell_gap", "line": "gap: 24px;" },
      { "from": "shell_min_height", "line": "min-height: 100vh;" },
      { "from": "shell_background", "line": "background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);" },
      { "from": "shell_summary", "line": "/* helper outline removed */" }
    ]
  },
  {
    "header": "ui-user-avatar {",
    "showFrom": "component_html",
    "entries": [
      { "from": "host_outline", "untilBefore": "host_summary", "line": "outline: 1px solid #f97316;" },
      { "from": "host_display", "line": "display: inline-block;" },
      { "from": "host_position", "line": "position: relative;" },
      { "from": "host_cursor", "line": "cursor: pointer;" },
      { "from": "host_surface_token", "line": "--avatar-surface: #1e293b;" },
      { "from": "host_surface_alt_token", "line": "--avatar-surface-alt: #0f172a;" },
      { "from": "host_accent_token", "line": "--avatar-accent: #38bdf8;" },
      { "from": "host_text_token", "line": "--avatar-text: #f1f5f9;" },
      { "from": "host_muted_token", "line": "--avatar-muted: #94a3b8;" },
      { "from": "host_border_token", "line": "--avatar-border: rgba(148,163,184,0.2);" },
      { "from": "host_shadow_token", "line": "--avatar-shadow: 0 8px 32px rgba(15,23,42,0.48);" },
      { "from": "host_status_color_token", "line": "--avatar-status-color: #22c55e;" },
      { "from": "host_summary", "line": "/* helper outline removed */" }
    ]
  },
  {
    "header": "ui-user-avatar[status=\"online\"] {",
    "showFrom": "variant_online_status_color",
    "entries": [
      { "from": "variant_online_status_color", "line": "--avatar-status-color: #22c55e;" }
    ]
  },
  {
    "header": "ui-user-avatar[status=\"idle\"] {",
    "showFrom": "variant_idle_status_color",
    "entries": [
      { "from": "variant_idle_status_color", "line": "--avatar-status-color: #facc15;" }
    ]
  },
  {
    "header": "ui-user-avatar[status=\"away\"] {",
    "showFrom": "variant_away_status_color",
    "entries": [
      { "from": "variant_away_status_color", "line": "--avatar-status-color: #fb923c;" }
    ]
  },
  {
    "header": "ui-user-avatar[status=\"offline\"] {",
    "showFrom": "variant_offline_status_color",
    "entries": [
      { "from": "variant_offline_status_color", "line": "--avatar-status-color: #64748b;" }
    ]
  }
]
```
