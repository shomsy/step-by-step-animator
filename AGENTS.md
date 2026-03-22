# AGENTS

Ovaj fajl je kanonski operativni ugovor za rad nad ovim repo-om.

## 1. Product Intent

Ovaj repo je `Step By Step Animator`.

To je lesson engine za interaktivne HTML/CSS lekcije koje treba da izgledaju kao da gledaš programera preko share screen-a.

Engine je generičan.

Trenutno isporučena lekcija je:

- `build-sidebar`

Svaka nova lekcija mora da koristi isti shell i isti teaching model:

- HTML ide element po element
- CSS ide property po property
- preview prikazuje tačno isti kumulativni HTML/CSS koji je trenutno napisan
- promene moraju da budu jasne, predvidive i lake za verbalno objašnjavanje

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

Aktuelni kanonski shape:

```txt
teach-lessons/
  list-lessons.js
  find-selected-lesson.js
  teach-lesson/
    teach-lesson.pipeline.js
    lesson-shell.css
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
    05-check-understanding/
      create-knowledge-check-progress.js
      present-knowledge-check.js
      show-knowledge-check-question.js
      show-knowledge-check-score.js
    06-download-lesson-files/
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
          quiz.sr.md
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
- `steps`
- `buildHtmlAtStep`
- `buildCssAtStep`
- `knowledgeCheckQuestions`

Ne uvoditi paralelne lesson shape-ove.

### 2.3 Lesson Documents

Lekcija može da ima markdown source dokumente unutar:

```txt
feature-name/
  content/
    documents/
      files/
        lesson.sr.md
        quiz.sr.md
```

Pravila:

- `lesson.sr.md` je kanonski source za title, intro i lesson metadata
- `quiz.sr.md` je kanonski source za knowledge check pitanja
- generated book output ide u `content/documents/<lesson_name>.md`
- generated output se ne uređuje ručno
- interaktivni HTML/CSS step builderi i dalje ostaju strogo definisani u JS-u dok ne uvedemo poseban step markdown DSL

### 2.4 Runtime and Entry Rules

- nema `src/` foldera
- `main.js` je root entry
- `index.html` je generičan lesson shell
- `sidebar-step-by-step.html` je kompatibilni alias za `build-sidebar`
- build ide kroz Vite
- kanonski engine entry ostaje `teach-lessons/teach-lesson/teach-lesson.pipeline.js`

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
- `teach...` orkestrira kompletan lesson flow

Ne uvoditi novu sinonimsku generaciju ako postojeći glagol već pokriva odgovornost.

### 2.7 Numbering Rules

Brojevi se koriste samo na flow folderima kada redosled zaista nosi značenje u product story-ju.

U engine-u to važi za glavni lesson journey:

- `01-start-lesson`
- `02-follow-lesson`
- `03-watch-code`
- `04-watch-preview`
- `05-check-understanding`
- `06-download-lesson-files`

Pomoćni tokovi ostaju bez brojeva:

- `find-step`
- `save-step`
- `choose-theme`

Ne numerisati responsibility fajlove.

### 2.8 Preview Integrity Rules

Desni preview mora da bude stvarni render istog kumulativnog HTML/CSS koda koji middle panel prikazuje.

To znači:

- nema ručno režiranog fake preview-a
- nema posebnog preview DOM-a koji odstupa od lesson koda
- preview mora da se hrani iz istih builder funkcija koje hrani lesson contract
- HTML preview mora da pokaže sirov browser rezultat kada CSS još nije dodat
- CSS preview mora da utiče samo onoliko koliko je trenutno napisano

### 2.9 Verification Rules

Posle svake veće izmene obavezno pokreni:

```bash
find teach-lessons -name '*.js' -print0 | xargs -0 -n1 node --check && node --check main.js
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
- oba prikaza su kumulativna
- postojeće linije su muted
- novo dodate linije su naglašene

Desni panel:

- zauzima ceo viewer panel
- imitira browser
- renderuje stvarni kumulativni HTML/CSS output

### 3.2 Current Shipped Lesson

`build-sidebar` je referentna lekcija za engine.

Za nju i dalje važe posebna teaching pravila:

- počinje praznim `.app-shell` prostorom
- sidebar se dodaje kao prva stvar
- nema filler sadržaja van onoga što lekcija zaista objašnjava
- helper linije i pomoćni borderi ostaju dok se ne završi cela vizuelna celina

### 3.3 How To Add A New Lesson

Za novu lekciju:

1. napravi novi feature folder pod `teach-lessons/`
2. dodaj root `feature-name.lesson.js`
3. dodaj `describe-steps.js`
4. dodaj `build-html-at-step.js`
5. dodaj `build-css-at-step.js`
6. dodaj `content/documents/files/lesson.sr.md`
7. dodaj `content/documents/files/quiz.sr.md`
8. registruj lekciju u `teach-lessons/list-lessons.js`

Ne kopirati shell iz `teach-lesson/`.
Nova lekcija treba da doda samo svoj contract i svoj content.
