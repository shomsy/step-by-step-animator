const focusHtmlNeedlesBySelector = {
  '.app-shell': ['<div class="app-shell">'],
  'my-first-component': ['<my-first-component', 'slot="eyebrow"'],
  ':host': ['<my-first-component', 'slot="eyebrow"'],
  '.card': ['<my-first-component', 'slot="eyebrow"'],
  '.eyebrow': ['slot="eyebrow"', '<my-first-component'],
  '.title': ['<my-first-component'],
  '.summary': ['<my-first-component'],
  '.cta': ['<my-first-component'],
  '.cta:hover': ['<my-first-component'],
  '.cta:active': ['<my-first-component'],
  '.cta:focus-visible': ['<my-first-component']
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
    proTip: proTip || 'Spoljašnji CSS stilizuje host element i definiše theme tokene koje Web Component povlači iz custom properties.',
    focusHtmlNeedles: readFocusHtmlNeedles(selector)
  };
}

function describeShadowCssPropertyStep(id, selector, property, value, desc = '', proTip = '') {
  const cssLine = `${property}: ${value};`;

  return {
    id,
    title: `Shadow CSS: ${selector} / ${property}`,
    desc: desc || `U \`shadow-dom-style.css\` dodajemo \`${cssLine}\` za \`${selector}\`.`,
    tag: `shadow-css:${id.replace(/_/g, '-')}`,
    proTip: proTip || 'CSS ostaje u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.',
    focusHtmlNeedles: readFocusHtmlNeedles(selector)
  };
}

function describeTemplateJsStep(id, title, desc, proTip) {
  return {
    id,
    title,
    desc,
    tag: `template-js:${id.replace(/_/g, '-')}`,
    proTip,
    focusHtmlNeedles: readFocusHtmlNeedles('my-first-component')
  };
}

function describeJsFlowStep(id, title, desc, proTip, focusHtmlNeedles = readFocusHtmlNeedles('my-first-component')) {
  return {
    id,
    title,
    desc,
    tag: `js:${id.replace(/_/g, '-')}`,
    proTip,
    focusHtmlNeedles
  };
}

function describeSummaryStep(id, title, desc, proTip, focusHtmlNeedles = readFocusHtmlNeedles('my-first-component')) {
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
  ['host_outline', 'my-first-component', 'outline', '1px solid #f97316', 'Dodajemo tanak helper outline za host element i držimo ga do završnog host rezimea.', 'Host je i dalje spoljašnji API komponente; template markup sada živi u svom modulu.'],
  ['host_display', 'my-first-component', 'display', 'block', 'Host pretvaramo u block da zauzme svoj red i dobije realan footprint.'],
  ['host_width', 'my-first-component', 'width', 'min(100%, 420px)', 'Širinu zaključavamo rano da card skeleton ne šeta po sceni.'],
  ['host_surface_token', 'my-first-component', '--callout-surface', '#0f172a', 'Spolja uvodimo surface token koji adopted stylesheet kasnije povlači kroz `var(...)`.'],
  ['host_surface_alt_token', 'my-first-component', '--callout-surface-alt', 'rgba(15, 23, 42, 0.92)', 'Dodajemo i drugi surface ton da unutrašnji gradijent ne zavisi od hardkodovanog fallback-a.'],
  ['host_border_token', 'my-first-component', '--callout-border', 'rgba(148,163,184,0.24)', 'Border token služi da spolja theme-ujemo ivicu komponente.'],
  ['host_accent_token', 'my-first-component', '--callout-accent', '#38bdf8', 'Accent token će obojiti badge i CTA unutar komponente.'],
  ['host_accent_strong_token', 'my-first-component', '--callout-accent-strong', '#2563eb', 'Jači accent ton služi za dublji kraj CTA gradijenta.'],
  ['host_text_token', 'my-first-component', '--callout-text', '#e2e8f0', 'Text token daje konzistentnu boju celom Web Component sadržaju.'],
  ['host_muted_token', 'my-first-component', '--callout-muted', '#cbd5e1', 'Muted token služi sekundarnom tekstu unutar komponente.'],
  ['host_shadow_token', 'my-first-component', '--callout-shadow', '0 26px 60px rgba(15, 23, 42, 0.24)', 'Shadow token prebacuje i dubinu komponente u spoljašnji theme sloj.']
];

const stylesheetSteps = [
  ['host_font', ':host', 'font-family', 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', 'Počinje constructed stylesheet: host dobija isti font stack kao i ostatak scene.'],
  ['host_color', ':host', 'color', 'var(--callout-text, #e2e8f0)', 'Host odmah koristi spoljašnji text token, pa vidiš kako custom property prolazi kroz granicu shadow DOM-a.'],
  ['card_outline', '.card', 'outline', '1px dashed #38bdf8', 'Dodajemo helper outline za glavni card blok i držimo ga do završnog card rezimea.', 'Glavni card outline ostaje dok ne završimo celu unutrašnju celinu.'],
  ['card_display', '.card', 'display', 'grid', 'Card raspored uvodimo grid-om jer imamo vertikalnu stack strukturu.'],
  ['card_gap', '.card', 'gap', '16px', 'Gap odvaja badge, naslov, opis i CTA.'],
  ['card_padding', '.card', 'padding', '24px', 'Padding pravi pravi card footprint unutar komponente.'],
  ['card_radius', '.card', 'border-radius', '28px', 'Zaobljenje daje modernu card siluetu.'],
  ['card_border', '.card', 'border', '1px solid var(--callout-border, rgba(148,163,184,0.24))', 'Ivica koristi host token, pa spoljašnji CSS zaista utiče na unutrašnji card.'],
  ['card_background', '.card', 'background', 'linear-gradient(180deg, var(--callout-surface, rgba(15,23,42,0.98)), var(--callout-surface-alt, rgba(15,23,42,0.92)))', 'Tamna pozadina sada čita oba surface tokena direktno sa host elementa.'],
  ['card_shadow', '.card', 'box-shadow', 'var(--callout-shadow, 0 26px 60px rgba(15,23,42,0.24))', 'Shadow sada takođe čita spoljašnji token.'],
  ['eyebrow_outline', '.eyebrow', 'outline', '1px dotted #facc15', 'Dodajemo helper outline za eyebrow badge.', 'Badge je mali element i outline mu posebno pomaže tokom objašnjenja.'],
  ['eyebrow_display', '.eyebrow', 'display', 'inline-flex', 'Badge ostaje kompakatan i prirodno prati svoj sadržaj.'],
  ['eyebrow_align_items', '.eyebrow', 'align-items', 'center', 'Vertikalno centriramo sadržaj badge-a.'],
  ['eyebrow_justify_content', '.eyebrow', 'justify-content', 'center', 'Tekst badge-a ostaje simetrično centriran.'],
  ['eyebrow_width', '.eyebrow', 'width', 'fit-content', 'Badge širinu vežemo isključivo za sadržaj.'],
  ['eyebrow_padding', '.eyebrow', 'padding', '8px 12px', 'Padding daje badge-u jasan pill footprint.'],
  ['eyebrow_radius', '.eyebrow', 'border-radius', '999px', 'Veliki radius zatvara badge u kapsulu.'],
  ['eyebrow_background', '.eyebrow', 'background', 'rgba(56,189,248,0.14)', 'Poluprovidna pozadina pravi nežan badge signal.'],
  ['eyebrow_color', '.eyebrow', 'color', 'var(--callout-accent, #38bdf8)', 'Boju badge-a vežemo za host accent token.'],
  ['eyebrow_font_size', '.eyebrow', 'font-size', '12px', 'Manji font čini badge sekundarnim.'],
  ['eyebrow_font_weight', '.eyebrow', 'font-weight', '700', 'Težina fonta čini badge labelu kompaktnom.'],
  ['eyebrow_letter_spacing', '.eyebrow', 'letter-spacing', '0.04em', 'Mali tracking daje badge-u urednji karakter.'],
  ['eyebrow_text_transform', '.eyebrow', 'text-transform', 'uppercase', 'Uppercase zatvara eyebrow kao jasnu oznaku kategorije.'],
  ['title_display', '.title', 'display', 'block', 'Naslovu dajemo sopstveni red.'],
  ['title_margin', '.title', 'margin', '0', 'Gasimo podrazumevani margin.'],
  ['title_font_size', '.title', 'font-size', 'clamp(1.75rem, 4vw, 2rem)', 'Naslov dobija responzivnu veličinu.'],
  ['title_line_height', '.title', 'line-height', '1.1', 'Kraći line-height drži naslov zategnutim.'],
  ['title_font_weight', '.title', 'font-weight', '800', 'Pojačavamo naslov da nosi hijerarhiju.'],
  ['summary_margin', '.summary', 'margin', '0', 'Brišemo podrazumevani paragraf margin.'],
  ['summary_color', '.summary', 'color', 'var(--callout-muted, #cbd5e1)', 'Opis dobija muted token.'],
  ['summary_line_height', '.summary', 'line-height', '1.65', 'Line-height otvara tekst.'],
  ['cta_outline', '.cta', 'outline', '1px dashed #34d399', 'Dodajemo helper outline za CTA.', 'CTA outline ostaje dok ne zaključimo poslednju interaktivnu zonu.'],
  ['cta_justify_self', '.cta', 'justify-self', 'start', 'CTA ostaje uz levu ivicu.'],
  ['cta_appearance', '.cta', 'appearance', 'none', 'Gasimo browser-native izgled dugmeta.'],
  ['cta_padding', '.cta', 'padding', '12px 16px', 'Padding daje dugmetu klik zonu.'],
  ['cta_border', '.cta', 'border', '0', 'Uklanjamo podrazumevanu border liniju.'],
  ['cta_radius', '.cta', 'border-radius', '999px', 'Pil radius drži CTA vizuelno bliskim badge logici.'],
  ['cta_background', '.cta', 'background', 'linear-gradient(135deg, var(--callout-accent, #38bdf8), var(--callout-accent-strong, #2563eb))', 'CTA koristi oba accent tokena za gradijent.'],
  ['cta_color', '.cta', 'color', '#ffffff', 'Beli tekst drži kontrast.'],
  ['cta_font', '.cta', 'font', 'inherit', 'Dugme preuzima isti font.'],
  ['cta_font_weight', '.cta', 'font-weight', '700', 'Težina fonta zatvara CTA kao action element.'],
  ['cta_cursor', '.cta', 'cursor', 'pointer', 'Kursor potvrđuje interaktivnost.'],
  ['cta_transition', '.cta', 'transition', 'transform 160ms ease, filter 160ms ease, box-shadow 160ms ease', 'Fina tranzicija za hover i focus.'],
  ['cta_box_shadow', '.cta', 'box-shadow', '0 14px 30px rgba(37, 99, 235, 0.28)', 'Mali shadow pojačava CTA.'],
  ['cta_hover_filter', '.cta:hover', 'filter', 'brightness(1.06)', 'Hover blago podiže svetlinu.'],
  ['cta_hover_transform', '.cta:hover', 'transform', 'translateY(-1px)', 'Minimalni lift na hover.'],
  ['cta_active_transform', '.cta:active', 'transform', 'translateY(0)', 'Na active vraćamo dugme nazad.'],
  ['cta_focus_outline', '.cta:focus-visible', 'outline', '3px solid rgba(56, 189, 248, 0.45)', 'Focus-visible dodaje tastaturski focus ring.'],
  ['cta_focus_outline_offset', '.cta:focus-visible', 'outline-offset', '3px', 'Offset odvaja focus ring od ivice dugmeta.']
];

export const lessonSteps = [
  describeHtmlElementStep(
    'empty_shell',
    'Start: Empty App Shell',
    'Počinjemo od praznog `.app-shell` prostora. U ovoj lekciji razdvajamo template markup u sopstveni modul `component.html.js`.',
    'html:app-shell',
    'Neutralan početak odvaja host stranicu od komponente.',
    ['<div class="app-shell">']
  ),
  describeHtmlElementStep(
    'component_html',
    'HTML: My First Component Host',
    'Dodajemo `<my-first-component>` host sa `title` i `cta-label` atributima. Host API ostaje isti kao u prethodnim lekcijama.',
    'html:my-first-component',
    'Naziv custom elementa mora da sadrži crticu.',
    ['<my-first-component']
  ),
  describeHtmlElementStep(
    'eyebrow_slot_html',
    'HTML: Named Slot Content',
    'U host ubacujemo `<span slot="eyebrow">Vanilla JS</span>`. Light DOM sadržaj ostaje nepromenjen.',
    'html:slot-eyebrow',
    'Named slot projicira ciljani deo sadržaja u komponentu.',
    ['slot="eyebrow"', '<my-first-component']
  ),
  describeHtmlElementStep(
    'summary_text_html',
    'HTML: Default Slot Text',
    'Dodajemo opisni tekst kao default slot sadržaj.',
    'html:default-slot',
    'Refactor pristupa stilovima ne menja HTML API komponente.',
    ['<my-first-component', 'slot="eyebrow"']
  ),
  describeTemplateJsStep(
    'template_html_declaration',
    'Template JS: Definišemo Template HTML',
    'U `component.html.js` kreiramo `const templateHtml` sa celim card markup-om. Template HTML sada živi u sopstvenom modulu, odvojeno od class logike.',
    'Odvajanje template markup-a u poseban fajl čini svaki modul fokusiranim na jednu odgovornost.'
  ),
  describeTemplateJsStep(
    'template_element_export',
    'Template JS: Eksportujemo Template Element',
    'Kreiramo `document.createElement(\'template\')`, postavljamo `innerHTML` i eksportujemo gotov template element. `my-first-component.js` ga samo importuje.',
    'Export čini template dostupnim drugim modulima bez da oni znaju kako je napravljen.'
  ),
  describeJsFlowStep(
    'import_template',
    'JS: Uvozimo Template iz component.html.js',
    'U `my-first-component.js` dodajemo `import { myFirstComponentTemplate } from \'./component.html.js\'`. Klasa više ne gradi template, samo ga koristi.',
    'Ovo je suština ove lekcije: svaki fajl radi jednu stvar. Template modul gradi markup, klasa vodi ponašanje.'
  ),
  describeJsFlowStep(
    'shadow_css_import',
    'JS: Uvozimo shadow-dom-style.css kao tekst',
    'Dodajemo `import shadowDomStyleCssText from \'./shadow-dom-style.css?raw\';`, pa JavaScript samo učitava gotov stylesheet source.',
    'CSS živi u svom fajlu, a komponenta ga samo pretvara u CSSStyleSheet.'
  ),
  describeJsFlowStep(
    'stylesheet_declaration',
    'JS: Kreiramo CSSStyleSheet',
    'Dodajemo `new CSSStyleSheet()` i otvaramo objekat koji čuva CSS komponente.',
    'Constructed stylesheet je efikasan jer se deli između instanci bez duplikacije.'
  ),
  describeJsFlowStep(
    'stylesheet_replace_sync',
    'JS: replaceSync Prima Uvezeni CSS',
    'Kroz `myFirstComponentStyles.replaceSync(shadowDomStyleCssText)` punimo stylesheet tekstom iz CSS fajla.',
    'JavaScript više ne nosi stil pravila u sebi, samo ih povezuje.'
  ),
  describeJsFlowStep(
    'class_declaration',
    'JS: Class Extends HTMLElement',
    'Otvaramo `class MyFirstComponent extends HTMLElement`. Klasa sada ne zna kako je template napravljen; samo ga koristi.',
    'Custom element je i dalje običan DOM element, samo sa tvojom klasom.'
  ),
  describeJsFlowStep(
    'constructor_shadow',
    'JS: constructor + attachShadow',
    'U konstruktoru pozivamo `super()` i otvaramo `const shadowRoot = this.attachShadow({ mode: \'open\' })`.',
    'Shadow root je granica komponente: markup i adopted stylesheet žive iza nje.'
  ),
  describeJsFlowStep(
    'constructor_clone',
    'JS: Kloniramo Uvezeni Template',
    'Dodajemo `appendChild(myFirstComponentTemplate.content.cloneNode(true))`. Template dolazi iz import-a, ne iz lokalne definicije.',
    'Klonirani template pravi identičan shadow DOM skeleton za svaku instancu.'
  ),
  describeJsFlowStep(
    'constructor_adopt_stylesheet',
    'JS: Shadow Root Usvaja Stylesheet',
    'Dodajemo `shadowRoot.adoptedStyleSheets = [myFirstComponentStyles]`.',
    'Stylesheet i template dolaze iz različitih modula; klasa ih samo sastavlja.'
  ),
  describeJsFlowStep(
    'constructor_cache_title',
    'JS: Keširamo Title Element',
    'U konstruktoru čuvamo referencu na `.title` element.',
    'Cache DOM referenci drži render jasan i predvidiv.'
  ),
  describeJsFlowStep(
    'constructor_cache_cta',
    'JS: Keširamo CTA Element',
    'Čuvamo referencu na `.cta`, jer tekst dugmeta stiže iz atributa.',
    'Render govori šta menja, ne traži čvorove iznova.'
  ),
  describeJsFlowStep(
    'constructor_bind_click',
    'JS: Bindujemo CTA Handler',
    'Vezujemo `this.handleClick = this.handleClick.bind(this)`.',
    'Stabilna referenca handlera je deo korektnog lifecycle ponašanja.'
  ),
  describeJsFlowStep(
    'render_declaration',
    'JS: Uvodimo render()',
    'Dodajemo `render()` metodu kao jedno mesto gde atributi prelaze u UI tekst.',
    'Jedan render ulaz čini komponentu lakšom za promene.'
  ),
  describeJsFlowStep(
    'render_title',
    'JS: render() Popunjava Title',
    'U `render()` čitamo `title` atribut i upisujemo ga u `.title` element.',
    'Atributi su spoljašnji API; render ih pretvara u vizuelni rezultat.'
  ),
  describeJsFlowStep(
    'render_cta',
    'JS: render() Popunjava CTA',
    'Na isti način `cta-label` pretvaramo u tekst CTA dugmeta.',
    'Isti render tok čuva konzistentnost.'
  ),
  describeJsFlowStep(
    'connected_callback',
    'JS: connectedCallback Lifecycle',
    'Dodajemo `connectedCallback()` kao mesto za prvi render i runtime ponašanje.',
    'Kada komponenta pređe u živi UI, connectedCallback je prirodan ulaz.'
  ),
  describeJsFlowStep(
    'connected_callback_render',
    'JS: connectedCallback Pokreće Render',
    'Pozivamo `this.render()` čim element uđe u DOM.',
    'Prvi render vežemo za trenutak kada je element stvarno povezan.'
  ),
  describeJsFlowStep(
    'connected_callback_listener',
    'JS: connectedCallback Vezuje Click',
    'Vezujemo click listener na CTA dugme.',
    'Komponenta postaje interaktivna, ne samo vizuelna.'
  ),
  describeJsFlowStep(
    'disconnected_callback',
    'JS: disconnectedCallback Cleanup',
    'Dodajemo `disconnectedCallback()` i skidamo CTA listener.',
    'Cleanup je production-grade signal da komponenta poštuje ceo lifecycle.'
  ),
  describeJsFlowStep(
    'observed_attributes',
    'JS: observedAttributes',
    'Dodajemo `static observedAttributes = [\'title\', \'cta-label\']`.',
    'Komponenta eksplicitno kaže koje atribute prati.'
  ),
  describeJsFlowStep(
    'attribute_changed_callback',
    'JS: attributeChangedCallback',
    'Dodajemo `attributeChangedCallback()` sa guard-om za `isConnected`.',
    'Guard sprečava render pre nego što je element zaista u DOM-u.'
  ),
  describeJsFlowStep(
    'handle_click_dispatch_event',
    'JS: CTA Emituje component-action',
    "Dodajemo `handleClick()` i emitujemo `CustomEvent('component-action', ...)`.",
    'Komponenta dobija izlazni API: javlja korisničku akciju spolja.'
  ),
  describeJsFlowStep(
    'define_guard',
    'JS: Čuvamo se duplog define-a',
    'Pre registracije proveravamo `customElements.get(\'my-first-component\')`.',
    'U okruženjima sa hot reload-om ovo je obavezna zaštita.'
  ),
  describeJsFlowStep(
    'define_element',
    'JS: Registrujemo Custom Element',
    'Unutar guard-a pozivamo `customElements.define(\'my-first-component\', MyFirstComponent)`. Preview sada renderuje komponentu čiji template dolazi iz posebnog modula.',
    'Svaki fajl ima jednu odgovornost: template, stil, ponašanje, host.'
  ),
  ...shellCssSteps.map(config => describeCssPropertyStep(...config)),
  ...stylesheetSteps.map(config => describeShadowCssPropertyStep(...config)),
  describeSummaryStep(
    'card_summary',
    'Rezime: .card u shadow-dom-style.css',
    'Uklanjamo card helper outline.',
    'Card struktura, stil iz posebnog CSS fajla i template iz posebnog JS modula su potpuno jasni.'
  ),
  describeSummaryStep(
    'eyebrow_summary',
    'Rezime: .eyebrow u shadow-dom-style.css',
    'Uklanjamo eyebrow helper outline.',
    'Slot projekcija i badge stil rade zajedno iz izdvojenog CSS fajla.'
  ),
  describeSummaryStep(
    'cta_summary',
    'Rezime: .cta u shadow-dom-style.css',
    'Uklanjamo CTA helper outline.',
    'Stil, event i hover/focus ponašanje jasno pokazuju ulogu CTA dugmeta.'
  ),
  describeSummaryStep(
    'host_summary',
    'Rezime: my-first-component host',
    'Uklanjamo host outline.',
    'API atributi, theme tokeni i modularna struktura su sada jasni.'
  ),
  describeSummaryStep(
    'shell_summary',
    'Rezime: .app-shell',
    'Uklanjamo helper outline sa `.app-shell`.',
    'Lekcija je kompletna, okvir više nije potreban.',
    ['<div class="app-shell">']
  ),
  describeFinishedStep(
    'done',
    'Done: More Separation Of Code',
    'Lekcija je završena: ista komponenta sada ima pet zasebnih fajlova. `index.html` opisuje host, `component.html.js` čuva template markup, `my-first-component.js` vodi lifecycle, `shadow-dom-style.css` stilizuje unutrašnjost, a `style.css` theme-uje host spolja.',
    'Sledeći korak je da isti template modul podeliš između više komponenata ili uvedeš dinamički template loading.'
  )
];

export const stepNumberById = Object.fromEntries(
  lessonSteps.map((step, index) => [step.id, index])
);
