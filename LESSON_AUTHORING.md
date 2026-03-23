# Lesson Authoring

Ovaj fajl je praktični ugovor za pretvaranje sadržaja u animiranu `Step By Step Animator` lekciju.

## 1. Suština

Lekcija nije običan tekst i nije statičan tutorial.

Lekcija mora da se ponaša kao da gledaš programera preko share screen-a:

- HTML se dodaje element po element
- CSS se dodaje property po property
- kada lekcija to traži, JavaScript se dodaje akciju po akciju
- preview prikazuje tačno isti kumulativni HTML/CSS/JS koji je trenutno napisan
- svaka promena mora da bude vizuelno jasna i verbalno objašnjiva
- kod Web Components lekcija, prvo JavaScript mora da napravi stvarni renderovani DOM, pa tek onda CSS treba da ga stilizuje

Ako sadržaj ne može da se razbije na takve male, čitljive korake, još nije spreman za ovu vrstu animacije.

## 2. Gde ide nova lekcija

Svaka nova lekcija ide u svoj folder pod:

```txt
lessons/
  feature-name/
```

Minimalni shape:

```txt
lessons/
  feature-name/
    feature-name.lesson.js
    describe-steps.js
    build-html-at-step.js
    build-css-at-step.js
    build-js-at-step.js
    build-template-js-at-step.js
    build-shadow-css-at-step.js
    content/
      assets/
        feature-goal.svg
      documents/
        files/
          lesson.sr.md
          html.timeline.md
          css.rules.md
          js.timeline.md
          template-js.timeline.md
          shadow-dom-style.css.md
```

## 3. Šta svaki fajl radi

`feature-name.lesson.js`

- sastavlja lesson contract
- povezuje markdown metadata
- povezuje step script
- povezuje HTML/CSS builder funkcije
- kada lekcija to traži, povezuje i JS builder funkciju
- kada lekcija to traži, povezuje i poseban template JS builder
- kada lekcija to traži, povezuje i poseban shadow CSS builder
- opciono povezuje referentnu sliku cilja i homework napomene za shell

`describe-steps.js`

- opisuje ceo teaching tok
- svaki step mora da ima jasan naslov, opis, tag i pro tip
- HTML step i CSS step moraju da budu odvojeni i precizni

`build-html-at-step.js`

- ostaje tanak adapter preko `html.timeline.md`
- vraća kompletan kumulativni HTML za dati step
- ne vraća diff
- preview se hrani direktno iz ovog output-a

`build-css-at-step.js`

- ostaje tanak adapter preko `css.rules.md`
- vraća kompletan kumulativni CSS za dati step
- ne vraća diff
- CSS ide property po property

`build-js-at-step.js`

- koristiš ga samo kada lekcija zaista ima JavaScript fajl
- ostaje tanak adapter preko `js.timeline.md`
- vraća kompletan kumulativni JS za dati step
- ne vraća diff
- JS mora da raste akciju po akciju i da ostane izvršiv na svakom koraku

`build-shadow-css-at-step.js`

- koristiš ga samo kada lekcija zaista odvaja shadow DOM CSS u poseban fajl
- ostaje tanak adapter preko `shadow-dom-style.css.md`
- vraća kompletan kumulativni shadow CSS za dati step
- ne vraća diff
- shadow CSS i dalje ide property po property

`build-template-js-at-step.js`

- koristiš ga samo kada lekcija zaista odvaja template markup u poseban JS modul
- ostaje tanak adapter preko `template-js.timeline.md`
- vraća kompletan kumulativni template JS za dati step
- ne vraća diff
- služi za slučajeve kao `component.html.js`

`content/documents/files/lesson.sr.md`

- drži title, intro i metadata

`content/documents/files/html.timeline.md`

- drži HTML timeline blokove u fenced `json` formatu
- svaki blok kaže od kog stepa postoji i u koji slot se ubacuje

`content/documents/files/css.rules.md`

- drži CSS rule blokove u fenced `json` formatu
- svaki blok kaže koji selector otvaramo i koje property linije se vide po step-u

`content/documents/files/js.timeline.md`

- drži opcioni JavaScript timeline u fenced `json` formatu
- koristi se samo kada lekcija zaista ima JS panel i live izvršavanje

`content/documents/files/template-js.timeline.md`

- drži opcioni template JS source u fenced `json` formatu
- koristi se samo kada lekcija odvaja template markup u poseban modul

`content/documents/files/shadow-dom-style.css.md`

- drži opcioni shadow DOM CSS source u fenced `json` formatu
- koristi se samo kada lekcija zaista ima odvojen shadow CSS fajl i četvrti editor panel

`content/assets/feature-goal.svg`

- opciona referentna slika koja pokazuje šta gradimo
- može da sadrži i homework varijante koje za sada ne implementiramo

## 4. Pravila za animirani lesson flow

### 4.1 Početak

Ako lekcija gradi komponentu, kreni od najmanjeg neutralnog početka.

Za layout ili komponentu to je najčešće:

```html
<div class="app-shell">
```

Nemoj rano ubacivati filler sadržaj koji lekcija ne objašnjava.

### 4.2 HTML pravila

HTML piši element po element.

Dobro:

1. dodaj root wrapper
2. dodaj glavni semantic element
3. dodaj child zonu
4. dodaj child element
5. dodaj labelu ili copy

Loše:

- ubaciti ceo gotov DOM odjednom
- preskočiti međukorake koje preview treba da pokaže

### 4.3 CSS pravila

CSS piši property po property.

Dobro:

1. dodaj privremeni helper border ili outline da element odmah postane vidljiv
2. dodaj veličinu ili spacing
3. dodaj raspored
4. dodaj boje i polish
5. zadrži helper outline kroz ceo teaching tok za taj element
6. ukloni helper outline tek u završnom rezime koraku za taj element ili celinu

Loše:

- nalepiti ceo selector blok odjednom
- dodati polish pre nego što je footprint elementa jasan

### 4.4 Helper stilovi

Kad je neka celina tek u izgradnji, helper linije su obavezne ako pomažu orijentaciji.

Pravila:

- helper outline ili border uvodi se rano
- `.app-shell` takođe mora da dobije svoj tanak helper outline i da ga zadrži kroz celu lekciju, sve do završnog shell rezimea
- svaki pod-element iste celine treba da ima svoj tanak helper outline
- svaki pod-element iste celine može imati svoju helper boju
- helper stilovi ostaju aktivni do završnog rezime koraka za taj element ili celinu
- završni rezime korak tek tada uklanja helper stilove

Step opis mora to i da kaže:

- kada uvodiš helper stil: `Dodajemo privremeni pomoćni border radi lakšeg snalaženja, kasnije ćemo ga ukloniti.`
- kada ga uklanjaš: `Uklanjamo privremeni pomoćni border, više nam ne treba.`

### 4.4a HTML focus pravilo tokom CSS koraka

Dok pišeš CSS za neki element, odgovarajući HTML target u editor panelu mora da bude jasno žuto istaknut.

To znači:

- CSS step ne naglašava samo novu CSS liniju
- isti trenutak mora jasno da pokaže i koji HTML element je pod obradom
- highlight mora da bude dovoljno upadljiv da se bez razmišljanja vidi o kom elementu govorimo

### 4.5 Preview integritet

Preview mora da bude stvarni rezultat istog koda koji se vidi u editor panelu.

To znači:

- nema posebnog fake preview DOM-a
- nema ručno režirane scene
- nema CSS-a koji nije došao iz `build-css-at-step.js`
- nema HTML-a koji nije došao iz `build-html-at-step.js`
- kada lekcija ima JS, nema JavaScript-a koji nije došao iz `build-js-at-step.js`

## 5. Kako razložiti sadržaj u steps

Pre nego što pišeš fajlove, sadržaj razloži ovim redom:

1. Koji je konačni HTML?
2. Koje su glavne vizuelne celine?
3. Kojim redom korisnik treba da ih vidi da bi razumeo građenje?
4. Koji je najmanji HTML korak koji još uvek ima smisla?
5. Koji je najmanji CSS property korak koji pravi vidljivu ili logičku promenu?

Najčešći dobar redosled je:

1. root shell
2. glavni semantic wrapper
3. prva velika celina
4. child elementi te celine
5. helper stilovi za orijentaciju
6. layout property-i
7. spacing
8. colors / typography
9. interaction states
10. responsive pravila
11. done

## 6. Markdown contract

`lesson.sr.md`:

```md
---
title: Naslov lekcije
previewAddress: browser://feature-preview
previewTitle: Live feature preview
htmlFileName: index.html
cssFileName: style.css
jsFileName: component.js
templateJsFileName: component.html.js
shadowCssFileName: shadow-dom-style.css
---

Kratak uvod u lekciju.
```

`html.timeline.md`:

````md
# HTML Timeline

```json
[
  {
    "from": "empty_shell",
    "target": "root",
    "lines": [
      "<div class=\"app-shell\">",
      "  @@slot:app-shell-content@@",
      "</div>"
    ]
  }
]
```
````

`css.rules.md`:

````md
# CSS Rule Blocks

```json
[
  {
    "header": ".app-shell {",
    "showFrom": "empty_shell",
    "entries": [
      { "from": "shell_outline", "untilBefore": "shell_summary", "line": "outline: 1px dashed #94a3b8;" }
    ]
  }
]
```
````

`js.timeline.md`:

````md
# JS Timeline

```json
[
  {
    "from": "class_declaration",
    "target": "root",
    "lines": [
      "class ExampleElement extends HTMLElement {",
      "}",
      "",
      "@@slot:after-class@@"
    ]
  }
]
```
````

`template-js.timeline.md`:

````md
# Template JS Timeline

```json
[
  {
    "from": "template_element_export",
    "target": "root",
    "lines": [
      "export const componentTemplate = document.createElement('template');"
    ]
  }
]
```
````

`shadow-dom-style.css.md`:

````md
# Shadow DOM CSS Rule Blocks

```json
[
  {
    "header": ".card {",
    "entries": [
      { "from": "card_display", "line": "display: grid;" }
    ]
  }
]
```
````

Pravila za DSL:

- koristi jedan fenced `json` blok po dokumentu
- `html.timeline.md` i `js.timeline.md` koriste `target` slot marker-e
- `css.rules.md` koristi `header`, opcioni `showFrom` i `entries`
- markdown DSL dokumenti su kanonski source step sadržaja; JS builder fajlovi ne smeju da dupliraju isti sadržaj ručno

## 6a. Goal image contract

Ako lesson ima referentni vizuelni cilj, taj deo ostaje u lesson JS contract-u jer je asset tehnički import.

Tipični optional fields u `feature-name.lesson.js`:

```js
goalTitle: 'Šta gradimo u ovoj lekciji',
goalImageSrc: goalImage,
goalImageAlt: 'Opis referentne slike',
goalImageCaption: 'Šta tačno gradimo iz te reference',
homeworkTitle: 'Domaći zadatak',
homeworkItems: [
  'Varijanta 2 ostaje za samostalnu vežbu.',
  'Varijanta 3 ostaje za samostalnu vežbu.'
]
```

## 7. Šta da kažeš AI-u

Ako želiš da AI pretvori sadržaj u lekciju, daj mu i cilj UI-ja i stroga pravila animacije.

Koristi ovaj template:

```txt
Pretvori ovo u Step By Step Animator lekciju.

Cilj lekcije:
- Napraviti [naziv komponente ili layouta]
- Krajnji rezultat treba da izgleda kao [kratak opis]

Repo contract:
- root split je `animator/` i `lessons/`
- novu lekciju dodaj pod `lessons/[feature-name]/`
- napravi:
  - `[feature-name].lesson.js`
  - `describe-steps.js`
  - `build-html-at-step.js`
  - `build-css-at-step.js`
  - `build-js-at-step.js` kada lekcija traži JavaScript
  - `content/documents/files/lesson.sr.md`
  - `content/documents/files/html.timeline.md`
  - `content/documents/files/css.rules.md`
  - `content/documents/files/js.timeline.md` kada lekcija traži JavaScript
  - `content/assets/[feature-name]-goal.svg` kada postoji referentna slika
  - `content/documents/files/lesson.sr.md`

Animaciona pravila:
- HTML ide element po element
- CSS ide property po property
- kada lekcija traži JavaScript, dodaj ga akciju po akciju i drži ga izvršivim na svakom koraku
- preview mora da bude hranjen iz istog kumulativnog HTML/CSS/JS output-a
- kreni od neutralnog početka, najčešće `<div class="app-shell">`
- ne ubacuj filler sadržaj koji lekcija ne objašnjava
- uvodi helper bordere ili outlin-e rano ako element bez njih nije dovoljno vidljiv
- svaki važan element treba da zadrži svoj tanak outline do završnog rezime koraka za taj element
- rezime korak za element tek tada gasi outline
- kada AI piše CSS korak, mora da označi i koji HTML target u editoru treba žuto da bude fokusiran
- ako postoji referentna slika, lesson contract treba da je prikaže kroz goal card u shell-u
- ako referentna slika sadrži dodatne varijante, one mogu da budu navedene kao homework umesto da se odmah implementiraju
- helper stilovi ostaju dok se ne završi cela vizuelna celina
- kada uvodiš helper stil, step opis mora da kaže da je privremen
- kada uklanjaš helper stil, step opis mora da kaže da ga uklanjaš jer više nije potreban
- svaka CSS promena mora da bude ili vizuelno jasna ili logički neophodna u tom trenutku

Authoring pravila:
- folder kaže use case
- file kaže jednu odgovornost
- function kaže tačnu akciju
- ne koristi generic nazive kao utils, helpers, common, service
- ne lepi gotov stylesheet odjednom
- ne lepi gotov HTML odjednom
- builder JS fajlovi treba da ostanu tanki adapteri, ne novi ručni monoliti

Isporuči output spreman za ovaj repo.
```

## 8. Kratki filter pre svakog novog stepa

Pre nego što zadržiš step, proveri:

- Da li ovaj step pravi jednu jasnu promenu?
- Da li preview može jasno da pokaže tu promenu?
- Da li bih mogao glasom da objasnim baš ovaj step bez skakanja?
- Da li je ovo prirodan sledeći korak za čoveka koji uči?

Ako odgovor nije `da`, step treba razbiti ili pomeriti.
