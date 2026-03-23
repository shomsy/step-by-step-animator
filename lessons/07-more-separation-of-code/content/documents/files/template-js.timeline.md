# Template JS Timeline

```json
[
  {
    "from": "template_html_declaration",
    "target": "root",
    "lines": [
      "const templateHtml = `",
      "  <article class=\"card\">",
      "    <span class=\"eyebrow\">",
      "      <slot name=\"eyebrow\">Vanilla JS</slot>",
      "    </span>",
      "",
      "    <h2 class=\"title\"></h2>",
      "",
      "    <p class=\"summary\">",
      "      <slot>Dodaj opis komponente kroz default slot.</slot>",
      "    </p>",
      "",
      "    <button class=\"cta\" type=\"button\"></button>",
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
      "export const featureCalloutTemplate = document.createElement('template');",
      "featureCalloutTemplate.innerHTML = templateHtml;"
    ]
  }
]
```
