const focusHtmlNeedlesBySelector = {
  '.app-shell': ['<div class="app-shell">'],
  'ui-user-avatar': ['<ui-user-avatar', 'username='],
  'ui-user-avatar[status="online"]': ['<ui-user-avatar', 'status="online"'],
  'ui-user-avatar[status="idle"]': ['<ui-user-avatar', 'status="idle"'],
  'ui-user-avatar[status="away"]': ['<ui-user-avatar', 'status="away"'],
  'ui-user-avatar[status="offline"]': ['<ui-user-avatar', 'status="offline"'],
  ':host': ['<ui-user-avatar', 'username='],
  '.avatar-container': ['<ui-user-avatar', 'username='],
  '.avatar-image': ['<ui-user-avatar', 'username='],
  '.avatar-image:hover': ['<ui-user-avatar', 'username='],
  '::slotted([slot="initials"])': ['slot="initials"', '<ui-user-avatar'],
  '.status-badge': ['<ui-user-avatar', 'status='],
  '.avatar-info': ['<ui-user-avatar', 'username='],
  '.username': ['<ui-user-avatar', 'username='],
  '.role': ['<ui-user-avatar', 'role='],
  '.tooltip': ['<ui-user-avatar', 'username='],
  ':host(:hover) .tooltip, :host(:focus-within) .tooltip': ['<ui-user-avatar'],
  ':host(:focus-visible)': ['<ui-user-avatar']
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
    proTip: proTip || 'Host CSS drži spoljašnji theme, status variants i token contract na samom custom elementu.',
    focusHtmlNeedles: readFocusHtmlNeedles(selector)
  };
}

function describeShadowCssPropertyStep(id, selector, property, value, desc = '', proTip = '') {
  const cssLine = `${property}: ${value};`;

  return {
    id,
    title: `Shadow CSS: ${selector} / ${property}`,
    desc: desc || `U \`ui-user-avatar.shadow.css\` dodajemo \`${cssLine}\` za \`${selector}\`.`,
    tag: `shadow-css:${id.replace(/_/g, '-')}`,
    proTip: proTip || 'Shadow CSS stilizuje samo unutrašnju strukturu komponente; host token API kontroliše temu spolja.',
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
    focusHtmlNeedles: readFocusHtmlNeedles('ui-user-avatar')
  };
}

function describeTeachingStep(id, title, desc, proTip, focusHtmlNeedles = readFocusHtmlNeedles('ui-user-avatar')) {
  return {
    id,
    title,
    desc,
    tag: `teaching:${id.replace(/_/g, '-')}`,
    proTip,
    focusHtmlNeedles
  };
}

function describeJsFlowStep(id, title, desc, proTip, focusHtmlNeedles = readFocusHtmlNeedles('ui-user-avatar')) {
  return {
    id,
    title,
    desc,
    tag: `js:${id.replace(/_/g, '-')}`,
    proTip,
    focusHtmlNeedles
  };
}

function describeSummaryStep(id, title, desc, proTip, focusHtmlNeedles = readFocusHtmlNeedles('ui-user-avatar')) {
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
  ['shell_outline', '.app-shell', 'outline', '1px dashed #94a3b8', 'Dodajemo tanak helper outline za `.app-shell` i držimo ga do završnog shell rezimea.', 'App shell ostaje neutralna pozornica za enterprise dashboard widget.'],
  ['shell_padding', '.app-shell', 'padding', '48px 32px', 'Breathing prostor drži scenu urednom.'],
  ['shell_display', '.app-shell', 'display', 'grid', 'Grid pravi jedinstven container za widget.'],
  ['shell_place_items', '.app-shell', 'place-items', 'center', 'Widget treba da bude centriran u demo sceni.'],
  ['shell_gap', '.app-shell', 'gap', '24px', 'Gap priprema prostor za eventualni drugi avatar.'],
  ['shell_min_height', '.app-shell', 'min-height', '100vh', 'Puna visina drži dark pozadinu stabilnom.'],
  ['shell_background', '.app-shell', 'background', 'linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', 'Tamna pozadina naglašava avatar widget.'],
  ['host_outline', 'ui-user-avatar', 'outline', '1px solid #f97316', 'Dodajemo host helper outline i držimo ga do završnog host rezimea.', 'Host je javni contract surface; outline pomaže orijentaciji.'],
  ['host_display', 'ui-user-avatar', 'display', 'inline-block', 'Avatar ostaje kompaktan inline-block element.'],
  ['host_position', 'ui-user-avatar', 'position', 'relative', 'Pozicija pravi stacking kontekst za tooltip.'],
  ['host_cursor', 'ui-user-avatar', 'cursor', 'pointer', 'Avatar je klikabilna zona — cursor to mora jasno da kaže.'],
  ['host_surface_token', 'ui-user-avatar', '--avatar-surface', '#1e293b', 'Počinjemo token contract: površina je spolja theme-ovana.'],
  ['host_surface_alt_token', 'ui-user-avatar', '--avatar-surface-alt', '#0f172a', 'Alternativna površina drži gradijent konzistentnim.'],
  ['host_accent_token', 'ui-user-avatar', '--avatar-accent', '#38bdf8', 'Accent token vodi boju avatara i detalja.'],
  ['host_text_token', 'ui-user-avatar', '--avatar-text', '#f1f5f9', 'Text token čuva kontrast u celom widgetu.'],
  ['host_muted_token', 'ui-user-avatar', '--avatar-muted', '#94a3b8', 'Muted token pokriva role i sekundarne labele.'],
  ['host_border_token', 'ui-user-avatar', '--avatar-border', 'rgba(148,163,184,0.2)', 'Border token drži ivice neagresivnim na tamnoj pozadini.'],
  ['host_shadow_token', 'ui-user-avatar', '--avatar-shadow', '0 8px 32px rgba(15,23,42,0.48)', 'Shadow token ide kao javni contract, ne internu magiju.'],
  ['host_status_color_token', 'ui-user-avatar', '--avatar-status-color', '#22c55e', 'Status boja je javni host token — variants ga samo prepišu.'],
  ['variant_online_status_color', 'ui-user-avatar[status="online"]', '--avatar-status-color', '#22c55e', 'Online status dobija zeleni signal.', 'Variants idu spolja, ne unutar shadow CSS-a.'],
  ['variant_idle_status_color', 'ui-user-avatar[status="idle"]', '--avatar-status-color', '#facc15', 'Idle dobija žuti signal.'],
  ['variant_away_status_color', 'ui-user-avatar[status="away"]', '--avatar-status-color', '#fb923c', 'Away dobija narandžasti signal.'],
  ['variant_offline_status_color', 'ui-user-avatar[status="offline"]', '--avatar-status-color', '#64748b', 'Offline dobija sivi, neutralni signal.']
];

const shadowCssSteps = [
  ['shadow_host_display', ':host', 'display', 'inline-block', 'Shadow host potvrđuje inline-block model iznutra.'],
  ['shadow_host_font_family', ':host', 'font-family', 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', 'Font stack ostaje interni shadow contract.'],
  ['shadow_host_color', ':host', 'color', 'var(--avatar-text, #f1f5f9)', 'Boja čita spoljašnji text token.'],
  ['container_outline', '.avatar-container', 'outline', '1px dashed #38bdf8', 'Dodajemo helper outline za avatar container.', 'Container drži sve vizuelne delove avatara na jednom mestu.'],
  ['container_position', '.avatar-container', 'position', 'relative', 'Relative pozicija pravi stacking kontekst za status badge i tooltip.'],
  ['container_display', '.avatar-container', 'display', 'inline-flex', 'Flex pravi vertikalni stack avatar delova.'],
  ['container_direction', '.avatar-container', 'flex-direction', 'column', 'Kolona slaže sliku, info i tooltip vertikalno.'],
  ['container_align', '.avatar-container', 'align-items', 'center', 'Sve celine se centriraju horizontalno.'],
  ['container_gap', '.avatar-container', 'gap', '8px', 'Gap drži rastojanje između slike i info zone.'],
  ['image_outline', '.avatar-image', 'outline', '1px dashed #a78bfa', 'Dodajemo helper outline za avatar sliku.', 'Avatar krug je centralni vizuelni element widgeta.'],
  ['image_position', '.avatar-image', 'position', 'relative', 'Relative pravi stacking kontekst za absolutni status badge.'],
  ['image_width', '.avatar-image', 'width', '72px', 'Avatar krug dobija standardnu veličinu.'],
  ['image_height', '.avatar-image', 'height', '72px', 'Visina odgovara širini — idemo ka krugu.'],
  ['image_radius', '.avatar-image', 'border-radius', '50%', 'Puni radius završava avatar krug.'],
  ['image_background', '.avatar-image', 'background', 'linear-gradient(135deg, var(--avatar-accent, #38bdf8), #6366f1)', 'Gradijent pozadina koja se vidi iza inicijala.'],
  ['image_border', '.avatar-image', 'border', '2px solid var(--avatar-border, rgba(148,163,184,0.2))', 'Border čita host token.'],
  ['image_shadow', '.avatar-image', 'box-shadow', 'var(--avatar-shadow, 0 8px 32px rgba(15,23,42,0.48))', 'Shadow dolazi iz host contract-a.'],
  ['image_display', '.avatar-image', 'display', 'flex', 'Flex centrira inicijale unutar kruga.'],
  ['image_align', '.avatar-image', 'align-items', 'center', 'Vertikalno centriranje inicijala.'],
  ['image_justify', '.avatar-image', 'justify-content', 'center', 'Horizontalno centriranje inicijala.'],
  ['image_overflow', '.avatar-image', 'overflow', 'hidden', 'Overflow hidden reže bilo koji sadržaj van kruga.'],
  ['image_transition', '.avatar-image', 'transition', 'transform 180ms ease, box-shadow 180ms ease', 'Tranzicija pravi glatki hover lift.'],
  ['image_hover_transform', '.avatar-image:hover', 'transform', 'scale(1.05)', 'Blagi scale na hover daje interaktivni feel.', 'Hover treba da potvrdi klikabilnost.'],
  ['image_hover_shadow', '.avatar-image:hover', 'box-shadow', '0 12px 40px rgba(56,189,248,0.28)', 'Accent shadow na hover potvrđuje interakciju.'],
  ['initials_font_size', '::slotted([slot="initials"])', 'font-size', '24px', 'Inicijali dobijaju jasnu veličinu unutar kruga.', 'Named slot je javna API površina — stilizujemo ga unutar shadow konteksta.'],
  ['initials_font_weight', '::slotted([slot="initials"])', 'font-weight', '800', 'Jaki bold drži inicijale čitkim.'],
  ['initials_color', '::slotted([slot="initials"])', 'color', '#ffffff', 'Beli tekst drži kontrast na gradijent pozadini.'],
  ['initials_letter_spacing', '::slotted([slot="initials"])', 'letter-spacing', '0.04em', 'Mali tracking poboljšava čitljivost.'],
  ['initials_select', '::slotted([slot="initials"])', 'user-select', 'none', 'Inicijali ne treba da budu selektabilni.'],
  ['status_outline', '.status-badge', 'outline', '1px dotted #facc15', 'Dodajemo helper outline za status badge.', 'Status badge je mali ali kritičan signal widgeta.'],
  ['status_position', '.status-badge', 'position', 'absolute', 'Absolute ga pozicionira unutar avatar tipa.'],
  ['status_bottom', '.status-badge', 'bottom', '2px', 'Pozicioniramo badge u donji desni ugao.'],
  ['status_right', '.status-badge', 'right', '2px', 'Desno od centra, standardna pozicija status badge-a.'],
  ['status_width', '.status-badge', 'width', '16px', 'Mali kružić.'],
  ['status_height', '.status-badge', 'height', '16px', 'Visina odgovara širini.'],
  ['status_radius', '.status-badge', 'border-radius', '50%', 'Puni radius završava status krug.'],
  ['status_background', '.status-badge', 'background', 'var(--avatar-status-color, #22c55e)', 'Boja čita host status token — nikad hardkodovana iznutra.'],
  ['status_border', '.status-badge', 'border', '2px solid var(--avatar-surface, #1e293b)', 'Border odvaja badge od pozadine avatara.'],
  ['status_transition', '.status-badge', 'transition', 'background 240ms ease', 'Tranzicija pravi glatku promenu statusa.'],
  ['info_outline', '.avatar-info', 'outline', '1px dashed #34d399', 'Dodajemo helper outline za info zonu.', 'Info zona drži username i role labele.'],
  ['info_display', '.avatar-info', 'display', 'flex', 'Flex pravi vertikalni stack tekstova.'],
  ['info_direction', '.avatar-info', 'flex-direction', 'column', 'Kolona slaže username iznad role-a.'],
  ['info_align', '.avatar-info', 'align-items', 'center', 'Centriramo oba teksta ispod avatara.'],
  ['info_gap', '.avatar-info', 'gap', '2px', 'Minimal gap drži tekstove fokusiranim.'],
  ['username_font_size', '.username', 'font-size', '14px', 'Solidna veličina za primarnu labelu.'],
  ['username_font_weight', '.username', 'font-weight', '700', 'Bold drži username kao primarni signal.'],
  ['username_color', '.username', 'color', 'var(--avatar-text, #f1f5f9)', 'Čita text token.'],
  ['username_white_space', '.username', 'white-space', 'nowrap', 'Username ostaje na jednoj liniji.'],
  ['role_font_size', '.role', 'font-size', '11px', 'Manji font čini role sekundarnim signals.'],
  ['role_font_weight', '.role', 'font-weight', '500', 'Medium weight drži role čitkim ali podređenim.'],
  ['role_color', '.role', 'color', 'var(--avatar-muted, #94a3b8)', 'Muted token daje sekundarni signal.'],
  ['role_text_transform', '.role', 'text-transform', 'uppercase', 'Uppercase zatvara role kao kategorijsku labelu.'],
  ['role_letter_spacing', '.role', 'letter-spacing', '0.06em', 'Tracking čini role urednom.'],
  ['role_white_space', '.role', 'white-space', 'nowrap', 'Role ostaje na jednoj liniji.'],
  ['tooltip_outline', '.tooltip', 'outline', '1px dotted #f472b6', 'Dodajemo helper outline za tooltip.', 'Tooltip je interaktivna informaciona zona.'],
  ['tooltip_position', '.tooltip', 'position', 'absolute', 'Absolute ga odvaja od normalnog toka.'],
  ['tooltip_bottom', '.tooltip', 'bottom', 'calc(100% + 10px)', 'Tooltip se pojavljuje iznad avatara.'],
  ['tooltip_left', '.tooltip', 'left', '50%', 'Levim rubom krenemo od centra.'],
  ['tooltip_transform', '.tooltip', 'transform', 'translateX(-50%)', 'Negativan translate centrira tooltip.'],
  ['tooltip_background', '.tooltip', 'background', '#0f172a', 'Très tamna pozadina drži tooltip čitkim.'],
  ['tooltip_border', '.tooltip', 'border', '1px solid var(--avatar-border, rgba(148,163,184,0.2))', 'Border tok čita host token.'],
  ['tooltip_color', '.tooltip', 'color', 'var(--avatar-text, #f1f5f9)', 'Text čita host token.'],
  ['tooltip_padding', '.tooltip', 'padding', '8px 12px', 'Padding daje tooltip-u pravi footprint.'],
  ['tooltip_radius', '.tooltip', 'border-radius', '8px', 'Zaobljenje drži tooltip modernim.'],
  ['tooltip_font_size', '.tooltip', 'font-size', '12px', 'Manji font za tooltip tip.'],
  ['tooltip_white_space', '.tooltip', 'white-space', 'nowrap', 'Tooltip ostaje u jednom redu.'],
  ['tooltip_pointer_events', '.tooltip', 'pointer-events', 'none', 'Tooltip ne blokirа klik na avatar.'],
  ['tooltip_opacity_start', '.tooltip', 'opacity', '0', 'Tooltip startu nevidljiv.'],
  ['tooltip_transition', '.tooltip', 'transition', 'opacity 180ms ease, transform 180ms ease', 'Tranzicija pravi glatko prikazivanje.'],
  ['tooltip_z_index', '.tooltip', 'z-index', '10', 'Z-index drži tooltip iznad ostatka DOM-a.'],
  ['tooltip_hover_opacity', ':host(:hover) .tooltip, :host(:focus-within) .tooltip', 'opacity', '1', 'Na hover tooltip postaje vidljiv.', 'Focus-within pokriva i tastatursku navigaciju.'],
  ['tooltip_hover_transform', ':host(:hover) .tooltip, :host(:focus-within) .tooltip', 'transform', 'translateX(-50%) translateY(-4px)', 'Mali lift daje tooltip-u dinamičan ulaz.'],
  ['host_focus_outline', ':host(:focus-visible)', 'outline', '3px solid rgba(56,189,248,0.55)', 'Focus-visible dodaje tastaturski focus ring.', 'Klavijaturska navigacija mora biti jasno vidljiva.'],
  ['host_focus_outline_offset', ':host(:focus-visible)', 'outline-offset', '4px', 'Offset drži ring dalje od ivice.'],
  ['host_focus_radius', ':host(:focus-visible)', 'border-radius', '50%', 'Radius čini focus ring kružnim uz avatar.']
];

export const lessonSteps = [
  describeHtmlElementStep(
    'empty_shell',
    'Start: Empty App Shell',
    'Počinjemo od praznog `.app-shell` prostora. Dashboard widget živi u neutralnom host okruženju.',
    'html:app-shell',
    'Enterprise widget mora da radi u bilo kom host kontekstu, ne samo u specijalnoj demo sceni.',
    ['<div class="app-shell">']
  ),
  describeHtmlElementStep(
    'component_html',
    'HTML: ui-user-avatar Host',
    'Dodajemo `<ui-user-avatar>` sa `username` i `role` atributima. Tag odmah govori šta ovaj widget jeste.',
    'html:ui-user-avatar',
    'Domain-driven naming je prvi enterprise signal: ime taga mora da sugeriše business ulogu komponente.'
  ),
  describeHtmlElementStep(
    'status_attribute_html',
    'HTML: status="online"',
    'Dodajemo `status="online"` i uvodimo deklarativni status API. Status je deo HTML contract-a, ne JavaScript stanja.',
    'html:status',
    'Declarative status API znači da tim može da promeni status jedino pisanjem atributa, bez znanja o internim detaljima.'
  ),
  describeHtmlElementStep(
    'profile_url_attribute_html',
    'HTML: profile-url atribut',
    'Dodajemo `profile-url` koji ide u event payload pri kliku. Komponenta ne navigira sama.',
    'html:profile-url',
    'Enterprise komponenta emituje event sa payload-om. Ko otvori modal ili navigira — to odlučuje parent, ne komponenta.'
  ),
  describeHtmlElementStep(
    'initials_slot_html',
    'HTML: Named Slot — initials',
    'Dodajemo `<span slot="initials">AP</span>`. Slot je javna API površina za inicijale ili sliku.',
    'html:slot-initials',
    'Named slot dozvoljava parent-u da pošalje custom sadržaj. Komponenta ne zna šta je inicijal ili avatar image — samo pravi prostor.'
  ),
  describeHtmlElementStep(
    'tooltip_slot_html',
    'HTML: Named Slot — tooltip',
    'Dodajemo `<span slot="tooltip">` sa punim contextualnim opisom član tima. Tooltip sadržaj kontroliše parent.',
    'html:slot-tooltip',
    'Tooltip je drugi named slot. Sadržaj može biti plain tekst, HTML, pa i keyboard shortcut — komponenta drži samo posuda.'
  ),
  describeTeachingStep(
    'avatar_widget_contract',
    'Teaching Moment: Dashboard Widget Contract',
    'Ovaj widget ima četiri javna atributa: `username`, `role`, `status`, `profile-url`. Ima dva named slota: `initials` i `tooltip`. Emituje jedan namespaced event: `ui-user-avatar:profile-open`. Nema internog routing-a i nema opisivanja šta parent treba da uradi.',
    'Enterprise widget API treba da bude uzan, predvidiv i dokumentovan kao javni contract.',
    ['<ui-user-avatar', 'username=']
  ),
  describeTemplateJsStep(
    'template_html_declaration',
    'Template JS: Shadow DOM struktura',
    'U `ui-user-avatar.template.js` definiše `templateHtml`: avatar-container, avatar-image sa slot za inicijale, status-badge, avatar-info sa username i role spanovima, i tooltip sa named slotom.',
    'Template modul nosi samo strukturu. Nema lifecycle-a, nema eventa, nema podataka.'
  ),
  describeTemplateJsStep(
    'template_element_export',
    'Template JS: Eksportujemo template element',
    'Kreiramo `uiUserAvatarTemplate`, dodajemo `<link>` ka shadow CSS fajlu i ubrizgavamo `${templateHtml}`.',
    'Template zna za markup i stylesheet ulaz. Klasa ga samo klonira — nikad rekreira.'
  ),
  describeJsFlowStep(
    'import_template',
    'JS: Uvozimo template modul',
    'Behavior fajl uvozi `uiUserAvatarTemplate` iz template modula. Klasa ne gradi HTML stringove.',
    'Ovo je prva jasna granica: class i template su odvojeni fajlovi sa odvojenim odgovornostima.'
  ),
  describeJsFlowStep(
    'normalize_text_helper',
    'JS: normalizeTextValue() helper',
    'Dodajemo `normalizeTextValue()` da username i role ne zavise od sirovog ulaza.',
    'API border normalizuje ulaz. Komponenta nikad ne radi sa undefined ili praznim stringovima bez fallback-a.'
  ),
  describeJsFlowStep(
    'allowed_statuses_set',
    'JS: allowedStatuses Set',
    'Zaključavamo dozvoljene statusne vrednosti: `online`, `idle`, `away`, `offline`.',
    'Otvoreni string API za status koji direktno utiče na styling je rizičan. Set ga zatvara.'
  ),
  describeJsFlowStep(
    'normalize_status_helper',
    'JS: normalizeStatusValue() helper',
    'Dodajemo `normalizeStatusValue()`. Svaki nepoznat status automatski pada na `offline`.',
    'Fallback je deo contract-a. Komponenta ne sme da padne zbog pogrešno napisanog statusa.'
  ),
  describeJsFlowStep(
    'status_label_map',
    'JS: statusAriaLabel mapa',
    'Dodajemo `statusAriaLabel` objekat koji mapira status vrednosti na human-readable aria labele.',
    'Accessibility nije opciona. Status badge mora imati smislenu aria labelu na svakom koraku.'
  ),
  describeJsFlowStep(
    'class_declaration',
    'JS: UiUserAvatar extends HTMLElement',
    'Klasa nosi domain-driven ime, konzistentno sa tagom.',
    'Class ime i tag treba da pričaju istu priču: `ui-user-avatar` → `UiUserAvatar`.'
  ),
  describeJsFlowStep(
    'observed_attributes',
    'JS: observedAttributes — sva četiri',
    'Komponenta prati `username`, `role`, `status` i `profile-url` — tačno onoliko koliko je deklarirano kao javni API.',
    'Observed attributes su spoljašnji declarative API ulaz. Ne pratimo ništa što nije javno.'
  ),
  describeJsFlowStep(
    'constructor_shadow',
    'JS: constructor otvara shadow root',
    'Konstruktor samo priprema instancu: shadow root, bind i nulte reference.',
    'Konstruktor ne radi lifecycle posao. Ne radi render, ne čita DOM, ne zakačuje evente.'
  ),
  describeJsFlowStep(
    'constructor_bind',
    'JS: constructor pre-binduje click handler',
    'Vezujemo `handleAvatarClick` jednom, pri kreiranju instance.',
    'Pre-bind osigurava stabilan event cleanup — isti objekat koji dodajemo možemo sigurno da uklonimo.'
  ),
  describeJsFlowStep(
    'constructor_state',
    'JS: constructor priprema interne reference',
    'Nulujemo DOM reference i state flag za click binding.',
    'Interno stanje ostaje transparentno i predvidivo od prvog reda.'
  ),
  describeJsFlowStep(
    'connected_callback',
    'JS: connectedCallback — lifestyle ulaz',
    'Connected lifecycle je glavni ulaz kada widget uđe u živi DOM.',
    'Sve što zavisi od živog DOM-a ide u connectedCallback, ne u constructor.'
  ),
  describeJsFlowStep(
    'connected_callback_setup',
    'JS: connectedCallback poziva setupTemplateOnce',
    'Prvo jednom montiramo template u shadow root.',
    'Mount i cache imaju odvojene metode i odvojene odgovornosti.'
  ),
  describeJsFlowStep(
    'connected_callback_cache',
    'JS: connectedCallback poziva cacheDom',
    'Kad template postoji, keširamo DOM reference.',
    'query selector radi samo jednom — reference žive na instanci.'
  ),
  describeJsFlowStep(
    'connected_callback_sync',
    'JS: connectedCallback sinhronizuje atribute',
    'Pozivamo `syncFromAttributes()` kao prvi ciljani render pass.',
    'Ovo nije opšti render — to je skup uskih update metoda koje inicijalizuju tačno ono što treba.'
  ),
  describeJsFlowStep(
    'connected_callback_bind',
    'JS: connectedCallback zakačuje evente',
    'Tek na kraju, kad su reference spremne, zakačujemo event listenere.',
    'Event wiring ide poslednji — DOM mora biti spreman pre binding-a.'
  ),
  describeJsFlowStep(
    'disconnected_callback',
    'JS: disconnectedCallback cleanup',
    'Na izlazu iz DOM-a skidamo event listener.',
    'Production widget mora biti siguran i pri reconnect scenariju. Leak-ovi eventa su stvarni bug.'
  ),
  describeJsFlowStep(
    'attribute_changed_callback',
    'JS: precizan attributeChangedCallback',
    'Potpis prima `name`, `oldValue` i `newValue` — tri argumenta su tačan Web Components API.',
    'Tačan API potpis je uslov za ispravno granularno razlikovanje promena.'
  ),
  describeJsFlowStep(
    'attribute_changed_guard',
    'JS: guard za iste vrednosti i disconnected stanje',
    'Odmah izlazimo ako se vrednost nije promenila ili widget još nije u živom DOM-u.',
    'Enterprise update path ne troši resurse bez potrebe.'
  ),
  describeJsFlowStep(
    'attribute_changed_switch',
    'JS: switch — menjamo samo ono što se promenilo',
    'Switch poziva `updateUsername()`, `updateRole()` ili `updateStatus()` zavisno od atributa koji se promenio.',
    'Granularni update je ključna razlika: nema slepog full-render poziva za svaku atributsku promenu.'
  ),
  describeJsFlowStep(
    'property_username_getter',
    'JS: username getter',
    'Property getter vraća normalizovani username sa fallback-om.',
    'Property API otvara čist JS contract pored declarative HTML atributa.'
  ),
  describeJsFlowStep(
    'property_username_setter',
    'JS: username setter',
    'Setter piše nazad u atribut — source of truth ostaje na atributu.',
    'Imperative JS i declarative HTML API rade kroz isti kanal.'
  ),
  describeJsFlowStep(
    'property_role_getter',
    'JS: role getter',
    'Getter vraća normalizovanu role vrednost.',
    'Role može biti prazan string — to je validno stanje.'
  ),
  describeJsFlowStep(
    'property_role_setter',
    'JS: role setter',
    'Setter piše normalizovanu role nazad u atribut.',
    'Isti model kao username: atribut je jedini source of truth.'
  ),
  describeJsFlowStep(
    'property_status_getter',
    'JS: status getter',
    'Getter vraća normalizovani status sa fallback-om na `offline`.',
    'Nikad ne vraćamo nevalidni status dalje kroz sistem.'
  ),
  describeJsFlowStep(
    'property_status_setter',
    'JS: status setter',
    'Setter normalizuje status pre upisa — nevalidni ulaz se pretvara u `offline`.',
    'Normalizacija ide na granici API-ja, ne usred update logike.'
  ),
  describeJsFlowStep(
    'property_profile_url_getter',
    'JS: profileUrl getter',
    'Getter vraća `profile-url` atribut bez normalizacije — URL je otvoren string.',
    'Profile URL nije validovan u widgetu; parent je odgovoran za tačnost URL-a.'
  ),
  describeJsFlowStep(
    'setup_template_once',
    'JS: setupTemplateOnce()',
    'Template mount dobija sopstvenu metodu.',
    'Jasno ime kaže: montira se jednom, ne na svaki connectedCallback.'
  ),
  describeJsFlowStep(
    'setup_template_once_guard',
    'JS: guard sprečava dupliranje',
    'Kloniramo template samo ako shadow root nema child node-ova.',
    'Reconnect scenariji moraju biti boring — bez dupliranja DOM-a.'
  ),
  describeJsFlowStep(
    'cache_dom',
    'JS: cacheDom — samo kešira reference',
    'cacheDom ne montira template i ne radi render. Samo pronalazi reference ako ne postoje.',
    'Ime i ponašanje su usklađeni: cache znači pamti referencu, ne gradi DOM.'
  ),
  describeJsFlowStep(
    'cache_dom_username',
    'JS: cacheDom kešira .username element',
    'Username span čuvamo jednom da updateUsername ne mora da radi query pri svakoj promeni.',
    'DOM query jednom; update metode rade nad čuvanom referencom.'
  ),
  describeJsFlowStep(
    'cache_dom_role',
    'JS: cacheDom kešira .role element',
    'Role span čuvamo na isti način.',
    'Svaki DOM element koji menjamo kešira se pojedinačno i eksplicitno.'
  ),
  describeJsFlowStep(
    'cache_dom_status_badge',
    'JS: cacheDom kešira .status-badge',
    'Status badge element čuvamo za aria-label update.',
    'I elementi koji ne menjaju textContent treba da budu keširani ako ih update metode diraju.'
  ),
  describeJsFlowStep(
    'sync_from_attributes',
    'JS: syncFromAttributes()',
    'Centralna one-time inicijalizacija koja propagira sve atribute u DOM na prvom connect-u.',
    'Ovo nije opšti render; to je orchestration metoda koja zove uske update metode.'
  ),
  describeJsFlowStep(
    'sync_from_attributes_calls',
    'JS: sync poziva sva tri updatera',
    'Pozivamo `updateUsername()`, `updateRole()` i `updateStatus()` pri inicijalnom connect-u.',
    'Svaki poziv je uski i odvojen — lako se testira i debuguje individualno.'
  ),
  describeJsFlowStep(
    'update_username',
    'JS: updateUsername()',
    'Username element dobija tačno ono što property API vrati.',
    'Jedna metoda, jedna odgovornost: piše username u DOM.'
  ),
  describeJsFlowStep(
    'update_role',
    'JS: updateRole()',
    'Role element ažuriramo kroz istu usku metodu.',
    'Svaki tekstualni DOM element ima svoju update metodu.'
  ),
  describeJsFlowStep(
    'update_status',
    'JS: updateStatus()',
    'Status badge dobija ažuriranu aria-label iz `statusAriaLabel` mape.',
    'Status vizuelna promena se dešava kroz CSS token — JS samo drži aria accessibility u sinhronizaciji.'
  ),
  describeJsFlowStep(
    'bind_events',
    'JS: bindEvents()',
    'Event wiring ostaje u sopstvenoj responsibility metodi.',
    'Bind i unbind idu uvek u par, sa jasnim imenima.'
  ),
  describeJsFlowStep(
    'bind_events_guard',
    'JS: bindEvents štiti od duplog binding-a',
    'Flag `isClickBound` sprečava dvostruko kačenje listenera. Postavljamo i `tabindex` i `role` atribute za accessibility.',
    'Widget mora biti navigabilan tastaturom — tabindex i role su deo tog contract-a.'
  ),
  describeJsFlowStep(
    'unbind_events',
    'JS: unbindEvents()',
    'Cleanup metoda postoji za svaki bind scenario.',
    'Ako postoji bind, mora postojati i cleanup. Bez izuzetka.'
  ),
  describeJsFlowStep(
    'unbind_events_guard',
    'JS: unbindEvents skida listener samo kada postoji',
    'Guard sprečava grešku pri pokušaju skidanja listenera koji nije zakačen.',
    'Reconnect moraju biti dosadni — bez neregularnih situacija.'
  ),
  describeJsFlowStep(
    'handle_avatar_click',
    'JS: handleAvatarClick()',
    'Klik handler emituje namespaced event sa punim payload-om.',
    'Handler je mali i predvidiv: jedna odgovornost — emitovanje event-a.'
  ),
  describeJsFlowStep(
    'handle_avatar_click_event',
    'JS: ui-user-avatar:profile-open event',
    'Emitujemo `ui-user-avatar:profile-open` sa `bubbles`, `composed`, `cancelable` i stabilnim `detail`-om: username, role, status, profileUrl, source.',
    'Event contract je deo javnog API-ja. Parent sluša ovaj event i odlučuje da li otvara modal, navigira ili radi nešto treće.'
  ),
  describeJsFlowStep(
    'define_guard',
    'JS: guard pre registracije',
    'Proveravamo da li je element već registrovan pre `customElements.define()`.',
    'Hot reload i SSR scenariji ne smeju bacati grešku pri ponovnoj evaluaciji modula.'
  ),
  describeJsFlowStep(
    'define_element',
    'JS: registrujemo ui-user-avatar',
    'Komponenta je registrovana: `customElements.define("ui-user-avatar", UiUserAvatar)`.',
    'Od ovog momenta svaki `<ui-user-avatar>` u DOM-u dobija pun lifecycle i API.'
  ),
  ...shellCssSteps.map(config => describeCssPropertyStep(...config)),
  describeTeachingStep(
    'host_vs_shadow_styles',
    'Teaching Moment: Token styling contract',
    'Host CSS drži token kontrakt i status variants. Svaka promena statusa menja samo `--avatar-status-color` token — bez diranja shadow internals. Sledeći koraci prelaze u `ui-user-avatar.shadow.css`.',
    'Ovde je granica: host/theme/variants spolja, widget internals unutra.',
    ['<ui-user-avatar', 'username=']
  ),
  ...shadowCssSteps.map(config => describeShadowCssPropertyStep(...config)),
  describeSummaryStep(
    'container_summary',
    'Rezime: .avatar-container',
    'Uklanjamo container helper outline.',
    'Container drži sve vizuelne delove u jednom stacking kontekstu.'
  ),
  describeSummaryStep(
    'image_summary',
    'Rezime: .avatar-image',
    'Uklanjamo image helper outline.',
    'Avatar krug sada ima gradijent, border, shadow i hover interakciju.'
  ),
  describeSummaryStep(
    'status_summary',
    'Rezime: .status-badge',
    'Uklanjamo status badge helper outline.',
    'Status badge čita `--avatar-status-color` token — status varijante menjaju samo taj token.'
  ),
  describeSummaryStep(
    'info_summary',
    'Rezime: .avatar-info',
    'Uklanjamo info zone helper outline.',
    'Username i role su sada stilizovani sa jasnom hijerarhijom.'
  ),
  describeSummaryStep(
    'tooltip_summary',
    'Rezime: .tooltip',
    'Uklanjamo tooltip helper outline.',
    'Tooltip se pojavljuje na hover i focus-within sa glatkom animacijom.'
  ),
  describeSummaryStep(
    'host_summary',
    'Rezime: ui-user-avatar host',
    'Uklanjamo host helper outline.',
    'Host nosi token contract, variants i interaktivni cursor. Shadow ostaje izolovan.'
  ),
  describeSummaryStep(
    'shell_summary',
    'Rezime: .app-shell',
    'Uklanjamo shell helper outline.',
    'Dashboard widget živi u tamnoj sceni, spreman za integraciju u pravi tim panel.',
    ['<div class="app-shell">']
  ),
  describeFinishedStep(
    'done',
    'Done: UI User Avatar Dashboard Widget',
    '`ui-user-avatar` je završen: `index.html` deklarativno koristi atribute i slotove, `ui-user-avatar.template.js` drži shadow strukturu, `ui-user-avatar.js` vodi property API, lifecycle i namespaced event contract, `style.css` theme-uje host i variants, a `ui-user-avatar.shadow.css` drži unutrašnji styling widgeta.',
    'Enterprise widget contract je uzan: četiri atributa, dva slota, jedan event. Parent odlučuje šta se dešava pri kliku — widget samo emituje signal.'
  )
];

export const stepNumberById = Object.fromEntries(
  lessonSteps.map((step, index) => [step.id, index])
);
