---
schemaVersion: 1
lessonId: 07-build-ui-user-avatar
lessonTitle: 07 · UI User Avatar — Dashboard Widget
lessonIntro: 'Gradimo `ui-user-avatar` u dve faze: prvo zatvaramo kompletan vizuelni shell sa HTML, template i CSS slojem kao vizuelnu fazu, a tek onda uključujemo status, tooltip, property API i click behavior korak po korak kao logičku fazu.'
status: active
courseId: step-by-step-animator
order: 7
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
  address: browser://07-build-ui-user-avatar-preview
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

title: "Start: Empty App Shell"
summary: Počinjemo od praznog `.app-shell` prostora. Dashboard widget živi u neutralnom host okruženju.
intent: Enterprise widget mora da radi u bilo kom host kontekstu, ne samo u specijalnoj demo sceni.
tag: html:app-shell
proTip: Enterprise widget mora da radi u bilo kom host kontekstu, ne samo u specijalnoj demo sceni.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: empty-shell-scene

### Narration

Počinjemo od praznog `.app-shell` prostora. Dashboard widget živi u neutralnom host okruženju.

### Show Code: html

```html
<div class="app-shell"></div>
```

### Show Code: css

```css
.app-shell {
}
```

# Step: component-html

title: "HTML: ui-user-avatar Host"
summary: Dodajemo `<ui-user-avatar>` sa `username` i `role` atributima. Tag odmah govori šta ovaj widget jeste.
intent: "Domain-driven naming je prvi enterprise signal: ime taga mora da sugeriše business ulogu komponente."
tag: html:ui-user-avatar
proTip: "Domain-driven naming je prvi enterprise signal: ime taga mora da sugeriše business ulogu komponente."

## Scene: component-html-scene

### Narration

Dodajemo `<ui-user-avatar>` sa `username` i `role` atributima. Tag odmah govori šta ovaj widget jeste.

### Show Code: html

```html
<div class="app-shell">
  <ui-user-avatar username="Ana Petrović" role="Frontend Lead"> </ui-user-avatar>
</div>
```

### Show Code: css

```css
.app-shell {
}

ui-user-avatar {
}
```

# Step: status-attribute-html

title: 'HTML: status="online"'
summary: Dodajemo `status="online"` i uvodimo deklarativni status API. Status je deo HTML contract-a, ne JavaScript stanja.
intent: Declarative status API znači da tim može da promeni status jedino pisanjem atributa, bez znanja o internim detaljima.
tag: html:status
proTip: Declarative status API znači da tim može da promeni status jedino pisanjem atributa, bez znanja o internim detaljima.

## Scene: status-attribute-html-scene

### Narration

Dodajemo `status="online"` i uvodimo deklarativni status API. Status je deo HTML contract-a, ne JavaScript stanja.

### Show Code: html

```html
<div class="app-shell">
  <ui-user-avatar username="Ana Petrović" role="Frontend Lead" status="online"> </ui-user-avatar>
</div>
```

# Step: profile-url-attribute-html

title: "HTML: profile-url atribut"
summary: Dodajemo `profile-url` koji ide u event payload pri kliku. Komponenta ne navigira sama.
intent: Enterprise komponenta emituje event sa payload-om. Ko otvori modal ili navigira — to odlučuje parent, ne komponenta.
tag: html:profile-url
proTip: Enterprise komponenta emituje event sa payload-om. Ko otvori modal ili navigira — to odlučuje parent, ne komponenta.

## Scene: profile-url-attribute-html-scene

### Narration

Dodajemo `profile-url` koji ide u event payload pri kliku. Komponenta ne navigira sama.

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

# Step: initials-slot-html

title: "HTML: Named Slot — initials"
summary: Dodajemo `<span slot="initials">AP</span>`. Slot je javna API površina za inicijale ili sliku.
intent: Named slot dozvoljava parent-u da pošalje custom sadržaj. Komponenta ne zna šta je inicijal ili avatar image — samo pravi prostor.
tag: html:slot-initials
proTip: Named slot dozvoljava parent-u da pošalje custom sadržaj. Komponenta ne zna šta je inicijal ili avatar image — samo pravi prostor.

## Scene: initials-slot-html-scene

### Narration

Dodajemo `<span slot="initials">AP</span>`. Slot je javna API površina za inicijale ili sliku.

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

# Step: tooltip-slot-html

title: "HTML: Named Slot — tooltip"
summary: Dodajemo `<span slot="tooltip">` sa punim contextualnim opisom član tima. Tooltip sadržaj kontroliše parent.
intent: Tooltip je drugi named slot. Sadržaj može biti plain tekst, HTML, pa i keyboard shortcut — komponenta drži samo posuda.
tag: html:slot-tooltip
proTip: Tooltip je drugi named slot. Sadržaj može biti plain tekst, HTML, pa i keyboard shortcut — komponenta drži samo posuda.

## Scene: tooltip-slot-html-scene

### Narration

Dodajemo `<span slot="tooltip">` sa punim contextualnim opisom član tima. Tooltip sadržaj kontroliše parent.

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

# Step: avatar-widget-contract

title: "Teaching Moment: Dashboard Widget Contract"
summary: "Ovaj widget ima četiri javna atributa: `username`, `role`, `status`, `profile-url`. Ima dva named slota: `initials` i `tooltip`. Emituje jedan namespaced event: `ui-user-avatar:profile-open`. Nema internog routing-a i nema opisivanja šta parent treba da uradi."
intent: Enterprise widget API treba da bude uzan, predvidiv i dokumentovan kao javni contract.
tag: teaching:avatar-widget-contract
proTip: Enterprise widget API treba da bude uzan, predvidiv i dokumentovan kao javni contract.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: avatar-widget-contract-scene

### Narration

Ovaj widget ima četiri javna atributa: `username`, `role`, `status`, `profile-url`. Ima dva named slota: `initials` i `tooltip`. Emituje jedan namespaced event: `ui-user-avatar:profile-open`. Nema internog routing-a i nema opisivanja šta parent treba da uradi.

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

# Step: template-html-declaration

title: "Template JS: Shadow DOM struktura"
summary: "U `ui-user-avatar.template.js` definiše `templateHtml`: avatar-container, avatar-image sa slot za inicijale, status-badge, avatar-info sa username i role spanovima, i tooltip sa named slotom."
intent: Template modul nosi samo strukturu. Nema lifecycle-a, nema eventa, nema podataka.
tag: template-js:template-html-declaration
proTip: Template modul nosi samo strukturu. Nema lifecycle-a, nema eventa, nema podataka.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: template-html-declaration-scene

### Narration

U `ui-user-avatar.template.js` definiše `templateHtml`: avatar-container, avatar-image sa slot za inicijale, status-badge, avatar-info sa username i role spanovima, i tooltip sa named slotom.

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

# Step: template-element-export

title: "Template JS: Eksportujemo template element"
summary: Kreiramo `uiUserAvatarTemplate`, dodajemo `<link>` ka shadow CSS fajlu i ubrizgavamo `${templateHtml}`.
intent: Template zna za markup i stylesheet ulaz. Klasa ga samo klonira — nikad rekreira.
tag: template-js:template-element-export
proTip: Template zna za markup i stylesheet ulaz. Klasa ga samo klonira — nikad rekreira.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: template-element-export-scene

### Narration

Kreiramo `uiUserAvatarTemplate`, dodajemo `<link>` ka shadow CSS fajlu i ubrizgavamo `${templateHtml}`.

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

# Step: import-template

title: "JS: Uvozimo template modul"
summary: Behavior fajl uvozi `uiUserAvatarTemplate` iz template modula. Klasa ne gradi HTML stringove.
intent: "Ovo je prva jasna granica: class i template su odvojeni fajlovi sa odvojenim odgovornostima."
tag: js:import-template
proTip: "Ovo je prva jasna granica: class i template su odvojeni fajlovi sa odvojenim odgovornostima."
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: import-template-scene

### Narration

Behavior fajl uvozi `uiUserAvatarTemplate` iz template modula. Klasa ne gradi HTML stringove.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
```

# Step: class-declaration

title: "JS: UiUserAvatar extends HTMLElement"
summary: Klasa nosi domain-driven ime, konzistentno sa tagom.
intent: "Class ime i tag treba da pričaju istu priču: `ui-user-avatar` → `UiUserAvatar`."
tag: js:class-declaration
proTip: "Class ime i tag treba da pričaju istu priču: `ui-user-avatar` → `UiUserAvatar`."
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: class-declaration-scene

### Narration

Klasa nosi domain-driven ime, konzistentno sa tagom.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {}
```

# Step: observed-attributes

title: "JS: observedAttributes — sva četiri"
summary: Komponenta prati `username`, `role`, `status` i `profile-url` — tačno onoliko koliko je deklarirano kao javni API.
intent: Observed attributes su spoljašnji declarative API ulaz. Ne pratimo ništa što nije javno.
tag: js:observed-attributes
proTip: Observed attributes su spoljašnji declarative API ulaz. Ne pratimo ništa što nije javno.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: observed-attributes-scene

### Narration

Komponenta prati `username`, `role`, `status` i `profile-url` — tačno onoliko koliko je deklarirano kao javni API.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];
}
```

# Step: constructor-shadow

title: "JS: constructor otvara shadow root"
summary: "Konstruktor samo priprema instancu: shadow root, bind i nulte reference."
intent: Konstruktor ne radi lifecycle posao. Ne radi render, ne čita DOM, ne zakačuje evente.
tag: js:constructor-shadow
proTip: Konstruktor ne radi lifecycle posao. Ne radi render, ne čita DOM, ne zakačuje evente.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: constructor-shadow-scene

### Narration

Konstruktor samo priprema instancu: shadow root, bind i nulte reference.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
}
```

# Step: constructor-bind

title: "JS: constructor pre-binduje click handler"
summary: Vezujemo `handleAvatarClick` jednom, pri kreiranju instance.
intent: Pre-bind osigurava stabilan event cleanup — isti objekat koji dodajemo možemo sigurno da uklonimo.
tag: js:constructor-bind
proTip: Pre-bind osigurava stabilan event cleanup — isti objekat koji dodajemo možemo sigurno da uklonimo.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: constructor-bind-scene

### Narration

Vezujemo `handleAvatarClick` jednom, pri kreiranju instance.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
  }
}
```

# Step: constructor-state

title: "JS: constructor priprema interne reference"
summary: Nulujemo DOM reference i state flag za click binding.
intent: Interno stanje ostaje transparentno i predvidivo od prvog reda.
tag: js:constructor-state
proTip: Interno stanje ostaje transparentno i predvidivo od prvog reda.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: constructor-state-scene

### Narration

Nulujemo DOM reference i state flag za click binding.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }
}
```

# Step: connected-callback

title: "JS: connectedCallback — lifestyle ulaz"
summary: Connected lifecycle je glavni ulaz kada widget uđe u živi DOM.
intent: Sve što zavisi od živog DOM-a ide u connectedCallback, ne u constructor.
tag: js:connected-callback
proTip: Sve što zavisi od živog DOM-a ide u connectedCallback, ne u constructor.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: connected-callback-scene

### Narration

Connected lifecycle je glavni ulaz kada widget uđe u živi DOM.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {}
}
```

# Step: connected-callback-setup

title: "JS: connectedCallback poziva setupTemplateOnce"
summary: Prvo jednom montiramo template u shadow root.
intent: Mount i cache imaju odvojene metode i odvojene odgovornosti.
tag: js:connected-callback-setup
proTip: Mount i cache imaju odvojene metode i odvojene odgovornosti.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: connected-callback-setup-scene

### Narration

Prvo jednom montiramo template u shadow root.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
  }
}
```

# Step: connected-callback-cache

title: "JS: connectedCallback poziva cacheDom"
summary: Kad template postoji, keširamo DOM reference.
intent: query selector radi samo jednom — reference žive na instanci.
tag: js:connected-callback-cache
proTip: query selector radi samo jednom — reference žive na instanci.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: connected-callback-cache-scene

### Narration

Kad template postoji, keširamo DOM reference.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
  }
}
```

# Step: connected-callback-sync

title: "JS: connectedCallback sinhronizuje atribute"
summary: Pozivamo `syncFromAttributes()` kao prvi ciljani render pass.
intent: Ovo nije opšti render — to je skup uskih update metoda koje inicijalizuju tačno ono što treba.
tag: js:connected-callback-sync
proTip: Ovo nije opšti render — to je skup uskih update metoda koje inicijalizuju tačno ono što treba.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: connected-callback-sync-scene

### Narration

Pozivamo `syncFromAttributes()` kao prvi ciljani render pass.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
  }
}
```

# Step: setup-template-once

title: "JS: setupTemplateOnce()"
summary: Template mount dobija sopstvenu metodu.
intent: "Jasno ime kaže: montira se jednom, ne na svaki connectedCallback."
tag: js:setup-template-once
proTip: "Jasno ime kaže: montira se jednom, ne na svaki connectedCallback."
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: setup-template-once-scene

### Narration

Template mount dobija sopstvenu metodu.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
  }

  setupTemplateOnce() {}
}
```

# Step: setup-template-once-guard

title: "JS: guard sprečava dupliranje"
summary: Kloniramo template samo ako shadow root nema child node-ova.
intent: Reconnect scenariji moraju biti boring — bez dupliranja DOM-a.
tag: js:setup-template-once-guard
proTip: Reconnect scenariji moraju biti boring — bez dupliranja DOM-a.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: setup-template-once-guard-scene

### Narration

Kloniramo template samo ako shadow root nema child node-ova.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }
}
```

# Step: cache-dom

title: "JS: cacheDom — samo kešira reference"
summary: cacheDom ne montira template i ne radi render. Samo pronalazi reference ako ne postoje.
intent: "Ime i ponašanje su usklađeni: cache znači pamti referencu, ne gradi DOM."
tag: js:cache-dom
proTip: "Ime i ponašanje su usklađeni: cache znači pamti referencu, ne gradi DOM."
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: cache-dom-scene

### Narration

cacheDom ne montira template i ne radi render. Samo pronalazi reference ako ne postoje.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {}
}
```

# Step: cache-dom-username

title: "JS: cacheDom kešira .username element"
summary: Username span čuvamo jednom da updateUsername ne mora da radi query pri svakoj promeni.
intent: DOM query jednom; update metode rade nad čuvanom referencom.
tag: js:cache-dom-username
proTip: DOM query jednom; update metode rade nad čuvanom referencom.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: cache-dom-username-scene

### Narration

Username span čuvamo jednom da updateUsername ne mora da radi query pri svakoj promeni.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }
  }
}
```

# Step: cache-dom-role

title: "JS: cacheDom kešira .role element"
summary: Role span čuvamo na isti način.
intent: Svaki DOM element koji menjamo kešira se pojedinačno i eksplicitno.
tag: js:cache-dom-role
proTip: Svaki DOM element koji menjamo kešira se pojedinačno i eksplicitno.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: cache-dom-role-scene

### Narration

Role span čuvamo na isti način.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }
  }
}
```

# Step: cache-dom-status-badge

title: "JS: cacheDom kešira .status-badge"
summary: Status badge element čuvamo za aria-label update.
intent: I elementi koji ne menjaju textContent treba da budu keširani ako ih update metode diraju.
tag: js:cache-dom-status-badge
proTip: I elementi koji ne menjaju textContent treba da budu keširani ako ih update metode diraju.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: cache-dom-status-badge-scene

### Narration

Status badge element čuvamo za aria-label update.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }
}
```

# Step: sync-from-attributes

title: "JS: syncFromAttributes()"
summary: Centralna one-time inicijalizacija koja propagira sve atribute u DOM na prvom connect-u.
intent: Ovo nije opšti render; to je orchestration metoda koja zove uske update metode.
tag: js:sync-from-attributes
proTip: Ovo nije opšti render; to je orchestration metoda koja zove uske update metode.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: sync-from-attributes-scene

### Narration

Centralna one-time inicijalizacija koja propagira sve atribute u DOM na prvom connect-u.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {}
}
```

# Step: sync-from-attributes-calls

title: "JS: sync poziva sva tri updatera"
summary: Pozivamo `updateUsername()`, `updateRole()` i `updateStatus()` pri inicijalnom connect-u.
intent: Svaki poziv je uski i odvojen — lako se testira i debuguje individualno.
tag: js:sync-from-attributes-calls
proTip: Svaki poziv je uski i odvojen — lako se testira i debuguje individualno.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: sync-from-attributes-calls-scene

### Narration

Pozivamo `updateUsername()`, `updateRole()` i `updateStatus()` pri inicijalnom connect-u.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }
}
```

# Step: update-username

title: "JS: updateUsername()"
summary: Username element dobija tačno ono što property API vrati.
intent: "Jedna metoda, jedna odgovornost: piše username u DOM."
tag: js:update-username
proTip: "Jedna metoda, jedna odgovornost: piše username u DOM."
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: update-username-scene

### Narration

Username element dobija tačno ono što property API vrati.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }
}
```

# Step: update-role

title: "JS: updateRole()"
summary: Role element ažuriramo kroz istu usku metodu.
intent: Svaki tekstualni DOM element ima svoju update metodu.
tag: js:update-role
proTip: Svaki tekstualni DOM element ima svoju update metodu.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: update-role-scene

### Narration

Role element ažuriramo kroz istu usku metodu.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }
}
```

# Step: update-status

title: "JS: updateStatus()"
summary: Status badge dobija ažuriranu aria-label iz `statusAriaLabel` mape.
intent: Status vizuelna promena se dešava kroz CSS token — JS samo drži aria accessibility u sinhronizaciji.
tag: js:update-status
proTip: Status vizuelna promena se dešava kroz CSS token — JS samo drži aria accessibility u sinhronizaciji.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: update-status-scene

### Narration

Status badge dobija ažuriranu aria-label iz `statusAriaLabel` mape.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}
```

# Step: define-guard

title: "JS: guard pre registracije"
summary: Proveravamo da li je element već registrovan pre `customElements.define()`.
intent: Hot reload i SSR scenariji ne smeju bacati grešku pri ponovnoj evaluaciji modula.
tag: js:define-guard
proTip: Hot reload i SSR scenariji ne smeju bacati grešku pri ponovnoj evaluaciji modula.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: define-guard-scene

### Narration

Proveravamo da li je element već registrovan pre `customElements.define()`.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
}
```

# Step: define-element

title: "JS: registrujemo ui-user-avatar"
summary: 'Komponenta je registrovana: `customElements.define("ui-user-avatar", UiUserAvatar)`.'
intent: Od ovog momenta svaki `<ui-user-avatar>` u DOM-u dobija pun lifecycle i API.
tag: js:define-element
proTip: Od ovog momenta svaki `<ui-user-avatar>` u DOM-u dobija pun lifecycle i API.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: define-element-scene

### Narration

Komponenta je registrovana: `customElements.define("ui-user-avatar", UiUserAvatar)`.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: shell-outline

title: "CSS: .app-shell / outline"
summary: Dodajemo tanak helper outline za `.app-shell` i držimo ga do završnog shell rezimea.
intent: App shell ostaje neutralna pozornica za enterprise dashboard widget.
tag: css:shell-outline
proTip: App shell ostaje neutralna pozornica za enterprise dashboard widget.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-outline-scene

### Narration

Dodajemo tanak helper outline za `.app-shell` i držimo ga do završnog shell rezimea.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
}

ui-user-avatar {
}
```

# Step: shell-padding

title: "CSS: .app-shell / padding"
summary: Breathing prostor drži scenu urednom.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:shell-padding
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-padding-scene

### Narration

Breathing prostor drži scenu urednom.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
}

ui-user-avatar {
}
```

# Step: shell-display

title: "CSS: .app-shell / display"
summary: Grid pravi jedinstven container za widget.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:shell-display
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-display-scene

### Narration

Grid pravi jedinstven container za widget.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
}

ui-user-avatar {
}
```

# Step: shell-place-items

title: "CSS: .app-shell / place-items"
summary: Widget treba da bude centriran u demo sceni.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:shell-place-items
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-place-items-scene

### Narration

Widget treba da bude centriran u demo sceni.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
}

ui-user-avatar {
}
```

# Step: shell-gap

title: "CSS: .app-shell / gap"
summary: Gap priprema prostor za eventualni drugi avatar.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:shell-gap
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-gap-scene

### Narration

Gap priprema prostor za eventualni drugi avatar.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
}

ui-user-avatar {
}
```

# Step: shell-min-height

title: "CSS: .app-shell / min-height"
summary: Puna visina drži dark pozadinu stabilnom.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:shell-min-height
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-min-height-scene

### Narration

Puna visina drži dark pozadinu stabilnom.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
}

ui-user-avatar {
}
```

# Step: shell-background

title: "CSS: .app-shell / background"
summary: Tamna pozadina naglašava avatar widget.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:shell-background
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-background-scene

### Narration

Tamna pozadina naglašava avatar widget.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
}
```

# Step: host-outline

title: "CSS: ui-user-avatar / outline"
summary: Dodajemo host helper outline i držimo ga do završnog host rezimea.
intent: Host je javni contract surface; outline pomaže orijentaciji.
tag: css:host-outline
proTip: Host je javni contract surface; outline pomaže orijentaciji.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: host-outline-scene

### Narration

Dodajemo host helper outline i držimo ga do završnog host rezimea.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
}
```

# Step: host-display

title: "CSS: ui-user-avatar / display"
summary: Avatar ostaje kompaktan inline-block element.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:host-display
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: host-display-scene

### Narration

Avatar ostaje kompaktan inline-block element.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
}
```

# Step: host-position

title: "CSS: ui-user-avatar / position"
summary: Pozicija pravi stacking kontekst za tooltip.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:host-position
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: host-position-scene

### Narration

Pozicija pravi stacking kontekst za tooltip.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
}
```

# Step: host-cursor

title: "CSS: ui-user-avatar / cursor"
summary: Avatar je klikabilna zona — cursor to mora jasno da kaže.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:host-cursor
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: host-cursor-scene

### Narration

Avatar je klikabilna zona — cursor to mora jasno da kaže.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
}
```

# Step: host-surface-token

title: "CSS: ui-user-avatar / --avatar-surface"
summary: "Počinjemo token contract: površina je spolja theme-ovana."
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:host-surface-token
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: host-surface-token-scene

### Narration

Počinjemo token contract: površina je spolja theme-ovana.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
}
```

# Step: host-surface-alt-token

title: "CSS: ui-user-avatar / --avatar-surface-alt"
summary: Alternativna površina drži gradijent konzistentnim.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:host-surface-alt-token
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: host-surface-alt-token-scene

### Narration

Alternativna površina drži gradijent konzistentnim.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
}
```

# Step: host-accent-token

title: "CSS: ui-user-avatar / --avatar-accent"
summary: Accent token vodi boju avatara i detalja.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:host-accent-token
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: host-accent-token-scene

### Narration

Accent token vodi boju avatara i detalja.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
}
```

# Step: host-text-token

title: "CSS: ui-user-avatar / --avatar-text"
summary: Text token čuva kontrast u celom widgetu.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:host-text-token
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: host-text-token-scene

### Narration

Text token čuva kontrast u celom widgetu.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
  --avatar-text: #f1f5f9;
}
```

# Step: host-muted-token

title: "CSS: ui-user-avatar / --avatar-muted"
summary: Muted token pokriva role i sekundarne labele.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:host-muted-token
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: host-muted-token-scene

### Narration

Muted token pokriva role i sekundarne labele.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
  --avatar-text: #f1f5f9;
  --avatar-muted: #94a3b8;
}
```

# Step: host-border-token

title: "CSS: ui-user-avatar / --avatar-border"
summary: Border token drži ivice neagresivnim na tamnoj pozadini.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:host-border-token
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: host-border-token-scene

### Narration

Border token drži ivice neagresivnim na tamnoj pozadini.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
  --avatar-text: #f1f5f9;
  --avatar-muted: #94a3b8;
  --avatar-border: rgba(148, 163, 184, 0.2);
}
```

# Step: host-shadow-token

title: "CSS: ui-user-avatar / --avatar-shadow"
summary: Shadow token ide kao javni contract, ne internu magiju.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:host-shadow-token
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: host-shadow-token-scene

### Narration

Shadow token ide kao javni contract, ne internu magiju.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
  --avatar-text: #f1f5f9;
  --avatar-muted: #94a3b8;
  --avatar-border: rgba(148, 163, 184, 0.2);
  --avatar-shadow: 0 8px 32px rgba(15, 23, 42, 0.48);
}
```

# Step: host-status-color-token

title: "CSS: ui-user-avatar / --avatar-status-color"
summary: Status boja je javni host token — variants ga samo prepišu.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:host-status-color-token
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: host-status-color-token-scene

### Narration

Status boja je javni host token — variants ga samo prepišu.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
  --avatar-text: #f1f5f9;
  --avatar-muted: #94a3b8;
  --avatar-border: rgba(148, 163, 184, 0.2);
  --avatar-shadow: 0 8px 32px rgba(15, 23, 42, 0.48);
  --avatar-status-color: #22c55e;
}
```

# Step: variant-online-status-color

title: 'CSS: ui-user-avatar[status="online"] / --avatar-status-color'
summary: Online status dobija zeleni signal.
intent: Variants idu spolja, ne unutar shadow CSS-a.
tag: css:variant-online-status-color
proTip: Variants idu spolja, ne unutar shadow CSS-a.
focusHtmlNeedles:

- <ui-user-avatar
- status="online"

## Scene: variant-online-status-color-scene

### Narration

Online status dobija zeleni signal.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
  --avatar-text: #f1f5f9;
  --avatar-muted: #94a3b8;
  --avatar-border: rgba(148, 163, 184, 0.2);
  --avatar-shadow: 0 8px 32px rgba(15, 23, 42, 0.48);
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='online'] {
  --avatar-status-color: #22c55e;
}
```

# Step: variant-idle-status-color

title: 'CSS: ui-user-avatar[status="idle"] / --avatar-status-color'
summary: Idle dobija žuti signal.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:variant-idle-status-color
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-user-avatar
- status="idle"

## Scene: variant-idle-status-color-scene

### Narration

Idle dobija žuti signal.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
  --avatar-text: #f1f5f9;
  --avatar-muted: #94a3b8;
  --avatar-border: rgba(148, 163, 184, 0.2);
  --avatar-shadow: 0 8px 32px rgba(15, 23, 42, 0.48);
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='online'] {
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='idle'] {
  --avatar-status-color: #facc15;
}
```

# Step: variant-away-status-color

title: 'CSS: ui-user-avatar[status="away"] / --avatar-status-color'
summary: Away dobija narandžasti signal.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:variant-away-status-color
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-user-avatar
- status="away"

## Scene: variant-away-status-color-scene

### Narration

Away dobija narandžasti signal.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
  --avatar-text: #f1f5f9;
  --avatar-muted: #94a3b8;
  --avatar-border: rgba(148, 163, 184, 0.2);
  --avatar-shadow: 0 8px 32px rgba(15, 23, 42, 0.48);
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='online'] {
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='idle'] {
  --avatar-status-color: #facc15;
}

ui-user-avatar[status='away'] {
  --avatar-status-color: #fb923c;
}
```

# Step: variant-offline-status-color

title: 'CSS: ui-user-avatar[status="offline"] / --avatar-status-color'
summary: Offline dobija sivi, neutralni signal.
intent: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
tag: css:variant-offline-status-color
proTip: Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-user-avatar
- status="offline"

## Scene: variant-offline-status-color-scene

### Narration

Offline dobija sivi, neutralni signal.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
  --avatar-text: #f1f5f9;
  --avatar-muted: #94a3b8;
  --avatar-border: rgba(148, 163, 184, 0.2);
  --avatar-shadow: 0 8px 32px rgba(15, 23, 42, 0.48);
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='online'] {
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='idle'] {
  --avatar-status-color: #facc15;
}

ui-user-avatar[status='away'] {
  --avatar-status-color: #fb923c;
}

ui-user-avatar[status='offline'] {
  --avatar-status-color: #64748b;
}
```

# Step: host-vs-shadow-styles

title: "Teaching Moment: Token styling contract"
summary: Host CSS drži token kontrakt i status variants. Svaka promena statusa menja samo `--avatar-status-color` token — bez diranja shadow internals. Sledeći koraci prelaze u `ui-user-avatar.shadow.css`.
intent: "Ovde je granica: host/theme/variants spolja, widget internals unutra."
tag: teaching:host-vs-shadow-styles
proTip: "Ovde je granica: host/theme/variants spolja, widget internals unutra."
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: host-vs-shadow-styles-scene

### Narration

Host CSS drži token kontrakt i status variants. Svaka promena statusa menja samo `--avatar-status-color` token — bez diranja shadow internals. Sledeći koraci prelaze u `ui-user-avatar.shadow.css`.

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

# Step: shadow-host-display

title: "Shadow CSS: :host / display"
summary: Shadow host potvrđuje inline-block model iznutra.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:shadow-host-display
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: shadow-host-display-scene

### Narration

Shadow host potvrđuje inline-block model iznutra.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
}
```

# Step: shadow-host-font-family

title: "Shadow CSS: :host / font-family"
summary: Font stack ostaje interni shadow contract.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:shadow-host-font-family
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: shadow-host-font-family-scene

### Narration

Font stack ostaje interni shadow contract.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}
```

# Step: shadow-host-color

title: "Shadow CSS: :host / color"
summary: Boja čita spoljašnji text token.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:shadow-host-color
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: shadow-host-color-scene

### Narration

Boja čita spoljašnji text token.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}
```

# Step: container-outline

title: "Shadow CSS: .avatar-container / outline"
summary: Dodajemo helper outline za avatar container.
intent: Container drži sve vizuelne delove avatara na jednom mestu.
tag: shadow-css:container-outline
proTip: Container drži sve vizuelne delove avatara na jednom mestu.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: container-outline-scene

### Narration

Dodajemo helper outline za avatar container.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
}
```

# Step: container-position

title: "Shadow CSS: .avatar-container / position"
summary: Relative pozicija pravi stacking kontekst za status badge i tooltip.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:container-position
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: container-position-scene

### Narration

Relative pozicija pravi stacking kontekst za status badge i tooltip.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
}
```

# Step: container-display

title: "Shadow CSS: .avatar-container / display"
summary: Flex pravi vertikalni stack avatar delova.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:container-display
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: container-display-scene

### Narration

Flex pravi vertikalni stack avatar delova.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
}
```

# Step: container-direction

title: "Shadow CSS: .avatar-container / flex-direction"
summary: Kolona slaže sliku, info i tooltip vertikalno.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:container-direction
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: container-direction-scene

### Narration

Kolona slaže sliku, info i tooltip vertikalno.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
}
```

# Step: container-align

title: "Shadow CSS: .avatar-container / align-items"
summary: Sve celine se centriraju horizontalno.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:container-align
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: container-align-scene

### Narration

Sve celine se centriraju horizontalno.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}
```

# Step: container-gap

title: "Shadow CSS: .avatar-container / gap"
summary: Gap drži rastojanje između slike i info zone.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:container-gap
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: container-gap-scene

### Narration

Gap drži rastojanje između slike i info zone.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
```

# Step: image-outline

title: "Shadow CSS: .avatar-image / outline"
summary: Dodajemo helper outline za avatar sliku.
intent: Avatar krug je centralni vizuelni element widgeta.
tag: shadow-css:image-outline
proTip: Avatar krug je centralni vizuelni element widgeta.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: image-outline-scene

### Narration

Dodajemo helper outline za avatar sliku.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
}
```

# Step: image-position

title: "Shadow CSS: .avatar-image / position"
summary: Relative pravi stacking kontekst za absolutni status badge.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:image-position
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: image-position-scene

### Narration

Relative pravi stacking kontekst za absolutni status badge.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
}
```

# Step: image-width

title: "Shadow CSS: .avatar-image / width"
summary: Avatar krug dobija standardnu veličinu.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:image-width
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: image-width-scene

### Narration

Avatar krug dobija standardnu veličinu.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
}
```

# Step: image-height

title: "Shadow CSS: .avatar-image / height"
summary: Visina odgovara širini — idemo ka krugu.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:image-height
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: image-height-scene

### Narration

Visina odgovara širini — idemo ka krugu.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
}
```

# Step: image-radius

title: "Shadow CSS: .avatar-image / border-radius"
summary: Puni radius završava avatar krug.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:image-radius
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: image-radius-scene

### Narration

Puni radius završava avatar krug.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
}
```

# Step: image-background

title: "Shadow CSS: .avatar-image / background"
summary: Gradijent pozadina koja se vidi iza inicijala.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:image-background
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: image-background-scene

### Narration

Gradijent pozadina koja se vidi iza inicijala.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
}
```

# Step: image-border

title: "Shadow CSS: .avatar-image / border"
summary: Border čita host token.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:image-border
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: image-border-scene

### Narration

Border čita host token.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
}
```

# Step: image-shadow

title: "Shadow CSS: .avatar-image / box-shadow"
summary: Shadow dolazi iz host contract-a.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:image-shadow
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: image-shadow-scene

### Narration

Shadow dolazi iz host contract-a.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
}
```

# Step: image-display

title: "Shadow CSS: .avatar-image / display"
summary: Flex centrira inicijale unutar kruga.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:image-display
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: image-display-scene

### Narration

Flex centrira inicijale unutar kruga.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
}
```

# Step: image-align

title: "Shadow CSS: .avatar-image / align-items"
summary: Vertikalno centriranje inicijala.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:image-align
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: image-align-scene

### Narration

Vertikalno centriranje inicijala.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
}
```

# Step: image-justify

title: "Shadow CSS: .avatar-image / justify-content"
summary: Horizontalno centriranje inicijala.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:image-justify
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: image-justify-scene

### Narration

Horizontalno centriranje inicijala.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
}
```

# Step: image-overflow

title: "Shadow CSS: .avatar-image / overflow"
summary: Overflow hidden reže bilo koji sadržaj van kruga.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:image-overflow
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: image-overflow-scene

### Narration

Overflow hidden reže bilo koji sadržaj van kruga.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
```

# Step: image-transition

title: "Shadow CSS: .avatar-image / transition"
summary: Tranzicija pravi glatki hover lift.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:image-transition
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: image-transition-scene

### Narration

Tranzicija pravi glatki hover lift.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}
```

# Step: image-hover-transform

title: "Shadow CSS: .avatar-image:hover / transform"
summary: Blagi scale na hover daje interaktivni feel.
intent: Hover treba da potvrdi klikabilnost.
tag: shadow-css:image-hover-transform
proTip: Hover treba da potvrdi klikabilnost.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: image-hover-transform-scene

### Narration

Blagi scale na hover daje interaktivni feel.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
}
```

# Step: image-hover-shadow

title: "Shadow CSS: .avatar-image:hover / box-shadow"
summary: Accent shadow na hover potvrđuje interakciju.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:image-hover-shadow
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: image-hover-shadow-scene

### Narration

Accent shadow na hover potvrđuje interakciju.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}
```

# Step: initials-font-size

title: 'Shadow CSS: ::slotted([slot="initials"]) / font-size'
summary: Inicijali dobijaju jasnu veličinu unutar kruga.
intent: Named slot je javna API površina — stilizujemo ga unutar shadow konteksta.
tag: shadow-css:initials-font-size
proTip: Named slot je javna API površina — stilizujemo ga unutar shadow konteksta.
focusHtmlNeedles:

- slot="initials"
- <ui-user-avatar

## Scene: initials-font-size-scene

### Narration

Inicijali dobijaju jasnu veličinu unutar kruga.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
}
```

# Step: initials-font-weight

title: 'Shadow CSS: ::slotted([slot="initials"]) / font-weight'
summary: Jaki bold drži inicijale čitkim.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:initials-font-weight
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- slot="initials"
- <ui-user-avatar

## Scene: initials-font-weight-scene

### Narration

Jaki bold drži inicijale čitkim.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
}
```

# Step: initials-color

title: 'Shadow CSS: ::slotted([slot="initials"]) / color'
summary: Beli tekst drži kontrast na gradijent pozadini.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:initials-color
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- slot="initials"
- <ui-user-avatar

## Scene: initials-color-scene

### Narration

Beli tekst drži kontrast na gradijent pozadini.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
}
```

# Step: initials-letter-spacing

title: 'Shadow CSS: ::slotted([slot="initials"]) / letter-spacing'
summary: Mali tracking poboljšava čitljivost.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:initials-letter-spacing
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- slot="initials"
- <ui-user-avatar

## Scene: initials-letter-spacing-scene

### Narration

Mali tracking poboljšava čitljivost.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
}
```

# Step: initials-select

title: 'Shadow CSS: ::slotted([slot="initials"]) / user-select'
summary: Inicijali ne treba da budu selektabilni.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:initials-select
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- slot="initials"
- <ui-user-avatar

## Scene: initials-select-scene

### Narration

Inicijali ne treba da budu selektabilni.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}
```

# Step: status-outline

title: "Shadow CSS: .status-badge / outline"
summary: Dodajemo helper outline za status badge.
intent: Status badge je mali ali kritičan signal widgeta.
tag: shadow-css:status-outline
proTip: Status badge je mali ali kritičan signal widgeta.
focusHtmlNeedles:

- <ui-user-avatar
- status=

## Scene: status-outline-scene

### Narration

Dodajemo helper outline za status badge.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
}
```

# Step: status-position

title: "Shadow CSS: .status-badge / position"
summary: Absolute ga pozicionira unutar avatar tipa.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:status-position
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- status=

## Scene: status-position-scene

### Narration

Absolute ga pozicionira unutar avatar tipa.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
}
```

# Step: status-bottom

title: "Shadow CSS: .status-badge / bottom"
summary: Pozicioniramo badge u donji desni ugao.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:status-bottom
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- status=

## Scene: status-bottom-scene

### Narration

Pozicioniramo badge u donji desni ugao.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
}
```

# Step: status-right

title: "Shadow CSS: .status-badge / right"
summary: Desno od centra, standardna pozicija status badge-a.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:status-right
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- status=

## Scene: status-right-scene

### Narration

Desno od centra, standardna pozicija status badge-a.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
}
```

# Step: status-width

title: "Shadow CSS: .status-badge / width"
summary: Mali kružić.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:status-width
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- status=

## Scene: status-width-scene

### Narration

Mali kružić.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
}
```

# Step: status-height

title: "Shadow CSS: .status-badge / height"
summary: Visina odgovara širini.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:status-height
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- status=

## Scene: status-height-scene

### Narration

Visina odgovara širini.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
}
```

# Step: status-radius

title: "Shadow CSS: .status-badge / border-radius"
summary: Puni radius završava status krug.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:status-radius
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- status=

## Scene: status-radius-scene

### Narration

Puni radius završava status krug.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
}
```

# Step: status-background

title: "Shadow CSS: .status-badge / background"
summary: Boja čita host status token — nikad hardkodovana iznutra.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:status-background
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- status=

## Scene: status-background-scene

### Narration

Boja čita host status token — nikad hardkodovana iznutra.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
}
```

# Step: status-border

title: "Shadow CSS: .status-badge / border"
summary: Border odvaja badge od pozadine avatara.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:status-border
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- status=

## Scene: status-border-scene

### Narration

Border odvaja badge od pozadine avatara.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
}
```

# Step: status-transition

title: "Shadow CSS: .status-badge / transition"
summary: Tranzicija pravi glatku promenu statusa.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:status-transition
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- status=

## Scene: status-transition-scene

### Narration

Tranzicija pravi glatku promenu statusa.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}
```

# Step: info-outline

title: "Shadow CSS: .avatar-info / outline"
summary: Dodajemo helper outline za info zonu.
intent: Info zona drži username i role labele.
tag: shadow-css:info-outline
proTip: Info zona drži username i role labele.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: info-outline-scene

### Narration

Dodajemo helper outline za info zonu.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
}
```

# Step: info-display

title: "Shadow CSS: .avatar-info / display"
summary: Flex pravi vertikalni stack tekstova.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:info-display
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: info-display-scene

### Narration

Flex pravi vertikalni stack tekstova.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
}
```

# Step: info-direction

title: "Shadow CSS: .avatar-info / flex-direction"
summary: Kolona slaže username iznad role-a.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:info-direction
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: info-direction-scene

### Narration

Kolona slaže username iznad role-a.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
}
```

# Step: info-align

title: "Shadow CSS: .avatar-info / align-items"
summary: Centriramo oba teksta ispod avatara.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:info-align
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: info-align-scene

### Narration

Centriramo oba teksta ispod avatara.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

# Step: info-gap

title: "Shadow CSS: .avatar-info / gap"
summary: Minimal gap drži tekstove fokusiranim.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:info-gap
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: info-gap-scene

### Narration

Minimal gap drži tekstove fokusiranim.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
```

# Step: username-font-size

title: "Shadow CSS: .username / font-size"
summary: Solidna veličina za primarnu labelu.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:username-font-size
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: username-font-size-scene

### Narration

Solidna veličina za primarnu labelu.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
}
```

# Step: username-font-weight

title: "Shadow CSS: .username / font-weight"
summary: Bold drži username kao primarni signal.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:username-font-weight
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: username-font-weight-scene

### Narration

Bold drži username kao primarni signal.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
}
```

# Step: username-color

title: "Shadow CSS: .username / color"
summary: Čita text token.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:username-color
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: username-color-scene

### Narration

Čita text token.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
}
```

# Step: username-white-space

title: "Shadow CSS: .username / white-space"
summary: Username ostaje na jednoj liniji.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:username-white-space
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: username-white-space-scene

### Narration

Username ostaje na jednoj liniji.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}
```

# Step: role-font-size

title: "Shadow CSS: .role / font-size"
summary: Manji font čini role sekundarnim signals.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:role-font-size
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- role=

## Scene: role-font-size-scene

### Narration

Manji font čini role sekundarnim signals.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
}
```

# Step: role-font-weight

title: "Shadow CSS: .role / font-weight"
summary: Medium weight drži role čitkim ali podređenim.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:role-font-weight
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- role=

## Scene: role-font-weight-scene

### Narration

Medium weight drži role čitkim ali podređenim.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
}
```

# Step: role-color

title: "Shadow CSS: .role / color"
summary: Muted token daje sekundarni signal.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:role-color
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- role=

## Scene: role-color-scene

### Narration

Muted token daje sekundarni signal.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
}
```

# Step: role-text-transform

title: "Shadow CSS: .role / text-transform"
summary: Uppercase zatvara role kao kategorijsku labelu.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:role-text-transform
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- role=

## Scene: role-text-transform-scene

### Narration

Uppercase zatvara role kao kategorijsku labelu.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
}
```

# Step: role-letter-spacing

title: "Shadow CSS: .role / letter-spacing"
summary: Tracking čini role urednom.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:role-letter-spacing
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- role=

## Scene: role-letter-spacing-scene

### Narration

Tracking čini role urednom.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
```

# Step: role-white-space

title: "Shadow CSS: .role / white-space"
summary: Role ostaje na jednoj liniji.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:role-white-space
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- role=

## Scene: role-white-space-scene

### Narration

Role ostaje na jednoj liniji.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}
```

# Step: tooltip-outline

title: "Shadow CSS: .tooltip / outline"
summary: Dodajemo helper outline za tooltip.
intent: Tooltip je interaktivna informaciona zona.
tag: shadow-css:tooltip-outline
proTip: Tooltip je interaktivna informaciona zona.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-outline-scene

### Narration

Dodajemo helper outline za tooltip.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
}
```

# Step: tooltip-position

title: "Shadow CSS: .tooltip / position"
summary: Absolute ga odvaja od normalnog toka.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:tooltip-position
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-position-scene

### Narration

Absolute ga odvaja od normalnog toka.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
}
```

# Step: tooltip-bottom

title: "Shadow CSS: .tooltip / bottom"
summary: Tooltip se pojavljuje iznad avatara.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:tooltip-bottom
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-bottom-scene

### Narration

Tooltip se pojavljuje iznad avatara.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
}
```

# Step: tooltip-left

title: "Shadow CSS: .tooltip / left"
summary: Levim rubom krenemo od centra.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:tooltip-left
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-left-scene

### Narration

Levim rubom krenemo od centra.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
}
```

# Step: tooltip-transform

title: "Shadow CSS: .tooltip / transform"
summary: Negativan translate centrira tooltip.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:tooltip-transform
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-transform-scene

### Narration

Negativan translate centrira tooltip.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
}
```

# Step: tooltip-background

title: "Shadow CSS: .tooltip / background"
summary: Très tamna pozadina drži tooltip čitkim.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:tooltip-background
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-background-scene

### Narration

Très tamna pozadina drži tooltip čitkim.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
}
```

# Step: tooltip-border

title: "Shadow CSS: .tooltip / border"
summary: Border tok čita host token.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:tooltip-border
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-border-scene

### Narration

Border tok čita host token.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
}
```

# Step: tooltip-color

title: "Shadow CSS: .tooltip / color"
summary: Text čita host token.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:tooltip-color
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-color-scene

### Narration

Text čita host token.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
}
```

# Step: tooltip-padding

title: "Shadow CSS: .tooltip / padding"
summary: Padding daje tooltip-u pravi footprint.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:tooltip-padding
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-padding-scene

### Narration

Padding daje tooltip-u pravi footprint.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
}
```

# Step: tooltip-radius

title: "Shadow CSS: .tooltip / border-radius"
summary: Zaobljenje drži tooltip modernim.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:tooltip-radius
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-radius-scene

### Narration

Zaobljenje drži tooltip modernim.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
}
```

# Step: tooltip-font-size

title: "Shadow CSS: .tooltip / font-size"
summary: Manji font za tooltip tip.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:tooltip-font-size
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-font-size-scene

### Narration

Manji font za tooltip tip.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
}
```

# Step: tooltip-white-space

title: "Shadow CSS: .tooltip / white-space"
summary: Tooltip ostaje u jednom redu.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:tooltip-white-space
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-white-space-scene

### Narration

Tooltip ostaje u jednom redu.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
}
```

# Step: tooltip-pointer-events

title: "Shadow CSS: .tooltip / pointer-events"
summary: Tooltip ne blokirа klik na avatar.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:tooltip-pointer-events
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-pointer-events-scene

### Narration

Tooltip ne blokirа klik na avatar.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
}
```

# Step: tooltip-opacity-start

title: "Shadow CSS: .tooltip / opacity"
summary: Tooltip startu nevidljiv.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:tooltip-opacity-start
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-opacity-start-scene

### Narration

Tooltip startu nevidljiv.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
}
```

# Step: tooltip-transition

title: "Shadow CSS: .tooltip / transition"
summary: Tranzicija pravi glatko prikazivanje.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:tooltip-transition
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-transition-scene

### Narration

Tranzicija pravi glatko prikazivanje.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}
```

# Step: tooltip-z-index

title: "Shadow CSS: .tooltip / z-index"
summary: Z-index drži tooltip iznad ostatka DOM-a.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:tooltip-z-index
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-z-index-scene

### Narration

Z-index drži tooltip iznad ostatka DOM-a.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
  z-index: 10;
}
```

# Step: tooltip-hover-opacity

title: "Shadow CSS: :host(:hover) .tooltip, :host(:focus-within) .tooltip / opacity"
summary: Na hover tooltip postaje vidljiv.
intent: Focus-within pokriva i tastatursku navigaciju.
tag: shadow-css:tooltip-hover-opacity
proTip: Focus-within pokriva i tastatursku navigaciju.
focusHtmlNeedles:

- <ui-user-avatar

## Scene: tooltip-hover-opacity-scene

### Narration

Na hover tooltip postaje vidljiv.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
  z-index: 10;
}

:host(:hover) .tooltip,
:host(:focus-within) .tooltip {
  opacity: 1;
}
```

# Step: tooltip-hover-transform

title: "Shadow CSS: :host(:hover) .tooltip, :host(:focus-within) .tooltip / transform"
summary: Mali lift daje tooltip-u dinamičan ulaz.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:tooltip-hover-transform
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar

## Scene: tooltip-hover-transform-scene

### Narration

Mali lift daje tooltip-u dinamičan ulaz.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
  z-index: 10;
}

:host(:hover) .tooltip,
:host(:focus-within) .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
}
```

# Step: host-focus-outline

title: "Shadow CSS: :host(:focus-visible) / outline"
summary: Focus-visible dodaje tastaturski focus ring.
intent: Klavijaturska navigacija mora biti jasno vidljiva.
tag: shadow-css:host-focus-outline
proTip: Klavijaturska navigacija mora biti jasno vidljiva.
focusHtmlNeedles:

- <ui-user-avatar

## Scene: host-focus-outline-scene

### Narration

Focus-visible dodaje tastaturski focus ring.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
  z-index: 10;
}

:host(:hover) .tooltip,
:host(:focus-within) .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
}

:host(:focus-visible) {
  outline: 3px solid rgba(56, 189, 248, 0.55);
}
```

# Step: host-focus-outline-offset

title: "Shadow CSS: :host(:focus-visible) / outline-offset"
summary: Offset drži ring dalje od ivice.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:host-focus-outline-offset
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar

## Scene: host-focus-outline-offset-scene

### Narration

Offset drži ring dalje od ivice.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
  z-index: 10;
}

:host(:hover) .tooltip,
:host(:focus-within) .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
}

:host(:focus-visible) {
  outline: 3px solid rgba(56, 189, 248, 0.55);
  outline-offset: 4px;
}
```

# Step: host-focus-radius

title: "Shadow CSS: :host(:focus-visible) / border-radius"
summary: Radius čini focus ring kružnim uz avatar.
intent: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
tag: shadow-css:host-focus-radius
proTip: Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.
focusHtmlNeedles:

- <ui-user-avatar

## Scene: host-focus-radius-scene

### Narration

Radius čini focus ring kružnim uz avatar.

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  outline: 1px dashed #38bdf8;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
  z-index: 10;
}

:host(:hover) .tooltip,
:host(:focus-within) .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
}

:host(:focus-visible) {
  outline: 3px solid rgba(56, 189, 248, 0.55);
  outline-offset: 4px;
  border-radius: 50%;
}
```

# Step: container-summary

title: "Rezime: .avatar-container"
summary: Uklanjamo container helper outline.
intent: Container drži sve vizuelne delove u jednom stacking kontekstu.
tag: summary:container-summary
proTip: Container drži sve vizuelne delove u jednom stacking kontekstu.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: container-summary-scene

### Narration

Uklanjamo container helper outline.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
  --avatar-text: #f1f5f9;
  --avatar-muted: #94a3b8;
  --avatar-border: rgba(148, 163, 184, 0.2);
  --avatar-shadow: 0 8px 32px rgba(15, 23, 42, 0.48);
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='online'] {
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='idle'] {
  --avatar-status-color: #facc15;
}

ui-user-avatar[status='away'] {
  --avatar-status-color: #fb923c;
}

ui-user-avatar[status='offline'] {
  --avatar-status-color: #64748b;
}
```

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  /* helper outline removed */
}

.avatar-image {
  outline: 1px dashed #a78bfa;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
  z-index: 10;
}

:host(:hover) .tooltip,
:host(:focus-within) .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
}

:host(:focus-visible) {
  outline: 3px solid rgba(56, 189, 248, 0.55);
  outline-offset: 4px;
  border-radius: 50%;
}
```

# Step: image-summary

title: "Rezime: .avatar-image"
summary: Uklanjamo image helper outline.
intent: Avatar krug sada ima gradijent, border, shadow i hover interakciju.
tag: summary:image-summary
proTip: Avatar krug sada ima gradijent, border, shadow i hover interakciju.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: image-summary-scene

### Narration

Uklanjamo image helper outline.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
  --avatar-text: #f1f5f9;
  --avatar-muted: #94a3b8;
  --avatar-border: rgba(148, 163, 184, 0.2);
  --avatar-shadow: 0 8px 32px rgba(15, 23, 42, 0.48);
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='online'] {
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='idle'] {
  --avatar-status-color: #facc15;
}

ui-user-avatar[status='away'] {
  --avatar-status-color: #fb923c;
}

ui-user-avatar[status='offline'] {
  --avatar-status-color: #64748b;
}
```

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  /* helper outline removed */
}

.avatar-image {
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
  /* helper outline removed */
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  outline: 1px dotted #facc15;
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
  z-index: 10;
}

:host(:hover) .tooltip,
:host(:focus-within) .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
}

:host(:focus-visible) {
  outline: 3px solid rgba(56, 189, 248, 0.55);
  outline-offset: 4px;
  border-radius: 50%;
}
```

# Step: status-summary

title: "Rezime: .status-badge"
summary: Uklanjamo status badge helper outline.
intent: Status badge čita `--avatar-status-color` token — status varijante menjaju samo taj token.
tag: summary:status-summary
proTip: Status badge čita `--avatar-status-color` token — status varijante menjaju samo taj token.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: status-summary-scene

### Narration

Uklanjamo status badge helper outline.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
  --avatar-text: #f1f5f9;
  --avatar-muted: #94a3b8;
  --avatar-border: rgba(148, 163, 184, 0.2);
  --avatar-shadow: 0 8px 32px rgba(15, 23, 42, 0.48);
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='online'] {
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='idle'] {
  --avatar-status-color: #facc15;
}

ui-user-avatar[status='away'] {
  --avatar-status-color: #fb923c;
}

ui-user-avatar[status='offline'] {
  --avatar-status-color: #64748b;
}
```

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  /* helper outline removed */
}

.avatar-image {
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
  /* helper outline removed */
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
  /* helper outline removed */
}

.avatar-info {
  outline: 1px dashed #34d399;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
  z-index: 10;
}

:host(:hover) .tooltip,
:host(:focus-within) .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
}

:host(:focus-visible) {
  outline: 3px solid rgba(56, 189, 248, 0.55);
  outline-offset: 4px;
  border-radius: 50%;
}
```

# Step: info-summary

title: "Rezime: .avatar-info"
summary: Uklanjamo info zone helper outline.
intent: Username i role su sada stilizovani sa jasnom hijerarhijom.
tag: summary:info-summary
proTip: Username i role su sada stilizovani sa jasnom hijerarhijom.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: info-summary-scene

### Narration

Uklanjamo info zone helper outline.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
  --avatar-text: #f1f5f9;
  --avatar-muted: #94a3b8;
  --avatar-border: rgba(148, 163, 184, 0.2);
  --avatar-shadow: 0 8px 32px rgba(15, 23, 42, 0.48);
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='online'] {
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='idle'] {
  --avatar-status-color: #facc15;
}

ui-user-avatar[status='away'] {
  --avatar-status-color: #fb923c;
}

ui-user-avatar[status='offline'] {
  --avatar-status-color: #64748b;
}
```

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  /* helper outline removed */
}

.avatar-image {
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
  /* helper outline removed */
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
  /* helper outline removed */
}

.avatar-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  /* helper outline removed */
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  outline: 1px dotted #f472b6;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
  z-index: 10;
}

:host(:hover) .tooltip,
:host(:focus-within) .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
}

:host(:focus-visible) {
  outline: 3px solid rgba(56, 189, 248, 0.55);
  outline-offset: 4px;
  border-radius: 50%;
}
```

# Step: tooltip-summary

title: "Rezime: .tooltip"
summary: Uklanjamo tooltip helper outline.
intent: Tooltip se pojavljuje na hover i focus-within sa glatkom animacijom.
tag: summary:tooltip-summary
proTip: Tooltip se pojavljuje na hover i focus-within sa glatkom animacijom.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: tooltip-summary-scene

### Narration

Uklanjamo tooltip helper outline.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  outline: 1px solid #f97316;
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
  --avatar-text: #f1f5f9;
  --avatar-muted: #94a3b8;
  --avatar-border: rgba(148, 163, 184, 0.2);
  --avatar-shadow: 0 8px 32px rgba(15, 23, 42, 0.48);
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='online'] {
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='idle'] {
  --avatar-status-color: #facc15;
}

ui-user-avatar[status='away'] {
  --avatar-status-color: #fb923c;
}

ui-user-avatar[status='offline'] {
  --avatar-status-color: #64748b;
}
```

### Show Code: shadow-css

```css
:host {
  display: inline-block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--avatar-text, #f1f5f9);
}

.avatar-container {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  /* helper outline removed */
}

.avatar-image {
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1);
  border: 2px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  box-shadow: var(--avatar-shadow, 0 8px 32px rgba(15, 23, 42, 0.48));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
  /* helper outline removed */
}

.avatar-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(56, 189, 248, 0.28);
}

::slotted([slot='initials']) {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.04em;
  user-select: none;
}

.status-badge {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--avatar-status-color, #22c55e);
  border: 2px solid var(--avatar-surface, #1e293b);
  transition: background 240ms ease;
  /* helper outline removed */
}

.avatar-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  /* helper outline removed */
}

.username {
  font-size: 14px;
  font-weight: 700;
  color: var(--avatar-text, #f1f5f9);
  white-space: nowrap;
}

.role {
  font-size: 11px;
  font-weight: 500;
  color: var(--avatar-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  border: 1px solid var(--avatar-border, rgba(148, 163, 184, 0.2));
  color: var(--avatar-text, #f1f5f9);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
  z-index: 10;
  /* helper outline removed */
}

:host(:hover) .tooltip,
:host(:focus-within) .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
}

:host(:focus-visible) {
  outline: 3px solid rgba(56, 189, 248, 0.55);
  outline-offset: 4px;
  border-radius: 50%;
}
```

# Step: host-summary

title: "Rezime: ui-user-avatar host"
summary: Uklanjamo host helper outline.
intent: Host nosi token contract, variants i interaktivni cursor. Shadow ostaje izolovan.
tag: summary:host-summary
proTip: Host nosi token contract, variants i interaktivni cursor. Shadow ostaje izolovan.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: host-summary-scene

### Narration

Uklanjamo host helper outline.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-user-avatar {
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
  --avatar-text: #f1f5f9;
  --avatar-muted: #94a3b8;
  --avatar-border: rgba(148, 163, 184, 0.2);
  --avatar-shadow: 0 8px 32px rgba(15, 23, 42, 0.48);
  --avatar-status-color: #22c55e;
  /* helper outline removed */
}

ui-user-avatar[status='online'] {
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='idle'] {
  --avatar-status-color: #facc15;
}

ui-user-avatar[status='away'] {
  --avatar-status-color: #fb923c;
}

ui-user-avatar[status='offline'] {
  --avatar-status-color: #64748b;
}
```

# Step: shell-summary

title: "Rezime: .app-shell"
summary: "Uklanjamo shell helper outline. Vizuelni widget je sada kompletan i ovo je prvi trenutak kada kažemo: ovo je ono što želimo."
intent: Prvo zaključujemo vizuelni rezultat, a tek onda uvodimo funkcionalnosti korak po korak.
tag: summary:shell-summary
proTip: Prvo zaključujemo vizuelni rezultat, a tek onda uvodimo funkcionalnosti korak po korak.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-summary-scene

### Narration

Uklanjamo shell helper outline. Vizuelni widget je sada kompletan i ovo je prvi trenutak kada kažemo: ovo je ono što želimo.

### Show Code: css

```css
.app-shell {
  padding: 48px 32px;
  display: grid;
  place-items: center;
  gap: 24px;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  /* helper outline removed */
}

ui-user-avatar {
  display: inline-block;
  position: relative;
  cursor: pointer;
  --avatar-surface: #1e293b;
  --avatar-surface-alt: #0f172a;
  --avatar-accent: #38bdf8;
  --avatar-text: #f1f5f9;
  --avatar-muted: #94a3b8;
  --avatar-border: rgba(148, 163, 184, 0.2);
  --avatar-shadow: 0 8px 32px rgba(15, 23, 42, 0.48);
  --avatar-status-color: #22c55e;
  /* helper outline removed */
}

ui-user-avatar[status='online'] {
  --avatar-status-color: #22c55e;
}

ui-user-avatar[status='idle'] {
  --avatar-status-color: #facc15;
}

ui-user-avatar[status='away'] {
  --avatar-status-color: #fb923c;
}

ui-user-avatar[status='offline'] {
  --avatar-status-color: #64748b;
}
```

# Step: connected-callback-bind

title: "JS: connectedCallback zakačuje evente"
summary: Tek na kraju, kad su reference spremne, zakačujemo event listenere.
intent: Event wiring ide poslednji — DOM mora biti spreman pre binding-a.
tag: js:connected-callback-bind
proTip: Event wiring ide poslednji — DOM mora biti spreman pre binding-a.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: connected-callback-bind-scene

### Narration

Tek na kraju, kad su reference spremne, zakačujemo event listenere.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: normalize-text-helper

title: "JS: normalizeTextValue() helper"
summary: Dodajemo `normalizeTextValue()` da username i role ne zavise od sirovog ulaza.
intent: API border normalizuje ulaz. Komponenta nikad ne radi sa undefined ili praznim stringovima bez fallback-a.
tag: js:normalize-text-helper
proTip: API border normalizuje ulaz. Komponenta nikad ne radi sa undefined ili praznim stringovima bez fallback-a.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: normalize-text-helper-scene

### Narration

Dodajemo `normalizeTextValue()` da username i role ne zavise od sirovog ulaza.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: allowed-statuses-set

title: "JS: allowedStatuses Set"
summary: "Zaključavamo dozvoljene statusne vrednosti: `online`, `idle`, `away`, `offline`."
intent: Otvoreni string API za status koji direktno utiče na styling je rizičan. Set ga zatvara.
tag: js:allowed-statuses-set
proTip: Otvoreni string API za status koji direktno utiče na styling je rizičan. Set ga zatvara.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: allowed-statuses-set-scene

### Narration

Zaključavamo dozvoljene statusne vrednosti: `online`, `idle`, `away`, `offline`.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: normalize-status-helper

title: "JS: normalizeStatusValue() helper"
summary: Dodajemo `normalizeStatusValue()`. Svaki nepoznat status automatski pada na `offline`.
intent: Fallback je deo contract-a. Komponenta ne sme da padne zbog pogrešno napisanog statusa.
tag: js:normalize-status-helper
proTip: Fallback je deo contract-a. Komponenta ne sme da padne zbog pogrešno napisanog statusa.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: normalize-status-helper-scene

### Narration

Dodajemo `normalizeStatusValue()`. Svaki nepoznat status automatski pada na `offline`.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: status-label-map

title: "JS: statusAriaLabel mapa"
summary: Dodajemo `statusAriaLabel` objekat koji mapira status vrednosti na human-readable aria labele.
intent: Accessibility nije opciona. Status badge mora imati smislenu aria labelu na svakom koraku.
tag: js:status-label-map
proTip: Accessibility nije opciona. Status badge mora imati smislenu aria labelu na svakom koraku.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: status-label-map-scene

### Narration

Dodajemo `statusAriaLabel` objekat koji mapira status vrednosti na human-readable aria labele.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: disconnected-callback

title: "JS: disconnectedCallback cleanup"
summary: Na izlazu iz DOM-a skidamo event listener.
intent: Production widget mora biti siguran i pri reconnect scenariju. Leak-ovi eventa su stvarni bug.
tag: js:disconnected-callback
proTip: Production widget mora biti siguran i pri reconnect scenariju. Leak-ovi eventa su stvarni bug.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: disconnected-callback-scene

### Narration

Na izlazu iz DOM-a skidamo event listener.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: attribute-changed-callback

title: "JS: precizan attributeChangedCallback"
summary: Potpis prima `name`, `oldValue` i `newValue` — tri argumenta su tačan Web Components API.
intent: Tačan API potpis je uslov za ispravno granularno razlikovanje promena.
tag: js:attribute-changed-callback
proTip: Tačan API potpis je uslov za ispravno granularno razlikovanje promena.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: attribute-changed-callback-scene

### Narration

Potpis prima `name`, `oldValue` i `newValue` — tri argumenta su tačan Web Components API.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {}

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: attribute-changed-guard

title: "JS: guard za iste vrednosti i disconnected stanje"
summary: Odmah izlazimo ako se vrednost nije promenila ili widget još nije u živom DOM-u.
intent: Enterprise update path ne troši resurse bez potrebe.
tag: js:attribute-changed-guard
proTip: Enterprise update path ne troši resurse bez potrebe.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: attribute-changed-guard-scene

### Narration

Odmah izlazimo ako se vrednost nije promenila ili widget još nije u živom DOM-u.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: attribute-changed-switch

title: "JS: switch — menjamo samo ono što se promenilo"
summary: Switch poziva `updateUsername()`, `updateRole()` ili `updateStatus()` zavisno od atributa koji se promenio.
intent: "Granularni update je ključna razlika: nema slepog full-render poziva za svaku atributsku promenu."
tag: js:attribute-changed-switch
proTip: "Granularni update je ključna razlika: nema slepog full-render poziva za svaku atributsku promenu."
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: attribute-changed-switch-scene

### Narration

Switch poziva `updateUsername()`, `updateRole()` ili `updateStatus()` zavisno od atributa koji se promenio.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'username':
        this.updateUsername();
        break;
      case 'role':
        this.updateRole();
        break;
      case 'status':
        this.updateStatus();
        break;
      default:
        break;
    }
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: property-username-getter

title: "JS: username getter"
summary: Property getter vraća normalizovani username sa fallback-om.
intent: Property API otvara čist JS contract pored declarative HTML atributa.
tag: js:property-username-getter
proTip: Property API otvara čist JS contract pored declarative HTML atributa.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: property-username-getter-scene

### Narration

Property getter vraća normalizovani username sa fallback-om.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'username':
        this.updateUsername();
        break;
      case 'role':
        this.updateRole();
        break;
      case 'status':
        this.updateStatus();
        break;
      default:
        break;
    }
  }

  get username() {
    return normalizeTextValue(this.getAttribute('username'), 'Team Member');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: property-username-setter

title: "JS: username setter"
summary: Setter piše nazad u atribut — source of truth ostaje na atributu.
intent: Imperative JS i declarative HTML API rade kroz isti kanal.
tag: js:property-username-setter
proTip: Imperative JS i declarative HTML API rade kroz isti kanal.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: property-username-setter-scene

### Narration

Setter piše nazad u atribut — source of truth ostaje na atributu.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'username':
        this.updateUsername();
        break;
      case 'role':
        this.updateRole();
        break;
      case 'status':
        this.updateStatus();
        break;
      default:
        break;
    }
  }

  get username() {
    return normalizeTextValue(this.getAttribute('username'), 'Team Member');
  }

  set username(value) {
    this.setAttribute('username', normalizeTextValue(value, 'Team Member'));
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: property-role-getter

title: "JS: role getter"
summary: Getter vraća normalizovanu role vrednost.
intent: Role može biti prazan string — to je validno stanje.
tag: js:property-role-getter
proTip: Role može biti prazan string — to je validno stanje.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: property-role-getter-scene

### Narration

Getter vraća normalizovanu role vrednost.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'username':
        this.updateUsername();
        break;
      case 'role':
        this.updateRole();
        break;
      case 'status':
        this.updateStatus();
        break;
      default:
        break;
    }
  }

  get username() {
    return normalizeTextValue(this.getAttribute('username'), 'Team Member');
  }

  set username(value) {
    this.setAttribute('username', normalizeTextValue(value, 'Team Member'));
  }

  get role() {
    return normalizeTextValue(this.getAttribute('role'), '');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: property-role-setter

title: "JS: role setter"
summary: Setter piše normalizovanu role nazad u atribut.
intent: "Isti model kao username: atribut je jedini source of truth."
tag: js:property-role-setter
proTip: "Isti model kao username: atribut je jedini source of truth."
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: property-role-setter-scene

### Narration

Setter piše normalizovanu role nazad u atribut.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'username':
        this.updateUsername();
        break;
      case 'role':
        this.updateRole();
        break;
      case 'status':
        this.updateStatus();
        break;
      default:
        break;
    }
  }

  get username() {
    return normalizeTextValue(this.getAttribute('username'), 'Team Member');
  }

  set username(value) {
    this.setAttribute('username', normalizeTextValue(value, 'Team Member'));
  }

  get role() {
    return normalizeTextValue(this.getAttribute('role'), '');
  }

  set role(value) {
    this.setAttribute('role', normalizeTextValue(value, ''));
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: property-status-getter

title: "JS: status getter"
summary: Getter vraća normalizovani status sa fallback-om na `offline`.
intent: Nikad ne vraćamo nevalidni status dalje kroz sistem.
tag: js:property-status-getter
proTip: Nikad ne vraćamo nevalidni status dalje kroz sistem.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: property-status-getter-scene

### Narration

Getter vraća normalizovani status sa fallback-om na `offline`.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'username':
        this.updateUsername();
        break;
      case 'role':
        this.updateRole();
        break;
      case 'status':
        this.updateStatus();
        break;
      default:
        break;
    }
  }

  get username() {
    return normalizeTextValue(this.getAttribute('username'), 'Team Member');
  }

  set username(value) {
    this.setAttribute('username', normalizeTextValue(value, 'Team Member'));
  }

  get role() {
    return normalizeTextValue(this.getAttribute('role'), '');
  }

  set role(value) {
    this.setAttribute('role', normalizeTextValue(value, ''));
  }

  get status() {
    return normalizeStatusValue(this.getAttribute('status'));
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: property-status-setter

title: "JS: status setter"
summary: Setter normalizuje status pre upisa — nevalidni ulaz se pretvara u `offline`.
intent: Normalizacija ide na granici API-ja, ne usred update logike.
tag: js:property-status-setter
proTip: Normalizacija ide na granici API-ja, ne usred update logike.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: property-status-setter-scene

### Narration

Setter normalizuje status pre upisa — nevalidni ulaz se pretvara u `offline`.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'username':
        this.updateUsername();
        break;
      case 'role':
        this.updateRole();
        break;
      case 'status':
        this.updateStatus();
        break;
      default:
        break;
    }
  }

  get username() {
    return normalizeTextValue(this.getAttribute('username'), 'Team Member');
  }

  set username(value) {
    this.setAttribute('username', normalizeTextValue(value, 'Team Member'));
  }

  get role() {
    return normalizeTextValue(this.getAttribute('role'), '');
  }

  set role(value) {
    this.setAttribute('role', normalizeTextValue(value, ''));
  }

  get status() {
    return normalizeStatusValue(this.getAttribute('status'));
  }

  set status(value) {
    this.setAttribute('status', normalizeStatusValue(value));
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: property-profile-url-getter

title: "JS: profileUrl getter"
summary: Getter vraća `profile-url` atribut bez normalizacije — URL je otvoren string.
intent: Profile URL nije validovan u widgetu; parent je odgovoran za tačnost URL-a.
tag: js:property-profile-url-getter
proTip: Profile URL nije validovan u widgetu; parent je odgovoran za tačnost URL-a.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: property-profile-url-getter-scene

### Narration

Getter vraća `profile-url` atribut bez normalizacije — URL je otvoren string.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'username':
        this.updateUsername();
        break;
      case 'role':
        this.updateRole();
        break;
      case 'status':
        this.updateStatus();
        break;
      default:
        break;
    }
  }

  get username() {
    return normalizeTextValue(this.getAttribute('username'), 'Team Member');
  }

  set username(value) {
    this.setAttribute('username', normalizeTextValue(value, 'Team Member'));
  }

  get role() {
    return normalizeTextValue(this.getAttribute('role'), '');
  }

  set role(value) {
    this.setAttribute('role', normalizeTextValue(value, ''));
  }

  get status() {
    return normalizeStatusValue(this.getAttribute('status'));
  }

  set status(value) {
    this.setAttribute('status', normalizeStatusValue(value));
  }

  get profileUrl() {
    return this.getAttribute('profile-url') || '';
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: bind-events

title: "JS: bindEvents()"
summary: Event wiring ostaje u sopstvenoj responsibility metodi.
intent: Bind i unbind idu uvek u par, sa jasnim imenima.
tag: js:bind-events
proTip: Bind i unbind idu uvek u par, sa jasnim imenima.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: bind-events-scene

### Narration

Event wiring ostaje u sopstvenoj responsibility metodi.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'username':
        this.updateUsername();
        break;
      case 'role':
        this.updateRole();
        break;
      case 'status':
        this.updateStatus();
        break;
      default:
        break;
    }
  }

  get username() {
    return normalizeTextValue(this.getAttribute('username'), 'Team Member');
  }

  set username(value) {
    this.setAttribute('username', normalizeTextValue(value, 'Team Member'));
  }

  get role() {
    return normalizeTextValue(this.getAttribute('role'), '');
  }

  set role(value) {
    this.setAttribute('role', normalizeTextValue(value, ''));
  }

  get status() {
    return normalizeStatusValue(this.getAttribute('status'));
  }

  set status(value) {
    this.setAttribute('status', normalizeStatusValue(value));
  }

  get profileUrl() {
    return this.getAttribute('profile-url') || '';
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }

  bindEvents() {}
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: bind-events-guard

title: "JS: bindEvents štiti od duplog binding-a"
summary: Flag `isClickBound` sprečava dvostruko kačenje listenera. Postavljamo i `tabindex` i `role` atribute za accessibility.
intent: Widget mora biti navigabilan tastaturom — tabindex i role su deo tog contract-a.
tag: js:bind-events-guard
proTip: Widget mora biti navigabilan tastaturom — tabindex i role su deo tog contract-a.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: bind-events-guard-scene

### Narration

Flag `isClickBound` sprečava dvostruko kačenje listenera. Postavljamo i `tabindex` i `role` atribute za accessibility.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'username':
        this.updateUsername();
        break;
      case 'role':
        this.updateRole();
        break;
      case 'status':
        this.updateStatus();
        break;
      default:
        break;
    }
  }

  get username() {
    return normalizeTextValue(this.getAttribute('username'), 'Team Member');
  }

  set username(value) {
    this.setAttribute('username', normalizeTextValue(value, 'Team Member'));
  }

  get role() {
    return normalizeTextValue(this.getAttribute('role'), '');
  }

  set role(value) {
    this.setAttribute('role', normalizeTextValue(value, ''));
  }

  get status() {
    return normalizeStatusValue(this.getAttribute('status'));
  }

  set status(value) {
    this.setAttribute('status', normalizeStatusValue(value));
  }

  get profileUrl() {
    return this.getAttribute('profile-url') || '';
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }

  bindEvents() {
    if (this.isClickBound) {
      return;
    }

    this.addEventListener('click', this.handleAvatarClick);
    this.setAttribute('tabindex', '0');
    this.setAttribute('role', 'button');
    this.isClickBound = true;
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: unbind-events

title: "JS: unbindEvents()"
summary: Cleanup metoda postoji za svaki bind scenario.
intent: Ako postoji bind, mora postojati i cleanup. Bez izuzetka.
tag: js:unbind-events
proTip: Ako postoji bind, mora postojati i cleanup. Bez izuzetka.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: unbind-events-scene

### Narration

Cleanup metoda postoji za svaki bind scenario.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'username':
        this.updateUsername();
        break;
      case 'role':
        this.updateRole();
        break;
      case 'status':
        this.updateStatus();
        break;
      default:
        break;
    }
  }

  get username() {
    return normalizeTextValue(this.getAttribute('username'), 'Team Member');
  }

  set username(value) {
    this.setAttribute('username', normalizeTextValue(value, 'Team Member'));
  }

  get role() {
    return normalizeTextValue(this.getAttribute('role'), '');
  }

  set role(value) {
    this.setAttribute('role', normalizeTextValue(value, ''));
  }

  get status() {
    return normalizeStatusValue(this.getAttribute('status'));
  }

  set status(value) {
    this.setAttribute('status', normalizeStatusValue(value));
  }

  get profileUrl() {
    return this.getAttribute('profile-url') || '';
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }

  bindEvents() {
    if (this.isClickBound) {
      return;
    }

    this.addEventListener('click', this.handleAvatarClick);
    this.setAttribute('tabindex', '0');
    this.setAttribute('role', 'button');
    this.isClickBound = true;
  }

  unbindEvents() {}
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: unbind-events-guard

title: "JS: unbindEvents skida listener samo kada postoji"
summary: Guard sprečava grešku pri pokušaju skidanja listenera koji nije zakačen.
intent: Reconnect moraju biti dosadni — bez neregularnih situacija.
tag: js:unbind-events-guard
proTip: Reconnect moraju biti dosadni — bez neregularnih situacija.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: unbind-events-guard-scene

### Narration

Guard sprečava grešku pri pokušaju skidanja listenera koji nije zakačen.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'username':
        this.updateUsername();
        break;
      case 'role':
        this.updateRole();
        break;
      case 'status':
        this.updateStatus();
        break;
      default:
        break;
    }
  }

  get username() {
    return normalizeTextValue(this.getAttribute('username'), 'Team Member');
  }

  set username(value) {
    this.setAttribute('username', normalizeTextValue(value, 'Team Member'));
  }

  get role() {
    return normalizeTextValue(this.getAttribute('role'), '');
  }

  set role(value) {
    this.setAttribute('role', normalizeTextValue(value, ''));
  }

  get status() {
    return normalizeStatusValue(this.getAttribute('status'));
  }

  set status(value) {
    this.setAttribute('status', normalizeStatusValue(value));
  }

  get profileUrl() {
    return this.getAttribute('profile-url') || '';
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }

  bindEvents() {
    if (this.isClickBound) {
      return;
    }

    this.addEventListener('click', this.handleAvatarClick);
    this.setAttribute('tabindex', '0');
    this.setAttribute('role', 'button');
    this.isClickBound = true;
  }

  unbindEvents() {
    if (!this.isClickBound) {
      return;
    }

    this.removeEventListener('click', this.handleAvatarClick);
    this.isClickBound = false;
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: handle-avatar-click

title: "JS: handleAvatarClick()"
summary: Klik handler emituje namespaced event sa punim payload-om.
intent: "Handler je mali i predvidiv: jedna odgovornost — emitovanje event-a."
tag: js:handle-avatar-click
proTip: "Handler je mali i predvidiv: jedna odgovornost — emitovanje event-a."
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: handle-avatar-click-scene

### Narration

Klik handler emituje namespaced event sa punim payload-om.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'username':
        this.updateUsername();
        break;
      case 'role':
        this.updateRole();
        break;
      case 'status':
        this.updateStatus();
        break;
      default:
        break;
    }
  }

  get username() {
    return normalizeTextValue(this.getAttribute('username'), 'Team Member');
  }

  set username(value) {
    this.setAttribute('username', normalizeTextValue(value, 'Team Member'));
  }

  get role() {
    return normalizeTextValue(this.getAttribute('role'), '');
  }

  set role(value) {
    this.setAttribute('role', normalizeTextValue(value, ''));
  }

  get status() {
    return normalizeStatusValue(this.getAttribute('status'));
  }

  set status(value) {
    this.setAttribute('status', normalizeStatusValue(value));
  }

  get profileUrl() {
    return this.getAttribute('profile-url') || '';
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }

  bindEvents() {
    if (this.isClickBound) {
      return;
    }

    this.addEventListener('click', this.handleAvatarClick);
    this.setAttribute('tabindex', '0');
    this.setAttribute('role', 'button');
    this.isClickBound = true;
  }

  unbindEvents() {
    if (!this.isClickBound) {
      return;
    }

    this.removeEventListener('click', this.handleAvatarClick);
    this.isClickBound = false;
  }

  handleAvatarClick() {}
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: handle-avatar-click-event

title: "JS: ui-user-avatar:profile-open event"
summary: "Emitujemo `ui-user-avatar:profile-open` sa `bubbles`, `composed`, `cancelable` i stabilnim `detail`-om: username, role, status, profileUrl, source."
intent: Event contract je deo javnog API-ja. Parent sluša ovaj event i odlučuje da li otvara modal, navigira ili radi nešto treće.
tag: js:handle-avatar-click-event
proTip: Event contract je deo javnog API-ja. Parent sluša ovaj event i odlučuje da li otvara modal, navigira ili radi nešto treće.
focusHtmlNeedles:

- <ui-user-avatar
- username=

## Scene: handle-avatar-click-event-scene

### Narration

Emitujemo `ui-user-avatar:profile-open` sa `bubbles`, `composed`, `cancelable` i stabilnim `detail`-om: username, role, status, profileUrl, source.

### Show Code: js

```js
import { uiUserAvatarTemplate } from './ui-user-avatar.template.js';
class UiUserAvatar extends HTMLElement {
  static observedAttributes = ['username', 'role', 'status', 'profile-url'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.usernameElement = null;
    this.roleElement = null;
    this.statusBadgeElement = null;
    this.isClickBound = false;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();

    function normalizeTextValue(value, fallback) {
      return String(value ?? '').trim() || fallback;
    }

    const allowedStatuses = new Set(['online', 'idle', 'away', 'offline']);

    function normalizeStatusValue(value) {
      const v = String(value ?? '')
        .trim()
        .toLowerCase();
      return allowedStatuses.has(v) ? v : 'offline';
    }

    const statusAriaLabel = {
      online: 'Online',
      idle: 'Idle',
      away: 'Away',
      offline: 'Offline',
    };
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'username':
        this.updateUsername();
        break;
      case 'role':
        this.updateRole();
        break;
      case 'status':
        this.updateStatus();
        break;
      default:
        break;
    }
  }

  get username() {
    return normalizeTextValue(this.getAttribute('username'), 'Team Member');
  }

  set username(value) {
    this.setAttribute('username', normalizeTextValue(value, 'Team Member'));
  }

  get role() {
    return normalizeTextValue(this.getAttribute('role'), '');
  }

  set role(value) {
    this.setAttribute('role', normalizeTextValue(value, ''));
  }

  get status() {
    return normalizeStatusValue(this.getAttribute('status'));
  }

  set status(value) {
    this.setAttribute('status', normalizeStatusValue(value));
  }

  get profileUrl() {
    return this.getAttribute('profile-url') || '';
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiUserAvatarTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.usernameElement) {
      this.usernameElement = this.shadowRoot.querySelector('.username');
    }

    if (!this.roleElement) {
      this.roleElement = this.shadowRoot.querySelector('.role');
    }

    if (!this.statusBadgeElement) {
      this.statusBadgeElement = this.shadowRoot.querySelector('.status-badge');
    }
  }

  syncFromAttributes() {
    this.updateUsername();
    this.updateRole();
    this.updateStatus();
  }

  updateUsername() {
    if (!this.usernameElement) {
      return;
    }

    this.usernameElement.textContent = this.username;
  }

  updateRole() {
    if (!this.roleElement) {
      return;
    }

    this.roleElement.textContent = this.role;
  }

  updateStatus() {
    if (!this.statusBadgeElement) {
      return;
    }

    const normalizedStatus = this.status;
    this.statusBadgeElement.setAttribute(
      'aria-label',
      statusAriaLabel[normalizedStatus] || 'Unknown'
    );
  }

  bindEvents() {
    if (this.isClickBound) {
      return;
    }

    this.addEventListener('click', this.handleAvatarClick);
    this.setAttribute('tabindex', '0');
    this.setAttribute('role', 'button');
    this.isClickBound = true;
  }

  unbindEvents() {
    if (!this.isClickBound) {
      return;
    }

    this.removeEventListener('click', this.handleAvatarClick);
    this.isClickBound = false;
  }

  handleAvatarClick() {
    this.dispatchEvent(
      new CustomEvent('ui-user-avatar:profile-open', {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: {
          username: this.username,
          role: this.role,
          status: this.status,
          profileUrl: this.profileUrl,
          source: 'ui-user-avatar',
        },
      })
    );
  }
}

if (!customElements.get('ui-user-avatar')) {
  customElements.define('ui-user-avatar', UiUserAvatar);
}
```

# Step: done

title: "Done: UI User Avatar Dashboard Widget"
summary: "`ui-user-avatar` je završen: `index.html` deklarativno koristi atribute i slotove, `ui-user-avatar.template.js` drži shadow strukturu, `ui-user-avatar.js` vodi property API, lifecycle i namespaced event contract, `style.css` theme-uje host i variants, a `ui-user-avatar.shadow.css` drži unutrašnji styling widgeta."
intent: "Enterprise widget contract je uzan: četiri atributa, dva slota, jedan event. Parent odlučuje šta se dešava pri kliku — widget samo emituje signal."
tag: success
proTip: "Enterprise widget contract je uzan: četiri atributa, dva slota, jedan event. Parent odlučuje šta se dešava pri kliku — widget samo emituje signal."

## Scene: done-scene

### Narration

`ui-user-avatar` je završen: `index.html` deklarativno koristi atribute i slotove, `ui-user-avatar.template.js` drži shadow strukturu, `ui-user-avatar.js` vodi property API, lifecycle i namespaced event contract, `style.css` theme-uje host i variants, a `ui-user-avatar.shadow.css` drži unutrašnji styling widgeta.

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
