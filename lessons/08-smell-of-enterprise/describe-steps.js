const focusHtmlNeedlesBySelector = {
  '.app-shell': ['<div class="app-shell">'],
  'ui-callout-card': ['<ui-callout-card', 'slot="eyebrow"'],
  'ui-callout-card[variant="success"]': ['<ui-callout-card', 'variant="success"'],
  'ui-callout-card[variant="warning"]': ['<ui-callout-card'],
  'ui-callout-card[variant="danger"]': ['<ui-callout-card'],
  'ui-callout-card[disabled]': ['<ui-callout-card'],
  ':host': ['<ui-callout-card', 'slot="eyebrow"'],
  '.card': ['<ui-callout-card', 'slot="eyebrow"'],
  '.eyebrow': ['slot="eyebrow"', '<ui-callout-card'],
  '::slotted([slot="eyebrow"])': ['slot="eyebrow"', '<ui-callout-card'],
  '.title': ['<ui-callout-card'],
  '.summary': ['<ui-callout-card'],
  '.cta': ['<ui-callout-card'],
  '.cta:hover': ['<ui-callout-card'],
  '.cta:active': ['<ui-callout-card'],
  '.cta:focus-visible': ['<ui-callout-card'],
  '.cta:disabled': ['<ui-callout-card']
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
    desc: desc || `Dodajemo \`${cssLine}\` u \`${selector}\`.`,
    tag: `css:${id.replace(/_/g, '-')}`,
    proTip: proTip || 'Host CSS drži spoljašnji theme, variants i state contract na samom custom elementu.',
    focusHtmlNeedles: readFocusHtmlNeedles(selector)
  };
}

function describeShadowCssPropertyStep(id, selector, property, value, desc = '', proTip = '') {
  const cssLine = `${property}: ${value};`;

  return {
    id,
    title: `Shadow CSS: ${selector} / ${property}`,
    desc: desc || `U \`ui-callout-card.shadow.css\` dodajemo \`${cssLine}\` za \`${selector}\`.`,
    tag: `shadow-css:${id.replace(/_/g, '-')}`,
    proTip: proTip || 'Shadow CSS stilizuje samo unutrašnju strukturu i public `part` površine komponente.',
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
    focusHtmlNeedles: readFocusHtmlNeedles('ui-callout-card')
  };
}

function describeTeachingStep(id, title, desc, proTip, focusHtmlNeedles = readFocusHtmlNeedles('ui-callout-card')) {
  return {
    id,
    title,
    desc,
    tag: `teaching:${id.replace(/_/g, '-')}`,
    proTip,
    focusHtmlNeedles
  };
}

function describeJsFlowStep(id, title, desc, proTip, focusHtmlNeedles = readFocusHtmlNeedles('ui-callout-card')) {
  return {
    id,
    title,
    desc,
    tag: `js:${id.replace(/_/g, '-')}`,
    proTip,
    focusHtmlNeedles
  };
}

function describeSummaryStep(id, title, desc, proTip, focusHtmlNeedles = readFocusHtmlNeedles('ui-callout-card')) {
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
  ['shell_outline', '.app-shell', 'outline', '1px dashed #94a3b8', 'Dodajemo tanak helper outline za `.app-shell` i držimo ga do završnog shell rezimea.', 'App shell ostaje okvir cele enterprise demonstracije.'],
  ['shell_padding', '.app-shell', 'padding', '40px', 'Dodajemo padding da komponenta dobije vazduh čim se pojavi.'],
  ['shell_display', '.app-shell', 'display', 'grid', 'Grid nam daje jednostavan, predvidiv host layout.'],
  ['shell_place_items', '.app-shell', 'place-items', 'center', 'Centar drži fokus na jednoj reusable komponenti.'],
  ['shell_min_height', '.app-shell', 'min-height', '100vh', 'Puna visina drži scenu stabilnom kroz celu lekciju.'],
  ['shell_background', '.app-shell', 'background', 'linear-gradient(180deg, #e2e8f0, #cbd5e1)', 'Svetla pozadina daje kontrast enterprise callout card komponenti.'],
  ['host_outline', 'ui-callout-card', 'outline', '1px solid #f97316', 'Dodajemo helper outline za host element i držimo ga do završnog host rezimea.', 'Host je spoljašnji contract surface komponente.'],
  ['host_display', 'ui-callout-card', 'display', 'block', 'Host pretvaramo u block da dobije stabilan footprint.'],
  ['host_width', 'ui-callout-card', 'width', 'min(100%, 460px)', 'Širina ostaje predvidiva i kroz preview i kroz integraciju.'],
  ['host_surface_token', 'ui-callout-card', '--callout-surface', '#0f172a', 'Počinje styling contract: surface boju iznosimo u host custom property.'],
  ['host_surface_alt_token', 'ui-callout-card', '--callout-surface-alt', 'rgba(15, 23, 42, 0.92)', 'Drugi surface ton ostaje takođe spolja theme-ovan.'],
  ['host_border_token', 'ui-callout-card', '--callout-border', 'rgba(148,163,184,0.24)', 'Border boju iznosimo u javni host token.'],
  ['host_accent_token', 'ui-callout-card', '--callout-accent', '#38bdf8', 'Accent boja ostaje theme token, ne interni magic number.'],
  ['host_accent_strong_token', 'ui-callout-card', '--callout-accent-strong', '#2563eb', 'Dublji accent ton zatvara CTA gradijent.'],
  ['host_text_token', 'ui-callout-card', '--callout-text', '#e2e8f0', 'Text token čuva kontrast kroz ceo component contract.'],
  ['host_muted_token', 'ui-callout-card', '--callout-muted', '#cbd5e1', 'Muted token pokriva sekundarni tekst.'],
  ['host_shadow_token', 'ui-callout-card', '--callout-shadow', '0 26px 60px rgba(15, 23, 42, 0.24)', 'I shadow je theme contract, ne hardkodovan interni detalj.'],
  ['variant_success_accent', 'ui-callout-card[variant="success"]', '--callout-accent', '#22c55e', 'Success variant menja accent boju bez kopiranja internog card CSS-a.', 'Variant ide spolja, kroz host selector i theme tokene.'],
  ['variant_success_accent_strong', 'ui-callout-card[variant="success"]', '--callout-accent-strong', '#15803d', 'Drugi success ton zatvara gradijent CTA-a.'],
  ['variant_warning_accent', 'ui-callout-card[variant="warning"]', '--callout-accent', '#f59e0b', 'Warning variant dobija sopstveni accent.'],
  ['variant_warning_accent_strong', 'ui-callout-card[variant="warning"]', '--callout-accent-strong', '#d97706', 'Jači warning ton drži gradijent konzistentnim.'],
  ['variant_warning_text', 'ui-callout-card[variant="warning"]', '--callout-text', '#fff7ed', 'Warning može da podigne i text kontrast bez diranja shadow file-a.'],
  ['variant_warning_muted', 'ui-callout-card[variant="warning"]', '--callout-muted', '#fed7aa', 'Sekundarni tekst warning varijante dobija poseban token.'],
  ['variant_danger_accent', 'ui-callout-card[variant="danger"]', '--callout-accent', '#f87171', 'Danger variant dobija crvenu accent boju.'],
  ['variant_danger_accent_strong', 'ui-callout-card[variant="danger"]', '--callout-accent-strong', '#dc2626', 'Drugi danger ton zatvara gradijent.'],
  ['host_disabled_opacity', 'ui-callout-card[disabled]', 'opacity', '0.72', 'Disabled state dobija i spoljašnji vizuelni signal na host elementu.', 'State contract treba da se vidi i spolja, ne samo u button internals.']
];

const shadowCssSteps = [
  ['shadow_host_font', ':host', 'display', 'block', 'Shadow host ostaje block i u internom stilu komponente.'],
  ['shadow_host_font_family', ':host', 'font-family', 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', 'Komponenta dobija sopstveni font stack u shadow sloju.'],
  ['shadow_host_color', ':host', 'color', 'var(--callout-text, #e2e8f0)', 'Host boju čita iz spoljašnjeg text tokena.'],
  ['card_outline', '.card', 'outline', '1px dashed #38bdf8', 'Dodajemo helper outline za card blok i držimo ga do završnog card rezimea.', 'Card outline ostaje dok ne završimo celu unutrašnju celinu.'],
  ['card_display', '.card', 'display', 'grid', 'Card raspored koristimo kao vertikalni stack.'],
  ['card_gap', '.card', 'gap', '16px', 'Gap odvaja badge, naslov, opis i CTA.'],
  ['card_padding', '.card', 'padding', '24px', 'Padding pravi pravi card footprint.'],
  ['card_radius', '.card', 'border-radius', '28px', 'Zaobljenje daje modernu siluetu.'],
  ['card_border', '.card', 'border', '1px solid var(--callout-border, rgba(148,163,184,0.24))', 'Border čita host token i time potvrđuje styling contract.'],
  ['card_background', '.card', 'background', 'linear-gradient(180deg, var(--callout-surface, rgba(15,23,42,0.98)), var(--callout-surface-alt, rgba(15,23,42,0.92)))', 'Card pozadina čita surface tokene spolja.'],
  ['card_shadow', '.card', 'box-shadow', 'var(--callout-shadow, 0 26px 60px rgba(15,23,42,0.24))', 'Shadow dolazi iz host contract-a.'],
  ['eyebrow_outline', '.eyebrow', 'outline', '1px dotted #facc15', 'Dodajemo helper outline za eyebrow badge.', 'Badge ostaje deo unutrašnjeg component styling contract-a.'],
  ['eyebrow_display', '.eyebrow', 'display', 'inline-flex', 'Badge ostaje kompaktan.'],
  ['eyebrow_align_items', '.eyebrow', 'align-items', 'center', 'Vertikalno centriramo sadržaj badge-a.'],
  ['eyebrow_justify_content', '.eyebrow', 'justify-content', 'center', 'Badge sadržaj ostaje simetričan.'],
  ['eyebrow_width', '.eyebrow', 'width', 'fit-content', 'Badge širinu vežemo samo za sadržaj.'],
  ['eyebrow_padding', '.eyebrow', 'padding', '8px 12px', 'Padding daje badge-u jasan pill footprint.'],
  ['eyebrow_radius', '.eyebrow', 'border-radius', '999px', 'Veliki radius zatvara badge u kapsulu.'],
  ['eyebrow_background', '.eyebrow', 'background', 'rgba(56,189,248,0.14)', 'Poluprovidna pozadina drži badge nenapadnim.'],
  ['eyebrow_color', '.eyebrow', 'color', 'var(--callout-accent, #38bdf8)', 'Eyebrow boja čita spoljašnji accent token.'],
  ['eyebrow_font_size', '.eyebrow', 'font-size', '12px', 'Manji font čini badge sekundarnim signalom.'],
  ['eyebrow_font_weight', '.eyebrow', 'font-weight', '700', 'Jači font drži eyebrow labelu kompaktnom.'],
  ['eyebrow_letter_spacing', '.eyebrow', 'letter-spacing', '0.04em', 'Mali tracking daje uredniji badge ton.'],
  ['eyebrow_text_transform', '.eyebrow', 'text-transform', 'uppercase', 'Uppercase zatvara eyebrow kao jasnu kategoriju.'],
  ['eyebrow_slotted_font', '::slotted([slot="eyebrow"])', 'font', 'inherit', 'Named slot sadržaj nasleđuje badge font pravila.', 'Slot je public surface, ali ga i dalje blago normalizujemo unutar komponente.'],
  ['title_display', '.title', 'display', 'block', 'Naslov dobija svoj red.'],
  ['title_margin', '.title', 'margin', '0', 'Uklanjamo default heading margin.'],
  ['title_font_size', '.title', 'font-size', 'clamp(1.75rem, 4vw, 2rem)', 'Naslov dobija responzivnu veličinu.'],
  ['title_line_height', '.title', 'line-height', '1.1', 'Kraći line-height drži naslov zategnutim.'],
  ['title_font_weight', '.title', 'font-weight', '800', 'Pojačavamo hijerarhiju naslova.'],
  ['summary_margin', '.summary', 'margin', '0', 'Brišemo podrazumevani paragraf margin.'],
  ['summary_color', '.summary', 'color', 'var(--callout-muted, #cbd5e1)', 'Opis dobija muted token.'],
  ['summary_line_height', '.summary', 'line-height', '1.65', 'Otvaramo tekst za lakše čitanje.'],
  ['cta_outline', '.cta', 'outline', '1px dashed #34d399', 'Dodajemo helper outline za CTA.', 'CTA outline ostaje dok ne zaključimo interaktivnu zonu.'],
  ['cta_justify_self', '.cta', 'justify-self', 'start', 'CTA ostaje uz levu ivicu.'],
  ['cta_appearance', '.cta', 'appearance', 'none', 'Gasimo browser-native izgled.'],
  ['cta_padding', '.cta', 'padding', '12px 16px', 'Padding pravi jasnu klik zonu.'],
  ['cta_border', '.cta', 'border', '0', 'Uklanjamo podrazumevani border.'],
  ['cta_radius', '.cta', 'border-radius', '999px', 'Pil radius drži CTA bliskim badge logici.'],
  ['cta_background', '.cta', 'background', 'linear-gradient(135deg, var(--callout-accent, #38bdf8), var(--callout-accent-strong, #2563eb))', 'CTA gradijent čita theme tokene.'],
  ['cta_color', '.cta', 'color', '#ffffff', 'Beli tekst drži kontrast.'],
  ['cta_font', '.cta', 'font', 'inherit', 'CTA preuzima isti font.'],
  ['cta_font_weight', '.cta', 'font-weight', '700', 'Teži font zatvara action hijerarhiju.'],
  ['cta_cursor', '.cta', 'cursor', 'pointer', 'Kursor potvrđuje interaktivnost.'],
  ['cta_transition', '.cta', 'transition', 'transform 160ms ease, filter 160ms ease, box-shadow 160ms ease', 'Tranzicija daje finiji response.'],
  ['cta_box_shadow', '.cta', 'box-shadow', '0 14px 30px rgba(37, 99, 235, 0.28)', 'Mali shadow pojačava CTA.'],
  ['cta_hover_filter', '.cta:hover', 'filter', 'brightness(1.06)', 'Hover blago diže svetlinu.'],
  ['cta_hover_transform', '.cta:hover', 'transform', 'translateY(-1px)', 'Minimalni lift na hover.'],
  ['cta_active_transform', '.cta:active', 'transform', 'translateY(0)', 'Na active vraćamo dugme nazad.'],
  ['cta_focus_outline', '.cta:focus-visible', 'outline', '3px solid rgba(56, 189, 248, 0.45)', 'Focus-visible dodaje tastaturski focus ring.'],
  ['cta_focus_outline_offset', '.cta:focus-visible', 'outline-offset', '3px', 'Offset odvaja focus ring od ivice dugmeta.'],
  ['cta_disabled_cursor', '.cta:disabled', 'cursor', 'not-allowed', 'Disabled CTA dobija jasan cursor signal.', 'Disabled state mora biti vidljiv i bez čitanja API-ja.'],
  ['cta_disabled_opacity', '.cta:disabled', 'opacity', '0.55', 'Spuštamo opacity kada je komponenta onemogućena.'],
  ['cta_disabled_filter', '.cta:disabled', 'filter', 'saturate(0.6)', 'Gasimo deo zasićenja da disabled stanje bude očigledno.'],
  ['cta_disabled_shadow', '.cta:disabled', 'box-shadow', 'none', 'Uklanjamo CTA shadow u disabled stanju.']
];

export const lessonSteps = [
  describeHtmlElementStep(
    'empty_shell',
    'Start: Empty App Shell',
    'Počinjemo od praznog `.app-shell` prostora. I ova lekcija i dalje počinje od neutralne host stranice.',
    'html:app-shell',
    'Enterprise komponenta i dalje mora da živi u običnom DOM okruženju, ne u specijalnoj demo sceni.',
    ['<div class="app-shell">']
  ),
  describeHtmlElementStep(
    'component_html',
    'HTML: ui-callout-card Host',
    'Dodajemo `<ui-callout-card>` host sa `title` i `cta-label` atributima. Tag sada zvuči kao reusable UI primitive, ne kao vežba.',
    'html:ui-callout-card',
    'Domain-driven naming je prvi enterprise signal: ime taga mora da sugeriše šta komponenta jeste.',
    ['<ui-callout-card']
  ),
  describeHtmlElementStep(
    'eyebrow_slot_html',
    'HTML: Named Slot Content',
    'Dodajemo `<span slot="eyebrow">Web Components</span>` kao named slot sadržaj.',
    'html:slot-eyebrow',
    'Slot ostaje public surface komponente i u enterprise varijanti.'
  ),
  describeHtmlElementStep(
    'summary_text_html',
    'HTML: Default Slot Text',
    'Dodajemo opisni tekst kao default slot sadržaj.',
    'html:default-slot',
    'Usage API ostaje mali i čitljiv iako interna arhitektura postaje ozbiljnija.'
  ),
  describeHtmlElementStep(
    'variant_attribute_html',
    'HTML: variant="success"',
    'Dodajemo `variant="success"` i uvodimo jasan, deklarativni state/variant API.',
    'html:variant',
    'Enterprise komponenta ne treba da zahteva ručno prepisivanje stilova; variants su deo public contract-a.'
  ),
  describeTeachingStep(
    'enterprise_api_contract',
    'Teaching Moment: Smell of Enterprise',
    'Ova lekcija ne pravi “veću” komponentu nego predvidiviju: public API sada ima attributes i properties, update tok se sužava, event payload postaje jasan, a styling contract je svesno dizajniran.',
    'Cilj enterprise smell-a nije složenost, nego stabilan contract za druge timove i integracije.'
  ),
  describeTemplateJsStep(
    'template_html_declaration',
    'Template JS: Izdvajamo markup',
    'U `ui-callout-card.template.js` card markup ostaje u `templateHtml`, odvojeno od behavior koda.',
    'Template modul sada nosi samo strukturu komponente.'
  ),
  describeTemplateJsStep(
    'template_parts',
    'Template JS: Dodajemo part contract',
    'U template markup uvodimo `part="card"`, `part="eyebrow"`, `part="title"`, `part="summary"` i `part="cta"`.',
    '`part` je javni styling API: parent može da stilizuje dozvoljene surface delove, bez lomljenja shadow internals.'
  ),
  describeTemplateJsStep(
    'template_element_export',
    'Template JS: Eksportujemo Template Element',
    'Kreiramo `uiCalloutCardTemplate`, dodajemo `<link rel="stylesheet">` ka `ui-callout-card.shadow.css` i ubrizgavamo `${templateHtml}`.',
    'Template fajl zna za markup i shadow stylesheet ulaz, ali ne zna za lifecycle, state i evente.'
  ),
  describeJsFlowStep(
    'import_template',
    'JS: Uvozimo Template Modul',
    'Behavior fajl uvozi `uiCalloutCardTemplate` iz template modula. Klasa ga samo koristi.',
    'Ovo je prva jasna granica: class ne gradi HTML stringove.'
  ),
  describeJsFlowStep(
    'normalize_text_helper',
    'JS: normalizujemo string ulaze',
    'Dodajemo `normalizeTextValue()` da title i CTA label ne zavise od sirovog ulaza.',
    'Enterprise API ne pretpostavlja da je svaki input već lep i čist.'
  ),
  describeJsFlowStep(
    'allowed_variants_set',
    'JS: zaključavamo dozvoljene variants',
    'Dodajemo `allowedVariants` skup kao mali, predvidiv styling contract.',
    'Ne želimo otvoren string chaos za state koji direktno utiče na styling.'
  ),
  describeJsFlowStep(
    'normalize_variant_helper',
    'JS: normalizujemo variant vrednost',
    'Dodajemo `normalizeVariantValue()` da nepoznat variant automatski padne na `info`.',
    'Fallback je deo contract-a; komponenta ne sme da padne zato što je neko poslao lošu vrednost.'
  ),
  describeJsFlowStep(
    'class_declaration',
    'JS: UiCalloutCard extends HTMLElement',
    'Klasa sada prati domain-driven ime taga: `UiCalloutCard`.',
    'Class ime i custom element tag treba da pričaju istu priču.'
  ),
  describeJsFlowStep(
    'observed_attributes',
    'JS: proširujemo observedAttributes',
    'Komponenta sada eksplicitno prati `title`, `cta-label`, `disabled` i `variant`.',
    'Observed attributes su spoljašnji declarative API ulazi.'
  ),
  describeJsFlowStep(
    'constructor_shadow',
    'JS: constructor otvara shadow root',
    'U konstruktoru i dalje samo pripremamo instancu i shadow root.',
    'Konstruktor priprema osnovu, ne radi lifecycle posao umesto connectedCallback-a.'
  ),
  describeJsFlowStep(
    'constructor_bind',
    'JS: constructor binduje action handler',
    'Vezujemo `handleActionClick` unapred da event cleanup ostane stabilan.',
    'Handler bindujemo jednom, ne pri svakom connect-u.'
  ),
  describeJsFlowStep(
    'constructor_state',
    'JS: constructor priprema interne reference',
    'Inicijalizujemo reference i state flagove za CTA binding.',
    'Interno stanje ostaje malo i predvidivo.'
  ),
  describeJsFlowStep(
    'connected_callback',
    'JS: connectedCallback Lifecycle',
    'Connected lifecycle ostaje glavni ulaz kada komponenta stvarno uđe u DOM.',
    'Sve što zavisi od živog DOM-a i eventa ide ovde.'
  ),
  describeJsFlowStep(
    'connected_callback_setup',
    'JS: connectedCallback poziva setupTemplateOnce',
    'Prvo jednom stampujemo template u shadow root.',
    'Ovim izbegavamo da `cacheDom()` meša template mount i query odgovornost.'
  ),
  describeJsFlowStep(
    'connected_callback_cache',
    'JS: connectedCallback poziva cacheDom',
    'Tek kada template postoji, keširamo reference.',
    'Setup i cache sada imaju odvojene odgovornosti.'
  ),
  describeJsFlowStep(
    'connected_callback_sync',
    'JS: connectedCallback sinhronizuje atribute',
    'Dodajemo `syncFromAttributes()` kao prvi enterprise-friendly render pass.',
    'Umesto jednog velikog `render()`, ovde pozivamo uske update metode.'
  ),
  describeJsFlowStep(
    'connected_callback_bind',
    'JS: connectedCallback vezuje evente',
    'Na kraju povezujemo behavior sa već spremnim DOM-om.',
    'Event wiring ide tek kada su DOM reference spremne.'
  ),
  describeJsFlowStep(
    'disconnected_callback',
    'JS: disconnectedCallback cleanup',
    'Komponenta i dalje poštuje ceo lifecycle i skida evente na izlazu.',
    'Production-ready komponenta mora da bude sigurna i pri reconnect scenariju.'
  ),
  describeJsFlowStep(
    'attribute_changed_callback',
    'JS: precizniji attributeChangedCallback',
    'Potpis sada prima `name`, `oldValue` i `newValue`.',
    'Ovo je polazna tačka za uži i predvidiviji update tok.'
  ),
  describeJsFlowStep(
    'attribute_changed_guard',
    'JS: guard za iste vrednosti i disconnected stanje',
    'Odmah izlazimo kada se vrednost nije stvarno promenila ili komponenta još nije povezana.',
    'Enterprise update path ne radi posao bez potrebe.'
  ),
  describeJsFlowStep(
    'attribute_changed_switch',
    'JS: menjamo samo ono što se promenilo',
    'Switch poziva `updateTitle()`, `updateCtaLabel()`, `updateDisabledState()` ili `updateVariant()` zavisno od atributa.',
    'Ovo je glavna razlika u odnosu na demo pristup: nema slepog full render-a na svaku promenu.'
  ),
  describeTeachingStep(
    'precise_updates_over_full_render',
    'Teaching Moment: uski update path',
    'Lesson 07 je već išla ka patch pristupu, ali ovde ga zatežemo do kraja: update tok je sada granularan po responsibility metodi, umesto da svaka promena završi u jednom opštem render pozivu.',
    'Što je update uži, to je komponenta predvidivija za testove, profiling i timsku integraciju.'
  ),
  describeJsFlowStep(
    'property_title_getter',
    'JS: title getter',
    'Dodajemo property getter za `title` i vraćamo normalizovanu vrednost.',
    'Property API otvara čist JS contract pored declarative HTML atributa.'
  ),
  describeJsFlowStep(
    'property_title_setter',
    'JS: title setter',
    'Setter vraća kontrolu na attribute layer i postavlja normalizovan `title`.',
    'Source of truth ostaje na atributu, pa declarative i imperative upotreba ne odlaze u dva sveta.'
  ),
  describeJsFlowStep(
    'property_cta_getter',
    'JS: ctaLabel getter',
    'Dodajemo property getter za `ctaLabel` i uvodimo jasnu JS reprezentaciju `cta-label` atributa.',
    'CamelCase property i kebab-case attribute čine standardni Web Components API par.'
  ),
  describeJsFlowStep(
    'property_cta_setter',
    'JS: ctaLabel setter',
    'Setter piše nazad u `cta-label` atribut i drži isti source of truth model.',
    'Imperative JS API i declarative HTML API sada rade kroz isti kanal.'
  ),
  describeJsFlowStep(
    'property_disabled_getter',
    'JS: disabled getter',
    "Boolean state čitamo kroz `hasAttribute('disabled')`.",
    'Boolean atributi treba da ostanu jednostavni i predvidivi.'
  ),
  describeJsFlowStep(
    'property_disabled_setter',
    'JS: disabled setter',
    "Setter koristi `toggleAttribute('disabled', value)` umesto ručnog string menadžmenta.",
    'Za boolean atribute ovo je najčistiji Web API obrazac.'
  ),
  describeJsFlowStep(
    'property_variant_getter',
    'JS: variant getter',
    'Getter vraća normalizovanu variant vrednost sa fallback-om.',
    'Komponenta nikad ne treba da izbacuje neprovereni variant string dalje kroz UI.'
  ),
  describeJsFlowStep(
    'property_variant_setter',
    'JS: variant setter',
    'Setter normalizuje variant pre upisa nazad u atribut.',
    'Normalization držimo na granici API-ja, ne usred styling logike.'
  ),
  describeJsFlowStep(
    'setup_template_once',
    'JS: Uvodimo setupTemplateOnce()',
    'Template mount dobija sopstvenu responsibility metodu.',
    'Sada je jasno: jedna metoda montira strukturu, druga kešira reference.'
  ),
  describeJsFlowStep(
    'setup_template_once_guard',
    'JS: Template kloniramo samo jednom',
    'Guard sprečava dupliranje markup-a pri reconnect-u.',
    'Reconnect mora da bude boring i bez side effect-a.'
  ),
  describeJsFlowStep(
    'cache_dom',
    'JS: cacheDom sada stvarno samo kešira',
    'U ovoj lekciji `cacheDom()` više ne radi first mount, nego samo pronalazi reference kada zatrebaju.',
    'Ime metode i ponašanje su sada potpuno usklađeni.'
  ),
  describeJsFlowStep(
    'cache_dom_title',
    'JS: cacheDom kešira title referencu',
    'Title element čuvamo na instanci da updateTitle radi bez novog query-ja.',
    'Kasnije update metode rade samo nad malim internim API-jem reference.'
  ),
  describeJsFlowStep(
    'cache_dom_cta',
    'JS: cacheDom kešira CTA referencu',
    'Na isti način čuvamo i CTA dugme.',
    'Kad reference postoje, ostatak klase postaje uži i čistiji.'
  ),
  describeJsFlowStep(
    'sync_from_attributes',
    'JS: syncFromAttributes()',
    'Dodajemo centralno mesto koje pri connect-u sinhronizuje DOM sa atribut API-jem.',
    'Ovo je one-time orchestration, a ne opšti render za svaki slučaj.'
  ),
  describeJsFlowStep(
    'sync_from_attributes_calls',
    'JS: syncFromAttributes poziva update metode',
    'Pri prvom connect-u pozivamo `updateTitle()`, `updateCtaLabel()`, `updateDisabledState()` i `updateVariant()`.',
    'Ovaj tok jasno kaže koje responsibility metode čine inicijalnu sinhronizaciju.'
  ),
  describeJsFlowStep(
    'update_title',
    'JS: updateTitle()',
    'Naslov se ažurira kroz jednu, usku metodu.',
    'Property API i DOM patch sada imaju jasnu jednu tačku dodira.'
  ),
  describeJsFlowStep(
    'update_cta_label',
    'JS: updateCtaLabel()',
    'CTA tekst i `aria-label` ažuriramo zajedno, ali i dalje usko i lokalno.',
    'Accessibility ne ide naknadno; ona je deo istog update contract-a.'
  ),
  describeJsFlowStep(
    'update_disabled_state',
    'JS: updateDisabledState()',
    'Disabled stanje istovremeno ažurira stvarni `<button disabled>` i host `aria-disabled` signal.',
    'State contract mora da se vidi i u DOM semantici, ne samo u vizuelnom CSS-u.'
  ),
  describeJsFlowStep(
    'update_variant',
    'JS: updateVariant()',
    'Variant se normalizuje i potvrđuje nazad na host atributu, a zatim se čuva i kao dataset signal.',
    'Styling contract sada ima jasan gateway: nepoznat variant ne ide dalje bez kontrole.'
  ),
  describeJsFlowStep(
    'bind_events',
    'JS: bindEvents()',
    'Event wiring ostaje u sopstvenoj responsibility metodi.',
    'DOM i behavior se spajaju na jednom mestu.'
  ),
  describeJsFlowStep(
    'bind_events_guard',
    'JS: bindEvents štiti od duplog binding-a',
    'Pre dodavanja listenera proveravamo i ref i state flag.',
    'Double-bind bug ne sme da uđe u lifecycle tok.'
  ),
  describeJsFlowStep(
    'unbind_events',
    'JS: unbindEvents()',
    'Cleanup dobija jasan par za `bindEvents()`.',
    'Ako postoji bind responsibility, treba da postoji i cleanup responsibility.'
  ),
  describeJsFlowStep(
    'unbind_events_guard',
    'JS: unbindEvents skida listener samo kada postoji',
    'Pre cleanup-a proveravamo da je listener stvarno aktivan.',
    'Ovim reconnect ostaje dosadan i siguran.'
  ),
  describeJsFlowStep(
    'handle_click_disabled_guard',
    'JS: handleActionClick()',
    'Klik handler dobija sopstvenu metodu sa jasnim responsibility-jem.',
    'Action method treba da bude mala i predvidiva.'
  ),
  describeJsFlowStep(
    'handle_click_disabled_guard_body',
    'JS: disabled guard u action handleru',
    'Ako je komponenta onemogućena, klik odmah prekidamo.',
    'Disabled nije samo vizuelna etiketa; to je pravo behavioral stanje.'
  ),
  describeJsFlowStep(
    'handle_click_event',
    'JS: namespaced event contract',
    'Emitujemo `ui-callout-card:action` sa `bubbles`, `composed`, `cancelable` i stabilnim `detail` payload-om.',
    'Event contract je deo javnog API-ja, ne interni detalj implementacije.'
  ),
  describeJsFlowStep(
    'define_guard',
    'JS: guard pre registracije',
    'I dalje se čuvamo duplog `customElements.define(...)` poziva.',
    'Hot reload i ponovna evaluacija modula ne smeju da razbiju komponentu.'
  ),
  describeJsFlowStep(
    'define_element',
    'JS: registrujemo ui-callout-card',
    'Komponenta sada ima domain-driven tag, ozbiljniji API i stabilniji lifecycle.',
    'Ovo je tačka gde demo prelazi u reusable primitive.'
  ),
  ...shellCssSteps.map(config => describeCssPropertyStep(...config)),
  describeTeachingStep(
    'host_vs_shadow_styles',
    'Teaching Moment: styling contract',
    'Do ovog trenutka `style.css` je definisao samo host scenu, theme tokene, variants i disabled host signal. Sledeći koraci prelaze u `ui-callout-card.shadow.css`, gde stilizujemo samo unutrašnji card, badge, naslov, opis i CTA.',
    'Pravilo je jednostavno: host/theme/state spolja, card internals unutra.'
  ),
  ...shadowCssSteps.map(config => describeShadowCssPropertyStep(...config)),
  describeSummaryStep(
    'card_summary',
    'Rezime: .card u ui-callout-card.shadow.css',
    'Uklanjamo card helper outline.',
    'Card sada čita javne host tokene bez curenja internog styling contract-a.'
  ),
  describeSummaryStep(
    'eyebrow_summary',
    'Rezime: .eyebrow i slot contract',
    'Uklanjamo eyebrow helper outline.',
    'Badge i slot ostaju mali, ali namerno dizajnirani public surface-i.'
  ),
  describeSummaryStep(
    'cta_summary',
    'Rezime: .cta sa state pravilima',
    'Uklanjamo CTA helper outline.',
    'CTA sada ima hover, focus i disabled ponašanje kao deo stabilnog component contract-a.'
  ),
  describeSummaryStep(
    'host_summary',
    'Rezime: ui-callout-card host',
    'Uklanjamo host outline.',
    'Host sada nosi theme tokene, variants i state signal bez mešanja sa shadow internals.'
  ),
  describeSummaryStep(
    'shell_summary',
    'Rezime: .app-shell',
    'Uklanjamo helper outline sa `.app-shell`.',
    'Okvir je završio posao; fokus ostaje na reusable komponenti.',
    ['<div class="app-shell">']
  ),
  describeFinishedStep(
    'done',
    'Done: Smell Of Enterprise',
    'Lekcija je završena: `index.html` koristi `ui-callout-card`, `ui-callout-card.template.js` drži markup i `part` surface-e, `ui-callout-card.js` vodi public API, lifecycle i event contract, `style.css` theme-uje host, a `ui-callout-card.shadow.css` drži unutrašnji styling.',
    'Najvažnija pouka je da enterprise miris dolazi iz jasnog contract-a: attributes i properties imaju ista pravila, update put je uzak, event payload je stabilan, a styling granica je namerno dizajnirana.'
  )
];

export const stepNumberById = Object.fromEntries(
  lessonSteps.map((step, index) => [step.id, index])
);
