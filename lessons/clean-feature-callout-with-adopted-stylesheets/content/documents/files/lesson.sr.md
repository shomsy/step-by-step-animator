---
title: Web Components 3/3 · Now Let's Clean The Mess
previewAddress: browser://clean-feature-callout-with-adopted-stylesheets-preview
previewTitle: Live adoptedStyleSheets preview
htmlFileName: index.html
cssFileName: style.css
jsFileName: feature-callout.js
---

Treća Web Components lekcija uzima isti feature callout i čisti njegov unutrašnji styling tok. Umesto da CSS bude zbijen u `<style>` unutar `template.innerHTML`, sada ga izdvajaš u `CSSStyleSheet`, puniš kroz `replaceSync()` i usvajaš preko `shadowRoot.adoptedStyleSheets`. Suština lekcije je da CSS može da bude odvojen od class logike i od template markup-a, dok host API, slotovi i lifecycle ostaju isti.
