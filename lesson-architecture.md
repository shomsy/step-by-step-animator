# Lesson Architecture Guidelines

Ovaj dokument opisuje pune postupke i arhitekturu za lekcije u repo-u `step-by-step-animator`.
Cilj je da struktura bude:

- flow-prvi (brojevi u folderima) 
- feature-slice (specifična lekcija) 
- file odgovornost (jasno razgraničene uloge) 
- funkcija precizna akcija 

---

## 1. Osnovni princip: flow → feature → file → funkcija

1. `flow` folder u root `lessons/` drži sekvencijalni proizvodni (learning)-put, npr:
   - `01-build-sidebar`
   - `02-build-top-navigation`
   - ...
   - `08-smell-of-enterprise`

2. `feature` folder je pojedinačna lekcija/component feature.
   - koristi `feature-name.lesson.js` kao kanonski komponovani kontrakt (pipeline/entry)
   - opisuje title, metadata, preview, files i steps

3. `file` unutar feature slajs-a
   - `describe-steps.js`: business flow for each step + narration
   - `build-html-at-step.js`: parser timeline (html)
   - `build-css-at-step.js`: parser rules (css)
   - `build-js-at-step.js`: parser timeline (js) (ako ima JS)
   - `build-shadow-css-at-step.js`: parser za shadow CSS (ako ima)
   - `build-template-js-at-step.js`: parser za component template module (ako ima)

4. `funkcija` u file-u
   - mala i precizna odgovornost, npr:
     - `normalizeTierValue(value)`
     - `updatePrice()`
     - `cacheDom()`
   - mora izričito reći šta radi: `verb + object` (izbjegavaj generičke `handle`, `run`, `manage`)

---

## 2. Lessons u praksi: feature pekap i canonical contract

### 2.1 lesson file

`lessons/<feature>/feature-name.lesson.js` vraća:

- `lessonId`
- `lessonTitle`
- `lessonIntro`
- `previewAddress` / `previewTitle`
- `htmlFileName`, `cssFileName`
- `jsFileName` (ako ima JS)
- `templateJsFileName` (ako ima template JS)
- `shadowCssFileName` (ako ima shadow CSS)
- `steps`
- `buildHtmlAtStep`, `buildCssAtStep`
- `buildJsAtStep`, `buildTemplateJsAtStep`, `buildShadowCssAtStep` po potrebi
- opcionalno: `goalTitle`, `goalImageSrc`, `goalImageAlt`, `homeworkTitle`, `homeworkItems`

### 2.2 struktura content/documents

- `content/documents/files/lesson.sr.md` (meta + primarni autoring)
- `content/documents/files/html.timeline.md` (cumulative HTML timeline)
- `content/documents/files/css.rules.md` (property-by-property rule builder)
- `content/documents/files/js.timeline.md` (cumulative JS timeline)
- `content/documents/files/template-js.timeline.md` (template module timeline)
- `content/documents/files/shadow-dom-style.css.md` (shadow CSS timeline)

---

## 3. Kodeks imenovanja (imperativni stil)

### 3.1 Folder

- `01-...`, `02-...` etc po delivery flow, kako si već naveo
- ne stavljati `utils`, `shared`, `common`, `base`, `controller` u lekcijske foldere

### 3.2 File

- `build...AtStep.js` za trenutačne korake
- `describe-steps.js` za narrative + steps metadata

### 3.3 Funkcija

- koristi glagole iz `AGENTS.md` tako što semantički znače:
  - `build` — generiše derived output za editor/preview
  - `show` — render u postojeći DOM
  - `create` — inicijalizuje stanje
  - `find` — traži elemente (query-ready)
  - `read`/`write` — persistence
  - `present` — UX/flow
  - `update` — reaktivan UI state
  - `stop`/`start` — lifecycle

---

## 4. Koraci u `lessons/<feature>/content/documents/files/js.timeline.md`

Sadržaj generiše se u blokovima:
- `from`: naziv koraka (služi za stepNumber granice)
- `target`: slot gde se ubacuje (root, class-head, cache-dom-body, itd.)
- `lines`: niz stringova koji definišu linije koda

Primer:

```json
{
  "from":"cache_dom_price_period",
  "target":"cache-dom-body",
  "lines":[
    "    if (!this.pricePeriodElement) {",
    "      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');",
    "    }",
    ""
  ]
}
```

---

## 5. Dizajn pattern za modularnu lekciju

### 5.1 Glavne zone (dummy architecture)

1. `01-start-lesson` (setup + fallback checks)
2. `02-follow-lesson` (keystroke navigation)
3. `03-watch-code` (generiše leve code snippet pane)
4. `04-watch-preview` (render preview i DOM updates)
5. `05-download-lesson-files` (ZIP/manifest export)

### 5.2 Feature korak (step-level)

- Kada je feature sekvencijalan, svaki node u koraku vodi po jedan micro-flow:
  - `html.timeline` → `build-html-at-step` → `parse`→code lines
  - `css.rules` → `build-css-at-step` → `parse`→style lines
  - `js.timeline` → `build-js-at-step` → `parse`→script lines

- Prednost:
  - svaki `step` je determinističan; gde se menja URL, to je step boundary
  - same data source linije se koriste i za lesson dokument, i za runtime preview

---

## 6. Vizualna konsistencija i checker

1. `main.js` + `lessons/register-lessons.js` vode registraciju i routing.
2. `lessons/**/describe-steps.js` mora reprouzdeliti deo UI flowa.
3. `lessons/**/content/documents/**/*.md` se sinkronizuje u `demo-md` izlaz sa `npm run sync:lesson-documents` 
4. Svaka izmena u lesson-level kodu obavezno: 
   - `node --check` svih JS fajlova
   - `npm run sync:lesson-documents`
   - `npm run build`
   - `./merge-files.sh .`

---

## 7. Recommendation: “step-1/step-2/... content refactor”

### 7.1 Struktura (future-proof)

```
lessons/feature-name/
  step-01/
    html/
      html.timeline.md
    css/
      css.rules.md
    js/
      js.timeline.md
  step-02/
  ...
```

### 7.2 Koja je prednost
- jasno gde se menja svaki segment
- lako je parseru da automatizuje output (glue scripts)
- možda u budućnosti `step-01` validatori, `step-01` checkpoints

---

## 8. Lessons are a product contract

- svaka lekcija se piše uz uverenje da su `HTML`, `CSS`, `JS` autentični, kumulativni i reproducibilni
- ne dozvoljavaj shadow copy preview kod koji odstupa od lesson source
- potreban je per-step “manual checklist” u step metadata (ili `lesson.sr.md` callouts)

---

## 9. Predlog za novo `lesson-structure` follow-up task

- ugradi validator koji proverava:
  - `observedAttributes` u JS vs `attribute` in HTML example
  - `billing` kolokacije (`/mo` vs `/yr`) vs cena: `price-yearly` treba da bude godišnji, a ne mesečni
  - `popular` attribute path: `JS` or `CSS-only`

- `npm run lint:lessons` plus `npm run test:lesson-data`

---

## 10. Epilog

Ovaj fail je idejni standard za `step-by-step-animator` lekcijski sistem: čitljivost, strogoću i enterprise-grade kontrolu. Po ovoj arhitekturi, novi autori bi trebalo da dobiju:

- minimalan bootstrap
- precizno page convention
- lako proširive i refaktorisane korake
- robustan testable flow
