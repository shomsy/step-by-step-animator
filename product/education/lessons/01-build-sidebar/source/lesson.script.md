---
schemaVersion: 1
lessonId: 01-build-sidebar
lessonTitle: 01 · Kako se pravi moderan sidebar
lessonIntro: Koraci po korak gradiš sidebar od osnove do gotove navigacije. Svaki korak uključuje kod, savete i vizuelni prikaz.
status: active
courseId: step-by-step-animator
order: 1
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
  title: Live build sidebar preview
  address: browser://01-build-sidebar-preview
---
# Step: empty-shell
title: "Start: Empty App Shell"
summary: Počinjemo od praznog `.app-shell` prostora. Sidebar tek dodajemo kao prvi pravi element.
intent: Neutralan početak jasno odvaja ono što je postojalo od onoga što tek gradimo.
tag: html:app-shell
proTip: Neutralan početak jasno odvaja ono što je postojalo od onoga što tek gradimo.
focusHtmlNeedles:
  - <div class="app-shell">

## Scene: empty-shell-scene

### Narration
Počinjemo od praznog `.app-shell` prostora. Sidebar tek dodajemo kao prvi pravi element.

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

# Step: sidebar-html
title: "HTML: Sidebar Shell"
summary: Ubacujemo osnovni `<aside class="sidebar">` blok kao koren cele komponente.
intent: Semantički HTML ti odmah daje bolju strukturu i čitljiviji DOM.
tag: html:aside
proTip: Semantički HTML ti odmah daje bolju strukturu i čitljiviji DOM.
focusHtmlNeedles:
  - class="sidebar"

## Scene: sidebar-html-scene

### Narration
Ubacujemo osnovni `<aside class="sidebar">` blok kao koren cele komponente.

### Show Code: html
```html
<div class="app-shell">
  <aside class="sidebar">
  </aside>
</div>
```

### Show Code: css
```css
.app-shell {
}

.sidebar {
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

.sidebar {
}
```

# Step: sidebar-outline
title: "CSS: .sidebar / outline"
summary: Dodajemo tanak helper outline da footprint sidebara ostane jasan kroz ceo lesson tok. Skidamo ga tek u završnom rezime koraku za `.sidebar`.
intent: Outline ostaje aktivan dok ne završimo rezime za ovaj element.
tag: css:sidebar-outline
proTip: Outline ostaje aktivan dok ne završimo rezime za ovaj element.
focusHtmlNeedles:
  - class="sidebar"

## Scene: sidebar-outline-scene

### Narration
Dodajemo tanak helper outline da footprint sidebara ostane jasan kroz ceo lesson tok. Skidamo ga tek u završnom rezime koraku za `.sidebar`.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
}
```

# Step: sidebar-width
title: "CSS: .sidebar / width"
summary: Kad granica postoji, zaključavamo širinu sidebara da dobije jasan footprint.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:sidebar-width
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar"

## Scene: sidebar-width-scene

### Narration
Kad granica postoji, zaključavamo širinu sidebara da dobije jasan footprint.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
}
```

# Step: sidebar-min-height
title: "CSS: .sidebar / min-height"
summary: Dajemo sidebaru punu visinu da box postane čitljiv i bez sadržaja.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:sidebar-min-height
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar"

## Scene: sidebar-min-height-scene

### Narration
Dajemo sidebaru punu visinu da box postane čitljiv i bez sadržaja.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
}
```

# Step: sidebar-border-right
title: "CSS: .sidebar / border-right"
summary: Tanka desna linija odvaja sidebar od ostatka layouta.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:sidebar-border-right
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar"

## Scene: sidebar-border-right-scene

### Narration
Tanka desna linija odvaja sidebar od ostatka layouta.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
}
```

# Step: sidebar-background
title: "CSS: .sidebar / background"
summary: Dodajemo tamnu pozadinu da sidebar dobije svoj vizuelni identitet, ali outline namerno ostaje do rezime koraka za `.sidebar`.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:sidebar-background
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar"

## Scene: sidebar-background-scene

### Narration
Dodajemo tamnu pozadinu da sidebar dobije svoj vizuelni identitet, ali outline namerno ostaje do rezime koraka za `.sidebar`.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
}
```

# Step: sidebar-color
title: "CSS: .sidebar / color"
summary: Osnovnu boju teksta postavljamo rano da nasledi ceo sadržaj.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:sidebar-color
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar"

## Scene: sidebar-color-scene

### Narration
Osnovnu boju teksta postavljamo rano da nasledi ceo sadržaj.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}
```

# Step: brand-html
title: "HTML: Brand Wrapper"
summary: Dodajemo `.sidebar-brand` kao zonu za logo i naziv proizvoda. Svi brand elementi zadržavaju svoje outline helpere do završnog brand rezimea.
intent: Izdvoj brand deo od navigacije da bi hijerarhija odmah bila jasna.
tag: html:brand
proTip: Izdvoj brand deo od navigacije da bi hijerarhija odmah bila jasna.
focusHtmlNeedles:
  - class="sidebar-brand"

## Scene: brand-html-scene

### Narration
Dodajemo `.sidebar-brand` kao zonu za logo i naziv proizvoda. Svi brand elementi zadržavaju svoje outline helpere do završnog brand rezimea.

### Show Code: html
```html
<div class="app-shell">
  <aside class="sidebar">
    <div class="sidebar-brand">
    </div>
  </aside>
</div>
```

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
}
```

# Step: brand-outline
title: "CSS: .sidebar-brand / outline"
summary: Dodajemo tanak helper outline za `.sidebar-brand` i držimo ga do završnog rezime koraka za brand celinu.
intent: Svaki deo iste celine može da dobije svoju boju helper linije dok ta celina traje.
tag: css:brand-outline
proTip: Svaki deo iste celine može da dobije svoju boju helper linije dok ta celina traje.
focusHtmlNeedles:
  - class="sidebar-brand"

## Scene: brand-outline-scene

### Narration
Dodajemo tanak helper outline za `.sidebar-brand` i držimo ga do završnog rezime koraka za brand celinu.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
}
```

# Step: brand-padding
title: "CSS: .sidebar-brand / padding"
summary: Unutrašnji padding daje brand zoni vazduh.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:brand-padding
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar-brand"

## Scene: brand-padding-scene

### Narration
Unutrašnji padding daje brand zoni vazduh.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
}
```

# Step: brand-margin-bottom
title: "CSS: .sidebar-brand / margin-bottom"
summary: Odvajamo brand blok od navigacije ispod njega.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:brand-margin-bottom
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar-brand"

## Scene: brand-margin-bottom-scene

### Narration
Odvajamo brand blok od navigacije ispod njega.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
}
```

# Step: brand-display
title: "CSS: .sidebar-brand / display"
summary: Prebacujemo brand zonu u flex da logo i tekst mogu da stoje u istom redu.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:brand-display
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar-brand"

## Scene: brand-display-scene

### Narration
Prebacujemo brand zonu u flex da logo i tekst mogu da stoje u istom redu.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
}
```

# Step: brand-align-items
title: "CSS: .sidebar-brand / align-items"
summary: Vertikalno poravnanje centrira logo i tekst.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:brand-align-items
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar-brand"

## Scene: brand-align-items-scene

### Narration
Vertikalno poravnanje centrira logo i tekst.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
}
```

# Step: brand-gap
title: "CSS: .sidebar-brand / gap"
summary: Gap određuje koliko prostora stoji između logotipa i teksta.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:brand-gap
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar-brand"

## Scene: brand-gap-scene

### Narration
Gap određuje koliko prostora stoji između logotipa i teksta.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}
```

# Step: logo-html
title: "HTML: Logo Element"
summary: Ubacujemo `.logo` element sa slovom `A` kao placeholder identitetom.
intent: Počni od jednostavnog placeholder loga pa tek onda doteruj stil.
tag: html:logo
proTip: Počni od jednostavnog placeholder loga pa tek onda doteruj stil.
focusHtmlNeedles:
  - class="logo"

## Scene: logo-html-scene

### Narration
Ubacujemo `.logo` element sa slovom `A` kao placeholder identitetom.

### Show Code: html
```html
<div class="app-shell">
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="logo">A</div>
    </div>
  </aside>
</div>
```

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
}
```

# Step: logo-outline
title: "CSS: .logo / outline"
summary: Dodajemo tanak helper outline za `.logo` i držimo ga do završnog brand rezimea.
intent: Logo zadržava svoju helper boju sve dok radimo brand celinu.
tag: css:logo-outline
proTip: Logo zadržava svoju helper boju sve dok radimo brand celinu.
focusHtmlNeedles:
  - class="logo"

## Scene: logo-outline-scene

### Narration
Dodajemo tanak helper outline za `.logo` i držimo ga do završnog brand rezimea.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
}
```

# Step: logo-width
title: "CSS: .logo / width"
summary: Prvo zaključavamo širinu logotipa.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:logo-width
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="logo"

## Scene: logo-width-scene

### Narration
Prvo zaključavamo širinu logotipa.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
}
```

# Step: logo-height
title: "CSS: .logo / height"
summary: Visina prati širinu da bismo dobili kvadratnu osnovu.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:logo-height
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="logo"

## Scene: logo-height-scene

### Narration
Visina prati širinu da bismo dobili kvadratnu osnovu.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
}
```

# Step: logo-display
title: "CSS: .logo / display"
summary: Grid nam daje lak centar za jedan znak ili ikonu.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:logo-display
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="logo"

## Scene: logo-display-scene

### Narration
Grid nam daje lak centar za jedan znak ili ikonu.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
}
```

# Step: logo-place-items
title: "CSS: .logo / place-items"
summary: Centriramo sadržaj logotipa u oba smera.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:logo-place-items
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="logo"

## Scene: logo-place-items-scene

### Narration
Centriramo sadržaj logotipa u oba smera.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
}
```

# Step: logo-radius
title: "CSS: .logo / border-radius"
summary: Blago zaobljenje daje moderniji osećaj.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:logo-radius
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="logo"

## Scene: logo-radius-scene

### Narration
Blago zaobljenje daje moderniji osećaj.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
}
```

# Step: logo-font-weight
title: "CSS: .logo / font-weight"
summary: Pojačavamo slovo da liči na pravi brand znak.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:logo-font-weight
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="logo"

## Scene: logo-font-weight-scene

### Narration
Pojačavamo slovo da liči na pravi brand znak.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
}
```

# Step: logo-background
title: "CSS: .logo / background"
summary: Gradijent dodaje energiju i daje logotipu fokus. Outline namerno ostaje do brand rezimea.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:logo-background
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="logo"

## Scene: logo-background-scene

### Narration
Gradijent dodaje energiju i daje logotipu fokus. Outline namerno ostaje do brand rezimea.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
}
```

# Step: logo-color
title: "CSS: .logo / color"
summary: Bela boja daje čist kontrast preko gradijenta.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:logo-color
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="logo"

## Scene: logo-color-scene

### Narration
Bela boja daje čist kontrast preko gradijenta.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
}
```

# Step: logo-shadow
title: "CSS: .logo / box-shadow"
summary: Shadow dodaje depth i čini logo prisutnijim.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:logo-shadow
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="logo"

## Scene: logo-shadow-scene

### Narration
Shadow dodaje depth i čini logo prisutnijim.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}
```

# Step: brand-copy-html
title: "HTML: Brand Copy"
summary: Dodajemo `.brand-copy` sa naslovom i podnaslovom pored logotipa. I on zadržava svoj outline do završnog brand rezimea.
intent: Tekstualni brand signal pomaže korisniku da zna gde se nalazi.
tag: html:brand-copy
proTip: Tekstualni brand signal pomaže korisniku da zna gde se nalazi.
focusHtmlNeedles:
  - class="brand-copy"
  - <strong>
  - <span>

## Scene: brand-copy-html-scene

### Narration
Dodajemo `.brand-copy` sa naslovom i podnaslovom pored logotipa. I on zadržava svoj outline do završnog brand rezimea.

### Show Code: html
```html
<div class="app-shell">
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="logo">A</div>
      <div class="brand-copy">
        <strong>AdminPro</strong>
        <span>Dashboard</span>
      </div>
    </div>
  </aside>
</div>
```

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
}
```

# Step: brand-copy-outline
title: "CSS: .brand-copy / outline"
summary: Dodajemo tanak helper outline za tekstualni brand blok i držimo ga do završnog brand rezimea.
intent: Isti wrapper, različiti child elementi, različite helper boje.
tag: css:brand-copy-outline
proTip: Isti wrapper, različiti child elementi, različite helper boje.
focusHtmlNeedles:
  - class="brand-copy"

## Scene: brand-copy-outline-scene

### Narration
Dodajemo tanak helper outline za tekstualni brand blok i držimo ga do završnog brand rezimea.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}
```

# Step: brand-strong-display
title: "CSS: .brand-copy strong / display"
summary: Naslov pretvaramo u blok da zauzme svoj red.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:brand-strong-display
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - <strong>

## Scene: brand-strong-display-scene

### Narration
Naslov pretvaramo u blok da zauzme svoj red.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
}
```

# Step: brand-strong-font-size
title: "CSS: .brand-copy strong / font-size"
summary: Naslov dobija čitljiviju veličinu.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:brand-strong-font-size
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - <strong>

## Scene: brand-strong-font-size-scene

### Narration
Naslov dobija čitljiviju veličinu.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}
```

# Step: brand-span-display
title: "CSS: .brand-copy span / display"
summary: Podnaslov spuštamo u novi red.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:brand-span-display
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - <span>

## Scene: brand-span-display-scene

### Narration
Podnaslov spuštamo u novi red.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
}
```

# Step: brand-span-margin-top
title: "CSS: .brand-copy span / margin-top"
summary: Mali razmak odvaja podnaslov od naslova.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:brand-span-margin-top
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - <span>

## Scene: brand-span-margin-top-scene

### Narration
Mali razmak odvaja podnaslov od naslova.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
}
```

# Step: brand-span-font-size
title: "CSS: .brand-copy span / font-size"
summary: Podnaslov pravimo suptilnijim od naslova.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:brand-span-font-size
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - <span>

## Scene: brand-span-font-size-scene

### Narration
Podnaslov pravimo suptilnijim od naslova.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
}
```

# Step: brand-span-color
title: "CSS: .brand-copy span / color"
summary: Muted boja pravi jasnu tekstualnu hijerarhiju.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:brand-span-color
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - <span>

## Scene: brand-span-color-scene

### Narration
Muted boja pravi jasnu tekstualnu hijerarhiju.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}
```

# Step: nav-html
title: "HTML: Nav Wrapper"
summary: Ubacujemo `<nav class="nav-list">` kao kontejner za buduće linkove. Navigacioni outline helperi ostaju aktivni sve do završnog navigation rezimea.
intent: Semantički `nav` element je prirodan izbor za navigaciju.
tag: html:nav
proTip: Semantički `nav` element je prirodan izbor za navigaciju.
focusHtmlNeedles:
  - class="nav-list"

## Scene: nav-html-scene

### Narration
Ubacujemo `<nav class="nav-list">` kao kontejner za buduće linkove. Navigacioni outline helperi ostaju aktivni sve do završnog navigation rezimea.

### Show Code: html
```html
<div class="app-shell">
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="logo">A</div>
      <div class="brand-copy">
        <strong>AdminPro</strong>
        <span>Dashboard</span>
      </div>
    </div>

    <nav class="nav-list">
    </nav>
  </aside>
</div>
```

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
}
```

# Step: nav-list-outline
title: "CSS: .nav-list / outline"
summary: Dodajemo tanak helper outline za praznu nav zonu i držimo ga do završnog navigation rezimea.
intent: Navigacija zadržava helper linije kroz sve svoje poddelove dok ne završimo rezime za nju.
tag: css:nav-list-outline
proTip: Navigacija zadržava helper linije kroz sve svoje poddelove dok ne završimo rezime za nju.
focusHtmlNeedles:
  - class="nav-list"

## Scene: nav-list-outline-scene

### Narration
Dodajemo tanak helper outline za praznu nav zonu i držimo ga do završnog navigation rezimea.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
}
```

# Step: nav-list-padding
title: "CSS: .nav-list / padding"
summary: Dodajemo privremeni helper padding da prazna nav zona dobije visinu pre prvog linka. I njega držimo do završnog navigation rezimea.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-list-padding
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="nav-list"

## Scene: nav-list-padding-scene

### Narration
Dodajemo privremeni helper padding da prazna nav zona dobije visinu pre prvog linka. I njega držimo do završnog navigation rezimea.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
}
```

# Step: nav-list-display
title: "CSS: .nav-list / display"
summary: Navigaciju slažemo u grid da spacing bude čist.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-list-display
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="nav-list"

## Scene: nav-list-display-scene

### Narration
Navigaciju slažemo u grid da spacing bude čist.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
}
```

# Step: nav-list-gap
title: "CSS: .nav-list / gap"
summary: Gap održava ravnomeran razmak između stavki.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-list-gap
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="nav-list"

## Scene: nav-list-gap-scene

### Narration
Gap održava ravnomeran razmak između stavki.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}
```

# Step: nav-items-html
title: "HTML: Nav Items"
summary: Dodajemo prve `.nav-item` linkove sa ikonama i labelama. I stavke i ikonice zadržavaju outline helpere do navigation rezimea.
intent: Prvo ubaci markup za stavke, pa onda stilizuj svaki sloj ponaosob.
tag: html:nav-item
proTip: Prvo ubaci markup za stavke, pa onda stilizuj svaki sloj ponaosob.
focusHtmlNeedles:
  - class="nav-item
  - class="icon"
  - class="label"

## Scene: nav-items-html-scene

### Narration
Dodajemo prve `.nav-item` linkove sa ikonama i labelama. I stavke i ikonice zadržavaju outline helpere do navigation rezimea.

### Show Code: html
```html
<div class="app-shell">
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="logo">A</div>
      <div class="brand-copy">
        <strong>AdminPro</strong>
        <span>Dashboard</span>
      </div>
    </div>

    <nav class="nav-list">
      <a href="#" class="nav-item active"><span class="icon">⌂</span><span class="label">Overview</span></a>
      <a href="#" class="nav-item"><span class="icon">◫</span><span class="label">Analytics</span></a>
      <a href="#" class="nav-item"><span class="icon">◧</span><span class="label">Orders</span></a>
      <a href="#" class="nav-item"><span class="icon">◎</span><span class="label">Customers</span></a>
      <a href="#" class="nav-item"><span class="icon">▣</span><span class="label">Products</span></a>
      <a href="#" class="nav-item"><span class="icon">⚙</span><span class="label">Settings</span></a>
    </nav>
  </aside>
</div>
```

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
}
```

# Step: nav-item-outline
title: "CSS: .nav-item / outline"
summary: Svaka stavka dobija tanak helper outline i zadržava ga do završnog navigation rezimea.
intent: Svaki deo navigacije zadržava svoju helper boju dok traje cela navigaciona celina.
tag: css:nav-item-outline
proTip: Svaki deo navigacije zadržava svoju helper boju dok traje cela navigaciona celina.
focusHtmlNeedles:
  - class="nav-item

## Scene: nav-item-outline-scene

### Narration
Svaka stavka dobija tanak helper outline i zadržava ga do završnog navigation rezimea.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
}
```

# Step: nav-item-display
title: "CSS: .nav-item / display"
summary: Svaka stavka postaje flex red da ikona i tekst stanu jedan do drugog.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-item-display
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="nav-item

## Scene: nav-item-display-scene

### Narration
Svaka stavka postaje flex red da ikona i tekst stanu jedan do drugog.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
}
```

# Step: nav-item-min-height
title: "CSS: .nav-item / min-height"
summary: Klik zona dobija pristojnu visinu.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-item-min-height
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="nav-item

## Scene: nav-item-min-height-scene

### Narration
Klik zona dobija pristojnu visinu.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
}
```

# Step: nav-item-padding
title: "CSS: .nav-item / padding"
summary: Padding pravi realnu klik zonu i diše bolje od golog teksta.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-item-padding
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="nav-item

## Scene: nav-item-padding-scene

### Narration
Padding pravi realnu klik zonu i diše bolje od golog teksta.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
}
```

# Step: nav-item-align-items
title: "CSS: .nav-item / align-items"
summary: Vertikalno centriramo sadržaj svake stavke.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-item-align-items
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="nav-item

## Scene: nav-item-align-items-scene

### Narration
Vertikalno centriramo sadržaj svake stavke.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
}
```

# Step: nav-item-gap
title: "CSS: .nav-item / gap"
summary: Gap odvaja ikonu od labele.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-item-gap
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="nav-item

## Scene: nav-item-gap-scene

### Narration
Gap odvaja ikonu od labele.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
}
```

# Step: nav-icon-outline
title: "CSS: .nav-item .icon / outline"
summary: Ikonica dobija svoj tanak outline i zadržava ga do završnog navigation rezimea.
intent: I ikonica je teaching target i zato ostaje označena dok traje objašnjenje.
tag: css:nav-icon-outline
proTip: I ikonica je teaching target i zato ostaje označena dok traje objašnjenje.
focusHtmlNeedles:
  - class="icon"

## Scene: nav-icon-outline-scene

### Narration
Ikonica dobija svoj tanak outline i zadržava ga do završnog navigation rezimea.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
}
```

# Step: nav-icon-width
title: "CSS: .nav-item .icon / width"
summary: Ikona dobija fiksnu širinu.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-icon-width
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="icon"

## Scene: nav-icon-width-scene

### Narration
Ikona dobija fiksnu širinu.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
}
```

# Step: nav-icon-height
title: "CSS: .nav-item .icon / height"
summary: Ikona dobija i fiksnu visinu radi konzistentnog kvadrata.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-icon-height
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="icon"

## Scene: nav-icon-height-scene

### Narration
Ikona dobija i fiksnu visinu radi konzistentnog kvadrata.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
}
```

# Step: nav-icon-display
title: "CSS: .nav-item .icon / display"
summary: Grid olakšava centriranje sadržaja ikone.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-icon-display
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="icon"

## Scene: nav-icon-display-scene

### Narration
Grid olakšava centriranje sadržaja ikone.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
}
```

# Step: nav-icon-place-items
title: "CSS: .nav-item .icon / place-items"
summary: Ikonicu centriramo i horizontalno i vertikalno.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-icon-place-items
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="icon"

## Scene: nav-icon-place-items-scene

### Narration
Ikonicu centriramo i horizontalno i vertikalno.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}
```

# Step: nav-label-font-size
title: "CSS: .nav-item .label / font-size"
summary: Labela dobija čitljivu veličinu.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-label-font-size
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="label"

## Scene: nav-label-font-size-scene

### Narration
Labela dobija čitljivu veličinu.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
}
```

# Step: nav-label-font-weight
title: "CSS: .nav-item .label / font-weight"
summary: Blago pojačavamo labelu da zadrži hijerarhiju.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-label-font-weight
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="label"

## Scene: nav-label-font-weight-scene

### Narration
Blago pojačavamo labelu da zadrži hijerarhiju.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}
```

# Step: nav-item-radius
title: "CSS: .nav-item / border-radius"
summary: Zaobljene ivice daju linkovima mekši, UI osećaj. Outline helper i dalje ostaje do rezimea.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-item-radius
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="nav-item

## Scene: nav-item-radius-scene

### Narration
Zaobljene ivice daju linkovima mekši, UI osećaj. Outline helper i dalje ostaje do rezimea.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}
```

# Step: nav-item-margin
title: "CSS: .nav-item / margin"
summary: Spoljni razmak odvaja stavke od ivice sidebara.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-item-margin
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="nav-item

## Scene: nav-item-margin-scene

### Narration
Spoljni razmak odvaja stavke od ivice sidebara.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}
```

# Step: nav-item-active-background
title: "CSS: .nav-item.active / background"
summary: Aktivna stavka dobija svoju pozadinu, ali helper outline ostaje do navigation rezimea.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-item-active-background
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="nav-item active"

## Scene: nav-item-active-background-scene

### Narration
Aktivna stavka dobija svoju pozadinu, ali helper outline ostaje do navigation rezimea.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
}
```

# Step: nav-item-active-color
title: "CSS: .nav-item.active / color"
summary: Boju aktivne stavke pojačavamo za bolji kontrast.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-item-active-color
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="nav-item active"

## Scene: nav-item-active-color-scene

### Narration
Boju aktivne stavke pojačavamo za bolji kontrast.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}
```

# Step: nav-item-transition
title: "CSS: .nav-item / transition"
summary: Dodajemo glatku tranziciju za hover i active stanje.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-item-transition
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="nav-item

## Scene: nav-item-transition-scene

### Narration
Dodajemo glatku tranziciju za hover i active stanje.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}
```

# Step: nav-item-hover-background
title: "CSS: .nav-item:hover / background"
summary: Hover feedback potvrđuje da je stavka interaktivna.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:nav-item-hover-background
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="nav-item

## Scene: nav-item-hover-background-scene

### Narration
Hover feedback potvrđuje da je stavka interaktivna.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}
```

# Step: collapse-width
title: "CSS: .sidebar.is-collapsed / width"
summary: Collapsed mod sužava sidebar na kompaktnu širinu.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:collapse-width
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar"

## Scene: collapse-width-scene

### Narration
Collapsed mod sužava sidebar na kompaktnu širinu.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}
```

# Step: footer-html
title: "HTML: Sidebar Footer"
summary: Dodajemo `.sidebar-footer` kao završni informativni blok pri dnu sidebara. Footer takođe dobija svoj outline helper koji ostaje do njegovog završnog rezimea.
intent: Footer je i dalje deo sidebara, pa i njega gradimo iz istog toka.
tag: html:footer
proTip: Footer je i dalje deo sidebara, pa i njega gradimo iz istog toka.
focusHtmlNeedles:
  - class="sidebar-footer"
  - <p>Sidebar nije samo lista linkova.

## Scene: footer-html-scene

### Narration
Dodajemo `.sidebar-footer` kao završni informativni blok pri dnu sidebara. Footer takođe dobija svoj outline helper koji ostaje do njegovog završnog rezimea.

### Show Code: html
```html
<div class="app-shell">
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="logo">A</div>
      <div class="brand-copy">
        <strong>AdminPro</strong>
        <span>Dashboard</span>
      </div>
    </div>

    <nav class="nav-list">
      <a href="#" class="nav-item active"><span class="icon">⌂</span><span class="label">Overview</span></a>
      <a href="#" class="nav-item"><span class="icon">◫</span><span class="label">Analytics</span></a>
      <a href="#" class="nav-item"><span class="icon">◧</span><span class="label">Orders</span></a>
      <a href="#" class="nav-item"><span class="icon">◎</span><span class="label">Customers</span></a>
      <a href="#" class="nav-item"><span class="icon">▣</span><span class="label">Products</span></a>
      <a href="#" class="nav-item"><span class="icon">⚙</span><span class="label">Settings</span></a>
    </nav>

    <div class="sidebar-footer">
      <strong>Pro Tip</strong>
      <p>Sidebar nije samo lista linkova. On je layout zona sa ritmom, hijerarhijom i stanjima.</p>
    </div>
  </aside>
</div>
```

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar-footer {
}
```

# Step: sidebar-display-flex
title: "CSS: .sidebar / display"
summary: Sidebar pretvaramo u flex kolonu da footer može da ode na dno.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:sidebar-display-flex
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar"

## Scene: sidebar-display-flex-scene

### Narration
Sidebar pretvaramo u flex kolonu da footer može da ode na dno.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar-footer {
}
```

# Step: sidebar-flex-direction
title: "CSS: .sidebar / flex-direction"
summary: Kolona omogućava prirodan vertikalni raspored sekcija.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:sidebar-flex-direction
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar"

## Scene: sidebar-flex-direction-scene

### Narration
Kolona omogućava prirodan vertikalni raspored sekcija.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar-footer {
}
```

# Step: footer-outline
title: "CSS: .sidebar-footer / outline"
summary: Dodajemo tanak helper outline za footer i držimo ga do završnog footer rezimea.
intent: I footer dobija svoju helper boju jer je poseban teaching element.
tag: css:footer-outline
proTip: I footer dobija svoju helper boju jer je poseban teaching element.
focusHtmlNeedles:
  - class="sidebar-footer"

## Scene: footer-outline-scene

### Narration
Dodajemo tanak helper outline za footer i držimo ga do završnog footer rezimea.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar-footer {
  outline: 1px dashed #c084fc;
}
```

# Step: footer-border
title: "CSS: .sidebar-footer / border"
summary: Tanka linija razdvaja footer od pozadine.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:footer-border
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar-footer"

## Scene: footer-border-scene

### Narration
Tanka linija razdvaja footer od pozadine.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar-footer {
  outline: 1px dashed #c084fc;
  border: 1px solid rgba(255,255,255,0.12);
}
```

# Step: footer-background
title: "CSS: .sidebar-footer / background"
summary: Blaga pozadina izdvaja footer bez teškog kontrasta.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:footer-background
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar-footer"

## Scene: footer-background-scene

### Narration
Blaga pozadina izdvaja footer bez teškog kontrasta.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar-footer {
  outline: 1px dashed #c084fc;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
}
```

# Step: footer-padding
title: "CSS: .sidebar-footer / padding"
summary: Footer dobija unutrašnji spacing.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:footer-padding
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar-footer"

## Scene: footer-padding-scene

### Narration
Footer dobija unutrašnji spacing.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar-footer {
  outline: 1px dashed #c084fc;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  padding: 16px;
}
```

# Step: footer-radius
title: "CSS: .sidebar-footer / border-radius"
summary: Zaobljenje usklađuje footer sa ostatkom UI-ja.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:footer-radius
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar-footer"

## Scene: footer-radius-scene

### Narration
Zaobljenje usklađuje footer sa ostatkom UI-ja.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar-footer {
  outline: 1px dashed #c084fc;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  padding: 16px;
  border-radius: 14px;
}
```

# Step: footer-margin-top
title: "CSS: .sidebar-footer / margin-top"
summary: Auto margin gura footer na dno kolone.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:footer-margin-top
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar-footer"

## Scene: footer-margin-top-scene

### Narration
Auto margin gura footer na dno kolone.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar-footer {
  outline: 1px dashed #c084fc;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  padding: 16px;
  border-radius: 14px;
  margin-top: auto;
}
```

# Step: footer-text-margin
title: "CSS: .sidebar-footer p / margin"
summary: Odstupamo paragraf od naslova unutar footera.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:footer-text-margin
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - <p>Sidebar nije samo lista linkova.

## Scene: footer-text-margin-scene

### Narration
Odstupamo paragraf od naslova unutar footera.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar-footer {
  outline: 1px dashed #c084fc;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  padding: 16px;
  border-radius: 14px;
  margin-top: auto;
}

.sidebar-footer p {
  margin: 6px 0 0;
}
```

# Step: footer-text-color
title: "CSS: .sidebar-footer p / color"
summary: Muted ton čini pomoćni tekst nenametljivim.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:footer-text-color
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - <p>Sidebar nije samo lista linkova.

## Scene: footer-text-color-scene

### Narration
Muted ton čini pomoćni tekst nenametljivim.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar-footer {
  outline: 1px dashed #c084fc;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  padding: 16px;
  border-radius: 14px;
  margin-top: auto;
}

.sidebar-footer p {
  margin: 6px 0 0;
  color: #9aa6c8;
}
```

# Step: footer-text-line-height
title: "CSS: .sidebar-footer p / line-height"
summary: Line-height daje tekstu dovoljno vazduha.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:footer-text-line-height
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - <p>Sidebar nije samo lista linkova.

## Scene: footer-text-line-height-scene

### Narration
Line-height daje tekstu dovoljno vazduha.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar-footer {
  outline: 1px dashed #c084fc;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  padding: 16px;
  border-radius: 14px;
  margin-top: auto;
}

.sidebar-footer p {
  margin: 6px 0 0;
  color: #9aa6c8;
  line-height: 1.5;
}
```

# Step: hide-labels
title: "CSS: .sidebar.is-collapsed .brand-copy, .sidebar.is-collapsed .nav-item .label / display"
summary: U collapsed modu sakrivamo tekstualne labele i brand copy.
intent: Collapse ne znači da gubiš strukturu, već da je svodiš na ikone.
tag: css:hide-labels
proTip: Collapse ne znači da gubiš strukturu, već da je svodiš na ikone.
focusHtmlNeedles:
  - class="brand-copy"
  - class="label"

## Scene: hide-labels-scene

### Narration
U collapsed modu sakrivamo tekstualne labele i brand copy.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar.is-collapsed .brand-copy,
.sidebar.is-collapsed .nav-item .label {
  display: none;
}

.sidebar-footer {
  outline: 1px dashed #c084fc;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  padding: 16px;
  border-radius: 14px;
  margin-top: auto;
}

.sidebar-footer p {
  margin: 6px 0 0;
  color: #9aa6c8;
  line-height: 1.5;
}
```

# Step: responsive-sidebar-min-height
title: "CSS: .sidebar / min-height"
summary: Na manjim ekranima sidebar više ne mora da glumi pun viewport.
intent: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
tag: css:responsive-sidebar-min-height
proTip: Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.
focusHtmlNeedles:
  - class="sidebar"

## Scene: responsive-sidebar-min-height-scene

### Narration
Na manjim ekranima sidebar više ne mora da glumi pun viewport.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  outline: 1px solid #ff4757;
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar.is-collapsed .brand-copy,
.sidebar.is-collapsed .nav-item .label {
  display: none;
}

.sidebar-footer {
  outline: 1px dashed #c084fc;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  padding: 16px;
  border-radius: 14px;
  margin-top: auto;
}

.sidebar-footer p {
  margin: 6px 0 0;
  color: #9aa6c8;
  line-height: 1.5;
}

@media (max-width: 980px) {
  .sidebar {
    min-height: auto;
  }
}
```

# Step: sidebar-summary
title: "Rezime: .sidebar"
summary: "Završni rezime za `.sidebar`: helper outline više nije potreban, jer je sav osnovni CSS za shell već kompletan i jasan."
intent: Rezime korak je mesto gde helper outline odlazi i ostaje čist završni CSS za tu celinu.
tag: summary:sidebar-summary
proTip: Rezime korak je mesto gde helper outline odlazi i ostaje čist završni CSS za tu celinu.
focusHtmlNeedles:
  - class="sidebar"

## Scene: sidebar-summary-scene

### Narration
Završni rezime za `.sidebar`: helper outline više nije potreban, jer je sav osnovni CSS za shell već kompletan i jasan.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
  /* helper outline removed in final .sidebar summary */
}

.sidebar-brand {
  outline: 1px solid #2ed573;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo {
  outline: 1px dotted #7dd3fc;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
}

.brand-copy {
  outline: 1px dashed #f59e0b;
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar.is-collapsed .brand-copy,
.sidebar.is-collapsed .nav-item .label {
  display: none;
}

.sidebar-footer {
  outline: 1px dashed #c084fc;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  padding: 16px;
  border-radius: 14px;
  margin-top: auto;
}

.sidebar-footer p {
  margin: 6px 0 0;
  color: #9aa6c8;
  line-height: 1.5;
}

@media (max-width: 980px) {
  .sidebar {
    min-height: auto;
  }
}
```

# Step: brand-summary
title: "Rezime: Brand Celina"
summary: Rezimiramo brand wrapper, logo i brand copy. Tek sada uklanjamo njihove outline helpere jer je ceo brand blok završen.
intent: Kada više povezanih elemenata čine jednu teaching celinu, outline može da nestane tek u zajedničkom rezime koraku.
tag: summary:brand-summary
proTip: Kada više povezanih elemenata čine jednu teaching celinu, outline može da nestane tek u zajedničkom rezime koraku.
focusHtmlNeedles:
  - class="sidebar-brand"
  - class="logo"
  - class="brand-copy"

## Scene: brand-summary-scene

### Narration
Rezimiramo brand wrapper, logo i brand copy. Tek sada uklanjamo njihove outline helpere jer je ceo brand blok završen.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
  /* helper outline removed in final .sidebar summary */
}

.sidebar-brand {
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
  /* helper outline removed in final brand summary */
}

.logo {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
  /* logo helper outline removed in final brand summary */
}

.brand-copy {
  /* brand-copy helper outline removed in final brand summary */
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  outline: 1px dashed #38bdf8;
  padding: 10px 8px;
  display: grid;
  gap: 10px;
}

.nav-item {
  outline: 1px solid #ffa502;
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
}

.nav-item .icon {
  outline: 1px dotted #7dd3fc;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar.is-collapsed .brand-copy,
.sidebar.is-collapsed .nav-item .label {
  display: none;
}

.sidebar-footer {
  outline: 1px dashed #c084fc;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  padding: 16px;
  border-radius: 14px;
  margin-top: auto;
}

.sidebar-footer p {
  margin: 6px 0 0;
  color: #9aa6c8;
  line-height: 1.5;
}

@media (max-width: 980px) {
  .sidebar {
    min-height: auto;
  }
}
```

# Step: navigation-summary
title: "Rezime: Navigation Celina"
summary: Rezimiramo nav zonu, stavke i ikonice. Tek sada uklanjamo outline helpere sa cele navigacione celine.
intent: Outline helperi za navigaciju ostaju dok svi delovi navigacije ne budu kompletno objašnjeni.
tag: summary:navigation-summary
proTip: Outline helperi za navigaciju ostaju dok svi delovi navigacije ne budu kompletno objašnjeni.
focusHtmlNeedles:
  - class="nav-list"
  - class="nav-item
  - class="icon"

## Scene: navigation-summary-scene

### Narration
Rezimiramo nav zonu, stavke i ikonice. Tek sada uklanjamo outline helpere sa cele navigacione celine.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
  /* helper outline removed in final .sidebar summary */
}

.sidebar-brand {
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
  /* helper outline removed in final brand summary */
}

.logo {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
  /* logo helper outline removed in final brand summary */
}

.brand-copy {
  /* brand-copy helper outline removed in final brand summary */
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  display: grid;
  gap: 10px;
  /* nav wrapper helper outline removed in final navigation summary */
}

.nav-item {
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
  /* nav item helper outline removed in final navigation summary */
}

.nav-item .icon {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  /* nav icon helper outline removed in final navigation summary */
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar.is-collapsed .brand-copy,
.sidebar.is-collapsed .nav-item .label {
  display: none;
}

.sidebar-footer {
  outline: 1px dashed #c084fc;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  padding: 16px;
  border-radius: 14px;
  margin-top: auto;
}

.sidebar-footer p {
  margin: 6px 0 0;
  color: #9aa6c8;
  line-height: 1.5;
}

@media (max-width: 980px) {
  .sidebar {
    min-height: auto;
  }
}
```

# Step: footer-summary
title: "Rezime: Footer"
summary: Rezimiramo footer blok i uklanjamo njegov helper outline tek sada, kada je ceo footer vizuelno završen.
intent: Outline za footer služi učenju i zato ostaje sve do poslednjeg footer rezimea.
tag: summary:footer-summary
proTip: Outline za footer služi učenju i zato ostaje sve do poslednjeg footer rezimea.
focusHtmlNeedles:
  - class="sidebar-footer"
  - <p>Sidebar nije samo lista linkova.

## Scene: footer-summary-scene

### Narration
Rezimiramo footer blok i uklanjamo njegov helper outline tek sada, kada je ceo footer vizuelno završen.

### Show Code: css
```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

.sidebar {
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
  /* helper outline removed in final .sidebar summary */
}

.sidebar-brand {
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
  /* helper outline removed in final brand summary */
}

.logo {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
  /* logo helper outline removed in final brand summary */
}

.brand-copy {
  /* brand-copy helper outline removed in final brand summary */
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  display: grid;
  gap: 10px;
  /* nav wrapper helper outline removed in final navigation summary */
}

.nav-item {
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
  /* nav item helper outline removed in final navigation summary */
}

.nav-item .icon {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  /* nav icon helper outline removed in final navigation summary */
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar.is-collapsed .brand-copy,
.sidebar.is-collapsed .nav-item .label {
  display: none;
}

.sidebar-footer {
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  padding: 16px;
  border-radius: 14px;
  margin-top: auto;
  /* footer helper outline removed in final footer summary */
}

.sidebar-footer p {
  margin: 6px 0 0;
  color: #9aa6c8;
  line-height: 1.5;
}

@media (max-width: 980px) {
  .sidebar {
    min-height: auto;
  }
}
```

# Step: shell-summary
title: "Rezime: .app-shell"
summary: "Završni shell rezime: tek sada uklanjamo helper outline sa `.app-shell`, jer je cela sidebar lekcija kompletna i okvir više nije potreban."
intent: App shell outline ostaje sve vreme kao teaching okvir, pa nestaje tek na samom kraju lekcije.
tag: summary:shell-summary
proTip: App shell outline ostaje sve vreme kao teaching okvir, pa nestaje tek na samom kraju lekcije.
focusHtmlNeedles:
  - <div class="app-shell">

## Scene: shell-summary-scene

### Narration
Završni shell rezime: tek sada uklanjamo helper outline sa `.app-shell`, jer je cela sidebar lekcija kompletna i okvir više nije potreban.

### Show Code: css
```css
.app-shell {
  /* helper outline removed in final .app-shell summary */
}

.sidebar {
  width: 280px;
  min-height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.12);
  background: #0b1020;
  color: #edf2ff;
  display: flex;
  flex-direction: column;
  /* helper outline removed in final .sidebar summary */
}

.sidebar-brand {
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
  /* helper outline removed in final brand summary */
}

.logo {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-weight: 800;
  background: linear-gradient(135deg, #6d73ff, #8f5cff);
  color: white;
  box-shadow: 0 12px 24px rgba(109,115,255,0.30);
  /* logo helper outline removed in final brand summary */
}

.brand-copy {
  /* brand-copy helper outline removed in final brand summary */
}

.brand-copy strong {
  display: block;
  font-size: 16px;
}

.brand-copy span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #9aa6c8;
}

.nav-list {
  display: grid;
  gap: 10px;
  /* nav wrapper helper outline removed in final navigation summary */
}

.nav-item {
  display: flex;
  min-height: 52px;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  margin: 0 8px;
  transition: all 0.4s ease;
  /* nav item helper outline removed in final navigation summary */
}

.nav-item .icon {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  /* nav icon helper outline removed in final navigation summary */
}

.nav-item .label {
  font-size: 15px;
  font-weight: 600;
}

.nav-item.active {
  background: rgba(109,115,255,0.14);
  color: white;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
}

.sidebar.is-collapsed {
  width: 108px;
}

.sidebar.is-collapsed .brand-copy,
.sidebar.is-collapsed .nav-item .label {
  display: none;
}

.sidebar-footer {
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  padding: 16px;
  border-radius: 14px;
  margin-top: auto;
  /* footer helper outline removed in final footer summary */
}

.sidebar-footer p {
  margin: 6px 0 0;
  color: #9aa6c8;
  line-height: 1.5;
}

@media (max-width: 980px) {
  .sidebar {
    min-height: auto;
  }
}
```

# Step: done
title: "Done: Sidebar"
summary: "Tutorijal je sada potpuno detaljan: CSS ide kumulativno, property po property, a outline helperi odlaze tek u rezime koracima."
intent: Kada je tok ovako sitno razbijen, promene su mnogo lakše za praćenje i u kodu i u prikazu sidebara.
tag: success
proTip: Kada je tok ovako sitno razbijen, promene su mnogo lakše za praćenje i u kodu i u prikazu sidebara.

## Scene: done-scene

### Narration
Tutorijal je sada potpuno detaljan: CSS ide kumulativno, property po property, a outline helperi odlaze tek u rezime koracima.

### Show Code: html
```html
<div class="app-shell">
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="logo">A</div>
      <div class="brand-copy">
        <strong>AdminPro</strong>
        <span>Dashboard</span>
      </div>
    </div>

    <nav class="nav-list">
      <a href="#" class="nav-item active"><span class="icon">⌂</span><span class="label">Overview</span></a>
      <a href="#" class="nav-item"><span class="icon">◫</span><span class="label">Analytics</span></a>
      <a href="#" class="nav-item"><span class="icon">◧</span><span class="label">Orders</span></a>
      <a href="#" class="nav-item"><span class="icon">◎</span><span class="label">Customers</span></a>
      <a href="#" class="nav-item"><span class="icon">▣</span><span class="label">Products</span></a>
      <a href="#" class="nav-item"><span class="icon">⚙</span><span class="label">Settings</span></a>
    </nav>

    <div class="sidebar-footer">
      <strong>Pro Tip</strong>
      <p>Sidebar nije samo lista linkova. On je layout zona sa ritmom, hijerarhijom i stanjima.</p>
    </div>
  </aside>
</div>
```
