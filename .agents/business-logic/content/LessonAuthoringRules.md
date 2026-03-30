# Pravila za sastavljanje lekcije

Ovo je jedini važeći dokument za autora koji piše lekciju u Step By Step Animator sistemu.

Ako autor želi da sastavi novu lekciju, menja postojeću ili proveri da li je sadržaj validan, ovaj dokument je kanonski izvor istine.

Svi drugi repo-lokalni dokumenti služe ili za arhitekturu, ili za migraciju, ili za internu implementaciju. Ne koriste se kao glavni vodič za pisanje lekcije.

## 1. Osnovni princip

Lekcija se piše u Write Mode-u kao jedan tok:

`Step -> Scene -> Narration -> Show Code`

Autor ne kreće od foldera, niti od ručnog pravljenja `lesson.md`, `scenes.md`, `theory.md` ili `artifacts/`.

Za dnevni rad važi sledeće:

- pišeš u Write Mode-u
- `Save` čuva draft u Authoring Store-u
- `Play` pušta poslednji zdravi sačuvani draft
- `Publish` i `Export` su posebni koraci i nisu uslov da lekcija postoji

## 2. Oblik dokumenta

Kanonski authored shape lekcije ostaje `lesson.script.md`.

Sastoji se iz dva dela:

### 2.1 Frontmatter

Frontmatter je zaglavlje između `---` i `---`.

U njemu žive metadata i tehničke definicije lekcije, na primer:

- `schemaVersion`
- `lessonId`
- `lessonTitle`
- `lessonIntro`
- `status`
- `courseId`
- `order`
- `artifacts`
- `preview`

Frontmatter je deo validne lekcije, ali nije glavni autorski tok.

### 2.2 Body

Body počinje odmah ispod frontmatter-a.

Prvi stvarni sadržaj tela, ne računajući prazne redove, mora biti:

```md
# Step: <step-id>
```

## 3. Obavezna struktura

### 3.1 Step

Svaki korak mora da počne ovako:

```md
# Step: <step-id>
title:
summary:
intent:
```

Pravila:

- `step-id` mora biti stabilan i machine-safe
- koristi `kebab-case`
- svaki Step mora imati `title`, `summary` i `intent`
- jedan Step treba da predstavlja jedan pedagoški cilj

### 3.2 Scene

Svaki Step mora imati najmanje jednu scenu:

```md
## Scene: <scene-id>
```

Pravila:

- svaki Step mora imati bar jednu `Scene`
- `scene-id` mora biti jedinstven u celoj lekciji
- koristi `kebab-case`

### 3.3 Narration

Svaka scena mora imati naraciju:

```md
### Narration
```

Pravila:

- `Narration` je obavezna u svakoj sceni
- naracija mora da objasni šta se upravo menja
- naracija treba da usmeri pažnju studenta na ono što se vidi u Preview-u

### 3.4 Show Code

Svaka scena mora imati najmanje jedan prikaz koda:

````md
### Show Code: <artifact-id>
```html
...
```
````

Pravila:

- svaka scena mora imati bar jedan `Show Code`
- jedan `Show Code` blok prikazuje kompletan snapshot fajla u tom trenutku
- nisu dozvoljeni isečci tipa `...`, patch-evi, ni “ostatak ostaje isti”
- jezik code fence-a mora odgovarati artifact tipu koji prikazuješ

## 4. Stroga parser pravila

Ovo su pravila bez kojih lekcija nije validna:

- prvi stvarni sadržaj posle frontmatter-a mora biti `# Step:`
- svi Step i Scene ID-jevi moraju biti jedinstveni
- ID-jevi moraju biti u `kebab-case` formatu
- svaki Step mora imati `title`, `summary` i `intent`
- svaki Step mora imati bar jednu `Scene`
- svaka `Scene` mora imati `Narration`
- svaka `Scene` mora imati bar jedan `Show Code`
- svaki `Show Code` mora biti potpun i validan snapshot
- jezik code fence-a mora odgovarati konkretnom artifact tipu

Ako prekršiš ova pravila, dobijaš broken lesson ili validation error.

## 5. Pedagoška pravila

Ovo nisu samo parser pravila. Ovo je i način na koji lekcija treba da diše.

### 5.1 Jedan Step = jedan pedagoški cilj

Jedan Step ne mora nužno biti jedan jedini UI element.

Ali mora biti jedna jasna celina koju student može da razume kao jednu fazu rada.

### 5.2 Prvo vizuelni shell, pa logika

Za UI i web komponente redosled je:

1. napravi čitljiv vizuelni shell
2. zatim uvodi ponašanje i logiku
3. uvodi logiku deo po deo, bez skakanja

### 5.3 Svaka scena mora da ostavi stabilan trag

Student mora da vidi rezultat scene.

Ne pravi scene koje ne ostavljaju nikakav jasan vizuelni ili kodni ishod.

### 5.4 Ne mešaj više nepovezanih stvari u istoj sceni

Jedna scena treba da objašnjava jednu logičnu promenu ili jednu blisko povezanu grupu promena.

## 6. Minimalni validni primer

````md
---
schemaVersion: 1
lessonId: human-first-example
lessonTitle: Human First Example
lessonIntro: Build a tiny card.
status: active
courseId: demo-course
order: 1
artifacts:
  - artifactId: html
    language: html
    label: index.html
    isPrimary: true
preview:
  type: dom
  title: Preview
  address: browser://preview-url
---

# Step: empty-shell
title: Start from an empty shell
summary: Kreiramo prazan prostor za rad.
intent: Vizuelna neutralnost pre prve promene.

## Scene: start-intro

### Narration
Počinjemo od bazičnog HTML-a. Ovo je naša prazna tabla na kojoj ćemo graditi.

### Show Code: html
```html
<div class="app-shell"></div>
```
````

## 7. Brza autorska provera

Pre nego što klikneš `Save`, proveri sledeće:

- da li prvi stvarni red body-ja počinje sa `# Step:`
- da li svaki Step ima `title`, `summary` i `intent`
- da li svaki Step ima bar jednu `Scene`
- da li svaka `Scene` ima `Narration`
- da li svaka `Scene` ima bar jedan `Show Code`
- da li su svi snapshoti kompletni
- da li su svi ID-jevi jedinstveni i u `kebab-case` formatu
- da li naracija objašnjava šta student treba da vidi

## 8. Šta je legacy

Sledeće nije glavni put za novog autora:

- ručno pravljenje lesson foldera pre početka rada
- početak od `lesson.md`, `scenes.md`, `theory.md` i `artifacts/`
- tretiranje filesystem fajlova kao glavnog draft source-of-truth sloja

Takvi formati mogu i dalje postojati zbog migracije, importa i publish/export toka, ali nisu kanonski način da autor sastavi lekciju.

## 9. Status ovog dokumenta

Ovaj dokument je:

- kanonski user-facing contract za sastavljanje lekcije
- važeći za Write Mode i normalan authoring tok
- važniji od starijih repo-lokalnih authoring vodiča kada postoji razlika

Ako postoji nedoumica između ovog dokumenta i starog authoring teksta, važi ovaj dokument.
