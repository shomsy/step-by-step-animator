---
schemaVersion: 1
lessonId: 03-build-custom-element
lessonTitle: 03 · Web Components 1/2 · Light DOM custom element
lessonIntro: Prva Web Components lekcija prvo gradi vidljivi host i prvi render koji korisnik vidi kao vizuelnu fazu, a tek onda u logičkoj fazi kroz light DOM objašnjava registraciju i atribute, bez shadow DOM sloja.
status: active
courseId: step-by-step-animator
order: 3
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
preview:
  type: dom
  title: Live custom element preview
  address: browser://03-build-custom-element-preview
goal:
  title: Šta gradimo u ovoj lekciji
  imageSrc: ./assets/custom-element-goal.svg
  imageAlt: Referentna slika tamnog callout card custom elementa na svetloj pozadini, sa malim badge-om, naslovom, opisom i CTA dugmetom.
  imageCaption: 'Prva faza je visual composition: prvo gradimo vidljivi host i prvi render, a druga faza uvodi registraciju i atribute kroz light DOM.'
---

# Step: empty-shell

title: "Start: Empty App Shell"
summary: Počinjemo od praznog `.app-shell` prostora. Ova prva Web Components lekcija objašnjava custom element osnove bez shadow DOM-a.
intent: Prvo naučimo host element i render flow, pa tek onda prelazimo na shadow DOM lekciju.
tag: html:app-shell
proTip: Prvo naučimo host element i render flow, pa tek onda prelazimo na shadow DOM lekciju.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: empty-shell-scene

### Narration

Počinjemo od praznog `.app-shell` prostora. Ova prva Web Components lekcija objašnjava custom element osnove bez shadow DOM-a.

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

title: "HTML: my-first-component Host"
summary: Dodajemo `<my-first-component>` host sa `title` i `cta-label` atributima. Browser ga za sada vidi samo kao nepoznati custom tag koji čeka registraciju.
intent: Naziv custom elementa mora da sadrži crticu. To je prvi uslov da ga kasnije registruješ.
tag: html:my-first-component
proTip: Naziv custom elementa mora da sadrži crticu. To je prvi uslov da ga kasnije registruješ.
focusHtmlNeedles:

- <my-first-component

## Scene: component-html-scene

### Narration

Dodajemo `<my-first-component>` host sa `title` i `cta-label` atributima. Browser ga za sada vidi samo kao nepoznati custom tag koji čeka registraciju.

### Show Code: html

```html
<div class="app-shell">
  <my-first-component title="Custom element od nule" cta-label="Nastavi dalje"></my-first-component>
</div>
```

### Show Code: css

```css
.app-shell {
}

my-first-component {
}
```

# Step: class-declaration

title: "JS: Class Extends HTMLElement"
summary: Otvaramo `class MyFirstComponent extends HTMLElement` i time zadajemo ponašanje budućem custom elementu.
intent: Custom element je DOM element sa tvojom klasom, ne neka posebna magija van platforme.
tag: js:class-declaration
proTip: Custom element je DOM element sa tvojom klasom, ne neka posebna magija van platforme.
focusHtmlNeedles:

- <my-first-component

## Scene: class-declaration-scene

### Narration

Otvaramo `class MyFirstComponent extends HTMLElement` i time zadajemo ponašanje budućem custom elementu.

### Show Code: js

```js
class MyFirstComponent extends HTMLElement {}
```

# Step: connected-callback

title: "JS: connectedCallback"
summary: Dodajemo `connectedCallback()`, jer je to najjednostavniji lifecycle hook za prvi render čim element uđe u DOM.
intent: Za uvodnu lekciju connectedCallback je najpraktičnija ulazna tačka pre nego što uvedemo složeniji render tok.
tag: js:connected-callback
proTip: Za uvodnu lekciju connectedCallback je najpraktičnija ulazna tačka pre nego što uvedemo složeniji render tok.
focusHtmlNeedles:

- <my-first-component

## Scene: connected-callback-scene

### Narration

Dodajemo `connectedCallback()`, jer je to najjednostavniji lifecycle hook za prvi render čim element uđe u DOM.

### Show Code: js

```js
class MyFirstComponent extends HTMLElement {
  connectedCallback() {}
}
```

# Step: read-title-attribute

title: "JS: Čitamo title Atribut"
summary: U lifecycle metodi čitamo `title` atribut sa host elementa. Time host HTML postaje spoljašnji API komponente.
intent: Atributi su najjednostavniji prvi API za custom element koji ne traži framework ni dodatni state.
tag: js:read-title-attribute
proTip: Atributi su najjednostavniji prvi API za custom element koji ne traži framework ni dodatni state.
focusHtmlNeedles:

- <my-first-component

## Scene: read-title-attribute-scene

### Narration

U lifecycle metodi čitamo `title` atribut sa host elementa. Time host HTML postaje spoljašnji API komponente.

### Show Code: js

```js
class MyFirstComponent extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'Naslov komponente';
  }
}
```

# Step: read-cta-attribute

title: "JS: Čitamo cta-label Atribut"
summary: Na isti način čitamo i `cta-label`, kako bi i tekst CTA dugmeta dolazio iz host HTML-a.
intent: Ako dva podatka dolaze spolja, drži ih u istom, lako čitljivom toku.
tag: js:read-cta-attribute
proTip: Ako dva podatka dolaze spolja, drži ih u istom, lako čitljivom toku.
focusHtmlNeedles:

- <my-first-component

## Scene: read-cta-attribute-scene

### Narration

Na isti način čitamo i `cta-label`, kako bi i tekst CTA dugmeta dolazio iz host HTML-a.

### Show Code: js

```js
class MyFirstComponent extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'Naslov komponente';
    const ctaLabel = this.getAttribute('cta-label') || 'Saznaj više';
  }
}
```

# Step: render-inner-html

title: "JS: Renderujemo Light DOM Markup"
summary: Kroz `this.innerHTML` ubacujemo card markup direktno u host element. To je najdirektniji put da vidiš kako custom element može da generiše sopstveni light DOM.
intent: Ova lekcija namerno ostaje bez shadow DOM-a, da bi render mehanika i globalni CSS bili potpuno transparentni.
tag: js:render-inner-html
proTip: Ova lekcija namerno ostaje bez shadow DOM-a, da bi render mehanika i globalni CSS bili potpuno transparentni.
focusHtmlNeedles:

- <my-first-component

## Scene: render-inner-html-scene

### Narration

Kroz `this.innerHTML` ubacujemo card markup direktno u host element. To je najdirektniji put da vidiš kako custom element može da generiše sopstveni light DOM.

### Show Code: js

```js
class MyFirstComponent extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'Naslov komponente';
    const ctaLabel = this.getAttribute('cta-label') || 'Saznaj više';
    this.innerHTML = `
      <article class="card">
        <span class="eyebrow">Custom element</span>
        <strong class="title">${title}</strong>
        <p class="summary">Light DOM verzija nam prvo objašnjava registraciju, atribut API i render bez shadow DOM sloja.</p>
        <button class="cta" type="button">${ctaLabel}</button>
      </article>
    `;
  }
}
```

# Step: define-element

title: "JS: Registrujemo my-first-component"
summary: Pre registracije proveravamo `customElements.get('my-first-component')`, pa tek onda unutar guarda pozivamo `customElements.define(...)`. Od tog trenutka browser zna kako da upgrade-uje svaki `<my-first-component>` u stvarnu komponentu.
intent: Registracija je trenutak kada nepoznati tag postaje živi custom element, a guard nas štiti od duplog define-a pri ponovnom izvršavanju.
tag: js:define-element
proTip: Registracija je trenutak kada nepoznati tag postaje živi custom element, a guard nas štiti od duplog define-a pri ponovnom izvršavanju.
focusHtmlNeedles:

- <my-first-component

## Scene: define-element-scene

### Narration

Pre registracije proveravamo `customElements.get('my-first-component')`, pa tek onda unutar guarda pozivamo `customElements.define(...)`. Od tog trenutka browser zna kako da upgrade-uje svaki `<my-first-component>` u stvarnu komponentu.

### Show Code: js

```js
class MyFirstComponent extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'Naslov komponente';
    const ctaLabel = this.getAttribute('cta-label') || 'Saznaj više';
    this.innerHTML = `
      <article class="card">
        <span class="eyebrow">Custom element</span>
        <strong class="title">${title}</strong>
        <p class="summary">Light DOM verzija nam prvo objašnjava registraciju, atribut API i render bez shadow DOM sloja.</p>
        <button class="cta" type="button">${ctaLabel}</button>
      </article>
    `;
  }
}

if (!customElements.get('my-first-component')) {
  customElements.define('my-first-component', MyFirstComponent);
}
```

# Step: shell-outline

title: "CSS: .app-shell / outline"
summary: Dodajemo helper outline za `.app-shell` i zadržavamo ga do završnog shell rezimea.
intent: App shell ostaje stalni teaching okvir kroz celu lekciju.
tag: css:shell-outline
proTip: App shell ostaje stalni teaching okvir kroz celu lekciju.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-outline-scene

### Narration

Dodajemo helper outline za `.app-shell` i zadržavamo ga do završnog shell rezimea.

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
summary: Padding daje komponenti prostor da se vidi kao zaseban teaching target.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:shell-padding
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-padding-scene

### Narration

Padding daje komponenti prostor da se vidi kao zaseban teaching target.

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
summary: Grid je dovoljan da centriramo jedan card use case.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:shell-display
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-display-scene

### Narration

Grid je dovoljan da centriramo jedan card use case.

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
summary: Centar čuva fokus na komponenti koju gradimo.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:shell-place-items
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-place-items-scene

### Narration

Centar čuva fokus na komponenti koju gradimo.

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
summary: Puna visina stabilizuje preview scenu.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:shell-min-height
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-min-height-scene

### Narration

Puna visina stabilizuje preview scenu.

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
summary: Svetla pozadina daje kontrast tamnom callout card-u.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:shell-background
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-background-scene

### Narration

Svetla pozadina daje kontrast tamnom callout card-u.

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
summary: Dodajemo helper outline za host element i držimo ga do završnog host rezimea.
intent: I kada light DOM markup već postoji, host ostaje spoljašnji okvir komponente i zato mora da ostane jasan.
tag: css:host-outline
proTip: I kada light DOM markup već postoji, host ostaje spoljašnji okvir komponente i zato mora da ostane jasan.
focusHtmlNeedles:

- <my-first-component

## Scene: host-outline-scene

### Narration

Dodajemo helper outline za host element i držimo ga do završnog host rezimea.

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
summary: Host pretvaramo u block da dobije pravi footprint.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:host-display
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: host-display-scene

### Narration

Host pretvaramo u block da dobije pravi footprint.

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
summary: Širinu zaključavamo rano da card kasnije uleti u stabilan okvir.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:host-width
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: host-width-scene

### Narration

Širinu zaključavamo rano da card kasnije uleti u stabilan okvir.

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

# Step: card-outline

title: "CSS: my-first-component .card / outline"
summary: Kada komponenta renderuje light DOM markup, glavni `.card` dobija helper outline do završnog card rezimea.
intent: Glavni card outline ostaje dok ceo light DOM blok ne postane jasan.
tag: css:card-outline
proTip: Glavni card outline ostaje dok ceo light DOM blok ne postane jasan.
focusHtmlNeedles:

- <my-first-component

## Scene: card-outline-scene

### Narration

Kada komponenta renderuje light DOM markup, glavni `.card` dobija helper outline do završnog card rezimea.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
}
```

# Step: card-display

title: "CSS: my-first-component .card / display"
summary: Card raspored uvodimo grid-om jer imamo vertikalnu stack strukturu.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:card-display
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: card-display-scene

### Narration

Card raspored uvodimo grid-om jer imamo vertikalnu stack strukturu.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
}
```

# Step: card-gap

title: "CSS: my-first-component .card / gap"
summary: Gap odvaja badge, naslov, opis i CTA.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:card-gap
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: card-gap-scene

### Narration

Gap odvaja badge, naslov, opis i CTA.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
}
```

# Step: card-padding

title: "CSS: my-first-component .card / padding"
summary: Padding pravi card footprint unutar host elementa.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:card-padding
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: card-padding-scene

### Narration

Padding pravi card footprint unutar host elementa.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
}
```

# Step: card-radius

title: "CSS: my-first-component .card / border-radius"
summary: Zaobljenje daje card-u mekšu siluetu.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:card-radius
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: card-radius-scene

### Narration

Zaobljenje daje card-u mekšu siluetu.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
}
```

# Step: card-border

title: "CSS: my-first-component .card / border"
summary: Tanka border linija odvaja card od pozadine.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:card-border
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: card-border-scene

### Narration

Tanka border linija odvaja card od pozadine.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
}
```

# Step: card-background

title: "CSS: my-first-component .card / background"
summary: Tamna pozadina zatvara glavni vizuelni blok.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:card-background
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: card-background-scene

### Narration

Tamna pozadina zatvara glavni vizuelni blok.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
}
```

# Step: card-shadow

title: "CSS: my-first-component .card / box-shadow"
summary: Shadow daje card-u dubinu i separaciju.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:card-shadow
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: card-shadow-scene

### Narration

Shadow daje card-u dubinu i separaciju.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}
```

# Step: eyebrow-outline

title: "CSS: my-first-component .eyebrow / outline"
summary: Badge dobija helper outline i zadržava ga do eyebrow rezimea.
intent: Mali elementi traže poseban outline da bi ostali čitljivi tokom objašnjenja.
tag: css:eyebrow-outline
proTip: Mali elementi traže poseban outline da bi ostali čitljivi tokom objašnjenja.
focusHtmlNeedles:

- <my-first-component

## Scene: eyebrow-outline-scene

### Narration

Badge dobija helper outline i zadržava ga do eyebrow rezimea.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
}
```

# Step: eyebrow-display

title: "CSS: my-first-component .eyebrow / display"
summary: Badge ostaje kompaktan i prati svoj sadržaj.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:eyebrow-display
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: eyebrow-display-scene

### Narration

Badge ostaje kompaktan i prati svoj sadržaj.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
}
```

# Step: eyebrow-padding

title: "CSS: my-first-component .eyebrow / padding"
summary: Padding daje badge-u njegov pill footprint.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:eyebrow-padding
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: eyebrow-padding-scene

### Narration

Padding daje badge-u njegov pill footprint.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
}
```

# Step: eyebrow-radius

title: "CSS: my-first-component .eyebrow / border-radius"
summary: Veliki radius zatvara badge u kapsulu.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:eyebrow-radius
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: eyebrow-radius-scene

### Narration

Veliki radius zatvara badge u kapsulu.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
}
```

# Step: eyebrow-background

title: "CSS: my-first-component .eyebrow / background"
summary: Blaga pozadina daje badge-u površinu bez agresivnosti.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:eyebrow-background
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: eyebrow-background-scene

### Narration

Blaga pozadina daje badge-u površinu bez agresivnosti.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
}
```

# Step: eyebrow-color

title: "CSS: my-first-component .eyebrow / color"
summary: Accent boja badge signalizira kategoriju.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:eyebrow-color
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: eyebrow-color-scene

### Narration

Accent boja badge signalizira kategoriju.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
}
```

# Step: eyebrow-font-size

title: "CSS: my-first-component .eyebrow / font-size"
summary: Badge ostaje mali i sekundaran.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:eyebrow-font-size
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: eyebrow-font-size-scene

### Narration

Badge ostaje mali i sekundaran.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
}
```

# Step: eyebrow-font-weight

title: "CSS: my-first-component .eyebrow / font-weight"
summary: Jača težina fonta čini labelu jasnom.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:eyebrow-font-weight
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: eyebrow-font-weight-scene

### Narration

Jača težina fonta čini labelu jasnom.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
}
```

# Step: title-font-size

title: "CSS: my-first-component .title / font-size"
summary: Naslov dobija dominantnu veličinu unutar card-a.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:title-font-size
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: title-font-size-scene

### Narration

Naslov dobija dominantnu veličinu unutar card-a.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
}

my-first-component .title {
  font-size: 28px;
}
```

# Step: title-font-weight

title: "CSS: my-first-component .title / font-weight"
summary: Pojačavamo naslov da odmah nosi hijerarhiju.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:title-font-weight
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: title-font-weight-scene

### Narration

Pojačavamo naslov da odmah nosi hijerarhiju.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
}

my-first-component .title {
  font-size: 28px;
  font-weight: 800;
}
```

# Step: summary-margin

title: "CSS: my-first-component .summary / margin"
summary: Brišemo default paragraf margin da spacing bude pod kontrolom.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:summary-margin
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: summary-margin-scene

### Narration

Brišemo default paragraf margin da spacing bude pod kontrolom.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
}

my-first-component .title {
  font-size: 28px;
  font-weight: 800;
}

my-first-component .summary {
  margin: 0;
}
```

# Step: summary-color

title: "CSS: my-first-component .summary / color"
summary: Opis dobija prigušenu, ali čitljivu boju.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:summary-color
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: summary-color-scene

### Narration

Opis dobija prigušenu, ali čitljivu boju.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
}

my-first-component .title {
  font-size: 28px;
  font-weight: 800;
}

my-first-component .summary {
  margin: 0;
  color: #cbd5e1;
}
```

# Step: summary-line-height

title: "CSS: my-first-component .summary / line-height"
summary: Veći line-height otvara tekst za lakše čitanje.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:summary-line-height
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: summary-line-height-scene

### Narration

Veći line-height otvara tekst za lakše čitanje.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
}

my-first-component .title {
  font-size: 28px;
  font-weight: 800;
}

my-first-component .summary {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.65;
}
```

# Step: cta-outline

title: "CSS: my-first-component .cta / outline"
summary: CTA dobija helper outline i zadržava ga do završnog CTA rezimea.
intent: CTA outline ostaje dok poslednja interaktivna zona ne bude potpuno objašnjena.
tag: css:cta-outline
proTip: CTA outline ostaje dok poslednja interaktivna zona ne bude potpuno objašnjena.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-outline-scene

### Narration

CTA dobija helper outline i zadržava ga do završnog CTA rezimea.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
}

my-first-component .title {
  font-size: 28px;
  font-weight: 800;
}

my-first-component .summary {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.65;
}

my-first-component .cta {
  outline: 1px dashed #34d399;
}
```

# Step: cta-padding

title: "CSS: my-first-component .cta / padding"
summary: Padding daje dugmetu njegovu klik zonu.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:cta-padding
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-padding-scene

### Narration

Padding daje dugmetu njegovu klik zonu.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
}

my-first-component .title {
  font-size: 28px;
  font-weight: 800;
}

my-first-component .summary {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.65;
}

my-first-component .cta {
  outline: 1px dashed #34d399;
  padding: 12px 16px;
}
```

# Step: cta-border

title: "CSS: my-first-component .cta / border"
summary: Uklanjamo podrazumevanu border liniju dugmeta.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:cta-border
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-border-scene

### Narration

Uklanjamo podrazumevanu border liniju dugmeta.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
}

my-first-component .title {
  font-size: 28px;
  font-weight: 800;
}

my-first-component .summary {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.65;
}

my-first-component .cta {
  outline: 1px dashed #34d399;
  padding: 12px 16px;
  border: 0;
}
```

# Step: cta-radius

title: "CSS: my-first-component .cta / border-radius"
summary: Pil oblik čini CTA konzistentnim sa badge oblikom.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:cta-radius
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-radius-scene

### Narration

Pil oblik čini CTA konzistentnim sa badge oblikom.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
}

my-first-component .title {
  font-size: 28px;
  font-weight: 800;
}

my-first-component .summary {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.65;
}

my-first-component .cta {
  outline: 1px dashed #34d399;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
}
```

# Step: cta-background

title: "CSS: my-first-component .cta / background"
summary: Gradijent daje CTA-u energiju i fokus.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:cta-background
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-background-scene

### Narration

Gradijent daje CTA-u energiju i fokus.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
}

my-first-component .title {
  font-size: 28px;
  font-weight: 800;
}

my-first-component .summary {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.65;
}

my-first-component .cta {
  outline: 1px dashed #34d399;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #38bdf8, #2563eb);
}
```

# Step: cta-color

title: "CSS: my-first-component .cta / color"
summary: Beli tekst pravi jasan kontrast preko dugmeta.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:cta-color
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-color-scene

### Narration

Beli tekst pravi jasan kontrast preko dugmeta.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
}

my-first-component .title {
  font-size: 28px;
  font-weight: 800;
}

my-first-component .summary {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.65;
}

my-first-component .cta {
  outline: 1px dashed #34d399;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #38bdf8, #2563eb);
  color: #ffffff;
}
```

# Step: cta-font-weight

title: "CSS: my-first-component .cta / font-weight"
summary: Jači font zatvara CTA kao jasan action element.
intent: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
tag: css:cta-font-weight
proTip: U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-font-weight-scene

### Narration

Jači font zatvara CTA kao jasan action element.

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

my-first-component .card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
}

my-first-component .title {
  font-size: 28px;
  font-weight: 800;
}

my-first-component .summary {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.65;
}

my-first-component .cta {
  outline: 1px dashed #34d399;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #38bdf8, #2563eb);
  color: #ffffff;
  font-weight: 700;
}
```

# Step: card-summary

title: "Rezime: .card"
summary: Rezimiramo glavni `.card` blok i uklanjamo njegov helper outline tek sada, kada su host, render i glavni vizuelni sloj zajedno jasni.
intent: Outline ostaje dok markup i stil ne počnu da pričaju istu priču.
tag: summary:card-summary
proTip: Outline ostaje dok markup i stil ne počnu da pričaju istu priču.
focusHtmlNeedles:

- <my-first-component

## Scene: card-summary-scene

### Narration

Rezimiramo glavni `.card` blok i uklanjamo njegov helper outline tek sada, kada su host, render i glavni vizuelni sloj zajedno jasni.

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

my-first-component .card {
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
  /* helper outline removed in final .card summary */
}

my-first-component .eyebrow {
  outline: 1px dotted #facc15;
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
}

my-first-component .title {
  font-size: 28px;
  font-weight: 800;
}

my-first-component .summary {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.65;
}

my-first-component .cta {
  outline: 1px dashed #34d399;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #38bdf8, #2563eb);
  color: #ffffff;
  font-weight: 700;
}
```

# Step: eyebrow-summary

title: "Rezime: .eyebrow"
summary: Rezimiramo eyebrow badge i tek sada uklanjamo njegov helper outline, jer je cela tekstualna hijerarhija card-a završena.
intent: Mali badge outline služi orijentaciji dok se ne slože i forma i boja i tipografija.
tag: summary:eyebrow-summary
proTip: Mali badge outline služi orijentaciji dok se ne slože i forma i boja i tipografija.
focusHtmlNeedles:

- <my-first-component

## Scene: eyebrow-summary-scene

### Narration

Rezimiramo eyebrow badge i tek sada uklanjamo njegov helper outline, jer je cela tekstualna hijerarhija card-a završena.

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

my-first-component .card {
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
  /* helper outline removed in final .card summary */
}

my-first-component .eyebrow {
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
  /* helper outline removed in final .eyebrow summary */
}

my-first-component .title {
  font-size: 28px;
  font-weight: 800;
}

my-first-component .summary {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.65;
}

my-first-component .cta {
  outline: 1px dashed #34d399;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #38bdf8, #2563eb);
  color: #ffffff;
  font-weight: 700;
}
```

# Step: cta-summary

title: "Rezime: .cta"
summary: "Rezime za CTA dugme: helper outline više nije potreban, jer završni stil i render već jasno pokazuju njegovu ulogu."
intent: Outline služi učenju; kad je CTA jasan, može da nestane.
tag: summary:cta-summary
proTip: Outline služi učenju; kad je CTA jasan, može da nestane.
focusHtmlNeedles:

- <my-first-component

## Scene: cta-summary-scene

### Narration

Rezime za CTA dugme: helper outline više nije potreban, jer završni stil i render već jasno pokazuju njegovu ulogu.

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

my-first-component .card {
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
  /* helper outline removed in final .card summary */
}

my-first-component .eyebrow {
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
  /* helper outline removed in final .eyebrow summary */
}

my-first-component .title {
  font-size: 28px;
  font-weight: 800;
}

my-first-component .summary {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.65;
}

my-first-component .cta {
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #38bdf8, #2563eb);
  color: #ffffff;
  font-weight: 700;
  /* helper outline removed in final .cta summary */
}
```

# Step: host-summary

title: "Rezime: my-first-component host"
summary: "Završni host rezime: uklanjamo host outline tek sada, kada su i atribut API i render flow potpuno jasni."
intent: Host outline ostaje dok ne objasnimo i HTML API i JavaScript registraciju.
tag: summary:host-summary
proTip: Host outline ostaje dok ne objasnimo i HTML API i JavaScript registraciju.
focusHtmlNeedles:

- <my-first-component

## Scene: host-summary-scene

### Narration

Završni host rezime: uklanjamo host outline tek sada, kada su i atribut API i render flow potpuno jasni.

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
  /* helper outline removed in final my-first-component host summary */
}

my-first-component .card {
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
  /* helper outline removed in final .card summary */
}

my-first-component .eyebrow {
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
  /* helper outline removed in final .eyebrow summary */
}

my-first-component .title {
  font-size: 28px;
  font-weight: 800;
}

my-first-component .summary {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.65;
}

my-first-component .cta {
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #38bdf8, #2563eb);
  color: #ffffff;
  font-weight: 700;
  /* helper outline removed in final .cta summary */
}
```

# Step: shell-summary

title: "Rezime: .app-shell"
summary: Tek sada uklanjamo helper outline sa `.app-shell`, jer je cela uvodna custom element lekcija kompletna.
intent: App shell outline ostaje sve vreme kao teaching okvir i nestaje tek na kraju lekcije.
tag: summary:shell-summary
proTip: App shell outline ostaje sve vreme kao teaching okvir i nestaje tek na kraju lekcije.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-summary-scene

### Narration

Tek sada uklanjamo helper outline sa `.app-shell`, jer je cela uvodna custom element lekcija kompletna.

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
  /* helper outline removed in final my-first-component host summary */
}

my-first-component .card {
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.24);
  /* helper outline removed in final .card summary */
}

my-first-component .eyebrow {
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.14);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
  /* helper outline removed in final .eyebrow summary */
}

my-first-component .title {
  font-size: 28px;
  font-weight: 800;
}

my-first-component .summary {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.65;
}

my-first-component .cta {
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #38bdf8, #2563eb);
  color: #ffffff;
  font-weight: 700;
  /* helper outline removed in final .cta summary */
}
```

# Step: done

title: "Done: Light DOM Custom Element"
summary: Prva Web Components lekcija je gotova. Sad razumeš host tag, registraciju, atribute, render kroz light DOM i tek onda stilizaciju nad stvarnim renderovanim DOM-om. Sledeći prirodan korak je shadow DOM lekcija.
intent: Najbolji nastavak je lekcija 2/2, gde isti problem rešavamo kroz template, shadow DOM i slotove.
tag: success
proTip: Najbolji nastavak je lekcija 2/2, gde isti problem rešavamo kroz template, shadow DOM i slotove.

## Scene: done-scene

### Narration

Prva Web Components lekcija je gotova. Sad razumeš host tag, registraciju, atribute, render kroz light DOM i tek onda stilizaciju nad stvarnim renderovanim DOM-om. Sledeći prirodan korak je shadow DOM lekcija.

### Show Code: html

```html
<div class="app-shell">
  <my-first-component title="Custom element od nule" cta-label="Nastavi dalje"></my-first-component>
</div>
```
