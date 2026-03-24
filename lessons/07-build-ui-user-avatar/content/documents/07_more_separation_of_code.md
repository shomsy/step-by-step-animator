<!-- Generated from the same markdown sources used by the web lesson. -->

# 07-more-separation-of-code

Četvrta Web Components lekcija podiže separation of concerns na production-ready nivo. Template markup seli u sopstveni modul `component.html.js`, `my-first-component.js` ostaje čist behavior fajl sa lifecycle metodama `constructor`, `connectedCallback`, `disconnectedCallback`, `cacheDom()`, `bindEvents()`, `unbindEvents()` i `render()`, `shadow-dom-style.css` stilizuje samo unutrašnjost, a `style.css` ostaje host/theme sloj. Tokom lekcije stalno porediš staro i novo stanje: raniji template izlazi iz class fajla, host/theme CSS ostaje spolja, shadow CSS ostaje unutra, a `render()` više ne rebuild-uje ceo DOM nego samo patch-uje već keširane dinamične delove.
