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
      "  <my-first-component",
      "    title=\"Web Components u praksi\"",
      "    cta-label=\"Otvori lekciju\"",
      "  >",
      "    @@slot:my-first-component-content@@",
      "  </my-first-component>"
    ]
  },
  {
    "from": "eyebrow_slot_html",
    "target": "my-first-component-content",
    "lines": [
      "    <span slot=\"eyebrow\">Vanilla JS</span>"
    ]
  },
  {
    "from": "summary_text_html",
    "target": "my-first-component-content",
    "lines": [
      "    Gradiš custom element, shadow DOM i slot projekciju bez framework-a."
    ]
  }
]
```
