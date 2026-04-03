---
schemaVersion: 1
lessonId: 09-human-first-script-demo
lessonTitle: Human-First Script Demo
lessonIntro: Izrada napredne Web Komponente za profil korisnika koristeći Shadow DOM i custom evente.
status: active
courseId: step-by-step-animator
order: 9
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
  - artifactId: js
    language: js
    label: ui-user-avatar.js
    isPrimary: false
  - artifactId: template-js
    language: js
    label: ui-user-avatar.template.js
    isPrimary: false
  - artifactId: shadow-css
    language: css
    label: ui-user-avatar.shadow.css
    isPrimary: false
preview:
  type: dom
  title: Live Dashboard Avatar Widget Preview
  address: browser://09-human-first-script-demo-preview
ideMode: true
goal:
  title: 'Cilj: UI User Avatar Widget'
  imageSrc: ./assets/web-component-goal.svg
  imageAlt: Referentna slika ui-user-avatar dashboard widgeta sa status badge-om, tooltip-om i inizialima.
  imageCaption: U ovoj lekciji prvo sklapamo kompletan vizuelni team member widget, a tek onda osposobljavamo status, tooltip i event ponašanje.
homework:
  enabled: true
  title: Varijante za samostalnu vežbu
  items:
    - Dodaj `<img>` podršku u `initials` slot — komponenta treba da sakrije inicijale kada postoji slika.
    - Implementiraj drag-to-reorder na grid od više `ui-user-avatar` widget-a uz `draggable="true"` i `dragover`/`drop` event contract.
    - 'Dodaj context menu event: `ui-user-avatar:context-menu` koji se emituje na desni klik sa `{username, role, status, x, y}` payload-om.'
    - Dodaj `size` atribut sa varijantama `sm`, `md`, `lg` koji menja dimenzije avatara kroz host CSS tokenе.
---

# Step: empty-shell
title: Start from an empty app shell...
summary: Počinjemo od neutralnog host prostora za widget.
intent: Komponenta mora da deluje prirodno u običnom app shell-u, ne samo u specijalnoj demo sceni

tag: html:app-shell
proTip: Najpre definišemo okruženje, pa tek onda gradimo widget.
focusHtmlNeedles:
  - <div class="app-shell">

## Scene: empty-shell-scene

### Narration
Svaki put kada pravimo novu komponentu, volim da krenem od praznog "app shell-a". To nam daje neutralan i realističan prostor u kojem možemo da testiramo kako se naš widget ponaša.

### Show Code: html
```html
<div class="app-shell">
  <!-- Ovde će ući naš avatar widget -->
</div>
```

### Show Code: css
```css
.app-shell {
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  color: #f1f5f9;
  font-family: Inter, sans-serif;
}
```

# Step: avatar-html-container
title: HTML: Avatar Container Div
summary: Dodajemo osnovni div sa klasom avatar-container.
intent: Počinjemo sa osnovnom strukturom za avatar komponentu.

tag: html:container
proTip: Koristi semantičke klase za organizaciju.
focusHtmlNeedles:
  - <div class="avatar-container">

## Scene: avatar-html-container-scene

### Narration
Počinjemo sa osnovnim HTML-om. Dodajemo div koji će držati sve elemente avatara.

### Show Code: html
```html
<div class="app-shell">
  <div class="avatar-container">
  </div>
</div>
```

# Step: avatar-html-image
title: HTML: Avatar Image Div
summary: Dodajemo div za sliku avatara sa inicijalima.
intent: Avatar slika je centralni element komponente.

tag: html:avatar-image
proTip: Koristi span za inicijale jer je tekst.
focusHtmlNeedles:
  - <div class="avatar-image">

## Scene: avatar-html-image-scene

### Narration
Dodajemo div za avatar sliku sa span-om za inicijale.

### Show Code: html
```html
<div class="app-shell">
  <div class="avatar-container">
    <div class="avatar-image">
      <span class="initials">AP</span>
    </div>
  </div>
</div>
```

# Step: avatar-html-status
title: HTML: Status Badge
summary: Dodajemo div za status indikator.
intent: Status pokazuje da li je korisnik online/busy/offline.

tag: html:status-badge
proTip: Koristi role="img" za accessibility.
focusHtmlNeedles:
  - <div class="status-badge">

## Scene: avatar-html-status-scene

### Narration
Dodajemo mali div za status badge koji će biti pozicioniran apsolutno.

### Show Code: html
```html
<div class="app-shell">
  <div class="avatar-container">
    <div class="avatar-image">
      <span class="initials">AP</span>
    </div>
    <div class="status-badge" role="img" aria-label="Status"></div>
  </div>
</div>
```

# Step: avatar-html-info
title: HTML: User Info Section
summary: Dodajemo div za ime i ulogu korisnika.
intent: Informacije o korisniku su pored slike.

tag: html:user-info
proTip: Koristi span elemente za tekst.
focusHtmlNeedles:
  - <div class="avatar-info">

## Scene: avatar-html-info-scene

### Narration
Dodajemo sekciju sa informacijama o korisniku: ime i uloga.

### Show Code: html
```html
<div class="app-shell">
  <div class="avatar-container">
    <div class="avatar-image">
      <span class="initials">AP</span>
    </div>
    <div class="status-badge" role="img" aria-label="Status"></div>
    <div class="avatar-info">
      <span class="username">Ana Petrović</span>
      <span class="role">Frontend Lead</span>
    </div>
  </div>
</div>
```

# Step: avatar-html-tooltip
title: HTML: Tooltip Element
summary: Dodajemo div za tooltip koji se pojavljuje na hover.
intent: Tooltip pruža dodatne informacije bez zauzimanja prostora.

tag: html:tooltip
proTip: Koristi role="tooltip" za accessibility.
focusHtmlNeedles:
  - <div class="tooltip">

## Scene: avatar-html-tooltip-scene

### Narration
Dodajemo tooltip element sa punim opisom korisnika.

### Show Code: html
```html
<div class="app-shell">
  <div class="avatar-container">
    <div class="avatar-image">
      <span class="initials">AP</span>
    </div>
    <div class="status-badge" role="img" aria-label="Status"></div>
    <div class="avatar-info">
      <span class="username">Ana Petrović</span>
      <span class="role">Frontend Lead</span>
    </div>
    <div class="tooltip" role="tooltip">
      Ana Petrović · Frontend Lead · Dostupna
    </div>
  </div>
</div>
```

# Step: avatar-css-container
title: CSS: Container Layout
summary: Postavljamo grid layout za avatar container.
intent: Organizujemo elemente u čitljiv raspored.

tag: css:container-layout
proTip: Grid je idealan za ovakve komponente.
focusHtmlNeedles:
  - .avatar-container

## Scene: avatar-css-container-scene

### Narration
Postavljamo osnovni layout sa grid-om: slika levo, informacije desno.

### Show Code: css
```css
.app-shell {
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  color: #f1f5f9;
  font-family: Inter, sans-serif;
}

.avatar-container {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
}
```

# Step: avatar-css-visual
title: CSS: Visual Styling
summary: Dodajemo boje, border, padding i shadow.
intent: Komponenta mora da izgleda kao moderan UI element.

tag: css:visual-styling
proTip: Koristi konzistentne boje i razmake.
focusHtmlNeedles:
  - .avatar-container

## Scene: avatar-css-visual-scene

### Narration
Dodajemo vizuelne stilove: pozadinu, border, padding, box-shadow i hover efekte.

### Show Code: css
```css
.app-shell {
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  color: #f1f5f9;
  font-family: Inter, sans-serif;
}

.avatar-container {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
  background: #111827;
  color: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 14px;
  padding: 12px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.30);
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-width: 240px;
  max-width: 420px;
  width: 100%;
}

.avatar-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.38);
}
```

# Step: avatar-css-image
title: CSS: Avatar Image
summary: Stilizujemo kružnu sliku sa inicijalima.
intent: Avatar mora biti prepoznatljiv i proporcionalan.

tag: css:avatar-image
proTip: Koristi gradient za pozadinu.
focusHtmlNeedles:
  - .avatar-image

## Scene: avatar-css-image-scene

### Narration
Stilizujemo avatar sliku kao kružni element sa gradient pozadinom i inicijalima u sredini.

### Show Code: css
```css
.app-shell {
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  color: #f1f5f9;
  font-family: Inter, sans-serif;
}

.avatar-container {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
  background: #111827;
  color: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 14px;
  padding: 12px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.30);
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-width: 240px;
  max-width: 420px;
  width: 100%;
}

.avatar-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.38);
}

.avatar-image {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border: 2px solid rgba(148, 163, 184, 0.28);
  color: #f8fafc;
  font-weight: 800;
  letter-spacing: 0.04em;
  font-size: 1.2rem;
}
```

# Step: avatar-css-status
title: CSS: Status Badge
summary: Stilizujemo status indikator.
intent: Mali zeleni krug u gornjem desnom uglu.

tag: css:status-badge
proTip: Pozicioniraj apsolutno u odnosu na container.
focusHtmlNeedles:
  - .status-badge

## Scene: avatar-css-status-scene

### Narration
Status badge je mali zeleni krug pozicioniran apsolutno.

### Show Code: css
```css
.app-shell {
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  color: #f1f5f9;
  font-family: Inter, sans-serif;
}

.avatar-container {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
  background: #111827;
  color: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 14px;
  padding: 12px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.30);
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-width: 240px;
  max-width: 420px;
  width: 100%;
}

.avatar-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.38);
}

.avatar-image {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border: 2px solid rgba(148, 163, 184, 0.28);
  color: #f8fafc;
  font-weight: 800;
  letter-spacing: 0.04em;
  font-size: 1.2rem;
}

.status-badge {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid #0f172a;
  position: absolute;
  top: 8px;
  right: 8px;
}
```

# Step: avatar-css-info
title: CSS: User Info
summary: Tipografija za ime i ulogu.
intent: Ime veće i bold, uloga manja.

tag: css:user-info
proTip: Koristi line-height za bolju čitljivost.
focusHtmlNeedles:
  - .username
  - .role

## Scene: avatar-css-info-scene

### Narration
Stilizujemo tekst: username veći i bold, role manji sa opacity.

### Show Code: css
```css
.app-shell {
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  color: #f1f5f9;
  font-family: Inter, sans-serif;
}

.avatar-container {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
  background: #111827;
  color: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 14px;
  padding: 12px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.30);
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-width: 240px;
  max-width: 420px;
  width: 100%;
}

.avatar-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.38);
}

.avatar-image {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border: 2px solid rgba(148, 163, 184, 0.28);
  color: #f8fafc;
  font-weight: 800;
  letter-spacing: 0.04em;
  font-size: 1.2rem;
}

.status-badge {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid #0f172a;
  position: absolute;
  top: 8px;
  right: 8px;
}

.username {
  font-size: 1rem;
  font-weight: 700;
  display: block;
}

.role {
  font-size: 0.875rem;
  opacity: 0.84;
  line-height: 1.2;
  display: block;
}
```

# Step: avatar-css-tooltip
title: CSS: Tooltip
summary: Stilizujemo tooltip sa hover efektom.
intent: Tooltip se pojavljuje iznad komponente.

tag: css:tooltip
proTip: Koristi opacity za smooth transition.
focusHtmlNeedles:
  - .tooltip

## Scene: avatar-css-tooltip-scene

### Narration
Tooltip je apsolutno pozicioniran i pojavljuje se na hover.

### Show Code: css
```css
.app-shell {
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  color: #f1f5f9;
  font-family: Inter, sans-serif;
}

.avatar-container {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
  background: #111827;
  color: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 14px;
  padding: 12px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.30);
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-width: 240px;
  max-width: 420px;
  width: 100%;
}

.avatar-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.38);
}

.avatar-image {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border: 2px solid rgba(148, 163, 184, 0.28);
  color: #f8fafc;
  font-weight: 800;
  letter-spacing: 0.04em;
  font-size: 1.2rem;
}

.status-badge {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid #0f172a;
  position: absolute;
  top: 8px;
  right: 8px;
}

.username {
  font-size: 1rem;
  font-weight: 700;
  display: block;
}

.role {
  font-size: 0.875rem;
  opacity: 0.84;
  line-height: 1.2;
  display: block;
}

.tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  font-size: 0.75rem;
  padding: 4px 8px;
  background: rgba(15, 23, 42, 0.95);
  color: #cbd5e1;
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
  white-space: nowrap;
}

.avatar-container:hover .tooltip {
  opacity: 1;
}
```

# Step: introduce-web-component
title: Introducing Web Component
summary: Sada ćemo pretvoriti ovu vizuelnu komponentu u Web Component.
intent: Web Components omogućavaju enkapsulaciju i ponovnu upotrebu.

tag: web-component:introduction
proTip: Web Components su standardni način za kreiranje reusable UI komponenti.
focusHtmlNeedles:
  - <ui-user-avatar

## Scene: introduce-web-component-scene

### Narration
Sada kada imamo funkcionalnu vizuelnu komponentu, pretvorićemo je u Web Component. Ovo će nam dati enkapsulaciju, reusability i standardni API.

### Show Code: html
```html
<div class="app-shell">
  <ui-user-avatar
    username="Ana Petrović"
    role="Frontend Lead"
    status="online"
    profile-url="/team/ana-petrovic"
  >
    <span slot="initials">AP</span>
    <span slot="tooltip">Ana Petrović · Frontend Lead · Dostupna</span>
  </ui-user-avatar>
</div>
```

# Step: custom-element-attributes
title: Custom Element with Attributes
summary: Dodajemo atribute jedan po jedan na custom element.
intent: Atributi definišu javni API komponente.

tag: web-component:attributes
proTip: Koristi kebab-case za HTML atribute.
focusHtmlNeedles:
  - username=

## Scene: custom-element-attributes-scene

### Narration
Počinjemo sa praznim custom elementom, pa dodajemo atribute jedan po jedan.

### Show Code: html
```html
<div class="app-shell">
  <ui-user-avatar>
  </ui-user-avatar>
</div>
```

# Step: username-attribute
title: Username Attribute
summary: Dodajemo username atribut.
intent: Username je osnovna informacija o korisniku.

tag: web-component:username
proTip: Atributi su stringovi, pa ih parsiramo u klasi.
focusHtmlNeedles:
  - username=

## Scene: username-attribute-scene

### Narration
Dodajemo username atribut na custom element.

### Show Code: html
```html
<div class="app-shell">
  <ui-user-avatar
    username="Ana Petrović"
  >
  </ui-user-avatar>
</div>
```

# Step: role-attribute
title: Role Attribute
summary: Dodajemo role atribut.
intent: Role opisuje poziciju korisnika.

tag: web-component:role
proTip: Role može biti "Frontend Lead", "Designer", itd.
focusHtmlNeedles:
  - role=

## Scene: role-attribute-scene

### Narration
Dodajemo role atribut.

### Show Code: html
```html
<div class="app-shell">
  <ui-user-avatar
    username="Ana Petrović"
    role="Frontend Lead"
  >
  </ui-user-avatar>
</div>
```

# Step: status-attribute
title: Status Attribute
summary: Dodajemo status atribut.
intent: Status pokazuje dostupnost korisnika.

tag: web-component:status
proTip: Status može biti "online", "busy", "offline".
focusHtmlNeedles:
  - status=

## Scene: status-attribute-scene

### Narration
Dodajemo status atribut.

### Show Code: html
```html
<div class="app-shell">
  <ui-user-avatar
    username="Ana Petrović"
    role="Frontend Lead"
    status="online"
  >
  </ui-user-avatar>
</div>
```

# Step: profile-url-attribute
title: Profile URL Attribute
summary: Dodajemo profile-url atribut.
intent: URL ka profilu korisnika za navigaciju.

tag: web-component:profile-url
proTip: Koristi relativne URL-ove za routing.
focusHtmlNeedles:
  - profile-url=

## Scene: profile-url-attribute-scene

### Narration
Dodajemo profile-url atribut.

### Show Code: html
```html
<div class="app-shell">
  <ui-user-avatar
    username="Ana Petrović"
    role="Frontend Lead"
    status="online"
    profile-url="/team/ana-petrovic"
  >
  </ui-user-avatar>
</div>
```

# Step: initials-slot
title: Initials Slot
summary: Dodajemo slot za inicijale.
intent: Slot dozvoljava custom sadržaj za avatar.

tag: web-component:initials-slot
proTip: Named slot-ovi su javni API za sadržaj.
focusHtmlNeedles:
  - slot="initials"

## Scene: initials-slot-scene

### Narration
Dodajemo named slot za inicijale.

### Show Code: html
```html
<div class="app-shell">
  <ui-user-avatar
    username="Ana Petrović"
    role="Frontend Lead"
    status="online"
    profile-url="/team/ana-petrovic"
  >
    <span slot="initials">AP</span>
  </ui-user-avatar>
</div>
```

# Step: tooltip-slot
title: Tooltip Slot
summary: Dodajemo slot za tooltip.
intent: Slot za dodatne informacije.

tag: web-component:tooltip-slot
proTip: Tooltip sadržaj može biti kompleksan.
focusHtmlNeedles:
  - slot="tooltip"

## Scene: tooltip-slot-scene

### Narration
Dodajemo named slot za tooltip.

### Show Code: html
```html
<div class="app-shell">
  <ui-user-avatar
    username="Ana Petrović"
    role="Frontend Lead"
    status="online"
    profile-url="/team/ana-petrovic"
  >
    <span slot="initials">AP</span>
    <span slot="tooltip">Ana Petrović · Frontend Lead · Dostupna</span>
  </ui-user-avatar>
</div>
```

# Step: template-structure
title: Template Structure
summary: Kreiramo template sa Shadow DOM strukturom.
intent: Template definiše interni markup komponente.

tag: template-js:structure
proTip: Template je odvojen od behavior-a.
focusHtmlNeedles:
  - <slot name="initials">

## Scene: template-structure-scene

### Narration
U template fajlu definišemo Shadow DOM strukturu sa slot-ovima.

### Show Code: template-js
```js
export const templateHtml = `
  <div class="avatar-container">
    <div class="avatar-image">
      <slot name="initials"></slot>
    </div>
    <div class="status-badge" role="img" aria-label="Status"></div>
    <div class="avatar-info">
      <span class="username"></span>
      <span class="role"></span>
    </div>
    <div class="tooltip" role="tooltip">
      <slot name="tooltip"></slot>
    </div>
  </div>
`;
```

# Step: template-element
title: Template Element Export
summary: Kreiramo template element sa link ka CSS-u.
intent: Template element se klonira u klasi.

tag: template-js:element
proTip: Template uključuje stylesheet link.
focusHtmlNeedles:
  - uiUserAvatarTemplate

## Scene: template-element-scene

### Narration
Eksportujemo template element sa link ka shadow CSS fajlu.

### Show Code: template-js
```js
export const templateHtml = `
  <div class="avatar-container">
    <div class="avatar-image">
      <slot name="initials"></slot>
    </div>
    <div class="status-badge" role="img" aria-label="Status"></div>
    <div class="avatar-info">
      <span class="username"></span>
      <span class="role"></span>
    </div>
    <div class="tooltip" role="tooltip">
      <slot name="tooltip"></slot>
    </div>
  </div>
`;

export const uiUserAvatarTemplate = document.createElement('template');
uiUserAvatarTemplate.innerHTML = `
  <link rel="stylesheet" href="./ui-user-avatar.shadow.css" />
  ${templateHtml}
`;
```

# Step: shadow-css-host
title: Shadow CSS: Host Styling
summary: Stilizujemo host element.
intent: Host styling utiče na spoljašnji izgled komponente.

tag: shadow-css:host
proTip: :host selektor stiliše custom element.
focusHtmlNeedles:
  - :host

## Scene: shadow-css-host-scene

### Narration
U shadow CSS fajlu stilišemo host element.

### Show Code: shadow-css
```css
:host {
  display: block;
}
```

# Step: shadow-css-container
title: Shadow CSS: Container Layout
summary: Grid layout za interne elemente.
intent: Interna struktura koristi isti CSS kao vizuelna verzija.

tag: shadow-css:container
proTip: Shadow CSS je izolovan.
focusHtmlNeedles:
  - .avatar-container

## Scene: shadow-css-container-scene

### Narration
Dodajemo grid layout za avatar container.

### Show Code: shadow-css
```css
:host {
  display: block;
}

.avatar-container {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
  background: #111827;
  color: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 14px;
  padding: 12px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.30);
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-width: 240px;
  max-width: 420px;
  width: 100%;
}

.avatar-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.38);
}
```

# Step: shadow-css-image
title: Shadow CSS: Avatar Image
summary: Stilizujemo avatar sliku.
intent: Kružna slika sa inicijalima.

tag: shadow-css:image
proTip: Koristi slot za sadržaj.
focusHtmlNeedles:
  - .avatar-image

## Scene: shadow-css-image-scene

### Narration
Stilizujemo avatar image div.

### Show Code: shadow-css
```css
.avatar-image {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border: 2px solid rgba(148, 163, 184, 0.28);
  color: #f8fafc;
  font-weight: 800;
  letter-spacing: 0.04em;
  font-size: 1.2rem;
}
```

# Step: shadow-css-status
title: Shadow CSS: Status Badge
summary: Stilizujemo status indikator.
intent: Mali zeleni krug.

tag: shadow-css:status
proTip: Pozicioniran apsolutno.
focusHtmlNeedles:
  - .status-badge

## Scene: shadow-css-status-scene

### Narration
Status badge styling.

### Show Code: shadow-css
```css
.status-badge {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid #0f172a;
  position: absolute;
  top: 8px;
  right: 8px;
}
```

# Step: shadow-css-info
title: Shadow CSS: User Info
summary: Tipografija za username i role.
intent: Hijerarhijski tekst.

tag: shadow-css:info
proTip: Koristi opacity za role.
focusHtmlNeedles:
  - .username
  - .role

## Scene: shadow-css-info-scene

### Narration
Stilizujemo username i role tekst.

### Show Code: shadow-css
```css
.username {
  font-size: 1rem;
  font-weight: 700;
  display: block;
}

.role {
  font-size: 0.875rem;
  opacity: 0.84;
  line-height: 1.2;
  display: block;
}
```

# Step: shadow-css-tooltip
title: Shadow CSS: Tooltip
summary: Hover tooltip styling.
intent: Pojavljuje se na hover.

tag: shadow-css:tooltip
proTip: Koristi opacity za animaciju.
focusHtmlNeedles:
  - .tooltip

## Scene: shadow-css-tooltip-scene

### Narration
Tooltip sa smooth transition.

### Show Code: shadow-css
```css
.tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  font-size: 0.75rem;
  padding: 4px 8px;
  background: rgba(15, 23, 42, 0.95);
  color: #cbd5e1;
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
  white-space: nowrap;
}

.avatar-container:hover .tooltip {
  opacity: 1;
}
```

# Step: import-template
title: Import Template
summary: Uvozimo template u behavior fajl.
intent: Klasa koristi template za Shadow DOM.

tag: js:import-template
proTip: Odvojeni fajlovi za različite odgovornosti.
focusHtmlNeedles:
  - import.*template

## Scene: import-template-scene

### Narration
Uvozimo template modul.

### Show Code: js
```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
```

# Step: class-declaration
title: Class Declaration
summary: Kreiramo UiUserAvatar klasu.
intent: Klasa extends HTMLElement.

tag: js:class-declaration
proTip: Ime klase odgovara tag-u.
focusHtmlNeedles:
  - class UiUserAvatar

## Scene: class-declaration-scene

### Narration
Deklarišemo klasu koja extends HTMLElement.

### Show Code: js
```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';

class UiUserAvatar extends HTMLElement {
}
```

# Step: observed-attributes
title: Observed Attributes
summary: Definišemo atribute koje pratimo.
intent: Ovi atributi triguju attributeChangedCallback.

tag: js:observed-attributes
proTip: Samo javni API atributi.
focusHtmlNeedles:
  - observedAttributes

## Scene: observed-attributes-scene

### Narration
Lista atributa koje komponenta posmatra.

### Show Code: js
```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';

class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];
}
```

# Step: sync-attributes
title: Sync Attributes to DOM
summary: U attributeChangedCallback sinhronizujemo atribute sa DOM-om.
intent: Atributi se prikazuju u spanovima.

tag: js:sync-attributes
proTip: Koristi this.shadowRoot za pristup.
focusHtmlNeedles:
  - attributeChangedCallback

## Scene: sync-attributes-scene

### Narration
Kada se atribut promeni, ažuriramo DOM.

### Show Code: js
```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';

class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.shadowRoot) return;
    
    switch (name) {
      case 'username':
        this.shadowRoot.querySelector('.username').textContent = newValue;
        break;
      case 'role':
        this.shadowRoot.querySelector('.role').textContent = newValue;
        break;
      case 'status':
        this.updateStatusBadge(newValue);
        break;
    }
  }

  updateStatusBadge(status) {
    const badge = this.shadowRoot.querySelector('.status-badge');
    const colors = {
      online: '#22c55e',
      busy: '#f59e0b',
      offline: '#6b7280'
    };
    badge.style.background = colors[status] || colors.offline;
  }
}
```

# Step: render-method
title: Render Method
summary: connectedCallback klonira template i attach-uje Shadow DOM.
intent: Komponenta se renderuje kada se doda u DOM.

tag: js:render-method
proTip: Shadow DOM enkapsuluje stilove.
focusHtmlNeedles:
  - connectedCallback

## Scene: render-method-scene

### Narration
U connectedCallback postavljamo Shadow DOM.

### Show Code: js
```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';

class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
    this.render();
  }

  render() {
    // Sync current attribute values to DOM
    this.attributeChangedCallback('username', null, this.getAttribute('username'));
    this.attributeChangedCallback('role', null, this.getAttribute('role'));
    this.attributeChangedCallback('status', null, this.getAttribute('status'));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.shadowRoot) return;
    
    switch (name) {
      case 'username':
        this.shadowRoot.querySelector('.username').textContent = newValue;
        break;
      case 'role':
        this.shadowRoot.querySelector('.role').textContent = newValue;
        break;
      case 'status':
        this.updateStatusBadge(newValue);
        break;
    }
  }

  updateStatusBadge(status) {
    const badge = this.shadowRoot.querySelector('.status-badge');
    const colors = {
      online: '#22c55e',
      busy: '#f59e0b',
      offline: '#6b7280'
    };
    badge.style.background = colors[status] || colors.offline;
  }
}
```

# Step: dispatch-events
title: Dispatch Events
summary: Dodajemo click event za otvaranje profila.
intent: Komponenta emituje custom event.

tag: js:dispatch-events
proTip: Namespaced eventi za jasnu komunikaciju.
focusHtmlNeedles:
  - dispatchEvent

## Scene: dispatch-events-scene

### Narration
Na click, emitujemo event za otvaranje profila.

### Show Code: js
```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';

class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
    this.render();
    this.addEventListeners();
  }

  addEventListeners() {
    this.shadowRoot.querySelector('.avatar-container').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('ui-user-avatar:profile-open', {
        detail: { profileUrl: this.getAttribute('profile-url') },
        bubbles: true,
        composed: true
      }));
    });
  }

  render() {
    // Sync current attribute values to DOM
    this.attributeChangedCallback('username', null, this.getAttribute('username'));
    this.attributeChangedCallback('role', null, this.getAttribute('role'));
    this.attributeChangedCallback('status', null, this.getAttribute('status'));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.shadowRoot) return;
    
    switch (name) {
      case 'username':
        this.shadowRoot.querySelector('.username').textContent = newValue;
        break;
      case 'role':
        this.shadowRoot.querySelector('.role').textContent = newValue;
        break;
      case 'status':
        this.updateStatusBadge(newValue);
        break;
    }
  }

  updateStatusBadge(status) {
    const badge = this.shadowRoot.querySelector('.status-badge');
    const colors = {
      online: '#22c55e',
      busy: '#f59e0b',
      offline: '#6b7280'
    };
    badge.style.background = colors[status] || colors.offline;
  }
}
```

# Step: keyboard-accessibility
title: Keyboard Accessibility
summary: Dodajemo keyboard evente.
intent: Komponenta mora biti accessible.

tag: js:keyboard-accessibility
proTip: Koristi keydown za Enter/Space.
focusHtmlNeedles:
  - keydown

## Scene: keyboard-accessibility-scene

### Narration
Dodajemo keyboard podršku za Enter i Space.

### Show Code: js
```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';

class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
    this.render();
    this.addEventListeners();
  }

  addEventListeners() {
    const container = this.shadowRoot.querySelector('.avatar-container');
    
    container.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('ui-user-avatar:profile-open', {
        detail: { profileUrl: this.getAttribute('profile-url') },
        bubbles: true,
        composed: true
      }));
    });

    container.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('ui-user-avatar:profile-open', {
          detail: { profileUrl: this.getAttribute('profile-url') },
          bubbles: true,
          composed: true
        }));
      }
    });
  }

  render() {
    // Sync current attribute values to DOM
    this.attributeChangedCallback('username', null, this.getAttribute('username'));
    this.attributeChangedCallback('role', null, this.getAttribute('role'));
    this.attributeChangedCallback('status', null, this.getAttribute('status'));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.shadowRoot) return;
    
    switch (name) {
      case 'username':
        this.shadowRoot.querySelector('.username').textContent = newValue;
        break;
      case 'role':
        this.shadowRoot.querySelector('.role').textContent = newValue;
        break;
      case 'status':
        this.updateStatusBadge(newValue);
        break;
    }
  }

  updateStatusBadge(status) {
    const badge = this.shadowRoot.querySelector('.status-badge');
    const colors = {
      online: '#22c55e',
      busy: '#f59e0b',
      offline: '#6b7280'
    };
    badge.style.background = colors[status] || colors.offline;
  }
}
```

# Step: host-accessible-state
title: Host Accessible State
summary: Dodajemo ARIA atribute na host.
intent: Screen reader podrška.

tag: js:host-accessible-state
proTip: Host element nosi accessible informacije.
focusHtmlNeedles:
  - setAttribute.*aria

## Scene: host-accessible-state-scene

### Narration
Postavljamo ARIA atribute na host elementu.

### Show Code: js
```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';

class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
    this.render();
    this.addEventListeners();
    this.updateAccessibility();
  }

  updateAccessibility() {
    const username = this.getAttribute('username');
    const role = this.getAttribute('role');
    const status = this.getAttribute('status');
    
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.setAttribute('aria-label', `${username}, ${role}, status ${status}`);
  }

  addEventListeners() {
    const container = this.shadowRoot.querySelector('.avatar-container');
    
    container.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('ui-user-avatar:profile-open', {
        detail: { profileUrl: this.getAttribute('profile-url') },
        bubbles: true,
        composed: true
      }));
    });

    container.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('ui-user-avatar:profile-open', {
          detail: { profileUrl: this.getAttribute('profile-url') },
          bubbles: true,
          composed: true
        }));
      }
    });
  }

  render() {
    // Sync current attribute values to DOM
    this.attributeChangedCallback('username', null, this.getAttribute('username'));
    this.attributeChangedCallback('role', null, this.getAttribute('role'));
    this.attributeChangedCallback('status', null, this.getAttribute('status'));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.shadowRoot) return;
    
    switch (name) {
      case 'username':
        this.shadowRoot.querySelector('.username').textContent = newValue;
        break;
      case 'role':
        this.shadowRoot.querySelector('.role').textContent = newValue;
        break;
      case 'status':
        this.updateStatusBadge(newValue);
        break;
    }
  }

  updateStatusBadge(status) {
    const badge = this.shadowRoot.querySelector('.status-badge');
    const colors = {
      online: '#22c55e',
      busy: '#f59e0b',
      offline: '#6b7280'
    };
    badge.style.background = colors[status] || colors.offline;
  }
}
```

# Step: final-preview
title: Final Preview
summary: Kompletna Web Component implementacija.
intent: Prikažimo finalni rezultat.

tag: final:preview
proTip: Web Components su moćni za reusable UI.
focusHtmlNeedles:
  - <ui-user-avatar

## Scene: final-preview-scene

### Narration
Imamo kompletnu Web Component implementaciju sa enkapsulacijom, accessibility i custom eventima.

### Show Code: html
```html
<div class="app-shell">
  <ui-user-avatar
    username="Ana Petrović"
    role="Frontend Lead"
    status="online"
    profile-url="/team/ana-petrovic"
  >
    <span slot="initials">AP</span>
    <span slot="tooltip">Ana Petrović · Frontend Lead · Dostupna</span>
  </ui-user-avatar>
</div>
```

# Step: custom-elements-define
title: Register Custom Element
summary: Registrujemo komponentu sa browser-om.
intent: Browser mora da zna za custom element.

tag: js:custom-elements-define
proTip: Koristi kebab-case za tag ime.
focusHtmlNeedles:
  - customElements.define

## Scene: custom-elements-define-scene

### Narration
Na kraju fajla registrujemo custom element.

### Show Code: js
```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';

class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
    this.render();
    this.addEventListeners();
    this.updateAccessibility();
  }

  updateAccessibility() {
    const username = this.getAttribute('username');
    const role = this.getAttribute('role');
    const status = this.getAttribute('status');
    
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.setAttribute('aria-label', `${username}, ${role}, status ${status}`);
  }

  addEventListeners() {
    const container = this.shadowRoot.querySelector('.avatar-container');
    
    container.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('ui-user-avatar:profile-open', {
        detail: { profileUrl: this.getAttribute('profile-url') },
        bubbles: true,
        composed: true
      }));
    });

    container.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('ui-user-avatar:profile-open', {
          detail: { profileUrl: this.getAttribute('profile-url') },
          bubbles: true,
          composed: true
        }));
      }
    });
  }

  render() {
    // Sync current attribute values to DOM
    this.attributeChangedCallback('username', null, this.getAttribute('username'));
    this.attributeChangedCallback('role', null, this.getAttribute('role'));
    this.attributeChangedCallback('status', null, this.getAttribute('status'));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.shadowRoot) return;
    
    switch (name) {
      case 'username':
        this.shadowRoot.querySelector('.username').textContent = newValue;
        break;
      case 'role':
        this.shadowRoot.querySelector('.role').textContent = newValue;
        break;
      case 'status':
        this.updateStatusBadge(newValue);
        break;
    }
  }

  updateStatusBadge(status) {
    const badge = this.shadowRoot.querySelector('.status-badge');
    const colors = {
      online: '#22c55e',
      busy: '#f59e0b',
      offline: '#6b7280'
    };
    badge.style.background = colors[status] || colors.offline;
  }
}

customElements.define('ui-user-avatar', UiUserAvatar);
```

