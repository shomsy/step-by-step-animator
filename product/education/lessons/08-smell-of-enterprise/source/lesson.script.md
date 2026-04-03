---
schemaVersion: 1
lessonId: 08-smell-of-enterprise
lessonTitle: 08 · UI Pricing Card — SaaS Pricing Table
lessonIntro: 'Gradimo `ui-pricing-card` u dve faze: prvo zatvaramo kompletan vizuelni shell sa HTML, template i CSS slojem kao vizuelnu fazu, a tek onda uključujemo tier varijante, popular highlight, yearly/monthly billing toggle, CTA dugme sa urgency countdown timerom i feature matrix slotove kao logičku fazu.'
status: active
courseId: step-by-step-animator
order: 8
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
    label: ui-pricing-card.js
    isPrimary: false
  - artifactId: template-js
    language: js
    label: ui-pricing-card.template.js
    isPrimary: false
  - artifactId: shadow-css
    language: css
    label: ui-pricing-card.shadow.css
    isPrimary: false
preview:
  type: dom
  title: Live SaaS Pricing Card Preview
  address: browser://08-ui-pricing-card-preview
ideMode: true
goal:
  title: 'Cilj: SaaS Pricing Card Widget'
  imageSrc: ./assets/web-component-goal.svg
  imageAlt: Referentna slika ui-pricing-card sa Pro tier-om, billing toggle-om, feature listom i urgency timer-om.
  imageCaption: Prvo gradimo vizuelnu pricing karticu, a tek onda na nju primenjujemo tier varijante, toggle i countdown urgency ponašanje.
homework:
  enabled: true
  title: Varijante za samostalnu vežbu
  items:
    - Napravi grid od tri kartice (starter/pro/enterprise) sa različitim feature listama i cenama.
    - Dodaj `urgency-seconds` atribut umesto hardkodovanih 3600 sekundi za veću fleksibilnost.
    - 'Implementiraj dynamic pricing calc: dodaj `seats` atribut i množji cenu sa brojem mesta.'
    - Dodaj `discount-code` atribut koji primeni popust i prikaže precrtan originalni iznos.
---

# Step: empty-shell

title: "Start: Empty App Shell"
summary: Počinjemo od praznog `.app-shell`. SaaS pricing kartica živi u neutralnom host okruženju.
intent: Pricing table komponenta radi u bilo kom kontekstu — landing page, modal, dashboard.
tag: html:app-shell
proTip: Pricing table komponenta radi u bilo kom kontekstu — landing page, modal, dashboard.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: empty-shell-scene

### Narration

Počinjemo od praznog `.app-shell`. SaaS pricing kartica živi u neutralnom host okruženju.

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

title: "HTML: ui-pricing-card Host"
summary: Dodajemo `<ui-pricing-card>` sa `tier="pro"`, `price-monthly="29"` i `price-yearly="290"`. Tag odmah kaže šta widget radi.
intent: "Domain-driven naming: ime taga govori business use case, ne tehničku implementaciju."
tag: html:ui-pricing-card
proTip: "Domain-driven naming: ime taga govori business use case, ne tehničku implementaciju."

## Scene: component-html-scene

### Narration

Dodajemo `<ui-pricing-card>` sa `tier="pro"`, `price-monthly="29"` i `price-yearly="290"`. Tag odmah kaže šta widget radi.

### Show Code: html

```html
<div class="app-shell">
  <ui-pricing-card tier="pro" price-monthly="29" price-yearly="290"> </ui-pricing-card>
</div>
```

### Show Code: css

```css
.app-shell {
}

ui-pricing-card {
}
```

# Step: popular-attribute-html

title: "HTML: popular Boolean Attribute"
summary: Dodajemo `popular` atribut. Njegova prisutnost znači da je ova kartica istaknuta — nema vrednosti, samo postoji ili ne postoji.
intent: "Boolean atribut je najčistiji deklarativni state signal: prisutnost = true, odsustvo = false."
tag: html:popular
proTip: "Boolean atribut je najčistiji deklarativni state signal: prisutnost = true, odsustvo = false."

## Scene: popular-attribute-html-scene

### Narration

Dodajemo `popular` atribut. Njegova prisutnost znači da je ova kartica istaknuta — nema vrednosti, samo postoji ili ne postoji.

### Show Code: html

```html
<div class="app-shell">
  <ui-pricing-card tier="pro" price-monthly="29" price-yearly="290" popular> </ui-pricing-card>
</div>
```

# Step: cta-label-attribute-html

title: "HTML: cta-label Attribute"
summary: Dodajemo `cta-label="Start free trial"`. CTA tekst je deo javnog contract-a, ne hardkodovan u shadow DOM-u.
intent: Svaki tekst koji parent može da želi da promeni mora biti atribut, ne interni string.
tag: html:cta-label
proTip: Svaki tekst koji parent može da želi da promeni mora biti atribut, ne interni string.

## Scene: cta-label-attribute-html-scene

### Narration

Dodajemo `cta-label="Start free trial"`. CTA tekst je deo javnog contract-a, ne hardkodovan u shadow DOM-u.

### Show Code: html

```html
<div class="app-shell">
  <ui-pricing-card
    tier="pro"
    price-monthly="29"
    price-yearly="290"
    popular
    cta-label="Start free trial"
  >
  </ui-pricing-card>
</div>
```

# Step: badge-slot-html

title: "HTML: Named Slot — badge"
summary: Dodajemo `<span slot="badge">⭐ Most Popular</span>`. Parent kontroliše badge sadržaj.
intent: Named slot daje parent-u slobodu da pošalje emoji, tekst, ili čak custom HTML za badge.
tag: html:slot-badge
proTip: Named slot daje parent-u slobodu da pošalje emoji, tekst, ili čak custom HTML za badge.

## Scene: badge-slot-html-scene

### Narration

Dodajemo `<span slot="badge">⭐ Most Popular</span>`. Parent kontroliše badge sadržaj.

### Show Code: html

```html
<div class="app-shell">
  <ui-pricing-card
    tier="pro"
    price-monthly="29"
    price-yearly="290"
    popular
    cta-label="Start free trial"
  >
    <span slot="badge">⭐ Most Popular</span>
  </ui-pricing-card>
</div>
```

# Step: features-slot-html

title: "HTML: Named Slot — features"
summary: Dodajemo `<ul slot="features">` sa pet feature stavki. Feature matrix je javna powierzchina.
intent: Feature lista kao slot znači da svaki tier može imati drugačije stavke bez promene komponente.
tag: html:slot-features
proTip: Feature lista kao slot znači da svaki tier može imati drugačije stavke bez promene komponente.

## Scene: features-slot-html-scene

### Narration

Dodajemo `<ul slot="features">` sa pet feature stavki. Feature matrix je javna powierzchina.

### Show Code: html

```html
<div class="app-shell">
  <ui-pricing-card
    tier="pro"
    price-monthly="29"
    price-yearly="290"
    popular
    cta-label="Start free trial"
  >
    <span slot="badge">⭐ Most Popular</span>
    <ul slot="features">
      <li>Unlimited projects</li>
      <li>Priority support</li>
      <li>Advanced analytics</li>
      <li>Team collaboration</li>
      <li>Custom integrations</li>
    </ul>
  </ui-pricing-card>
</div>
```

# Step: pricing-widget-contract

title: "Teaching Moment: SaaS Pricing Contract"
summary: "Widget ima šest atributa: `tier`, `price-monthly`, `price-yearly`, `billing`, `popular`, `cta-label`. Ima dva named slota: `badge` i `features`. Emituje jedan namespaced event: `ui-pricing-card:subscribe`. Urgency timer je interni lifecycle detalj."
intent: "SaaS pricing widget API treba da budi uzan: parent zna cenu i tier, widget zna visual i behavior."
tag: teaching:pricing-widget-contract
proTip: "SaaS pricing widget API treba da budi uzan: parent zna cenu i tier, widget zna visual i behavior."
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: pricing-widget-contract-scene

### Narration

Widget ima šest atributa: `tier`, `price-monthly`, `price-yearly`, `billing`, `popular`, `cta-label`. Ima dva named slota: `badge` i `features`. Emituje jedan namespaced event: `ui-pricing-card:subscribe`. Urgency timer je interni lifecycle detalj.

### Show Code: html

```html
<div class="app-shell">
  <ui-pricing-card
    tier="pro"
    price-monthly="29"
    price-yearly="290"
    popular
    cta-label="Start free trial"
  >
    <span slot="badge">⭐ Most Popular</span>
    <ul slot="features">
      <li>Unlimited projects</li>
      <li>Priority support</li>
      <li>Advanced analytics</li>
      <li>Team collaboration</li>
      <li>Custom integrations</li>
    </ul>
  </ui-pricing-card>
</div>
```

# Step: template-html-declaration

title: "Template JS: Shadow DOM struktura"
summary: "U `ui-pricing-card.template.js` definišemo `templateHtml`: card sa badge, tier-name, price-block (currency/amount/period), billing-toggle sa knob switch-em, feature-list slot, CTA dugme i urgency timer zona."
intent: Template fajl drži kompletnu shadow strukturu. Klasa ga samo klonira — nikad ne rekreira.
tag: template-js:template-html-declaration
proTip: Template fajl drži kompletnu shadow strukturu. Klasa ga samo klonira — nikad ne rekreira.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: template-html-declaration-scene

### Narration

U `ui-pricing-card.template.js` definišemo `templateHtml`: card sa badge, tier-name, price-block (currency/amount/period), billing-toggle sa knob switch-em, feature-list slot, CTA dugme i urgency timer zona.

### Show Code: template-js

```js
export const templateHtml = `
  <article class="card" part="card">
    <div class="popular-badge" part="badge">
      <slot name="badge">Most Popular</slot>
    </div>

    <h3 class="tier-name" part="tier-name"></h3>

    <div class="price-block" part="price-block">
      <span class="price-currency">$</span>
      <span class="price-amount"></span>
      <span class="price-period">/mo</span>
    </div>

    <div class="billing-toggle" part="billing-toggle">
      <span class="toggle-label">Monthly</span>
      <button class="toggle-switch" type="button" role="switch" aria-checked="false">
        <span class="toggle-knob"></span>
      </button>
      <span class="toggle-label">Yearly <span class="save-badge">Save 20%</span></span>
    </div>

    <div class="feature-list" part="feature-list">
      <slot name="features"></slot>
    </div>

    <button class="cta" part="cta" type="button"></button>

    <div class="urgency" part="urgency">
      <span class="urgency-icon">⏰</span>
      <span class="urgency-text"></span>
    </div>
  </article>
`;
```

# Step: template-element-export

title: "Template JS: Eksportujemo template element"
summary: Kreiramo `uiPricingCardTemplate`, dodajemo `<link>` ka shadow CSS fajlu i ubrizgavamo `${templateHtml}`.
intent: Template modul zna za markup i stylesheet. Klasa uopšte ne zna kako izgleda HTML.
tag: template-js:template-element-export
proTip: Template modul zna za markup i stylesheet. Klasa uopšte ne zna kako izgleda HTML.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: template-element-export-scene

### Narration

Kreiramo `uiPricingCardTemplate`, dodajemo `<link>` ka shadow CSS fajlu i ubrizgavamo `${templateHtml}`.

### Show Code: template-js

```js
export const templateHtml = `
  <article class="card" part="card">
    <div class="popular-badge" part="badge">
      <slot name="badge">Most Popular</slot>
    </div>

    <h3 class="tier-name" part="tier-name"></h3>

    <div class="price-block" part="price-block">
      <span class="price-currency">$</span>
      <span class="price-amount"></span>
      <span class="price-period">/mo</span>
    </div>

    <div class="billing-toggle" part="billing-toggle">
      <span class="toggle-label">Monthly</span>
      <button class="toggle-switch" type="button" role="switch" aria-checked="false">
        <span class="toggle-knob"></span>
      </button>
      <span class="toggle-label">Yearly <span class="save-badge">Save 20%</span></span>
    </div>

    <div class="feature-list" part="feature-list">
      <slot name="features"></slot>
    </div>

    <button class="cta" part="cta" type="button"></button>

    <div class="urgency" part="urgency">
      <span class="urgency-icon">⏰</span>
      <span class="urgency-text"></span>
    </div>
  </article>
`;

export const uiPricingCardTemplate = document.createElement('template');
uiPricingCardTemplate.innerHTML = `
  <link rel="stylesheet" href="./ui-pricing-card.shadow.css" />
  ${templateHtml}
`;
```

# Step: import-template

title: "JS: Uvozimo template modul"
summary: Behavior fajl uvozi `uiPricingCardTemplate` iz template modula.
intent: Klasa i template su u odvojenim fajlovima sa odvojenim odgovornostima.
tag: js:import-template
proTip: Klasa i template su u odvojenim fajlovima sa odvojenim odgovornostima.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: import-template-scene

### Narration

Behavior fajl uvozi `uiPricingCardTemplate` iz template modula.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';
```

# Step: normalize-text-helper

title: "JS: normalizeTextValue() helper"
summary: Dodajemo `normalizeTextValue()` za tekst normalizaciju sa fallback-om.
intent: Enterprise API normalizuje ulaz na granici, ne unutar poslovne logike.
tag: js:normalize-text-helper
proTip: Enterprise API normalizuje ulaz na granici, ne unutar poslovne logike.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: normalize-text-helper-scene

### Narration

Dodajemo `normalizeTextValue()` za tekst normalizaciju sa fallback-om.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}
```

# Step: allowed-tiers-set

title: "JS: allowedTiers Set"
summary: "Zaključavamo dozvoljene tier vrednosti: `starter`, `pro`, `enterprise`."
intent: Otvoreni string za tier koji utiče na pricing i styling je neprihvatljiv rizik.
tag: js:allowed-tiers-set
proTip: Otvoreni string za tier koji utiče na pricing i styling je neprihvatljiv rizik.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: allowed-tiers-set-scene

### Narration

Zaključavamo dozvoljene tier vrednosti: `starter`, `pro`, `enterprise`.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);
```

# Step: normalize-tier-helper

title: "JS: normalizeTierValue() helper"
summary: Nepoznat tier automatski pada na `starter`.
intent: Fallback je deo contract-a. Komponenta ne padne na pogresan tier string.
tag: js:normalize-tier-helper
proTip: Fallback je deo contract-a. Komponenta ne padne na pogresan tier string.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: normalize-tier-helper-scene

### Narration

Nepoznat tier automatski pada na `starter`.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}
```

# Step: parse-price-helper

title: "JS: parsePriceValue() helper"
summary: Dodajemo `parsePriceValue()` koji parira cenu u broj i vraća 0 za nevalidan ulaz.
intent: Cena se prikazuje korisnicima — mora biti sigurna od NaN-a i negativnih vrednosti.
tag: js:parse-price-helper
proTip: Cena se prikazuje korisnicima — mora biti sigurna od NaN-a i negativnih vrednosti.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: parse-price-helper-scene

### Narration

Dodajemo `parsePriceValue()` koji parira cenu u broj i vraća 0 za nevalidan ulaz.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}
```

# Step: format-time-helper

title: "JS: formatTimeRemaining() helper"
summary: Dodajemo `formatTimeRemaining()` koji formatira sekunde u `HH:MM:SS` string za urgency timer.
intent: Timer format je odvojenom helperu — lako se testira i zameni.
tag: js:format-time-helper
proTip: Timer format je odvojenom helperu — lako se testira i zameni.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: format-time-helper-scene

### Narration

Dodajemo `formatTimeRemaining()` koji formatira sekunde u `HH:MM:SS` string za urgency timer.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
```

# Step: tier-display-map

title: "JS: tierDisplayName mapa"
summary: Dodajemo mapu tier → display name. UI labela ne sme da bude isti string kao API vrednost.
intent: API koristi lowercase slug, UI prikazuje capitalized ime — mapa ih razdvaja.
tag: js:tier-display-map
proTip: API koristi lowercase slug, UI prikazuje capitalized ime — mapa ih razdvaja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: tier-display-map-scene

### Narration

Dodajemo mapu tier → display name. UI labela ne sme da bude isti string kao API vrednost.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};
```

# Step: class-declaration

title: "JS: UiPricingCard extends HTMLElement"
summary: Klasa nosi domain-driven ime konzistentno sa tagom.
intent: "`ui-pricing-card` → `UiPricingCard`. Tag i class govore istu priču."
tag: js:class-declaration
proTip: "`ui-pricing-card` → `UiPricingCard`. Tag i class govore istu priču."
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: class-declaration-scene

### Narration

Klasa nosi domain-driven ime konzistentno sa tagom.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {}
```

# Step: observed-attributes

title: "JS: observedAttributes — svih šest"
summary: Komponenta prati `tier`, `price-monthly`, `price-yearly`, `billing`, `popular` i `cta-label`.
intent: Pratimo tačno onoliko atributa koliko je definisano kao javni API.
tag: js:observed-attributes
proTip: Pratimo tačno onoliko atributa koliko je definisano kao javni API.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: observed-attributes-scene

### Narration

Komponenta prati `tier`, `price-monthly`, `price-yearly`, `billing`, `popular` i `cta-label`.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];
}
```

# Step: constructor-shadow

title: "JS: constructor otvara shadow root"
summary: "Konstruktor samo priprema instancu: shadow root, bind-ove i nulte reference."
intent: Konstruktor ne radi lifecycle posao niti čita DOM.
tag: js:constructor-shadow
proTip: Konstruktor ne radi lifecycle posao niti čita DOM.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: constructor-shadow-scene

### Narration

Konstruktor samo priprema instancu: shadow root, bind-ove i nulte reference.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
}
```

# Step: constructor-bind

title: "JS: constructor pre-binduje handlere"
summary: Vezujemo `handleCtaClick` i `handleToggleClick` jednom pri kreiranju instance.
intent: Dva handlera, dva pre-bind-a — stabilan cleanup je zagarantovan.
tag: js:constructor-bind
proTip: Dva handlera, dva pre-bind-a — stabilan cleanup je zagarantovan.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: constructor-bind-scene

### Narration

Vezujemo `handleCtaClick` i `handleToggleClick` jednom pri kreiranju instance.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
}
```

# Step: constructor-state

title: "JS: constructor priprema interne reference"
summary: Nulujemo DOM reference, binding flagove, timer ID i urgency preostalo vreme.
intent: Interno stanje je transparentno od prvog reda. Timer state je deo instanace.
tag: js:constructor-state
proTip: Interno stanje je transparentno od prvog reda. Timer state je deo instanace.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: constructor-state-scene

### Narration

Nulujemo DOM reference, binding flagove, timer ID i urgency preostalo vreme.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }
}
```

# Step: connected-callback

title: "JS: connectedCallback — lifecycle ulaz"
summary: Connected lifecycle je glavni ulaz kada pricing kartica uđe u DOM.
intent: Sve što zavisi od živog DOM-a ide u connectedCallback.
tag: js:connected-callback
proTip: Sve što zavisi od živog DOM-a ide u connectedCallback.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: connected-callback-scene

### Narration

Connected lifecycle je glavni ulaz kada pricing kartica uđe u DOM.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {}
}
```

# Step: connected-callback-setup

title: "JS: connectedCallback poziva setupTemplateOnce"
summary: Montiramo template u shadow root jednom.
intent: Mount i cache imaju odvojene metode.
tag: js:connected-callback-setup
proTip: Mount i cache imaju odvojene metode.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: connected-callback-setup-scene

### Narration

Montiramo template u shadow root jednom.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
  }
}
```

# Step: connected-callback-cache

title: "JS: connectedCallback poziva cacheDom"
summary: Keširamo pet DOM referenci.
intent: Query radimo jednom. Update metode rade nad keširanima.
tag: js:connected-callback-cache
proTip: Query radimo jednom. Update metode rade nad keširanima.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: connected-callback-cache-scene

### Narration

Keširamo pet DOM referenci.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
  }
}
```

# Step: connected-callback-sync

title: "JS: connectedCallback sinhronizuje atribute"
summary: Pozivamo `syncFromAttributes()` za inicijalni render pass.
intent: Četiri uske update metode inicijalizuju tačno ono što treba.
tag: js:connected-callback-sync
proTip: Četiri uske update metode inicijalizuju tačno ono što treba.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: connected-callback-sync-scene

### Narration

Pozivamo `syncFromAttributes()` za inicijalni render pass.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
  }
}
```

# Step: connected-callback-bind

title: "JS: connectedCallback zakačuje evente"
summary: Vezujemo CTA i toggle click listenere.
intent: Event wiring je poslednji korak — DOM mora biti spreman.
tag: js:connected-callback-bind
proTip: Event wiring je poslednji korak — DOM mora biti spreman.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: connected-callback-bind-scene

### Narration

Vezujemo CTA i toggle click listenere.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
  }
}
```

# Step: connected-callback-urgency

title: "JS: connectedCallback pokreće urgency timer"
summary: Pozivamo `startUrgencyTimer()` koji pokreće interval sa countdown-om od 1h.
intent: Timer je deo lifecycle-a — start na connect, stop na disconnect.
tag: js:connected-callback-urgency
proTip: Timer je deo lifecycle-a — start na connect, stop na disconnect.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: connected-callback-urgency-scene

### Narration

Pozivamo `startUrgencyTimer()` koji pokreće interval sa countdown-om od 1h.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }
}
```

# Step: disconnected-callback

title: "JS: disconnectedCallback — čisti sve"
summary: Na izlazu iz DOM-a skidamo evente i zaustavljamo urgency timer.
intent: Nema leaking intervala ni event listener-a — čist disconnect.
tag: js:disconnected-callback
proTip: Nema leaking intervala ni event listener-a — čist disconnect.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: disconnected-callback-scene

### Narration

Na izlazu iz DOM-a skidamo evente i zaustavljamo urgency timer.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }
}
```

# Step: attribute-changed-callback

title: "JS: precizan attributeChangedCallback"
summary: Potpis prima `name`, `oldValue` i `newValue` za granularni update.
intent: Preciznost omogućava da menjamo samo tu jednu stvar koja se zaista promenila.
tag: js:attribute-changed-callback
proTip: Preciznost omogućava da menjamo samo tu jednu stvar koja se zaista promenila.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: attribute-changed-callback-scene

### Narration

Potpis prima `name`, `oldValue` i `newValue` za granularni update.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {}
}
```

# Step: attribute-changed-guard

title: "JS: guard za iste vrednosti i disconnected stanje"
summary: Odmah izlazimo ako se vrednost nije promenila ili widget nije u DOM-u.
intent: Enterprise update path ne troši resurse bespotrebno.
tag: js:attribute-changed-guard
proTip: Enterprise update path ne troši resurse bespotrebno.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: attribute-changed-guard-scene

### Narration

Odmah izlazimo ako se vrednost nije promenila ili widget nije u DOM-u.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }
  }
}
```

# Step: attribute-changed-switch

title: "JS: switch — precizan update po atributu"
summary: Tier menja labelu, price/billing/yearly menjaju prikazanu cenu i toggle, cta-label menja dugme.
intent: Svaki atribut ima svoju granu — nema slepog full render-a.
tag: js:attribute-changed-switch
proTip: Svaki atribut ima svoju granu — nema slepog full render-a.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: attribute-changed-switch-scene

### Narration

Tier menja labelu, price/billing/yearly menjaju prikazanu cenu i toggle, cta-label menja dugme.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }
}
```

# Step: property-tier-getter

title: "JS: tier getter"
summary: Getter vraća normalizovani tier sa fallback-om na `starter`.
intent: Property API otvara JS pristup pored HTML contract-a.
tag: js:property-tier-getter
proTip: Property API otvara JS pristup pored HTML contract-a.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: property-tier-getter-scene

### Narration

Getter vraća normalizovani tier sa fallback-om na `starter`.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }
}
```

# Step: property-tier-setter

title: "JS: tier setter"
summary: Setter normalizuje i piše nazad u atribut.
intent: Source of truth ostaje na atributu.
tag: js:property-tier-setter
proTip: Source of truth ostaje na atributu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: property-tier-setter-scene

### Narration

Setter normalizuje i piše nazad u atribut.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }
}
```

# Step: property-price-monthly-getter

title: "JS: priceMonthly getter"
summary: Getter parsira mesečnu cenu u bezbedan broj.
intent: Nikad ne vraćamo NaN ili negativan broj korisniku.
tag: js:property-price-monthly-getter
proTip: Nikad ne vraćamo NaN ili negativan broj korisniku.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: property-price-monthly-getter-scene

### Narration

Getter parsira mesečnu cenu u bezbedan broj.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }
}
```

# Step: property-price-yearly-getter

title: "JS: priceYearly getter"
summary: Getter parsira godišnju cenu na isti način.
intent: Oba pricing getter-a koriste istu `parsePriceValue()` logiku.
tag: js:property-price-yearly-getter
proTip: Oba pricing getter-a koriste istu `parsePriceValue()` logiku.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: property-price-yearly-getter-scene

### Narration

Getter parsira godišnju cenu na isti način.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }
}
```

# Step: property-billing-getter

title: "JS: billing getter"
summary: Getter vraća `monthly` ili `yearly` — samo dve opcije.
intent: Binary state ne treba Set. Simple conditional je dovoljno.
tag: js:property-billing-getter
proTip: Binary state ne treba Set. Simple conditional je dovoljno.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: property-billing-getter-scene

### Narration

Getter vraća `monthly` ili `yearly` — samo dve opcije.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }
}
```

# Step: property-billing-setter

title: "JS: billing setter"
summary: Setter piše normalizovani billing nazad u atribut.
intent: Toggle menja atribut → attributeChangedCallback → updatePrice() + updateToggleState(). Jednosmerni tok.
tag: js:property-billing-setter
proTip: Toggle menja atribut → attributeChangedCallback → updatePrice() + updateToggleState(). Jednosmerni tok.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: property-billing-setter-scene

### Narration

Setter piše normalizovani billing nazad u atribut.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }
}
```

# Step: property-popular-getter

title: "JS: popular getter"
summary: Boolean getter čita hasAttribute.
intent: "Boolean atribut: prisutnost = true, odsustvo = false."
tag: js:property-popular-getter
proTip: "Boolean atribut: prisutnost = true, odsustvo = false."
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: property-popular-getter-scene

### Narration

Boolean getter čita hasAttribute.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }
}
```

# Step: property-cta-label-getter

title: "JS: ctaLabel getter"
summary: Getter vraća normalizovan CTA tekst sa fallback-om.
intent: Fallback osigurava da dugme nikad ne bude prazno.
tag: js:property-cta-label-getter
proTip: Fallback osigurava da dugme nikad ne bude prazno.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: property-cta-label-getter-scene

### Narration

Getter vraća normalizovan CTA tekst sa fallback-om.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }
}
```

# Step: setup-template-once

title: "JS: setupTemplateOnce()"
summary: Template mount za reusable kloniranje.
intent: Mount se dešava jednom. Reconnect ne remontira.
tag: js:setup-template-once
proTip: Mount se dešava jednom. Reconnect ne remontira.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: setup-template-once-scene

### Narration

Template mount za reusable kloniranje.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {}
}
```

# Step: setup-template-once-guard

title: "JS: guard sprečava dupliranje"
summary: Kloniramo template samo ako shadow root nema dece.
intent: Reconnect mora biti boring. Bez dupliranja DOM-a.
tag: js:setup-template-once-guard
proTip: Reconnect mora biti boring. Bez dupliranja DOM-a.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: setup-template-once-guard-scene

### Narration

Kloniramo template samo ako shadow root nema dece.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }
}
```

# Step: cache-dom

title: "JS: cacheDom — samo kešira reference"
summary: Querijemo šest internih elemenata i čuvamo na instanci.
intent: Cache znači pamti, ne gradi. Ime i ponašanje su usklađeni.
tag: js:cache-dom
proTip: Cache znači pamti, ne gradi. Ime i ponašanje su usklađeni.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: cache-dom-scene

### Narration

Querijemo šest internih elemenata i čuvamo na instanci.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {}
}
```

# Step: cache-dom-tier-name

title: "JS: cacheDom kešira .tier-name"
summary: Tier name span čuvamo za updateTierName.
intent: DOM query jednom, updates bez novog querySelector-a.
tag: js:cache-dom-tier-name
proTip: DOM query jednom, updates bez novog querySelector-a.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: cache-dom-tier-name-scene

### Narration

Tier name span čuvamo za updateTierName.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }
  }
}
```

# Step: cache-dom-price-amount

title: "JS: cacheDom kešira .price-amount"
summary: Price amount element čuvamo za dinamičko menjanje cene.
intent: Cena se menja na toggle klik — keš ubrzava taj update.
tag: js:cache-dom-price-amount
proTip: Cena se menja na toggle klik — keš ubrzava taj update.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: cache-dom-price-amount-scene

### Narration

Price amount element čuvamo za dinamičko menjanje cene.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }
  }
}
```

# Step: cache-dom-price-period

title: "JS: cacheDom kešira .price-period"
summary: Price period span čuvamo za dinamičko menjanje tekstualne labele (/mo ili /yr).
intent: Vizuelni tekst perioda mora pratiti iznos cene.
tag: js:cache-dom-price-period
proTip: Vizuelni tekst perioda mora pratiti iznos cene.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: cache-dom-price-period-scene

### Narration

Price period span čuvamo za dinamičko menjanje tekstualne labele (/mo ili /yr).

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }
  }
}
```

# Step: cache-dom-cta

title: "JS: cacheDom kešira .cta"
summary: CTA dugme čuvamo za tekst i event binding.
intent: "Jedno dugme, dva posla: tekst update i event listener."
tag: js:cache-dom-cta
proTip: "Jedno dugme, dva posla: tekst update i event listener."
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: cache-dom-cta-scene

### Narration

CTA dugme čuvamo za tekst i event binding.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }
  }
}
```

# Step: cache-dom-toggle

title: "JS: cacheDom kešira .toggle-switch"
summary: Toggle switch čuvamo za aria-checked i event.
intent: Toggle je interaktivni element sa sopstvenim listenerom.
tag: js:cache-dom-toggle
proTip: Toggle je interaktivni element sa sopstvenim listenerom.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: cache-dom-toggle-scene

### Narration

Toggle switch čuvamo za aria-checked i event.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }
  }
}
```

# Step: cache-dom-urgency

title: "JS: cacheDom kešira .urgency-text"
summary: Urgency text element čuvamo za timer update.
intent: Timer menja ovaj element svake sekunde — keš je obavezan.
tag: js:cache-dom-urgency
proTip: Timer menja ovaj element svake sekunde — keš je obavezan.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: cache-dom-urgency-scene

### Narration

Urgency text element čuvamo za timer update.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }
}
```

# Step: sync-from-attributes

title: "JS: syncFromAttributes()"
summary: Centralna one-time inicijalizacija DOM-a iz atributa.
intent: Četiri uske update metode inicijalizuju sve vidljive zone.
tag: js:sync-from-attributes
proTip: Četiri uske update metode inicijalizuju sve vidljive zone.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: sync-from-attributes-scene

### Narration

Centralna one-time inicijalizacija DOM-a iz atributa.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {}
}
```

# Step: sync-from-attributes-calls

title: "JS: sync poziva četiri update metode"
summary: Pozivamo `updateTierName()`, `updatePrice()`, `updateToggleState()` i `updateCtaLabel()`.
intent: Svaki poziv je uski i individualno testabilan.
tag: js:sync-from-attributes-calls
proTip: Svaki poziv je uski i individualno testabilan.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: sync-from-attributes-calls-scene

### Narration

Pozivamo `updateTierName()`, `updatePrice()`, `updateToggleState()` i `updateCtaLabel()`.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }
}
```

# Step: update-tier-name

title: "JS: updateTierName()"
summary: Piše display name tiera u naslov. `pro` → `Pro`.
intent: API slug i UI labela su razdvojeni mapom.
tag: js:update-tier-name
proTip: API slug i UI labela su razdvojeni mapom.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: update-tier-name-scene

### Narration

Piše display name tiera u naslov. `pro` → `Pro`.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }
}
```

# Step: update-price

title: "JS: updatePrice()"
summary: Čita `billing` da odluči monthly ili yearly cenu i piše broj u DOM.
intent: "Dinamički pricing: toggle kontroliše šta se prikazuje, update je automatski."
tag: js:update-price
proTip: "Dinamički pricing: toggle kontroliše šta se prikazuje, update je automatski."
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: update-price-scene

### Narration

Čita `billing` da odluči monthly ili yearly cenu i piše broj u DOM.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }
}
```

# Step: update-cta-label

title: "JS: updateCtaLabel()"
summary: Piše CTA tekst i postavlja aria-label sa tier kontekstom.
intent: Accessibility je deo istog update contract-a, ne naknadan fix.
tag: js:update-cta-label
proTip: Accessibility je deo istog update contract-a, ne naknadan fix.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: update-cta-label-scene

### Narration

Piše CTA tekst i postavlja aria-label sa tier kontekstom.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }

  updateCtaLabel() {
    if (!this.ctaElement) {
      return;
    }

    this.ctaElement.textContent = this.ctaLabel;
    this.ctaElement.setAttribute(
      'aria-label',
      `${this.ctaLabel}: ${tierDisplayName[this.tier] || 'Starter'} plan`
    );
  }
}
```

# Step: update-toggle-state

title: "JS: updateToggleState()"
summary: Ažurira `aria-checked` na toggle switch-u prema billing stanju.
intent: Vizuelni toggle se oslanja na CSS :host([billing]) — JS samo drži ARIA u sinhronu.
tag: js:update-toggle-state
proTip: Vizuelni toggle se oslanja na CSS :host([billing]) — JS samo drži ARIA u sinhronu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: update-toggle-state-scene

### Narration

Ažurira `aria-checked` na toggle switch-u prema billing stanju.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }

  updateCtaLabel() {
    if (!this.ctaElement) {
      return;
    }

    this.ctaElement.textContent = this.ctaLabel;
    this.ctaElement.setAttribute(
      'aria-label',
      `${this.ctaLabel}: ${tierDisplayName[this.tier] || 'Starter'} plan`
    );
  }

  updateToggleState() {
    if (!this.toggleSwitchElement) {
      return;
    }

    const isYearly = this.isYearlyBilling;
    this.toggleSwitchElement.setAttribute('aria-checked', String(isYearly));
    this.toggleSwitchElement.setAttribute(
      'aria-label',
      isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'
    );
  }
}
```

# Step: start-urgency-timer

title: "JS: startUrgencyTimer()"
summary: Pokreće setInterval koji svake sekunde smanjuje urgencyRemaining i ažurira prikaz.
intent: "Timer je lifecycle-aware: živi koliko i komponenta u DOM-u."
tag: js:start-urgency-timer
proTip: "Timer je lifecycle-aware: živi koliko i komponenta u DOM-u."
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: start-urgency-timer-scene

### Narration

Pokreće setInterval koji svake sekunde smanjuje urgencyRemaining i ažurira prikaz.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }

  updateCtaLabel() {
    if (!this.ctaElement) {
      return;
    }

    this.ctaElement.textContent = this.ctaLabel;
    this.ctaElement.setAttribute(
      'aria-label',
      `${this.ctaLabel}: ${tierDisplayName[this.tier] || 'Starter'} plan`
    );
  }

  updateToggleState() {
    if (!this.toggleSwitchElement) {
      return;
    }

    const isYearly = this.isYearlyBilling;
    this.toggleSwitchElement.setAttribute('aria-checked', String(isYearly));
    this.toggleSwitchElement.setAttribute(
      'aria-label',
      isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'
    );
  }

  startUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      return;
    }

    this.updateUrgencyDisplay();

    this.urgencyTimerId = setInterval(() => {
      if (this.urgencyRemaining <= 0) {
        this.stopUrgencyTimer();
        return;
      }

      this.urgencyRemaining -= 1;
      this.updateUrgencyDisplay();
    }, 1000);
  }
}
```

# Step: stop-urgency-timer

title: "JS: stopUrgencyTimer()"
summary: Čisti interval i postavlja ID na null.
intent: Lifecycle cleanup sprečava memory leak i ghost updates.
tag: js:stop-urgency-timer
proTip: Lifecycle cleanup sprečava memory leak i ghost updates.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: stop-urgency-timer-scene

### Narration

Čisti interval i postavlja ID na null.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }

  updateCtaLabel() {
    if (!this.ctaElement) {
      return;
    }

    this.ctaElement.textContent = this.ctaLabel;
    this.ctaElement.setAttribute(
      'aria-label',
      `${this.ctaLabel}: ${tierDisplayName[this.tier] || 'Starter'} plan`
    );
  }

  updateToggleState() {
    if (!this.toggleSwitchElement) {
      return;
    }

    const isYearly = this.isYearlyBilling;
    this.toggleSwitchElement.setAttribute('aria-checked', String(isYearly));
    this.toggleSwitchElement.setAttribute(
      'aria-label',
      isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'
    );
  }

  startUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      return;
    }

    this.updateUrgencyDisplay();

    this.urgencyTimerId = setInterval(() => {
      if (this.urgencyRemaining <= 0) {
        this.stopUrgencyTimer();
        return;
      }

      this.urgencyRemaining -= 1;
      this.updateUrgencyDisplay();
    }, 1000);
  }

  stopUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      clearInterval(this.urgencyTimerId);
      this.urgencyTimerId = null;
    }
  }
}
```

# Step: update-urgency-display

title: "JS: updateUrgencyDisplay()"
summary: Formatira preostalo vreme u `HH:MM:SS` i piše u urgency-text element.
intent: Display helper je odvojen od timer logike — jednostavno za test i zamenu formata.
tag: js:update-urgency-display
proTip: Display helper je odvojen od timer logike — jednostavno za test i zamenu formata.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: update-urgency-display-scene

### Narration

Formatira preostalo vreme u `HH:MM:SS` i piše u urgency-text element.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }

  updateCtaLabel() {
    if (!this.ctaElement) {
      return;
    }

    this.ctaElement.textContent = this.ctaLabel;
    this.ctaElement.setAttribute(
      'aria-label',
      `${this.ctaLabel}: ${tierDisplayName[this.tier] || 'Starter'} plan`
    );
  }

  updateToggleState() {
    if (!this.toggleSwitchElement) {
      return;
    }

    const isYearly = this.isYearlyBilling;
    this.toggleSwitchElement.setAttribute('aria-checked', String(isYearly));
    this.toggleSwitchElement.setAttribute(
      'aria-label',
      isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'
    );
  }

  startUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      return;
    }

    this.updateUrgencyDisplay();

    this.urgencyTimerId = setInterval(() => {
      if (this.urgencyRemaining <= 0) {
        this.stopUrgencyTimer();
        return;
      }

      this.urgencyRemaining -= 1;
      this.updateUrgencyDisplay();
    }, 1000);
  }

  stopUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      clearInterval(this.urgencyTimerId);
      this.urgencyTimerId = null;
    }
  }

  updateUrgencyDisplay() {
    if (!this.urgencyTextElement) {
      return;
    }

    this.urgencyTextElement.textContent = `Offer ends in ${formatTimeRemaining(this.urgencyRemaining)}`;
  }
}
```

# Step: bind-events

title: "JS: bindEvents()"
summary: Event wiring ostaje u sopstvenoj responsibility metodi.
intent: Bind i unbind su uvek u paru.
tag: js:bind-events
proTip: Bind i unbind su uvek u paru.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: bind-events-scene

### Narration

Event wiring ostaje u sopstvenoj responsibility metodi.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }

  updateCtaLabel() {
    if (!this.ctaElement) {
      return;
    }

    this.ctaElement.textContent = this.ctaLabel;
    this.ctaElement.setAttribute(
      'aria-label',
      `${this.ctaLabel}: ${tierDisplayName[this.tier] || 'Starter'} plan`
    );
  }

  updateToggleState() {
    if (!this.toggleSwitchElement) {
      return;
    }

    const isYearly = this.isYearlyBilling;
    this.toggleSwitchElement.setAttribute('aria-checked', String(isYearly));
    this.toggleSwitchElement.setAttribute(
      'aria-label',
      isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'
    );
  }

  startUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      return;
    }

    this.updateUrgencyDisplay();

    this.urgencyTimerId = setInterval(() => {
      if (this.urgencyRemaining <= 0) {
        this.stopUrgencyTimer();
        return;
      }

      this.urgencyRemaining -= 1;
      this.updateUrgencyDisplay();
    }, 1000);
  }

  stopUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      clearInterval(this.urgencyTimerId);
      this.urgencyTimerId = null;
    }
  }

  updateUrgencyDisplay() {
    if (!this.urgencyTextElement) {
      return;
    }

    this.urgencyTextElement.textContent = `Offer ends in ${formatTimeRemaining(this.urgencyRemaining)}`;
  }

  bindEvents() {}
}
```

# Step: bind-cta-event

title: "JS: bindEvents kači CTA listener"
summary: Guard sprečava dvostruki binding. CTA click emituje subscribe event.
intent: Jedan listener, jedan flag, jedan cleanup.
tag: js:bind-cta-event
proTip: Jedan listener, jedan flag, jedan cleanup.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: bind-cta-event-scene

### Narration

Guard sprečava dvostruki binding. CTA click emituje subscribe event.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }

  updateCtaLabel() {
    if (!this.ctaElement) {
      return;
    }

    this.ctaElement.textContent = this.ctaLabel;
    this.ctaElement.setAttribute(
      'aria-label',
      `${this.ctaLabel}: ${tierDisplayName[this.tier] || 'Starter'} plan`
    );
  }

  updateToggleState() {
    if (!this.toggleSwitchElement) {
      return;
    }

    const isYearly = this.isYearlyBilling;
    this.toggleSwitchElement.setAttribute('aria-checked', String(isYearly));
    this.toggleSwitchElement.setAttribute(
      'aria-label',
      isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'
    );
  }

  startUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      return;
    }

    this.updateUrgencyDisplay();

    this.urgencyTimerId = setInterval(() => {
      if (this.urgencyRemaining <= 0) {
        this.stopUrgencyTimer();
        return;
      }

      this.urgencyRemaining -= 1;
      this.updateUrgencyDisplay();
    }, 1000);
  }

  stopUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      clearInterval(this.urgencyTimerId);
      this.urgencyTimerId = null;
    }
  }

  updateUrgencyDisplay() {
    if (!this.urgencyTextElement) {
      return;
    }

    this.urgencyTextElement.textContent = `Offer ends in ${formatTimeRemaining(this.urgencyRemaining)}`;
  }

  bindEvents() {
    if (this.ctaElement && !this.isCtaBound) {
      this.ctaElement.addEventListener('click', this.handleCtaClick);
      this.isCtaBound = true;
    }
  }
}
```

# Step: bind-toggle-event

title: "JS: bindEvents kači toggle listener"
summary: Toggle click menja billing atribut. Guard sprečava dvostruki binding.
intent: Toggle je interni UI, ali njegov efekat se propagira kroz attribute pipeline.
tag: js:bind-toggle-event
proTip: Toggle je interni UI, ali njegov efekat se propagira kroz attribute pipeline.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: bind-toggle-event-scene

### Narration

Toggle click menja billing atribut. Guard sprečava dvostruki binding.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }

  updateCtaLabel() {
    if (!this.ctaElement) {
      return;
    }

    this.ctaElement.textContent = this.ctaLabel;
    this.ctaElement.setAttribute(
      'aria-label',
      `${this.ctaLabel}: ${tierDisplayName[this.tier] || 'Starter'} plan`
    );
  }

  updateToggleState() {
    if (!this.toggleSwitchElement) {
      return;
    }

    const isYearly = this.isYearlyBilling;
    this.toggleSwitchElement.setAttribute('aria-checked', String(isYearly));
    this.toggleSwitchElement.setAttribute(
      'aria-label',
      isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'
    );
  }

  startUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      return;
    }

    this.updateUrgencyDisplay();

    this.urgencyTimerId = setInterval(() => {
      if (this.urgencyRemaining <= 0) {
        this.stopUrgencyTimer();
        return;
      }

      this.urgencyRemaining -= 1;
      this.updateUrgencyDisplay();
    }, 1000);
  }

  stopUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      clearInterval(this.urgencyTimerId);
      this.urgencyTimerId = null;
    }
  }

  updateUrgencyDisplay() {
    if (!this.urgencyTextElement) {
      return;
    }

    this.urgencyTextElement.textContent = `Offer ends in ${formatTimeRemaining(this.urgencyRemaining)}`;
  }

  bindEvents() {
    if (this.ctaElement && !this.isCtaBound) {
      this.ctaElement.addEventListener('click', this.handleCtaClick);
      this.isCtaBound = true;
    }

    if (this.toggleSwitchElement && !this.isToggleBound) {
      this.toggleSwitchElement.addEventListener('click', this.handleToggleClick);
      this.isToggleBound = true;
    }
  }
}
```

# Step: unbind-events

title: "JS: unbindEvents()"
summary: Cleanup metoda za oba listenera.
intent: Svaki bind ima svoj unbind par.
tag: js:unbind-events
proTip: Svaki bind ima svoj unbind par.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: unbind-events-scene

### Narration

Cleanup metoda za oba listenera.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }

  updateCtaLabel() {
    if (!this.ctaElement) {
      return;
    }

    this.ctaElement.textContent = this.ctaLabel;
    this.ctaElement.setAttribute(
      'aria-label',
      `${this.ctaLabel}: ${tierDisplayName[this.tier] || 'Starter'} plan`
    );
  }

  updateToggleState() {
    if (!this.toggleSwitchElement) {
      return;
    }

    const isYearly = this.isYearlyBilling;
    this.toggleSwitchElement.setAttribute('aria-checked', String(isYearly));
    this.toggleSwitchElement.setAttribute(
      'aria-label',
      isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'
    );
  }

  startUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      return;
    }

    this.updateUrgencyDisplay();

    this.urgencyTimerId = setInterval(() => {
      if (this.urgencyRemaining <= 0) {
        this.stopUrgencyTimer();
        return;
      }

      this.urgencyRemaining -= 1;
      this.updateUrgencyDisplay();
    }, 1000);
  }

  stopUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      clearInterval(this.urgencyTimerId);
      this.urgencyTimerId = null;
    }
  }

  updateUrgencyDisplay() {
    if (!this.urgencyTextElement) {
      return;
    }

    this.urgencyTextElement.textContent = `Offer ends in ${formatTimeRemaining(this.urgencyRemaining)}`;
  }

  bindEvents() {
    if (this.ctaElement && !this.isCtaBound) {
      this.ctaElement.addEventListener('click', this.handleCtaClick);
      this.isCtaBound = true;
    }

    if (this.toggleSwitchElement && !this.isToggleBound) {
      this.toggleSwitchElement.addEventListener('click', this.handleToggleClick);
      this.isToggleBound = true;
    }
  }

  unbindEvents() {}
}
```

# Step: unbind-cta-event

title: "JS: unbindEvents skida CTA listener"
summary: Proveri flag pre skidanja — izbjagava grešku na disconnect bez prethodnog bind-a.
intent: Defensive coding za lifecycle edge case-ove.
tag: js:unbind-cta-event
proTip: Defensive coding za lifecycle edge case-ove.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: unbind-cta-event-scene

### Narration

Proveri flag pre skidanja — izbjagava grešku na disconnect bez prethodnog bind-a.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }

  updateCtaLabel() {
    if (!this.ctaElement) {
      return;
    }

    this.ctaElement.textContent = this.ctaLabel;
    this.ctaElement.setAttribute(
      'aria-label',
      `${this.ctaLabel}: ${tierDisplayName[this.tier] || 'Starter'} plan`
    );
  }

  updateToggleState() {
    if (!this.toggleSwitchElement) {
      return;
    }

    const isYearly = this.isYearlyBilling;
    this.toggleSwitchElement.setAttribute('aria-checked', String(isYearly));
    this.toggleSwitchElement.setAttribute(
      'aria-label',
      isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'
    );
  }

  startUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      return;
    }

    this.updateUrgencyDisplay();

    this.urgencyTimerId = setInterval(() => {
      if (this.urgencyRemaining <= 0) {
        this.stopUrgencyTimer();
        return;
      }

      this.urgencyRemaining -= 1;
      this.updateUrgencyDisplay();
    }, 1000);
  }

  stopUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      clearInterval(this.urgencyTimerId);
      this.urgencyTimerId = null;
    }
  }

  updateUrgencyDisplay() {
    if (!this.urgencyTextElement) {
      return;
    }

    this.urgencyTextElement.textContent = `Offer ends in ${formatTimeRemaining(this.urgencyRemaining)}`;
  }

  bindEvents() {
    if (this.ctaElement && !this.isCtaBound) {
      this.ctaElement.addEventListener('click', this.handleCtaClick);
      this.isCtaBound = true;
    }

    if (this.toggleSwitchElement && !this.isToggleBound) {
      this.toggleSwitchElement.addEventListener('click', this.handleToggleClick);
      this.isToggleBound = true;
    }
  }

  unbindEvents() {
    if (this.ctaElement && this.isCtaBound) {
      this.ctaElement.removeEventListener('click', this.handleCtaClick);
      this.isCtaBound = false;
    }
  }
}
```

# Step: unbind-toggle-event

title: "JS: unbindEvents skida toggle listener"
summary: "Isti pattern: flag check, remove, reset."
intent: Dva listenera, dva cleanup-a, isti model.
tag: js:unbind-toggle-event
proTip: Dva listenera, dva cleanup-a, isti model.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: unbind-toggle-event-scene

### Narration

Isti pattern: flag check, remove, reset.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }

  updateCtaLabel() {
    if (!this.ctaElement) {
      return;
    }

    this.ctaElement.textContent = this.ctaLabel;
    this.ctaElement.setAttribute(
      'aria-label',
      `${this.ctaLabel}: ${tierDisplayName[this.tier] || 'Starter'} plan`
    );
  }

  updateToggleState() {
    if (!this.toggleSwitchElement) {
      return;
    }

    const isYearly = this.isYearlyBilling;
    this.toggleSwitchElement.setAttribute('aria-checked', String(isYearly));
    this.toggleSwitchElement.setAttribute(
      'aria-label',
      isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'
    );
  }

  startUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      return;
    }

    this.updateUrgencyDisplay();

    this.urgencyTimerId = setInterval(() => {
      if (this.urgencyRemaining <= 0) {
        this.stopUrgencyTimer();
        return;
      }

      this.urgencyRemaining -= 1;
      this.updateUrgencyDisplay();
    }, 1000);
  }

  stopUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      clearInterval(this.urgencyTimerId);
      this.urgencyTimerId = null;
    }
  }

  updateUrgencyDisplay() {
    if (!this.urgencyTextElement) {
      return;
    }

    this.urgencyTextElement.textContent = `Offer ends in ${formatTimeRemaining(this.urgencyRemaining)}`;
  }

  bindEvents() {
    if (this.ctaElement && !this.isCtaBound) {
      this.ctaElement.addEventListener('click', this.handleCtaClick);
      this.isCtaBound = true;
    }

    if (this.toggleSwitchElement && !this.isToggleBound) {
      this.toggleSwitchElement.addEventListener('click', this.handleToggleClick);
      this.isToggleBound = true;
    }
  }

  unbindEvents() {
    if (this.ctaElement && this.isCtaBound) {
      this.ctaElement.removeEventListener('click', this.handleCtaClick);
      this.isCtaBound = false;
    }

    if (this.toggleSwitchElement && this.isToggleBound) {
      this.toggleSwitchElement.removeEventListener('click', this.handleToggleClick);
      this.isToggleBound = false;
    }
  }
}
```

# Step: handle-cta-click

title: "JS: handleCtaClick()"
summary: CTA handler emituje namespaced event.
intent: "Handler je mali: samo emituj signal sa payload-om."
tag: js:handle-cta-click
proTip: "Handler je mali: samo emituj signal sa payload-om."
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: handle-cta-click-scene

### Narration

CTA handler emituje namespaced event.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }

  updateCtaLabel() {
    if (!this.ctaElement) {
      return;
    }

    this.ctaElement.textContent = this.ctaLabel;
    this.ctaElement.setAttribute(
      'aria-label',
      `${this.ctaLabel}: ${tierDisplayName[this.tier] || 'Starter'} plan`
    );
  }

  updateToggleState() {
    if (!this.toggleSwitchElement) {
      return;
    }

    const isYearly = this.isYearlyBilling;
    this.toggleSwitchElement.setAttribute('aria-checked', String(isYearly));
    this.toggleSwitchElement.setAttribute(
      'aria-label',
      isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'
    );
  }

  startUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      return;
    }

    this.updateUrgencyDisplay();

    this.urgencyTimerId = setInterval(() => {
      if (this.urgencyRemaining <= 0) {
        this.stopUrgencyTimer();
        return;
      }

      this.urgencyRemaining -= 1;
      this.updateUrgencyDisplay();
    }, 1000);
  }

  stopUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      clearInterval(this.urgencyTimerId);
      this.urgencyTimerId = null;
    }
  }

  updateUrgencyDisplay() {
    if (!this.urgencyTextElement) {
      return;
    }

    this.urgencyTextElement.textContent = `Offer ends in ${formatTimeRemaining(this.urgencyRemaining)}`;
  }

  bindEvents() {
    if (this.ctaElement && !this.isCtaBound) {
      this.ctaElement.addEventListener('click', this.handleCtaClick);
      this.isCtaBound = true;
    }

    if (this.toggleSwitchElement && !this.isToggleBound) {
      this.toggleSwitchElement.addEventListener('click', this.handleToggleClick);
      this.isToggleBound = true;
    }
  }

  unbindEvents() {
    if (this.ctaElement && this.isCtaBound) {
      this.ctaElement.removeEventListener('click', this.handleCtaClick);
      this.isCtaBound = false;
    }

    if (this.toggleSwitchElement && this.isToggleBound) {
      this.toggleSwitchElement.removeEventListener('click', this.handleToggleClick);
      this.isToggleBound = false;
    }
  }

  handleCtaClick() {}
}
```

# Step: handle-cta-click-event

title: "JS: ui-pricing-card:subscribe event"
summary: Emitujemo `ui-pricing-card:subscribe` sa `{tier, price, billing, ctaLabel, source}` detail-om.
intent: Event contract je javni API. Parent ga sluša i odlučuje o checkout flow-u.
tag: js:handle-cta-click-event
proTip: Event contract je javni API. Parent ga sluša i odlučuje o checkout flow-u.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: handle-cta-click-event-scene

### Narration

Emitujemo `ui-pricing-card:subscribe` sa `{tier, price, billing, ctaLabel, source}` detail-om.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }

  updateCtaLabel() {
    if (!this.ctaElement) {
      return;
    }

    this.ctaElement.textContent = this.ctaLabel;
    this.ctaElement.setAttribute(
      'aria-label',
      `${this.ctaLabel}: ${tierDisplayName[this.tier] || 'Starter'} plan`
    );
  }

  updateToggleState() {
    if (!this.toggleSwitchElement) {
      return;
    }

    const isYearly = this.isYearlyBilling;
    this.toggleSwitchElement.setAttribute('aria-checked', String(isYearly));
    this.toggleSwitchElement.setAttribute(
      'aria-label',
      isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'
    );
  }

  startUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      return;
    }

    this.updateUrgencyDisplay();

    this.urgencyTimerId = setInterval(() => {
      if (this.urgencyRemaining <= 0) {
        this.stopUrgencyTimer();
        return;
      }

      this.urgencyRemaining -= 1;
      this.updateUrgencyDisplay();
    }, 1000);
  }

  stopUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      clearInterval(this.urgencyTimerId);
      this.urgencyTimerId = null;
    }
  }

  updateUrgencyDisplay() {
    if (!this.urgencyTextElement) {
      return;
    }

    this.urgencyTextElement.textContent = `Offer ends in ${formatTimeRemaining(this.urgencyRemaining)}`;
  }

  bindEvents() {
    if (this.ctaElement && !this.isCtaBound) {
      this.ctaElement.addEventListener('click', this.handleCtaClick);
      this.isCtaBound = true;
    }

    if (this.toggleSwitchElement && !this.isToggleBound) {
      this.toggleSwitchElement.addEventListener('click', this.handleToggleClick);
      this.isToggleBound = true;
    }
  }

  unbindEvents() {
    if (this.ctaElement && this.isCtaBound) {
      this.ctaElement.removeEventListener('click', this.handleCtaClick);
      this.isCtaBound = false;
    }

    if (this.toggleSwitchElement && this.isToggleBound) {
      this.toggleSwitchElement.removeEventListener('click', this.handleToggleClick);
      this.isToggleBound = false;
    }
  }

  handleCtaClick() {
    this.dispatchEvent(
      new CustomEvent('ui-pricing-card:subscribe', {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: {
          tier: this.tier,
          price: this.currentPrice,
          billing: this.billing,
          ctaLabel: this.ctaLabel,
          source: 'ui-pricing-card',
        },
      })
    );
  }
}
```

# Step: handle-toggle-click

title: "JS: handleToggleClick() — billing toggle"
summary: Klik na toggle menja billing sa monthly na yearly (ili obrnuto). Setter upisuje atribut → attributeChangedCallback → updatePrice + updateToggleState.
intent: "Jednosmerni tok: klik → setter → atribut → callback → DOM update. Nema shortcut-a."
tag: js:handle-toggle-click
proTip: "Jednosmerni tok: klik → setter → atribut → callback → DOM update. Nema shortcut-a."
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: handle-toggle-click-scene

### Narration

Klik na toggle menja billing sa monthly na yearly (ili obrnuto). Setter upisuje atribut → attributeChangedCallback → updatePrice + updateToggleState.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }

  updateCtaLabel() {
    if (!this.ctaElement) {
      return;
    }

    this.ctaElement.textContent = this.ctaLabel;
    this.ctaElement.setAttribute(
      'aria-label',
      `${this.ctaLabel}: ${tierDisplayName[this.tier] || 'Starter'} plan`
    );
  }

  updateToggleState() {
    if (!this.toggleSwitchElement) {
      return;
    }

    const isYearly = this.isYearlyBilling;
    this.toggleSwitchElement.setAttribute('aria-checked', String(isYearly));
    this.toggleSwitchElement.setAttribute(
      'aria-label',
      isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'
    );
  }

  startUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      return;
    }

    this.updateUrgencyDisplay();

    this.urgencyTimerId = setInterval(() => {
      if (this.urgencyRemaining <= 0) {
        this.stopUrgencyTimer();
        return;
      }

      this.urgencyRemaining -= 1;
      this.updateUrgencyDisplay();
    }, 1000);
  }

  stopUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      clearInterval(this.urgencyTimerId);
      this.urgencyTimerId = null;
    }
  }

  updateUrgencyDisplay() {
    if (!this.urgencyTextElement) {
      return;
    }

    this.urgencyTextElement.textContent = `Offer ends in ${formatTimeRemaining(this.urgencyRemaining)}`;
  }

  bindEvents() {
    if (this.ctaElement && !this.isCtaBound) {
      this.ctaElement.addEventListener('click', this.handleCtaClick);
      this.isCtaBound = true;
    }

    if (this.toggleSwitchElement && !this.isToggleBound) {
      this.toggleSwitchElement.addEventListener('click', this.handleToggleClick);
      this.isToggleBound = true;
    }
  }

  unbindEvents() {
    if (this.ctaElement && this.isCtaBound) {
      this.ctaElement.removeEventListener('click', this.handleCtaClick);
      this.isCtaBound = false;
    }

    if (this.toggleSwitchElement && this.isToggleBound) {
      this.toggleSwitchElement.removeEventListener('click', this.handleToggleClick);
      this.isToggleBound = false;
    }
  }

  handleCtaClick() {
    this.dispatchEvent(
      new CustomEvent('ui-pricing-card:subscribe', {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: {
          tier: this.tier,
          price: this.currentPrice,
          billing: this.billing,
          ctaLabel: this.ctaLabel,
          source: 'ui-pricing-card',
        },
      })
    );
  }

  handleToggleClick() {
    this.billing = this.billing === 'yearly' ? 'monthly' : 'yearly';
  }
}
```

# Step: define-guard

title: "JS: guard pre registracije"
summary: Proveravamo da li je element već registrovan.
intent: Hot reload i SSR ne smeju da bacaju grešku.
tag: js:define-guard
proTip: Hot reload i SSR ne smeju da bacaju grešku.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: define-guard-scene

### Narration

Proveravamo da li je element već registrovan.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }

  updateCtaLabel() {
    if (!this.ctaElement) {
      return;
    }

    this.ctaElement.textContent = this.ctaLabel;
    this.ctaElement.setAttribute(
      'aria-label',
      `${this.ctaLabel}: ${tierDisplayName[this.tier] || 'Starter'} plan`
    );
  }

  updateToggleState() {
    if (!this.toggleSwitchElement) {
      return;
    }

    const isYearly = this.isYearlyBilling;
    this.toggleSwitchElement.setAttribute('aria-checked', String(isYearly));
    this.toggleSwitchElement.setAttribute(
      'aria-label',
      isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'
    );
  }

  startUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      return;
    }

    this.updateUrgencyDisplay();

    this.urgencyTimerId = setInterval(() => {
      if (this.urgencyRemaining <= 0) {
        this.stopUrgencyTimer();
        return;
      }

      this.urgencyRemaining -= 1;
      this.updateUrgencyDisplay();
    }, 1000);
  }

  stopUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      clearInterval(this.urgencyTimerId);
      this.urgencyTimerId = null;
    }
  }

  updateUrgencyDisplay() {
    if (!this.urgencyTextElement) {
      return;
    }

    this.urgencyTextElement.textContent = `Offer ends in ${formatTimeRemaining(this.urgencyRemaining)}`;
  }

  bindEvents() {
    if (this.ctaElement && !this.isCtaBound) {
      this.ctaElement.addEventListener('click', this.handleCtaClick);
      this.isCtaBound = true;
    }

    if (this.toggleSwitchElement && !this.isToggleBound) {
      this.toggleSwitchElement.addEventListener('click', this.handleToggleClick);
      this.isToggleBound = true;
    }
  }

  unbindEvents() {
    if (this.ctaElement && this.isCtaBound) {
      this.ctaElement.removeEventListener('click', this.handleCtaClick);
      this.isCtaBound = false;
    }

    if (this.toggleSwitchElement && this.isToggleBound) {
      this.toggleSwitchElement.removeEventListener('click', this.handleToggleClick);
      this.isToggleBound = false;
    }
  }

  handleCtaClick() {
    this.dispatchEvent(
      new CustomEvent('ui-pricing-card:subscribe', {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: {
          tier: this.tier,
          price: this.currentPrice,
          billing: this.billing,
          ctaLabel: this.ctaLabel,
          source: 'ui-pricing-card',
        },
      })
    );
  }

  handleToggleClick() {
    this.billing = this.billing === 'yearly' ? 'monthly' : 'yearly';
  }
}

if (!customElements.get('ui-pricing-card')) {
}
```

# Step: define-element

title: "JS: registrujemo ui-pricing-card"
summary: '`customElements.define("ui-pricing-card", UiPricingCard)` — pricing kartica je spremna.'
intent: Od ovog momenta svaki `<ui-pricing-card>` u DOM-u dobija pun lifecycle, billing toggle i urgency timer.
tag: js:define-element
proTip: Od ovog momenta svaki `<ui-pricing-card>` u DOM-u dobija pun lifecycle, billing toggle i urgency timer.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: define-element-scene

### Narration

`customElements.define("ui-pricing-card", UiPricingCard)` — pricing kartica je spremna.

### Show Code: js

```js
import { uiPricingCardTemplate } from './ui-pricing-card.template.js';

function normalizeTextValue(value, fallback) {
  return String(value ?? '').trim() || fallback;
}

const allowedTiers = new Set(['starter', 'pro', 'enterprise']);

function normalizeTierValue(value) {
  const v = String(value ?? '')
    .trim()
    .toLowerCase();
  return allowedTiers.has(v) ? v : 'starter';
}

function parsePriceValue(value) {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatTimeRemaining(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const tierDisplayName = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

class UiPricingCard extends HTMLElement {
  static observedAttributes = [
    'tier',
    'price-monthly',
    'price-yearly',
    'billing',
    'popular', // CSS-only reactive attribute
    'cta-label',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleCtaClick = this.handleCtaClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.tierNameElement = null;
    this.priceAmountElement = null;
    this.pricePeriodElement = null;
    this.ctaElement = null;
    this.toggleSwitchElement = null;
    this.urgencyTextElement = null;
    this.isCtaBound = false;
    this.isToggleBound = false;
    this.urgencyTimerId = null;
    this.urgencyRemaining = 3600;
  }

  connectedCallback() {
    this.setupTemplateOnce();
    this.cacheDom();
    this.syncFromAttributes();
    this.bindEvents();
    this.startUrgencyTimer();
  }

  disconnectedCallback() {
    this.unbindEvents();
    this.stopUrgencyTimer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return;
    }

    switch (name) {
      case 'tier':
        // visual title + CTA accessibility text both depend on tier
        this.updateTierName();
        this.updateCtaLabel();
        break;
      case 'price-monthly':
      case 'price-yearly':
      case 'billing':
        // price amount, price period, and switch state depend on billing
        this.updatePrice();
        this.updateToggleState();
        break;
      case 'cta-label':
        this.updateCtaLabel();
        break;
      case 'popular':
        // CSS-only reactive attribute, no JS update needed
        break;
      default:
        break;
    }
  }

  get tier() {
    return normalizeTierValue(this.getAttribute('tier'));
  }

  set tier(value) {
    this.setAttribute('tier', normalizeTierValue(value));
  }

  get priceMonthly() {
    return parsePriceValue(this.getAttribute('price-monthly'));
  }

  get priceYearly() {
    return parsePriceValue(this.getAttribute('price-yearly'));
  }

  get billing() {
    const v = String(this.getAttribute('billing') ?? '')
      .trim()
      .toLowerCase();
    return v === 'yearly' ? 'yearly' : 'monthly';
  }

  set billing(value) {
    this.setAttribute('billing', value === 'yearly' ? 'yearly' : 'monthly');
  }

  get popular() {
    return this.hasAttribute('popular');
  }

  get ctaLabel() {
    return normalizeTextValue(this.getAttribute('cta-label'), 'Get started');
  }

  setupTemplateOnce() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(uiPricingCardTemplate.content.cloneNode(true));
    }
  }

  cacheDom() {
    if (!this.tierNameElement) {
      this.tierNameElement = this.shadowRoot.querySelector('.tier-name');
    }

    if (!this.priceAmountElement) {
      this.priceAmountElement = this.shadowRoot.querySelector('.price-amount');
    }

    if (!this.pricePeriodElement) {
      this.pricePeriodElement = this.shadowRoot.querySelector('.price-period');
    }

    if (!this.ctaElement) {
      this.ctaElement = this.shadowRoot.querySelector('.cta');
    }

    if (!this.toggleSwitchElement) {
      this.toggleSwitchElement = this.shadowRoot.querySelector('.toggle-switch');
    }

    if (!this.urgencyTextElement) {
      this.urgencyTextElement = this.shadowRoot.querySelector('.urgency-text');
    }
  }

  syncFromAttributes() {
    this.updateTierName();
    this.updatePrice();
    this.updateToggleState();
    this.updateCtaLabel();
  }

  updateTierName() {
    if (!this.tierNameElement) {
      return;
    }

    this.tierNameElement.textContent = tierDisplayName[this.tier] || 'Starter';
  }

  updatePrice() {
    if (!this.priceAmountElement || !this.pricePeriodElement) {
      return;
    }

    this.priceAmountElement.textContent = this.currentPrice;
    this.pricePeriodElement.textContent = this.currentPricePeriodLabel;
  }

  updateCtaLabel() {
    if (!this.ctaElement) {
      return;
    }

    this.ctaElement.textContent = this.ctaLabel;
    this.ctaElement.setAttribute(
      'aria-label',
      `${this.ctaLabel}: ${tierDisplayName[this.tier] || 'Starter'} plan`
    );
  }

  updateToggleState() {
    if (!this.toggleSwitchElement) {
      return;
    }

    const isYearly = this.isYearlyBilling;
    this.toggleSwitchElement.setAttribute('aria-checked', String(isYearly));
    this.toggleSwitchElement.setAttribute(
      'aria-label',
      isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'
    );
  }

  startUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      return;
    }

    this.updateUrgencyDisplay();

    this.urgencyTimerId = setInterval(() => {
      if (this.urgencyRemaining <= 0) {
        this.stopUrgencyTimer();
        return;
      }

      this.urgencyRemaining -= 1;
      this.updateUrgencyDisplay();
    }, 1000);
  }

  stopUrgencyTimer() {
    if (this.urgencyTimerId !== null) {
      clearInterval(this.urgencyTimerId);
      this.urgencyTimerId = null;
    }
  }

  updateUrgencyDisplay() {
    if (!this.urgencyTextElement) {
      return;
    }

    this.urgencyTextElement.textContent = `Offer ends in ${formatTimeRemaining(this.urgencyRemaining)}`;
  }

  bindEvents() {
    if (this.ctaElement && !this.isCtaBound) {
      this.ctaElement.addEventListener('click', this.handleCtaClick);
      this.isCtaBound = true;
    }

    if (this.toggleSwitchElement && !this.isToggleBound) {
      this.toggleSwitchElement.addEventListener('click', this.handleToggleClick);
      this.isToggleBound = true;
    }
  }

  unbindEvents() {
    if (this.ctaElement && this.isCtaBound) {
      this.ctaElement.removeEventListener('click', this.handleCtaClick);
      this.isCtaBound = false;
    }

    if (this.toggleSwitchElement && this.isToggleBound) {
      this.toggleSwitchElement.removeEventListener('click', this.handleToggleClick);
      this.isToggleBound = false;
    }
  }

  handleCtaClick() {
    this.dispatchEvent(
      new CustomEvent('ui-pricing-card:subscribe', {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: {
          tier: this.tier,
          price: this.currentPrice,
          billing: this.billing,
          ctaLabel: this.ctaLabel,
          source: 'ui-pricing-card',
        },
      })
    );
  }

  handleToggleClick() {
    this.billing = this.billing === 'yearly' ? 'monthly' : 'yearly';
  }
}

if (!customElements.get('ui-pricing-card')) {
  customElements.define('ui-pricing-card', UiPricingCard);
}
```

# Step: shell-outline

title: "CSS: .app-shell / outline"
summary: Dodajemo tanak helper outline za `.app-shell` i držimo ga do završnog shell rezimea.
intent: App shell ostaje neutralna pozornica za SaaS pricing demo.
tag: css:shell-outline
proTip: App shell ostaje neutralna pozornica za SaaS pricing demo.
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

ui-pricing-card {
}
```

# Step: shell-padding

title: "CSS: .app-shell / padding"
summary: Padding drži scenu urednom.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:shell-padding
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-padding-scene

### Narration

Padding drži scenu urednom.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
}

ui-pricing-card {
}
```

# Step: shell-display

title: "CSS: .app-shell / display"
summary: Grid pravi jedinstven host za pricing card.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:shell-display
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-display-scene

### Narration

Grid pravi jedinstven host za pricing card.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
}

ui-pricing-card {
}
```

# Step: shell-place-items

title: "CSS: .app-shell / place-items"
summary: Centar drži fokus na jednom pricing card-u.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:shell-place-items
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-place-items-scene

### Narration

Centar drži fokus na jednom pricing card-u.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
}

ui-pricing-card {
}
```

# Step: shell-min-height

title: "CSS: .app-shell / min-height"
summary: Puna visina drži tamnu pozadinu stabilnom.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:shell-min-height
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-min-height-scene

### Narration

Puna visina drži tamnu pozadinu stabilnom.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
}

ui-pricing-card {
}
```

# Step: shell-background

title: "CSS: .app-shell / background"
summary: Tamna pozadina naglašava SaaS pricing card.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:shell-background
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-background-scene

### Narration

Tamna pozadina naglašava SaaS pricing card.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
}
```

# Step: host-outline

title: "CSS: ui-pricing-card / outline"
summary: Dodajemo host helper outline i držimo ga do završnog rezimea.
intent: Host je javni contract surface pricing kartice.
tag: css:host-outline
proTip: Host je javni contract surface pricing kartice.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: host-outline-scene

### Narration

Dodajemo host helper outline i držimo ga do završnog rezimea.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
}
```

# Step: host-display

title: "CSS: ui-pricing-card / display"
summary: Block display pravi stabilan footprint.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:host-display
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: host-display-scene

### Narration

Block display pravi stabilan footprint.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
}
```

# Step: host-width

title: "CSS: ui-pricing-card / width"
summary: Širina pricing card-a ostaje ograničena i predvidiva.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:host-width
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: host-width-scene

### Narration

Širina pricing card-a ostaje ograničena i predvidiva.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
}
```

# Step: host-position

title: "CSS: ui-pricing-card / position"
summary: Relative za popular state i buduće overlay-e.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:host-position
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: host-position-scene

### Narration

Relative za popular state i buduće overlay-e.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
}
```

# Step: host-surface-token

title: "CSS: ui-pricing-card / --pricing-surface"
summary: Surface token vodi pozadinu card-a.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:host-surface-token
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: host-surface-token-scene

### Narration

Surface token vodi pozadinu card-a.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
}
```

# Step: host-surface-alt-token

title: "CSS: ui-pricing-card / --pricing-surface-alt"
summary: Alternativna površina zatvara gradijent.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:host-surface-alt-token
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: host-surface-alt-token-scene

### Narration

Alternativna površina zatvara gradijent.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
}
```

# Step: host-border-token

title: "CSS: ui-pricing-card / --pricing-border"
summary: Border token drži ivice nežnim.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:host-border-token
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: host-border-token-scene

### Narration

Border token drži ivice nežnim.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
}
```

# Step: host-accent-token

title: "CSS: ui-pricing-card / --pricing-accent"
summary: Accent token vodi CTA, badge i tier boju.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:host-accent-token
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: host-accent-token-scene

### Narration

Accent token vodi CTA, badge i tier boju.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
}
```

# Step: host-accent-strong-token

title: "CSS: ui-pricing-card / --pricing-accent-strong"
summary: Jači accent zatvara CTA gradijent.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:host-accent-strong-token
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: host-accent-strong-token-scene

### Narration

Jači accent zatvara CTA gradijent.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
}
```

# Step: host-text-token

title: "CSS: ui-pricing-card / --pricing-text"
summary: Text token čuva kontrast.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:host-text-token
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: host-text-token-scene

### Narration

Text token čuva kontrast.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
}
```

# Step: host-muted-token

title: "CSS: ui-pricing-card / --pricing-muted"
summary: Muted token pokriva sekundarne labele.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:host-muted-token
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: host-muted-token-scene

### Narration

Muted token pokriva sekundarne labele.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
}
```

# Step: host-shadow-token

title: "CSS: ui-pricing-card / --pricing-shadow"
summary: Shadow je javni token, ne interni magic number.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:host-shadow-token
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: host-shadow-token-scene

### Narration

Shadow je javni token, ne interni magic number.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
}
```

# Step: host-popular-glow-token

title: "CSS: ui-pricing-card / --pricing-popular-glow"
summary: Popular glow token priprema highlight efekat za istaknutu karticu.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:host-popular-glow-token
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: host-popular-glow-token-scene

### Narration

Popular glow token priprema highlight efekat za istaknutu karticu.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}
```

# Step: tier-starter-accent

title: 'CSS: ui-pricing-card[tier="starter"] / --pricing-accent'
summary: Starter tier dobija ljubičasti accent.
intent: Tier variants menjaju samo token — bez diranja shadow internals.
tag: css:tier-starter-accent
proTip: Tier variants menjaju samo token — bez diranja shadow internals.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: tier-starter-accent-scene

### Narration

Starter tier dobija ljubičasti accent.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
}
```

# Step: tier-starter-accent-strong

title: 'CSS: ui-pricing-card[tier="starter"] / --pricing-accent-strong'
summary: Jači ljubičasti ton za CTA gradijent.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:tier-starter-accent-strong
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: tier-starter-accent-strong-scene

### Narration

Jači ljubičasti ton za CTA gradijent.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}
```

# Step: tier-pro-accent

title: 'CSS: ui-pricing-card[tier="pro"] / --pricing-accent'
summary: Pro tier koristi default sky blue accent.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:tier-pro-accent
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier="pro"

## Scene: tier-pro-accent-scene

### Narration

Pro tier koristi default sky blue accent.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}

ui-pricing-card[tier='pro'] {
  --pricing-accent: #38bdf8;
}
```

# Step: tier-pro-accent-strong

title: 'CSS: ui-pricing-card[tier="pro"] / --pricing-accent-strong'
summary: Jači blue ton za pro CTA.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:tier-pro-accent-strong
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier="pro"

## Scene: tier-pro-accent-strong-scene

### Narration

Jači blue ton za pro CTA.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}

ui-pricing-card[tier='pro'] {
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
}
```

# Step: tier-enterprise-accent

title: 'CSS: ui-pricing-card[tier="enterprise"] / --pricing-accent'
summary: Enterprise tier dobija amber accent.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:tier-enterprise-accent
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: tier-enterprise-accent-scene

### Narration

Enterprise tier dobija amber accent.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}

ui-pricing-card[tier='pro'] {
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
}

ui-pricing-card[tier='enterprise'] {
  --pricing-accent: #f59e0b;
}
```

# Step: tier-enterprise-accent-strong

title: 'CSS: ui-pricing-card[tier="enterprise"] / --pricing-accent-strong'
summary: Jači amber ton za enterprise CTA.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:tier-enterprise-accent-strong
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: tier-enterprise-accent-strong-scene

### Narration

Jači amber ton za enterprise CTA.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}

ui-pricing-card[tier='pro'] {
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
}

ui-pricing-card[tier='enterprise'] {
  --pricing-accent: #f59e0b;
  --pricing-accent-strong: #d97706;
}
```

# Step: popular-host-shadow

title: "CSS: ui-pricing-card[popular] / box-shadow"
summary: Popular kartica dobija glow efekat.
intent: Popular state je boolean atribut — prisutnost znači aktivan.
tag: css:popular-host-shadow
proTip: Popular state je boolean atribut — prisutnost znači aktivan.
focusHtmlNeedles:

- <ui-pricing-card
- popular

## Scene: popular-host-shadow-scene

### Narration

Popular kartica dobija glow efekat.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}

ui-pricing-card[tier='pro'] {
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
}

ui-pricing-card[tier='enterprise'] {
  --pricing-accent: #f59e0b;
  --pricing-accent-strong: #d97706;
}

ui-pricing-card[popular] {
  box-shadow: var(--pricing-popular-glow, 0 0 0 2px rgba(56, 189, 248, 0.35));
}
```

# Step: popular-host-transform

title: "CSS: ui-pricing-card[popular] / transform"
summary: Blagi scale ističe popularnu opciju.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:popular-host-transform
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- popular

## Scene: popular-host-transform-scene

### Narration

Blagi scale ističe popularnu opciju.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}

ui-pricing-card[tier='pro'] {
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
}

ui-pricing-card[tier='enterprise'] {
  --pricing-accent: #f59e0b;
  --pricing-accent-strong: #d97706;
}

ui-pricing-card[popular] {
  box-shadow: var(--pricing-popular-glow, 0 0 0 2px rgba(56, 189, 248, 0.35));
  transform: scale(1.03);
}
```

# Step: popular-host-z-index

title: "CSS: ui-pricing-card[popular] / z-index"
summary: Z-index drži popularnu karticu iznad susednih u grid-u.
intent: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
tag: css:popular-host-z-index
proTip: Host CSS drži tier variants, popular state i token contract na samom custom elementu.
focusHtmlNeedles:

- <ui-pricing-card
- popular

## Scene: popular-host-z-index-scene

### Narration

Z-index drži popularnu karticu iznad susednih u grid-u.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}

ui-pricing-card[tier='pro'] {
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
}

ui-pricing-card[tier='enterprise'] {
  --pricing-accent: #f59e0b;
  --pricing-accent-strong: #d97706;
}

ui-pricing-card[popular] {
  box-shadow: var(--pricing-popular-glow, 0 0 0 2px rgba(56, 189, 248, 0.35));
  transform: scale(1.03);
  z-index: 1;
}
```

# Step: host-vs-shadow-styles

title: "Teaching Moment: Tier + Popular + Billing Contract"
summary: 'Host CSS je definisao token contract, tier accent varijante i popular state highlight. Shadow CSS sada stilizuje card internals: badge, cenu, toggle switch, feature listu, CTA i urgency timer. Toggle vizuelni efekat dolazi iz `:host([billing="yearly"])` selectora — CSS automatski reaguje na atribut.'
intent: "Pravilo: tier/popular/billing spolja, card internals unutra."
tag: teaching:host-vs-shadow-styles
proTip: "Pravilo: tier/popular/billing spolja, card internals unutra."
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: host-vs-shadow-styles-scene

### Narration

Host CSS je definisao token contract, tier accent varijante i popular state highlight. Shadow CSS sada stilizuje card internals: badge, cenu, toggle switch, feature listu, CTA i urgency timer. Toggle vizuelni efekat dolazi iz `:host([billing="yearly"])` selectora — CSS automatski reaguje na atribut.

### Show Code: html

```html
<div class="app-shell">
  <ui-pricing-card
    tier="pro"
    price-monthly="29"
    price-yearly="290"
    popular
    cta-label="Start free trial"
  >
    <span slot="badge">⭐ Most Popular</span>
    <ul slot="features">
      <li>Unlimited projects</li>
      <li>Priority support</li>
      <li>Advanced analytics</li>
      <li>Team collaboration</li>
      <li>Custom integrations</li>
    </ul>
  </ui-pricing-card>
</div>
```

# Step: shadow-host-display

title: "Shadow CSS: :host / display"
summary: Shadow host potvrđuje block model iznutra.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:shadow-host-display
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: shadow-host-display-scene

### Narration

Shadow host potvrđuje block model iznutra.

### Show Code: shadow-css

```css
:host {
  display: block;
}
```

# Step: shadow-host-font-family

title: "Shadow CSS: :host / font-family"
summary: Font stack je interni shadow contract.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:shadow-host-font-family
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: shadow-host-font-family-scene

### Narration

Font stack je interni shadow contract.

### Show Code: shadow-css

```css
:host {
  display: block;
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
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:shadow-host-color
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: shadow-host-color-scene

### Narration

Boja čita spoljašnji text token.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}
```

# Step: card-outline

title: "Shadow CSS: .card / outline"
summary: Dodajemo helper outline za card blok.
intent: Card outline ostaje dok ne završimo unutrašnju celinu.
tag: shadow-css:card-outline
proTip: Card outline ostaje dok ne završimo unutrašnju celinu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: card-outline-scene

### Narration

Dodajemo helper outline za card blok.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
}
```

# Step: card-display

title: "Shadow CSS: .card / display"
summary: Card koristi grid za vertikalni stack svih zona.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:card-display
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: card-display-scene

### Narration

Card koristi grid za vertikalni stack svih zona.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
}
```

# Step: card-gap

title: "Shadow CSS: .card / gap"
summary: Gap odvaja badge, tier, cenu, toggle, feature listu i CTA.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:card-gap
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: card-gap-scene

### Narration

Gap odvaja badge, tier, cenu, toggle, feature listu i CTA.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
}
```

# Step: card-padding

title: "Shadow CSS: .card / padding"
summary: Padding pravi pravi card footprint.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:card-padding
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: card-padding-scene

### Narration

Padding pravi pravi card footprint.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
}
```

# Step: card-radius

title: "Shadow CSS: .card / border-radius"
summary: Zaobljenje daje modernu siluetu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:card-radius
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: card-radius-scene

### Narration

Zaobljenje daje modernu siluetu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
}
```

# Step: card-border

title: "Shadow CSS: .card / border"
summary: Border čita host token.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:card-border
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: card-border-scene

### Narration

Border čita host token.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
}
```

# Step: card-background

title: "Shadow CSS: .card / background"
summary: Card pozadina čita host surface tokene.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:card-background
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: card-background-scene

### Narration

Card pozadina čita host surface tokene.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
}
```

# Step: card-shadow

title: "Shadow CSS: .card / box-shadow"
summary: Shadow dolazi iz host contract-a.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:card-shadow
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: card-shadow-scene

### Narration

Shadow dolazi iz host contract-a.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
}
```

# Step: card-text-align

title: "Shadow CSS: .card / text-align"
summary: Card sadržaj se centrira.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:card-text-align
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: card-text-align-scene

### Narration

Card sadržaj se centrira.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}
```

# Step: badge-outline

title: "Shadow CSS: .popular-badge / outline"
summary: Dodajemo helper outline za popular badge.
intent: Badge je skriven po default-u, vidljiv samo kada je popular atribut prisutan.
tag: shadow-css:badge-outline
proTip: Badge je skriven po default-u, vidljiv samo kada je popular atribut prisutan.
focusHtmlNeedles:

- <ui-pricing-card
- popular

## Scene: badge-outline-scene

### Narration

Dodajemo helper outline za popular badge.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
}
```

# Step: badge-display

title: "Shadow CSS: .popular-badge / display"
summary: Badge je sakriveno po defaultu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:badge-display
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- popular

## Scene: badge-display-scene

### Narration

Badge je sakriveno po defaultu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
}
```

# Step: badge-padding

title: "Shadow CSS: .popular-badge / padding"
summary: Padding pravi pill footprint.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:badge-padding
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- popular

## Scene: badge-padding-scene

### Narration

Padding pravi pill footprint.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
}
```

# Step: badge-radius

title: "Shadow CSS: .popular-badge / border-radius"
summary: Veliki radius pravi kapsulu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:badge-radius
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- popular

## Scene: badge-radius-scene

### Narration

Veliki radius pravi kapsulu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
}
```

# Step: badge-background

title: "Shadow CSS: .popular-badge / background"
summary: Badge pozadina čita tier accent tokene.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:badge-background
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- popular

## Scene: badge-background-scene

### Narration

Badge pozadina čita tier accent tokene.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
}
```

# Step: badge-color

title: "Shadow CSS: .popular-badge / color"
summary: Beli tekst drži kontrast.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:badge-color
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- popular

## Scene: badge-color-scene

### Narration

Beli tekst drži kontrast.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
}
```

# Step: badge-font-size

title: "Shadow CSS: .popular-badge / font-size"
summary: Mali font čini badge kompaktnim.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:badge-font-size
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- popular

## Scene: badge-font-size-scene

### Narration

Mali font čini badge kompaktnim.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
}
```

# Step: badge-font-weight

title: "Shadow CSS: .popular-badge / font-weight"
summary: Bold drži badge labelu čitkom.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:badge-font-weight
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- popular

## Scene: badge-font-weight-scene

### Narration

Bold drži badge labelu čitkom.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
}
```

# Step: badge-letter-spacing

title: "Shadow CSS: .popular-badge / letter-spacing"
summary: Tracking drži badge urednim.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:badge-letter-spacing
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- popular

## Scene: badge-letter-spacing-scene

### Narration

Tracking drži badge urednim.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
}
```

# Step: badge-text-transform

title: "Shadow CSS: .popular-badge / text-transform"
summary: Uppercase za badge kategorijsku labelu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:badge-text-transform
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- popular

## Scene: badge-text-transform-scene

### Narration

Uppercase za badge kategorijsku labelu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
```

# Step: badge-width

title: "Shadow CSS: .popular-badge / width"
summary: Širina samo za sadržaj.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:badge-width
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- popular

## Scene: badge-width-scene

### Narration

Širina samo za sadržaj.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
}
```

# Step: badge-justify-self

title: "Shadow CSS: .popular-badge / justify-self"
summary: Centriramo badge horizontalno.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:badge-justify-self
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- popular

## Scene: badge-justify-self-scene

### Narration

Centriramo badge horizontalno.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}
```

# Step: badge-popular-display

title: "Shadow CSS: :host([popular]) .popular-badge / display"
summary: Kada je popular atribut prisutan, badge postaje vidljiv.
intent: CSS čita host atribut — JS ne mora ručno da toggle-uje visibility.
tag: shadow-css:badge-popular-display
proTip: CSS čita host atribut — JS ne mora ručno da toggle-uje visibility.
focusHtmlNeedles:

- <ui-pricing-card
- popular

## Scene: badge-popular-display-scene

### Narration

Kada je popular atribut prisutan, badge postaje vidljiv.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}
```

# Step: badge-slotted-font

title: 'Shadow CSS: ::slotted([slot="badge"]) / font'
summary: Slotovani badge sadržaj nasleđuje font.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:badge-slotted-font
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- slot="badge"
- <ui-pricing-card

## Scene: badge-slotted-font-scene

### Narration

Slotovani badge sadržaj nasleđuje font.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}
```

# Step: tier-name-margin

title: "Shadow CSS: .tier-name / margin"
summary: Brišemo podrazumevani heading margin.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:tier-name-margin
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: tier-name-margin-scene

### Narration

Brišemo podrazumevani heading margin.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
}
```

# Step: tier-name-font-size

title: "Shadow CSS: .tier-name / font-size"
summary: Tier ime dobija kompaktnu veličinu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:tier-name-font-size
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: tier-name-font-size-scene

### Narration

Tier ime dobija kompaktnu veličinu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
}
```

# Step: tier-name-font-weight

title: "Shadow CSS: .tier-name / font-weight"
summary: Bold drži tier ime jasnim.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:tier-name-font-weight
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: tier-name-font-weight-scene

### Narration

Bold drži tier ime jasnim.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}
```

# Step: tier-name-text-transform

title: "Shadow CSS: .tier-name / text-transform"
summary: Uppercase pojačava hijerarhiju.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:tier-name-text-transform
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: tier-name-text-transform-scene

### Narration

Uppercase pojačava hijerarhiju.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
}
```

# Step: tier-name-letter-spacing

title: "Shadow CSS: .tier-name / letter-spacing"
summary: Tracking za tier labelu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:tier-name-letter-spacing
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: tier-name-letter-spacing-scene

### Narration

Tracking za tier labelu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
```

# Step: tier-name-color

title: "Shadow CSS: .tier-name / color"
summary: Tier ime čita accent token — menja se sa tier variantom.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:tier-name-color
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: tier-name-color-scene

### Narration

Tier ime čita accent token — menja se sa tier variantom.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}
```

# Step: price-outline

title: "Shadow CSS: .price-block / outline"
summary: Dodajemo helper outline za price blok.
intent: Cena je centralni element pricing kartice.
tag: shadow-css:price-outline
proTip: Cena je centralni element pricing kartice.
focusHtmlNeedles:

- <ui-pricing-card
- price-monthly=

## Scene: price-outline-scene

### Narration

Dodajemo helper outline za price blok.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
}
```

# Step: price-display

title: "Shadow CSS: .price-block / display"
summary: Flex pravi horizontalni raspored valuta/iznos/period.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:price-display
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- price-monthly=

## Scene: price-display-scene

### Narration

Flex pravi horizontalni raspored valuta/iznos/period.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
}
```

# Step: price-align

title: "Shadow CSS: .price-block / align-items"
summary: Baseline poravnavanje drži $ i /mo uz velik iznos.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:price-align
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- price-monthly=

## Scene: price-align-scene

### Narration

Baseline poravnavanje drži $ i /mo uz velik iznos.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
}
```

# Step: price-justify

title: "Shadow CSS: .price-block / justify-content"
summary: Centriramo cenu horizontalno.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:price-justify
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- price-monthly=

## Scene: price-justify-scene

### Narration

Centriramo cenu horizontalno.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
}
```

# Step: price-gap

title: "Shadow CSS: .price-block / gap"
summary: Minimalni gap između delova cene.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:price-gap
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- price-monthly=

## Scene: price-gap-scene

### Narration

Minimalni gap između delova cene.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}
```

# Step: price-currency-font-size

title: "Shadow CSS: .price-currency / font-size"
summary: Valuta dobija manji ali jasno vidljiv font.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:price-currency-font-size
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- price-monthly=

## Scene: price-currency-font-size-scene

### Narration

Valuta dobija manji ali jasno vidljiv font.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
}
```

# Step: price-currency-font-weight

title: "Shadow CSS: .price-currency / font-weight"
summary: Bold za valutu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:price-currency-font-weight
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- price-monthly=

## Scene: price-currency-font-weight-scene

### Narration

Bold za valutu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
}
```

# Step: price-currency-color

title: "Shadow CSS: .price-currency / color"
summary: Valuta čita muted token.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:price-currency-color
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- price-monthly=

## Scene: price-currency-color-scene

### Narration

Valuta čita muted token.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}
```

# Step: price-amount-font-size

title: "Shadow CSS: .price-amount / font-size"
summary: Velika veličina dominira karticom.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:price-amount-font-size
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- price-monthly=

## Scene: price-amount-font-size-scene

### Narration

Velika veličina dominira karticom.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
}
```

# Step: price-amount-font-weight

title: "Shadow CSS: .price-amount / font-weight"
summary: Extra bold naglašava cenu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:price-amount-font-weight
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- price-monthly=

## Scene: price-amount-font-weight-scene

### Narration

Extra bold naglašava cenu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
}
```

# Step: price-amount-line-height

title: "Shadow CSS: .price-amount / line-height"
summary: Line-height drži broj zategnutim.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:price-amount-line-height
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- price-monthly=

## Scene: price-amount-line-height-scene

### Narration

Line-height drži broj zategnutim.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
}
```

# Step: price-amount-transition

title: "Shadow CSS: .price-amount / transition"
summary: Tranzicija omogućava future animaciju pri promeni.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:price-amount-transition
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- price-monthly=

## Scene: price-amount-transition-scene

### Narration

Tranzicija omogućava future animaciju pri promeni.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}
```

# Step: price-period-font-size

title: "Shadow CSS: .price-period / font-size"
summary: Period je sekundaran.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:price-period-font-size
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- price-monthly=

## Scene: price-period-font-size-scene

### Narration

Period je sekundaran.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
}
```

# Step: price-period-color

title: "Shadow CSS: .price-period / color"
summary: Period čita muted token.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:price-period-color
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- price-monthly=

## Scene: price-period-color-scene

### Narration

Period čita muted token.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
}
```

# Step: price-period-font-weight

title: "Shadow CSS: .price-period / font-weight"
summary: Medium weight za period.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:price-period-font-weight
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- price-monthly=

## Scene: price-period-font-weight-scene

### Narration

Medium weight za period.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}
```

# Step: toggle-outline

title: "Shadow CSS: .billing-toggle / outline"
summary: Dodajemo helper outline za billing toggle.
intent: Toggle je interaktivni UI deo koji menja prikazanu cenu.
tag: shadow-css:toggle-outline
proTip: Toggle je interaktivni UI deo koji menja prikazanu cenu.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-outline-scene

### Narration

Dodajemo helper outline za billing toggle.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
}
```

# Step: toggle-display

title: "Shadow CSS: .billing-toggle / display"
summary: Flex slaže labele i switch horizontalno.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-display
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-display-scene

### Narration

Flex slaže labele i switch horizontalno.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
}
```

# Step: toggle-align

title: "Shadow CSS: .billing-toggle / align-items"
summary: Centriramo elemente vertikalno.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-align
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-align-scene

### Narration

Centriramo elemente vertikalno.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
}
```

# Step: toggle-justify

title: "Shadow CSS: .billing-toggle / justify-content"
summary: Centriramo ceo toggle.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-justify
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-justify-scene

### Narration

Centriramo ceo toggle.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

# Step: toggle-gap

title: "Shadow CSS: .billing-toggle / gap"
summary: Gap odvaja labele od switch-a.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-gap
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-gap-scene

### Narration

Gap odvaja labele od switch-a.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
```

# Step: toggle-label-font-size

title: "Shadow CSS: .toggle-label / font-size"
summary: Kompaktan font za toggle labele.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-label-font-size
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-label-font-size-scene

### Narration

Kompaktan font za toggle labele.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
}
```

# Step: toggle-label-color

title: "Shadow CSS: .toggle-label / color"
summary: Muted boja za neupadljivost.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-label-color
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-label-color-scene

### Narration

Muted boja za neupadljivost.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
}
```

# Step: toggle-label-font-weight

title: "Shadow CSS: .toggle-label / font-weight"
summary: Medium weight za labele.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-label-font-weight
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-label-font-weight-scene

### Narration

Medium weight za labele.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}
```

# Step: toggle-label-transition

title: "Shadow CSS: .toggle-label / transition"
summary: Tranzicija za smooth promenu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-label-transition
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-label-transition-scene

### Narration

Tranzicija za smooth promenu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}
```

# Step: toggle-switch-appearance

title: "Shadow CSS: .toggle-switch / appearance"
summary: Gasimo native izgled.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-switch-appearance
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-switch-appearance-scene

### Narration

Gasimo native izgled.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
}
```

# Step: toggle-switch-width

title: "Shadow CSS: .toggle-switch / width"
summary: Switch širina.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-switch-width
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-switch-width-scene

### Narration

Switch širina.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
}
```

# Step: toggle-switch-height

title: "Shadow CSS: .toggle-switch / height"
summary: Switch visina.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-switch-height
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-switch-height-scene

### Narration

Switch visina.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
}
```

# Step: toggle-switch-radius

title: "Shadow CSS: .toggle-switch / border-radius"
summary: Zaobljenje za pill oblik.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-switch-radius
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-switch-radius-scene

### Narration

Zaobljenje za pill oblik.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
}
```

# Step: toggle-switch-border

title: "Shadow CSS: .toggle-switch / border"
summary: Uklanjamo border.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-switch-border
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-switch-border-scene

### Narration

Uklanjamo border.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
}
```

# Step: toggle-switch-background

title: "Shadow CSS: .toggle-switch / background"
summary: Neutralna toggle pozadina — menja se na yearly.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-switch-background
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-switch-background-scene

### Narration

Neutralna toggle pozadina — menja se na yearly.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
}
```

# Step: toggle-switch-cursor

title: "Shadow CSS: .toggle-switch / cursor"
summary: Pointer kursor za klikabilnost.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-switch-cursor
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-switch-cursor-scene

### Narration

Pointer kursor za klikabilnost.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
}
```

# Step: toggle-switch-position

title: "Shadow CSS: .toggle-switch / position"
summary: Relative za knob pozicioniranje.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-switch-position
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-switch-position-scene

### Narration

Relative za knob pozicioniranje.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
}
```

# Step: toggle-switch-padding

title: "Shadow CSS: .toggle-switch / padding"
summary: Padding oko knob-a.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-switch-padding
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-switch-padding-scene

### Narration

Padding oko knob-a.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
}
```

# Step: toggle-switch-transition

title: "Shadow CSS: .toggle-switch / transition"
summary: Glatki prelaz pozadine.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-switch-transition
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-switch-transition-scene

### Narration

Glatki prelaz pozadine.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}
```

# Step: toggle-knob-display

title: "Shadow CSS: .toggle-knob / display"
summary: Block za knob.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-knob-display
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-knob-display-scene

### Narration

Block za knob.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
}
```

# Step: toggle-knob-width

title: "Shadow CSS: .toggle-knob / width"
summary: Knob veličina.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-knob-width
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-knob-width-scene

### Narration

Knob veličina.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
}
```

# Step: toggle-knob-height

title: "Shadow CSS: .toggle-knob / height"
summary: Visina jednaka širini.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-knob-height
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-knob-height-scene

### Narration

Visina jednaka širini.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
}
```

# Step: toggle-knob-radius

title: "Shadow CSS: .toggle-knob / border-radius"
summary: Kružni knob.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-knob-radius
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-knob-radius-scene

### Narration

Kružni knob.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
```

# Step: toggle-knob-background

title: "Shadow CSS: .toggle-knob / background"
summary: Beli knob.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-knob-background
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-knob-background-scene

### Narration

Beli knob.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
}
```

# Step: toggle-knob-transition

title: "Shadow CSS: .toggle-knob / transition"
summary: Glatki prelaz pozicije.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-knob-transition
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-knob-transition-scene

### Narration

Glatki prelaz pozicije.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}
```

# Step: toggle-yearly-bg

title: 'Shadow CSS: :host([billing="yearly"]) .toggle-switch / background'
summary: Na yearly, switch postaje accent boja.
intent: CSS čita billing atribut — JS samo menja atribut, vizuelni efekat je automatski.
tag: shadow-css:toggle-yearly-bg
proTip: CSS čita billing atribut — JS samo menja atribut, vizuelni efekat je automatski.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-yearly-bg-scene

### Narration

Na yearly, switch postaje accent boja.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}
```

# Step: toggle-yearly-knob

title: 'Shadow CSS: :host([billing="yearly"]) .toggle-knob / transform'
summary: Knob se pomera desno na yearly.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:toggle-yearly-knob
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-yearly-knob-scene

### Narration

Knob se pomera desno na yearly.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}
```

# Step: save-badge-font-size

title: "Shadow CSS: .save-badge / font-size"
summary: Save badge je mali ali upadljiv.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:save-badge-font-size
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: save-badge-font-size-scene

### Narration

Save badge je mali ali upadljiv.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
}
```

# Step: save-badge-background

title: "Shadow CSS: .save-badge / background"
summary: Zelena pozadina signalizira uštedu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:save-badge-background
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: save-badge-background-scene

### Narration

Zelena pozadina signalizira uštedu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
}
```

# Step: save-badge-color

title: "Shadow CSS: .save-badge / color"
summary: Zeleni tekst za save signal.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:save-badge-color
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: save-badge-color-scene

### Narration

Zeleni tekst za save signal.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}
```

# Step: save-badge-padding

title: "Shadow CSS: .save-badge / padding"
summary: Mali padding.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:save-badge-padding
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: save-badge-padding-scene

### Narration

Mali padding.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
}
```

# Step: save-badge-radius

title: "Shadow CSS: .save-badge / border-radius"
summary: Blago zaobljenje.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:save-badge-radius
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: save-badge-radius-scene

### Narration

Blago zaobljenje.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
}
```

# Step: save-badge-font-weight

title: "Shadow CSS: .save-badge / font-weight"
summary: Bold za isticanje.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:save-badge-font-weight
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: save-badge-font-weight-scene

### Narration

Bold za isticanje.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}
```

# Step: features-outline

title: "Shadow CSS: .feature-list / outline"
summary: Dodajemo helper outline za feature listu.
intent: Feature list slot je javna površina za marketing sadržaj.
tag: shadow-css:features-outline
proTip: Feature list slot je javna površina za marketing sadržaj.
focusHtmlNeedles:

- <ui-pricing-card
- slot="features"

## Scene: features-outline-scene

### Narration

Dodajemo helper outline za feature listu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
}
```

# Step: features-padding

title: "Shadow CSS: .feature-list / padding"
summary: Vertikalni padding za feature zonu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:features-padding
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- slot="features"

## Scene: features-padding-scene

### Narration

Vertikalni padding za feature zonu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}
```

# Step: features-slotted-list-style

title: "Shadow CSS: ::slotted(ul) / list-style"
summary: Brišemo bullet-e.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:features-slotted-list-style
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- slot="features"
- <ui-pricing-card

## Scene: features-slotted-list-style-scene

### Narration

Brišemo bullet-e.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
}
```

# Step: features-slotted-margin

title: "Shadow CSS: ::slotted(ul) / margin"
summary: Brišemo default margin.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:features-slotted-margin
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- slot="features"
- <ui-pricing-card

## Scene: features-slotted-margin-scene

### Narration

Brišemo default margin.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
}
```

# Step: features-slotted-padding

title: "Shadow CSS: ::slotted(ul) / padding"
summary: Brišemo default padding.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:features-slotted-padding
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- slot="features"
- <ui-pricing-card

## Scene: features-slotted-padding-scene

### Narration

Brišemo default padding.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
}
```

# Step: features-slotted-display

title: "Shadow CSS: ::slotted(ul) / display"
summary: Grid za feature listu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:features-slotted-display
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- slot="features"
- <ui-pricing-card

## Scene: features-slotted-display-scene

### Narration

Grid za feature listu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
}
```

# Step: features-slotted-gap

title: "Shadow CSS: ::slotted(ul) / gap"
summary: Razmak između feature stavki.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:features-slotted-gap
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- slot="features"
- <ui-pricing-card

## Scene: features-slotted-gap-scene

### Narration

Razmak između feature stavki.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}
```

# Step: features-slotted-text-align

title: "Shadow CSS: ::slotted(ul) / text-align"
summary: Feature stavke su levo poravnate.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:features-slotted-text-align
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- slot="features"
- <ui-pricing-card

## Scene: features-slotted-text-align-scene

### Narration

Feature stavke su levo poravnate.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
}
```

# Step: features-slotted-font-size

title: "Shadow CSS: ::slotted(ul) / font-size"
summary: Kompaktan font za feature listu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:features-slotted-font-size
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- slot="features"
- <ui-pricing-card

## Scene: features-slotted-font-size-scene

### Narration

Kompaktan font za feature listu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
}
```

# Step: features-slotted-color

title: "Shadow CSS: ::slotted(ul) / color"
summary: Feature tekst čita muted token.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:features-slotted-color
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- slot="features"
- <ui-pricing-card

## Scene: features-slotted-color-scene

### Narration

Feature tekst čita muted token.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}
```

# Step: cta-outline

title: "Shadow CSS: .cta / outline"
summary: Dodajemo helper outline za CTA dugme.
intent: CTA je centralni action element pricing kartice.
tag: shadow-css:cta-outline
proTip: CTA je centralni action element pricing kartice.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-outline-scene

### Narration

Dodajemo helper outline za CTA dugme.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
}
```

# Step: cta-appearance

title: "Shadow CSS: .cta / appearance"
summary: Gasimo native button izgled.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-appearance
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-appearance-scene

### Narration

Gasimo native button izgled.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
}
```

# Step: cta-width

title: "Shadow CSS: .cta / width"
summary: CTA zauzima punu širinu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-width
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-width-scene

### Narration

CTA zauzima punu širinu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
}
```

# Step: cta-padding

title: "Shadow CSS: .cta / padding"
summary: Padding pravi klik zonu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-padding
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-padding-scene

### Narration

Padding pravi klik zonu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
}
```

# Step: cta-border

title: "Shadow CSS: .cta / border"
summary: Brišemo border.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-border
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-border-scene

### Narration

Brišemo border.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
}
```

# Step: cta-radius

title: "Shadow CSS: .cta / border-radius"
summary: Zaobljeno dugme.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-radius
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-radius-scene

### Narration

Zaobljeno dugme.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
}
```

# Step: cta-background

title: "Shadow CSS: .cta / background"
summary: CTA gradijent čita tier tokene — menja se sa varijantom.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-background
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-background-scene

### Narration

CTA gradijent čita tier tokene — menja se sa varijantom.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
}
```

# Step: cta-color

title: "Shadow CSS: .cta / color"
summary: Beli tekst za kontrast.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-color
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-color-scene

### Narration

Beli tekst za kontrast.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
}
```

# Step: cta-font

title: "Shadow CSS: .cta / font"
summary: Preuzima font.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-font
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-font-scene

### Narration

Preuzima font.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
}
```

# Step: cta-font-size

title: "Shadow CSS: .cta / font-size"
summary: Solidna veličina za action.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-font-size
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-font-size-scene

### Narration

Solidna veličina za action.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
}
```

# Step: cta-font-weight

title: "Shadow CSS: .cta / font-weight"
summary: Bold za jasnoću.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-font-weight
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-font-weight-scene

### Narration

Bold za jasnoću.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
}
```

# Step: cta-cursor

title: "Shadow CSS: .cta / cursor"
summary: Kursor potvrđuje interakciju.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-cursor
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-cursor-scene

### Narration

Kursor potvrđuje interakciju.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}
```

# Step: cta-transition

title: "Shadow CSS: .cta / transition"
summary: Tranzicije za glatki response.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-transition
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-transition-scene

### Narration

Tranzicije za glatki response.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
}
```

# Step: cta-box-shadow

title: "Shadow CSS: .cta / box-shadow"
summary: CTA shadow dodaje dubinu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-box-shadow
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-box-shadow-scene

### Narration

CTA shadow dodaje dubinu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}
```

# Step: cta-hover-filter

title: "Shadow CSS: .cta:hover / filter"
summary: Na hover blago podižemo svetlinu.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-hover-filter
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-hover-filter-scene

### Narration

Na hover blago podižemo svetlinu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
}
```

# Step: cta-hover-transform

title: "Shadow CSS: .cta:hover / transform"
summary: Blagi lift na hover.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-hover-transform
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-hover-transform-scene

### Narration

Blagi lift na hover.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}
```

# Step: cta-active-transform

title: "Shadow CSS: .cta:active / transform"
summary: Na active vraćamo dugme.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-active-transform
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-active-transform-scene

### Narration

Na active vraćamo dugme.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}
```

# Step: cta-focus-outline

title: "Shadow CSS: .cta:focus-visible / outline"
summary: Focus ring za tastatursku navigaciju.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-focus-outline
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-focus-outline-scene

### Narration

Focus ring za tastatursku navigaciju.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
}
```

# Step: cta-focus-outline-offset

title: "Shadow CSS: .cta:focus-visible / outline-offset"
summary: Offset odvaja ring od dugmeta.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:cta-focus-outline-offset
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- cta-label=

## Scene: cta-focus-outline-offset-scene

### Narration

Offset odvaja ring od dugmeta.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}
```

# Step: urgency-outline

title: "Shadow CSS: .urgency / outline"
summary: Dodajemo helper outline za urgency timer zonu.
intent: Urgency timer pojačava konverziju — mora biti vizuelno jasan ali ne agresivan.
tag: shadow-css:urgency-outline
proTip: Urgency timer pojačava konverziju — mora biti vizuelno jasan ali ne agresivan.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: urgency-outline-scene

### Narration

Dodajemo helper outline za urgency timer zonu.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}

.urgency {
  outline: 1px dotted #fb923c;
}
```

# Step: urgency-display

title: "Shadow CSS: .urgency / display"
summary: Flex slaže ikonu i tekst.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:urgency-display
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: urgency-display-scene

### Narration

Flex slaže ikonu i tekst.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}

.urgency {
  outline: 1px dotted #fb923c;
  display: flex;
}
```

# Step: urgency-align

title: "Shadow CSS: .urgency / align-items"
summary: Centriramo vertikalno.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:urgency-align
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: urgency-align-scene

### Narration

Centriramo vertikalno.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}

.urgency {
  outline: 1px dotted #fb923c;
  display: flex;
  align-items: center;
}
```

# Step: urgency-justify

title: "Shadow CSS: .urgency / justify-content"
summary: Centriramo horizontalno.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:urgency-justify
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: urgency-justify-scene

### Narration

Centriramo horizontalno.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}

.urgency {
  outline: 1px dotted #fb923c;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

# Step: urgency-gap

title: "Shadow CSS: .urgency / gap"
summary: Gap između ikone i teksta.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:urgency-gap
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: urgency-gap-scene

### Narration

Gap između ikone i teksta.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}

.urgency {
  outline: 1px dotted #fb923c;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
```

# Step: urgency-font-size

title: "Shadow CSS: .urgency / font-size"
summary: Kompaktan font.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:urgency-font-size
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: urgency-font-size-scene

### Narration

Kompaktan font.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}

.urgency {
  outline: 1px dotted #fb923c;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
}
```

# Step: urgency-color

title: "Shadow CSS: .urgency / color"
summary: Narandžasta boja za urgency signal.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:urgency-color
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: urgency-color-scene

### Narration

Narandžasta boja za urgency signal.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}

.urgency {
  outline: 1px dotted #fb923c;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: #fb923c;
}
```

# Step: urgency-font-weight

title: "Shadow CSS: .urgency / font-weight"
summary: Semi-bold za urgentnost.
intent: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
tag: shadow-css:urgency-font-weight
proTip: Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: urgency-font-weight-scene

### Narration

Semi-bold za urgentnost.

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  outline: 1px dashed #38bdf8;
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}

.urgency {
  outline: 1px dotted #fb923c;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: #fb923c;
  font-weight: 600;
}
```

# Step: card-summary

title: "Rezime: .card"
summary: Uklanjamo card helper outline.
intent: Card čita sve styling tokene iz host contract-a.
tag: summary:card-summary
proTip: Card čita sve styling tokene iz host contract-a.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: card-summary-scene

### Narration

Uklanjamo card helper outline.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}

ui-pricing-card[tier='pro'] {
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
}

ui-pricing-card[tier='enterprise'] {
  --pricing-accent: #f59e0b;
  --pricing-accent-strong: #d97706;
}

ui-pricing-card[popular] {
  box-shadow: var(--pricing-popular-glow, 0 0 0 2px rgba(56, 189, 248, 0.35));
  transform: scale(1.03);
  z-index: 1;
}
```

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
  /* helper outline removed */
}

.popular-badge {
  outline: 1px dotted #facc15;
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}

.urgency {
  outline: 1px dotted #fb923c;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: #fb923c;
  font-weight: 600;
}
```

# Step: badge-summary

title: "Rezime: .popular-badge"
summary: Uklanjamo badge helper outline.
intent: Badge se pojavljuje samo kada je popular atribut prisutan — CSS controlled visibility.
tag: summary:badge-summary
proTip: Badge se pojavljuje samo kada je popular atribut prisutan — CSS controlled visibility.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: badge-summary-scene

### Narration

Uklanjamo badge helper outline.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}

ui-pricing-card[tier='pro'] {
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
}

ui-pricing-card[tier='enterprise'] {
  --pricing-accent: #f59e0b;
  --pricing-accent-strong: #d97706;
}

ui-pricing-card[popular] {
  box-shadow: var(--pricing-popular-glow, 0 0 0 2px rgba(56, 189, 248, 0.35));
  transform: scale(1.03);
  z-index: 1;
}
```

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
  /* helper outline removed */
}

.popular-badge {
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
  /* helper outline removed */
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  outline: 1px dashed #a78bfa;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}

.urgency {
  outline: 1px dotted #fb923c;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: #fb923c;
  font-weight: 600;
}
```

# Step: price-summary

title: "Rezime: .price-block"
summary: Uklanjamo price helper outline.
intent: "Cena se dinamički menja toggle-om: monthly/yearly → billing atribut → updatePrice()."
tag: summary:price-summary
proTip: "Cena se dinamički menja toggle-om: monthly/yearly → billing atribut → updatePrice()."
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: price-summary-scene

### Narration

Uklanjamo price helper outline.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}

ui-pricing-card[tier='pro'] {
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
}

ui-pricing-card[tier='enterprise'] {
  --pricing-accent: #f59e0b;
  --pricing-accent-strong: #d97706;
}

ui-pricing-card[popular] {
  box-shadow: var(--pricing-popular-glow, 0 0 0 2px rgba(56, 189, 248, 0.35));
  transform: scale(1.03);
  z-index: 1;
}
```

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
  /* helper outline removed */
}

.popular-badge {
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
  /* helper outline removed */
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  /* helper outline removed */
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  outline: 1px dotted #f472b6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}

.urgency {
  outline: 1px dotted #fb923c;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: #fb923c;
  font-weight: 600;
}
```

# Step: toggle-summary

title: "Rezime: .billing-toggle"
summary: Uklanjamo billing toggle helper outline.
intent: Toggle switch vizuelno reaguje na :host([billing="yearly"]) bez JS direktne manipulacije stila.
tag: summary:toggle-summary
proTip: Toggle switch vizuelno reaguje na :host([billing="yearly"]) bez JS direktne manipulacije stila.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: toggle-summary-scene

### Narration

Uklanjamo billing toggle helper outline.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}

ui-pricing-card[tier='pro'] {
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
}

ui-pricing-card[tier='enterprise'] {
  --pricing-accent: #f59e0b;
  --pricing-accent-strong: #d97706;
}

ui-pricing-card[popular] {
  box-shadow: var(--pricing-popular-glow, 0 0 0 2px rgba(56, 189, 248, 0.35));
  transform: scale(1.03);
  z-index: 1;
}
```

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
  /* helper outline removed */
}

.popular-badge {
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
  /* helper outline removed */
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  /* helper outline removed */
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* helper outline removed */
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  outline: 1px dashed #34d399;
  padding: 8px 0;
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}

.urgency {
  outline: 1px dotted #fb923c;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: #fb923c;
  font-weight: 600;
}
```

# Step: features-summary

title: "Rezime: .feature-list"
summary: Uklanjamo feature list helper outline.
intent: Feature lista je named slot — sadržaj kontroliše parent, stilizovanje kontroliše shadow.
tag: summary:features-summary
proTip: Feature lista je named slot — sadržaj kontroliše parent, stilizovanje kontroliše shadow.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: features-summary-scene

### Narration

Uklanjamo feature list helper outline.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}

ui-pricing-card[tier='pro'] {
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
}

ui-pricing-card[tier='enterprise'] {
  --pricing-accent: #f59e0b;
  --pricing-accent-strong: #d97706;
}

ui-pricing-card[popular] {
  box-shadow: var(--pricing-popular-glow, 0 0 0 2px rgba(56, 189, 248, 0.35));
  transform: scale(1.03);
  z-index: 1;
}
```

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
  /* helper outline removed */
}

.popular-badge {
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
  /* helper outline removed */
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  /* helper outline removed */
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* helper outline removed */
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  padding: 8px 0;
  /* helper outline removed */
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  outline: 1px dashed #f97316;
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}

.urgency {
  outline: 1px dotted #fb923c;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: #fb923c;
  font-weight: 600;
}
```

# Step: cta-summary

title: "Rezime: .cta"
summary: Uklanjamo CTA helper outline.
intent: CTA emituje ui-pricing-card:subscribe event. Parent odlučuje o checkout flow-u.
tag: summary:cta-summary
proTip: CTA emituje ui-pricing-card:subscribe event. Parent odlučuje o checkout flow-u.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: cta-summary-scene

### Narration

Uklanjamo CTA helper outline.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}

ui-pricing-card[tier='pro'] {
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
}

ui-pricing-card[tier='enterprise'] {
  --pricing-accent: #f59e0b;
  --pricing-accent-strong: #d97706;
}

ui-pricing-card[popular] {
  box-shadow: var(--pricing-popular-glow, 0 0 0 2px rgba(56, 189, 248, 0.35));
  transform: scale(1.03);
  z-index: 1;
}
```

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
  /* helper outline removed */
}

.popular-badge {
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
  /* helper outline removed */
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  /* helper outline removed */
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* helper outline removed */
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  padding: 8px 0;
  /* helper outline removed */
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
  /* helper outline removed */
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}

.urgency {
  outline: 1px dotted #fb923c;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: #fb923c;
  font-weight: 600;
}
```

# Step: urgency-summary

title: "Rezime: .urgency"
summary: Uklanjamo urgency timer helper outline.
intent: "Timer je lifecycle-aware: startuje na connect, zaustavlja se na disconnect."
tag: summary:urgency-summary
proTip: "Timer je lifecycle-aware: startuje na connect, zaustavlja se na disconnect."
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: urgency-summary-scene

### Narration

Uklanjamo urgency timer helper outline.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  outline: 1px solid #f97316;
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}

ui-pricing-card[tier='pro'] {
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
}

ui-pricing-card[tier='enterprise'] {
  --pricing-accent: #f59e0b;
  --pricing-accent-strong: #d97706;
}

ui-pricing-card[popular] {
  box-shadow: var(--pricing-popular-glow, 0 0 0 2px rgba(56, 189, 248, 0.35));
  transform: scale(1.03);
  z-index: 1;
}
```

### Show Code: shadow-css

```css
:host {
  display: block;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--pricing-text, #f1f5f9);
}

.card {
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid var(--pricing-border, rgba(148, 163, 184, 0.18));
  background: linear-gradient(
    180deg,
    var(--pricing-surface, #1e293b),
    var(--pricing-surface-alt, rgba(15, 23, 42, 0.92))
  );
  box-shadow: var(--pricing-shadow, 0 16px 48px rgba(15, 23, 42, 0.4));
  text-align: center;
  /* helper outline removed */
}

.popular-badge {
  display: none;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  justify-self: center;
  /* helper outline removed */
}

:host([popular]) .popular-badge {
  display: inline-flex;
}

::slotted([slot='badge']) {
  font: inherit;
}

.tier-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--pricing-accent, #38bdf8);
}

.price-block {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  /* helper outline removed */
}

.price-currency {
  font-size: 24px;
  font-weight: 700;
  color: var(--pricing-muted, #94a3b8);
}

.price-amount {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  transition: transform 200ms ease;
}

.price-period {
  font-size: 16px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
}

.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* helper outline removed */
}

.toggle-label {
  font-size: 13px;
  color: var(--pricing-muted, #94a3b8);
  font-weight: 500;
  transition: color 180ms ease;
}

.toggle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 0;
  background: rgba(148, 163, 184, 0.2);
  cursor: pointer;
  position: relative;
  padding: 2px;
  transition: background 180ms ease;
}

.toggle-knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 180ms ease;
}

:host([billing='yearly']) .toggle-switch {
  background: var(--pricing-accent, #38bdf8);
}

:host([billing='yearly']) .toggle-knob {
  transform: translateX(20px);
}

.save-badge {
  font-size: 10px;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.feature-list {
  padding: 8px 0;
  /* helper outline removed */
}

::slotted(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  text-align: left;
  font-size: 14px;
  color: var(--pricing-muted, #94a3b8);
}

.cta {
  appearance: none;
  width: 100%;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--pricing-accent, #38bdf8),
    var(--pricing-accent-strong, #2563eb)
  );
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
  /* helper outline removed */
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:active {
  transform: translateY(0);
}

.cta:focus-visible {
  outline: 3px solid rgba(56, 189, 248, 0.45);
  outline-offset: 3px;
}

.urgency {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: #fb923c;
  font-weight: 600;
  /* helper outline removed */
}
```

# Step: host-summary

title: "Rezime: ui-pricing-card host"
summary: Uklanjamo host helper outline.
intent: Host nosi kompletno tier/popular/billing token contract bez mešanja sa shadow-om.
tag: summary:host-summary
proTip: Host nosi kompletno tier/popular/billing token contract bez mešanja sa shadow-om.
focusHtmlNeedles:

- <ui-pricing-card
- tier=

## Scene: host-summary-scene

### Narration

Uklanjamo host helper outline.

### Show Code: css

```css
.app-shell {
  outline: 1px dashed #94a3b8;
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

ui-pricing-card {
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
  /* helper outline removed */
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}

ui-pricing-card[tier='pro'] {
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
}

ui-pricing-card[tier='enterprise'] {
  --pricing-accent: #f59e0b;
  --pricing-accent-strong: #d97706;
}

ui-pricing-card[popular] {
  box-shadow: var(--pricing-popular-glow, 0 0 0 2px rgba(56, 189, 248, 0.35));
  transform: scale(1.03);
  z-index: 1;
}
```

# Step: shell-summary

title: "Rezime: .app-shell"
summary: Uklanjamo shell helper outline.
intent: Pricing kartica živi u neutralnoj sceni, spremna za integraciju u pravi pricing page.
tag: summary:shell-summary
proTip: Pricing kartica živi u neutralnoj sceni, spremna za integraciju u pravi pricing page.
focusHtmlNeedles:

- <div class="app-shell">

## Scene: shell-summary-scene

### Narration

Uklanjamo shell helper outline.

### Show Code: css

```css
.app-shell {
  padding: 48px 24px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  /* helper outline removed */
}

ui-pricing-card {
  display: block;
  width: min(100%, 380px);
  position: relative;
  --pricing-surface: #1e293b;
  --pricing-surface-alt: rgba(15, 23, 42, 0.92);
  --pricing-border: rgba(148, 163, 184, 0.18);
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
  --pricing-text: #f1f5f9;
  --pricing-muted: #94a3b8;
  --pricing-shadow: 0 16px 48px rgba(15, 23, 42, 0.4);
  --pricing-popular-glow: 0 0 0 2px rgba(56, 189, 248, 0.35);
  /* helper outline removed */
}

ui-pricing-card[tier='starter'] {
  --pricing-accent: #a78bfa;
  --pricing-accent-strong: #7c3aed;
}

ui-pricing-card[tier='pro'] {
  --pricing-accent: #38bdf8;
  --pricing-accent-strong: #2563eb;
}

ui-pricing-card[tier='enterprise'] {
  --pricing-accent: #f59e0b;
  --pricing-accent-strong: #d97706;
}

ui-pricing-card[popular] {
  box-shadow: var(--pricing-popular-glow, 0 0 0 2px rgba(56, 189, 248, 0.35));
  transform: scale(1.03);
  z-index: 1;
}
```

# Step: done

title: "Done: UI Pricing Card — SaaS Pricing Table"
summary: "`ui-pricing-card` je završen: `index.html` deklarativno koristi tier/price/popular atribute i feature slot, `ui-pricing-card.template.js` drži shadow strukturu, `ui-pricing-card.js` vodi property API, billing toggle, urgency timer i subscribe event, `style.css` theme-uje host sa tier varijantama, a `ui-pricing-card.shadow.css` drži unutrašnji styling sa toggle animacijom."
intent: "Enterprise pricing widget: šest atributa, dva slota, jedan event, billing toggle, urgency timer, tri tier varijante. Ceo tok je jednosmeran: atribut → callback → DOM."
tag: success
proTip: "Enterprise pricing widget: šest atributa, dva slota, jedan event, billing toggle, urgency timer, tri tier varijante. Ceo tok je jednosmeran: atribut → callback → DOM."

## Scene: done-scene

### Narration

`ui-pricing-card` je završen: `index.html` deklarativno koristi tier/price/popular atribute i feature slot, `ui-pricing-card.template.js` drži shadow strukturu, `ui-pricing-card.js` vodi property API, billing toggle, urgency timer i subscribe event, `style.css` theme-uje host sa tier varijantama, a `ui-pricing-card.shadow.css` drži unutrašnji styling sa toggle animacijom.

### Show Code: html

```html
<div class="app-shell">
  <ui-pricing-card
    tier="pro"
    price-monthly="29"
    price-yearly="290"
    popular
    cta-label="Start free trial"
  >
    <span slot="badge">⭐ Most Popular</span>
    <ul slot="features">
      <li>Unlimited projects</li>
      <li>Priority support</li>
      <li>Advanced analytics</li>
      <li>Team collaboration</li>
      <li>Custom integrations</li>
    </ul>
  </ui-pricing-card>
</div>
```
