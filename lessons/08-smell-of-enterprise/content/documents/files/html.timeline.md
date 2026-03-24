# HTML Timeline

```json
[
  {
    "from": "empty_shell",
    "target": "root",
    "lines": [
      "<div class=\"app-shell\">",
      "  @@slot:app-shell-content@@",
      "</div>"
    ]
  },
  {
    "from": "component_html",
    "target": "app-shell-content",
    "lines": [
      "  <ui-callout-card",
      "    title=\"Smell of Enterprise\"",
      "    cta-label=\"Open contract\"",
      "    @@slot:ui-callout-card-attributes@@",
      "  >",
      "    @@slot:ui-callout-card-content@@",
      "  </ui-callout-card>"
    ]
  },
  {
    "from": "eyebrow_slot_html",
    "target": "ui-callout-card-content",
    "lines": [
      "    <span slot=\"eyebrow\">Web Components</span>"
    ]
  },
  {
    "from": "summary_text_html",
    "target": "ui-callout-card-content",
    "lines": [
      "    Stable API, precise updates and clear styling boundaries for real teams."
    ]
  },
  {
    "from": "variant_attribute_html",
    "target": "ui-callout-card-attributes",
    "lines": [
      "variant=\"success\""
    ]
  }
]
```
