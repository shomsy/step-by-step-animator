<!-- Generated from the same markdown sources used by the web lesson. -->

# 08-smell-of-enterprise

Peta Web Components lekcija podiže istu ideju iz prethodnih koraka na nivo reusable UI primitive-a koji već miriše na enterprise. Host HTML ostaje mali, ali komponenta više nije samo demo: tag i class dobijaju domain-driven ime `ui-callout-card`, template markup ostaje u `ui-callout-card.template.js`, `ui-callout-card.js` preuzima stabilan public API kroz attributes i properties, `style.css` ostaje host/theme sloj, a `ui-callout-card.shadow.css` drži unutrašnji styling contract.

Najvažniji teaching fokus ove lekcije su četiri enterprise signala: jasan public API, precizno i usko update ponašanje kroz `attributeChangedCallback(name, oldValue, newValue)`, stabilan event contract i nameran styling contract preko custom properties, `part` atributa i state/variant pravila. Suština nije da komponenta postane veća, nego da postane predvidiva za druge timove, testove i integracije.
