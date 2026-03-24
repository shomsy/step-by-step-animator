const focusHtmlNeedlesBySelector = {
  '.app-shell': ['<div class="app-shell">'],
  'ui-pricing-card': ['<ui-pricing-card', 'tier='],
  'ui-pricing-card[tier="starter"]': ['<ui-pricing-card', 'tier='],
  'ui-pricing-card[tier="pro"]': ['<ui-pricing-card', 'tier="pro"'],
  'ui-pricing-card[tier="enterprise"]': ['<ui-pricing-card', 'tier='],
  'ui-pricing-card[popular]': ['<ui-pricing-card', 'popular'],
  ':host': ['<ui-pricing-card', 'tier='],
  ':host([popular]) .popular-badge': ['<ui-pricing-card', 'popular'],
  ':host([billing="yearly"]) .toggle-switch': ['<ui-pricing-card', 'tier='],
  ':host([billing="yearly"]) .toggle-knob': ['<ui-pricing-card', 'tier='],
  '::slotted([slot="badge"])': ['slot="badge"', '<ui-pricing-card'],
  '::slotted(ul)': ['slot="features"', '<ui-pricing-card'],
  '.card': ['<ui-pricing-card', 'tier='],
  '.popular-badge': ['<ui-pricing-card', 'popular'],
  '.tier-name': ['<ui-pricing-card', 'tier='],
  '.price-block': ['<ui-pricing-card', 'price-monthly='],
  '.price-currency': ['<ui-pricing-card', 'price-monthly='],
  '.price-amount': ['<ui-pricing-card', 'price-monthly='],
  '.price-period': ['<ui-pricing-card', 'price-monthly='],
  '.billing-toggle': ['<ui-pricing-card', 'tier='],
  '.toggle-label': ['<ui-pricing-card', 'tier='],
  '.toggle-switch': ['<ui-pricing-card', 'tier='],
  '.toggle-knob': ['<ui-pricing-card', 'tier='],
  '.save-badge': ['<ui-pricing-card', 'tier='],
  '.feature-list': ['<ui-pricing-card', 'slot="features"'],
  '.cta': ['<ui-pricing-card', 'cta-label='],
  '.cta:hover': ['<ui-pricing-card', 'cta-label='],
  '.cta:active': ['<ui-pricing-card', 'cta-label='],
  '.cta:focus-visible': ['<ui-pricing-card', 'cta-label='],
  '.urgency': ['<ui-pricing-card', 'tier=']
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
    proTip: proTip || 'Host CSS drži tier variants, popular state i token contract na samom custom elementu.',
    focusHtmlNeedles: readFocusHtmlNeedles(selector)
  };
}

function describeShadowCssPropertyStep(id, selector, property, value, desc = '', proTip = '') {
  const cssLine = `${property}: ${value};`;

  return {
    id,
    title: `Shadow CSS: ${selector} / ${property}`,
    desc: desc || `U \`ui-pricing-card.shadow.css\` dodajemo \`${cssLine}\` za \`${selector}\`.`,
    tag: `shadow-css:${id.replace(/_/g, '-')}`,
    proTip: proTip || 'Shadow CSS stilizuje samo unutrašnju card strukturu. Host tokeni kontrolišu temu spolja.',
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
    focusHtmlNeedles: readFocusHtmlNeedles('ui-pricing-card')
  };
}

function describeTeachingStep(id, title, desc, proTip, focusHtmlNeedles = readFocusHtmlNeedles('ui-pricing-card')) {
  return {
    id,
    title,
    desc,
    tag: `teaching:${id.replace(/_/g, '-')}`,
    proTip,
    focusHtmlNeedles
  };
}

function describeJsFlowStep(id, title, desc, proTip, focusHtmlNeedles = readFocusHtmlNeedles('ui-pricing-card')) {
  return {
    id,
    title,
    desc,
    tag: `js:${id.replace(/_/g, '-')}`,
    proTip,
    focusHtmlNeedles
  };
}

function describeSummaryStep(id, title, desc, proTip, focusHtmlNeedles = readFocusHtmlNeedles('ui-pricing-card')) {
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
  ['shell_outline', '.app-shell', 'outline', '1px dashed #94a3b8', 'Dodajemo tanak helper outline za `.app-shell` i držimo ga do završnog shell rezimea.', 'App shell ostaje neutralna pozornica za SaaS pricing demo.'],
  ['shell_padding', '.app-shell', 'padding', '48px 24px', 'Padding drži scenu urednom.'],
  ['shell_display', '.app-shell', 'display', 'grid', 'Grid pravi jedinstven host za pricing card.'],
  ['shell_place_items', '.app-shell', 'place-items', 'center', 'Centar drži fokus na jednom pricing card-u.'],
  ['shell_min_height', '.app-shell', 'min-height', '100vh', 'Puna visina drži tamnu pozadinu stabilnom.'],
  ['shell_background', '.app-shell', 'background', 'linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', 'Tamna pozadina naglašava SaaS pricing card.'],
  ['host_outline', 'ui-pricing-card', 'outline', '1px solid #f97316', 'Dodajemo host helper outline i držimo ga do završnog rezimea.', 'Host je javni contract surface pricing kartice.'],
  ['host_display', 'ui-pricing-card', 'display', 'block', 'Block display pravi stabilan footprint.'],
  ['host_width', 'ui-pricing-card', 'width', 'min(100%, 380px)', 'Širina pricing card-a ostaje ograničena i predvidiva.'],
  ['host_position', 'ui-pricing-card', 'position', 'relative', 'Relative za popular state i buduće overlay-e.'],
  ['host_surface_token', 'ui-pricing-card', '--pricing-surface', '#1e293b', 'Surface token vodi pozadinu card-a.'],
  ['host_surface_alt_token', 'ui-pricing-card', '--pricing-surface-alt', 'rgba(15,23,42,0.92)', 'Alternativna površina zatvara gradijent.'],
  ['host_border_token', 'ui-pricing-card', '--pricing-border', 'rgba(148,163,184,0.18)', 'Border token drži ivice nežnim.'],
  ['host_accent_token', 'ui-pricing-card', '--pricing-accent', '#38bdf8', 'Accent token vodi CTA, badge i tier boju.'],
  ['host_accent_strong_token', 'ui-pricing-card', '--pricing-accent-strong', '#2563eb', 'Jači accent zatvara CTA gradijent.'],
  ['host_text_token', 'ui-pricing-card', '--pricing-text', '#f1f5f9', 'Text token čuva kontrast.'],
  ['host_muted_token', 'ui-pricing-card', '--pricing-muted', '#94a3b8', 'Muted token pokriva sekundarne labele.'],
  ['host_shadow_token', 'ui-pricing-card', '--pricing-shadow', '0 16px 48px rgba(15,23,42,0.4)', 'Shadow je javni token, ne interni magic number.'],
  ['host_popular_glow_token', 'ui-pricing-card', '--pricing-popular-glow', '0 0 0 2px rgba(56,189,248,0.35)', 'Popular glow token priprema highlight efekat za istaknutu karticu.'],
  ['tier_starter_accent', 'ui-pricing-card[tier="starter"]', '--pricing-accent', '#a78bfa', 'Starter tier dobija ljubičasti accent.', 'Tier variants menjaju samo token — bez diranja shadow internals.'],
  ['tier_starter_accent_strong', 'ui-pricing-card[tier="starter"]', '--pricing-accent-strong', '#7c3aed', 'Jači ljubičasti ton za CTA gradijent.'],
  ['tier_pro_accent', 'ui-pricing-card[tier="pro"]', '--pricing-accent', '#38bdf8', 'Pro tier koristi default sky blue accent.'],
  ['tier_pro_accent_strong', 'ui-pricing-card[tier="pro"]', '--pricing-accent-strong', '#2563eb', 'Jači blue ton za pro CTA.'],
  ['tier_enterprise_accent', 'ui-pricing-card[tier="enterprise"]', '--pricing-accent', '#f59e0b', 'Enterprise tier dobija amber accent.'],
  ['tier_enterprise_accent_strong', 'ui-pricing-card[tier="enterprise"]', '--pricing-accent-strong', '#d97706', 'Jači amber ton za enterprise CTA.'],
  ['popular_host_shadow', 'ui-pricing-card[popular]', 'box-shadow', 'var(--pricing-popular-glow, 0 0 0 2px rgba(56,189,248,0.35))', 'Popular kartica dobija glow efekat.', 'Popular state je boolean atribut — prisutnost znači aktivan.'],
  ['popular_host_transform', 'ui-pricing-card[popular]', 'transform', 'scale(1.03)', 'Blagi scale ističe popularnu opciju.'],
  ['popular_host_z_index', 'ui-pricing-card[popular]', 'z-index', '1', 'Z-index drži popularnu karticu iznad susednih u grid-u.']
];

const shadowCssSteps = [
  ['shadow_host_display', ':host', 'display', 'block', 'Shadow host potvrđuje block model iznutra.'],
  ['shadow_host_font_family', ':host', 'font-family', 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', 'Font stack je interni shadow contract.'],
  ['shadow_host_color', ':host', 'color', 'var(--pricing-text, #f1f5f9)', 'Boja čita spoljašnji text token.'],
  ['card_outline', '.card', 'outline', '1px dashed #38bdf8', 'Dodajemo helper outline za card blok.', 'Card outline ostaje dok ne završimo unutrašnju celinu.'],
  ['card_display', '.card', 'display', 'grid', 'Card koristi grid za vertikalni stack svih zona.'],
  ['card_gap', '.card', 'gap', '20px', 'Gap odvaja badge, tier, cenu, toggle, feature listu i CTA.'],
  ['card_padding', '.card', 'padding', '32px 28px', 'Padding pravi pravi card footprint.'],
  ['card_radius', '.card', 'border-radius', '24px', 'Zaobljenje daje modernu siluetu.'],
  ['card_border', '.card', 'border', '1px solid var(--pricing-border, rgba(148,163,184,0.18))', 'Border čita host token.'],
  ['card_background', '.card', 'background', 'linear-gradient(180deg, var(--pricing-surface, #1e293b), var(--pricing-surface-alt, rgba(15,23,42,0.92)))', 'Card pozadina čita host surface tokene.'],
  ['card_shadow', '.card', 'box-shadow', 'var(--pricing-shadow, 0 16px 48px rgba(15,23,42,0.4))', 'Shadow dolazi iz host contract-a.'],
  ['card_text_align', '.card', 'text-align', 'center', 'Card sadržaj se centrira.'],
  ['badge_outline', '.popular-badge', 'outline', '1px dotted #facc15', 'Dodajemo helper outline za popular badge.', 'Badge je skriven po default-u, vidljiv samo kada je popular atribut prisutan.'],
  ['badge_display', '.popular-badge', 'display', 'none', 'Badge je sakriveno po defaultu.'],
  ['badge_padding', '.popular-badge', 'padding', '6px 14px', 'Padding pravi pill footprint.'],
  ['badge_radius', '.popular-badge', 'border-radius', '999px', 'Veliki radius pravi kapsulu.'],
  ['badge_background', '.popular-badge', 'background', 'linear-gradient(135deg, var(--pricing-accent, #38bdf8), var(--pricing-accent-strong, #2563eb))', 'Badge pozadina čita tier accent tokene.'],
  ['badge_color', '.popular-badge', 'color', '#ffffff', 'Beli tekst drži kontrast.'],
  ['badge_font_size', '.popular-badge', 'font-size', '12px', 'Mali font čini badge kompaktnim.'],
  ['badge_font_weight', '.popular-badge', 'font-weight', '700', 'Bold drži badge labelu čitkom.'],
  ['badge_letter_spacing', '.popular-badge', 'letter-spacing', '0.04em', 'Tracking drži badge urednim.'],
  ['badge_text_transform', '.popular-badge', 'text-transform', 'uppercase', 'Uppercase za badge kategorijsku labelu.'],
  ['badge_width', '.popular-badge', 'width', 'fit-content', 'Širina samo za sadržaj.'],
  ['badge_justify_self', '.popular-badge', 'justify-self', 'center', 'Centriramo badge horizontalno.'],
  ['badge_popular_display', ':host([popular]) .popular-badge', 'display', 'inline-flex', 'Kada je popular atribut prisutan, badge postaje vidljiv.', 'CSS čita host atribut — JS ne mora ručno da toggle-uje visibility.'],
  ['badge_slotted_font', '::slotted([slot="badge"])', 'font', 'inherit', 'Slotovani badge sadržaj nasleđuje font.'],
  ['tier_name_margin', '.tier-name', 'margin', '0', 'Brišemo podrazumevani heading margin.'],
  ['tier_name_font_size', '.tier-name', 'font-size', '18px', 'Tier ime dobija kompaktnu veličinu.'],
  ['tier_name_font_weight', '.tier-name', 'font-weight', '700', 'Bold drži tier ime jasnim.'],
  ['tier_name_text_transform', '.tier-name', 'text-transform', 'uppercase', 'Uppercase pojačava hijerarhiju.'],
  ['tier_name_letter_spacing', '.tier-name', 'letter-spacing', '0.08em', 'Tracking za tier labelu.'],
  ['tier_name_color', '.tier-name', 'color', 'var(--pricing-accent, #38bdf8)', 'Tier ime čita accent token — menja se sa tier variantom.'],
  ['price_outline', '.price-block', 'outline', '1px dashed #a78bfa', 'Dodajemo helper outline za price blok.', 'Cena je centralni element pricing kartice.'],
  ['price_display', '.price-block', 'display', 'flex', 'Flex pravi horizontalni raspored valuta/iznos/period.'],
  ['price_align', '.price-block', 'align-items', 'baseline', 'Baseline poravnavanje drži $ i /mo uz velik iznos.'],
  ['price_justify', '.price-block', 'justify-content', 'center', 'Centriramo cenu horizontalno.'],
  ['price_gap', '.price-block', 'gap', '4px', 'Minimalni gap između delova cene.'],
  ['price_currency_font_size', '.price-currency', 'font-size', '24px', 'Valuta dobija manji ali jasno vidljiv font.'],
  ['price_currency_font_weight', '.price-currency', 'font-weight', '700', 'Bold za valutu.'],
  ['price_currency_color', '.price-currency', 'color', 'var(--pricing-muted, #94a3b8)', 'Valuta čita muted token.'],
  ['price_amount_font_size', '.price-amount', 'font-size', '56px', 'Velika veličina dominira karticom.'],
  ['price_amount_font_weight', '.price-amount', 'font-weight', '800', 'Extra bold naglašava cenu.'],
  ['price_amount_line_height', '.price-amount', 'line-height', '1', 'Line-height drži broj zategnutim.'],
  ['price_amount_transition', '.price-amount', 'transition', 'transform 200ms ease', 'Tranzicija omogućava future animaciju pri promeni.'],
  ['price_period_font_size', '.price-period', 'font-size', '16px', 'Period je sekundaran.'],
  ['price_period_color', '.price-period', 'color', 'var(--pricing-muted, #94a3b8)', 'Period čita muted token.'],
  ['price_period_font_weight', '.price-period', 'font-weight', '500', 'Medium weight za period.'],
  ['toggle_outline', '.billing-toggle', 'outline', '1px dotted #f472b6', 'Dodajemo helper outline za billing toggle.', 'Toggle je interaktivni UI deo koji menja prikazanu cenu.'],
  ['toggle_display', '.billing-toggle', 'display', 'flex', 'Flex slaže labele i switch horizontalno.'],
  ['toggle_align', '.billing-toggle', 'align-items', 'center', 'Centriramo elemente vertikalno.'],
  ['toggle_justify', '.billing-toggle', 'justify-content', 'center', 'Centriramo ceo toggle.'],
  ['toggle_gap', '.billing-toggle', 'gap', '10px', 'Gap odvaja labele od switch-a.'],
  ['toggle_label_font_size', '.toggle-label', 'font-size', '13px', 'Kompaktan font za toggle labele.'],
  ['toggle_label_color', '.toggle-label', 'color', 'var(--pricing-muted, #94a3b8)', 'Muted boja za neupadljivost.'],
  ['toggle_label_font_weight', '.toggle-label', 'font-weight', '500', 'Medium weight za labele.'],
  ['toggle_label_transition', '.toggle-label', 'transition', 'color 180ms ease', 'Tranzicija za smooth promenu.'],
  ['toggle_switch_appearance', '.toggle-switch', 'appearance', 'none', 'Gasimo native izgled.'],
  ['toggle_switch_width', '.toggle-switch', 'width', '44px', 'Switch širina.'],
  ['toggle_switch_height', '.toggle-switch', 'height', '24px', 'Switch visina.'],
  ['toggle_switch_radius', '.toggle-switch', 'border-radius', '12px', 'Zaobljenje za pill oblik.'],
  ['toggle_switch_border', '.toggle-switch', 'border', '0', 'Uklanjamo border.'],
  ['toggle_switch_background', '.toggle-switch', 'background', 'rgba(148,163,184,0.2)', 'Neutralna toggle pozadina — menja se na yearly.'],
  ['toggle_switch_cursor', '.toggle-switch', 'cursor', 'pointer', 'Pointer kursor za klikabilnost.'],
  ['toggle_switch_position', '.toggle-switch', 'position', 'relative', 'Relative za knob pozicioniranje.'],
  ['toggle_switch_padding', '.toggle-switch', 'padding', '2px', 'Padding oko knob-a.'],
  ['toggle_switch_transition', '.toggle-switch', 'transition', 'background 180ms ease', 'Glatki prelaz pozadine.'],
  ['toggle_knob_display', '.toggle-knob', 'display', 'block', 'Block za knob.'],
  ['toggle_knob_width', '.toggle-knob', 'width', '20px', 'Knob veličina.'],
  ['toggle_knob_height', '.toggle-knob', 'height', '20px', 'Visina jednaka širini.'],
  ['toggle_knob_radius', '.toggle-knob', 'border-radius', '50%', 'Kružni knob.'],
  ['toggle_knob_background', '.toggle-knob', 'background', '#ffffff', 'Beli knob.'],
  ['toggle_knob_transition', '.toggle-knob', 'transition', 'transform 180ms ease', 'Glatki prelaz pozicije.'],
  ['toggle_yearly_bg', ':host([billing="yearly"]) .toggle-switch', 'background', 'var(--pricing-accent, #38bdf8)', 'Na yearly, switch postaje accent boja.', 'CSS čita billing atribut — JS samo menja atribut, vizuelni efekat je automatski.'],
  ['toggle_yearly_knob', ':host([billing="yearly"]) .toggle-knob', 'transform', 'translateX(20px)', 'Knob se pomera desno na yearly.'],
  ['save_badge_font_size', '.save-badge', 'font-size', '10px', 'Save badge je mali ali upadljiv.'],
  ['save_badge_background', '.save-badge', 'background', 'rgba(34,197,94,0.2)', 'Zelena pozadina signalizira uštedu.'],
  ['save_badge_color', '.save-badge', 'color', '#22c55e', 'Zeleni tekst za save signal.'],
  ['save_badge_padding', '.save-badge', 'padding', '2px 6px', 'Mali padding.'],
  ['save_badge_radius', '.save-badge', 'border-radius', '4px', 'Blago zaobljenje.'],
  ['save_badge_font_weight', '.save-badge', 'font-weight', '700', 'Bold za isticanje.'],
  ['features_outline', '.feature-list', 'outline', '1px dashed #34d399', 'Dodajemo helper outline za feature listu.', 'Feature list slot je javna površina za marketing sadržaj.'],
  ['features_padding', '.feature-list', 'padding', '8px 0', 'Vertikalni padding za feature zonu.'],
  ['features_slotted_list_style', '::slotted(ul)', 'list-style', 'none', 'Brišemo bullet-e.'],
  ['features_slotted_margin', '::slotted(ul)', 'margin', '0', 'Brišemo default margin.'],
  ['features_slotted_padding', '::slotted(ul)', 'padding', '0', 'Brišemo default padding.'],
  ['features_slotted_display', '::slotted(ul)', 'display', 'grid', 'Grid za feature listu.'],
  ['features_slotted_gap', '::slotted(ul)', 'gap', '12px', 'Razmak između feature stavki.'],
  ['features_slotted_text_align', '::slotted(ul)', 'text-align', 'left', 'Feature stavke su levo poravnate.'],
  ['features_slotted_font_size', '::slotted(ul)', 'font-size', '14px', 'Kompaktan font za feature listu.'],
  ['features_slotted_color', '::slotted(ul)', 'color', 'var(--pricing-muted, #94a3b8)', 'Feature tekst čita muted token.'],
  ['cta_outline', '.cta', 'outline', '1px dashed #f97316', 'Dodajemo helper outline za CTA dugme.', 'CTA je centralni action element pricing kartice.'],
  ['cta_appearance', '.cta', 'appearance', 'none', 'Gasimo native button izgled.'],
  ['cta_width', '.cta', 'width', '100%', 'CTA zauzima punu širinu.'],
  ['cta_padding', '.cta', 'padding', '14px 20px', 'Padding pravi klik zonu.'],
  ['cta_border', '.cta', 'border', '0', 'Brišemo border.'],
  ['cta_radius', '.cta', 'border-radius', '14px', 'Zaobljeno dugme.'],
  ['cta_background', '.cta', 'background', 'linear-gradient(135deg, var(--pricing-accent, #38bdf8), var(--pricing-accent-strong, #2563eb))', 'CTA gradijent čita tier tokene — menja se sa varijantom.'],
  ['cta_color', '.cta', 'color', '#ffffff', 'Beli tekst za kontrast.'],
  ['cta_font', '.cta', 'font', 'inherit', 'Preuzima font.'],
  ['cta_font_size', '.cta', 'font-size', '15px', 'Solidna veličina za action.'],
  ['cta_font_weight', '.cta', 'font-weight', '700', 'Bold za jasnoću.'],
  ['cta_cursor', '.cta', 'cursor', 'pointer', 'Kursor potvrđuje interakciju.'],
  ['cta_transition', '.cta', 'transition', 'transform 160ms ease, filter 160ms ease, box-shadow 160ms ease', 'Tranzicije za glatki response.'],
  ['cta_box_shadow', '.cta', 'box-shadow', '0 12px 28px rgba(37,99,235,0.28)', 'CTA shadow dodaje dubinu.'],
  ['cta_hover_filter', '.cta:hover', 'filter', 'brightness(1.08)', 'Na hover blago podižemo svetlinu.'],
  ['cta_hover_transform', '.cta:hover', 'transform', 'translateY(-1px)', 'Blagi lift na hover.'],
  ['cta_active_transform', '.cta:active', 'transform', 'translateY(0)', 'Na active vraćamo dugme.'],
  ['cta_focus_outline', '.cta:focus-visible', 'outline', '3px solid rgba(56,189,248,0.45)', 'Focus ring za tastatursku navigaciju.'],
  ['cta_focus_outline_offset', '.cta:focus-visible', 'outline-offset', '3px', 'Offset odvaja ring od dugmeta.'],
  ['urgency_outline', '.urgency', 'outline', '1px dotted #fb923c', 'Dodajemo helper outline za urgency timer zonu.', 'Urgency timer pojačava konverziju — mora biti vizuelno jasan ali ne agresivan.'],
  ['urgency_display', '.urgency', 'display', 'flex', 'Flex slaže ikonu i tekst.'],
  ['urgency_align', '.urgency', 'align-items', 'center', 'Centriramo vertikalno.'],
  ['urgency_justify', '.urgency', 'justify-content', 'center', 'Centriramo horizontalno.'],
  ['urgency_gap', '.urgency', 'gap', '6px', 'Gap između ikone i teksta.'],
  ['urgency_font_size', '.urgency', 'font-size', '12px', 'Kompaktan font.'],
  ['urgency_color', '.urgency', 'color', '#fb923c', 'Narandžasta boja za urgency signal.'],
  ['urgency_font_weight', '.urgency', 'font-weight', '600', 'Semi-bold za urgentnost.']
];

export const lessonSteps = [
  describeHtmlElementStep(
    'empty_shell',
    'Start: Empty App Shell',
    'Počinjemo od praznog `.app-shell`. SaaS pricing kartica živi u neutralnom host okruženju.',
    'html:app-shell',
    'Pricing table komponenta radi u bilo kom kontekstu — landing page, modal, dashboard.',
    ['<div class="app-shell">']
  ),
  describeHtmlElementStep(
    'component_html',
    'HTML: ui-pricing-card Host',
    'Dodajemo `<ui-pricing-card>` sa `tier="pro"`, `price-monthly="29"` i `price-yearly="24"`. Tag odmah kaže šta widget radi.',
    'html:ui-pricing-card',
    'Domain-driven naming: ime taga govori business use case, ne tehničku implementaciju.'
  ),
  describeHtmlElementStep(
    'popular_attribute_html',
    'HTML: popular Boolean Attribute',
    'Dodajemo `popular` atribut. Njegova prisutnost znači da je ova kartica istaknuta — nema vrednosti, samo postoji ili ne postoji.',
    'html:popular',
    'Boolean atribut je najčistiji deklarativni state signal: prisutnost = true, odsustvo = false.'
  ),
  describeHtmlElementStep(
    'cta_label_attribute_html',
    'HTML: cta-label Attribute',
    'Dodajemo `cta-label="Start free trial"`. CTA tekst je deo javnog contract-a, ne hardkodovan u shadow DOM-u.',
    'html:cta-label',
    'Svaki tekst koji parent može da želi da promeni mora biti atribut, ne interni string.'
  ),
  describeHtmlElementStep(
    'badge_slot_html',
    'HTML: Named Slot — badge',
    'Dodajemo `<span slot="badge">⭐ Most Popular</span>`. Parent kontroliše badge sadržaj.',
    'html:slot-badge',
    'Named slot daje parent-u slobodu da pošalje emoji, tekst, ili čak custom HTML za badge.'
  ),
  describeHtmlElementStep(
    'features_slot_html',
    'HTML: Named Slot — features',
    'Dodajemo `<ul slot="features">` sa pet feature stavki. Feature matrix je javna powierzchina.',
    'html:slot-features',
    'Feature lista kao slot znači da svaki tier može imati drugačije stavke bez promene komponente.'
  ),
  describeTeachingStep(
    'pricing_widget_contract',
    'Teaching Moment: SaaS Pricing Contract',
    'Widget ima šest atributa: `tier`, `price-monthly`, `price-yearly`, `billing`, `popular`, `cta-label`. Ima dva named slota: `badge` i `features`. Emituje jedan namespaced event: `ui-pricing-card:subscribe`. Urgency timer je interni lifecycle detalj.',
    'SaaS pricing widget API treba da budi uzan: parent zna cenu i tier, widget zna visual i behavior.',
    ['<ui-pricing-card', 'tier=']
  ),
  describeTemplateJsStep(
    'template_html_declaration',
    'Template JS: Shadow DOM struktura',
    'U `ui-pricing-card.template.js` definišemo `templateHtml`: card sa badge, tier-name, price-block (currency/amount/period), billing-toggle sa knob switch-em, feature-list slot, CTA dugme i urgency timer zona.',
    'Template fajl drži kompletnu shadow strukturu. Klasa ga samo klonira — nikad ne rekreira.'
  ),
  describeTemplateJsStep(
    'template_element_export',
    'Template JS: Eksportujemo template element',
    'Kreiramo `uiPricingCardTemplate`, dodajemo `<link>` ka shadow CSS fajlu i ubrizgavamo `${templateHtml}`.',
    'Template modul zna za markup i stylesheet. Klasa uopšte ne zna kako izgleda HTML.'
  ),
  describeJsFlowStep(
    'import_template',
    'JS: Uvozimo template modul',
    'Behavior fajl uvozi `uiPricingCardTemplate` iz template modula.',
    'Klasa i template su u odvojenim fajlovima sa odvojenim odgovornostima.'
  ),
  describeJsFlowStep(
    'normalize_text_helper',
    'JS: normalizeTextValue() helper',
    'Dodajemo `normalizeTextValue()` za tekst normalizaciju sa fallback-om.',
    'Enterprise API normalizuje ulaz na granici, ne unutar poslovne logike.'
  ),
  describeJsFlowStep(
    'allowed_tiers_set',
    'JS: allowedTiers Set',
    'Zaključavamo dozvoljene tier vrednosti: `starter`, `pro`, `enterprise`.',
    'Otvoreni string za tier koji utiče na pricing i styling je neprihvatljiv rizik.'
  ),
  describeJsFlowStep(
    'normalize_tier_helper',
    'JS: normalizeTierValue() helper',
    'Nepoznat tier automatski pada na `starter`.',
    'Fallback je deo contract-a. Komponenta ne padne na pogresan tier string.'
  ),
  describeJsFlowStep(
    'parse_price_helper',
    'JS: parsePriceValue() helper',
    'Dodajemo `parsePriceValue()` koji parira cenu u broj i vraća 0 za nevalidan ulaz.',
    'Cena se prikazuje korisnicima — mora biti sigurna od NaN-a i negativnih vrednosti.'
  ),
  describeJsFlowStep(
    'format_time_helper',
    'JS: formatTimeRemaining() helper',
    'Dodajemo `formatTimeRemaining()` koji formatira sekunde u `HH:MM:SS` string za urgency timer.',
    'Timer format je odvojenom helperu — lako se testira i zameni.'
  ),
  describeJsFlowStep(
    'tier_display_map',
    'JS: tierDisplayName mapa',
    'Dodajemo mapu tier → display name. UI labela ne sme da bude isti string kao API vrednost.',
    'API koristi lowercase slug, UI prikazuje capitalized ime — mapa ih razdvaja.'
  ),
  describeJsFlowStep(
    'class_declaration',
    'JS: UiPricingCard extends HTMLElement',
    'Klasa nosi domain-driven ime konzistentno sa tagom.',
    '`ui-pricing-card` → `UiPricingCard`. Tag i class govore istu priču.'
  ),
  describeJsFlowStep(
    'observed_attributes',
    'JS: observedAttributes — svih šest',
    'Komponenta prati `tier`, `price-monthly`, `price-yearly`, `billing`, `popular` i `cta-label`.',
    'Pratimo tačno onoliko atributa koliko je definisano kao javni API.'
  ),
  describeJsFlowStep(
    'constructor_shadow',
    'JS: constructor otvara shadow root',
    'Konstruktor samo priprema instancu: shadow root, bind-ove i nulte reference.',
    'Konstruktor ne radi lifecycle posao niti čita DOM.'
  ),
  describeJsFlowStep(
    'constructor_bind',
    'JS: constructor pre-binduje handlere',
    'Vezujemo `handleCtaClick` i `handleToggleClick` jednom pri kreiranju instance.',
    'Dva handlera, dva pre-bind-a — stabilan cleanup je zagarantovan.'
  ),
  describeJsFlowStep(
    'constructor_state',
    'JS: constructor priprema interne reference',
    'Nulujemo DOM reference, binding flagove, timer ID i urgency preostalo vreme.',
    'Interno stanje je transparentno od prvog reda. Timer state je deo instanace.'
  ),
  describeJsFlowStep(
    'connected_callback',
    'JS: connectedCallback — lifecycle ulaz',
    'Connected lifecycle je glavni ulaz kada pricing kartica uđe u DOM.',
    'Sve što zavisi od živog DOM-a ide u connectedCallback.'
  ),
  describeJsFlowStep(
    'connected_callback_setup',
    'JS: connectedCallback poziva setupTemplateOnce',
    'Montiramo template u shadow root jednom.',
    'Mount i cache imaju odvojene metode.'
  ),
  describeJsFlowStep(
    'connected_callback_cache',
    'JS: connectedCallback poziva cacheDom',
    'Keširamo pet DOM referenci.',
    'Query radimo jednom. Update metode rade nad keširanima.'
  ),
  describeJsFlowStep(
    'connected_callback_sync',
    'JS: connectedCallback sinhronizuje atribute',
    'Pozivamo `syncFromAttributes()` za inicijalni render pass.',
    'Četiri uske update metode inicijalizuju tačno ono što treba.'
  ),
  describeJsFlowStep(
    'connected_callback_bind',
    'JS: connectedCallback zakačuje evente',
    'Vezujemo CTA i toggle click listenere.',
    'Event wiring je poslednji korak — DOM mora biti spreman.'
  ),
  describeJsFlowStep(
    'connected_callback_urgency',
    'JS: connectedCallback pokreće urgency timer',
    'Pozivamo `startUrgencyTimer()` koji pokreće interval sa countdown-om od 1h.',
    'Timer je deo lifecycle-a — start na connect, stop na disconnect.'
  ),
  describeJsFlowStep(
    'disconnected_callback',
    'JS: disconnectedCallback — čisti sve',
    'Na izlazu iz DOM-a skidamo evente i zaustavljamo urgency timer.',
    'Nema leaking intervala ni event listener-a — čist disconnect.'
  ),
  describeJsFlowStep(
    'attribute_changed_callback',
    'JS: precizan attributeChangedCallback',
    'Potpis prima `name`, `oldValue` i `newValue` za granularni update.',
    'Preciznost omogućava da menjamo samo tu jednu stvar koja se zaista promenila.'
  ),
  describeJsFlowStep(
    'attribute_changed_guard',
    'JS: guard za iste vrednosti i disconnected stanje',
    'Odmah izlazimo ako se vrednost nije promenila ili widget nije u DOM-u.',
    'Enterprise update path ne troši resurse bespotrebno.'
  ),
  describeJsFlowStep(
    'attribute_changed_switch',
    'JS: switch — precizan update po atributu',
    'Tier menja labelu, price/billing/yearly menjaju prikazanu cenu i toggle, cta-label menja dugme.',
    'Svaki atribut ima svoju granu — nema slepog full render-a.'
  ),
  describeJsFlowStep(
    'property_tier_getter',
    'JS: tier getter',
    'Getter vraća normalizovani tier sa fallback-om na `starter`.',
    'Property API otvara JS pristup pored HTML contract-a.'
  ),
  describeJsFlowStep(
    'property_tier_setter',
    'JS: tier setter',
    'Setter normalizuje i piše nazad u atribut.',
    'Source of truth ostaje na atributu.'
  ),
  describeJsFlowStep(
    'property_price_monthly_getter',
    'JS: priceMonthly getter',
    'Getter parsira mesečnu cenu u bezbedan broj.',
    'Nikad ne vraćamo NaN ili negativan broj korisniku.'
  ),
  describeJsFlowStep(
    'property_price_yearly_getter',
    'JS: priceYearly getter',
    'Getter parsira godišnju cenu na isti način.',
    'Oba pricing getter-a koriste istu `parsePriceValue()` logiku.'
  ),
  describeJsFlowStep(
    'property_billing_getter',
    'JS: billing getter',
    'Getter vraća `monthly` ili `yearly` — samo dve opcije.',
    'Binary state ne treba Set. Simple conditional je dovoljno.'
  ),
  describeJsFlowStep(
    'property_billing_setter',
    'JS: billing setter',
    'Setter piše normalizovani billing nazad u atribut.',
    'Toggle menja atribut → attributeChangedCallback → updatePrice() + updateToggleState(). Jednosmerni tok.'
  ),
  describeJsFlowStep(
    'property_popular_getter',
    'JS: popular getter',
    'Boolean getter čita hasAttribute.',
    'Boolean atribut: prisutnost = true, odsustvo = false.'
  ),
  describeJsFlowStep(
    'property_cta_label_getter',
    'JS: ctaLabel getter',
    'Getter vraća normalizovan CTA tekst sa fallback-om.',
    'Fallback osigurava da dugme nikad ne bude prazno.'
  ),
  describeJsFlowStep(
    'setup_template_once',
    'JS: setupTemplateOnce()',
    'Template mount za reusable kloniranje.',
    'Mount se dešava jednom. Reconnect ne remontira.'
  ),
  describeJsFlowStep(
    'setup_template_once_guard',
    'JS: guard sprečava dupliranje',
    'Kloniramo template samo ako shadow root nema dece.',
    'Reconnect mora biti boring. Bez dupliranja DOM-a.'
  ),
  describeJsFlowStep(
    'cache_dom',
    'JS: cacheDom — samo kešira reference',
    'Querijemo šest internih elemenata i čuvamo na instanci.',
    'Cache znači pamti, ne gradi. Ime i ponašanje su usklađeni.'
  ),
  describeJsFlowStep(
    'cache_dom_tier_name',
    'JS: cacheDom kešira .tier-name',
    'Tier name span čuvamo za updateTierName.',
    'DOM query jednom, updates bez novog querySelector-a.'
  ),
  describeJsFlowStep(
    'cache_dom_price_amount',
    'JS: cacheDom kešira .price-amount',
    'Price amount element čuvamo za dinamičko menjanje cene.',
    'Cena se menja na toggle klik — keš ubrzava taj update.'
  ),
  describeJsFlowStep(
    'cache_dom_price_period',
    'JS: cacheDom kešira .price-period',
    'Price period span čuvamo za dinamičko menjanje tekstualne labele (/mo ili /yr).',
    'Vizuelni tekst perioda mora pratiti iznos cene.'
  ),
  describeJsFlowStep(
    'cache_dom_cta',
    'JS: cacheDom kešira .cta',
    'CTA dugme čuvamo za tekst i event binding.',
    'Jedno dugme, dva posla: tekst update i event listener.'
  ),
  describeJsFlowStep(
    'cache_dom_toggle',
    'JS: cacheDom kešira .toggle-switch',
    'Toggle switch čuvamo za aria-checked i event.',
    'Toggle je interaktivni element sa sopstvenim listenerom.'
  ),
  describeJsFlowStep(
    'cache_dom_urgency',
    'JS: cacheDom kešira .urgency-text',
    'Urgency text element čuvamo za timer update.',
    'Timer menja ovaj element svake sekunde — keš je obavezan.'
  ),
  describeJsFlowStep(
    'sync_from_attributes',
    'JS: syncFromAttributes()',
    'Centralna one-time inicijalizacija DOM-a iz atributa.',
    'Četiri uske update metode inicijalizuju sve vidljive zone.'
  ),
  describeJsFlowStep(
    'sync_from_attributes_calls',
    'JS: sync poziva četiri update metode',
    'Pozivamo `updateTierName()`, `updatePrice()`, `updateToggleState()` i `updateCtaLabel()`.',
    'Svaki poziv je uski i individualno testabilan.'
  ),
  describeJsFlowStep(
    'update_tier_name',
    'JS: updateTierName()',
    'Piše display name tiera u naslov. `pro` → `Pro`.',
    'API slug i UI labela su razdvojeni mapom.'
  ),
  describeJsFlowStep(
    'update_price',
    'JS: updatePrice()',
    'Čita `billing` da odluči monthly ili yearly cenu i piše broj u DOM.',
    'Dinamički pricing: toggle kontroliše šta se prikazuje, update je automatski.'
  ),
  describeJsFlowStep(
    'update_cta_label',
    'JS: updateCtaLabel()',
    'Piše CTA tekst i postavlja aria-label sa tier kontekstom.',
    'Accessibility je deo istog update contract-a, ne naknadan fix.'
  ),
  describeJsFlowStep(
    'update_toggle_state',
    'JS: updateToggleState()',
    'Ažurira `aria-checked` na toggle switch-u prema billing stanju.',
    'Vizuelni toggle se oslanja na CSS :host([billing]) — JS samo drži ARIA u sinhronu.'
  ),
  describeJsFlowStep(
    'start_urgency_timer',
    'JS: startUrgencyTimer()',
    'Pokreće setInterval koji svake sekunde smanjuje urgencyRemaining i ažurira prikaz.',
    'Timer je lifecycle-aware: živi koliko i komponenta u DOM-u.'
  ),
  describeJsFlowStep(
    'stop_urgency_timer',
    'JS: stopUrgencyTimer()',
    'Čisti interval i postavlja ID na null.',
    'Lifecycle cleanup sprečava memory leak i ghost updates.'
  ),
  describeJsFlowStep(
    'update_urgency_display',
    'JS: updateUrgencyDisplay()',
    'Formatira preostalo vreme u `HH:MM:SS` i piše u urgency-text element.',
    'Display helper je odvojen od timer logike — jednostavno za test i zamenu formata.'
  ),
  describeJsFlowStep(
    'bind_events',
    'JS: bindEvents()',
    'Event wiring ostaje u sopstvenoj responsibility metodi.',
    'Bind i unbind su uvek u paru.'
  ),
  describeJsFlowStep(
    'bind_cta_event',
    'JS: bindEvents kači CTA listener',
    'Guard sprečava dvostruki binding. CTA click emituje subscribe event.',
    'Jedan listener, jedan flag, jedan cleanup.'
  ),
  describeJsFlowStep(
    'bind_toggle_event',
    'JS: bindEvents kači toggle listener',
    'Toggle click menja billing atribut. Guard sprečava dvostruki binding.',
    'Toggle je interni UI, ali njegov efekat se propagira kroz attribute pipeline.'
  ),
  describeJsFlowStep(
    'unbind_events',
    'JS: unbindEvents()',
    'Cleanup metoda za oba listenera.',
    'Svaki bind ima svoj unbind par.'
  ),
  describeJsFlowStep(
    'unbind_cta_event',
    'JS: unbindEvents skida CTA listener',
    'Proveri flag pre skidanja — izbjagava grešku na disconnect bez prethodnog bind-a.',
    'Defensive coding za lifecycle edge case-ove.'
  ),
  describeJsFlowStep(
    'unbind_toggle_event',
    'JS: unbindEvents skida toggle listener',
    'Isti pattern: flag check, remove, reset.',
    'Dva listenera, dva cleanup-a, isti model.'
  ),
  describeJsFlowStep(
    'handle_cta_click',
    'JS: handleCtaClick()',
    'CTA handler emituje namespaced event.',
    'Handler je mali: samo emituj signal sa payload-om.'
  ),
  describeJsFlowStep(
    'handle_cta_click_event',
    'JS: ui-pricing-card:subscribe event',
    'Emitujemo `ui-pricing-card:subscribe` sa `{tier, price, billing, ctaLabel, source}` detail-om.',
    'Event contract je javni API. Parent ga sluša i odlučuje o checkout flow-u.'
  ),
  describeJsFlowStep(
    'handle_toggle_click',
    'JS: handleToggleClick() — billing toggle',
    'Klik na toggle menja billing sa monthly na yearly (ili obrnuto). Setter upisuje atribut → attributeChangedCallback → updatePrice + updateToggleState.',
    'Jednosmerni tok: klik → setter → atribut → callback → DOM update. Nema shortcut-a.'
  ),
  describeJsFlowStep(
    'define_guard',
    'JS: guard pre registracije',
    'Proveravamo da li je element već registrovan.',
    'Hot reload i SSR ne smeju da bacaju grešku.'
  ),
  describeJsFlowStep(
    'define_element',
    'JS: registrujemo ui-pricing-card',
    '`customElements.define("ui-pricing-card", UiPricingCard)` — pricing kartica je spremna.',
    'Od ovog momenta svaki `<ui-pricing-card>` u DOM-u dobija pun lifecycle, billing toggle i urgency timer.'
  ),
  ...shellCssSteps.map(config => describeCssPropertyStep(...config)),
  describeTeachingStep(
    'host_vs_shadow_styles',
    'Teaching Moment: Tier + Popular + Billing Contract',
    'Host CSS je definisao token contract, tier accent varijante i popular state highlight. Shadow CSS sada stilizuje card internals: badge, cenu, toggle switch, feature listu, CTA i urgency timer. Toggle vizuelni efekat dolazi iz `:host([billing="yearly"])` selectora — CSS automatski reaguje na atribut.',
    'Pravilo: tier/popular/billing spolja, card internals unutra.'
  ),
  ...shadowCssSteps.map(config => describeShadowCssPropertyStep(...config)),
  describeSummaryStep(
    'card_summary',
    'Rezime: .card',
    'Uklanjamo card helper outline.',
    'Card čita sve styling tokene iz host contract-a.'
  ),
  describeSummaryStep(
    'badge_summary',
    'Rezime: .popular-badge',
    'Uklanjamo badge helper outline.',
    'Badge se pojavljuje samo kada je popular atribut prisutan — CSS controlled visibility.'
  ),
  describeSummaryStep(
    'price_summary',
    'Rezime: .price-block',
    'Uklanjamo price helper outline.',
    'Cena se dinamički menja toggle-om: monthly/yearly → billing atribut → updatePrice().'
  ),
  describeSummaryStep(
    'toggle_summary',
    'Rezime: .billing-toggle',
    'Uklanjamo billing toggle helper outline.',
    'Toggle switch vizuelno reaguje na :host([billing="yearly"]) bez JS direktne manipulacije stila.'
  ),
  describeSummaryStep(
    'features_summary',
    'Rezime: .feature-list',
    'Uklanjamo feature list helper outline.',
    'Feature lista je named slot — sadržaj kontroliše parent, stilizovanje kontroliše shadow.'
  ),
  describeSummaryStep(
    'cta_summary',
    'Rezime: .cta',
    'Uklanjamo CTA helper outline.',
    'CTA emituje ui-pricing-card:subscribe event. Parent odlučuje o checkout flow-u.'
  ),
  describeSummaryStep(
    'urgency_summary',
    'Rezime: .urgency',
    'Uklanjamo urgency timer helper outline.',
    'Timer je lifecycle-aware: startuje na connect, zaustavlja se na disconnect.'
  ),
  describeSummaryStep(
    'host_summary',
    'Rezime: ui-pricing-card host',
    'Uklanjamo host helper outline.',
    'Host nosi kompletno tier/popular/billing token contract bez mešanja sa shadow-om.'
  ),
  describeSummaryStep(
    'shell_summary',
    'Rezime: .app-shell',
    'Uklanjamo shell helper outline.',
    'Pricing kartica živi u neutralnoj sceni, spremna za integraciju u pravi pricing page.',
    ['<div class="app-shell">']
  ),
  describeFinishedStep(
    'done',
    'Done: UI Pricing Card — SaaS Pricing Table',
    '`ui-pricing-card` je završen: `index.html` deklarativno koristi tier/price/popular atribute i feature slot, `ui-pricing-card.template.js` drži shadow strukturu, `ui-pricing-card.js` vodi property API, billing toggle, urgency timer i subscribe event, `style.css` theme-uje host sa tier varijantama, a `ui-pricing-card.shadow.css` drži unutrašnji styling sa toggle animacijom.',
    'Enterprise pricing widget: šest atributa, dva slota, jedan event, billing toggle, urgency timer, tri tier varijante. Ceo tok je jednosmeran: atribut → callback → DOM.'
  )
];

export const stepNumberById = Object.fromEntries(
  lessonSteps.map((step, index) => [step.id, index])
);
