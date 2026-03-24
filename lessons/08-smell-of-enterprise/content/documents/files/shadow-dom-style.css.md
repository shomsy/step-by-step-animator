# Shadow CSS Rule Blocks

```json
[
  {
    "header": ":host {",
    "showFrom": "shadow_host_display",
    "entries": [
      { "from": "shadow_host_display", "line": "display: block;" },
      { "from": "shadow_host_font_family", "line": "font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;" },
      { "from": "shadow_host_color", "line": "color: var(--pricing-text, #f1f5f9);" }
    ]
  },
  {
    "header": ".card {",
    "showFrom": "card_outline",
    "entries": [
      { "from": "card_outline", "untilBefore": "card_summary", "line": "outline: 1px dashed #38bdf8;" },
      { "from": "card_display", "line": "display: grid;" },
      { "from": "card_gap", "line": "gap: 20px;" },
      { "from": "card_padding", "line": "padding: 32px 28px;" },
      { "from": "card_radius", "line": "border-radius: 24px;" },
      { "from": "card_border", "line": "border: 1px solid var(--pricing-border, rgba(148,163,184,0.18));" },
      { "from": "card_background", "line": "background: linear-gradient(180deg, var(--pricing-surface, #1e293b), var(--pricing-surface-alt, rgba(15,23,42,0.92)));" },
      { "from": "card_shadow", "line": "box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15,23,42,0.4));" },
      { "from": "card_text_align", "line": "text-align: center;" },
      { "from": "card_summary", "line": "/* helper outline removed */" }
    ]
  },
  {
    "header": ".popular-badge {",
    "showFrom": "badge_outline",
    "entries": [
      { "from": "badge_outline", "untilBefore": "badge_summary", "line": "outline: 1px dotted #facc15;" },
      { "from": "badge_display", "line": "display: none;" },
      { "from": "badge_padding", "line": "padding: 6px 14px;" },
      { "from": "badge_radius", "line": "border-radius: 999px;" },
      { "from": "badge_background", "line": "background: linear-gradient(135deg, var(--pricing-accent, #38bdf8), var(--pricing-accent-strong, #2563eb));" },
      { "from": "badge_color", "line": "color: #ffffff;" },
      { "from": "badge_font_size", "line": "font-size: 12px;" },
      { "from": "badge_font_weight", "line": "font-weight: 700;" },
      { "from": "badge_letter_spacing", "line": "letter-spacing: 0.04em;" },
      { "from": "badge_text_transform", "line": "text-transform: uppercase;" },
      { "from": "badge_width", "line": "width: fit-content;" },
      { "from": "badge_justify_self", "line": "justify-self: center;" },
      { "from": "badge_summary", "line": "/* helper outline removed */" }
    ]
  },
  {
    "header": ":host([popular]) .popular-badge {",
    "showFrom": "badge_popular_display",
    "entries": [
      { "from": "badge_popular_display", "line": "display: inline-flex;" }
    ]
  },
  {
    "header": "::slotted([slot=\"badge\"]) {",
    "showFrom": "badge_slotted_font",
    "entries": [
      { "from": "badge_slotted_font", "line": "font: inherit;" }
    ]
  },
  {
    "header": ".tier-name {",
    "showFrom": "tier_name_margin",
    "entries": [
      { "from": "tier_name_margin", "line": "margin: 0;" },
      { "from": "tier_name_font_size", "line": "font-size: 18px;" },
      { "from": "tier_name_font_weight", "line": "font-weight: 700;" },
      { "from": "tier_name_text_transform", "line": "text-transform: uppercase;" },
      { "from": "tier_name_letter_spacing", "line": "letter-spacing: 0.08em;" },
      { "from": "tier_name_color", "line": "color: var(--pricing-accent, #38bdf8);" }
    ]
  },
  {
    "header": ".price-block {",
    "showFrom": "price_outline",
    "entries": [
      { "from": "price_outline", "untilBefore": "price_summary", "line": "outline: 1px dashed #a78bfa;" },
      { "from": "price_display", "line": "display: flex;" },
      { "from": "price_align", "line": "align-items: baseline;" },
      { "from": "price_justify", "line": "justify-content: center;" },
      { "from": "price_gap", "line": "gap: 4px;" },
      { "from": "price_summary", "line": "/* helper outline removed */" }
    ]
  },
  {
    "header": ".price-currency {",
    "showFrom": "price_currency_font_size",
    "entries": [
      { "from": "price_currency_font_size", "line": "font-size: 24px;" },
      { "from": "price_currency_font_weight", "line": "font-weight: 700;" },
      { "from": "price_currency_color", "line": "color: var(--pricing-muted, #94a3b8);" }
    ]
  },
  {
    "header": ".price-amount {",
    "showFrom": "price_amount_font_size",
    "entries": [
      { "from": "price_amount_font_size", "line": "font-size: 56px;" },
      { "from": "price_amount_font_weight", "line": "font-weight: 800;" },
      { "from": "price_amount_line_height", "line": "line-height: 1;" },
      { "from": "price_amount_transition", "line": "transition: transform 200ms ease;" }
    ]
  },
  {
    "header": ".price-period {",
    "showFrom": "price_period_font_size",
    "entries": [
      { "from": "price_period_font_size", "line": "font-size: 16px;" },
      { "from": "price_period_color", "line": "color: var(--pricing-muted, #94a3b8);" },
      { "from": "price_period_font_weight", "line": "font-weight: 500;" }
    ]
  },
  {
    "header": ".billing-toggle {",
    "showFrom": "toggle_outline",
    "entries": [
      { "from": "toggle_outline", "untilBefore": "toggle_summary", "line": "outline: 1px dotted #f472b6;" },
      { "from": "toggle_display", "line": "display: flex;" },
      { "from": "toggle_align", "line": "align-items: center;" },
      { "from": "toggle_justify", "line": "justify-content: center;" },
      { "from": "toggle_gap", "line": "gap: 10px;" },
      { "from": "toggle_summary", "line": "/* helper outline removed */" }
    ]
  },
  {
    "header": ".toggle-label {",
    "showFrom": "toggle_label_font_size",
    "entries": [
      { "from": "toggle_label_font_size", "line": "font-size: 13px;" },
      { "from": "toggle_label_color", "line": "color: var(--pricing-muted, #94a3b8);" },
      { "from": "toggle_label_font_weight", "line": "font-weight: 500;" },
      { "from": "toggle_label_transition", "line": "transition: color 180ms ease;" }
    ]
  },
  {
    "header": ".toggle-switch {",
    "showFrom": "toggle_switch_appearance",
    "entries": [
      { "from": "toggle_switch_appearance", "line": "appearance: none;" },
      { "from": "toggle_switch_width", "line": "width: 44px;" },
      { "from": "toggle_switch_height", "line": "height: 24px;" },
      { "from": "toggle_switch_radius", "line": "border-radius: 12px;" },
      { "from": "toggle_switch_border", "line": "border: 0;" },
      { "from": "toggle_switch_background", "line": "background: rgba(148,163,184,0.2);" },
      { "from": "toggle_switch_cursor", "line": "cursor: pointer;" },
      { "from": "toggle_switch_position", "line": "position: relative;" },
      { "from": "toggle_switch_padding", "line": "padding: 2px;" },
      { "from": "toggle_switch_transition", "line": "transition: background 180ms ease;" }
    ]
  },
  {
    "header": ".toggle-knob {",
    "showFrom": "toggle_knob_display",
    "entries": [
      { "from": "toggle_knob_display", "line": "display: block;" },
      { "from": "toggle_knob_width", "line": "width: 20px;" },
      { "from": "toggle_knob_height", "line": "height: 20px;" },
      { "from": "toggle_knob_radius", "line": "border-radius: 50%;" },
      { "from": "toggle_knob_background", "line": "background: #ffffff;" },
      { "from": "toggle_knob_transition", "line": "transition: transform 180ms ease;" }
    ]
  },
  {
    "header": ":host([billing=\"yearly\"]) .toggle-switch {",
    "showFrom": "toggle_yearly_bg",
    "entries": [
      { "from": "toggle_yearly_bg", "line": "background: var(--pricing-accent, #38bdf8);" }
    ]
  },
  {
    "header": ":host([billing=\"yearly\"]) .toggle-knob {",
    "showFrom": "toggle_yearly_knob",
    "entries": [
      { "from": "toggle_yearly_knob", "line": "transform: translateX(20px);" }
    ]
  },
  {
    "header": ".save-badge {",
    "showFrom": "save_badge_font_size",
    "entries": [
      { "from": "save_badge_font_size", "line": "font-size: 10px;" },
      { "from": "save_badge_background", "line": "background: rgba(34,197,94,0.2);" },
      { "from": "save_badge_color", "line": "color: #22c55e;" },
      { "from": "save_badge_padding", "line": "padding: 2px 6px;" },
      { "from": "save_badge_radius", "line": "border-radius: 4px;" },
      { "from": "save_badge_font_weight", "line": "font-weight: 700;" }
    ]
  },
  {
    "header": ".feature-list {",
    "showFrom": "features_outline",
    "entries": [
      { "from": "features_outline", "untilBefore": "features_summary", "line": "outline: 1px dashed #34d399;" },
      { "from": "features_padding", "line": "padding: 8px 0;" },
      { "from": "features_summary", "line": "/* helper outline removed */" }
    ]
  },
  {
    "header": "::slotted(ul) {",
    "showFrom": "features_slotted_list_style",
    "entries": [
      { "from": "features_slotted_list_style", "line": "list-style: none;" },
      { "from": "features_slotted_margin", "line": "margin: 0;" },
      { "from": "features_slotted_padding", "line": "padding: 0;" },
      { "from": "features_slotted_display", "line": "display: grid;" },
      { "from": "features_slotted_gap", "line": "gap: 12px;" },
      { "from": "features_slotted_text_align", "line": "text-align: left;" },
      { "from": "features_slotted_font_size", "line": "font-size: 14px;" },
      { "from": "features_slotted_color", "line": "color: var(--pricing-muted, #94a3b8);" }
    ]
  },
  {
    "header": ".cta {",
    "showFrom": "cta_outline",
    "entries": [
      { "from": "cta_outline", "untilBefore": "cta_summary", "line": "outline: 1px dashed #f97316;" },
      { "from": "cta_appearance", "line": "appearance: none;" },
      { "from": "cta_width", "line": "width: 100%;" },
      { "from": "cta_padding", "line": "padding: 14px 20px;" },
      { "from": "cta_border", "line": "border: 0;" },
      { "from": "cta_radius", "line": "border-radius: 14px;" },
      { "from": "cta_background", "line": "background: linear-gradient(135deg, var(--pricing-accent, #38bdf8), var(--pricing-accent-strong, #2563eb));" },
      { "from": "cta_color", "line": "color: #ffffff;" },
      { "from": "cta_font", "line": "font: inherit;" },
      { "from": "cta_font_size", "line": "font-size: 15px;" },
      { "from": "cta_font_weight", "line": "font-weight: 700;" },
      { "from": "cta_cursor", "line": "cursor: pointer;" },
      { "from": "cta_transition", "line": "transition: transform 160ms ease, filter 160ms ease, box-shadow 160ms ease;" },
      { "from": "cta_box_shadow", "line": "box-shadow: 0 12px 28px rgba(37,99,235,0.28);" },
      { "from": "cta_summary", "line": "/* helper outline removed */" }
    ]
  },
  {
    "header": ".cta:hover {",
    "showFrom": "cta_hover_filter",
    "entries": [
      { "from": "cta_hover_filter", "line": "filter: brightness(1.08);" },
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
      { "from": "cta_focus_outline", "line": "outline: 3px solid rgba(56,189,248,0.45);" },
      { "from": "cta_focus_outline_offset", "line": "outline-offset: 3px;" }
    ]
  },
  {
    "header": ".urgency {",
    "showFrom": "urgency_outline",
    "entries": [
      { "from": "urgency_outline", "untilBefore": "urgency_summary", "line": "outline: 1px dotted #fb923c;" },
      { "from": "urgency_display", "line": "display: flex;" },
      { "from": "urgency_align", "line": "align-items: center;" },
      { "from": "urgency_justify", "line": "justify-content: center;" },
      { "from": "urgency_gap", "line": "gap: 6px;" },
      { "from": "urgency_font_size", "line": "font-size: 12px;" },
      { "from": "urgency_color", "line": "color: #fb923c;" },
      { "from": "urgency_font_weight", "line": "font-weight: 600;" },
      { "from": "urgency_summary", "line": "/* helper outline removed */" }
    ]
  }
]
```
