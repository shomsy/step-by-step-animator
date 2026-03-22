function describeHtmlElementStep(id, title, desc, tag, proTip, _sidebarScene) {
  return { id, title, desc, tag, proTip };
}

function describeCssPropertyStep(id, selector, property, value, _sidebarScene, desc = '', proTip = '') {
  const cssLine = `${property}: ${value};`;

  return {
    id,
    title: `CSS: ${selector} / ${property}`,
    desc: desc || `Dodajemo \`${cssLine}\` u \`${selector}\` i širimo stylesheet jedan property po korak.`,
    tag: `css:${id.replace(/_/g, '-')}`,
    proTip: proTip || 'Jedan property po korak čini promenu jasnom i lakom za praćenje u prikazu sidebara.'
  };
}

function describeFinishedStep(id, title, desc, proTip, _sidebarScene) {
  return { id, title, desc, tag: 'success', proTip };
}

export const lessonSteps = [
  describeHtmlElementStep('empty_shell', 'Start: Empty App Shell', 'Počinjemo od praznog `.app-shell` prostora. Sidebar tek dodajemo kao prvi pravi element.', 'html:app-shell', 'Neutralan početak jasno odvaja ono što je postojalo od onoga što tek gradimo.', 0),
  describeHtmlElementStep('sidebar_html', 'HTML: Sidebar Shell', 'Ubacujemo osnovni `<aside class="sidebar">` blok kao koren cele komponente.', 'html:aside', 'Semantički HTML ti odmah daje bolju strukturu i čitljiviji DOM.', 1),
  ...[
    ['sidebar_outline', '.sidebar', 'outline', '2px solid #ff4757', 2, 'Dodajemo privremeni pomoćni border radi lakšeg snalaženja, da prazni sidebar odmah dobije jasnu granicu u preview-u. Kasnije ćemo ga ukloniti.', 'Outline je odličan za debug jer ne menja layout.'],
    ['sidebar_width', '.sidebar', 'width', '280px', 3, 'Kad granica postoji, zaključavamo širinu sidebara da dobije jasan footprint.'],
    ['sidebar_min_height', '.sidebar', 'min-height', '100vh', 4, 'Dajemo sidebaru punu visinu da box postane čitljiv i bez sadržaja.'],
    ['sidebar_border_right', '.sidebar', 'border-right', '1px solid rgba(255,255,255,0.12)', 5, 'Tanka desna linija odvaja sidebar od ostatka layouta.'],
    ['sidebar_background', '.sidebar', 'background', '#0b1020', 5, 'Dodajemo tamnu pozadinu da sidebar dobije svoj vizuelni identitet i uklanjamo privremeni pomoćni border, više nam ne treba.'],
    ['sidebar_color', '.sidebar', 'color', '#edf2ff', 5, 'Osnovnu boju teksta postavljamo rano da nasledi ceo sadržaj.']
  ].map(config => describeCssPropertyStep(...config)),
  describeHtmlElementStep('brand_html', 'HTML: Brand Wrapper', 'Dodajemo `.sidebar-brand` kao zonu za logo i naziv proizvoda. Od ovog trenutka pomoćne linije za sve delove branda držimo dok ne završimo celu brand celinu.', 'html:brand', 'Izdvoj brand deo od navigacije da bi hijerarhija odmah bila jasna.', 7),
  ...[
    ['brand_outline', '.sidebar-brand', 'outline', '2px solid #2ed573', 8, 'Dodajemo privremeni pomoćni border radi lakšeg snalaženja, da odmah vidiš footprint brand zone. Držimo ga dok ne završimo celu `.sidebar-brand` celinu, pa ćemo ga tek tada ukloniti.', 'Svaki deo iste celine može da dobije svoju boju helper linije dok ta celina traje.'],
    ['brand_padding', '.sidebar-brand', 'padding', '24px', 8, 'Unutrašnji padding daje brand zoni vazduh.'],
    ['brand_margin_bottom', '.sidebar-brand', 'margin-bottom', '28px', 8, 'Odvajamo brand blok od navigacije ispod njega.'],
    ['brand_display', '.sidebar-brand', 'display', 'flex', 8, 'Prebacujemo brand zonu u flex da logo i tekst mogu da stoje u istom redu.'],
    ['brand_align_items', '.sidebar-brand', 'align-items', 'center', 8, 'Vertikalno poravnanje centrira logo i tekst.'],
    ['brand_gap', '.sidebar-brand', 'gap', '14px', 8, 'Gap određuje koliko prostora stoji između logotipa i teksta.']
  ].map(config => describeCssPropertyStep(...config)),
  describeHtmlElementStep('logo_html', 'HTML: Logo Element', 'Ubacujemo `.logo` element sa slovom `A` kao placeholder identitetom.', 'html:logo', 'Počni od jednostavnog placeholder loga pa tek onda doteruj stil.', 9),
  ...[
    ['logo_outline', '.logo', 'outline', '2px dotted #7dd3fc', 10, 'Dodajemo privremeni pomoćni border radi lakšeg snalaženja, da footprint logotipa bude jasan i bez pozadine. Držimo ga dok ne završimo celu `.sidebar-brand` celinu, pa ga tek tada uklanjamo.', 'Logo zadržava svoju helper boju sve dok radimo ceo brand blok.'],
    ['logo_width', '.logo', 'width', '48px', 10, 'Prvo zaključavamo širinu logotipa.'],
    ['logo_height', '.logo', 'height', '48px', 10, 'Visina prati širinu da bismo dobili kvadratnu osnovu.'],
    ['logo_display', '.logo', 'display', 'grid', 10, 'Grid nam daje lak centar za jedan znak ili ikonu.'],
    ['logo_place_items', '.logo', 'place-items', 'center', 10, 'Centriramo sadržaj logotipa u oba smera.'],
    ['logo_radius', '.logo', 'border-radius', '12px', 10, 'Blago zaobljenje daje moderniji osećaj.'],
    ['logo_font_weight', '.logo', 'font-weight', '800', 10, 'Pojačavamo slovo da liči na pravi brand znak.'],
    ['logo_background', '.logo', 'background', 'linear-gradient(135deg, #6d73ff, #8f5cff)', 11, 'Gradijent dodaje energiju i daje logotipu fokus. Pomoćni border namerno ostaje dok ne zatvorimo celu brand celinu.'],
    ['logo_color', '.logo', 'color', 'white', 11, 'Bela boja daje čist kontrast preko gradijenta.'],
    ['logo_shadow', '.logo', 'box-shadow', '0 12px 24px rgba(109,115,255,0.30)', 11, 'Shadow dodaje depth i čini logo prisutnijim.']
  ].map(config => describeCssPropertyStep(...config)),
  describeHtmlElementStep('brand_copy_html', 'HTML: Brand Copy', 'Dodajemo `.brand-copy` sa naslovom i podnaslovom pored logotipa. I on dobija svoju helper boju dok ne završimo celu `.sidebar-brand` celinu.', 'html:brand-copy', 'Tekstualni brand signal pomaže korisniku da zna gde se nalazi.', 12),
  ...[
    ['brand_copy_outline', '.brand-copy', 'outline', '1px dashed #f59e0b', 12, 'Dodajemo privremeni pomoćni border radi lakšeg snalaženja, da tekstualni brand blok bude jasno odvojen od logotipa. Držimo ga dok ne završimo celu `.sidebar-brand` celinu.', 'Isti wrapper, različiti child elementi, različite helper boje.'],
    ['brand_strong_display', '.brand-copy strong', 'display', 'block', 12, 'Naslov pretvaramo u blok da zauzme svoj red.'],
    ['brand_strong_font_size', '.brand-copy strong', 'font-size', '16px', 12, 'Naslov dobija čitljiviju veličinu.'],
    ['brand_span_display', '.brand-copy span', 'display', 'block', 12, 'Podnaslov spuštamo u novi red.'],
    ['brand_span_margin_top', '.brand-copy span', 'margin-top', '4px', 12, 'Mali razmak odvaja podnaslov od naslova.'],
    ['brand_span_font_size', '.brand-copy span', 'font-size', '13px', 12, 'Podnaslov pravimo suptilnijim od naslova.'],
    ['brand_span_color', '.brand-copy span', 'color', '#9aa6c8', 12, 'Muted boja pravi jasnu tekstualnu hijerarhiju.']
  ].map(config => describeCssPropertyStep(...config)),
  describeHtmlElementStep('nav_html', 'HTML: Nav Wrapper', 'Ubacujemo `<nav class="nav-list">` kao kontejner za buduće linkove. Brand celina je sada gotova, pa uklanjamo privremene pomoćne bordere sa `.sidebar-brand`, `.logo` i `.brand-copy`.', 'html:nav', 'Semantički `nav` element je prirodan izbor za navigaciju.', 13),
  ...[
    ['nav_list_outline', '.nav-list', 'outline', '1px dashed #38bdf8', 14, 'Dodajemo privremeni pomoćni border radi lakšeg snalaženja, da prazna nav zona odmah postane vidljiva. Držimo ga dok ne završimo celu navigacionu celinu.', 'Navigacija zadržava helper linije kroz sve svoje poddelove dok ne pređemo na footer.'],
    ['nav_list_padding', '.nav-list', 'padding', '10px 8px', 14, 'Dodajemo i privremeni pomoćni padding da prazna nav zona dobije visinu i pre prvog linka. I njega držimo dok ne završimo celu navigacionu celinu.'],
    ['nav_list_display', '.nav-list', 'display', 'grid', 14, 'Navigaciju slažemo u grid da spacing bude čist.'],
    ['nav_list_gap', '.nav-list', 'gap', '10px', 14, 'Gap održava ravnomeran razmak između stavki.']
  ].map(config => describeCssPropertyStep(...config)),
  describeHtmlElementStep('nav_items_html', 'HTML: Nav Items', 'Dodajemo prve `.nav-item` linkove sa ikonama i labelama.', 'html:nav-item', 'Prvo ubaci markup za stavke, pa onda stilizuj svaki sloj ponaosob.', 15),
  ...[
    ['nav_item_outline', '.nav-item', 'outline', '1px solid #ffa502', 15, 'Zadržavamo helper linije za celu navigaciju, a svakoj stavci dodajemo njen privremeni border radi lakšeg snalaženja. Držimo ga dok ne završimo celu navigacionu celinu.', 'Svaki deo navigacije zadržava svoju helper boju dok traje cela navigaciona celina.'],
    ['nav_item_display', '.nav-item', 'display', 'flex', 15, 'Svaka stavka postaje flex red da ikona i tekst stanu jedan do drugog.'],
    ['nav_item_min_height', '.nav-item', 'min-height', '52px', 15, 'Klik zona dobija pristojnu visinu.'],
    ['nav_item_padding', '.nav-item', 'padding', '12px 16px', 15, 'Padding pravi realnu klik zonu i diše bolje od golog teksta.'],
    ['nav_item_align_items', '.nav-item', 'align-items', 'center', 15, 'Vertikalno centriramo sadržaj svake stavke.'],
    ['nav_item_gap', '.nav-item', 'gap', '12px', 15, 'Gap odvaja ikonu od labele.'],
    ['nav_icon_outline', '.nav-item .icon', 'outline', '1px dotted #7dd3fc', 15, 'Dodajemo privremeni pomoćni border i na ikonicu radi lakšeg snalaženja, da joj footprint bude jasan. Držimo ga dok ne završimo celu navigacionu celinu.'],
    ['nav_icon_width', '.nav-item .icon', 'width', '22px', 15, 'Ikona dobija fiksnu širinu.'],
    ['nav_icon_height', '.nav-item .icon', 'height', '22px', 15, 'Ikona dobija i fiksnu visinu radi konzistentnog kvadrata.'],
    ['nav_icon_display', '.nav-item .icon', 'display', 'grid', 15, 'Grid olakšava centriranje sadržaja ikone.'],
    ['nav_icon_place_items', '.nav-item .icon', 'place-items', 'center', 15, 'Ikonicu centriramo i horizontalno i vertikalno.'],
    ['nav_label_font_size', '.nav-item .label', 'font-size', '15px', 15, 'Labela dobija čitljivu veličinu.'],
    ['nav_label_font_weight', '.nav-item .label', 'font-weight', '600', 15, 'Blago pojačavamo labelu da zadrži hijerarhiju.'],
    ['nav_item_radius', '.nav-item', 'border-radius', '14px', 16, 'Zaobljene ivice daju linkovima mekši, UI osećaj. Helper linije i dalje ostaju dok ne završimo celu navigacionu celinu.'],
    ['nav_item_margin', '.nav-item', 'margin', '0 8px', 16, 'Spoljni razmak odvaja stavke od ivice sidebara.'],
    ['nav_item_active_background', '.nav-item.active', 'background', 'rgba(109,115,255,0.14)', 17, 'Aktivna stavka dobija svoju pozadinu, ali helper linije namerno ostaju dok ne završimo celu navigacionu celinu.'],
    ['nav_item_active_color', '.nav-item.active', 'color', 'white', 17, 'Boju aktivne stavke pojačavamo za bolji kontrast.'],
    ['nav_item_transition', '.nav-item', 'transition', 'all 0.4s ease', 18, 'Dodajemo glatku tranziciju za hover i active stanje.'],
    ['nav_item_hover_background', '.nav-item:hover', 'background', 'rgba(255,255,255,0.05)', 19, 'Hover feedback potvrđuje da je stavka interaktivna.'],
    ['collapse_width', '.sidebar.is-collapsed', 'width', '108px', 20, 'Collapsed mod sužava sidebar na kompaktnu širinu.']
  ].map(config => describeCssPropertyStep(...config)),
  describeHtmlElementStep('footer_html', 'HTML: Sidebar Footer', 'Dodajemo `.sidebar-footer` kao završni informativni blok pri dnu sidebara. Navigaciona celina je sada gotova, pa uklanjamo privremene pomoćne bordere i paddinge sa navigacionih elemenata.', 'html:footer', 'Footer je i dalje deo sidebara, pa i njega gradimo iz istog toka.', 20),
  ...[
    ['sidebar_display_flex', '.sidebar', 'display', 'flex', 20, 'Sidebar pretvaramo u flex kolonu da footer može da ode na dno.'],
    ['sidebar_flex_direction', '.sidebar', 'flex-direction', 'column', 20, 'Kolona omogućava prirodan vertikalni raspored sekcija.'],
    ['footer_border', '.sidebar-footer', 'border', '1px solid rgba(255,255,255,0.12)', 20, 'Tanka linija razdvaja footer od pozadine.'],
    ['footer_background', '.sidebar-footer', 'background', 'rgba(255,255,255,0.05)', 20, 'Blaga pozadina izdvaja footer bez teškog kontrasta.'],
    ['footer_padding', '.sidebar-footer', 'padding', '16px', 20, 'Footer dobija unutrašnji spacing.'],
    ['footer_radius', '.sidebar-footer', 'border-radius', '14px', 20, 'Zaobljenje usklađuje footer sa ostatkom UI-ja.'],
    ['footer_margin_top', '.sidebar-footer', 'margin-top', 'auto', 20, 'Auto margin gura footer na dno kolone.'],
    ['footer_text_margin', '.sidebar-footer p', 'margin', '6px 0 0', 20, 'Odstupamo paragraf od naslova unutar footera.'],
    ['footer_text_color', '.sidebar-footer p', 'color', '#9aa6c8', 20, 'Muted ton čini pomoćni tekst nenametljivim.'],
    ['footer_text_line_height', '.sidebar-footer p', 'line-height', '1.5', 20, 'Line-height daje tekstu dovoljno vazduha.'],
    ['hide_labels', '.sidebar.is-collapsed .nav-item .label', 'display', 'none', 21, 'U collapsed modu sakrivamo tekstualne labele.', 'Collapse ne znači da gubiš strukturu, već da je svodiš na ikone.'],
    ['responsive_sidebar_min_height', '.sidebar', 'min-height', 'auto', 21, 'Na manjim ekranima sidebar više ne mora da glumi pun viewport.']
  ].map(config => describeCssPropertyStep(...config)),
  describeFinishedStep('done', 'Done: Sidebar', 'Tutorijal je sada potpuno detaljan: CSS ide kumulativno, property po property.', 'Kada je tok ovako sitno razbijen, promene su mnogo lakše za praćenje i u kodu i u prikazu sidebara.', 21)
];

export const stepNumberById = Object.fromEntries(
  lessonSteps.map((step, index) => [step.id, index])
);
