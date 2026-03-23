# JS Timeline

```json
[
  {
    "from": "class_declaration",
    "target": "root",
    "lines": [
      "class MyFirstComponent extends HTMLElement {",
      "  @@slot:class-body@@",
      "}",
      "",
      "@@slot:after-class@@"
    ]
  },
  {
    "from": "connected_callback",
    "target": "class-body",
    "lines": [
      "  connectedCallback() {",
      "    @@slot:connected-body@@",
      "  }"
    ]
  },
  {
    "from": "read_title_attribute",
    "target": "connected-body",
    "lines": [
      "    const title = this.getAttribute('title') || 'Naslov komponente';"
    ]
  },
  {
    "from": "read_cta_attribute",
    "target": "connected-body",
    "lines": [
      "    const ctaLabel = this.getAttribute('cta-label') || 'Saznaj više';"
    ]
  },
  {
    "from": "render_inner_html",
    "target": "connected-body",
    "lines": [
      "    this.innerHTML = `",
      "      <article class=\"card\">",
      "        <span class=\"eyebrow\">Custom element</span>",
      "        <strong class=\"title\">${title}</strong>",
      "        <p class=\"summary\">Light DOM verzija nam prvo objašnjava registraciju, atribut API i render bez shadow DOM sloja.</p>",
      "        <button class=\"cta\" type=\"button\">${ctaLabel}</button>",
      "      </article>",
      "    `;"
    ]
  },
  {
    "from": "define_element",
    "target": "after-class",
    "lines": [
      "customElements.define('my-first-component', MyFirstComponent);"
    ]
  }
]
```
