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
      "  <feature-callout",
      "    title=\"Web Components u praksi\"",
      "    cta-label=\"Otvori lekciju\"",
      "  >",
      "    @@slot:feature-callout-content@@",
      "  </feature-callout>"
    ]
  },
  {
    "from": "eyebrow_slot_html",
    "target": "feature-callout-content",
    "lines": [
      "    <span slot=\"eyebrow\">Vanilla JS</span>"
    ]
  },
  {
    "from": "summary_text_html",
    "target": "feature-callout-content",
    "lines": [
      "    Gradiš custom element, shadow DOM i slot projekciju bez framework-a."
    ]
  }
]
```
