
````md
# Lesson Architecture Guidelines

Ovaj dokument opisuje pune postupke i arhitekturu za lekcije u repo-u `step-by-step-animator`.

Cilj je da struktura bude:

- flow-prvi (brojevi u folderima)
- feature-slice (specifična lekcija)
- file odgovornost (jasno razgraničene uloge)
- funkcija precizna akcija
- runtime animator engine za kadar-po-kadar playback

---

## 1. Osnovni princip: flow → feature → file → funkcija

1. `flow` folder u root `lessons/` drži sekvencijalni learning put, npr:
   - `01-build-sidebar`
   - `02-build-top-navigation`
   - ...
   - `08-smell-of-enterprise`

2. `feature` folder je pojedinačna lekcija ili component feature.
   - koristi `feature-name.lesson.js` kao kanonski komponovani kontrakt
   - opisuje title, metadata, preview, files i steps

3. `file` unutar feature slice-a
   - `describe-steps.js`: business flow za svaki step + narration
   - `build-html-at-step.js`: parser timeline za HTML
   - `build-css-at-step.js`: parser rules za CSS
   - `build-js-at-step.js`: parser timeline za JS
   - `build-shadow-css-at-step.js`: parser za shadow CSS
   - `build-template-js-at-step.js`: parser za component template module

4. `funkcija` u file-u
   - mala i precizna odgovornost
   - npr:
     - `normalizeTierValue(value)`
     - `updatePrice()`
     - `cacheDom()`
   - ime mora eksplicitno reći šta radi
   - koristi `verb + object`
   - izbegavati generičke nazive kao:
     - `handle`
     - `run`
     - `manage`

---

## 2. Lessons u praksi: feature setup i canonical contract

### 2.1 lesson file

`lessons/<feature>/feature-name.lesson.js` vraća:

- `lessonId`
- `lessonTitle`
- `lessonIntro`
- `previewAddress`
- `previewTitle`
- `htmlFileName`
- `cssFileName`
- `jsFileName` (ako ima JS)
- `templateJsFileName` (ako ima template JS)
- `shadowCssFileName` (ako ima shadow CSS)
- `steps`
- `buildHtmlAtStep`
- `buildCssAtStep`
- `buildJsAtStep`
- `buildTemplateJsAtStep`
- `buildShadowCssAtStep`
- opcionalno:
  - `goalTitle`
  - `goalImageSrc`
  - `goalImageAlt`
  - `homeworkTitle`
  - `homeworkItems`

### 2.2 struktura `content/documents`

- `content/documents/files/lesson.sr.md`
- `content/documents/files/html.timeline.md`
- `content/documents/files/css.rules.md`
- `content/documents/files/js.timeline.md`
- `content/documents/files/template-js.timeline.md`
- `content/documents/files/shadow-dom-style.css.md`

Značenje:

- `lesson.sr.md` = meta + primarni autoring
- `html.timeline.md` = cumulative HTML timeline
- `css.rules.md` = property-by-property rule builder
- `js.timeline.md` = cumulative JS timeline
- `template-js.timeline.md` = template module timeline
- `shadow-dom-style.css.md` = shadow CSS timeline

---

## 3. Kodeks imenovanja

### 3.1 Folder

- koristi `01-...`, `02-...`, `03-...` po delivery flow-u
- ne koristiti:
  - `utils`
  - `shared`
  - `common`
  - `base`
  - `controller`

### 3.2 File

- `build...AtStep.js` za generisanje stanja po koraku
- `describe-steps.js` za narrative i step metadata
- `feature-name.lesson.js` za finalni entry kontrakt

### 3.3 Funkcija

Koristi glagole sa jasnim semantičkim značenjem:

- `build` — generiše derived output za editor ili preview
- `show` — renderuje u postojeći DOM
- `create` — inicijalizuje stanje
- `find` — traži elemente
- `read` — čita strukturirane podatke
- `write` — zapisuje podatke
- `present` — prikazuje UX ili flow stanje
- `update` — menja reaktivan UI state
- `start` — pokreće lifecycle proces
- `stop` — zaustavlja lifecycle proces

---

## 4. Timeline authoring format

U timeline markdown fajlovima koristi se fluent i human-readable kontrakt:

- `when` — kada se blok primenjuje
- `into` — gde se ubacuje u finalni output
- `code` — koje linije se ubacuju

Primer:

```json
{
  "when": "cache_dom_price_period",
  "into": "cache-dom-body",
  "code": [
    "    if (!this.pricePeriodElement) {",
    "      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');",
    "    }",
    ""
  ]
}
````

### 4.1 Zašto ovi ključevi?

* `when` je prirodnije za learning flow nego `from`
* `into` je jasnije autoru nego `target`
* `code` je prirodnije od `lines` kada se gradi JS ili template modul

### 4.2 Pravilo

Timeline blok opisuje:

* step boundary
* insertion slot
* konkretan delta sadržaj

Ne opisuje kompletan fajl.

---

## 5. Build model: cumulative, ne overwrite

Svaki build file radi cumulative composition.

To znači:

* step 1 gradi minimalni output
* step 2 zadržava step 1 i dodaje novo
* step 3 zadržava prethodno i dodaje novo
* ne radi se full rewrite po step-u

Build sloj uvek radi:

* read structured markdown
* normalize blokove
* build lines at step
* vrati finalan source za editor i preview

---

## 6. CSS rules model

Za CSS koristi property-by-property rule blocks.

Primer shape:

```json
[
  {
    "header": ".price-card {",
    "showFrom": "base-card-shell",
    "entries": [
      { "line": "  display: grid;" },
      { "line": "  gap: 16px;" },
      { "from": "add-surface", "line": "  background: #fff;" }
    ]
  }
]
```

### Pravila

* `header` opisuje selector ili at-rule blok
* `showFrom` opisuje kada ceo blok postaje vidljiv
* `entries` su inkrementalne linije u tom bloku
* svaka entry može imati:

  * `from`
  * `untilBefore`
  * `line`

Ovo omogućava granularni CSS teaching flow bez full dupliciranja.

---

## 7. Parser i normalizacija dokumenta

Repo treba da zadrži male document utility-je sa jasnom odgovornošću:

* `parseFrontmatter(markdown)`
* `readFencedJsonValue(markdown)`
* `readTimelineBlocks(markdown)`
* `readRuleBlocks(markdown)`
* `renderMarkdown(markdown)`

### Pravilo parser sloja

Parser:

* čita
* validira
* normalizuje

Parser ne zna ništa o preview playback-u.

---

## 8. Slot marker build strategija

Za cumulative composition koristi slot marker pristup.

Primer ideje:

* root slot se kreira jednom
* timeline blokovi se ubacuju u named slotove
* posle build-a slot markeri se uklanjaju

Pravila:

* svaki `into` slot mora postojati
* ako slot ne postoji, baciti jasan error
* build rezultat ne sme sadržati preostale slot markere

---

## 9. Describe-steps kao teaching contract

`describe-steps.js` ne treba da bude parser helper, nego teaching contract.

On opisuje:

* step id
* step title
* step summary
* narration
* teaching intent
* eventualne UI reference

Ovo je izvor istine za:

* step list UI
* lesson summary
* progress logiku
* narrator panel

---

## 10. Lesson contract mora ostati čist

`feature-name.lesson.js` je kanonski entry.

On ne treba da sadrži business logiku parsera, nego da povezuje:

* metadata
* files
* step descriptions
* build funkcije

Dakle:

* parser utilities ostaju odvojeni
* build functions ostaju odvojene
* lesson file samo kompozira kontrakt

---

## 11. Animator engine kao runtime contract

Lesson architecture ne završava se na build/parser sloju. Potreban je i runtime animator engine koji prikazuje lekciju kadar-po-kadar.

Animator engine mora imati 4 jasna sloja:

1. `steps[]`

   * pedagoške celine
   * makro learning flow
   * source of truth za progression

2. `scenes[]`

   * mikro-kadrovi unutar jednog stepa
   * svaki scene opisuje samo promenu, ne kompletno stanje
   * podržava:

     * `next`
     * `prev`
     * `scrub`
     * `autoplay`

3. `code effects`

   * šta se vizuelno naglašava u code editoru
   * ne menjaju canonical source
   * menjaju samo presentation layer

4. `preview patches`

   * šta se menja u live preview-u
   * delta update model
   * bez full rerender-a

---

## 12. Source of truth pravilo

* `player state` je jedini source of truth za aktivni `step` i `scene`
* `GSAP` ili drugi animation layer služi samo za tranzicije
* animacija nikad ne sme držati lesson state
* `CodeMirror decorations` su vizuelni output, ne state model
* `preview executor` primenjuje patch-eve, ali ne odlučuje koji je kadar aktivan

Pravilo:

* state vodi animaciju
* animacija ne vodi state

---

## 13. Minimalni runtime format

Svaka lekcija pored build/parser sloja treba da može vratiti i runtime-friendly shape:

```js
const lesson = {
  lessonId: "08-build-pricing-card",
  lessonTitle: "Build Pricing Card",
  files: {
    html: "index.html",
    css: "style.css",
    js: "ui-pricing-card.js",
    templateJs: "ui-pricing-card.template.js",
    shadowCss: "ui-pricing-card.shadow.css"
  },
  steps: [
    {
      id: "billing-toggle",
      title: "Dodaj billing toggle",
      goal: "Uvesti monthly/yearly switch",
      scenes: [
        {
          id: "intro",
          label: "Dodaj toggle u template",
          narration: "Prvo uvodimo billing switch u markup.",
          code: [],
          preview: [],
          ui: []
        }
      ]
    }
  ]
};
```

---

## 14. Shared patch contract

Animator engine mora koristiti jedan zajednički patch contract za oba preview moda:

* `dom mode`
* `state mode`

Patch shape:

```js
const patch = {
  id: "",
  groupId: "",
  undoId: "",
  type: "",
  target: "",
  selector: "",
  name: "",
  value: null,
  detail: null,
  from: null,
  to: null,
  text: "",
  debugLabel: "",
  metadata: {
    reasons: [],
    tags: []
  }
};
```

### 14.1 Code patch tipovi

* `focusLines`
* `highlightRange`
* `showCallout`
* `insertLines`
* `replaceRange`
* `dimOthers`

### 14.2 Preview patch tipovi

* `setProp`
* `setText`
* `toggleClass`
* `setStyleVar`
* `dispatch`

Pravilo:

* isti scene payload
* različit executor po modu
* nikad dva različita DSL-a za DOM i state preview

---

## 15. Scene execution flow

`player.goTo(stepId, sceneId)` mora uvek raditi isti deterministički sled:

1. očisti prethodne editor dekoracije
2. očisti transient UI efekte
3. primeni `scene.code`
4. primeni `scene.preview`
5. primeni `scene.ui`
6. osveži narration
7. osveži progress indikator
8. opcionalno pokreni tranziciju

Svaki scene mora biti replayable bez ručne intervencije.

---

## 16. Prev / next / scrub pravila

### 16.1 next

* ide na sledeći scene u okviru tekućeg stepa
* ako ne postoji, prelazi na prvi scene sledećeg stepa

### 16.2 prev

* ide na prethodni scene
* koristi snapshot ako postoji
* inače replay od najbližeg snapshot-a

### 16.3 scrub

* mora biti stabilan i determinističan
* nikad ne zavisi od prethodnog animacionog frame-a
* uvek ide preko state + patch replay modela

---

## 17. Snapshot strategija

Zbog pouzdanog `prev()` i scrubbing-a, engine mora imati snapshot sistem.

Snapshot se može praviti:

* na kraju svakog stepa
* ili na svaka 2–4 scene

Snapshot čuva:

* aktivni file view state
* preview state
* aktivne props i attributes
* UI progress stanje

Pravilo:

* snapshot je optimization layer
* replay ostaje canonical fallback

---

## 18. Preview izvršavanje: DOM mode i state mode

### 18.1 DOM mode

Koristi se za brzi MVP.

Prednosti:

* brz proof-of-concept
* manje apstrakcije
* lako debugovanje

Mane:

* teže undo i replay ponašanje
* krhkiji selektori

### 18.2 State mode

Koristi se za stabilniji i dugoročniji engine.

Prednosti:

* replayable
* testable
* pogodniji za snapshot
* isti API za više preview komponenti

Preporuka:

* početi sa DOM mode executor-om
* zadržati isti patch contract
* kasnije dodati state executor bez menjanja lesson data formata

---

## 19. Code editor odgovornost

Code editor sloj ne menja source fajl, nego samo prezentuje fokus.

Odgovornosti:

* highlight aktivnih linija
* mark changed range
* dim non-relevant code
* widget i callout objašnjenja
* multi-file switching

Pravilo:

* canonical code ostaje build rezultat lekcije
* editor efekti su samo didaktički overlay

---

## 20. Animator engine file odgovornosti

Preporučena struktura:

* `lesson-player.js`

  * drži state
  * `goTo`
  * `next`
  * `prev`
  * `scrubTo`

* `apply-code-effects.js`

  * CodeMirror decorations
  * line, range i callout efekti

* `apply-preview-patches.js`

  * shared patch executor
  * DOM mode ili state mode

* `create-snapshot-store.js`

  * create i restore snapshot

* `resolve-scene.js`

  * pronalazi step i scene
  * vraća normalized payload

* `build-scene-runtime.js`

  * priprema scene za izvršavanje

---

## 21. Naming convention za runtime funkcije

Koristi isti imperativni stil kao u ostatku repo-a:

* `goToScene(stepId, sceneId)`
* `showSceneNarration(scene)`
* `applyCodeEffects(effects)`
* `applyPreviewPatches(patches)`
* `createSceneSnapshot(key)`
* `restoreSceneSnapshot(key)`
* `clearEditorDecorations()`
* `syncPreviewComponent(target)`
* `presentSceneProgress(stepIndex, sceneIndex)`

Izbegavati:

* `handleEverything`
* `runSceneStuff`
* `managePreview`

---

## 22. Lesson data validator proširenje

Pored postojećih validatora, dodati i animator validator koji proverava:

* da svaki `step` ima bar jedan `scene`
* da `scene.id` bude jedinstven unutar stepa
* da `scene.code` koristi dozvoljene code patch tipove
* da `scene.preview` koristi dozvoljene preview patch tipove
* da `file` reference u code efektima postoje u lesson file kontraktu
* da `target` reference u preview patch-evima postoje u preview registru
* da snapshot boundary ne pokazuje na nepostojeći scene

Predložene komande:

* `npm run lint:lessons`
* `npm run test:lesson-data`
* `npm run test:lesson-runtime`

---

## 23. MVP preporuka

Prvi vertical slice treba da bude samo jedan step:

* `billing-toggle`
* 3 do 5 scena
* DOM mode executor
* CodeMirror highlights
* `next`
* `prev`
* `goTo`
* 1 snapshot boundary

Ne širiti scope pre nego što taj flow postane stabilan.

---

## 24. Product contract za autora lekcije

Autor lekcije mora moći da napiše lesson bez menjanja engine koda.

To znači:

* scene payload mora biti čitljiv
* patch nazivi moraju biti intuitivni
* build output i runtime output moraju ostati sinhronizovani
* svaka scena mora biti reproducibilna iz podataka

Cilj:

* lesson author piše content
* engine izvršava contract
* preview ostaje veran source-u

---

## 25. Preporučeni redosled implementacije

### Faza 1 — cleanup postojećeg build sloja

* zaključati `feature-name.lesson.js` kontrakt
* standardizovati `when / into / code`
* standardizovati CSS rule blocks
* odvojiti parser utility-je od lesson entry fajlova

### Faza 2 — validator sloj

* validacija markdown frontmatter-a
* validacija timeline blokova
* validacija CSS rule blokova
* validacija lesson contract-a

### Faza 3 — runtime animator MVP

* `lesson-player.js`
* `apply-code-effects.js`
* `apply-preview-patches.js`
* snapshot store
* support za jedan step i 3–5 scena

### Faza 4 — prvi vertical slice

Implementirati:

* `billing-toggle`
* scene intro
* scene wire-events
* scene sync-price
* scene accessibility
* scene summary

### Faza 5 — stabilizacija

* proveriti `next`
* proveriti `prev`
* proveriti replay
* proveriti snapshot restore
* proveriti scrub

### Faza 6 — state preview executor

* zadržati isti patch contract
* dodati state mode bez promene lesson data shape-a
* pripremiti engine za više preview komponenti

---

## 26. Engineering guardrails

* GSAP nikad nije source of truth
* preview patch contract je isti za DOM i state executor
* replay mora raditi i bez snapshot-a
* snapshot ubrzava, ali nije jedini mehanizam
* scene uvek opisuju promenu, ne kompletan state
* editor overlay ne sme menjati canonical source
* build output i runtime output moraju ostati usklađeni

---

## 27. Konačna vizija

Sistem treba da omogući da jedna lekcija ima:

* jasan authoring format
* jasan build pipeline
* jasan runtime playback
* stabilan `next / prev / scrub`
* čitljiv code-focus prikaz
* live preview koji prati isti source contract

Drugim rečima:

* markdown i lesson data opisuju sadržaj
* build sloj pravi canonical source
* animator engine prikazuje kadar-po-kadar progres
* preview ostaje veran stvarnom kodu


---

## 28. Preporučeni bibliotečki stack

Za refactor i animator engine koristiti mali, namenski stack umesto jedne biblioteke koja pokušava da reši sve.

### 28.1 Core biblioteke

#### CodeMirror 6
Koristi se za code editor sloj.

Odgovornosti:
- highlight aktivnih linija
- range dekoracije
- callout/widget overlay
- dim neaktivnog koda
- multi-file prikaz

Pravilo:
- CodeMirror prikazuje fokus i promenu
- ne čuva lesson state
- ne menja canonical source

#### GSAP
Koristi se za scene tranzicije i playback animaciju.

Odgovornosti:
- scene transition
- progress animacija
- labels i timeline sekvenciranje
- autoplay i scrub animacija

Pravilo:
- GSAP nije source of truth
- player state vodi tok
- GSAP samo animira ono što je player već odlučio

#### Zod
Koristi se za validaciju lesson data kontrakta.

Odgovornosti:
- validacija lesson metadata
- validacija `steps[]`
- validacija `scenes[]`
- validacija patch tipova
- validacija build/runtime kontrakta

Pravilo:
- lesson data mora biti validan pre build-a i pre runtime izvršavanja

#### unified / remark
Koristi se za parsing markdown authoring fajlova.

Odgovornosti:
- parsing `.md` fajlova
- AST transformacije
- čitanje frontmatter-a
- čitanje fenced JSON blokova
- normalizacija timeline sadržaja

Pravilo:
- markdown je authoring source
- parser ga prevodi u build/runtime podatke

#### fast-glob
Koristi se za discovery build ulaza i lesson fajlova.

Odgovornosti:
- pronalaženje lesson foldera
- pronalaženje `.md` source fajlova
- build input discovery
- batch sync utility

Pravilo:
- discovery sloj ostaje odvojen od parser i runtime sloja

---

## 29. Opcione biblioteke

### 29.1 XState
XState ostaje opcija za kasniju fazu, ali nije obavezan za prvi POC.

Koristi se ako engine dobije:
- složeniji player state
- paralelne modove
- keyboard režime
- export flow
- kompleksniji undo/snapshot orchestration

Preporuka:
- ne uvoditi u MVP
- razmotriti u phase 2 kada plain JS player state postane tesan

### 29.2 Motion
Može biti lakša zamena za GSAP u manjem MVP-u, ali nije prvi izbor dok god je cilj stabilan scrub/replay animator engine.

### 29.3 Slidev / reveal.js
Nisu prioritet za lesson player unutar app-a.

Imaju smisla samo ako se isti content želi koristiti i kao:
- prezentacija
- slide deck
- workshop demo

---

## 30. Biblioteke po slojevima sistema

### 30.1 Authoring / build sloj
Koristiti:
- `Zod`
- `unified / remark`
- `fast-glob`

### 30.2 Runtime playback sloj
Koristiti:
- `CodeMirror 6`
- `GSAP`

### 30.3 Phase 2 orchestration sloj
Po potrebi dodati:
- `XState`

---

## 31. MVP stack odluka

Za prvi vertical slice koristiti:

- `CodeMirror 6`
- `GSAP`
- `Zod`
- `unified / remark`
- `fast-glob`

Ne uvoditi dodatne biblioteke dok sledeće ne postane stabilno:

- jedan step
- 3 do 5 scena
- `next`
- `prev`
- replay
- snapshot restore
- code highlight
- preview patch execution

---

## 32. Tehnološki guardrails

- ne tražiti jednu biblioteku za ceo sistem
- editor, parser, validator i animator ostaju odvojeni slojevi
- runtime playback i authoring build ne smeju deliti nejasne odgovornosti
- biblioteke birati po ulozi, ne po popularnosti
- svaka biblioteka mora imati jasno ograničen scope u arhitekturi

---

## 33. Polish i hardening sloj

Nakon što MVP animator engine postane stabilan, sledeća faza nije širenje feature-a nego hardening sistema.

Ova faza postoji da bi engine bio:

- pouzdan pri `next`, `prev`, `goTo`, `scrub`
- stabilan pri reconnect i replay scenarijima
- čitljiv za autora lekcije
- predvidiv za engine implementaciju
- spreman za veći broj lekcija bez rasta neuređenosti

Polish i hardening sloj ne menja osnovni model:

- `player state` ostaje source of truth
- `scene delta` ostaje deklarativni ulaz
- `animations` ostaju vizuelni izlaz
- `snapshot` i `inverse patch` ostaju mehanizmi za rewind, undo i recovery

Drugim rečima:

- state vodi sistem
- delta opisuje promenu
- animacija prikazuje promenu
- undo i snapshot vraćaju sistem u konzistentno stanje

---

## 34. Ključne invarijante sistema

Pre bilo kakvog polisha, engine mora čuvati sledeće invarijante:

### 34.1 Jedan source of truth (Copy-on-Write)

Aktivni lesson state mora živeti samo u player sloju koristeći copy-on-write mehanizam.

Pravilo:
- Scene authoring podaci su strogo immutable.
- Runtime nikada ne menja originalni lesson objekat.
- Svaka promena se vrši nad normalizovanom kopijom ili reaktivnim state objektom.

To uključuje:

- aktivni step
- aktivni scene
- aktivni file panel
- preview mode
- replay / autoplay status
- snapshot pointer
- eventualni scrub progress

Ne smeju biti source of truth:

- GSAP timeline
- CodeMirror decorations
- DOM preview stanje
- progress bar
- narrator panel

Svi oni su output slojevi.

### 34.2 Scene je delta, ne snapshot sveta

Svaki scene opisuje samo ono što se menja u odnosu na prethodno stanje.

Scene ne treba da nosi:

- kompletan preview HTML
- kompletan editor sadržaj
- kompletan set aktivnih klasa
- kompletan state preview komponente

Scene treba da nosi samo:

- code effects
- preview patches
- UI efekte
- optional metadata

### 34.3 Replay mora dati isti rezultat

Ako se isti scene pokrene više puta iz istog snapshot-a ili iz istog replay lanca, rezultat mora biti identičan.

Pravilo:

- scene izvršavanje mora biti determinističko
- ne sme zavisiti od prethodnog animation frame-a
- ne sme zavisiti od slučajnog DOM stanja van contract-a

---

## 35. `scene.ui` mora imati kontrolisan vocabular

`scene.ui` je koristan sloj, ali je i najlakši put ka haosu ako dobije previše slobodnih 0/1 flagova.

Zato ga treba držati kao ograničen vocabulary.

Preporučene grupe:

- `popover`
- `hidden`
- `motion`
- `css`

### 35.1 Preporučeni shape

```js
scene.ui = [
  {
    type: "popover",
    target: "code-panel",
    id: "price-period-note",
    title: "Zašto menjamo i /mo i /yr?",
    text: "Billing state utiče i na amount i na period label."
  },
  {
    type: "hidden",
    selector: ".preview-tip",
    value: false
  },
  {
    type: "motion",
    target: "preview-card",
    enter: "fade-in-up",
    exit: "fade-out",
    duration: 0.35
  },
  {
    type: "css",
    selector: ".lesson-shell",
    name: "--focus-ring-opacity",
    value: "1"
  }
];
````

### 35.2 Pravilo

`scene.ui` ne treba da postane paralelan preview DSL.

Njegova uloga je:

* pomoćni teaching UX
* fokus
* objašnjenje
* blagi vizuelni naglasak

Ne treba da preuzme odgovornost preview patch-eva.

---

## 36. Patch metadata hardening

Sirov patch shape nije dovoljan kada engine dobije:

* reconnect
* undo
* snapshot restore
* analytics
* debug replay
* future authoring lint

Zato svaki patch treba da podrži prošireni metadata sloj.

### 36.1 Preporučena metadata polja

```js
const patch = {
  id: "billing-set-yearly",
  undoId: "billing-set-monthly",
  groupId: "billing-toggle-sequence",
  type: "setProp",
  target: "pricing-card",
  name: "billing",
  value: "yearly",
  debugLabel: "Prebaci pricing card na yearly billing",
  metadata: {
    reasons: ["User toggled yearly billing switch"],
    tags: ["billing", "preview", "important"]
  }
};
```

### 36.2 Značenje polja

* `id`

  * jedinstveni identitet patch-a u okviru scene ili lesson-a
  * koristan za logging, testiranje i tracing

* `undoId`

  * referenca na inverse ili kompatibilan rollback patch
  * koristan za `prev`, reconnect i controlled undo

* `groupId`

  * veže više patch-eva u jednu logičku promenu
  * npr. price amount + price period + toggle state

* `debugLabel`

  * čitljiv tekst za devtools, logs i debug panel

* `metadata`

  * nosi `reasons` (opisi zašto se patch dešava) i `tags` (za filtriranje, analytics i linting)

### 36.3 Pravilo

`undoId` ne znači automatski da svaki patch mora imati hard-coded inverse.

Ali engine mora omogućiti bar jedno od sledećeg:

* inverse patch model
* snapshot restore model
* kombinovani model

Najzdraviji pristup:

* snapshot kao canonical optimization
* inverse patch kao fine-grained rewind where useful

---

## 37. `prereq` kao authoring i runtime guardrail

Za veće lekcije i future-linked checks, `step` i eventualno `scene` mogu imati `prereq`.

### 37.1 Preporučeni shape

```js
const step = {
  id: "billing-toggle",
  title: "Dodaj billing toggle",
  prereq: ["template-created", "shadow-css-ready"],
  scenes: []
};
```

Ili granularnije na scene nivou:

```js
const scene = {
  id: "sync-price",
  prereq: ["billing-toggle-wired"],
  code: [],
  preview: [],
  ui: []
};
```

### 37.2 Šta `prereq` rešava

* authoring validaciju
* future linked lessons
* conditional playback
* bolji error reporting
* zaštitu od nekonzistentnog reorder-a scena

### 37.3 Pravilo

`prereq` ne treba da bude skriveni runtime branch sistem.

Njegova primarna uloga je:

* validacija
* dokumentovanje zavisnosti
* zaštita od lošeg authoring-a

---

## 38. Enter / exit lifecycle za scene

Ako engine koristi GSAP ili sličan animation layer, `scene` može imati i blag enter/exit contract.

### 38.1 Preporučeni shape

```js
const scene = {
  id: "wire-events",
  label: "Bind evente",
  duration: 0.4,
  enter: [
    { type: "motion", target: "code-panel", preset: "fade-in" },
    { type: "motion", target: "preview-card", preset: "slide-up" }
  ],
  exit: [
    { type: "motion", target: "callout-panel", preset: "fade-out" }
  ],
  code: [],
  preview: [],
  ui: []
};
```

### 38.2 Pravilo

`enter` i `exit` ne smeju menjati canonical lesson state.

Njihova uloga je:

* tranzicija
* ritam
* osećaj kontinuiteta
* micro polish

Player i dalje određuje:

* koji je scene aktivan
* kada je scene gotov
* šta je sledeći scene
* kako radi `prev` i `scrub`

Animacioni sloj samo prati odluku player-a.

---

## 39. Undo model: inverse patch + snapshot hibrid

Za pouzdan rewind ne treba birati samo jedan pristup.

Najzdraviji model je hibrid:

* snapshot restore za veće skokove
* inverse patch za kratke lokalne korake

### 39.1 Runtime Inverse Generation

Inverse patch ne mora biti hardkodovan u lesson fajlu. Engine može (i treba) da generiše inverse u trenutku primene patch-a ("runtime pre-state").

* `setProp(new)` → engine pamti `setProp(old)`
* `toggleClass(cls)` → engine pamti `toggleClass(!cls)`

### 39.2 Snapshot kada koristiti

Koristi snapshot kada:

* prelaziš između step-ova
* imaš teže DOM/state promene
* scene ima mnogo patch-eva
* želiš stabilan `scrub`
* želiš brz recovery pri reconnect-u

### 39.3 Inverse patch kada koristiti

Koristi inverse patch kada:

* patch ima trivijalan rollback
* promena je mala i lokalna
* želiš glatki `prev` bez punog restore-a
* želiš precizniji debug

### 39.4 Preporučeno pravilo

* snapshot na kraju svakog stepa
* snapshot na svaka 2–4 scene
* inverse patch se generiše iz runtime stanja pre primene
* replay ostaje fallback ako nema snapshot-a ili inverse-a

---

## 40. Reconnect i restore strategija

Ako se preview reconnect-uje, iframe resetuje, ili live preview izgubi stanje, engine mora znati kako da se vrati u konzistentnu tačku.

### 40.1 Pravilo reconnect-a

Po reconnect-u:

1. restore najbliži validni snapshot
2. replay scene delta do aktivnog scene-a (deterministički)
3. ponovo primeni code effects
4. ponovo primeni UI overlay
5. tek onda nastavi playback

**Važno:** Ne koristiti "shortcut" metod matchovanja starih scena. Uvek preferirati deterministički replay od poznatog snapshot-a.

### 40.2 Šta reconnect ne sme da radi

* da “pogodi” stanje iz DOM-a
* da pretpostavlja poslednju animaciju
* da koristi GSAP progress kao state
* da preskoči preview sync

### 40.3 Zašto je ovo važno

Bez ovog pravila:

* `prev()` postaje nepouzdan
* scrub postaje krhak
* autoplay može da završi u polustanju
* debug postaje težak

---

## 41. Scene execution mora biti strogo faziran

Kako engine raste, važno je da scene execution ne bude jedna velika “runScene” funkcija bez discipline.

### 41.1 Preporučene faze

1. resolve scene payload
2. validiraj prereq i allowed patch types
3. očisti prethodne transient efekte
4. restore ili pripremi baseline state
5. primeni code effects
6. primeni preview patches
7. primeni UI overlays
8. odradi enter animacije
9. sync narration
10. sync progress
11. emit debug i analytics event

### 41.2 Zašto

Ovaj redosled daje:

* predvidivost
* manji broj race condition situacija
* lakši debugging
* lakše testiranje po fazama

---

## 42. Performance guardrails

Polish faza nije samo UX, nego i performanse.

### 42.1 Šta kontrolisati

* broj aktivnih CodeMirror decorations
* broj DOM query poziva po sceni
* broj repaint/reflow tačaka
* veličinu replay lanca bez snapshot-a
* broj simultanih animacija

### 42.2 Preporuke

* snapshot na fiksnim boundary-jima
* cache preview target reference gde je moguće
* grupisati patch-eve po target-u
* ne raditi full preview reset pri svakom scene-u
* gasiti stare UI overlay efekte pre novih

### 42.3 Pravilo

Polish ne sme da uvede “vizuelno lep, ali runtime skup” sistem.

---

## 43. Accessibility hardening

Kadar-po-kadar engine mora ostati pristupačan.

### 43.1 Obavezni smerovi

* keyboard `next/prev`
* fokus ne sme da se gubi pri scene promeni
* narration panel treba da bude čitljiv assistive tech-u
* autoplay mora moći da se pauzira
* motion heavy scene mora imati reduced-motion fallback

### 43.2 Za `scene.ui`

Ako koristiš popover/callout:

* mora imati jasan focus model
* ne sme blokirati osnovni flow bez escape mehanizma
* ne sme vizuelno postojati bez tekstualnog ekvivalenta gde je bitno

### 43.3 Pravilo

Teaching polish ne sme doći po cenu pristupačnosti.

---

## 44. Observability i debug sloj

Kako engine sazreva, treba mu interni debug pogled.

### 44.1 Lifecycle Hooks

Engine treba da emituje evente na koje se mogu zakačiti external alati (analytics, debug UI, tests):

* `onSceneEnter(sceneId)`
* `onSceneExit(sceneId)`
* `onPatchApplied(patch)`
* `onSnapshotCreated(id)`
* `onSnapshotRestored(id)`

### 44.2 Korisni debug output-i

* aktivni `stepId`
* aktivni `sceneId`
* poslednji primenjeni patch IDs
* snapshot key
* replay source
* preview mode
* animation status
* failed prereq log

### 44.3 Korisni događaji

* `scene:enter`
* `scene:exit`
* `scene:replay`
* `snapshot:create`
* `snapshot:restore`
* `patch:apply`
* `patch:undo`
* `prereq:fail`

### 44.4 Zašto

Ovo dramatično olakšava:

* testiranje
* reprodukciju bugova
* authoring greške
* perf istrage

---

## 45. Playback Profili

Engine treba da podržava različite režime rada zavisno od konteksta (development, demo, test).

### 45.1 Profili

1. **Normal**
   * Standardni user timing.
   * Poštuje `duration` i animacije.
   * Koristi se za krajnje korisnike.

2. **Slow**
   * Usporeni timing (npr. 0.5x ili fiksni delay).
   * Naglašava tranzicije.
   * Koristi se za prezentacije ili debugging brzih promena.

3. **Instant (Headless)**
   * `duration: 0` za sve tranzicije.
   * Preskače vizuelne efekte (fade, slide).
   * Koristi se za automated testing, fast-forward, ili inicijalni load stanja.

---

## 46. Lint pravila za authoring hardening

Kako lesson data raste, moraš rano sprečiti authoring drift.

### 46.1 Predložena pravila

* svaki patch mora imati validan `type`
* svaki `id` mora biti jedinstven bar unutar scene
* `undoId` mora pokazivati na postojeći inverse ili dozvoljenu fallback strategiju
* `groupId` ne sme mešati nepovezane promene
* `prereq` mora pokazivati na definisane capability ili milestone vrednosti
* `scene.ui` tip mora biti iz dozvoljenog vocabulara
* `duration` mora biti numerički i u dozvoljenom opsegu
* `enter` i `exit` ne smeju sadržati state mutation patch tipove

### 46.2 Dobit

* manje implicitnog ponašanja
* manje ručnih pretpostavki
* čitljiviji lesson files
* sigurniji refactor

---

## 47. Test strategija za hardening fazu

Polish sloj mora biti pokriven testovima, ne samo manuelnim klikom.

### 47.1 Jedinični testovi

Pokriti:

* patch normalizaciju
* prereq validaciju
* snapshot create/restore
* inverse patch mapping
* scene resolve redosled
* replay determinističnost

### 47.2 Integracioni testovi

Pokriti:

* `next` kroz ceo step
* `prev` preko snapshot boundary-ja
* `scrubTo(scene)` iz više pozicija
* reconnect + restore
* DOM mode i state mode sa istim lesson payload-om

### 47.3 Regression testovi

Za svaki ozbiljniji bug napraviti:

* minimalni lesson fixture
* očekivani scene sequence
* očekivani preview outcome
* očekivani debug log

---

## 48. Definition of done za hardening fazu

Polish i hardening faza je gotova tek kada sledeće važi:

* `next`, `prev`, `goTo`, `scrub` su deterministički
* reconnect vraća konzistentno stanje
* snapshot restore je pouzdan
* inverse patch ne uvodi state drift
* `scene.ui` ne raste nekontrolisano
* `prereq` hvata authoring greške rano
* GSAP je isključivo vizuelni sloj
* debug panel jasno pokazuje scene execution
* reduced-motion i keyboard flow rade
* isti lesson payload može da radi u DOM i state preview modu

---

## 49. Preporučeni redosled uvođenja hardening detalja

Ove stvari ne uvoditi sve odjednom.

### Faza A — metadata i guardrails

* dodati `id`
* dodati `groupId`
* dodati `debugLabel`
* dodati ograničeni `scene.ui` vocabulary

### Faza B — rollback stabilnost

* dodati `undoId`
* uvesti inverse patch map gde ima smisla
* zaključati snapshot boundary pravila

### Faza C — authoring pouzdanost

* dodati `prereq`
* dodati lint za `scene.ui`
* dodati lint za `enter/exit`

### Faza D — playback polish

* dodati `duration`
* dodati `enter`
* dodati `exit`
* dodati reduced-motion fallback

### Faza E — observability

* debug event log
* scene execution inspector
* snapshot inspector
* patch trace panel

---

## 50. Konačni hardening cilj

Animator engine ne treba samo da “radi”.

Treba da bude:

* replayable
* rewindable
* authorable
* testable
* debuggable
* performant
* pristupačan

Idealni završni model izgleda ovako:

* `player state` odlučuje šta je aktivno
* `scene delta` opisuje šta se menja
* `code effects` i `preview patches` izvršavaju promenu
* `scene.ui` pomaže učenju bez preuzimanja state odgovornosti
* `GSAP` samo vizuelno prati tranziciju
* `snapshot` i `inverse patch` obezbeđuju stabilan rewind i restore
* `prereq` i lint pravila štite authoring sloj
* debug sloj omogućava da svaki scene bude objašnjiv i proverljiv

---

```
```
