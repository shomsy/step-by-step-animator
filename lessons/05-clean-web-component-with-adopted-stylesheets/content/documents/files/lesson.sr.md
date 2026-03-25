---
title: 05 · Web Components 3/3 · Now Let's Clean The Mess
previewAddress: browser://05-clean-web-component-with-adopted-stylesheets-preview
previewTitle: Live adoptedStyleSheets preview
htmlFileName: index.html
cssFileName: style.css
jsFileName: my-first-component.js
shadowCssFileName: shadow-dom-style.css
---

The third Web Components lesson takes the same my first component and cleans its internal styling flow. Instead of CSS being crammed into `<style>` within `template.innerHTML`, you now keep it in a separate `shadow-dom-style.css` file, JavaScript imports it as text, fills `CSSStyleSheet` via `replaceSync()` and adopts it via `shadowRoot.adoptedStyleSheets`. The essence of the lesson is that CSS can be separated from both class logic and template markup, while host API, slots and lifecycle remain the same.
