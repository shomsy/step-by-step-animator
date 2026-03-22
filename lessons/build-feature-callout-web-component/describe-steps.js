const focusHtmlNeedlesBySelector = {
  '.app-shell': ['<div class="app-shell">'],
  'feature-callout': ['<feature-callout', 'slot="eyebrow"'],
  ':host': ['<feature-callout', 'slot="eyebrow"'],
  '.card': ['<feature-callout', 'slot="eyebrow"'],
  '.eyebrow': ['slot="eyebrow"', '<feature-callout'],
  '.title': ['<feature-callout'],
  '.summary': ['<feature-callout'],
  '.cta': ['<feature-callout']
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
    proTip: proTip || 'Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.',
    focusHtmlNeedles: readFocusHtmlNeedles(selector)
  };
}

function describeJsTemplateStyleStep(id, selector, property, value, desc = '', proTip = '') {
  const cssLine = `${property}: ${value};`;

  return {
    id,
    title: `JS: template / ${selector} / ${property}`,
    desc: desc || `U template string dodajemo \`${cssLine}\` za \`${selector}\`, pa se i shadow DOM stil širi liniju po liniju.`,
    tag: `js-style:${id.replace(/_/g, '-')}`,
    proTip: proTip || 'Kod Web Components lekcije i stilovi unutar shadow DOM-a moraju da rastu postepeno, ne kao gotov paket.',
    focusHtmlNeedles: readFocusHtmlNeedles(selector)
  };
}

function describeJsFlowStep(id, title, desc, proTip, focusHtmlNeedles = readFocusHtmlNeedles('feature-callout')) {
  return {
    id,
    title,
    desc,
    tag: `js:${id.replace(/_/g, '-')}`,
    proTip,
    focusHtmlNeedles
  };
}

function describeSummaryStep(id, title, desc, proTip, focusHtmlNeedles = readFocusHtmlNeedles('feature-callout')) {
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

const shellCssSteps = [
  ['shell_outline', '.app-shell', 'outline', '1px dashed #94a3b8', 'Dodajemo tanak helper outline za `.app-shell` i zadržavamo ga kroz celu lekciju, sve do završnog shell rezimea.', 'App shell ostaje stalni okvir cele demonstracije dok ne završimo ceo tutorijal.'],
  ['shell_padding', '.app-shell', 'padding', '40px', 'Dodajemo padding da komponenta dobije vazduh čim se pojavi u preview-u.'],
  ['shell_display', '.app-shell', 'display', 'grid', 'Grid je jednostavan način da centralno postavimo jedan teaching target.'],
  ['shell_place_items', '.app-shell', 'place-items', 'center', 'Centar zadržava fokus korisnika na jednoj komponenti.'],
  ['shell_min_height', '.app-shell', 'min-height', '100vh', 'Puna visina drži scenu stabilnom kroz celu lekciju.'],
  ['shell_background', '.app-shell', 'background', 'linear-gradient(180deg, #e2e8f0, #cbd5e1)', 'Svetla pozadina daje kontrast tamnoj komponenti koju gradimo.'],
  ['host_outline', 'feature-callout', 'outline', '1px solid #f97316', 'Dodajemo tanak helper outline za host element i držimo ga do završnog host rezimea.', 'Pre registracije custom elementa host je glavni teaching target i zato ostaje jasno obeležen.'],
  ['host_display', 'feature-callout', 'display', 'block', 'Host pretvaramo u block da zauzme svoj red i dobije realan footprint.'],
  ['host_width', 'feature-callout', 'width', 'min(100%, 420px)', 'Širinu zaključavamo rano da card skeleton ne šeta po sceni.'],
  ['host_surface_token', 'feature-callout', '--callout-surface', '#0f172a', 'Spolja uvodimo surface token koji shadow DOM kasnije povlači kroz `var(...)`.'],
  ['host_border_token', 'feature-callout', '--callout-border', 'rgba(148,163,184,0.24)', 'Border token služi da spolja theme-ujemo ivicu komponente.'],
  ['host_accent_token', 'feature-callout', '--callout-accent', '#38bdf8', 'Accent token će obojiti badge i CTA unutar shadow DOM-a.'],
  ['host_text_token', 'feature-callout', '--callout-text', '#e2e8f0', 'Text token daje konzistentnu boju celom Web Component sadržaju.']
];

const templateStyleSteps = [
  ['host_font', ':host', 'font-family', 'Inter, ui-sans-serif, system-ui, sans-serif', 'Počinje unutrašnji template CSS: host dobija isti font kao ostatak scene.'],
  ['host_color', ':host', 'color', 'var(--callout-text, #e2e8f0)', 'Host odmah koristi spoljašnji text token, pa vidiš kako custom property prolazi kroz granicu shadow DOM-a.'],
  ['card_outline', '.card', 'outline', '1px dashed #38bdf8', 'Dodajemo helper outline za glavni card blok i držimo ga do završnog card rezimea.', 'Glavni card outline ostaje dok ne završimo celu unutrašnju celinu.'],
  ['card_display', '.card', 'display', 'grid', 'Card raspored uvodimo grid-om jer imamo vertikalnu stack strukturu.'],
  ['card_gap', '.card', 'gap', '16px', 'Gap odvaja badge, naslov, opis i CTA.'],
  ['card_padding', '.card', 'padding', '24px', 'Padding pravi pravi card footprint unutar shadow DOM-a.'],
  ['card_radius', '.card', 'border-radius', '28px', 'Zaobljenje daje modernu card siluetu.'],
  ['card_border', '.card', 'border', '1px solid var(--callout-border, rgba(148,163,184,0.24))', 'Ivica koristi host token, pa spoljašnji CSS zaista utiče na unutrašnji card.'],
  ['card_background', '.card', 'background', 'linear-gradient(180deg, rgba(15,23,42,0.98), rgba(15,23,42,0.92))', 'Tamna pozadina zatvara card kao jasnu, samostalnu celinu.'],
  ['card_shadow', '.card', 'box-shadow', '0 26px 60px rgba(15,23,42,0.24)', 'Shadow daje card-u odvajanje od pozadine i završava osnovni volume.'],
  ['eyebrow_outline', '.eyebrow', 'outline', '1px dotted #facc15', 'Dodajemo helper outline za eyebrow badge i držimo ga do završnog eyebrow rezimea.', 'Badge je mali element i zato mu outline posebno pomaže tokom objašnjenja.'],
  ['eyebrow_display', '.eyebrow', 'display', 'inline-flex', 'Badge ostaje kompakatan i prirodno prati svoj sadržaj.'],
  ['eyebrow_padding', '.eyebrow', 'padding', '8px 12px', 'Padding daje badge-u jasan pill footprint.'],
  ['eyebrow_radius', '.eyebrow', 'border-radius', '999px', 'Veliki radius zatvara badge u kapsulu.'],
  ['eyebrow_background', '.eyebrow', 'background', 'rgba(56,189,248,0.14)', 'Poluprovidna pozadina pravi nežan badge signal.'],
  ['eyebrow_color', '.eyebrow', 'color', 'var(--callout-accent, #38bdf8)', 'Boju badge-a takođe vežemo za host accent token.'],
  ['eyebrow_font_size', '.eyebrow', 'font-size', '12px', 'Manji font čini badge sekundarnim, ali čitljivim.'],
  ['eyebrow_font_weight', '.eyebrow', 'font-weight', '700', 'Težina fonta čini badge labelu kompaktnom i jasnom.'],
  ['title_display', '.title', 'display', 'block', 'Naslovu dajemo sopstveni red da ne deli liniju sa drugim delovima.'],
  ['title_font_size', '.title', 'font-size', '28px', 'Naslov dobija dominantnu veličinu card komponente.'],
  ['title_font_weight', '.title', 'font-weight', '800', 'Pojačavamo naslov da odmah nosi hijerarhiju.'],
  ['summary_margin', '.summary', 'margin', '0', 'Brišemo podrazumevani paragraf margin da spacing kontrolišemo iz card gap-a.'],
  ['summary_color', '.summary', 'color', '#cbd5e1', 'Opis dobija prigušenu, ali čitljivu boju.'],
  ['summary_line_height', '.summary', 'line-height', '1.65', 'Line-height otvara tekst i čini ga lakšim za čitanje.'],
  ['cta_outline', '.cta', 'outline', '1px dashed #34d399', 'Dodajemo helper outline za CTA i držimo ga do završnog CTA rezimea.', 'CTA outline ostaje dok ne zaključimo poslednju interaktivnu zonu.'],
  ['cta_justify_self', '.cta', 'justify-self', 'start', 'CTA ostaje uz levu ivicu card sadržaja umesto da se rasteže.'],
  ['cta_padding', '.cta', 'padding', '12px 16px', 'Padding daje dugmetu njegovu klik zonu.'],
  ['cta_border', '.cta', 'border', '0', 'Uklanjamo podrazumevanu border liniju dugmeta.'],
  ['cta_radius', '.cta', 'border-radius', '999px', 'Pil radius drži CTA vizuelno bliskim badge logici.'],
  ['cta_background', '.cta', 'background', 'linear-gradient(135deg, var(--callout-accent, #38bdf8), #2563eb)', 'CTA koristi accent token u gradijentu i zato živi iz istog theme vocabulary-ja.'],
  ['cta_color', '.cta', 'color', '#ffffff', 'Beli tekst drži jasan kontrast preko gradijenta.'],
  ['cta_font_weight', '.cta', 'font-weight', '700', 'Težina fonta zatvara CTA kao jasan action element.']
];

export const lessonSteps = [
  describeHtmlElementStep(
    'empty_shell',
    'Start: Empty App Shell',
    'Počinjemo od praznog `.app-shell` prostora. Goal slika iznad pokazuje finalni Web Component koji tek treba da oživi kroz HTML, CSS i vanilla JavaScript.',
    'html:app-shell',
    'Neutralan početak odvaja postojeći page shell od komponente koju tek gradimo.',
    ['<div class="app-shell">']
  ),
  describeHtmlElementStep(
    'component_html',
    'HTML: Feature Callout Host',
    'Dodajemo `<feature-callout>` host sa `title` i `cta-label` atributima. Još nije registrovan, ali browser već vidi custom tag i njegov sirovi sadržaj.',
    'html:feature-callout',
    'Naziv custom elementa mora da sadrži crticu. To je osnovno pravilo registracije custom elementa.',
    ['<feature-callout']
  ),
  describeHtmlElementStep(
    'eyebrow_slot_html',
    'HTML: Named Slot Content',
    'U host ubacujemo `<span slot="eyebrow">Vanilla JS</span>`. To je light DOM sadržaj koji će kasnije upasti u named slot unutar shadow DOM-a.',
    'html:slot-eyebrow',
    'Named slot je najjednostavniji način da spolja projiciraš mali, ciljani deo sadržaja u komponentu.',
    ['slot="eyebrow"', '<feature-callout']
  ),
  describeHtmlElementStep(
    'summary_text_html',
    'HTML: Default Slot Text',
    'Dodajemo opisni tekst kao default slot sadržaj. Pre registracije komponente vidiš ga kao običan sadržaj custom taga; posle registracije odlazi u `<slot>` unutar template-a.',
    'html:default-slot',
    'Ovo je važan momenat: light DOM i shadow DOM nisu ista stvar, ali mogu da sarađuju kroz slot projekciju.',
    ['<feature-callout', 'slot="eyebrow"']
  ),
  ...shellCssSteps.map(config => describeCssPropertyStep(...config)),
  describeJsFlowStep(
    'template_declaration',
    'JS: Kreiramo Template',
    'Počinjemo sa `document.createElement(\'template\')`. Template nam daje inertan komad DOM-a koji možemo bezbedno da kloniramo u svakoj instanci komponente.',
    'Template je prirodan temelj kada želiš da isti shadow DOM markup i stilovi budu dostupni za svaku novu instancu komponente.'
  ),
  describeJsFlowStep(
    'template_markup_open',
    'JS: Otvaramo Template String',
    'Dodajemo `template.innerHTML = \\`` i od tog trenutka gradimo ceo shadow DOM sadržaj iz jednog kontrolisanog izvora.',
    'Engine i ovde mora da ostane pošten: template string raste postepeno, ne uleće gotov.'
  ),
  ...templateStyleSteps.map(config => describeJsTemplateStyleStep(...config)),
  describeJsFlowStep(
    'card_markup',
    'JS: Dodajemo Shadow DOM Markup',
    'Sada ubacujemo unutrašnji markup: card wrapper, named slot za eyebrow, naslov, paragraf sa default slotom i CTA dugme.',
    'Tek kada template ima i stil i markup, ima smisla da ga kloniramo u shadow root.'
  ),
  describeJsFlowStep(
    'class_declaration',
    'JS: Class Extends HTMLElement',
    'Otvaramo `class FeatureCallout extends HTMLElement`. Time browseru kažemo da naš custom element ima sopstveno ponašanje.',
    'Custom element je i dalje običan DOM element, samo sa tvojom klasom i tvojim lifecycle ponašanjem.'
  ),
  describeJsFlowStep(
    'constructor_shadow',
    'JS: constructor + attachShadow',
    'U konstruktoru pozivamo `super()` i odmah otvaramo `this.attachShadow({ mode: \'open\' })` da komponenta dobije sopstveni shadow root.',
    'Shadow root je granica komponente: unutrašnji markup i stilovi žive iza nje.'
  ),
  describeJsFlowStep(
    'constructor_clone',
    'JS: Kloniramo Template',
    'Dodajemo `appendChild(template.content.cloneNode(true))`, pa svaka instanca komponente dobija isti početni shadow DOM skeleton.',
    'Kloniranje template-a je najčistiji način da jednu definiciju koristiš u više instanci.'
  ),
  describeJsFlowStep(
    'constructor_cache_title',
    'JS: Keširamo Title Element',
    'U konstruktoru čuvamo referencu na `.title` element, da ga kasnije ne tražimo iznova pri svakom renderu.',
    'Mali cache DOM referenci drži render jasan i predvidiv.'
  ),
  describeJsFlowStep(
    'constructor_cache_cta',
    'JS: Keširamo CTA Element',
    'Na isti način čuvamo referencu na `.cta`, jer će tekst dugmeta stizati iz atributa host elementa.',
    'Render treba da govori šta menja, ne da svaki put iznova objašnjava kako traži iste čvorove.'
  ),
  describeJsFlowStep(
    'define_element',
    'JS: Registrujemo Custom Element',
    'Pozivamo `customElements.define(\'feature-callout\', FeatureCallout)`. Od ovog trenutka browser zna kako da upgrade-uje `<feature-callout>` u pravu komponentu.',
    'Registracija je trenutak kada custom tag prestaje da bude samo nepoznati HTML i postaje aktivna komponenta.'
  ),
  describeJsFlowStep(
    'render_declaration',
    'JS: Uvodimo render()',
    'Dodajemo `render()` metodu kao jedno mesto gde atributi host elementa prelaze u konkretan UI tekst unutar shadow DOM-a.',
    'Jedan render ulaz čini komponentu lakšom za kasnije promene i objašnjenja.'
  ),
  describeJsFlowStep(
    'render_title',
    'JS: render() Popunjava Title',
    'U `render()` čitamo `title` atribut i upisujemo ga u `.title` element. Time host atribut postaje stvaran UI sadržaj u komponenti.',
    'Atributi su spoljašnji API komponente; render je mesto gde taj API dobija vizuelni rezultat.'
  ),
  describeJsFlowStep(
    'render_cta',
    'JS: render() Popunjava CTA',
    'Na isti način `cta-label` atribut pretvaramo u tekst CTA dugmeta.',
    'Kad dve stvari rade istu vrstu posla, drži ih u istom render toku.'
  ),
  describeJsFlowStep(
    'connected_callback',
    'JS: connectedCallback Pokreće Prvi Render',
    'Dodajemo `connectedCallback()` i u njemu pozivamo `this.render()`, pa komponenta dobija sadržaj čim uđe u DOM.',
    'Prvi render je prirodno vezati za trenutak kada je element stvarno povezan sa dokumentom.'
  ),
  describeJsFlowStep(
    'observed_attributes',
    'JS: observedAttributes',
    'Dodajemo `static observedAttributes = [\'title\', \'cta-label\']`, pa browser zna koje promene atributa treba da javi komponenti.',
    'Ako komponenta treba da reaguje na promenu atributa, prvo mora eksplicitno da kaže koje atribute prati.'
  ),
  describeJsFlowStep(
    'attribute_changed_callback',
    'JS: attributeChangedCallback',
    'Dodajemo `attributeChangedCallback()` i ponovo pozivamo `this.render()`. Tako komponenta ostaje sinhronizovana i kada se atributi promene posle prvog mount-a.',
    'Ovo je važna razlika između statičnog HTML snimka i stvarne, žive komponente.'
  ),
  describeSummaryStep(
    'card_summary',
    'Rezime: .card unutar template-a',
    'Rezimiramo glavni card blok i tek sada uklanjamo njegov helper outline, jer je unutrašnja struktura komponente već potpuno jasna.',
    'Helper outline za glavni card ostaje dok i markup i stil i ponašanje ne budu dovoljno čitljivi.'
  ),
  describeSummaryStep(
    'eyebrow_summary',
    'Rezime: .eyebrow unutar template-a',
    'Rezimiramo eyebrow badge i uklanjamo njegov helper outline tek sada, kada slot projekcija i badge stil rade zajedno.',
    'Slot je ovde važan deo lekcije, pa helper outline ostaje dok named slot ne postane jasan.'
  ),
  describeSummaryStep(
    'cta_summary',
    'Rezime: .cta unutar template-a',
    'Rezime za CTA dugme: helper outline više nije potreban, jer završni stil i render već jasno pokazuju njegovu ulogu.',
    'Outline služi učenju; kad je element potpuno objašnjen, može da nestane.'
  ),
  describeSummaryStep(
    'host_summary',
    'Rezime: feature-callout host',
    'Završni host rezime: spoljašnji outline host elementa više nije potreban, jer su API atributi i theme tokeni sada jasni.',
    'Host outline ostaje dok ne pokažemo i spoljašnji API i unutrašnju implementaciju komponente.'
  ),
  describeSummaryStep(
    'shell_summary',
    'Rezime: .app-shell',
    'Tek sada uklanjamo helper outline sa `.app-shell`, jer je cela Web Components lekcija kompletna i okvir više nije potreban.',
    'App shell outline ostaje sve vreme kao teaching okvir i nestaje tek na samom kraju lekcije.',
    ['<div class="app-shell">']
  ),
  describeFinishedStep(
    'done',
    'Done: Feature Callout Web Component',
    'Lekcija je završena: od praznog shell-a stigli smo do pravog custom elementa sa host atributima, slotovima, shadow DOM-om i render lifecycle-om.',
    'Sledeći logičan korak je da napraviš drugu komponentu sa više slotova ili da uvedeš `part` i `exportparts` kao napredniji nivo.'
  )
];

export const stepNumberById = Object.fromEntries(
  lessonSteps.map((step, index) => [step.id, index])
);
