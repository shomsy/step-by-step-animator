const focusHtmlNeedlesBySelector = {
  '.app-shell': ['<div class="app-shell">'],
  '.sidebar': ['class="sidebar"'],
  '.sidebar-brand': ['class="sidebar-brand"'],
  '.logo': ['class="logo"'],
  '.brand-copy': ['class="brand-copy"'],
  '.brand-copy strong': ['<strong>'],
  '.brand-copy span': ['<span>'],
  '.nav-list': ['class="nav-list"'],
  '.nav-item': ['class="nav-item'],
  '.nav-item .icon': ['class="icon"'],
  '.nav-item .label': ['class="label"'],
  '.nav-item.active': ['class="nav-item active"'],
  '.nav-item:hover': ['class="nav-item'],
  '.sidebar.is-collapsed': ['class="sidebar"'],
  '.sidebar.is-collapsed .brand-copy, .sidebar.is-collapsed .nav-item .label': ['class="brand-copy"', 'class="label"'],
  '.sidebar-footer': ['class="sidebar-footer"'],
  '.sidebar-footer p': ['<p>Sidebar nije samo lista linkova.']
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
    proTip: proTip || 'Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.',
    focusHtmlNeedles: readFocusHtmlNeedles(selector)
  };
}

function describeCssSummaryStep(id, title, desc, proTip, focusHtmlNeedles = []) {
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

export const lessonSteps = [
  describeHtmlElementStep(
    'empty_shell',
    'Start: Empty App Shell',
    'Počinjemo od praznog `.app-shell` prostora. Sidebar tek dodajemo kao prvi pravi element.',
    'html:app-shell',
    'Neutralan početak jasno odvaja ono što je postojalo od onoga što tek gradimo.',
    ['<div class="app-shell">']
  ),
  describeHtmlElementStep(
    'sidebar_html',
    'HTML: Sidebar Shell',
    'Ubacujemo osnovni `<aside class="sidebar">` blok kao koren cele komponente.',
    'html:aside',
    'Semantički HTML ti odmah daje bolju strukturu i čitljiviji DOM.',
    ['class="sidebar"']
  ),
  ...[
    ['sidebar_outline', '.sidebar', 'outline', '1px solid #ff4757', 'Dodajemo tanak helper outline da footprint sidebara ostane jasan kroz ceo lesson tok. Skidamo ga tek u završnom rezime koraku za `.sidebar`.', 'Outline ostaje aktivan dok ne završimo rezime za ovaj element.'],
    ['sidebar_width', '.sidebar', 'width', '280px', 'Kad granica postoji, zaključavamo širinu sidebara da dobije jasan footprint.'],
    ['sidebar_min_height', '.sidebar', 'min-height', '100vh', 'Dajemo sidebaru punu visinu da box postane čitljiv i bez sadržaja.'],
    ['sidebar_border_right', '.sidebar', 'border-right', '1px solid rgba(255,255,255,0.12)', 'Tanka desna linija odvaja sidebar od ostatka layouta.'],
    ['sidebar_background', '.sidebar', 'background', '#0b1020', 'Dodajemo tamnu pozadinu da sidebar dobije svoj vizuelni identitet, ali outline namerno ostaje do rezime koraka za `.sidebar`.'],
    ['sidebar_color', '.sidebar', 'color', '#edf2ff', 'Osnovnu boju teksta postavljamo rano da nasledi ceo sadržaj.']
  ].map(config => describeCssPropertyStep(...config)),
  describeHtmlElementStep(
    'brand_html',
    'HTML: Brand Wrapper',
    'Dodajemo `.sidebar-brand` kao zonu za logo i naziv proizvoda. Svi brand elementi zadržavaju svoje outline helpere do završnog brand rezimea.',
    'html:brand',
    'Izdvoj brand deo od navigacije da bi hijerarhija odmah bila jasna.',
    ['class="sidebar-brand"']
  ),
  ...[
    ['brand_outline', '.sidebar-brand', 'outline', '1px solid #2ed573', 'Dodajemo tanak helper outline za `.sidebar-brand` i držimo ga do završnog rezime koraka za brand celinu.', 'Svaki deo iste celine može da dobije svoju boju helper linije dok ta celina traje.'],
    ['brand_padding', '.sidebar-brand', 'padding', '24px', 'Unutrašnji padding daje brand zoni vazduh.'],
    ['brand_margin_bottom', '.sidebar-brand', 'margin-bottom', '28px', 'Odvajamo brand blok od navigacije ispod njega.'],
    ['brand_display', '.sidebar-brand', 'display', 'flex', 'Prebacujemo brand zonu u flex da logo i tekst mogu da stoje u istom redu.'],
    ['brand_align_items', '.sidebar-brand', 'align-items', 'center', 'Vertikalno poravnanje centrira logo i tekst.'],
    ['brand_gap', '.sidebar-brand', 'gap', '14px', 'Gap određuje koliko prostora stoji između logotipa i teksta.']
  ].map(config => describeCssPropertyStep(...config)),
  describeHtmlElementStep(
    'logo_html',
    'HTML: Logo Element',
    'Ubacujemo `.logo` element sa slovom `A` kao placeholder identitetom.',
    'html:logo',
    'Počni od jednostavnog placeholder loga pa tek onda doteruj stil.',
    ['class="logo"']
  ),
  ...[
    ['logo_outline', '.logo', 'outline', '1px dotted #7dd3fc', 'Dodajemo tanak helper outline za `.logo` i držimo ga do završnog brand rezimea.', 'Logo zadržava svoju helper boju sve dok radimo brand celinu.'],
    ['logo_width', '.logo', 'width', '48px', 'Prvo zaključavamo širinu logotipa.'],
    ['logo_height', '.logo', 'height', '48px', 'Visina prati širinu da bismo dobili kvadratnu osnovu.'],
    ['logo_display', '.logo', 'display', 'grid', 'Grid nam daje lak centar za jedan znak ili ikonu.'],
    ['logo_place_items', '.logo', 'place-items', 'center', 'Centriramo sadržaj logotipa u oba smera.'],
    ['logo_radius', '.logo', 'border-radius', '12px', 'Blago zaobljenje daje moderniji osećaj.'],
    ['logo_font_weight', '.logo', 'font-weight', '800', 'Pojačavamo slovo da liči na pravi brand znak.'],
    ['logo_background', '.logo', 'background', 'linear-gradient(135deg, #6d73ff, #8f5cff)', 'Gradijent dodaje energiju i daje logotipu fokus. Outline namerno ostaje do brand rezimea.'],
    ['logo_color', '.logo', 'color', 'white', 'Bela boja daje čist kontrast preko gradijenta.'],
    ['logo_shadow', '.logo', 'box-shadow', '0 12px 24px rgba(109,115,255,0.30)', 'Shadow dodaje depth i čini logo prisutnijim.']
  ].map(config => describeCssPropertyStep(...config)),
  describeHtmlElementStep(
    'brand_copy_html',
    'HTML: Brand Copy',
    'Dodajemo `.brand-copy` sa naslovom i podnaslovom pored logotipa. I on zadržava svoj outline do završnog brand rezimea.',
    'html:brand-copy',
    'Tekstualni brand signal pomaže korisniku da zna gde se nalazi.',
    ['class="brand-copy"', '<strong>', '<span>']
  ),
  ...[
    ['brand_copy_outline', '.brand-copy', 'outline', '1px dashed #f59e0b', 'Dodajemo tanak helper outline za tekstualni brand blok i držimo ga do završnog brand rezimea.', 'Isti wrapper, različiti child elementi, različite helper boje.'],
    ['brand_strong_display', '.brand-copy strong', 'display', 'block', 'Naslov pretvaramo u blok da zauzme svoj red.'],
    ['brand_strong_font_size', '.brand-copy strong', 'font-size', '16px', 'Naslov dobija čitljiviju veličinu.'],
    ['brand_span_display', '.brand-copy span', 'display', 'block', 'Podnaslov spuštamo u novi red.'],
    ['brand_span_margin_top', '.brand-copy span', 'margin-top', '4px', 'Mali razmak odvaja podnaslov od naslova.'],
    ['brand_span_font_size', '.brand-copy span', 'font-size', '13px', 'Podnaslov pravimo suptilnijim od naslova.'],
    ['brand_span_color', '.brand-copy span', 'color', '#9aa6c8', 'Muted boja pravi jasnu tekstualnu hijerarhiju.']
  ].map(config => describeCssPropertyStep(...config)),
  describeHtmlElementStep(
    'nav_html',
    'HTML: Nav Wrapper',
    'Ubacujemo `<nav class="nav-list">` kao kontejner za buduće linkove. Navigacioni outline helperi ostaju aktivni sve do završnog navigation rezimea.',
    'html:nav',
    'Semantički `nav` element je prirodan izbor za navigaciju.',
    ['class="nav-list"']
  ),
  ...[
    ['nav_list_outline', '.nav-list', 'outline', '1px dashed #38bdf8', 'Dodajemo tanak helper outline za praznu nav zonu i držimo ga do završnog navigation rezimea.', 'Navigacija zadržava helper linije kroz sve svoje poddelove dok ne završimo rezime za nju.'],
    ['nav_list_padding', '.nav-list', 'padding', '10px 8px', 'Dodajemo privremeni helper padding da prazna nav zona dobije visinu pre prvog linka. I njega držimo do završnog navigation rezimea.'],
    ['nav_list_display', '.nav-list', 'display', 'grid', 'Navigaciju slažemo u grid da spacing bude čist.'],
    ['nav_list_gap', '.nav-list', 'gap', '10px', 'Gap održava ravnomeran razmak između stavki.']
  ].map(config => describeCssPropertyStep(...config)),
  describeHtmlElementStep(
    'nav_items_html',
    'HTML: Nav Items',
    'Dodajemo prve `.nav-item` linkove sa ikonama i labelama. I stavke i ikonice zadržavaju outline helpere do navigation rezimea.',
    'html:nav-item',
    'Prvo ubaci markup za stavke, pa onda stilizuj svaki sloj ponaosob.',
    ['class="nav-item', 'class="icon"', 'class="label"']
  ),
  ...[
    ['nav_item_outline', '.nav-item', 'outline', '1px solid #ffa502', 'Svaka stavka dobija tanak helper outline i zadržava ga do završnog navigation rezimea.', 'Svaki deo navigacije zadržava svoju helper boju dok traje cela navigaciona celina.'],
    ['nav_item_display', '.nav-item', 'display', 'flex', 'Svaka stavka postaje flex red da ikona i tekst stanu jedan do drugog.'],
    ['nav_item_min_height', '.nav-item', 'min-height', '52px', 'Klik zona dobija pristojnu visinu.'],
    ['nav_item_padding', '.nav-item', 'padding', '12px 16px', 'Padding pravi realnu klik zonu i diše bolje od golog teksta.'],
    ['nav_item_align_items', '.nav-item', 'align-items', 'center', 'Vertikalno centriramo sadržaj svake stavke.'],
    ['nav_item_gap', '.nav-item', 'gap', '12px', 'Gap odvaja ikonu od labele.'],
    ['nav_icon_outline', '.nav-item .icon', 'outline', '1px dotted #7dd3fc', 'Ikonica dobija svoj tanak outline i zadržava ga do završnog navigation rezimea.', 'I ikonica je teaching target i zato ostaje označena dok traje objašnjenje.'],
    ['nav_icon_width', '.nav-item .icon', 'width', '22px', 'Ikona dobija fiksnu širinu.'],
    ['nav_icon_height', '.nav-item .icon', 'height', '22px', 'Ikona dobija i fiksnu visinu radi konzistentnog kvadrata.'],
    ['nav_icon_display', '.nav-item .icon', 'display', 'grid', 'Grid olakšava centriranje sadržaja ikone.'],
    ['nav_icon_place_items', '.nav-item .icon', 'place-items', 'center', 'Ikonicu centriramo i horizontalno i vertikalno.'],
    ['nav_label_font_size', '.nav-item .label', 'font-size', '15px', 'Labela dobija čitljivu veličinu.'],
    ['nav_label_font_weight', '.nav-item .label', 'font-weight', '600', 'Blago pojačavamo labelu da zadrži hijerarhiju.'],
    ['nav_item_radius', '.nav-item', 'border-radius', '14px', 'Zaobljene ivice daju linkovima mekši, UI osećaj. Outline helper i dalje ostaje do rezimea.'],
    ['nav_item_margin', '.nav-item', 'margin', '0 8px', 'Spoljni razmak odvaja stavke od ivice sidebara.'],
    ['nav_item_active_background', '.nav-item.active', 'background', 'rgba(109,115,255,0.14)', 'Aktivna stavka dobija svoju pozadinu, ali helper outline ostaje do navigation rezimea.'],
    ['nav_item_active_color', '.nav-item.active', 'color', 'white', 'Boju aktivne stavke pojačavamo za bolji kontrast.'],
    ['nav_item_transition', '.nav-item', 'transition', 'all 0.4s ease', 'Dodajemo glatku tranziciju za hover i active stanje.'],
    ['nav_item_hover_background', '.nav-item:hover', 'background', 'rgba(255,255,255,0.05)', 'Hover feedback potvrđuje da je stavka interaktivna.'],
    ['collapse_width', '.sidebar.is-collapsed', 'width', '108px', 'Collapsed mod sužava sidebar na kompaktnu širinu.']
  ].map(config => describeCssPropertyStep(...config)),
  describeHtmlElementStep(
    'footer_html',
    'HTML: Sidebar Footer',
    'Dodajemo `.sidebar-footer` kao završni informativni blok pri dnu sidebara. Footer takođe dobija svoj outline helper koji ostaje do njegovog završnog rezimea.',
    'html:footer',
    'Footer je i dalje deo sidebara, pa i njega gradimo iz istog toka.',
    ['class="sidebar-footer"', '<p>Sidebar nije samo lista linkova.']
  ),
  ...[
    ['sidebar_display_flex', '.sidebar', 'display', 'flex', 'Sidebar pretvaramo u flex kolonu da footer može da ode na dno.'],
    ['sidebar_flex_direction', '.sidebar', 'flex-direction', 'column', 'Kolona omogućava prirodan vertikalni raspored sekcija.'],
    ['footer_outline', '.sidebar-footer', 'outline', '1px dashed #c084fc', 'Dodajemo tanak helper outline za footer i držimo ga do završnog footer rezimea.', 'I footer dobija svoju helper boju jer je poseban teaching element.'],
    ['footer_border', '.sidebar-footer', 'border', '1px solid rgba(255,255,255,0.12)', 'Tanka linija razdvaja footer od pozadine.'],
    ['footer_background', '.sidebar-footer', 'background', 'rgba(255,255,255,0.05)', 'Blaga pozadina izdvaja footer bez teškog kontrasta.'],
    ['footer_padding', '.sidebar-footer', 'padding', '16px', 'Footer dobija unutrašnji spacing.'],
    ['footer_radius', '.sidebar-footer', 'border-radius', '14px', 'Zaobljenje usklađuje footer sa ostatkom UI-ja.'],
    ['footer_margin_top', '.sidebar-footer', 'margin-top', 'auto', 'Auto margin gura footer na dno kolone.'],
    ['footer_text_margin', '.sidebar-footer p', 'margin', '6px 0 0', 'Odstupamo paragraf od naslova unutar footera.'],
    ['footer_text_color', '.sidebar-footer p', 'color', '#9aa6c8', 'Muted ton čini pomoćni tekst nenametljivim.'],
    ['footer_text_line_height', '.sidebar-footer p', 'line-height', '1.5', 'Line-height daje tekstu dovoljno vazduha.'],
    ['hide_labels', '.sidebar.is-collapsed .brand-copy, .sidebar.is-collapsed .nav-item .label', 'display', 'none', 'U collapsed modu sakrivamo tekstualne labele i brand copy.', 'Collapse ne znači da gubiš strukturu, već da je svodiš na ikone.'],
    ['responsive_sidebar_min_height', '.sidebar', 'min-height', 'auto', 'Na manjim ekranima sidebar više ne mora da glumi pun viewport.']
  ].map(config => describeCssPropertyStep(...config)),
  describeCssSummaryStep(
    'sidebar_summary',
    'Rezime: .sidebar',
    'Završni rezime za `.sidebar`: helper outline više nije potreban, jer je sav osnovni CSS za shell već kompletan i jasan.',
    'Rezime korak je mesto gde helper outline odlazi i ostaje čist završni CSS za tu celinu.',
    ['class="sidebar"']
  ),
  describeCssSummaryStep(
    'brand_summary',
    'Rezime: Brand Celina',
    'Rezimiramo brand wrapper, logo i brand copy. Tek sada uklanjamo njihove outline helpere jer je ceo brand blok završen.',
    'Kada više povezanih elemenata čine jednu teaching celinu, outline može da nestane tek u zajedničkom rezime koraku.',
    ['class="sidebar-brand"', 'class="logo"', 'class="brand-copy"']
  ),
  describeCssSummaryStep(
    'navigation_summary',
    'Rezime: Navigation Celina',
    'Rezimiramo nav zonu, stavke i ikonice. Tek sada uklanjamo outline helpere sa cele navigacione celine.',
    'Outline helperi za navigaciju ostaju dok svi delovi navigacije ne budu kompletno objašnjeni.',
    ['class="nav-list"', 'class="nav-item', 'class="icon"']
  ),
  describeCssSummaryStep(
    'footer_summary',
    'Rezime: Footer',
    'Rezimiramo footer blok i uklanjamo njegov helper outline tek sada, kada je ceo footer vizuelno završen.',
    'Outline za footer služi učenju i zato ostaje sve do poslednjeg footer rezimea.',
    ['class="sidebar-footer"', '<p>Sidebar nije samo lista linkova.']
  ),
  describeFinishedStep(
    'done',
    'Done: Sidebar',
    'Tutorijal je sada potpuno detaljan: CSS ide kumulativno, property po property, a outline helperi odlaze tek u rezime koracima.',
    'Kada je tok ovako sitno razbijen, promene su mnogo lakše za praćenje i u kodu i u prikazu sidebara.'
  )
];

export const stepNumberById = Object.fromEntries(
  lessonSteps.map((step, index) => [step.id, index])
);
