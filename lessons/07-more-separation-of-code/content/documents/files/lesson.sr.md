---
title: "07 · More Separation Of Code"
previewAddress: browser://07-more-separation-of-code-preview
previewTitle: Live modular Web Component preview
htmlFileName: index.html
cssFileName: style.css
jsFileName: my-first-component.js
templateJsFileName: component.html.js
shadowCssFileName: shadow-dom-style.css
---

Četvrta Web Components lekcija nastavlja čišćenje Feature Callout komponente. Sada i template markup seli u sopstveni modul `component.html.js`, pa `my-first-component.js` samo uvozi gotov template element. Svaki fajl ima jednu jasnu odgovornost: HTML opisuje host stranicu, `component.html.js` čuva shadow DOM markup, `my-first-component.js` vodi lifecycle i ponašanje, `shadow-dom-style.css` stilizuje unutrašnjost, a `style.css` theme-uje host spolja.
