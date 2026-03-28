---
schemaVersion: 1
lessonId: 02-build-top-navigation
lessonTitle: 02 · Kako se pravi top navigation bar
lessonIntro: "Koraci po korak gradiš prvi navbar iz reference: logo levo, linkovi u sredini i CTA dugme desno. Druga dva rasporeda iz iste slike ostaju kao domaći zadatak."
status: active
courseId: step-by-step-animator
order: 2
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
preview:
  type: dom
  title: Live top navigation preview
  address: browser://02-build-top-navigation-preview
goal:
  title: Šta gradimo u ovoj lekciji
  imageSrc: ./assets/top-navigation-goal.svg
  imageAlt: "Referentna slika sa tri tamna navigation bara na svetloj pozadini. U lekciji se gradi prvi: logo levo, linkovi u sredini i contact dugme desno."
  imageCaption: "U ovoj lekciji gradimo samo prvi raspored iz reference: logo levo, linkovi u sredini i plavo Contact dugme desno."
homework:
  enabled: true
  title: Domaći zadatak
  items:
    - "Drugu varijantu iz reference napravi kao samostalnu lekciju ili kao vlastitu vežbu: linkovi levo, CTA u sredini, logo desno."
    - "Treću varijantu iz reference napravi kao drugu vežbu: logo levo, a kompletna navigaciona grupa i CTA dugme desno."
---
# Step: empty-shell
title: "Start: Empty App Shell"
summary: Počinjemo od praznog `.app-shell` prostora. Goal slika iznad pokazuje tri varijante, ali u ovoj lekciji gradimo samo prvu.
intent: Neutralan početak jasno odvaja ono što je postojalo od onoga što tek pravimo.
tag: html:app-shell
proTip: Neutralan početak jasno odvaja ono što je postojalo od onoga što tek pravimo.
focusHtmlNeedles:
  - <div class="app-shell">

## Scene: empty-shell-scene

### Narration
Počinjemo od praznog `.app-shell` prostora. Goal slika iznad pokazuje tri varijante, ali u ovoj lekciji gradimo samo prvu.

### Show Code: html
```html
<div class="app-shell">
</div>
```

### Show Code: css
```css
.app-shell {
}
```

# Step: topbar-html
title: "HTML: Topbar Shell"
summary: Dodajemo `<header class="topbar">` kao glavni wrapper buduće navigacije.
intent: Kreni od glavnog semantic wrapper-a pa tek onda popunjavaj njegove zone.
tag: html:topbar
proTip: Kreni od glavnog semantic wrapper-a pa tek onda popunjavaj njegove zone.
focusHtmlNeedles:
  - class="topbar"

## Scene: topbar-html-scene

### Narration
Dodajemo `<header class="topbar">` kao glavni wrapper buduće navigacije.

### Show Code: html
```html
<div class="app-shell">
  <header class="topbar">
  </header>
</div>
```

### Show Code: css
```css
.app-shell {
}

.topbar {
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

.topbar {
}
```

# Step: shell-padding
title: "CSS: .app-shell / padding"
summary: Dodajemo padding oko cele scene da navbar dobije vazduh i ne stoji zalepljen za ivice preview-a.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:shell-padding
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - <div class="app-shell">

## Scene: shell-padding-scene

### Narration
Dodajemo padding oko cele scene da navbar dobije vazduh i ne stoji zalepljen za ivice preview-a.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
}

.topbar {
}
```

# Step: shell-background
title: "CSS: .app-shell / background"
summary: Svetla pozadina približava preview referentnoj slici i daje kontrast tamnom navbaru.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:shell-background
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - <div class="app-shell">

## Scene: shell-background-scene

### Narration
Svetla pozadina približava preview referentnoj slici i daje kontrast tamnom navbaru.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
}

.topbar {
}
```

# Step: shell-min-height
title: "CSS: .app-shell / min-height"
summary: Puna visina drži celu scenu stabilnom tokom lekcije.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:shell-min-height
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - <div class="app-shell">

## Scene: shell-min-height-scene

### Narration
Puna visina drži celu scenu stabilnom tokom lekcije.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
}
```

# Step: topbar-outline
title: "CSS: .topbar / outline"
summary: Dodajemo tanak pomoćni outline da footprint celog navbara ostane vidljiv kroz ceo tok. Skidamo ga tek u završnom rezime koraku za `.topbar`.
intent: Outline ostaje aktivan dok ne završimo rezime za ovaj element.
tag: css:topbar-outline
proTip: Outline ostaje aktivan dok ne završimo rezime za ovaj element.
focusHtmlNeedles:
  - class="topbar"

## Scene: topbar-outline-scene

### Narration
Dodajemo tanak pomoćni outline da footprint celog navbara ostane vidljiv kroz ceo tok. Skidamo ga tek u završnom rezime koraku za `.topbar`.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
}
```

# Step: topbar-padding
title: "CSS: .topbar / padding"
summary: Navbar dobija unutrašnji spacing, pa odmah izgleda kao realna UI traka.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:topbar-padding
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar"

## Scene: topbar-padding-scene

### Narration
Navbar dobija unutrašnji spacing, pa odmah izgleda kao realna UI traka.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
}
```

# Step: topbar-background
title: "CSS: .topbar / background"
summary: Dodajemo tamnu pozadinu, ali outline namerno ostaje do završnog rezimea za `.topbar`.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:topbar-background
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar"

## Scene: topbar-background-scene

### Narration
Dodajemo tamnu pozadinu, ali outline namerno ostaje do završnog rezimea za `.topbar`.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
}
```

# Step: topbar-border
title: "CSS: .topbar / border"
summary: Tanka ivica pomaže da navbar bude čitljiv i na svetloj pozadini.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:topbar-border
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar"

## Scene: topbar-border-scene

### Narration
Tanka ivica pomaže da navbar bude čitljiv i na svetloj pozadini.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
}
```

# Step: topbar-shadow
title: "CSS: .topbar / box-shadow"
summary: Shadow odvaja navbar od pozadine i približava ga referentnoj slici.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:topbar-shadow
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar"

## Scene: topbar-shadow-scene

### Narration
Shadow odvaja navbar od pozadine i približava ga referentnoj slici.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
}
```

# Step: topbar-display
title: "CSS: .topbar / display"
summary: Flex uvodi horizontalni raspored elemenata.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:topbar-display
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar"

## Scene: topbar-display-scene

### Narration
Flex uvodi horizontalni raspored elemenata.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
}
```

# Step: topbar-align-items
title: "CSS: .topbar / align-items"
summary: Vertikalno centriramo sve delove navigacije.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:topbar-align-items
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar"

## Scene: topbar-align-items-scene

### Narration
Vertikalno centriramo sve delove navigacije.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
}
```

# Step: topbar-justify-content
title: "CSS: .topbar / justify-content"
summary: Glavne zone dobijaju početno razdvajanje levo i desno.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:topbar-justify-content
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar"

## Scene: topbar-justify-content-scene

### Narration
Glavne zone dobijaju početno razdvajanje levo i desno.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

# Step: logo-html
title: "HTML: Logo Link"
summary: Dodajemo logo kao klikabilni `.topbar-logo` element na levom kraju navigacije.
intent: Logo je navigacioni landmark i zato ga uvodimo pre linkova.
tag: html:logo
proTip: Logo je navigacioni landmark i zato ga uvodimo pre linkova.
focusHtmlNeedles:
  - class="topbar-logo"

## Scene: logo-html-scene

### Narration
Dodajemo logo kao klikabilni `.topbar-logo` element na levom kraju navigacije.

### Show Code: html
```html
<div class="app-shell">
  <header class="topbar">
    <a href="#" class="topbar-logo">LOGOBAKERY</a>
  </header>
</div>
```

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
}
```

# Step: logo-outline
title: "CSS: .topbar-logo / outline"
summary: Dodajemo tanak outline za logo i držimo ga do završnog rezime koraka za `.topbar-logo`.
intent: Svaki važan element dobija svoj outline i zadržava ga do svog rezimea.
tag: css:logo-outline
proTip: Svaki važan element dobija svoj outline i zadržava ga do svog rezimea.
focusHtmlNeedles:
  - class="topbar-logo"

## Scene: logo-outline-scene

### Narration
Dodajemo tanak outline za logo i držimo ga do završnog rezime koraka za `.topbar-logo`.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
}
```

# Step: logo-color
title: "CSS: .topbar-logo / color"
summary: Boju loga postavljamo rano da odmah ima jasan kontrast na tamnoj traci.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:logo-color
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-logo"

## Scene: logo-color-scene

### Narration
Boju loga postavljamo rano da odmah ima jasan kontrast na tamnoj traci.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
}
```

# Step: logo-font-size
title: "CSS: .topbar-logo / font-size"
summary: Malo povećavamo logo da se odvoji od običnih linkova.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:logo-font-size
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-logo"

## Scene: logo-font-size-scene

### Narration
Malo povećavamo logo da se odvoji od običnih linkova.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
}
```

# Step: logo-font-weight
title: "CSS: .topbar-logo / font-weight"
summary: Težina fonta daje logo signalu identitet.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:logo-font-weight
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-logo"

## Scene: logo-font-weight-scene

### Narration
Težina fonta daje logo signalu identitet.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
}
```

# Step: logo-letter-spacing
title: "CSS: .topbar-logo / letter-spacing"
summary: Blagi spacing pojačava moderni, branded osećaj.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:logo-letter-spacing
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-logo"

## Scene: logo-letter-spacing-scene

### Narration
Blagi spacing pojačava moderni, branded osećaj.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
}
```

# Step: logo-text-decoration
title: "CSS: .topbar-logo / text-decoration"
summary: Uklanjamo underline da logo izgleda kao deo UI-ja, ne kao sirov link.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:logo-text-decoration
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-logo"

## Scene: logo-text-decoration-scene

### Narration
Uklanjamo underline da logo izgleda kao deo UI-ja, ne kao sirov link.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}
```

# Step: nav-html
title: "HTML: Navigation Links"
summary: Dodajemo `<nav class="topbar-links">` sa linkovima Services, Projects i About. I grupa linkova i sami linkovi dobijaju helper outline koji ostaje do završnog rezimea za navigaciju.
intent: Najbolje je da sve centralne linkove uvedeš kao jednu celinu, pa tek onda doteruješ spacing i tipografiju.
tag: html:nav-links
proTip: Najbolje je da sve centralne linkove uvedeš kao jednu celinu, pa tek onda doteruješ spacing i tipografiju.
focusHtmlNeedles:
  - class="topbar-links"
  - ">Services</a>"
  - ">Projects</a>"
  - ">About</a>"

## Scene: nav-html-scene

### Narration
Dodajemo `<nav class="topbar-links">` sa linkovima Services, Projects i About. I grupa linkova i sami linkovi dobijaju helper outline koji ostaje do završnog rezimea za navigaciju.

### Show Code: html
```html
<div class="app-shell">
  <header class="topbar">
    <a href="#" class="topbar-logo">LOGOBAKERY</a>

    <nav class="topbar-links">
      <a href="#">Services</a>
      <a href="#">Projects</a>
      <a href="#">About</a>
    </nav>
  </header>
</div>
```

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
}
```

# Step: nav-outline
title: "CSS: .topbar-links / outline"
summary: Dodajemo tanak helper outline za centralnu navigacionu zonu i držimo ga do završnog rezime koraka za link sekciju.
intent: Centralna grupa ostaje obeležena dok ne završimo rezime za nju.
tag: css:nav-outline
proTip: Centralna grupa ostaje obeležena dok ne završimo rezime za nju.
focusHtmlNeedles:
  - class="topbar-links"

## Scene: nav-outline-scene

### Narration
Dodajemo tanak helper outline za centralnu navigacionu zonu i držimo ga do završnog rezime koraka za link sekciju.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
}
```

# Step: nav-display
title: "CSS: .topbar-links / display"
summary: Linkove slažemo u jedan red.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:nav-display
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-links"

## Scene: nav-display-scene

### Narration
Linkove slažemo u jedan red.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
}
```

# Step: nav-gap
title: "CSS: .topbar-links / gap"
summary: Gap daje istu vrstu razmaka kao na referentnoj slici.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:nav-gap
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-links"

## Scene: nav-gap-scene

### Narration
Gap daje istu vrstu razmaka kao na referentnoj slici.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
}
```

# Step: nav-margin-left
title: "CSS: .topbar-links / margin-left"
summary: Navigacija se odvaja od loga i kreće ka sredini.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:nav-margin-left
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-links"

## Scene: nav-margin-left-scene

### Narration
Navigacija se odvaja od loga i kreće ka sredini.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
}
```

# Step: nav-margin-right
title: "CSS: .topbar-links / margin-right"
summary: Desni auto margin pomaže da grupa linkova ostane vizuelno centrirana.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:nav-margin-right
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-links"

## Scene: nav-margin-right-scene

### Narration
Desni auto margin pomaže da grupa linkova ostane vizuelno centrirana.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}
```

# Step: nav-link-outline
title: "CSS: .topbar-links a / outline"
summary: Svaki navigacioni link dobija svoj tanak outline i zadržava ga do završnog rezimea za navigaciju.
intent: I sama grupa i pojedinačni linkovi treba da ostanu vizuelno čitljivi dok traje objašnjenje.
tag: css:nav-link-outline
proTip: I sama grupa i pojedinačni linkovi treba da ostanu vizuelno čitljivi dok traje objašnjenje.
focusHtmlNeedles:
  - ">Services</a>"
  - ">Projects</a>"
  - ">About</a>"

## Scene: nav-link-outline-scene

### Narration
Svaki navigacioni link dobija svoj tanak outline i zadržava ga do završnog rezimea za navigaciju.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
}
```

# Step: nav-link-color
title: "CSS: .topbar-links a / color"
summary: Boja linkova prati logo i pravi konzistentan kontrast.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:nav-link-color
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - ">Services</a>"
  - ">Projects</a>"
  - ">About</a>"

## Scene: nav-link-color-scene

### Narration
Boja linkova prati logo i pravi konzistentan kontrast.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
}
```

# Step: nav-link-font-size
title: "CSS: .topbar-links a / font-size"
summary: Linkovi dobijaju čitljivu, ali nenametljivu veličinu.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:nav-link-font-size
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - ">Services</a>"
  - ">Projects</a>"
  - ">About</a>"

## Scene: nav-link-font-size-scene

### Narration
Linkovi dobijaju čitljivu, ali nenametljivu veličinu.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
  font-size: 15px;
}
```

# Step: nav-link-text-decoration
title: "CSS: .topbar-links a / text-decoration"
summary: Čistimo default underline da linkovi izgledaju kao deo dizajna.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:nav-link-text-decoration
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - ">Services</a>"
  - ">Projects</a>"
  - ">About</a>"

## Scene: nav-link-text-decoration-scene

### Narration
Čistimo default underline da linkovi izgledaju kao deo dizajna.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
}
```

# Step: nav-link-transition
title: "CSS: .topbar-links a / transition"
summary: Mala tranzicija omekšava hover promenu.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:nav-link-transition
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - ">Services</a>"
  - ">Projects</a>"
  - ">About</a>"

## Scene: nav-link-transition-scene

### Narration
Mala tranzicija omekšava hover promenu.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}
```

# Step: nav-link-hover-color
title: "CSS: .topbar-links a:hover / color"
summary: Hover ton blago menja boju, bez agresivnog skakanja.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:nav-link-hover-color
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - ">Services</a>"
  - ">Projects</a>"
  - ">About</a>"

## Scene: nav-link-hover-color-scene

### Narration
Hover ton blago menja boju, bez agresivnog skakanja.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.topbar-links a:hover {
  color: #cbd5e1;
}
```

# Step: cta-html
title: "HTML: Contact CTA"
summary: Dodajemo završni `.topbar-cta` link sa tekstom Contact. Dugme takođe dobija svoj helper outline koji ostaje do njegovog završnog rezimea.
intent: CTA se uvodi na kraju, tek kada su logo i navigacija već stabilni.
tag: html:cta
proTip: CTA se uvodi na kraju, tek kada su logo i navigacija već stabilni.
focusHtmlNeedles:
  - class="topbar-cta"

## Scene: cta-html-scene

### Narration
Dodajemo završni `.topbar-cta` link sa tekstom Contact. Dugme takođe dobija svoj helper outline koji ostaje do njegovog završnog rezimea.

### Show Code: html
```html
<div class="app-shell">
  <header class="topbar">
    <a href="#" class="topbar-logo">LOGOBAKERY</a>

    <nav class="topbar-links">
      <a href="#">Services</a>
      <a href="#">Projects</a>
      <a href="#">About</a>
    </nav>

    <a href="#" class="topbar-cta">Contact</a>
  </header>
</div>
```

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.topbar-links a:hover {
  color: #cbd5e1;
}

.topbar-cta {
}
```

# Step: cta-outline
title: "CSS: .topbar-cta / outline"
summary: Dodajemo tanak pomoćni outline za CTA i držimo ga do završnog rezime koraka za dugme.
intent: Kod CTA dugmeta helper outline ostaje sve dok ne zaključimo ceo element.
tag: css:cta-outline
proTip: Kod CTA dugmeta helper outline ostaje sve dok ne zaključimo ceo element.
focusHtmlNeedles:
  - class="topbar-cta"

## Scene: cta-outline-scene

### Narration
Dodajemo tanak pomoćni outline za CTA i držimo ga do završnog rezime koraka za dugme.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.topbar-links a:hover {
  color: #cbd5e1;
}

.topbar-cta {
  outline: 1px dashed #11a4d3;
}
```

# Step: cta-display
title: "CSS: .topbar-cta / display"
summary: CTA prebacujemo u inline-flex da padding i centriranje rade kao na pravom dugmetu.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:cta-display
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-cta"

## Scene: cta-display-scene

### Narration
CTA prebacujemo u inline-flex da padding i centriranje rade kao na pravom dugmetu.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.topbar-links a:hover {
  color: #cbd5e1;
}

.topbar-cta {
  outline: 1px dashed #11a4d3;
  display: inline-flex;
}
```

# Step: cta-align-items
title: "CSS: .topbar-cta / align-items"
summary: Tekst dugmeta centriramo po visini.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:cta-align-items
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-cta"

## Scene: cta-align-items-scene

### Narration
Tekst dugmeta centriramo po visini.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.topbar-links a:hover {
  color: #cbd5e1;
}

.topbar-cta {
  outline: 1px dashed #11a4d3;
  display: inline-flex;
  align-items: center;
}
```

# Step: cta-padding
title: "CSS: .topbar-cta / padding"
summary: Padding daje CTA dugmetu njegov pravi footprint.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:cta-padding
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-cta"

## Scene: cta-padding-scene

### Narration
Padding daje CTA dugmetu njegov pravi footprint.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.topbar-links a:hover {
  color: #cbd5e1;
}

.topbar-cta {
  outline: 1px dashed #11a4d3;
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
}
```

# Step: cta-radius
title: "CSS: .topbar-cta / border-radius"
summary: Pil oblik odmah približava dugme referentnom primeru.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:cta-radius
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-cta"

## Scene: cta-radius-scene

### Narration
Pil oblik odmah približava dugme referentnom primeru.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.topbar-links a:hover {
  color: #cbd5e1;
}

.topbar-cta {
  outline: 1px dashed #11a4d3;
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border-radius: 999px;
}
```

# Step: cta-background
title: "CSS: .topbar-cta / background"
summary: Dodajemo završnu boju CTA dugmeta, ali outline i dalje ostaje do rezime koraka za `.topbar-cta`.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:cta-background
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-cta"

## Scene: cta-background-scene

### Narration
Dodajemo završnu boju CTA dugmeta, ali outline i dalje ostaje do rezime koraka za `.topbar-cta`.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.topbar-links a:hover {
  color: #cbd5e1;
}

.topbar-cta {
  outline: 1px dashed #11a4d3;
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border-radius: 999px;
  background: #11a4d3;
}
```

# Step: cta-color
title: "CSS: .topbar-cta / color"
summary: Beli tekst pravi čist kontrast preko plave pozadine.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:cta-color
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-cta"

## Scene: cta-color-scene

### Narration
Beli tekst pravi čist kontrast preko plave pozadine.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.topbar-links a:hover {
  color: #cbd5e1;
}

.topbar-cta {
  outline: 1px dashed #11a4d3;
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border-radius: 999px;
  background: #11a4d3;
  color: #ffffff;
}
```

# Step: cta-text-decoration
title: "CSS: .topbar-cta / text-decoration"
summary: Uklanjamo underline da CTA izgleda kao pravo dugme.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:cta-text-decoration
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-cta"

## Scene: cta-text-decoration-scene

### Narration
Uklanjamo underline da CTA izgleda kao pravo dugme.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.topbar-links a:hover {
  color: #cbd5e1;
}

.topbar-cta {
  outline: 1px dashed #11a4d3;
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border-radius: 999px;
  background: #11a4d3;
  color: #ffffff;
  text-decoration: none;
}
```

# Step: cta-shadow
title: "CSS: .topbar-cta / box-shadow"
summary: Shadow pojačava prisustvo CTA dugmeta i zatvara vizuelni match sa ciljem.
intent: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
tag: css:cta-shadow
proTip: Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.
focusHtmlNeedles:
  - class="topbar-cta"

## Scene: cta-shadow-scene

### Narration
Shadow pojačava prisustvo CTA dugmeta i zatvara vizuelni match sa ciljem.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  outline: 1px solid #ff5d8f;
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.topbar-links a:hover {
  color: #cbd5e1;
}

.topbar-cta {
  outline: 1px dashed #11a4d3;
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border-radius: 999px;
  background: #11a4d3;
  color: #ffffff;
  text-decoration: none;
  box-shadow: 0 10px 20px rgba(17,164,211,0.28);
}
```

# Step: topbar-summary
title: "Rezime: .topbar"
summary: "Završni rezime za `.topbar`: sada kada vidimo kompletan block CSS, uklanjamo helper outline sa glavnog wrapper-a."
intent: Rezime korak je mesto gde helper outline odlazi i ostaje čist završni CSS za taj element.
tag: summary:topbar-summary
proTip: Rezime korak je mesto gde helper outline odlazi i ostaje čist završni CSS za taj element.
focusHtmlNeedles:
  - class="topbar"

## Scene: topbar-summary-scene

### Narration
Završni rezime za `.topbar`: sada kada vidimo kompletan block CSS, uklanjamo helper outline sa glavnog wrapper-a.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* helper outline removed in final .topbar summary */
}

.topbar-logo {
  outline: 1px dashed #fbbf24;
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.topbar-links a:hover {
  color: #cbd5e1;
}

.topbar-cta {
  outline: 1px dashed #11a4d3;
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border-radius: 999px;
  background: #11a4d3;
  color: #ffffff;
  text-decoration: none;
  box-shadow: 0 10px 20px rgba(17,164,211,0.28);
}
```

# Step: logo-summary
title: "Rezime: .topbar-logo"
summary: Rezimiramo `.topbar-logo` i uklanjamo njegov helper outline tek sada, kada je sav CSS za logo već jasan i kompletan.
intent: Logo outline ostaje sve do ovog trenutka da bi fokus bio čitljiv tokom cele lekcije.
tag: summary:logo-summary
proTip: Logo outline ostaje sve do ovog trenutka da bi fokus bio čitljiv tokom cele lekcije.
focusHtmlNeedles:
  - class="topbar-logo"

## Scene: logo-summary-scene

### Narration
Rezimiramo `.topbar-logo` i uklanjamo njegov helper outline tek sada, kada je sav CSS za logo već jasan i kompletan.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* helper outline removed in final .topbar summary */
}

.topbar-logo {
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
  /* helper outline removed in final .topbar-logo summary */
}

.topbar-links {
  outline: 1px dashed #38bdf8;
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
}

.topbar-links a {
  outline: 1px dotted #fde68a;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.topbar-links a:hover {
  color: #cbd5e1;
}

.topbar-cta {
  outline: 1px dashed #11a4d3;
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border-radius: 999px;
  background: #11a4d3;
  color: #ffffff;
  text-decoration: none;
  box-shadow: 0 10px 20px rgba(17,164,211,0.28);
}
```

# Step: navigation-summary
title: "Rezime: .topbar-links"
summary: Rezimiramo navigacionu celinu i uklanjamo helper outline i sa wrapper-a i sa pojedinačnih linkova.
intent: Kada završavaš celu navigacionu grupu, tek tada gasiš outline helpere za sve njene delove.
tag: summary:navigation-summary
proTip: Kada završavaš celu navigacionu grupu, tek tada gasiš outline helpere za sve njene delove.
focusHtmlNeedles:
  - class="topbar-links"

## Scene: navigation-summary-scene

### Narration
Rezimiramo navigacionu celinu i uklanjamo helper outline i sa wrapper-a i sa pojedinačnih linkova.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* helper outline removed in final .topbar summary */
}

.topbar-logo {
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
  /* helper outline removed in final .topbar-logo summary */
}

.topbar-links {
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
  /* helper outline removed in final .topbar-links summary */
}

.topbar-links a {
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
  /* link helper outline removed in final navigation summary */
}

.topbar-links a:hover {
  color: #cbd5e1;
}

.topbar-cta {
  outline: 1px dashed #11a4d3;
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border-radius: 999px;
  background: #11a4d3;
  color: #ffffff;
  text-decoration: none;
  box-shadow: 0 10px 20px rgba(17,164,211,0.28);
}
```

# Step: cta-summary
title: "Rezime: .topbar-cta"
summary: "Rezime za CTA dugme: helper outline više nije potreban, jer završni stil već jasno govori šta je element i kako izgleda."
intent: Outline služi učenju; kad je učenje za taj element završeno, može da nestane.
tag: summary:cta-summary
proTip: Outline služi učenju; kad je učenje za taj element završeno, može da nestane.
focusHtmlNeedles:
  - class="topbar-cta"

## Scene: cta-summary-scene

### Narration
Rezime za CTA dugme: helper outline više nije potreban, jer završni stil već jasno govori šta je element i kako izgleda.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
}

.topbar {
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* helper outline removed in final .topbar summary */
}

.topbar-logo {
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
  /* helper outline removed in final .topbar-logo summary */
}

.topbar-links {
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
  /* helper outline removed in final .topbar-links summary */
}

.topbar-links a {
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
  /* link helper outline removed in final navigation summary */
}

.topbar-links a:hover {
  color: #cbd5e1;
}

.topbar-cta {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border-radius: 999px;
  background: #11a4d3;
  color: #ffffff;
  text-decoration: none;
  box-shadow: 0 10px 20px rgba(17,164,211,0.28);
  /* helper outline removed in final .topbar-cta summary */
}
```

# Step: shell-summary
title: "Rezime: .app-shell"
summary: "Završni shell rezime: tek sada uklanjamo helper outline sa `.app-shell`, jer je cela navigaciona lekcija kompletna i okvir više nije potreban."
intent: App shell outline ostaje sve vreme kao teaching okvir, pa nestaje tek na samom kraju lekcije.
tag: summary:shell-summary
proTip: App shell outline ostaje sve vreme kao teaching okvir, pa nestaje tek na samom kraju lekcije.
focusHtmlNeedles:
  - <div class="app-shell">

## Scene: shell-summary-scene

### Narration
Završni shell rezime: tek sada uklanjamo helper outline sa `.app-shell`, jer je cela navigaciona lekcija kompletna i okvir više nije potreban.

### Show Code: css
```css
.app-shell {
  padding: 40px;
  background: #d6e1eb;
  min-height: 100vh;
  /* helper outline removed in final .app-shell summary */
}

.topbar {
  padding: 18px 28px;
  background: #25262c;
  border: 1px solid rgba(0,0,0,0.22);
  box-shadow: 0 12px 24px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* helper outline removed in final .topbar summary */
}

.topbar-logo {
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
  /* helper outline removed in final .topbar-logo summary */
}

.topbar-links {
  display: flex;
  gap: 36px;
  margin-left: auto;
  margin-right: auto;
  /* helper outline removed in final .topbar-links summary */
}

.topbar-links a {
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.3s ease;
  /* link helper outline removed in final navigation summary */
}

.topbar-links a:hover {
  color: #cbd5e1;
}

.topbar-cta {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border-radius: 999px;
  background: #11a4d3;
  color: #ffffff;
  text-decoration: none;
  box-shadow: 0 10px 20px rgba(17,164,211,0.28);
  /* helper outline removed in final .topbar-cta summary */
}
```

# Step: done
title: "Done: Top Navigation"
summary: Prvi navbar iz reference je gotov. Druga dva rasporeda iz goal slike ostaju kao domaći zadatak.
intent: Kada završiš ovu varijantu, najbolji sledeći korak je da samostalno rekreiraš druga dva rasporeda iz iste reference.
tag: success
proTip: Kada završiš ovu varijantu, najbolji sledeći korak je da samostalno rekreiraš druga dva rasporeda iz iste reference.

## Scene: done-scene

### Narration
Prvi navbar iz reference je gotov. Druga dva rasporeda iz goal slike ostaju kao domaći zadatak.

### Show Code: html
```html
<div class="app-shell">
  <header class="topbar">
    <a href="#" class="topbar-logo">LOGOBAKERY</a>

    <nav class="topbar-links">
      <a href="#">Services</a>
      <a href="#">Projects</a>
      <a href="#">About</a>
    </nav>

    <a href="#" class="topbar-cta">Contact</a>
  </header>
</div>
```
