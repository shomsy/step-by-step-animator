# Shadow CSS Rule Blocks

```json
[
  {
    "header": ":host {",
    "showFrom": "shadow_host_font",
    "entries": [
      { "from": "shadow_host_font", "line": "display: block;" },
      { "from": "shadow_host_font_family", "line": "font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;" },
      { "from": "shadow_host_color", "line": "color: var(--callout-text, #e2e8f0);" }
    ]
  },
  {
    "header": ".card {",
    "showFrom": "card_outline",
    "entries": [
      { "from": "card_outline", "untilBefore": "card_summary", "line": "outline: 1px dashed #38bdf8;" },
      { "from": "card_display", "line": "display: grid;" },
      { "from": "card_gap", "line": "gap: 16px;" },
      { "from": "card_padding", "line": "padding: 24px;" },
      { "from": "card_radius", "line": "border-radius: 28px;" },
      { "from": "card_border", "line": "border: 1px solid var(--callout-border, rgba(148,163,184,0.24));" },
      { "from": "card_background", "line": "background: linear-gradient(180deg, var(--callout-surface, rgba(15,23,42,0.98)), var(--callout-surface-alt, rgba(15,23,42,0.92)));" },
      { "from": "card_shadow", "line": "box-shadow: var(--callout-shadow, 0 26px 60px rgba(15,23,42,0.24));" },
      { "from": "card_summary", "line": "/* helper outline removed in final .card summary */" }
    ]
  },
  {
    "header": ".eyebrow {",
    "showFrom": "eyebrow_outline",
    "entries": [
      { "from": "eyebrow_outline", "untilBefore": "eyebrow_summary", "line": "outline: 1px dotted #facc15;" },
      { "from": "eyebrow_display", "line": "display: inline-flex;" },
      { "from": "eyebrow_align_items", "line": "align-items: center;" },
      { "from": "eyebrow_justify_content", "line": "justify-content: center;" },
      { "from": "eyebrow_width", "line": "width: fit-content;" },
      { "from": "eyebrow_padding", "line": "padding: 8px 12px;" },
      { "from": "eyebrow_radius", "line": "border-radius: 999px;" },
      { "from": "eyebrow_background", "line": "background: rgba(56,189,248,0.14);" },
      { "from": "eyebrow_color", "line": "color: var(--callout-accent, #38bdf8);" },
      { "from": "eyebrow_font_size", "line": "font-size: 12px;" },
      { "from": "eyebrow_font_weight", "line": "font-weight: 700;" },
      { "from": "eyebrow_letter_spacing", "line": "letter-spacing: 0.04em;" },
      { "from": "eyebrow_text_transform", "line": "text-transform: uppercase;" },
      { "from": "eyebrow_summary", "line": "/* helper outline removed in final .eyebrow summary */" }
    ]
  },
  {
    "header": "::slotted([slot=\"eyebrow\"]) {",
    "showFrom": "eyebrow_slotted_font",
    "entries": [
      { "from": "eyebrow_slotted_font", "line": "font: inherit;" }
    ]
  },
  {
    "header": ".title {",
    "showFrom": "title_display",
    "entries": [
      { "from": "title_display", "line": "display: block;" },
      { "from": "title_margin", "line": "margin: 0;" },
      { "from": "title_font_size", "line": "font-size: clamp(1.75rem, 4vw, 2rem);" },
      { "from": "title_line_height", "line": "line-height: 1.1;" },
      { "from": "title_font_weight", "line": "font-weight: 800;" }
    ]
  },
  {
    "header": ".summary {",
    "showFrom": "summary_margin",
    "entries": [
      { "from": "summary_margin", "line": "margin: 0;" },
      { "from": "summary_color", "line": "color: var(--callout-muted, #cbd5e1);" },
      { "from": "summary_line_height", "line": "line-height: 1.65;" }
    ]
  },
  {
    "header": ".cta {",
    "showFrom": "cta_outline",
    "entries": [
      { "from": "cta_outline", "untilBefore": "cta_summary", "line": "outline: 1px dashed #34d399;" },
      { "from": "cta_justify_self", "line": "justify-self: start;" },
      { "from": "cta_appearance", "line": "appearance: none;" },
      { "from": "cta_padding", "line": "padding: 12px 16px;" },
      { "from": "cta_border", "line": "border: 0;" },
      { "from": "cta_radius", "line": "border-radius: 999px;" },
      { "from": "cta_background", "line": "background: linear-gradient(135deg, var(--callout-accent, #38bdf8), var(--callout-accent-strong, #2563eb));" },
      { "from": "cta_color", "line": "color: #ffffff;" },
      { "from": "cta_font", "line": "font: inherit;" },
      { "from": "cta_font_weight", "line": "font-weight: 700;" },
      { "from": "cta_cursor", "line": "cursor: pointer;" },
      { "from": "cta_transition", "line": "transition: transform 160ms ease, filter 160ms ease, box-shadow 160ms ease;" },
      { "from": "cta_box_shadow", "line": "box-shadow: 0 14px 30px rgba(37, 99, 235, 0.28);" },
      { "from": "cta_summary", "line": "/* helper outline removed in final .cta summary */" }
    ]
  },
  {
    "header": ".cta:hover {",
    "showFrom": "cta_hover_filter",
    "entries": [
      { "from": "cta_hover_filter", "line": "filter: brightness(1.06);" },
      { "from": "cta_hover_transform", "line": "transform: translateY(-1px);" }
    ]
  },
  {
    "header": ".cta:active {",
    "showFrom": "cta_active_transform",
    "entries": [
      { "from": "cta_active_transform", "line": "transform: translateY(0);" }
    ]
  },
  {
    "header": ".cta:focus-visible {",
    "showFrom": "cta_focus_outline",
    "entries": [
      { "from": "cta_focus_outline", "line": "outline: 3px solid rgba(56, 189, 248, 0.45);" },
      { "from": "cta_focus_outline_offset", "line": "outline-offset: 3px;" }
    ]
  },
  {
    "header": ".cta:disabled {",
    "showFrom": "cta_disabled_cursor",
    "entries": [
      { "from": "cta_disabled_cursor", "line": "cursor: not-allowed;" },
      { "from": "cta_disabled_opacity", "line": "opacity: 0.55;" },
      { "from": "cta_disabled_filter", "line": "filter: saturate(0.6);" },
      { "from": "cta_disabled_shadow", "line": "box-shadow: none;" }
    ]
  }
]
```
