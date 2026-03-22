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
    "header": "feature-callout {",
    "showFrom": "component_html",
    "entries": [
      { "from": "host_outline", "untilBefore": "host_summary", "line": "outline: 1px solid #f97316;" },
      { "from": "host_display", "line": "display: block;" },
      { "from": "host_width", "line": "width: min(100%, 420px);" },
      { "from": "host_surface_token", "line": "--callout-surface: #0f172a;" },
      { "from": "host_border_token", "line": "--callout-border: rgba(148,163,184,0.24);" },
      { "from": "host_accent_token", "line": "--callout-accent: #38bdf8;" },
      { "from": "host_text_token", "line": "--callout-text: #e2e8f0;" },
      { "from": "host_summary", "line": "/* helper outline removed in final feature-callout host summary */" }
    ]
  }
]
```
