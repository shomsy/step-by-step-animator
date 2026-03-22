<!-- Generated from the same markdown sources used by the web lesson. -->

# build-callout-custom-element

Prva Web Components lekcija namerno kreće bez shadow DOM-a. Tako prvo vidiš samu osnovu platforme: custom tag sa crticom, registraciju preko `customElements.define`, atribute kao spoljašnji API i prvi render kroz `connectedCallback()`. Tek posle toga prelazimo na shadow DOM, template i slotove.

## Quiz

## Question 1
? Koja je glavna ideja ove prve Web Components lekcije?
- [ ] Da odmah sakrijemo sve iza shadow DOM-a
- [x] Da prvo razjasnimo host tag, registraciju i atribute kroz light DOM
- [ ] Da izbegnemo JavaScript potpuno
- [ ] Da radimo samo CSS
! Light DOM uvodna lekcija ostavlja sve vidljivim da bi custom element osnove bile potpuno jasne.

## Question 2
? Šta radi `customElements.define('callout-card', CalloutCard)`?
- [ ] Briše host element iz DOM-a
- [x] Registruje custom element i govori browseru koju klasu koristi za dati tag
- [ ] Menja CSS temu stranice
- [ ] Dodaje shadow DOM automatski
! `customElements.define()` povezuje custom tag ime i klasu, pa browser zna kako da upgrade-uje taj element.

## Question 3
? Zašto u ovoj lekciji čitamo `title` i `cta-label` atribute sa host elementa?
- [ ] Da bismo izbegli HTML
- [x] Da atributi postanu jednostavan spoljašnji API komponente
- [ ] Da bismo sakrili CSS
- [ ] Da bismo uklonili render
! Atributi su najjednostavniji prvi API za custom element: lako ih pišeš u HTML-u i lako ih čitaš u klasi.

## Question 4
? Zašto koristimo `connectedCallback()` za prvi render?
- [ ] Zato što custom element tada još nije u DOM-u
- [x] Zato što je to prirodan lifecycle trenutak kada je element povezan sa dokumentom
- [ ] Zato što jedino tamo CSS radi
- [ ] Zato što je to zamena za `template`
! `connectedCallback()` je zgodna ulazna tačka za prvi render čim browser ubaci element u dokument.

## Question 5
? Šta ćemo sledeće dodati u drugoj Web Components lekciji?
- [ ] jQuery plugin sistem
- [ ] server-side rendering
- [x] shadow DOM, template i slotove
- [ ] CSS framework
! Druga lekcija gradi isti nivo komponente, ali uvodi pravu Web Components dubinu kroz shadow DOM, template i slot projekciju.
