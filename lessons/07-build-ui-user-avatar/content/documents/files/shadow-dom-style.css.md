# Shadow CSS Rule Blocks

```json
[
  {
    "header": ":host {",
    "showFrom": "shadow_host_display",
    "entries": [
      { "from": "shadow_host_display", "line": "display: inline-block;" },
      { "from": "shadow_host_font_family", "line": "font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;" },
      { "from": "shadow_host_color", "line": "color: var(--avatar-text, #f1f5f9);" }
    ]
  },
  {
    "header": ".avatar-container {",
    "showFrom": "container_outline",
    "entries": [
      { "from": "container_outline", "untilBefore": "container_summary", "line": "outline: 1px dashed #38bdf8;" },
      { "from": "container_position", "line": "position: relative;" },
      { "from": "container_display", "line": "display: inline-flex;" },
      { "from": "container_direction", "line": "flex-direction: column;" },
      { "from": "container_align", "line": "align-items: center;" },
      { "from": "container_gap", "line": "gap: 8px;" },
      { "from": "container_summary", "line": "/* helper outline removed */" }
    ]
  },
  {
    "header": ".avatar-image {",
    "showFrom": "image_outline",
    "entries": [
      { "from": "image_outline", "untilBefore": "image_summary", "line": "outline: 1px dashed #a78bfa;" },
      { "from": "image_position", "line": "position: relative;" },
      { "from": "image_width", "line": "width: 72px;" },
      { "from": "image_height", "line": "height: 72px;" },
      { "from": "image_radius", "line": "border-radius: 50%;" },
      { "from": "image_background", "line": "background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);" },
      { "from": "image_border", "line": "border: 2px solid var(--avatar-border, rgba(148,163,184,0.2));" },
      { "from": "image_shadow", "line": "box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15,23,42,0.48));" },
      { "from": "image_display", "line": "display: flex;" },
      { "from": "image_align", "line": "align-items: center;" },
      { "from": "image_justify", "line": "justify-content: center;" },
      { "from": "image_overflow", "line": "overflow: hidden;" },
      { "from": "image_transition", "line": "transition: transform 180ms ease, box-shadow 180ms ease;" },
      { "from": "image_summary", "line": "/* helper outline removed */" }
    ]
  },
  {
    "header": ".avatar-image:hover {",
    "showFrom": "image_hover_transform",
    "entries": [
      { "from": "image_hover_transform", "line": "transform: scale(1.05);" },
      { "from": "image_hover_shadow", "line": "box-shadow: 0 12px 40px rgba(56,189,248,0.28);" }
    ]
  },
  {
    "header": "::slotted([slot=\"initials\"]) {",
    "showFrom": "initials_font_size",
    "entries": [
      { "from": "initials_font_size", "line": "font-size: 24px;" },
      { "from": "initials_font_weight", "line": "font-weight: 800;" },
      { "from": "initials_color", "line": "color: #ffffff;" },
      { "from": "initials_letter_spacing", "line": "letter-spacing: 0.04em;" },
      { "from": "initials_select", "line": "user-select: none;" }
    ]
  },
  {
    "header": ".status-badge {",
    "showFrom": "status_outline",
    "entries": [
      { "from": "status_outline", "untilBefore": "status_summary", "line": "outline: 1px dotted #facc15;" },
      { "from": "status_position", "line": "position: absolute;" },
      { "from": "status_bottom", "line": "bottom: 2px;" },
      { "from": "status_right", "line": "right: 2px;" },
      { "from": "status_width", "line": "width: 16px;" },
      { "from": "status_height", "line": "height: 16px;" },
      { "from": "status_radius", "line": "border-radius: 50%;" },
      { "from": "status_background", "line": "background: var(--avatar-status-color, #22c55e);" },
      { "from": "status_border", "line": "border: 2px solid var(--avatar-surface, #1e293b);" },
      { "from": "status_transition", "line": "transition: background 240ms ease;" },
      { "from": "status_summary", "line": "/* helper outline removed */" }
    ]
  },
  {
    "header": ".avatar-info {",
    "showFrom": "info_outline",
    "entries": [
      { "from": "info_outline", "untilBefore": "info_summary", "line": "outline: 1px dashed #34d399;" },
      { "from": "info_display", "line": "display: flex;" },
      { "from": "info_direction", "line": "flex-direction: column;" },
      { "from": "info_align", "line": "align-items: center;" },
      { "from": "info_gap", "line": "gap: 2px;" },
      { "from": "info_summary", "line": "/* helper outline removed */" }
    ]
  },
  {
    "header": ".username {",
    "showFrom": "username_font_size",
    "entries": [
      { "from": "username_font_size", "line": "font-size: 14px;" },
      { "from": "username_font_weight", "line": "font-weight: 700;" },
      { "from": "username_color", "line": "color: var(--avatar-text, #f1f5f9);" },
      { "from": "username_white_space", "line": "white-space: nowrap;" }
    ]
  },
  {
    "header": ".role {",
    "showFrom": "role_font_size",
    "entries": [
      { "from": "role_font_size", "line": "font-size: 11px;" },
      { "from": "role_font_weight", "line": "font-weight: 500;" },
      { "from": "role_color", "line": "color: var(--avatar-muted, #94a3b8);" },
      { "from": "role_text_transform", "line": "text-transform: uppercase;" },
      { "from": "role_letter_spacing", "line": "letter-spacing: 0.06em;" },
      { "from": "role_white_space", "line": "white-space: nowrap;" }
    ]
  },
  {
    "header": ".tooltip {",
    "showFrom": "tooltip_outline",
    "entries": [
      { "from": "tooltip_outline", "untilBefore": "tooltip_summary", "line": "outline: 1px dotted #f472b6;" },
      { "from": "tooltip_position", "line": "position: absolute;" },
      { "from": "tooltip_bottom", "line": "bottom: calc(100% + 10px);" },
      { "from": "tooltip_left", "line": "left: 50%;" },
      { "from": "tooltip_transform", "line": "transform: translateX(-50%);" },
      { "from": "tooltip_background", "line": "background: #0f172a;" },
      { "from": "tooltip_border", "line": "border: 1px solid var(--avatar-border, rgba(148,163,184,0.2));" },
      { "from": "tooltip_color", "line": "color: var(--avatar-text, #f1f5f9);" },
      { "from": "tooltip_padding", "line": "padding: 8px 12px;" },
      { "from": "tooltip_radius", "line": "border-radius: 8px;" },
      { "from": "tooltip_font_size", "line": "font-size: 12px;" },
      { "from": "tooltip_white_space", "line": "white-space: nowrap;" },
      { "from": "tooltip_pointer_events", "line": "pointer-events: none;" },
      { "from": "tooltip_opacity_start", "line": "opacity: 0;" },
      { "from": "tooltip_transition", "line": "transition: opacity 180ms ease, transform 180ms ease;" },
      { "from": "tooltip_z_index", "line": "z-index: 10;" },
      { "from": "tooltip_summary", "line": "/* helper outline removed */" }
    ]
  },
  {
    "header": ":host(:hover) .tooltip, :host(:focus-within) .tooltip {",
    "showFrom": "tooltip_hover_opacity",
    "entries": [
      { "from": "tooltip_hover_opacity", "line": "opacity: 1;" },
      { "from": "tooltip_hover_transform", "line": "transform: translateX(-50%) translateY(-4px);" }
    ]
  },
  {
    "header": ":host(:focus-visible) {",
    "showFrom": "host_focus_outline",
    "entries": [
      { "from": "host_focus_outline", "line": "outline: 3px solid rgba(56,189,248,0.55);" },
      { "from": "host_focus_outline_offset", "line": "outline-offset: 4px;" },
      { "from": "host_focus_radius", "line": "border-radius: 50%;" }
    ]
  }
]
```
