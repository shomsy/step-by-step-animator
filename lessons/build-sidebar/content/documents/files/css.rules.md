# CSS Rule Blocks

```json
[
  {
    "header": ".app-shell {",
    "showFrom": "empty_shell",
    "entries": [
      { "from": "shell_outline", "untilBefore": "shell_summary", "line": "outline: 1px dashed #94a3b8;" },
      { "from": "shell_summary", "line": "/* helper outline removed in final .app-shell summary */" }
    ]
  },
  {
    "header": ".sidebar {",
    "showFrom": "sidebar_html",
    "entries": [
      { "from": "sidebar_outline", "untilBefore": "sidebar_summary", "line": "outline: 1px solid #ff4757;" },
      { "from": "sidebar_width", "line": "width: 280px;" },
      { "from": "sidebar_min_height", "line": "min-height: 100vh;" },
      { "from": "sidebar_border_right", "line": "border-right: 1px solid rgba(255,255,255,0.12);" },
      { "from": "sidebar_background", "line": "background: #0b1020;" },
      { "from": "sidebar_color", "line": "color: #edf2ff;" },
      { "from": "sidebar_display_flex", "line": "display: flex;" },
      { "from": "sidebar_flex_direction", "line": "flex-direction: column;" },
      { "from": "sidebar_summary", "line": "/* helper outline removed in final .sidebar summary */" }
    ]
  },
  {
    "header": ".sidebar-brand {",
    "showFrom": "brand_html",
    "entries": [
      { "from": "brand_outline", "untilBefore": "brand_summary", "line": "outline: 1px solid #2ed573;" },
      { "from": "brand_padding", "line": "padding: 24px;" },
      { "from": "brand_margin_bottom", "line": "margin-bottom: 28px;" },
      { "from": "brand_display", "line": "display: flex;" },
      { "from": "brand_align_items", "line": "align-items: center;" },
      { "from": "brand_gap", "line": "gap: 14px;" },
      { "from": "brand_summary", "line": "/* helper outline removed in final brand summary */" }
    ]
  },
  {
    "header": ".logo {",
    "showFrom": "logo_html",
    "entries": [
      { "from": "logo_outline", "untilBefore": "brand_summary", "line": "outline: 1px dotted #7dd3fc;" },
      { "from": "logo_width", "line": "width: 48px;" },
      { "from": "logo_height", "line": "height: 48px;" },
      { "from": "logo_display", "line": "display: grid;" },
      { "from": "logo_place_items", "line": "place-items: center;" },
      { "from": "logo_radius", "line": "border-radius: 12px;" },
      { "from": "logo_font_weight", "line": "font-weight: 800;" },
      { "from": "logo_background", "line": "background: linear-gradient(135deg, #6d73ff, #8f5cff);" },
      { "from": "logo_color", "line": "color: white;" },
      { "from": "logo_shadow", "line": "box-shadow: 0 12px 24px rgba(109,115,255,0.30);" },
      { "from": "brand_summary", "line": "/* logo helper outline removed in final brand summary */" }
    ]
  },
  {
    "header": ".brand-copy {",
    "showFrom": "brand_copy_html",
    "entries": [
      { "from": "brand_copy_outline", "untilBefore": "brand_summary", "line": "outline: 1px dashed #f59e0b;" },
      { "from": "brand_summary", "line": "/* brand-copy helper outline removed in final brand summary */" }
    ]
  },
  {
    "header": ".brand-copy strong {",
    "entries": [
      { "from": "brand_strong_display", "line": "display: block;" },
      { "from": "brand_strong_font_size", "line": "font-size: 16px;" }
    ]
  },
  {
    "header": ".brand-copy span {",
    "entries": [
      { "from": "brand_span_display", "line": "display: block;" },
      { "from": "brand_span_margin_top", "line": "margin-top: 4px;" },
      { "from": "brand_span_font_size", "line": "font-size: 13px;" },
      { "from": "brand_span_color", "line": "color: #9aa6c8;" }
    ]
  },
  {
    "header": ".nav-list {",
    "showFrom": "nav_html",
    "entries": [
      { "from": "nav_list_outline", "untilBefore": "navigation_summary", "line": "outline: 1px dashed #38bdf8;" },
      { "from": "nav_list_padding", "untilBefore": "navigation_summary", "line": "padding: 10px 8px;" },
      { "from": "nav_list_display", "line": "display: grid;" },
      { "from": "nav_list_gap", "line": "gap: 10px;" },
      { "from": "navigation_summary", "line": "/* nav wrapper helper outline removed in final navigation summary */" }
    ]
  },
  {
    "header": ".nav-item {",
    "showFrom": "nav_items_html",
    "entries": [
      { "from": "nav_item_outline", "untilBefore": "navigation_summary", "line": "outline: 1px solid #ffa502;" },
      { "from": "nav_item_display", "line": "display: flex;" },
      { "from": "nav_item_min_height", "line": "min-height: 52px;" },
      { "from": "nav_item_padding", "line": "padding: 12px 16px;" },
      { "from": "nav_item_align_items", "line": "align-items: center;" },
      { "from": "nav_item_gap", "line": "gap: 12px;" },
      { "from": "nav_item_radius", "line": "border-radius: 14px;" },
      { "from": "nav_item_margin", "line": "margin: 0 8px;" },
      { "from": "nav_item_transition", "line": "transition: all 0.4s ease;" },
      { "from": "navigation_summary", "line": "/* nav item helper outline removed in final navigation summary */" }
    ]
  },
  {
    "header": ".nav-item .icon {",
    "entries": [
      { "from": "nav_icon_outline", "untilBefore": "navigation_summary", "line": "outline: 1px dotted #7dd3fc;" },
      { "from": "nav_icon_width", "line": "width: 22px;" },
      { "from": "nav_icon_height", "line": "height: 22px;" },
      { "from": "nav_icon_display", "line": "display: grid;" },
      { "from": "nav_icon_place_items", "line": "place-items: center;" },
      { "from": "navigation_summary", "line": "/* nav icon helper outline removed in final navigation summary */" }
    ]
  },
  {
    "header": ".nav-item .label {",
    "entries": [
      { "from": "nav_label_font_size", "line": "font-size: 15px;" },
      { "from": "nav_label_font_weight", "line": "font-weight: 600;" }
    ]
  },
  {
    "header": ".nav-item.active {",
    "entries": [
      { "from": "nav_item_active_background", "line": "background: rgba(109,115,255,0.14);" },
      { "from": "nav_item_active_color", "line": "color: white;" }
    ]
  },
  {
    "header": ".nav-item:hover {",
    "entries": [
      { "from": "nav_item_hover_background", "line": "background: rgba(255,255,255,0.05);" }
    ]
  },
  {
    "header": ".sidebar.is-collapsed {",
    "entries": [
      { "from": "collapse_width", "line": "width: 108px;" }
    ]
  },
  {
    "header": [
      ".sidebar.is-collapsed .brand-copy,",
      ".sidebar.is-collapsed .nav-item .label {"
    ],
    "entries": [
      { "from": "hide_labels", "line": "display: none;" }
    ]
  },
  {
    "header": ".sidebar-footer {",
    "showFrom": "footer_html",
    "entries": [
      { "from": "footer_outline", "untilBefore": "footer_summary", "line": "outline: 1px dashed #c084fc;" },
      { "from": "footer_border", "line": "border: 1px solid rgba(255,255,255,0.12);" },
      { "from": "footer_background", "line": "background: rgba(255,255,255,0.05);" },
      { "from": "footer_padding", "line": "padding: 16px;" },
      { "from": "footer_radius", "line": "border-radius: 14px;" },
      { "from": "footer_margin_top", "line": "margin-top: auto;" },
      { "from": "footer_summary", "line": "/* footer helper outline removed in final footer summary */" }
    ]
  },
  {
    "header": ".sidebar-footer p {",
    "entries": [
      { "from": "footer_text_margin", "line": "margin: 6px 0 0;" },
      { "from": "footer_text_color", "line": "color: #9aa6c8;" },
      { "from": "footer_text_line_height", "line": "line-height: 1.5;" }
    ]
  },
  {
    "header": "@media (max-width: 980px) {",
    "entries": [
      { "from": "responsive_sidebar_min_height", "line": ".sidebar {" },
      { "from": "responsive_sidebar_min_height", "line": "  min-height: auto;" },
      { "from": "responsive_sidebar_min_height", "line": "}" }
    ]
  }
]
```
