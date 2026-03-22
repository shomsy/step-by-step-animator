# AGENTS

Ovaj fajl je kanonski operativni ugovor za rad nad ovim repo-om.

## 1. Product Intent

Ovaj repo je `Step By Step Animator`.

To je lesson engine za interaktivne HTML/CSS/JS lekcije koje treba da izgledaju kao da gledaš programera preko share screen-a.

Engine je generičan.

Trenutno isporučene lekcije su:

- `build-sidebar`
- `build-top-navigation`
- `build-callout-custom-element`
- `build-feature-callout-web-component`

Svaka nova lekcija mora da koristi isti shell i isti teaching model:

- HTML ide element po element
- CSS ide property po property
- kada lekcija to traži, JS ide akciju po akciju
- preview prikazuje tačno isti kumulativni HTML/CSS/JS koji je trenutno napisan
- promene moraju da budu jasne, predvidive i lake za verbalno objašnjavanje
- kod Web Components lekcija, prvo JS mora da napravi stvarni renderovani DOM, pa tek onda CSS sme da stilizuje te delove

Ovo nije showcase.
Ovo nije fake storyboard.
Ovo je teaching product.

## 2. Technical Contract

### 2.1 Architecture Shape

Repo prati business-first screaming architecture.

Tree čitaš ovim redom:

1. flow
2. feature slice
3. file responsibility
4. function action

Root je namerno podeljen na dve celine:

- `animator/` je tehnički runtime, shell, playback i document tooling
- `lessons/` su business lesson slice-ovi i njihov sadržaj

Aktuelni kanonski shape:

```txt
animator/
  choose-lesson/
    select-lesson-from-location.js
    present-lesson-picker.js
  play-lesson/
    play-lesson.pipeline.js
    lesson-player.css
    escape-inline-text.js
    01-start-lesson/
      find-lesson-parts.js
      create-lesson-progress.js
      show-lesson-shell.js
    02-follow-lesson/
      listen-for-lesson-keys.js
      show-active-lesson-panel.js
      show-current-step.js
      show-step-timeline.js
    03-watch-code/
      compare-code-lines.js
      describe-css-line-role.js
      escape-code-text.js
      scroll-to-added-line.js
      show-growing-code.js
    04-watch-preview/
      show-current-preview.js
    05-download-lesson-files/
      download-lesson-files.js
    find-step/
      present-step-finder.js
    save-step/
      read-saved-step-numbers.js
      write-saved-step-numbers.js
      show-saved-step-list.js
      remember-saved-steps.js
    choose-theme/
      choose-theme.js
  lesson-documents/
    build-lines-from-rule-blocks.js
    build-lines-from-timeline-blocks.js
    parse-frontmatter.js
    read-fenced-json-value.js
    render-markdown.js
    read-lesson-metadata.js
    read-rule-blocks.js
    read-timeline-blocks.js
    sync-lesson-documents.js
lessons/
  register-lessons.js
  build-sidebar/
    build-sidebar.lesson.js
    describe-steps.js
    build-html-at-step.js
    build-css-at-step.js
    content/
      documents/
        build_sidebar.md
        files/
          lesson.sr.md
          html.timeline.md
          css.rules.md
  build-feature-callout-web-component/
    build-feature-callout-web-component.lesson.js
    describe-steps.js
    build-html-at-step.js
    build-css-at-step.js
    build-js-at-step.js
    content/
      assets/
        feature-callout-goal.svg
      documents/
        build_feature_callout_web_component.md
        files/
          lesson.sr.md
          html.timeline.md
          css.rules.md
          js.timeline.md
  build-callout-custom-element/
    build-callout-custom-element.lesson.js
    describe-steps.js
    build-html-at-step.js
    build-css-at-step.js
    build-js-at-step.js
    content/
      assets/
        callout-custom-element-goal.svg
      documents/
        build_callout_custom_element.md
        files/
          lesson.sr.md
          html.timeline.md
          css.rules.md
          js.timeline.md
  build-top-navigation/
    build-top-navigation.lesson.js
    describe-steps.js
    build-html-at-step.js
    build-css-at-step.js
    content/
      assets/
        top-navigation-goal.svg
      documents/
        build_top_navigation.md
        files/
          lesson.sr.md
          html.timeline.md
          css.rules.md
```

### 2.2 Lesson Contract

Svaka nova lesson slice mora da isporuči jedan root lesson file:

```txt
feature-name.lesson.js
```

Taj file mora da vrati kompletan lesson contract:

- `lessonId`
- `lessonTitle`
- `lessonIntro`
- `previewAddress`
- `previewTitle`
- `htmlFileName`
- `cssFileName`
- `jsFileName` kada lekcija zaista ima JavaScript fajl
- `steps`
- `buildHtmlAtStep`
- `buildCssAtStep`
- `buildJsAtStep` kada lekcija traži živi JavaScript u preview-u

Opciona lesson shell polja kada želiš da pokažeš vizuelni cilj i homework:

- `goalTitle`
- `goalImageSrc`
- `goalImageAlt`
- `goalImageCaption`
- `homeworkTitle`
- `homeworkItems`

Ne uvoditi paralelne lesson shape-ove.

### 2.3 Lesson Documents

Lekcija može da ima markdown source dokumente unutar:

```txt
feature-name/
  content/
    documents/
      files/
        lesson.sr.md
        html.timeline.md
        css.rules.md
        js.timeline.md
```

Ako lesson ima referentnu sliku cilja, asset ide ovde:

```txt
feature-name/
  content/
    assets/
      feature-goal.svg
```

Pravila:

- `lesson.sr.md` je kanonski source za title, intro i lesson metadata
- `html.timeline.md` je kanonski source za kumulativni HTML teaching tok
- `css.rules.md` je kanonski source za CSS rule blokove koji rastu property po property
- `js.timeline.md` je opcioni kanonski source za kumulativni JavaScript teaching tok
- generated book output ide u `content/documents/<lesson_name>.md`
- generated output se ne uređuje ručno
- `build-html-at-step.js`, `build-css-at-step.js` i `build-js-at-step.js` ostaju tanki adapteri koji parsiraju markdown DSL i vraćaju linije za dati step

### 2.4 Runtime and Entry Rules

- nema `src/` foldera
- `main.js` je root entry
- `index.html` je generičan lesson shell
- `sidebar-step-by-step.html` je kompatibilni alias za `build-sidebar`
- build ide kroz Vite
- repo je podeljen na `animator/` i `lessons/`
- business lekcije žive pod `lessons/`
- tehnički player runtime i markdown tooling žive pod `animator/`
- kanonski player entry ostaje `animator/play-lesson/play-lesson.pipeline.js`

### 2.5 Naming Rules

Koristi ovaj filter pre svakog novog imena:

> If the folder does not say the flow, the file does not say the responsibility, or the function does not say the exact action, the name is not good enough.

Zabranjeni bucket nazivi:

- `utils`
- `helpers`
- `shared`
- `common`
- `base`
- `manager`
- `service`
- `controller`

Zabranjeni glagoli:

- `handle`
- `run`
- `process`
- `manage`
- `doStuff`

### 2.6 Vocabulary Rules

U ovom repo-u glagoli imaju zaključano značenje:

- `build...` gradi izveden lesson output za konkretan step
- `show...` upisuje trenutno stanje u već pronađene page parts
- `present...` drži interaktivni user flow
- `create...` inicijalizuje progress za tok
- `find...` pronalazi postojeće page delove u DOM-u ili u listi
- `read...` čita iz persistence sloja
- `write...` upisuje u persistence sloj
- `play...` orkestrira kompletan lesson flow

Ne uvoditi novu sinonimsku generaciju ako postojeći glagol već pokriva odgovornost.

### 2.7 Numbering Rules

Brojevi se koriste samo na flow folderima kada redosled zaista nosi značenje u product story-ju.

U player runtime-u to važi za glavni lesson journey:

- `01-start-lesson`
- `02-follow-lesson`
- `03-watch-code`
- `04-watch-preview`
- `05-download-lesson-files`

Pomoćni tokovi ostaju bez brojeva:

- `find-step`
- `save-step`
- `choose-theme`

Ne numerisati responsibility fajlove.

### 2.8 Preview Integrity Rules

Desni preview mora da bude stvarni render istog kumulativnog HTML/CSS/JS koda koji middle panel prikazuje.

To znači:

- nema ručno režiranog fake preview-a
- nema posebnog preview DOM-a koji odstupa od lesson koda
- preview mora da se hrani iz istih builder funkcija koje hrani lesson contract
- HTML preview mora da pokaže sirov browser rezultat kada CSS još nije dodat
- CSS preview mora da utiče samo onoliko koliko je trenutno napisano
- JS preview mora da izvršava tačno isti kumulativni JavaScript koji middle panel trenutno prikazuje

### 2.8a Teaching Visibility Rules

Ova pravila važe za sve lekcije, bez izuzetka:

- `.app-shell` mora da dobije svoj tanak helper outline i da ga zadrži kroz celu lekciju, sve do završnog shell rezimea
- svaki važan HTML element ili teaching celina mora da dobije svoj tanak helper outline što ranije
- taj outline ne skidaš odmah kada dodaš prvi završni stil
- outline ostaje aktivan do završnog rezime koraka za taj element ili celinu
- završni rezime korak za dati element treba da pokaže njegov kompletan CSS i tek tada ugasi helper outline
- dok je aktivan CSS korak za određeni element, odgovarajući HTML target u editor panelu mora da bude jasno žuto označen

### 2.9 Verification Rules

Posle svake veće izmene obavezno pokreni:

```bash
find animator lessons -name '*.js' -print0 | xargs -0 -n1 node --check && node --check main.js
npm run sync:lesson-documents
npm run build
./merge-files.sh .
```

Ako menjaš dokumentaciju ili flow tree, osveži i merge dump.

### 2.10 Delivery Discipline

Na kraju svakog većeg završenog rada obavezna je završna disciplina iz root-a repoa.

To znači:

1. pokreni `./merge-files.sh .` iz root-a
2. uradi `git add -A`
3. napravi normalan `git commit`
4. uradi `git push`

Ne završavaj ozbiljan implementation pass bez ovog zatvaranja, osim ako korisnik eksplicitno traži da se ne commituje ili ne pushuje.

## 3. Feature Contract

Za pravljenje novih animiranih lekcija i AI prompt šablon pogledaj [LESSON_AUTHORING.md](/home/shomsy/projects/step-by-step-animator/LESSON_AUTHORING.md).

### 3.1 Lesson Layout

Aplikacija ima tri glavna panela:

1. levi lesson panel
2. srednji live editor panel
3. desni live preview panel

Levi panel:

- prikazuje trenutni korak
- prikazuje opis i pro tip
- prikazuje progress
- sadrži bookmark tok
- sadrži kontrole za navigaciju i playback

Srednji panel:

- prikazuje HTML fajl
- prikazuje CSS fajl
- kada lekcija to traži, prikazuje i JS fajl
- svi prikazi su kumulativni
- postojeće linije su muted
- novo dodate linije su naglašene
- kada je aktivan CSS korak, HTML deo za isti element mora da bude žuto istaknut

Desni panel:

- zauzima ceo viewer panel
- imitira browser
- renderuje stvarni kumulativni HTML/CSS/JS output

### 3.2 Current Shipped Lessons

`build-sidebar` je referentna lekcija za engine.

`build-top-navigation` pokazuje dodatni shell capability:

- goal sliku koja pokazuje šta gradimo
- homework napomene za varijante koje još ne implementiramo

Za nju i dalje važe posebna teaching pravila:

- počinje praznim `.app-shell` prostorom
- sidebar se dodaje kao prva stvar
- nema filler sadržaja van onoga što lekcija zaista objašnjava
- helper linije i pomoćni borderi ostaju dok se ne završi cela vizuelna celina
- outline helperi ostaju do završnog rezime koraka za dati element ili celinu, pa se tek tada uklanjaju

`build-callout-custom-element` otvara Web Components put:

- host tag sa crticom
- registraciju kroz `customElements.define`
- atribut API
- prvi render kroz light DOM

`build-feature-callout-web-component` je Web Components nastavak:

- treći, opcioni JS fajl u middle panelu
- stvarni live preview koji izvršava isti kumulativni JavaScript
- Web Components teaching tok kroz custom element, shadow DOM, slot i lifecycle

### 3.3 How To Add A New Lesson

Za novu lekciju:

1. napravi novi feature folder pod `lessons/`
2. dodaj root `feature-name.lesson.js`
3. dodaj `describe-steps.js`
4. dodaj `build-html-at-step.js`
5. dodaj `build-css-at-step.js`
6. kada lekcija traži JavaScript, dodaj `build-js-at-step.js`
7. dodaj `content/documents/files/lesson.sr.md`
8. dodaj `content/documents/files/html.timeline.md`
9. dodaj `content/documents/files/css.rules.md`
10. kada lekcija traži JavaScript, dodaj `content/documents/files/js.timeline.md`
11. po potrebi dodaj `content/assets/feature-goal.svg`
12. registruj lekciju u `lessons/register-lessons.js`

Ne kopirati player runtime iz `animator/play-lesson/`.
Nova lekcija treba da doda samo svoj contract i svoj content.
