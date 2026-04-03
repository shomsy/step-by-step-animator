---
schemaVersion: 1
lessonId: 05-clean-web-component-with-adopted-stylesheets
lessonTitle: 05 · Web Components 3/3 · Now Let's Clean The Mess
lessonIntro: 'Treća Web Components lekcija prvo zadržava isti vidljivi card rezultat kao vizuelnu fazu, a tek onda čisti stilsku priču komponente kao logičku fazu: CSS više ne živi ni u template markup-u ni u velikom JS string-u, nego u posebnom shadow CSS fajlu koji JavaScript uvozi kao tekst i usvaja preko adoptedStyleSheets.'
status: active
courseId: step-by-step-animator
order: 5
theory:
  enabled: false
artifacts:
  - artifactId: html
    language: html
    label: index.html
    isPrimary: true
  - artifactId: css
    language: css
    label: style.css
    isPrimary: false
  - artifactId: js
    language: js
    label: my-first-component.js
    isPrimary: false
  - artifactId: shadow-css
    language: css
    label: shadow-dom-style.css
    isPrimary: false
preview:
  type: dom
  title: Live adoptedStyleSheets preview
  address: browser://05-clean-web-component-with-adopted-stylesheets-preview
goal:
  title: Šta gradimo u ovoj lekciji
  imageSrc: ./assets/web-component-goal.svg
  imageAlt: Referentna slika tamnog my first component card Web Component-a na svetloj pozadini, sa badge oznakom, velikim naslovom, opisom i CTA dugmetom.
  imageCaption: Prvo ostaje isti vidljivi card, a tek onda CSS prelazi u poseban `shadow-dom-style.css` sloj koji shadow root usvaja.
---

# Step: empty-shell

title: "Start: Empty App Shell"
summary: Počinjemo od praznog `.app-shell` prostora. Goal slika iznad pokazuje istu komponentu, ali sada je cilj da očistimo način na koji njeni stilovi žive pored JavaScript logike.
intent: Neutralan početak odvaja postojeći page shell od komponente koju tek gradimo.
tag: html:app-shell
proTip: Neutralan početak odvaja postojeći page shell od komponente koju tek gradimo.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: empty-shell-scene

### Narration

Počinjemo od praznog `.app-shell` prostora. Goal slika iznad pokazuje istu komponentu, ali sada je cilj da očistimo način na koji njeni stilovi žive pored JavaScript logike.

### Show Code: html

```html
<div class="app-shell"></div>
```

### Show Code: css

```css
.app-shell {
}
```

# Step: component-html

title: "HTML: My First Component Host"
summary: Dodajemo `<my-first-component>` host sa `title` i `cta-label` atributima. Host API ostaje isti; menja se samo način na koji komponenta organizuje sopstveni CSS.
intent: Naziv custom elementa mora da sadrži crticu. To je osnovno pravilo registracije custom elementa.
tag: html:my-first-component
proTip: Naziv custom elementa mora da sadrži crticu. To je osnovno pravilo registracije custom elementa.
focusHtmlNeedles:

- <my-first-component

## Scene: component-html-scene

### Narration

Dodajemo `<my-first-component>` host sa `title` i `cta-label` atributima. Host API ostaje isti; menja se samo način na koji komponenta organizuje sopstveni CSS.

### Show Code: html

```html
<div class="app-shell">
  <my-first-component title="Web Components u praksi" cta-label="Otvori lekciju">
  </my-first-component>
</div>
```

### Show Code: css

```css
.app-shell {
}

my-first-component {
}
```

# Step: eyebrow-slot-html

title: "HTML: Named Slot Content"
summary: U host ubacujemo `<span slot="eyebrow">Vanilla JS</span>`. Light DOM sadržaj ostaje isti i u ovoj čistijoj verziji komponente.
intent: Named slot je i dalje najjednostavniji način da spolja projiciraš mali, ciljani deo sadržaja u komponentu.
tag: html:slot-eyebrow
proTip: Named slot je i dalje najjednostavniji način da spolja projiciraš mali, ciljani deo sadržaja u komponentu.
focusHtmlNeedles:

- slot="eyebrow"
- <my-first-component

## Scene: eyebrow-slot-html-scene

### Narration

U host ubacujemo `<span slot="eyebrow">Vanilla JS</span>`. Light DOM sadržaj ostaje isti i u ovoj čistijoj verziji komponente.

### Show Code: html

```html
<div class="app-shell">
  <my-first-component title="Web Components u praksi" cta-label="Otvori lekciju">
    <span slot="eyebrow">Vanilla JS</span>
  </my-first-component>
</div>
```

# Step: summary-text-html

title: "HTML: Default Slot Text"
summary: Dodajemo opisni tekst kao default slot sadržaj. Čišćenje stila ne menja slot logiku; menja samo gde CSS živi.
intent: "Ovo je važna poenta: refactor styling pristupa ne bi trebalo da razbije HTML API komponente."
tag: html:default-slot
proTip: "Ovo je važna poenta: refactor styling pristupa ne bi trebalo da razbije HTML API komponente."
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: summary-text-html-scene

### Narration

Dodajemo opisni tekst kao default slot sadržaj. Čišćenje stila ne menja slot logiku; menja samo gde CSS živi.

### Show Code: html

```html
<div class="app-shell">
  <my-first-component title="Web Components u praksi" cta-label="Otvori lekciju">
    <span slot="eyebrow">Vanilla JS</span>
    Gradiš custom element, shadow DOM i slot projekciju bez framework-a.
  </my-first-component>
</div>
```

# Step: template-declaration

title: "JS: Template Sada Čuva Samo Markup"
summary: Kreiramo `document.createElement('template')`, ali ovoga puta template više nije zadužen i za stilove. Čuvamo ga samo za shadow DOM markup.
intent: Kada template više ne nosi i markup i CSS zajedno, komponenta postaje čitljivija i lakša za održavanje.
tag: js:template-declaration
proTip: Kada template više ne nosi i markup i CSS zajedno, komponenta postaje čitljivija i lakša za održavanje.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: template-declaration-scene

### Narration

Kreiramo `document.createElement('template')`, ali ovoga puta template više nije zadužen i za stilove. Čuvamo ga samo za shadow DOM markup.

### Show Code: js

```js
const myFirstComponentTemplate = document.createElement('template');
```

# Step: cleanup-intro

title: Now Let's Clean The Mess
summary: "Ovde pravimo glavni refactor: CSS više ne guramo u `<style>` unutar `template.innerHTML`, niti ga držimo kao veliki inline string u JavaScript fajlu. Prebacujemo ga u poseban `shadow-dom-style.css` koji komponenta kasnije samo usvoji."
intent: Suština ovog koraka je da CSS može da bude odvojen i od class logike i od template markup-a, umesto da sve bude zbijeno u jedan veliki string.
tag: js:cleanup-intro
proTip: Suština ovog koraka je da CSS može da bude odvojen i od class logike i od template markup-a, umesto da sve bude zbijeno u jedan veliki string.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: cleanup-intro-scene

### Narration

Ovde pravimo glavni refactor: CSS više ne guramo u `<style>` unutar `template.innerHTML`, niti ga držimo kao veliki inline string u JavaScript fajlu. Prebacujemo ga u poseban `shadow-dom-style.css` koji komponenta kasnije samo usvoji.

### Show Code: js

```js
const myFirstComponentTemplate = document.createElement('template');
```

# Step: shadow-css-import

title: "JS: Uvozimo shadow-dom-style.css kao tekst"
summary: Dodajemo `import shadowDomStyleCssText from './shadow-dom-style.css?raw';`, pa JavaScript više ne nosi same CSS linije nego samo učitava gotov stylesheet source.
intent: "Ovo je najčistiji Vite-friendly model za ovu lekciju: CSS fizički živi u svom fajlu, a komponenta ga samo pretvara u `CSSStyleSheet`."
tag: js:shadow-css-import
proTip: "Ovo je najčistiji Vite-friendly model za ovu lekciju: CSS fizički živi u svom fajlu, a komponenta ga samo pretvara u `CSSStyleSheet`."
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: shadow-css-import-scene

### Narration

Dodajemo `import shadowDomStyleCssText from './shadow-dom-style.css?raw';`, pa JavaScript više ne nosi same CSS linije nego samo učitava gotov stylesheet source.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');
```

# Step: stylesheet-declaration

title: "JS: Kreiramo CSSStyleSheet"
summary: Dodajemo `new CSSStyleSheet()` i otvaramo poseban objekat koji će čuvati CSS komponente van same klase.
intent: To je prvi konkretan signal da stil više nije spakovan zajedno sa markup-om u jednom template bloku.
tag: js:stylesheet-declaration
proTip: To je prvi konkretan signal da stil više nije spakovan zajedno sa markup-om u jednom template bloku.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: stylesheet-declaration-scene

### Narration

Dodajemo `new CSSStyleSheet()` i otvaramo poseban objekat koji će čuvati CSS komponente van same klase.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();
```

# Step: stylesheet-replace-sync

title: "JS: replaceSync Prima Uvezeni CSS"
summary: Kroz `myFirstComponentStyles.replaceSync(shadowDomStyleCssText)` punimo constructed stylesheet tekstom koji stiže iz posebnog CSS fajla. JavaScript više ne nosi stil pravila u sebi.
intent: "Ovo je najvažniji mentalni model cele lekcije: CSS je izdvojen u poseban fajl, a JavaScript ga samo povezuje sa shadow root-om."
tag: js:stylesheet-replace-sync
proTip: "Ovo je najvažniji mentalni model cele lekcije: CSS je izdvojen u poseban fajl, a JavaScript ga samo povezuje sa shadow root-om."
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: stylesheet-replace-sync-scene

### Narration

Kroz `myFirstComponentStyles.replaceSync(shadowDomStyleCssText)` punimo constructed stylesheet tekstom koji stiže iz posebnog CSS fajla. JavaScript više ne nosi stil pravila u sebi.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);
```

# Step: template-markup-open

title: "JS: Template Markup Bez <style>"
summary: Sada otvaramo `template.innerHTML = \`` i ubacujemo samo card markup. Nema više embedded `<style>` bloka u template string-u.
intent: Kad neko otvori template, vidi isključivo strukturu DOM-a. To je mnogo čistiji signal odgovornosti.
tag: js:template-markup-open
proTip: Kad neko otvori template, vidi isključivo strukturu DOM-a. To je mnogo čistiji signal odgovornosti.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: template-markup-open-scene

### Narration

Sada otvaramo `template.innerHTML = \`` i ubacujemo samo card markup. Nema više embedded `<style>` bloka u template string-u.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
`;
```

# Step: card-markup

title: "JS: Dodajemo Shadow DOM Markup"
summary: U template ubacujemo card wrapper, named slot za eyebrow, semantički `h2` naslov, paragraf sa default slotom, CTA dugme i `part` atribute za kasniji escape hatch.
intent: Template sada stvarno priča samo markup priču.
tag: js:card-markup
proTip: Template sada stvarno priča samo markup priču.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: card-markup-scene

### Narration

U template ubacujemo card wrapper, named slot za eyebrow, semantički `h2` naslov, paragraf sa default slotom, CTA dugme i `part` atribute za kasniji escape hatch.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;
```

# Step: class-declaration

title: "JS: Class Extends HTMLElement"
summary: Otvaramo `class MyFirstComponent extends HTMLElement`. Time browseru kažemo da naš custom element ima sopstveno ponašanje.
intent: Custom element je i dalje običan DOM element, samo sa tvojom klasom i tvojim lifecycle ponašanjem.
tag: js:class-declaration
proTip: Custom element je i dalje običan DOM element, samo sa tvojom klasom i tvojim lifecycle ponašanjem.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: class-declaration-scene

### Narration

Otvaramo `class MyFirstComponent extends HTMLElement`. Time browseru kažemo da naš custom element ima sopstveno ponašanje.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {}
```

# Step: constructor-shadow

title: "JS: constructor + attachShadow"
summary: "U konstruktoru pozivamo `super()` i odmah otvaramo `const shadowRoot = this.attachShadow({ mode: 'open' })` da komponenta dobije sopstveni shadow root."
intent: "Shadow root je granica komponente: markup i adopted stylesheet žive iza nje."
tag: js:constructor-shadow
proTip: "Shadow root je granica komponente: markup i adopted stylesheet žive iza nje."
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: constructor-shadow-scene

### Narration

U konstruktoru pozivamo `super()` i odmah otvaramo `const shadowRoot = this.attachShadow({ mode: 'open' })` da komponenta dobije sopstveni shadow root.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
  }
}
```

# Step: constructor-clone

title: "JS: Kloniramo Template"
summary: Dodajemo `appendChild(myFirstComponentTemplate.content.cloneNode(true))`, pa svaka instanca komponente dobija isti početni shadow DOM skeleton.
intent: Kloniranje template-a je najčistiji način da jednu definiciju koristiš u više instanci.
tag: js:constructor-clone
proTip: Kloniranje template-a je najčistiji način da jednu definiciju koristiš u više instanci.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: constructor-clone-scene

### Narration

Dodajemo `appendChild(myFirstComponentTemplate.content.cloneNode(true))`, pa svaka instanca komponente dobija isti početni shadow DOM skeleton.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
  }
}
```

# Step: constructor-adopt-stylesheet

title: "JS: Shadow Root Usvaja Stylesheet"
summary: Dodajemo `shadowRoot.adoptedStyleSheets = [myFirstComponentStyles]`, pa shadow root dobija stil bez ubacivanja `<style>` taga u template.
intent: "Ovo je trenutak kada čisti separation stvarno proradi: stylesheet je izdvojen, a shadow root ga samo preuzima."
tag: js:constructor-adopt-stylesheet
proTip: "Ovo je trenutak kada čisti separation stvarno proradi: stylesheet je izdvojen, a shadow root ga samo preuzima."
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: constructor-adopt-stylesheet-scene

### Narration

Dodajemo `shadowRoot.adoptedStyleSheets = [myFirstComponentStyles]`, pa shadow root dobija stil bez ubacivanja `<style>` taga u template.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [myFirstComponentStyles];
  }
}
```

# Step: constructor-cache-title

title: "JS: Keširamo Title Element"
summary: U konstruktoru čuvamo referencu na `.title` element, da ga kasnije ne tražimo iznova pri svakom renderu.
intent: Mali cache DOM referenci drži render jasan i predvidiv.
tag: js:constructor-cache-title
proTip: Mali cache DOM referenci drži render jasan i predvidiv.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: constructor-cache-title-scene

### Narration

U konstruktoru čuvamo referencu na `.title` element, da ga kasnije ne tražimo iznova pri svakom renderu.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [myFirstComponentStyles];
    this.titleElement = shadowRoot.querySelector('.title');
  }
}
```

# Step: constructor-cache-cta

title: "JS: Keširamo CTA Element"
summary: Na isti način čuvamo referencu na `.cta`, jer će tekst dugmeta stizati iz atributa host elementa.
intent: Render treba da govori šta menja, ne da svaki put iznova objašnjava kako traži iste čvorove.
tag: js:constructor-cache-cta
proTip: Render treba da govori šta menja, ne da svaki put iznova objašnjava kako traži iste čvorove.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: constructor-cache-cta-scene

### Narration

Na isti način čuvamo referencu na `.cta`, jer će tekst dugmeta stizati iz atributa host elementa.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [myFirstComponentStyles];
    this.titleElement = shadowRoot.querySelector('.title');
    this.ctaElement = shadowRoot.querySelector('.cta');
  }
}
```

# Step: constructor-bind-click

title: "JS: Bindujemo CTA Handler"
summary: U konstruktoru vezujemo `this.handleClick = this.handleClick.bind(this)`, da isti handler može bezbedno da se koristi i za add i za remove listener.
intent: Ako komponenta ima cleanup, stabilna referenca handlera više nije optional polish nego deo korektnog lifecycle ponašanja.
tag: js:constructor-bind-click
proTip: Ako komponenta ima cleanup, stabilna referenca handlera više nije optional polish nego deo korektnog lifecycle ponašanja.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: constructor-bind-click-scene

### Narration

U konstruktoru vezujemo `this.handleClick = this.handleClick.bind(this)`, da isti handler može bezbedno da se koristi i za add i za remove listener.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [myFirstComponentStyles];
    this.titleElement = shadowRoot.querySelector('.title');
    this.ctaElement = shadowRoot.querySelector('.cta');
    this.handleClick = this.handleClick.bind(this);
  }
}
```

# Step: render-declaration

title: "JS: Uvodimo render()"
summary: Dodajemo `render()` metodu kao jedno mesto gde atributi host elementa prelaze u konkretan UI tekst unutar shadow DOM-a.
intent: Jedan render ulaz čini komponentu lakšom za kasnije promene i objašnjenja.
tag: js:render-declaration
proTip: Jedan render ulaz čini komponentu lakšom za kasnije promene i objašnjenja.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: render-declaration-scene

### Narration

Dodajemo `render()` metodu kao jedno mesto gde atributi host elementa prelaze u konkretan UI tekst unutar shadow DOM-a.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [myFirstComponentStyles];
    this.titleElement = shadowRoot.querySelector('.title');
    this.ctaElement = shadowRoot.querySelector('.cta');
    this.handleClick = this.handleClick.bind(this);
  }

  render() {}
}
```

# Step: render-title

title: "JS: render() Popunjava Title"
summary: U `render()` čitamo `title` atribut i upisujemo ga u `.title` element. Time host atribut postaje stvaran UI sadržaj u komponenti.
intent: Atributi su spoljašnji API komponente; render je mesto gde taj API dobija vizuelni rezultat.
tag: js:render-title
proTip: Atributi su spoljašnji API komponente; render je mesto gde taj API dobija vizuelni rezultat.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: render-title-scene

### Narration

U `render()` čitamo `title` atribut i upisujemo ga u `.title` element. Time host atribut postaje stvaran UI sadržaj u komponenti.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [myFirstComponentStyles];
    this.titleElement = shadowRoot.querySelector('.title');
    this.ctaElement = shadowRoot.querySelector('.cta');
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    this.titleElement.textContent = this.getAttribute('title') || 'Naslov komponente';
  }
}
```

# Step: render-cta

title: "JS: render() Popunjava CTA"
summary: Na isti način `cta-label` atribut pretvaramo u tekst CTA dugmeta.
intent: Kad dve stvari rade istu vrstu posla, drži ih u istom render toku.
tag: js:render-cta
proTip: Kad dve stvari rade istu vrstu posla, drži ih u istom render toku.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: render-cta-scene

### Narration

Na isti način `cta-label` atribut pretvaramo u tekst CTA dugmeta.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [myFirstComponentStyles];
    this.titleElement = shadowRoot.querySelector('.title');
    this.ctaElement = shadowRoot.querySelector('.cta');
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    this.titleElement.textContent = this.getAttribute('title') || 'Naslov komponente';
    this.ctaElement.textContent = this.getAttribute('cta-label') || 'Saznaj više';
  }
}
```

# Step: connected-callback

title: "JS: connectedCallback Lifecycle"
summary: Dodajemo `connectedCallback()` kao mesto gde komponenta obavlja prvi render i povezuje runtime ponašanje.
intent: Kada komponenta pređe iz statičnog prikaza u živi UI, connectedCallback postaje prirodan lifecycle ulaz.
tag: js:connected-callback
proTip: Kada komponenta pređe iz statičnog prikaza u živi UI, connectedCallback postaje prirodan lifecycle ulaz.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: connected-callback-scene

### Narration

Dodajemo `connectedCallback()` kao mesto gde komponenta obavlja prvi render i povezuje runtime ponašanje.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [myFirstComponentStyles];
    this.titleElement = shadowRoot.querySelector('.title');
    this.ctaElement = shadowRoot.querySelector('.cta');
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    this.titleElement.textContent = this.getAttribute('title') || 'Naslov komponente';
    this.ctaElement.textContent = this.getAttribute('cta-label') || 'Saznaj više';
  }

  connectedCallback() {}
}
```

# Step: connected-callback-render

title: "JS: connectedCallback Pokreće Prvi Render"
summary: U `connectedCallback()` pozivamo `this.render()`, pa komponenta dobija sadržaj čim uđe u DOM.
intent: Prvi render je prirodno vezati za trenutak kada je element stvarno povezan sa dokumentom.
tag: js:connected-callback-render
proTip: Prvi render je prirodno vezati za trenutak kada je element stvarno povezan sa dokumentom.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: connected-callback-render-scene

### Narration

U `connectedCallback()` pozivamo `this.render()`, pa komponenta dobija sadržaj čim uđe u DOM.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [myFirstComponentStyles];
    this.titleElement = shadowRoot.querySelector('.title');
    this.ctaElement = shadowRoot.querySelector('.cta');
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    this.titleElement.textContent = this.getAttribute('title') || 'Naslov komponente';
    this.ctaElement.textContent = this.getAttribute('cta-label') || 'Saznaj više';
  }

  connectedCallback() {
    this.render();
  }
}
```

# Step: connected-callback-listener

title: "JS: connectedCallback Vezuje Click Listener"
summary: U istom lifecycle koraku vezujemo click listener na CTA dugme, pa komponenta više ne samo prikazuje UI nego i emituje akciju.
intent: Tek ovde komponenta postaje i interaktivna, ne samo vizuelno renderovana.
tag: js:connected-callback-listener
proTip: Tek ovde komponenta postaje i interaktivna, ne samo vizuelno renderovana.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: connected-callback-listener-scene

### Narration

U istom lifecycle koraku vezujemo click listener na CTA dugme, pa komponenta više ne samo prikazuje UI nego i emituje akciju.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [myFirstComponentStyles];
    this.titleElement = shadowRoot.querySelector('.title');
    this.ctaElement = shadowRoot.querySelector('.cta');
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    this.titleElement.textContent = this.getAttribute('title') || 'Naslov komponente';
    this.ctaElement.textContent = this.getAttribute('cta-label') || 'Saznaj više';
  }

  connectedCallback() {
    this.render();
    this.ctaElement.addEventListener('click', this.handleClick);
  }
}
```

# Step: disconnected-callback

title: "JS: disconnectedCallback Cleanup"
summary: Dodajemo `disconnectedCallback()` i skidamo CTA listener kada komponenta izađe iz DOM-a.
intent: Cleanup je pravi production-grade signal da komponenta poštuje ceo lifecycle, ne samo mount.
tag: js:disconnected-callback
proTip: Cleanup je pravi production-grade signal da komponenta poštuje ceo lifecycle, ne samo mount.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: disconnected-callback-scene

### Narration

Dodajemo `disconnectedCallback()` i skidamo CTA listener kada komponenta izađe iz DOM-a.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [myFirstComponentStyles];
    this.titleElement = shadowRoot.querySelector('.title');
    this.ctaElement = shadowRoot.querySelector('.cta');
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    this.titleElement.textContent = this.getAttribute('title') || 'Naslov komponente';
    this.ctaElement.textContent = this.getAttribute('cta-label') || 'Saznaj više';
  }

  connectedCallback() {
    this.render();
    this.ctaElement.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.ctaElement.removeEventListener('click', this.handleClick);
  }
}
```

# Step: observed-attributes

title: "JS: observedAttributes"
summary: Dodajemo `static observedAttributes = ['title', 'cta-label']`, pa browser zna koje promene atributa treba da javi komponenti.
intent: Ako komponenta treba da reaguje na promenu atributa, prvo mora eksplicitno da kaže koje atribute prati.
tag: js:observed-attributes
proTip: Ako komponenta treba da reaguje na promenu atributa, prvo mora eksplicitno da kaže koje atribute prati.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: observed-attributes-scene

### Narration

Dodajemo `static observedAttributes = ['title', 'cta-label']`, pa browser zna koje promene atributa treba da javi komponenti.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  static observedAttributes = ['title', 'cta-label'];

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [myFirstComponentStyles];
    this.titleElement = shadowRoot.querySelector('.title');
    this.ctaElement = shadowRoot.querySelector('.cta');
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    this.titleElement.textContent = this.getAttribute('title') || 'Naslov komponente';
    this.ctaElement.textContent = this.getAttribute('cta-label') || 'Saznaj više';
  }

  connectedCallback() {
    this.render();
    this.ctaElement.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.ctaElement.removeEventListener('click', this.handleClick);
  }
}
```

# Step: attribute-changed-callback

title: "JS: attributeChangedCallback"
summary: Dodajemo `attributeChangedCallback()` sa guard-om za `isConnected`, pa render radimo samo kada komponenta zaista živi u DOM-u.
intent: "To je mali, ali važan robustness detalj: lifecycle više nije samo ispravan, nego i disciplinovan."
tag: js:attribute-changed-callback
proTip: "To je mali, ali važan robustness detalj: lifecycle više nije samo ispravan, nego i disciplinovan."
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: attribute-changed-callback-scene

### Narration

Dodajemo `attributeChangedCallback()` sa guard-om za `isConnected`, pa render radimo samo kada komponenta zaista živi u DOM-u.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  static observedAttributes = ['title', 'cta-label'];

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [myFirstComponentStyles];
    this.titleElement = shadowRoot.querySelector('.title');
    this.ctaElement = shadowRoot.querySelector('.cta');
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    this.titleElement.textContent = this.getAttribute('title') || 'Naslov komponente';
    this.ctaElement.textContent = this.getAttribute('cta-label') || 'Saznaj više';
  }

  connectedCallback() {
    this.render();
    this.ctaElement.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.ctaElement.removeEventListener('click', this.handleClick);
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }
}
```

# Step: handle-click-dispatch-event

title: "JS: CTA Emituje component-action"
summary: Dodajemo `handleClick()` i iz njega emitujemo `CustomEvent('component-action', ...)`, pa komponenta dobija jasan izlazni signal.
intent: "Komponenta time dobija izlazni API: ne prima samo atribute, nego i javlja korisničku akciju spolja."
tag: js:handle-click-dispatch-event
proTip: "Komponenta time dobija izlazni API: ne prima samo atribute, nego i javlja korisničku akciju spolja."
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: handle-click-dispatch-event-scene

### Narration

Dodajemo `handleClick()` i iz njega emitujemo `CustomEvent('component-action', ...)`, pa komponenta dobija jasan izlazni signal.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  static observedAttributes = ['title', 'cta-label'];

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [myFirstComponentStyles];
    this.titleElement = shadowRoot.querySelector('.title');
    this.ctaElement = shadowRoot.querySelector('.cta');
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    this.titleElement.textContent = this.getAttribute('title') || 'Naslov komponente';
    this.ctaElement.textContent = this.getAttribute('cta-label') || 'Saznaj više';
  }

  connectedCallback() {
    this.render();
    this.ctaElement.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.ctaElement.removeEventListener('click', this.handleClick);
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  handleClick() {
    this.dispatchEvent(
      new CustomEvent('component-action', {
        bubbles: true,
        composed: true,
        detail: {
          title: this.getAttribute('title') || 'Naslov komponente',
          ctaLabel: this.getAttribute('cta-label') || 'Saznaj više',
        },
      })
    );
  }
}
```

# Step: define-guard

title: "JS: Čuvamo se duplog define-a"
summary: Pre registracije proveravamo `customElements.get('my-first-component')`, da isti custom element ne pokušamo da definišemo dva puta.
intent: Ovo nije samo defensive code; u okruženjima sa hot reload-om ili više mount ciklusa to je praktično obavezna zaštita.
tag: js:define-guard
proTip: Ovo nije samo defensive code; u okruženjima sa hot reload-om ili više mount ciklusa to je praktično obavezna zaštita.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: define-guard-scene

### Narration

Pre registracije proveravamo `customElements.get('my-first-component')`, da isti custom element ne pokušamo da definišemo dva puta.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  static observedAttributes = ['title', 'cta-label'];

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [myFirstComponentStyles];
    this.titleElement = shadowRoot.querySelector('.title');
    this.ctaElement = shadowRoot.querySelector('.cta');
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    this.titleElement.textContent = this.getAttribute('title') || 'Naslov komponente';
    this.ctaElement.textContent = this.getAttribute('cta-label') || 'Saznaj više';
  }

  connectedCallback() {
    this.render();
    this.ctaElement.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.ctaElement.removeEventListener('click', this.handleClick);
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  handleClick() {
    this.dispatchEvent(
      new CustomEvent('component-action', {
        bubbles: true,
        composed: true,
        detail: {
          title: this.getAttribute('title') || 'Naslov komponente',
          ctaLabel: this.getAttribute('cta-label') || 'Saznaj više',
        },
      })
    );
  }
}

if (!customElements.get('my-first-component')) {
}
```

# Step: define-element

title: "JS: Registrujemo Custom Element"
summary: Unutar guard-a pozivamo `customElements.define('my-first-component', MyFirstComponent)`. Od ovog trenutka browser zna kako da upgrade-uje `<my-first-component>` u pravu komponentu i preview dobija render bez style taga u template-u.
intent: "Sada je i struktura koda čistija: template čuva markup, stylesheet čuva CSS, a klasa orkestrira ponašanje."
tag: js:define-element
proTip: "Sada je i struktura koda čistija: template čuva markup, stylesheet čuva CSS, a klasa orkestrira ponašanje."
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: define-element-scene

### Narration

Unutar guard-a pozivamo `customElements.define('my-first-component', MyFirstComponent)`. Od ovog trenutka browser zna kako da upgrade-uje `<my-first-component>` u pravu komponentu i preview dobija render bez style taga u template-u.

### Show Code: js

```js
import shadowDomStyleCssText from './shadow-dom-style.css?raw';

const myFirstComponentTemplate = document.createElement('template');

const myFirstComponentStyles = new CSSStyleSheet();

myFirstComponentStyles.replaceSync(shadowDomStyleCssText);

myFirstComponentTemplate.innerHTML = `
  <article class="card" part="card">
    <span class="eyebrow" part="eyebrow">
      <slot name="eyebrow">Vanilla JS</slot>
    </span>

    <h2 class="title" part="title"></h2>

    <p class="summary" part="summary">
      <slot>Dodaj opis komponente kroz default slot.</slot>
    </p>

    <button class="cta" part="cta" type="button"></button>
  </article>
`;

class MyFirstComponent extends HTMLElement {
  static observedAttributes = ['title', 'cta-label'];

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(myFirstComponentTemplate.content.cloneNode(true));
    shadowRoot.adoptedStyleSheets = [myFirstComponentStyles];
    this.titleElement = shadowRoot.querySelector('.title');
    this.ctaElement = shadowRoot.querySelector('.cta');
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    this.titleElement.textContent = this.getAttribute('title') || 'Naslov komponente';
    this.ctaElement.textContent = this.getAttribute('cta-label') || 'Saznaj više';
  }

  connectedCallback() {
    this.render();
    this.ctaElement.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.ctaElement.removeEventListener('click', this.handleClick);
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  handleClick() {
    this.dispatchEvent(
      new CustomEvent('component-action', {
        bubbles: true,
        composed: true,
        detail: {
          title: this.getAttribute('title') || 'Naslov komponente',
          ctaLabel: this.getAttribute('cta-label') || 'Saznaj više',
        },
      })
    );
  }
}

if (!customElements.get('my-first-component')) {
  customElements.define('my-first-component', MyFirstComponent);
}
```

# Step: shell-outline

title: "CSS: .app-shell / outline"
summary: Dodajemo tanak helper outline za `.app-shell` i zadržavamo ga kroz celu lekciju, sve do završnog shell rezimea.
intent: App shell ostaje stalni okvir cele demonstracije dok ne završimo ceo tutorijal.
tag: css:shell-outline
proTip: App shell ostaje stalni okvir cele demonstracije dok ne završimo ceo tutorijal.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-outline-scene

### Narration

Dodajemo tanak helper outline za `.app-shell` i zadržavamo ga kroz celu lekciju, sve do završnog shell rezimea.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

my-first-component {
}
```

# Step: shell-padding

title: "CSS: .app-shell / padding"
summary: Dodajemo padding da komponenta dobije vazduh čim se pojavi u preview-u.
intent: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
tag: css:shell-padding
proTip: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-padding-scene

### Narration

Dodajemo padding da komponenta dobije vazduh čim se pojavi u preview-u.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
}

my-first-component {
}
```

# Step: shell-display

title: "CSS: .app-shell / display"
summary: Grid je jednostavan način da centralno postavimo jedan teaching target.
intent: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
tag: css:shell-display
proTip: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-display-scene

### Narration

Grid je jednostavan način da centralno postavimo jedan teaching target.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
}

my-first-component {
}
```

# Step: shell-place-items

title: "CSS: .app-shell / place-items"
summary: Centar zadržava fokus korisnika na jednoj komponenti.
intent: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
tag: css:shell-place-items
proTip: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-place-items-scene

### Narration

Centar zadržava fokus korisnika na jednoj komponenti.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
}

my-first-component {
}
```

# Step: shell-min-height

title: "CSS: .app-shell / min-height"
summary: Puna visina drži scenu stabilnom kroz celu lekciju.
intent: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
tag: css:shell-min-height
proTip: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-min-height-scene

### Narration

Puna visina drži scenu stabilnom kroz celu lekciju.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
}

my-first-component {
}
```

# Step: shell-background

title: "CSS: .app-shell / background"
summary: Svetla pozadina daje kontrast tamnoj komponenti koju gradimo.
intent: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
tag: css:shell-background
proTip: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-background-scene

### Narration

Svetla pozadina daje kontrast tamnoj komponenti koju gradimo.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

my-first-component {
}
```

# Step: host-outline

title: "CSS: my-first-component / outline"
summary: Dodajemo tanak helper outline za host element i držimo ga do završnog host rezimea.
intent: Host i dalje ostaje spoljašnji API komponente, čak i kada unutrašnji CSS više ne živi u template string-u.
tag: css:host-outline
proTip: Host i dalje ostaje spoljašnji API komponente, čak i kada unutrašnji CSS više ne živi u template string-u.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: host-outline-scene

### Narration

Dodajemo tanak helper outline za host element i držimo ga do završnog host rezimea.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

my-first-component {
  outline: 1px solid #f97316;
}
```

# Step: host-display

title: "CSS: my-first-component / display"
summary: Host pretvaramo u block da zauzme svoj red i dobije realan footprint.
intent: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
tag: css:host-display
proTip: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: host-display-scene

### Narration

Host pretvaramo u block da zauzme svoj red i dobije realan footprint.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

my-first-component {
  outline: 1px solid #f97316;
  display: block;
}
```

# Step: host-width

title: "CSS: my-first-component / width"
summary: Širinu zaključavamo rano da card skeleton ne šeta po sceni.
intent: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
tag: css:host-width
proTip: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: host-width-scene

### Narration

Širinu zaključavamo rano da card skeleton ne šeta po sceni.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

my-first-component {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 420px);
}
```

# Step: host-surface-token

title: "CSS: my-first-component / --callout-surface"
summary: Spolja uvodimo surface token koji adopted stylesheet kasnije povlači kroz `var(...)`.
intent: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
tag: css:host-surface-token
proTip: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: host-surface-token-scene

### Narration

Spolja uvodimo surface token koji adopted stylesheet kasnije povlači kroz `var(...)`.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

my-first-component {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 420px);
  --callout-surface: #0f172a;
}
```

# Step: host-surface-alt-token

title: "CSS: my-first-component / --callout-surface-alt"
summary: Dodajemo i drugi surface ton da unutrašnji gradijent ne zavisi od hardkodovanog fallback-a.
intent: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
tag: css:host-surface-alt-token
proTip: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: host-surface-alt-token-scene

### Narration

Dodajemo i drugi surface ton da unutrašnji gradijent ne zavisi od hardkodovanog fallback-a.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

my-first-component {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 420px);
  --callout-surface: #0f172a;
  --callout-surface-alt: rgba(15, 23, 42, 0.92);
}
```

# Step: host-border-token

title: "CSS: my-first-component / --callout-border"
summary: Border token služi da spolja theme-ujemo ivicu komponente.
intent: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
tag: css:host-border-token
proTip: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: host-border-token-scene

### Narration

Border token služi da spolja theme-ujemo ivicu komponente.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

my-first-component {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 420px);
  --callout-surface: #0f172a;
  --callout-surface-alt: rgba(15, 23, 42, 0.92);
  --callout-border: rgba(148, 163, 184, 0.24);
}
```

# Step: host-accent-token

title: "CSS: my-first-component / --callout-accent"
summary: Accent token će obojiti badge i CTA unutar komponente.
intent: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
tag: css:host-accent-token
proTip: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: host-accent-token-scene

### Narration

Accent token će obojiti badge i CTA unutar komponente.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

my-first-component {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 420px);
  --callout-surface: #0f172a;
  --callout-surface-alt: rgba(15, 23, 42, 0.92);
  --callout-border: rgba(148, 163, 184, 0.24);
  --callout-accent: #38bdf8;
}
```

# Step: host-accent-strong-token

title: "CSS: my-first-component / --callout-accent-strong"
summary: Jači accent ton služi za dublji kraj CTA gradijenta.
intent: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
tag: css:host-accent-strong-token
proTip: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: host-accent-strong-token-scene

### Narration

Jači accent ton služi za dublji kraj CTA gradijenta.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

my-first-component {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 420px);
  --callout-surface: #0f172a;
  --callout-surface-alt: rgba(15, 23, 42, 0.92);
  --callout-border: rgba(148, 163, 184, 0.24);
  --callout-accent: #38bdf8;
  --callout-accent-strong: #2563eb;
}
```

# Step: host-text-token

title: "CSS: my-first-component / --callout-text"
summary: Text token daje konzistentnu boju celom Web Component sadržaju.
intent: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
tag: css:host-text-token
proTip: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: host-text-token-scene

### Narration

Text token daje konzistentnu boju celom Web Component sadržaju.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

my-first-component {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 420px);
  --callout-surface: #0f172a;
  --callout-surface-alt: rgba(15, 23, 42, 0.92);
  --callout-border: rgba(148, 163, 184, 0.24);
  --callout-accent: #38bdf8;
  --callout-accent-strong: #2563eb;
  --callout-text: #e2e8f0;
}
```

# Step: host-muted-token

title: "CSS: my-first-component / --callout-muted"
summary: Muted token služi sekundarnom tekstu unutar komponente.
intent: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
tag: css:host-muted-token
proTip: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: host-muted-token-scene

### Narration

Muted token služi sekundarnom tekstu unutar komponente.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

my-first-component {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 420px);
  --callout-surface: #0f172a;
  --callout-surface-alt: rgba(15, 23, 42, 0.92);
  --callout-border: rgba(148, 163, 184, 0.24);
  --callout-accent: #38bdf8;
  --callout-accent-strong: #2563eb;
  --callout-text: #e2e8f0;
  --callout-muted: #cbd5e1;
}
```

# Step: host-shadow-token

title: "CSS: my-first-component / --callout-shadow"
summary: Shadow token prebacuje i dubinu komponente u spoljašnji theme sloj.
intent: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
tag: css:host-shadow-token
proTip: Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: host-shadow-token-scene

### Narration

Shadow token prebacuje i dubinu komponente u spoljašnji theme sloj.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

my-first-component {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 420px);
  --callout-surface: #0f172a;
  --callout-surface-alt: rgba(15, 23, 42, 0.92);
  --callout-border: rgba(148, 163, 184, 0.24);
  --callout-accent: #38bdf8;
  --callout-accent-strong: #2563eb;
  --callout-text: #e2e8f0;
  --callout-muted: #cbd5e1;
  --callout-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}
```

# Step: host-font

title: "Shadow CSS: :host / font-family"
summary: "Počinje constructed stylesheet: host dobija isti font stack kao i ostatak scene."
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:host-font
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: host-font-scene

### Narration

Počinje constructed stylesheet: host dobija isti font stack kao i ostatak scene.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}
```

# Step: host-color

title: "Shadow CSS: :host / color"
summary: Host odmah koristi spoljašnji text token, pa vidiš kako custom property prolazi kroz granicu shadow DOM-a.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:host-color
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: host-color-scene

### Narration

Host odmah koristi spoljašnji text token, pa vidiš kako custom property prolazi kroz granicu shadow DOM-a.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}
```

# Step: card-outline

title: "Shadow CSS: .card / outline"
summary: Dodajemo helper outline za glavni card blok i držimo ga do završnog card rezimea.
intent: Glavni card outline ostaje dok ne završimo celu unutrašnju celinu.
tag: shadow-css:card-outline
proTip: Glavni card outline ostaje dok ne završimo celu unutrašnju celinu.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: card-outline-scene

### Narration

Dodajemo helper outline za glavni card blok i držimo ga do završnog card rezimea.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
}
```

# Step: card-display

title: "Shadow CSS: .card / display"
summary: Card raspored uvodimo grid-om jer imamo vertikalnu stack strukturu.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:card-display
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: card-display-scene

### Narration

Card raspored uvodimo grid-om jer imamo vertikalnu stack strukturu.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
}
```

# Step: card-gap

title: "Shadow CSS: .card / gap"
summary: Gap odvaja badge, naslov, opis i CTA.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:card-gap
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: card-gap-scene

### Narration

Gap odvaja badge, naslov, opis i CTA.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
}
```

# Step: card-padding

title: "Shadow CSS: .card / padding"
summary: Padding pravi pravi card footprint unutar komponente.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:card-padding
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: card-padding-scene

### Narration

Padding pravi pravi card footprint unutar komponente.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
}
```

# Step: card-radius

title: "Shadow CSS: .card / border-radius"
summary: Zaobljenje daje modernu card siluetu.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:card-radius
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: card-radius-scene

### Narration

Zaobljenje daje modernu card siluetu.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
}
```

# Step: card-border

title: "Shadow CSS: .card / border"
summary: Ivica koristi host token, pa spoljašnji CSS zaista utiče na unutrašnji card.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:card-border
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: card-border-scene

### Narration

Ivica koristi host token, pa spoljašnji CSS zaista utiče na unutrašnji card.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
}
```

# Step: card-background

title: "Shadow CSS: .card / background"
summary: Tamna pozadina sada čita oba surface tokena direktno sa host elementa.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:card-background
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: card-background-scene

### Narration

Tamna pozadina sada čita oba surface tokena direktno sa host elementa.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
}
```

# Step: card-shadow

title: "Shadow CSS: .card / box-shadow"
summary: Shadow sada takođe čita spoljašnji token, pa i dubina komponente postaje deo API-ja.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:card-shadow
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: card-shadow-scene

### Narration

Shadow sada takođe čita spoljašnji token, pa i dubina komponente postaje deo API-ja.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}
```

# Step: eyebrow-outline

title: "Shadow CSS: .eyebrow / outline"
summary: Dodajemo helper outline za eyebrow badge i držimo ga do završnog eyebrow rezimea.
intent: Badge je mali element i zato mu outline posebno pomaže tokom objašnjenja.
tag: shadow-css:eyebrow-outline
proTip: Badge je mali element i zato mu outline posebno pomaže tokom objašnjenja.
focusHtmlNeedles:

- slot="eyebrow"
- <my-first-component

## Scene: eyebrow-outline-scene

### Narration

Dodajemo helper outline za eyebrow badge i držimo ga do završnog eyebrow rezimea.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
}
```

# Step: eyebrow-display

title: "Shadow CSS: .eyebrow / display"
summary: Badge ostaje kompakatan i prirodno prati svoj sadržaj.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:eyebrow-display
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- slot="eyebrow"
- <my-first-component

## Scene: eyebrow-display-scene

### Narration

Badge ostaje kompakatan i prirodno prati svoj sadržaj.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
}
```

# Step: eyebrow-align-items

title: "Shadow CSS: .eyebrow / align-items"
summary: Vertikalno centriramo sadržaj badge-a da kapsula izgleda urednije.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:eyebrow-align-items
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- slot="eyebrow"
- <my-first-component

## Scene: eyebrow-align-items-scene

### Narration

Vertikalno centriramo sadržaj badge-a da kapsula izgleda urednije.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
}
```

# Step: eyebrow-justify-content

title: "Shadow CSS: .eyebrow / justify-content"
summary: Tekst badge-a ostaje simetrično centriran i kada se sadržaj menja.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:eyebrow-justify-content
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- slot="eyebrow"
- <my-first-component

## Scene: eyebrow-justify-content-scene

### Narration

Tekst badge-a ostaje simetrično centriran i kada se sadržaj menja.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

# Step: eyebrow-width

title: "Shadow CSS: .eyebrow / width"
summary: Badge širinu vežemo isključivo za sadržaj, ne za širinu roditelja.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:eyebrow-width
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- slot="eyebrow"
- <my-first-component

## Scene: eyebrow-width-scene

### Narration

Badge širinu vežemo isključivo za sadržaj, ne za širinu roditelja.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
}
```

# Step: eyebrow-padding

title: "Shadow CSS: .eyebrow / padding"
summary: Padding daje badge-u jasan pill footprint.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:eyebrow-padding
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- slot="eyebrow"
- <my-first-component

## Scene: eyebrow-padding-scene

### Narration

Padding daje badge-u jasan pill footprint.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
}
```

# Step: eyebrow-radius

title: "Shadow CSS: .eyebrow / border-radius"
summary: Veliki radius zatvara badge u kapsulu.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:eyebrow-radius
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- slot="eyebrow"
- <my-first-component

## Scene: eyebrow-radius-scene

### Narration

Veliki radius zatvara badge u kapsulu.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
}
```

# Step: eyebrow-background

title: "Shadow CSS: .eyebrow / background"
summary: Poluprovidna pozadina pravi nežan badge signal.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:eyebrow-background
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- slot="eyebrow"
- <my-first-component

## Scene: eyebrow-background-scene

### Narration

Poluprovidna pozadina pravi nežan badge signal.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
}
```

# Step: eyebrow-color

title: "Shadow CSS: .eyebrow / color"
summary: Boju badge-a takođe vežemo za host accent token.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:eyebrow-color
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- slot="eyebrow"
- <my-first-component

## Scene: eyebrow-color-scene

### Narration

Boju badge-a takođe vežemo za host accent token.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
}
```

# Step: eyebrow-font-size

title: "Shadow CSS: .eyebrow / font-size"
summary: Manji font čini badge sekundarnim, ali čitljivim.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:eyebrow-font-size
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- slot="eyebrow"
- <my-first-component

## Scene: eyebrow-font-size-scene

### Narration

Manji font čini badge sekundarnim, ali čitljivim.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
}
```

# Step: eyebrow-font-weight

title: "Shadow CSS: .eyebrow / font-weight"
summary: Težina fonta čini badge labelu kompaktnom i jasnom.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:eyebrow-font-weight
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- slot="eyebrow"
- <my-first-component

## Scene: eyebrow-font-weight-scene

### Narration

Težina fonta čini badge labelu kompaktnom i jasnom.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
}
```

# Step: eyebrow-letter-spacing

title: "Shadow CSS: .eyebrow / letter-spacing"
summary: Mali tracking daje badge-u uredniji, label-like karakter.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:eyebrow-letter-spacing
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- slot="eyebrow"
- <my-first-component

## Scene: eyebrow-letter-spacing-scene

### Narration

Mali tracking daje badge-u uredniji, label-like karakter.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
}
```

# Step: eyebrow-text-transform

title: "Shadow CSS: .eyebrow / text-transform"
summary: Uppercase zatvara eyebrow kao jasnu oznaku kategorije.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:eyebrow-text-transform
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- slot="eyebrow"
- <my-first-component

## Scene: eyebrow-text-transform-scene

### Narration

Uppercase zatvara eyebrow kao jasnu oznaku kategorije.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
```

# Step: title-display

title: "Shadow CSS: .title / display"
summary: Naslovu dajemo sopstveni red da ne deli liniju sa drugim delovima.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:title-display
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: title-display-scene

### Narration

Naslovu dajemo sopstveni red da ne deli liniju sa drugim delovima.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
}
```

# Step: title-margin

title: "Shadow CSS: .title / margin"
summary: Pošto koristimo semantički `h2`, prvo gasimo podrazumevani margin.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:title-margin
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: title-margin-scene

### Narration

Pošto koristimo semantički `h2`, prvo gasimo podrazumevani margin.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
}
```

# Step: title-font-size

title: "Shadow CSS: .title / font-size"
summary: Naslov dobija responzivniju veličinu, bližu finalnom polished utisku.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:title-font-size
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: title-font-size-scene

### Narration

Naslov dobija responzivniju veličinu, bližu finalnom polished utisku.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
}
```

# Step: title-line-height

title: "Shadow CSS: .title / line-height"
summary: Kraći line-height drži naslov zategnutim i čitljivim.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:title-line-height
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: title-line-height-scene

### Narration

Kraći line-height drži naslov zategnutim i čitljivim.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
}
```

# Step: title-font-weight

title: "Shadow CSS: .title / font-weight"
summary: Pojačavamo naslov da odmah nosi hijerarhiju.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:title-font-weight
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: title-font-weight-scene

### Narration

Pojačavamo naslov da odmah nosi hijerarhiju.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}
```

# Step: summary-margin

title: "Shadow CSS: .summary / margin"
summary: Brišemo podrazumevani paragraf margin da spacing kontrolišemo iz card gap-a.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:summary-margin
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: summary-margin-scene

### Narration

Brišemo podrazumevani paragraf margin da spacing kontrolišemo iz card gap-a.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
}
```

# Step: summary-color

title: "Shadow CSS: .summary / color"
summary: Opis dobija muted token, pa i sekundarni tekst postaje deo spoljašnjeg theme API-ja.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:summary-color
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: summary-color-scene

### Narration

Opis dobija muted token, pa i sekundarni tekst postaje deo spoljašnjeg theme API-ja.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
}
```

# Step: summary-line-height

title: "Shadow CSS: .summary / line-height"
summary: Line-height otvara tekst i čini ga lakšim za čitanje.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:summary-line-height
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: summary-line-height-scene

### Narration

Line-height otvara tekst i čini ga lakšim za čitanje.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}
```

# Step: cta-outline

title: "Shadow CSS: .cta / outline"
summary: Dodajemo helper outline za CTA i držimo ga do završnog CTA rezimea.
intent: CTA outline ostaje dok ne zaključimo poslednju interaktivnu zonu.
tag: shadow-css:cta-outline
proTip: CTA outline ostaje dok ne zaključimo poslednju interaktivnu zonu.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-outline-scene

### Narration

Dodajemo helper outline za CTA i držimo ga do završnog CTA rezimea.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
}
```

# Step: cta-justify-self

title: "Shadow CSS: .cta / justify-self"
summary: CTA ostaje uz levu ivicu card sadržaja umesto da se rasteže.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-justify-self
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-justify-self-scene

### Narration

CTA ostaje uz levu ivicu card sadržaja umesto da se rasteže.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
}
```

# Step: cta-appearance

title: "Shadow CSS: .cta / appearance"
summary: Gasimo browser-native izgled dugmeta da komponenta zadrži konzistentan cross-browser izgled.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-appearance
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-appearance-scene

### Narration

Gasimo browser-native izgled dugmeta da komponenta zadrži konzistentan cross-browser izgled.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
}
```

# Step: cta-padding

title: "Shadow CSS: .cta / padding"
summary: Padding daje dugmetu njegovu klik zonu.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-padding
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-padding-scene

### Narration

Padding daje dugmetu njegovu klik zonu.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
}
```

# Step: cta-border

title: "Shadow CSS: .cta / border"
summary: Uklanjamo podrazumevanu border liniju dugmeta.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-border
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-border-scene

### Narration

Uklanjamo podrazumevanu border liniju dugmeta.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
}
```

# Step: cta-radius

title: "Shadow CSS: .cta / border-radius"
summary: Pil radius drži CTA vizuelno bliskim badge logici.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-radius
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-radius-scene

### Narration

Pil radius drži CTA vizuelno bliskim badge logici.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
}
```

# Step: cta-background

title: "Shadow CSS: .cta / background"
summary: CTA sada koristi i jači accent token za dublji, kontrolisan gradijent.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-background
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-background-scene

### Narration

CTA sada koristi i jači accent token za dublji, kontrolisan gradijent.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--callout-accent, #38bdf8),
    var(--callout-accent-strong, #2563eb)
  );
}
```

# Step: cta-color

title: "Shadow CSS: .cta / color"
summary: Beli tekst drži jasan kontrast preko gradijenta.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-color
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-color-scene

### Narration

Beli tekst drži jasan kontrast preko gradijenta.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--callout-accent, #38bdf8),
    var(--callout-accent-strong, #2563eb)
  );
  color: #ffffff;
}
```

# Step: cta-font

title: "Shadow CSS: .cta / font"
summary: Dugme preuzima isti font vocabulary kao i ostatak komponente.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-font
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-font-scene

### Narration

Dugme preuzima isti font vocabulary kao i ostatak komponente.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--callout-accent, #38bdf8),
    var(--callout-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
}
```

# Step: cta-font-weight

title: "Shadow CSS: .cta / font-weight"
summary: Težina fonta zatvara CTA kao jasan action element.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-font-weight
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-font-weight-scene

### Narration

Težina fonta zatvara CTA kao jasan action element.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--callout-accent, #38bdf8),
    var(--callout-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-weight: 700;
}
```

# Step: cta-cursor

title: "Shadow CSS: .cta / cursor"
summary: Kursor eksplicitno potvrđuje interaktivnost CTA dugmeta.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-cursor
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-cursor-scene

### Narration

Kursor eksplicitno potvrđuje interaktivnost CTA dugmeta.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--callout-accent, #38bdf8),
    var(--callout-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}
```

# Step: cta-transition

title: "Shadow CSS: .cta / transition"
summary: Dodajemo finu tranziciju da hover i focus states ne deluju grubo.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-transition
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-transition-scene

### Narration

Dodajemo finu tranziciju da hover i focus states ne deluju grubo.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--callout-accent, #38bdf8),
    var(--callout-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
}
```

# Step: cta-box-shadow

title: "Shadow CSS: .cta / box-shadow"
summary: Mali shadow pojačava CTA kao završni action sloj.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-box-shadow
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-box-shadow-scene

### Narration

Mali shadow pojačava CTA kao završni action sloj.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--callout-accent, #38bdf8),
    var(--callout-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.28);
}
```

# Step: cta-hover-filter

title: "Shadow CSS: .cta:hover / filter"
summary: Hover blago podiže svetlinu CTA dugmeta bez agresivne promene boje.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-hover-filter
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-hover-filter-scene

### Narration

Hover blago podiže svetlinu CTA dugmeta bez agresivne promene boje.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--callout-accent, #38bdf8),
    var(--callout-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.06);
}
```

# Step: cta-hover-transform

title: "Shadow CSS: .cta:hover / transform"
summary: Minimalni lift daje osećaj da dugme odgovara na hover.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-hover-transform
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-hover-transform-scene

### Narration

Minimalni lift daje osećaj da dugme odgovara na hover.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--callout-accent, #38bdf8),
    var(--callout-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.06);
  transform: translateY(-1px);
}
```

# Step: cta-active-transform

title: "Shadow CSS: .cta:active / transform"
summary: Na active vraćamo dugme nazad, da klik ima malu fizičku povratnu informaciju.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-active-transform
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-active-transform-scene

### Narration

Na active vraćamo dugme nazad, da klik ima malu fizičku povratnu informaciju.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--callout-accent, #38bdf8),
    var(--callout-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.06);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}
```

# Step: cta-focus-outline

title: "Shadow CSS: .cta:focus-visible / outline"
summary: Focus-visible dodaje jasan tastaturski focus ring bez oslanjanja na browser default.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-focus-outline
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-focus-outline-scene

### Narration

Focus-visible dodaje jasan tastaturski focus ring bez oslanjanja na browser default.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--callout-accent, #38bdf8),
    var(--callout-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.06);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
}
```

# Step: cta-focus-outline-offset

title: "Shadow CSS: .cta:focus-visible / outline-offset"
summary: Offset odvaja focus ring od same pil ivice dugmeta.
intent: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
tag: shadow-css:cta-focus-outline-offset
proTip: Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-focus-outline-offset-scene

### Narration

Offset odvaja focus ring od same pil ivice dugmeta.

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--callout-accent, #38bdf8),
    var(--callout-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.06);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}
```

# Step: card-summary

title: "Rezime: .card u shadow-dom-style.css"
summary: Rezimiramo glavni card blok i tek sada uklanjamo njegov helper outline, jer su struktura, stil iz posebnog CSS fajla i način usvajanja stylesheet-a potpuno jasni.
intent: Helper outline za glavni card ostaje dok i markup i poseban shadow CSS tok ne budu dovoljno čitljivi.
tag: summary:card-summary
proTip: Helper outline za glavni card ostaje dok i markup i poseban shadow CSS tok ne budu dovoljno čitljivi.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: card-summary-scene

### Narration

Rezimiramo glavni card blok i tek sada uklanjamo njegov helper outline, jer su struktura, stil iz posebnog CSS fajla i način usvajanja stylesheet-a potpuno jasni.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

my-first-component {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 420px);
  --callout-surface: #0f172a;
  --callout-surface-alt: rgba(15, 23, 42, 0.92);
  --callout-border: rgba(148, 163, 184, 0.24);
  --callout-accent: #38bdf8;
  --callout-accent-strong: #2563eb;
  --callout-text: #e2e8f0;
  --callout-muted: #cbd5e1;
  --callout-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}
```

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
  /* helper outline removed in final .card summary */
}

.eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--callout-accent, #38bdf8),
    var(--callout-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.06);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}
```

# Step: eyebrow-summary

title: "Rezime: .eyebrow u shadow-dom-style.css"
summary: Rezimiramo eyebrow badge i uklanjamo njegov helper outline tek sada, kada slot projekcija i badge stil rade zajedno iz izdvojenog CSS fajla.
intent: Slot je ovde važan deo lekcije, pa helper outline ostaje dok named slot ne postane jasan.
tag: summary:eyebrow-summary
proTip: Slot je ovde važan deo lekcije, pa helper outline ostaje dok named slot ne postane jasan.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: eyebrow-summary-scene

### Narration

Rezimiramo eyebrow badge i uklanjamo njegov helper outline tek sada, kada slot projekcija i badge stil rade zajedno iz izdvojenog CSS fajla.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

my-first-component {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 420px);
  --callout-surface: #0f172a;
  --callout-surface-alt: rgba(15, 23, 42, 0.92);
  --callout-border: rgba(148, 163, 184, 0.24);
  --callout-accent: #38bdf8;
  --callout-accent-strong: #2563eb;
  --callout-text: #e2e8f0;
  --callout-muted: #cbd5e1;
  --callout-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}
```

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
  /* helper outline removed in final .card summary */
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  /* helper outline removed in final .eyebrow summary */
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  outline: 1px dashed #34d399;
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--callout-accent, #38bdf8),
    var(--callout-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.06);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}
```

# Step: cta-summary

title: "Rezime: .cta u shadow-dom-style.css"
summary: "Rezime za CTA dugme: helper outline više nije potreban, jer završni stil iz posebnog CSS fajla, event i hover/focus ponašanje već jasno pokazuju njegovu ulogu."
intent: Outline služi učenju; kad je element potpuno objašnjen, može da nestane.
tag: summary:cta-summary
proTip: Outline služi učenju; kad je element potpuno objašnjen, može da nestane.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: cta-summary-scene

### Narration

Rezime za CTA dugme: helper outline više nije potreban, jer završni stil iz posebnog CSS fajla, event i hover/focus ponašanje već jasno pokazuju njegovu ulogu.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

my-first-component {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 420px);
  --callout-surface: #0f172a;
  --callout-surface-alt: rgba(15, 23, 42, 0.92);
  --callout-border: rgba(148, 163, 184, 0.24);
  --callout-accent: #38bdf8;
  --callout-accent-strong: #2563eb;
  --callout-text: #e2e8f0;
  --callout-muted: #cbd5e1;
  --callout-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}
```

### Show Code: shadow-css

```css
:host {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--callout-text, #e2e8f0);
}

.card {
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid var(--callout-border, rgba(148, 163, 184, 0.24));
  background: linear-gradient(
    180deg,
    var(--callout-surface, rgba(15, 23, 42, 0.98)),
    var(--callout-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--callout-shadow, 0 26px 60px rgba(15, 23, 42, 0.24));
  /* helper outline removed in final .card summary */
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: var(--callout-accent, #38bdf8);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  /* helper outline removed in final .eyebrow summary */
}

.title {
  display: block;
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2rem);
  line-height: 1.1;
  font-weight: 800;
}

.summary {
  margin: 0;
  color: var(--callout-muted, #cbd5e1);
  line-height: 1.65;
}

.cta {
  justify-self: start;
  appearance: none;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--callout-accent, #38bdf8),
    var(--callout-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.28);
  /* helper outline removed in final .cta summary */
}

.cta:hover {
  filter: brightness(1.06);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}
```

# Step: host-summary

title: "Rezime: my-first-component host"
summary: "Završni host rezime: spoljašnji outline host elementa više nije potreban, jer su API atributi, theme tokeni i adopted stylesheet tok sada jasni."
intent: Host outline ostaje dok ne pokažemo i spoljašnji API i unutrašnju implementaciju komponente.
tag: summary:host-summary
proTip: Host outline ostaje dok ne pokažemo i spoljašnji API i unutrašnju implementaciju komponente.
focusHtmlNeedles:

- <my-first-component
- slot="eyebrow"

## Scene: host-summary-scene

### Narration

Završni host rezime: spoljašnji outline host elementa više nije potreban, jer su API atributi, theme tokeni i adopted stylesheet tok sada jasni.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

my-first-component {
  display: block;
  width: min(100%, 420px);
  --callout-surface: #0f172a;
  --callout-surface-alt: rgba(15, 23, 42, 0.92);
  --callout-border: rgba(148, 163, 184, 0.24);
  --callout-accent: #38bdf8;
  --callout-accent-strong: #2563eb;
  --callout-text: #e2e8f0;
  --callout-muted: #cbd5e1;
  --callout-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
  /* helper outline removed in final my-first-component host summary */
}
```

# Step: shell-summary

title: "Rezime: .app-shell"
summary: Tek sada uklanjamo helper outline sa `.app-shell`, jer je cela cleanup lekcija kompletna i okvir više nije potreban.
intent: App shell outline ostaje sve vreme kao teaching okvir i nestaje tek na samom kraju lekcije.
tag: summary:shell-summary
proTip: App shell outline ostaje sve vreme kao teaching okvir i nestaje tek na samom kraju lekcije.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-summary-scene

### Narration

Tek sada uklanjamo helper outline sa `.app-shell`, jer je cela cleanup lekcija kompletna i okvir više nije potreban.

### Show Code: css

```css
.app-shell {
  padding: 40px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
  /* helper outline removed in final .app-shell summary */
}

my-first-component {
  display: block;
  width: min(100%, 420px);
  --callout-surface: #0f172a;
  --callout-surface-alt: rgba(15, 23, 42, 0.92);
  --callout-border: rgba(148, 163, 184, 0.24);
  --callout-accent: #38bdf8;
  --callout-accent-strong: #2563eb;
  --callout-text: #e2e8f0;
  --callout-muted: #cbd5e1;
  --callout-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
  /* helper outline removed in final my-first-component host summary */
}
```

# Step: done

title: "Done: Clean My First Component with adoptedStyleSheets"
summary: "Lekcija je završena: ista komponenta sada ima čistiji raspored odgovornosti. Host HTML ostaje mali, template čuva samo markup, `shadow-dom-style.css` čuva CSS, a klasa samo uvozi tekst, usvaja stylesheet i vodi lifecycle ponašanje."
intent: Sledeći logičan korak je da isti stylesheet podeliš između više shadow root instanci ili da uvedeš još jedan komponentni stil sloj.
tag: success
proTip: Sledeći logičan korak je da isti stylesheet podeliš između više shadow root instanci ili da uvedeš još jedan komponentni stil sloj.

## Scene: done-scene

### Narration

Lekcija je završena: ista komponenta sada ima čistiji raspored odgovornosti. Host HTML ostaje mali, template čuva samo markup, `shadow-dom-style.css` čuva CSS, a klasa samo uvozi tekst, usvaja stylesheet i vodi lifecycle ponašanje.

### Show Code: html

```html
<div class="app-shell">
  <my-first-component title="Web Components u praksi" cta-label="Otvori lekciju">
    <span slot="eyebrow">Vanilla JS</span>
    Gradiš custom element, shadow DOM i slot projekciju bez framework-a.
  </my-first-component>
</div>
```
