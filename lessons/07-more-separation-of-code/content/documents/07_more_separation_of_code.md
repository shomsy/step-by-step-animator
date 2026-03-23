<!-- Generated from the same markdown sources used by the web lesson. -->

# 07-more-separation-of-code

Četvrta Web Components lekcija nastavlja čišćenje My First Component komponente. Sada i template markup seli u sopstveni modul `component.html.js`, pa `my-first-component.js` samo uvozi gotov template element. Svaki fajl ima jednu jasnu odgovornost: HTML opisuje host stranicu, `component.html.js` čuva shadow DOM markup, `my-first-component.js` vodi lifecycle i ponašanje, `shadow-dom-style.css` stilizuje unutrašnjost, a `style.css` theme-uje host spolja.
