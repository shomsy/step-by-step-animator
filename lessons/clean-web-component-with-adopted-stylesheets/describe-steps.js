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
    proTip: proTip || 'Spoljašnji CSS ovde ne stilizuje samo shell, već i theme tokene koje će Web Component povući iz host elementa.',
    focusHtmlNeedles: readFocusHtmlNeedles(selector)
  };
}

function describeShadowCssPropertyStep(id, selector, property, value, desc = '', proTip = '') {
  const cssLine = `${property}: ${value};`;

  return {
    id,
    title: `Shadow CSS: ${selector} / ${property}`,
    desc: desc || `U \`shadow-dom-style.css\` dodajemo \`${cssLine}\` za \`${selector}\`, pa CSS više ne živi u template string markup-u ni u class logici.`,
    tag: `shadow-css:${id.replace(/_/g, '-')}`,
    proTip: proTip || 'Ovde je poenta da CSS ostane u sopstvenom fajlu, dok JavaScript samo uvozi tekst i usvaja ga kroz Web Components API.',
    focusHtmlNeedles: readFocusHtmlNeedles(selector)
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
  ['host_outline', 'my-first-component', 'outline', '1px solid #f97316', 'Dodajemo tanak helper outline za host element i držimo ga do završnog host rezimea.', 'Host i dalje ostaje spoljašnji API komponente, čak i kada unutrašnji CSS više ne živi u template string-u.'],
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
  ['card_shadow', '.card', 'box-shadow', 'var(--callout-shadow, 0 26px 60px rgba(15,23,42,0.24))', 'Shadow sada takođe čita spoljašnji token, pa i dubina komponente postaje deo API-ja.'],
  ['eyebrow_outline', '.eyebrow', 'outline', '1px dotted #facc15', 'Dodajemo helper outline za eyebrow badge i držimo ga do završnog eyebrow rezimea.', 'Badge je mali element i zato mu outline posebno pomaže tokom objašnjenja.'],
  ['eyebrow_display', '.eyebrow', 'display', 'inline-flex', 'Badge ostaje kompakatan i prirodno prati svoj sadržaj.'],
  ['eyebrow_align_items', '.eyebrow', 'align-items', 'center', 'Vertikalno centriramo sadržaj badge-a da kapsula izgleda urednije.'],
  ['eyebrow_justify_content', '.eyebrow', 'justify-content', 'center', 'Tekst badge-a ostaje simetrično centriran i kada se sadržaj menja.'],
  ['eyebrow_width', '.eyebrow', 'width', 'fit-content', 'Badge širinu vežemo isključivo za sadržaj, ne za širinu roditelja.'],
  ['eyebrow_padding', '.eyebrow', 'padding', '8px 12px', 'Padding daje badge-u jasan pill footprint.'],
  ['eyebrow_radius', '.eyebrow', 'border-radius', '999px', 'Veliki radius zatvara badge u kapsulu.'],
  ['eyebrow_background', '.eyebrow', 'background', 'rgba(56,189,248,0.14)', 'Poluprovidna pozadina pravi nežan badge signal.'],
  ['eyebrow_color', '.eyebrow', 'color', 'var(--callout-accent, #38bdf8)', 'Boju badge-a takođe vežemo za host accent token.'],
  ['eyebrow_font_size', '.eyebrow', 'font-size', '12px', 'Manji font čini badge sekundarnim, ali čitljivim.'],
  ['eyebrow_font_weight', '.eyebrow', 'font-weight', '700', 'Težina fonta čini badge labelu kompaktnom i jasnom.'],
  ['eyebrow_letter_spacing', '.eyebrow', 'letter-spacing', '0.04em', 'Mali tracking daje badge-u uredniji, label-like karakter.'],
  ['eyebrow_text_transform', '.eyebrow', 'text-transform', 'uppercase', 'Uppercase zatvara eyebrow kao jasnu oznaku kategorije.'],
  ['title_display', '.title', 'display', 'block', 'Naslovu dajemo sopstveni red da ne deli liniju sa drugim delovima.'],
  ['title_margin', '.title', 'margin', '0', 'Pošto koristimo semantički `h2`, prvo gasimo podrazumevani margin.'],
  ['title_font_size', '.title', 'font-size', 'clamp(1.75rem, 4vw, 2rem)', 'Naslov dobija responzivniju veličinu, bližu finalnom polished utisku.'],
  ['title_line_height', '.title', 'line-height', '1.1', 'Kraći line-height drži naslov zategnutim i čitljivim.'],
  ['title_font_weight', '.title', 'font-weight', '800', 'Pojačavamo naslov da odmah nosi hijerarhiju.'],
  ['summary_margin', '.summary', 'margin', '0', 'Brišemo podrazumevani paragraf margin da spacing kontrolišemo iz card gap-a.'],
  ['summary_color', '.summary', 'color', 'var(--callout-muted, #cbd5e1)', 'Opis dobija muted token, pa i sekundarni tekst postaje deo spoljašnjeg theme API-ja.'],
  ['summary_line_height', '.summary', 'line-height', '1.65', 'Line-height otvara tekst i čini ga lakšim za čitanje.'],
  ['cta_outline', '.cta', 'outline', '1px dashed #34d399', 'Dodajemo helper outline za CTA i držimo ga do završnog CTA rezimea.', 'CTA outline ostaje dok ne zaključimo poslednju interaktivnu zonu.'],
  ['cta_justify_self', '.cta', 'justify-self', 'start', 'CTA ostaje uz levu ivicu card sadržaja umesto da se rasteže.'],
  ['cta_appearance', '.cta', 'appearance', 'none', 'Gasimo browser-native izgled dugmeta da komponenta zadrži konzistentan cross-browser izgled.'],
  ['cta_padding', '.cta', 'padding', '12px 16px', 'Padding daje dugmetu njegovu klik zonu.'],
  ['cta_border', '.cta', 'border', '0', 'Uklanjamo podrazumevanu border liniju dugmeta.'],
  ['cta_radius', '.cta', 'border-radius', '999px', 'Pil radius drži CTA vizuelno bliskim badge logici.'],
  ['cta_background', '.cta', 'background', 'linear-gradient(135deg, var(--callout-accent, #38bdf8), var(--callout-accent-strong, #2563eb))', 'CTA sada koristi i jači accent token za dublji, kontrolisan gradijent.'],
  ['cta_color', '.cta', 'color', '#ffffff', 'Beli tekst drži jasan kontrast preko gradijenta.'],
  ['cta_font', '.cta', 'font', 'inherit', 'Dugme preuzima isti font vocabulary kao i ostatak komponente.'],
  ['cta_font_weight', '.cta', 'font-weight', '700', 'Težina fonta zatvara CTA kao jasan action element.'],
  ['cta_cursor', '.cta', 'cursor', 'pointer', 'Kursor eksplicitno potvrđuje interaktivnost CTA dugmeta.'],
  ['cta_transition', '.cta', 'transition', 'transform 160ms ease, filter 160ms ease, box-shadow 160ms ease', 'Dodajemo finu tranziciju da hover i focus states ne deluju grubo.'],
  ['cta_box_shadow', '.cta', 'box-shadow', '0 14px 30px rgba(37, 99, 235, 0.28)', 'Mali shadow pojačava CTA kao završni action sloj.'],
  ['cta_hover_filter', '.cta:hover', 'filter', 'brightness(1.06)', 'Hover blago podiže svetlinu CTA dugmeta bez agresivne promene boje.'],
  ['cta_hover_transform', '.cta:hover', 'transform', 'translateY(-1px)', 'Minimalni lift daje osećaj da dugme odgovara na hover.'],
  ['cta_active_transform', '.cta:active', 'transform', 'translateY(0)', 'Na active vraćamo dugme nazad, da klik ima malu fizičku povratnu informaciju.'],
  ['cta_focus_outline', '.cta:focus-visible', 'outline', '3px solid rgba(56, 189, 248, 0.45)', 'Focus-visible dodaje jasan tastaturski focus ring bez oslanjanja na browser default.'],
  ['cta_focus_outline_offset', '.cta:focus-visible', 'outline-offset', '3px', 'Offset odvaja focus ring od same pil ivice dugmeta.']
];

export const lessonSteps = [
  describeHtmlElementStep(
    'empty_shell',
    'Start: Empty App Shell',
    'Počinjemo od praznog `.app-shell` prostora. Goal slika iznad pokazuje istu komponentu, ali sada je cilj da očistimo način na koji njeni stilovi žive pored JavaScript logike.',
    'html:app-shell',
    'Neutralan početak odvaja postojeći page shell od komponente koju tek gradimo.',
    ['<div class="app-shell">']
  ),
  describeHtmlElementStep(
    'component_html',
    'HTML: Feature Callout Host',
    'Dodajemo `<my-first-component>` host sa `title` i `cta-label` atributima. Host API ostaje isti; menja se samo način na koji komponenta organizuje sopstveni CSS.',
    'html:my-first-component',
    'Naziv custom elementa mora da sadrži crticu. To je osnovno pravilo registracije custom elementa.',
    ['<my-first-component']
  ),
  describeHtmlElementStep(
    'eyebrow_slot_html',
    'HTML: Named Slot Content',
    'U host ubacujemo `<span slot="eyebrow">Vanilla JS</span>`. Light DOM sadržaj ostaje isti i u ovoj čistijoj verziji komponente.',
    'html:slot-eyebrow',
    'Named slot je i dalje najjednostavniji način da spolja projiciraš mali, ciljani deo sadržaja u komponentu.',
    ['slot="eyebrow"', '<my-first-component']
  ),
  describeHtmlElementStep(
    'summary_text_html',
    'HTML: Default Slot Text',
    'Dodajemo opisni tekst kao default slot sadržaj. Čišćenje stila ne menja slot logiku; menja samo gde CSS živi.',
    'html:default-slot',
    'Ovo je važna poenta: refactor styling pristupa ne bi trebalo da razbije HTML API komponente.',
    ['<my-first-component', 'slot="eyebrow"']
  ),
  describeJsFlowStep(
    'template_declaration',
    'JS: Template Sada Čuva Samo Markup',
    'Kreiramo `document.createElement(\'template\')`, ali ovoga puta template više nije zadužen i za stilove. Čuvamo ga samo za shadow DOM markup.',
    'Kada template više ne nosi i markup i CSS zajedno, komponenta postaje čitljivija i lakša za održavanje.'
  ),
  describeJsFlowStep(
    'cleanup_intro',
    "Now Let's Clean The Mess",
    'Ovde pravimo glavni refactor: CSS više ne guramo u `<style>` unutar `template.innerHTML`, niti ga držimo kao veliki inline string u JavaScript fajlu. Prebacujemo ga u poseban `shadow-dom-style.css` koji komponenta kasnije samo usvoji.',
    'Suština ovog koraka je da CSS može da bude odvojen i od class logike i od template markup-a, umesto da sve bude zbijeno u jedan veliki string.'
  ),
  describeJsFlowStep(
    'shadow_css_import',
    'JS: Uvozimo shadow-dom-style.css kao tekst',
    'Dodajemo `import shadowDomStyleCssText from \'./shadow-dom-style.css?raw\';`, pa JavaScript više ne nosi same CSS linije nego samo učitava gotov stylesheet source.',
    'Ovo je najčistiji Vite-friendly model za ovu lekciju: CSS fizički živi u svom fajlu, a komponenta ga samo pretvara u `CSSStyleSheet`.'
  ),
  describeJsFlowStep(
    'stylesheet_declaration',
    'JS: Kreiramo CSSStyleSheet',
    'Dodajemo `new CSSStyleSheet()` i otvaramo poseban objekat koji će čuvati CSS komponente van same klase.',
    'To je prvi konkretan signal da stil više nije spakovan zajedno sa markup-om u jednom template bloku.'
  ),
  describeJsFlowStep(
    'stylesheet_replace_sync',
    'JS: replaceSync Prima Uvezeni CSS',
    'Kroz `myFirstComponentStyles.replaceSync(shadowDomStyleCssText)` punimo constructed stylesheet tekstom koji stiže iz posebnog CSS fajla. JavaScript više ne nosi stil pravila u sebi.',
    'Ovo je najvažniji mentalni model cele lekcije: CSS je izdvojen u poseban fajl, a JavaScript ga samo povezuje sa shadow root-om.'
  ),
  describeJsFlowStep(
    'template_markup_open',
    'JS: Template Markup Bez <style>',
    'Sada otvaramo `template.innerHTML = \\`` i ubacujemo samo card markup. Nema više embedded `<style>` bloka u template string-u.',
    'Kad neko otvori template, vidi isključivo strukturu DOM-a. To je mnogo čistiji signal odgovornosti.'
  ),
  describeJsFlowStep(
    'card_markup',
    'JS: Dodajemo Shadow DOM Markup',
    'U template ubacujemo card wrapper, named slot za eyebrow, semantički `h2` naslov, paragraf sa default slotom, CTA dugme i `part` atribute za kasniji escape hatch.',
    'Template sada stvarno priča samo markup priču.'
  ),
  describeJsFlowStep(
    'class_declaration',
    'JS: Class Extends HTMLElement',
    'Otvaramo `class MyFirstComponent extends HTMLElement`. Time browseru kažemo da naš custom element ima sopstveno ponašanje.',
    'Custom element je i dalje običan DOM element, samo sa tvojom klasom i tvojim lifecycle ponašanjem.'
  ),
  describeJsFlowStep(
    'constructor_shadow',
    'JS: constructor + attachShadow',
    'U konstruktoru pozivamo `super()` i odmah otvaramo `const shadowRoot = this.attachShadow({ mode: \'open\' })` da komponenta dobije sopstveni shadow root.',
    'Shadow root je granica komponente: markup i adopted stylesheet žive iza nje.'
  ),
  describeJsFlowStep(
    'constructor_clone',
    'JS: Kloniramo Template',
    'Dodajemo `appendChild(myFirstComponentTemplate.content.cloneNode(true))`, pa svaka instanca komponente dobija isti početni shadow DOM skeleton.',
    'Kloniranje template-a je najčistiji način da jednu definiciju koristiš u više instanci.'
  ),
  describeJsFlowStep(
    'constructor_adopt_stylesheet',
    'JS: Shadow Root Usvaja Stylesheet',
    'Dodajemo `shadowRoot.adoptedStyleSheets = [myFirstComponentStyles]`, pa shadow root dobija stil bez ubacivanja `<style>` taga u template.',
    'Ovo je trenutak kada čisti separation stvarno proradi: stylesheet je izdvojen, a shadow root ga samo preuzima.'
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
    'constructor_bind_click',
    'JS: Bindujemo CTA Handler',
    'U konstruktoru vezujemo `this.handleClick = this.handleClick.bind(this)`, da isti handler može bezbedno da se koristi i za add i za remove listener.',
    'Ako komponenta ima cleanup, stabilna referenca handlera više nije optional polish nego deo korektnog lifecycle ponašanja.'
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
    'JS: connectedCallback Lifecycle',
    'Dodajemo `connectedCallback()` kao mesto gde komponenta obavlja prvi render i povezuje runtime ponašanje.',
    'Kada komponenta pređe iz statičnog prikaza u živi UI, connectedCallback postaje prirodan lifecycle ulaz.'
  ),
  describeJsFlowStep(
    'connected_callback_render',
    'JS: connectedCallback Pokreće Prvi Render',
    'U `connectedCallback()` pozivamo `this.render()`, pa komponenta dobija sadržaj čim uđe u DOM.',
    'Prvi render je prirodno vezati za trenutak kada je element stvarno povezan sa dokumentom.'
  ),
  describeJsFlowStep(
    'connected_callback_listener',
    'JS: connectedCallback Vezuje Click Listener',
    'U istom lifecycle koraku vezujemo click listener na CTA dugme, pa komponenta više ne samo prikazuje UI nego i emituje akciju.',
    'Tek ovde komponenta postaje i interaktivna, ne samo vizuelno renderovana.'
  ),
  describeJsFlowStep(
    'disconnected_callback',
    'JS: disconnectedCallback Cleanup',
    'Dodajemo `disconnectedCallback()` i skidamo CTA listener kada komponenta izađe iz DOM-a.',
    'Cleanup je pravi production-grade signal da komponenta poštuje ceo lifecycle, ne samo mount.'
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
    'Dodajemo `attributeChangedCallback()` sa guard-om za `isConnected`, pa render radimo samo kada komponenta zaista živi u DOM-u.',
    'To je mali, ali važan robustness detalj: lifecycle više nije samo ispravan, nego i disciplinovan.'
  ),
  describeJsFlowStep(
    'handle_click_dispatch_event',
    'JS: CTA Emituje component-action',
    "Dodajemo `handleClick()` i iz njega emitujemo `CustomEvent('component-action', ...)`, pa komponenta dobija jasan izlazni signal.",
    'Komponenta time dobija izlazni API: ne prima samo atribute, nego i javlja korisničku akciju spolja.'
  ),
  describeJsFlowStep(
    'define_guard',
    'JS: Čuvamo se duplog define-a',
    'Pre registracije proveravamo `customElements.get(\'my-first-component\')`, da isti custom element ne pokušamo da definišemo dva puta.',
    'Ovo nije samo defensive code; u okruženjima sa hot reload-om ili više mount ciklusa to je praktično obavezna zaštita.'
  ),
  describeJsFlowStep(
    'define_element',
    'JS: Registrujemo Custom Element',
    'Unutar guard-a pozivamo `customElements.define(\'my-first-component\', MyFirstComponent)`. Od ovog trenutka browser zna kako da upgrade-uje `<my-first-component>` u pravu komponentu i preview dobija render bez style taga u template-u.',
    'Sada je i struktura koda čistija: template čuva markup, stylesheet čuva CSS, a klasa orkestrira ponašanje.'
  ),
  ...shellCssSteps.map(config => describeCssPropertyStep(...config)),
  ...stylesheetSteps.map(config => describeShadowCssPropertyStep(...config)),
  describeSummaryStep(
    'card_summary',
    'Rezime: .card u shadow-dom-style.css',
    'Rezimiramo glavni card blok i tek sada uklanjamo njegov helper outline, jer su struktura, stil iz posebnog CSS fajla i način usvajanja stylesheet-a potpuno jasni.',
    'Helper outline za glavni card ostaje dok i markup i poseban shadow CSS tok ne budu dovoljno čitljivi.'
  ),
  describeSummaryStep(
    'eyebrow_summary',
    'Rezime: .eyebrow u shadow-dom-style.css',
    'Rezimiramo eyebrow badge i uklanjamo njegov helper outline tek sada, kada slot projekcija i badge stil rade zajedno iz izdvojenog CSS fajla.',
    'Slot je ovde važan deo lekcije, pa helper outline ostaje dok named slot ne postane jasan.'
  ),
  describeSummaryStep(
    'cta_summary',
    'Rezime: .cta u shadow-dom-style.css',
    'Rezime za CTA dugme: helper outline više nije potreban, jer završni stil iz posebnog CSS fajla, event i hover/focus ponašanje već jasno pokazuju njegovu ulogu.',
    'Outline služi učenju; kad je element potpuno objašnjen, može da nestane.'
  ),
  describeSummaryStep(
    'host_summary',
    'Rezime: my-first-component host',
    'Završni host rezime: spoljašnji outline host elementa više nije potreban, jer su API atributi, theme tokeni i adopted stylesheet tok sada jasni.',
    'Host outline ostaje dok ne pokažemo i spoljašnji API i unutrašnju implementaciju komponente.'
  ),
  describeSummaryStep(
    'shell_summary',
    'Rezime: .app-shell',
    'Tek sada uklanjamo helper outline sa `.app-shell`, jer je cela cleanup lekcija kompletna i okvir više nije potreban.',
    'App shell outline ostaje sve vreme kao teaching okvir i nestaje tek na samom kraju lekcije.',
    ['<div class="app-shell">']
  ),
  describeFinishedStep(
    'done',
    'Done: Clean Feature Callout with adoptedStyleSheets',
    'Lekcija je završena: ista komponenta sada ima čistiji raspored odgovornosti. Host HTML ostaje mali, template čuva samo markup, `shadow-dom-style.css` čuva CSS, a klasa samo uvozi tekst, usvaja stylesheet i vodi lifecycle ponašanje.',
    'Sledeći logičan korak je da isti stylesheet podeliš između više shadow root instanci ili da uvedeš još jedan komponentni stil sloj.'
  )
];

export const stepNumberById = Object.fromEntries(
  lessonSteps.map((step, index) => [step.id, index])
);
