---
title: Web Components 3/3 · Now Let's Clean The Mess
previewAddress: browser://clean-my-first-component-with-adopted-stylesheets-preview
previewTitle: Live adoptedStyleSheets preview
htmlFileName: index.html
cssFileName: style.css
jsFileName: my-first-component.js
shadowCssFileName: shadow-dom-style.css
---

Treća Web Components lekcija uzima isti feature callout i čisti njegov unutrašnji styling tok. Umesto da CSS bude zbijen u `<style>` unutar `template.innerHTML`, sada ga držiš u posebnom `shadow-dom-style.css` fajlu, JavaScript ga uvozi kao tekst, puni `CSSStyleSheet` kroz `replaceSync()` i usvaja preko `shadowRoot.adoptedStyleSheets`. Suština lekcije je da CSS može da bude odvojen i od class logike i od template markup-a, dok host API, slotovi i lifecycle ostaju isti.
