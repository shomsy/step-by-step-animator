# Template JS Timeline

```json
[
  {
    "from": "template_html_declaration",
    "target": "root",
    "lines": [
      "export const templateHtml = `",
      "  <article class=\"card\" part=\"card\">",
      "    <span class=\"eyebrow\" part=\"eyebrow\">",
      "      <slot name=\"eyebrow\">Web Components</slot>",
      "    </span>",
      "",
      "    <h2 class=\"title\" part=\"title\"></h2>",
      "",
      "    <p class=\"summary\" part=\"summary\">",
      "      <slot>Dodaj opis enterprise callout primitive-a kroz default slot.</slot>",
      "    </p>",
      "",
      "    <button class=\"cta\" part=\"cta\" type=\"button\"></button>",
      "  </article>",
      "`;",
      "",
      "@@slot:after-template-html@@"
    ]
  },
  {
    "from": "template_element_export",
    "target": "after-template-html",
    "lines": [
      "export const uiCalloutCardTemplate = document.createElement('template');",
      "uiCalloutCardTemplate.innerHTML = `",
      "  <link rel=\"stylesheet\" href=\"./ui-callout-card.shadow.css\" />",
      "  ${templateHtml}",
      "`;"
    ]
  }
]
```
