const focusHtmlNeedlesBySelector = {
  '.app-shell': ['<div class="app-shell">'],
  'callout-card': ['<callout-card'],
  'callout-card .card': ['<callout-card'],
  'callout-card .eyebrow': ['<callout-card'],
  'callout-card .title': ['<callout-card'],
  'callout-card .summary': ['<callout-card'],
  'callout-card .cta': ['<callout-card']
};

function readFocusHtmlNeedles(selector) {
  return focusHtmlNeedlesBySelector[selector] || [];
}

function describeHtmlElementStep(id, title, desc, tag, proTip, focusHtmlNeedles = []) {
  return { id, title, desc, tag, proTip, focusHtmlNeedles };
}

function describeCssPropertyStep(id, selector, property, value, desc = '', proTip = '') {
  const cssLine = `${property}: ${value};`;

  return {
    id,
    title: `CSS: ${selector} / ${property}`,
    desc: desc || `Dodajemo \`${cssLine}\` u \`${selector}\` i širimo stylesheet jedan property po korak.`,
    tag: `css:${id.replace(/_/g, '-')}`,
    proTip: proTip || 'U light DOM custom element lekciji globalni CSS direktno stilizuje markup koji komponenta renderuje kroz JavaScript.',
    focusHtmlNeedles: readFocusHtmlNeedles(selector)
  };
}

function describeJsFlowStep(id, title, desc, proTip, focusHtmlNeedles = readFocusHtmlNeedles('callout-card')) {
  return {
    id,
    title,
    desc,
    tag: `js:${id.replace(/_/g, '-')}`,
    proTip,
    focusHtmlNeedles
  };
}

function describeSummaryStep(id, title, desc, proTip, focusHtmlNeedles = readFocusHtmlNeedles('callout-card')) {
  return {
    id,
    title,
    desc,
    tag: `summary:${id.replace(/_/g, '-')}`,
    proTip,
    focusHtmlNeedles
  };
}

function describeFinishedStep(id, title, desc, proTip) {
  return { id, title, desc, tag: 'success', proTip };
}

const cssSteps = [
  ['shell_outline', '.app-shell', 'outline', '1px dashed #94a3b8', 'Dodajemo helper outline za `.app-shell` i zadržavamo ga do završnog shell rezimea.', 'App shell ostaje stalni teaching okvir kroz celu lekciju.'],
  ['shell_padding', '.app-shell', 'padding', '40px', 'Padding daje komponenti prostor da se vidi kao zaseban teaching target.'],
  ['shell_display', '.app-shell', 'display', 'grid', 'Grid je dovoljan da centriramo jedan card use case.'],
  ['shell_place_items', '.app-shell', 'place-items', 'center', 'Centar čuva fokus na komponenti koju gradimo.'],
  ['shell_min_height', '.app-shell', 'min-height', '100vh', 'Puna visina stabilizuje preview scenu.'],
  ['shell_background', '.app-shell', 'background', 'linear-gradient(180deg, #e2e8f0, #cbd5e1)', 'Svetla pozadina daje kontrast tamnom callout card-u.'],
  ['host_outline', 'callout-card', 'outline', '1px solid #f97316', 'Dodajemo helper outline za host element i držimo ga do završnog host rezimea.', 'Pre rendera, host je jedino što browser zaista vidi i zato mora da ostane jasan.'],
  ['host_display', 'callout-card', 'display', 'block', 'Host pretvaramo u block da dobije pravi footprint.'],
  ['host_width', 'callout-card', 'width', 'min(100%, 420px)', 'Širinu zaključavamo rano da card kasnije uleti u stabilan okvir.'],
  ['card_outline', 'callout-card .card', 'outline', '1px dashed #38bdf8', 'Kada komponenta renderuje light DOM markup, glavni `.card` dobija helper outline do završnog card rezimea.', 'Glavni card outline ostaje dok ceo light DOM blok ne postane jasan.'],
  ['card_display', 'callout-card .card', 'display', 'grid', 'Card raspored uvodimo grid-om jer imamo vertikalnu stack strukturu.'],
  ['card_gap', 'callout-card .card', 'gap', '16px', 'Gap odvaja badge, naslov, opis i CTA.'],
  ['card_padding', 'callout-card .card', 'padding', '24px', 'Padding pravi card footprint unutar host elementa.'],
  ['card_radius', 'callout-card .card', 'border-radius', '28px', 'Zaobljenje daje card-u mekšu siluetu.'],
  ['card_border', 'callout-card .card', 'border', '1px solid rgba(148,163,184,0.24)', 'Tanka border linija odvaja card od pozadine.'],
  ['card_background', 'callout-card .card', 'background', 'linear-gradient(180deg, rgba(15,23,42,0.98), rgba(15,23,42,0.92))', 'Tamna pozadina zatvara glavni vizuelni blok.'],
  ['card_shadow', 'callout-card .card', 'box-shadow', '0 26px 60px rgba(15,23,42,0.24)', 'Shadow daje card-u dubinu i separaciju.'],
  ['eyebrow_outline', 'callout-card .eyebrow', 'outline', '1px dotted #facc15', 'Badge dobija helper outline i zadržava ga do eyebrow rezimea.', 'Mali elementi traže poseban outline da bi ostali čitljivi tokom objašnjenja.'],
  ['eyebrow_display', 'callout-card .eyebrow', 'display', 'inline-flex', 'Badge ostaje kompaktan i prati svoj sadržaj.'],
  ['eyebrow_padding', 'callout-card .eyebrow', 'padding', '8px 12px', 'Padding daje badge-u njegov pill footprint.'],
  ['eyebrow_radius', 'callout-card .eyebrow', 'border-radius', '999px', 'Veliki radius zatvara badge u kapsulu.'],
  ['eyebrow_background', 'callout-card .eyebrow', 'background', 'rgba(56,189,248,0.14)', 'Blaga pozadina daje badge-u površinu bez agresivnosti.'],
  ['eyebrow_color', 'callout-card .eyebrow', 'color', '#38bdf8', 'Accent boja badge signalizira kategoriju.'],
  ['eyebrow_font_size', 'callout-card .eyebrow', 'font-size', '12px', 'Badge ostaje mali i sekundaran.'],
  ['eyebrow_font_weight', 'callout-card .eyebrow', 'font-weight', '700', 'Jača težina fonta čini labelu jasnom.'],
  ['title_font_size', 'callout-card .title', 'font-size', '28px', 'Naslov dobija dominantnu veličinu unutar card-a.'],
  ['title_font_weight', 'callout-card .title', 'font-weight', '800', 'Pojačavamo naslov da odmah nosi hijerarhiju.'],
  ['summary_margin', 'callout-card .summary', 'margin', '0', 'Brišemo default paragraf margin da spacing bude pod kontrolom.'],
  ['summary_color', 'callout-card .summary', 'color', '#cbd5e1', 'Opis dobija prigušenu, ali čitljivu boju.'],
  ['summary_line_height', 'callout-card .summary', 'line-height', '1.65', 'Veći line-height otvara tekst za lakše čitanje.'],
  ['cta_outline', 'callout-card .cta', 'outline', '1px dashed #34d399', 'CTA dobija helper outline i zadržava ga do završnog CTA rezimea.', 'CTA outline ostaje dok poslednja interaktivna zona ne bude potpuno objašnjena.'],
  ['cta_padding', 'callout-card .cta', 'padding', '12px 16px', 'Padding daje dugmetu njegovu klik zonu.'],
  ['cta_border', 'callout-card .cta', 'border', '0', 'Uklanjamo podrazumevanu border liniju dugmeta.'],
  ['cta_radius', 'callout-card .cta', 'border-radius', '999px', 'Pil oblik čini CTA konzistentnim sa badge oblikom.'],
  ['cta_background', 'callout-card .cta', 'background', 'linear-gradient(135deg, #38bdf8, #2563eb)', 'Gradijent daje CTA-u energiju i fokus.'],
  ['cta_color', 'callout-card .cta', 'color', '#ffffff', 'Beli tekst pravi jasan kontrast preko dugmeta.'],
  ['cta_font_weight', 'callout-card .cta', 'font-weight', '700', 'Jači font zatvara CTA kao jasan action element.']
];

export const lessonSteps = [
  describeHtmlElementStep(
    'empty_shell',
    'Start: Empty App Shell',
    'Počinjemo od praznog `.app-shell` prostora. Ova prva Web Components lekcija objašnjava custom element osnove bez shadow DOM-a.',
    'html:app-shell',
    'Prvo naučimo host element i render flow, pa tek onda prelazimo na shadow DOM lekciju.',
    ['<div class="app-shell">']
  ),
  describeHtmlElementStep(
    'component_html',
    'HTML: callout-card Host',
    'Dodajemo `<callout-card>` host sa `title` i `cta-label` atributima. Browser ga za sada vidi samo kao nepoznati custom tag koji čeka registraciju.',
    'html:callout-card',
    'Naziv custom elementa mora da sadrži crticu. To je prvi uslov da ga kasnije registruješ.',
    ['<callout-card']
  ),
  ...cssSteps.map(config => describeCssPropertyStep(...config)),
  describeJsFlowStep(
    'class_declaration',
    'JS: Class Extends HTMLElement',
    'Otvaramo `class CalloutCard extends HTMLElement` i time zadajemo ponašanje budućem custom elementu.',
    'Custom element je DOM element sa tvojom klasom, ne neka posebna magija van platforme.'
  ),
  describeJsFlowStep(
    'connected_callback',
    'JS: connectedCallback',
    'Dodajemo `connectedCallback()`, jer je to najjednostavniji lifecycle hook za prvi render čim element uđe u DOM.',
    'Za uvodnu lekciju connectedCallback je najpraktičnija ulazna tačka pre nego što uvedemo složeniji render tok.'
  ),
  describeJsFlowStep(
    'read_title_attribute',
    'JS: Čitamo title Atribut',
    'U lifecycle metodi čitamo `title` atribut sa host elementa. Time host HTML postaje spoljašnji API komponente.',
    'Atributi su najjednostavniji prvi API za custom element koji ne traži framework ni dodatni state.'
  ),
  describeJsFlowStep(
    'read_cta_attribute',
    'JS: Čitamo cta-label Atribut',
    'Na isti način čitamo i `cta-label`, kako bi i tekst CTA dugmeta dolazio iz host HTML-a.',
    'Ako dva podatka dolaze spolja, drži ih u istom, lako čitljivom toku.'
  ),
  describeJsFlowStep(
    'render_inner_html',
    'JS: Renderujemo Light DOM Markup',
    'Kroz `this.innerHTML` ubacujemo card markup direktno u host element. To je najdirektniji put da vidiš kako custom element može da generiše sopstveni light DOM.',
    'Ova lekcija namerno ostaje bez shadow DOM-a, da bi render mehanika i globalni CSS bili potpuno transparentni.'
  ),
  describeJsFlowStep(
    'define_element',
    'JS: Registrujemo callout-card',
    'Pozivamo `customElements.define(\'callout-card\', CalloutCard)`. Od tog trenutka browser zna kako da upgrade-uje svaki `<callout-card>` u stvarnu komponentu.',
    'Registracija je trenutak kada nepoznati tag postaje živi custom element.'
  ),
  describeSummaryStep(
    'card_summary',
    'Rezime: .card',
    'Rezimiramo glavni `.card` blok i uklanjamo njegov helper outline tek sada, kada su host, render i glavni vizuelni sloj zajedno jasni.',
    'Outline ostaje dok markup i stil ne počnu da pričaju istu priču.'
  ),
  describeSummaryStep(
    'eyebrow_summary',
    'Rezime: .eyebrow',
    'Rezimiramo eyebrow badge i tek sada uklanjamo njegov helper outline, jer je cela tekstualna hijerarhija card-a završena.',
    'Mali badge outline služi orijentaciji dok se ne slože i forma i boja i tipografija.'
  ),
  describeSummaryStep(
    'cta_summary',
    'Rezime: .cta',
    'Rezime za CTA dugme: helper outline više nije potreban, jer završni stil i render već jasno pokazuju njegovu ulogu.',
    'Outline služi učenju; kad je CTA jasan, može da nestane.'
  ),
  describeSummaryStep(
    'host_summary',
    'Rezime: callout-card host',
    'Završni host rezime: uklanjamo host outline tek sada, kada su i atribut API i render flow potpuno jasni.',
    'Host outline ostaje dok ne objasnimo i HTML API i JavaScript registraciju.'
  ),
  describeSummaryStep(
    'shell_summary',
    'Rezime: .app-shell',
    'Tek sada uklanjamo helper outline sa `.app-shell`, jer je cela uvodna custom element lekcija kompletna.',
    'App shell outline ostaje sve vreme kao teaching okvir i nestaje tek na kraju lekcije.',
    ['<div class="app-shell">']
  ),
  describeFinishedStep(
    'done',
    'Done: Light DOM Custom Element',
    'Prva Web Components lekcija je gotova. Sad razumeš host tag, registraciju, atribute i render kroz light DOM. Sledeći prirodan korak je shadow DOM lekcija.',
    'Najbolji nastavak je lekcija 2/2, gde isti problem rešavamo kroz template, shadow DOM i slotove.'
  )
];

export const stepNumberById = Object.fromEntries(
  lessonSteps.map((step, index) => [step.id, index])
);
