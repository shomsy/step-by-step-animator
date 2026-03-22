function describeHtmlElementStep(id, title, desc, tag, proTip) {
  return { id, title, desc, tag, proTip };
}

function describeCssPropertyStep(id, selector, property, value, desc = '', proTip = '') {
  const cssLine = `${property}: ${value};`;

  return {
    id,
    title: `CSS: ${selector} / ${property}`,
    desc: desc || `Dodajemo \`${cssLine}\` u \`${selector}\` i širimo stylesheet jedan property po korak.`,
    tag: `css:${id.replace(/_/g, '-')}`,
    proTip: proTip || 'Jedan property po korak drži promenu malom, preglednom i lakom za objašnjavanje.'
  };
}

function describeFinishedStep(id, title, desc, proTip) {
  return { id, title, desc, tag: 'success', proTip };
}

export const lessonSteps = [
  describeHtmlElementStep(
    'empty_shell',
    'Start: Empty App Shell',
    'Počinjemo od praznog `.app-shell` prostora. Goal slika iznad pokazuje tri varijante, ali u ovoj lekciji gradimo samo prvu.',
    'html:app-shell',
    'Neutralan početak jasno odvaja ono što je postojalo od onoga što tek pravimo.'
  ),
  describeHtmlElementStep(
    'topbar_html',
    'HTML: Topbar Shell',
    'Dodajemo `<header class="topbar">` kao glavni wrapper buduće navigacije.',
    'html:topbar',
    'Kreni od glavnog semantic wrapper-a pa tek onda popunjavaj njegove zone.'
  ),
  ...[
    ['shell_padding', '.app-shell', 'padding', '40px', 'Dodajemo padding oko cele scene da navbar dobije vazduh i ne stoji zalepljen za ivice preview-a.'],
    ['shell_background', '.app-shell', 'background', '#d6e1eb', 'Svetla pozadina približava preview referentnoj slici i daje kontrast tamnom navbaru.'],
    ['shell_min_height', '.app-shell', 'min-height', '100vh', 'Puna visina drži celu scenu stabilnom tokom lekcije.'],
    ['topbar_outline', '.topbar', 'outline', '2px solid #ff5d8f', 'Dodajemo privremeni pomoćni border radi lakšeg snalaženja, da odmah vidimo footprint celog navbara. Kasnije ćemo ga ukloniti kada prava pozadina preuzme ulogu.', 'Outline je odličan debug signal jer ne menja layout.'],
    ['topbar_padding', '.topbar', 'padding', '18px 28px', 'Navbar dobija unutrašnji spacing, pa odmah izgleda kao realna UI traka.'],
    ['topbar_background', '.topbar', 'background', '#25262c', 'Dodajemo tamnu pozadinu i uklanjamo privremeni pomoćni border, više nam ne treba.'],
    ['topbar_border', '.topbar', 'border', '1px solid rgba(0,0,0,0.22)', 'Tanka ivica pomaže da navbar bude čitljiv i na svetloj pozadini.'],
    ['topbar_shadow', '.topbar', 'box-shadow', '0 12px 24px rgba(0,0,0,0.18)', 'Shadow odvaja navbar od pozadine i približava ga referentnoj slici.'],
    ['topbar_display', '.topbar', 'display', 'flex', 'Flex uvodi horizontalni raspored elemenata.'],
    ['topbar_align_items', '.topbar', 'align-items', 'center', 'Vertikalno centriramo sve delove navigacije.'],
    ['topbar_justify_content', '.topbar', 'justify-content', 'space-between', 'Glavne zone dobijaju početno razdvajanje levo i desno.']
  ].map(config => describeCssPropertyStep(...config)),
  describeHtmlElementStep(
    'logo_html',
    'HTML: Logo Link',
    'Dodajemo logo kao klikabilni `.topbar-logo` element na levom kraju navigacije.',
    'html:logo',
    'Logo je navigacioni landmark i zato ga uvodimo pre linkova.'
  ),
  ...[
    ['logo_color', '.topbar-logo', 'color', '#ffffff', 'Boju loga postavljamo rano da odmah ima jasan kontrast na tamnoj traci.'],
    ['logo_font_size', '.topbar-logo', 'font-size', '18px', 'Malo povećavamo logo da se odvoji od običnih linkova.'],
    ['logo_font_weight', '.topbar-logo', 'font-weight', '800', 'Težina fonta daje logo signalu identitet.'],
    ['logo_letter_spacing', '.topbar-logo', 'letter-spacing', '0.04em', 'Blagi spacing pojačava moderni, branded osećaj.'],
    ['logo_text_decoration', '.topbar-logo', 'text-decoration', 'none', 'Uklanjamo underline da logo izgleda kao deo UI-ja, ne kao sirov link.']
  ].map(config => describeCssPropertyStep(...config)),
  describeHtmlElementStep(
    'nav_html',
    'HTML: Navigation Links',
    'Dodajemo `<nav class="topbar-links">` sa linkovima Services, Projects i About. Od ovog trenutka helper linije za nav držimo dok ne završimo celu middle zonu.',
    'html:nav-links',
    'Najbolje je da sve centralne linkove uvedeš kao jednu celinu, pa tek onda doteruješ spacing i tipografiju.'
  ),
  ...[
    ['nav_outline', '.topbar-links', 'outline', '1px dashed #38bdf8', 'Dodajemo privremeni pomoćni border radi lakšeg snalaženja, da centralna navigaciona zona odmah postane vidljiva. Držimo ga dok ne završimo celu link sekciju.', 'Helper outline čini centralnu grupu vidljivom i pre nego što dodamo CTA.'],
    ['nav_display', '.topbar-links', 'display', 'flex', 'Linkove slažemo u jedan red.'],
    ['nav_gap', '.topbar-links', 'gap', '36px', 'Gap daje istu vrstu razmaka kao na referentnoj slici.'],
    ['nav_margin_left', '.topbar-links', 'margin-left', 'auto', 'Navigacija se odvaja od loga i kreće ka sredini.'],
    ['nav_margin_right', '.topbar-links', 'margin-right', 'auto', 'Desni auto margin pomaže da grupa linkova ostane vizuelno centrirana.'],
    ['nav_link_color', '.topbar-links a', 'color', '#ffffff', 'Boja linkova prati logo i pravi konzistentan kontrast.'],
    ['nav_link_font_size', '.topbar-links a', 'font-size', '15px', 'Linkovi dobijaju čitljivu, ali nenametljivu veličinu.'],
    ['nav_link_text_decoration', '.topbar-links a', 'text-decoration', 'none', 'Čistimo default underline da linkovi izgledaju kao deo dizajna.'],
    ['nav_link_transition', '.topbar-links a', 'transition', 'color 0.3s ease', 'Mala tranzicija omekšava hover promenu.'],
    ['nav_link_hover_color', '.topbar-links a:hover', 'color', '#cbd5e1', 'Hover ton blago menja boju, bez agresivnog skakanja.']
  ].map(config => describeCssPropertyStep(...config)),
  describeHtmlElementStep(
    'cta_html',
    'HTML: Contact CTA',
    'Dodajemo završni `.topbar-cta` link sa tekstom Contact. Link sekcija je sada gotova i uklanjamo privremeni helper outline sa nje.',
    'html:cta',
    'CTA se uvodi na kraju, tek kada su logo i navigacija već stabilni.'
  ),
  ...[
    ['cta_outline', '.topbar-cta', 'outline', '1px dashed #11a4d3', 'Dodajemo privremeni pomoćni border radi lakšeg snalaženja, da footprint CTA dugmeta bude jasan i pre boje. Kasnije ćemo ga ukloniti.', 'Kod dugmeta je helper outline koristan dok još nema svoju pozadinu.'],
    ['cta_display', '.topbar-cta', 'display', 'inline-flex', 'CTA prebacujemo u inline-flex da padding i centriranje rade kao na pravom dugmetu.'],
    ['cta_align_items', '.topbar-cta', 'align-items', 'center', 'Tekst dugmeta centriramo po visini.'],
    ['cta_padding', '.topbar-cta', 'padding', '12px 28px', 'Padding daje CTA dugmetu njegov pravi footprint.'],
    ['cta_radius', '.topbar-cta', 'border-radius', '999px', 'Pil oblik odmah približava dugme referentnom primeru.'],
    ['cta_background', '.topbar-cta', 'background', '#11a4d3', 'Dodajemo završnu boju CTA dugmeta i uklanjamo privremeni pomoćni border, više nam ne treba.'],
    ['cta_color', '.topbar-cta', 'color', '#ffffff', 'Beli tekst pravi čist kontrast preko plave pozadine.'],
    ['cta_text_decoration', '.topbar-cta', 'text-decoration', 'none', 'Uklanjamo underline da CTA izgleda kao pravo dugme.'],
    ['cta_shadow', '.topbar-cta', 'box-shadow', '0 10px 20px rgba(17,164,211,0.28)', 'Shadow pojačava prisustvo CTA dugmeta i zatvara vizuelni match sa ciljem.']
  ].map(config => describeCssPropertyStep(...config)),
  describeFinishedStep(
    'done',
    'Done: Top Navigation',
    'Prvi navbar iz reference je gotov. Druga dva rasporeda iz goal slike ostaju kao domaći zadatak.',
    'Kada završiš ovu varijantu, najbolji sledeći korak je da samostalno rekreiraš druga dva rasporeda iz iste reference.'
  )
];

export const stepNumberById = Object.fromEntries(
  lessonSteps.map((step, index) => [step.id, index])
);
