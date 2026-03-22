# AGENTS

Ovaj fajl je kanonski operativni ugovor za rad nad ovim repo-om.

Ne služi kao generički style guide. Služi da svaki sledeći agent ili developer zna:

1. kako je repo organizovan
2. kako se imenuju folderi, fajlovi i funkcije
3. kako feature mora da se ponaša
4. šta ne sme da se pokvari

## 1. Product Intent

Ovaj repo je interaktivna lekcija koja uči korisnika kako da izgradi moderan sidebar.

Aplikacija mora da daje osećaj kao da gledaš programera preko share screen-a:

- HTML se pojavljuje korak po korak
- CSS se pojavljuje property po property
- preview prikazuje tačno isti kumulativni HTML/CSS koji je trenutno napisan
- promene moraju da budu jasne, predvidive i lake za verbalno objašnjavanje

Ovo nije statični showcase.
Ovo nije lažni storyboard.
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
teach-components/
  build-sidebar/
    build-sidebar.pipeline.js
    lesson.css
    escape-inline-text.js
    01-start-lesson/
      find-lesson-parts.js
      create-lesson-progress.js
    02-follow-lesson/
      lesson-step-script.js
      listen-for-lesson-keys.js
      show-active-lesson-panel.js
      show-current-step.js
      show-step-timeline.js
    03-watch-code/
      build-html-at-step.js
      build-css-at-step.js
      compare-code-lines.js
      describe-css-line-role.js
      escape-code-text.js
      scroll-to-added-line.js
      show-growing-code.js
    04-watch-sidebar/
      show-current-sidebar.js
    05-check-understanding/
      create-knowledge-check-progress.js
      knowledge-check-questions.js
      present-knowledge-check.js
      show-knowledge-check-question.js
      show-knowledge-check-score.js
    06-download-sidebar-files/
      download-sidebar-files.js
    find-step/
      present-step-finder.js
    save-step/
      read-saved-step-numbers.js
      write-saved-step-numbers.js
      show-saved-step-list.js
      remember-saved-steps.js
    choose-theme/
      choose-theme.js
```

### 2.2 Architecture Rules

- folder says flow
- feature folder says use case
- root feature file says the full feature flow
- every other file owns one clear responsibility
- every function name says the exact action
- if the flow is sequential, root file stays `feature-name.pipeline.js`
- if the flow stops being strictly sequential, use one facade/orchestrator file that still owns the whole feature flow

### 2.3 Naming Rules

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

### 2.4 Vocabulary Rules

U ovom repo-u glagoli imaju zaključano značenje:

- `build...` gradi izveden lesson output za konkretan step
- `show...` upisuje trenutno stanje u već pronađene page parts
- `present...` drži interaktivni user flow
- `create...` inicijalizuje progress ili state za tok
- `find...` pronalazi postojeće page delove u DOM-u
- `read...` čita iz persistence sloja
- `write...` upisuje u persistence sloj

Ne uvoditi novu sinonimsku generaciju ako postojeći glagol već pokriva odgovornost.

### 2.5 Numbering Rules

Brojevi se koriste samo na flow folderima kada redosled zaista nosi značenje u product story-ju.

U ovom repo-u to važi za glavni lesson journey:

- `01-start-lesson`
- `02-follow-lesson`
- `03-watch-code`
- `04-watch-sidebar`
- `05-check-understanding`
- `06-download-sidebar-files`

Pomoćni tokovi ostaju bez brojeva:

- `find-step`
- `save-step`
- `choose-theme`

Ne numerisati responsibility fajlove osim ako redosled samog fajl tree-ja postane bitan za razumevanje feature-a.

### 2.6 Runtime and Entry Rules

- Nema `src/` foldera
- `main.js` je root entry
- `sidebar-step-by-step.html` je glavna lesson stranica
- build ide kroz Vite
- kanonski feature entry ostaje `teach-components/build-sidebar/build-sidebar.pipeline.js`

Ne držati paralelnu monolitnu implementaciju pored slice-ovane verzije.

### 2.7 Preview Integrity Rules

Desni preview mora da bude stvarni render istog kumulativnog HTML/CSS koda koji middle panel prikazuje.

To znači:

- nema ručno režiranog “fake scene” preview-a
- nema posebnog preview DOM-a koji odstupa od lesson koda
- preview mora da se hrani iz istih builder funkcija koje hrane code panel
- HTML preview mora da pokaže sirov browser rezultat kada CSS još nije dodat
- CSS preview mora da utiče samo onoliko koliko je trenutno napisano

Ako menjaš preview, menjaj ga tako da ostane iskren prema lesson kodu.

### 2.8 Verification Rules

Posle svake veće izmene obavezno pokreni:

```bash
find teach-components -name '*.js' -print0 | xargs -0 -n1 node --check && node --check main.js
npm run build
./merge-files.sh .
```

Ako menjaš dokumentaciju ili flow tree, osveži i merge dump.

## 3. Feature Contract

Ovo je behavior specifikacija proizvoda. Ako feature menjaš, ova pravila moraju ostati istinita osim ako korisnik eksplicitno zatraži drugo.

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

- prikazuje `index.html`
- prikazuje `style.css`
- oba prikaza su kumulativna
- postojeće linije su muted
- novo dodate linije su naglašene

Desni panel:

- mora da zauzima ceo viewer panel
- mora da imitira browser
- mora da renderuje stvarni kumulativni HTML/CSS output

### 3.2 Lesson Flow

Lekcija počinje praznim `app-shell` prostorom.

Sidebar se dodaje kao prva stvar.

Ne dodavati nebitan sadržaj koji odvlači pažnju od lekcije, kao:

- lažni `main-content`
- generički hero blokovi
- filler dashboard sadržaj

Ovo je sidebar-only lekcija.

### 3.3 HTML Teaching Rules

HTML se dodaje element po element.

Koraci moraju da prate realan construction flow:

- prvo wrapper
- onda child elementi
- onda finiji pod-elementi

Ne lepi više novih HTML struktura odjednom ako se mogu prirodno razložiti.

### 3.4 CSS Teaching Rules

CSS mora da ide property po property.

Ne lepi kompletan block odjednom.

Kumulativni stylesheet mora da raste korak po korak.

Rani CSS koraci treba da daju vizuelnu orijentaciju u preview-u, zato prvo uvoditi stvari koje korisniku pomažu da vidi gde gleda:

- helper outline / helper border
- širinu
- visinu
- padding / spacing koji pravi footprint
- background i ostale vizuelne finish property-je tek kad imaju smisla

### 3.5 Helper Line Rules

Helper linije su deo teaching UX-a, ne slučajni debug ostatak.

Pravila:

- helper border ili helper padding uvodi se eksplicitno kao pomoćno sredstvo za orijentaciju
- u opisu koraka mora da piše da je pomoćni i da će biti uklonjen kasnije
- u CSS snapshot-u mora da postoji komentar koji kaže da je pomoćni i da se kasnije uklanja
- helper linija ne sme da nestane prerano
- helper linije ostaju aktivne dok se ne završi cela celina kojoj element pripada

Primer:

- za `.sidebar-brand` helper linije ostaju dok se ne završi cela brand celina
- za navigaciju helper linije ostaju dok se ne završi cela navigaciona celina

### 3.6 Helper Color Rules

Kada više elemenata pripada istoj celini, svaki element dobija svoju helper boju.

Primer za brand celinu:

- `.sidebar-brand` ima svoju helper boju
- `.logo` ima svoju helper boju
- `.brand-copy` ima svoju helper boju

Pravilo:

- isti element zadržava istu helper boju kroz celu aktivnu celinu
- helper boja se ne menja usred iste celine bez jakog razloga
- helper linije cele celine uklanjaju se zajedno kada se ta celina završi

### 3.7 Preview Behavior Rules

Preview mora da se ponaša kao pravi editor + browser tok:

- kada se napiše HTML, browser mora odmah da ga pokaže bez stilova
- kada se doda CSS property, preview mora odmah da pokaže samo efekat tog property-ja
- kada sledeći property menja isti element, preview mora da update-uje isti render, ne da prikazuje drugu scenu

Ne koristiti vizuelne prečice koje sakrivaju pravi rezultat koda.

### 3.8 Playback Rules

Playback kontrole imaju tačno značenje:

- `Play`: kreće od trenutnog koraka i automatski nastavlja dalje
- `Pause`: zaustavlja se na trenutnom koraku da predavač može verbalno da objasni širi kontekst
- `Stop`: zaustavlja playback i vraća lekciju na početak

`Space` radi kao `Play / Pause`.

Ne vraćati `Auto` kao labelu kontrola.
Ne koristiti `Reset` kao zamenu za `Stop`.

### 3.9 Support Feature Rules

Support tokovi moraju ostati funkcionalni:

- step finder
- bookmarks
- knowledge check
- theme toggle
- file download

Ali ne smeju da preuzmu fokus sa glavnog lesson experience-a.

### 3.10 Download Rules

Download mora da koristi finalni kumulativni lesson output.

Ne skidati alternativan ili ručno održavan HTML/CSS.

## 4. Change Rules For Future Agents

Ako menjaš repo:

1. prvo proveri da li novo ime stvarno govori flow / responsibility / action
2. ne uvodi paralelnu implementaciju ako već postoji kanonski pipeline
3. ako file nosi više nepovezanih odgovornosti, razdvoji ga
4. ako behavior menjaš, zadrži teaching intent
5. ako menjaš lesson flow, ažuriraj i docs i merge dump
6. ako uvodiš helper stilove, dokumentuj kada nastaju i kada nestaju

## 5. Definition Of Done

Promena je gotova kada:

- tree i dalje čitaš top-down kao product story
- nema novog generičkog naming šuma
- preview i code panel ostaju međusobno istiniti
- helper linije rade po pravilima celina i boja
- playback radi kao `Play / Pause / Stop`
- `node --check` prolazi
- `npm run build` prolazi
- `./merge-files.sh .` je osvežen
