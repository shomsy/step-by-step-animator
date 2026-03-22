<!-- Generated from the same markdown sources used by the web lesson. -->

# clean-feature-callout-with-adopted-stylesheets

Treća Web Components lekcija uzima isti feature callout i čisti njegov unutrašnji styling tok. Umesto da CSS bude zbijen u `<style>` unutar `template.innerHTML`, sada ga izdvajaš u `CSSStyleSheet`, puniš kroz `replaceSync()` i usvajaš preko `shadowRoot.adoptedStyleSheets`. Suština lekcije je da CSS može da bude odvojen od class logike i od template markup-a, dok host API, slotovi i lifecycle ostaju isti.
