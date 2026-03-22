<!-- Generated from the same markdown sources used by the web lesson. -->

# build-top-navigation

Koraci po korak gradiš prvi navbar iz reference: logo levo, linkovi u sredini i CTA dugme desno. Druga dva rasporeda iz iste slike ostaju kao domaći zadatak.

## Quiz

## Question 1
? Koji HTML element je prirodan izbor za grupu glavnih navigacionih linkova?
- [ ] `<section>`
- [x] `<nav>`
- [ ] `<article>`
- [ ] `<aside>`
! `nav` je semantički pravi izbor za glavnu navigacionu zonu.

## Question 2
? Zašto uvodimo helper outline pre završne pozadine?
- [ ] Da bi element bio teži za klik
- [x] Da bi footprint elementa bio jasan i pre finalnog dizajna
- [ ] Da bi CSS bio kraći
- [ ] Da bismo izbegli HTML
! Helper outline služi orijentaciji dok komponenta još nema svoj završni vizuelni identitet.

## Question 3
? Koji property koristimo da rasporedimo delove navbara u jedan red?
- [ ] `display: block`
- [ ] `display: inline`
- [x] `display: flex`
- [ ] `display: grid`
! `display: flex` je najpraktičniji izbor za horizontalni navbar raspored.

## Question 4
? Šta radi `margin-left: auto` na centralnoj grupi linkova u ovom primeru?
- [ ] Smanjuje font-size linkova
- [x] Gura grupu dalje od loga i pomaže centriranju
- [ ] Dodaje hover efekat
- [ ] Zaobljava CTA dugme
! Auto margine su jednostavan način da gurneš jedan flex item od susednog elementa.

## Question 5
? Koji property daje CTA dugmetu pil oblik?
- [ ] `box-shadow`
- [ ] `padding`
- [x] `border-radius`
- [ ] `font-weight`
! Veliki `border-radius`, kao `999px`, zatvara CTA u pil oblik.
