---
schemaVersion: 1
lessonId: 09-human-first-script-demo
lessonTitle: 09 · Human-First Script Demo
lessonIntro: Ova lekcija pokazuje kako jedan citljiv lesson script moze da vodi ceo tok bez razdvajanja na lesson.md, scenes.md i artifacts.
status: active
courseId: step-by-step-animator
order: 9
artifacts:
  - artifactId: html
    language: html
    label: index.html
    isPrimary: true
  - artifactId: css
    language: css
    label: style.css
    isPrimary: false
preview:
  type: dom
  title: Human-first script preview
  address: browser://09-human-first-script-demo-preview
---
# Step: empty-shell
title: Start: Empty App Shell
summary: Otvaramo prazan `.app-shell` kao neutralnu pocetnu tacku.
intent: Najmanji moguci pocetak cini svaku narednu promenu jasnom.
tag: html:app-shell
proTip: Prvi kadar treba da objasni teren pre nego sto doda komponentu.
focusHtmlNeedles:
  - <div class="app-shell">

## Scene: empty-shell-scene

### Narration
Krecemo od praznog app shell-a da bi svaka sledeca promena bila ocigledna i vizuelno merljiva.

### Show Code: html
```html
<div class="app-shell"></div>
```

# Step: add-card-html
title: HTML: Add the Callout Card
summary: Ubacujemo mali callout card u app shell.
intent: Prvo postavljamo semanticku strukturu, pa tek onda vizuelni identitet.
tag: html:callout-card
proTip: Kada struktura postane jasna, stilovi imaju stabilnu metu.
focusHtmlNeedles:
  - class="callout-card"

## Scene: add-card-html-scene

### Narration
Sada dodajemo card shell kako bi preview dobio prvu stvarnu komponentu koju mozemo da oblikujemo.

### Show Code: html
```html
<div class="app-shell">
  <aside class="callout-card">
    <strong>Ship the DSL</strong>
    <p>Jedan lesson script treba da ostane citljiv od vrha do dna.</p>
  </aside>
</div>
```

# Step: style-app-shell
title: CSS: Center the App Shell
summary: Dodajemo layout stilove koji uokviruju card.
intent: Najpre stabilizujemo scenu, pa tek onda poliramo samu komponentu.
tag: css:app-shell
proTip: Scene framing i component styling ne treba mesati u istom potezu.
focusHtmlNeedles:
  - <div class="app-shell">

## Scene: style-app-shell-scene

### Narration
Pre nego sto stilizujemo card, centriramo ceo stage da lekcija zadrzi fokus na komponenti.

### Show Code: css
```css
.app-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f5f7fb;
}
```

# Step: style-callout-card
title: CSS: Style the Callout Card
summary: Zavrsavamo card kroz spacing, boju i kontrast.
intent: Vizuelni identitet dolazi tek kada je struktura vec zakljucana.
tag: css:callout-card
proTip: Dodaj samo stilove koje mozes odmah da objasnis u preview-u.
focusHtmlNeedles:
  - class="callout-card"

## Scene: style-callout-card-scene

### Narration
Sada card dobija svoj izgled, bez novog menjanja HTML strukture.

### Show Code: css
```css
.app-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f5f7fb;
}

.callout-card {
  width: 320px;
  padding: 20px;
  border-radius: 20px;
  background: #0f172a;
  color: white;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.22);
}

.callout-card p {
  margin: 10px 0 0;
  color: #cbd5e1;
}
```
