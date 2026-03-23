# CSS Rule Blocks

```json
[
  {
    "header": ".app-shell {",
    "showFrom": "empty_shell",
    "entries": [
      { "from": "shell_outline", "untilBefore": "shell_summary", "line": "outline: 1px dashed #94a3b8;" },
      { "from": "shell_padding", "line": "padding: 40px;" },
      { "from": "shell_background", "line": "background: #d6e1eb;" },
      { "from": "shell_min_height", "line": "min-height: 100vh;" },
      { "from": "shell_summary", "line": "/* helper outline removed in final .app-shell summary */" }
    ]
  },
  {
    "header": ".topbar {",
    "showFrom": "topbar_html",
    "entries": [
      { "from": "topbar_outline", "untilBefore": "topbar_summary", "line": "outline: 1px solid #ff5d8f;" },
      { "from": "topbar_padding", "line": "padding: 18px 28px;" },
      { "from": "topbar_background", "line": "background: #25262c;" },
      { "from": "topbar_border", "line": "border: 1px solid rgba(0,0,0,0.22);" },
      { "from": "topbar_shadow", "line": "box-shadow: 0 12px 24px rgba(0,0,0,0.18);" },
      { "from": "topbar_display", "line": "display: flex;" },
      { "from": "topbar_align_items", "line": "align-items: center;" },
      { "from": "topbar_justify_content", "line": "justify-content: space-between;" },
      { "from": "topbar_summary", "line": "/* helper outline removed in final .topbar summary */" }
    ]
  },
  {
    "header": ".topbar-logo {",
    "showFrom": "logo_html",
    "entries": [
      { "from": "logo_outline", "untilBefore": "logo_summary", "line": "outline: 1px dashed #fbbf24;" },
      { "from": "logo_color", "line": "color: #ffffff;" },
      { "from": "logo_font_size", "line": "font-size: 18px;" },
      { "from": "logo_font_weight", "line": "font-weight: 800;" },
      { "from": "logo_letter_spacing", "line": "letter-spacing: 0.04em;" },
      { "from": "logo_text_decoration", "line": "text-decoration: none;" },
      { "from": "logo_summary", "line": "/* helper outline removed in final .topbar-logo summary */" }
    ]
  },
  {
    "header": ".topbar-links {",
    "showFrom": "nav_html",
    "entries": [
      { "from": "nav_outline", "untilBefore": "navigation_summary", "line": "outline: 1px dashed #38bdf8;" },
      { "from": "nav_display", "line": "display: flex;" },
      { "from": "nav_gap", "line": "gap: 36px;" },
      { "from": "nav_margin_left", "line": "margin-left: auto;" },
      { "from": "nav_margin_right", "line": "margin-right: auto;" },
      { "from": "navigation_summary", "line": "/* helper outline removed in final .topbar-links summary */" }
    ]
  },
  {
    "header": ".topbar-links a {",
    "entries": [
      { "from": "nav_link_outline", "untilBefore": "navigation_summary", "line": "outline: 1px dotted #fde68a;" },
      { "from": "nav_link_color", "line": "color: #ffffff;" },
      { "from": "nav_link_font_size", "line": "font-size: 15px;" },
      { "from": "nav_link_text_decoration", "line": "text-decoration: none;" },
      { "from": "nav_link_transition", "line": "transition: color 0.3s ease;" },
      { "from": "navigation_summary", "line": "/* link helper outline removed in final navigation summary */" }
    ]
  },
  {
    "header": ".topbar-links a:hover {",
    "entries": [
      { "from": "nav_link_hover_color", "line": "color: #cbd5e1;" }
    ]
  },
  {
    "header": ".topbar-cta {",
    "showFrom": "cta_html",
    "entries": [
      { "from": "cta_outline", "untilBefore": "cta_summary", "line": "outline: 1px dashed #11a4d3;" },
      { "from": "cta_display", "line": "display: inline-flex;" },
      { "from": "cta_align_items", "line": "align-items: center;" },
      { "from": "cta_padding", "line": "padding: 12px 28px;" },
      { "from": "cta_radius", "line": "border-radius: 999px;" },
      { "from": "cta_background", "line": "background: #11a4d3;" },
      { "from": "cta_color", "line": "color: #ffffff;" },
      { "from": "cta_text_decoration", "line": "text-decoration: none;" },
      { "from": "cta_shadow", "line": "box-shadow: 0 10px 20px rgba(17,164,211,0.28);" },
      { "from": "cta_summary", "line": "/* helper outline removed in final .topbar-cta summary */" }
    ]
  }
]
```
