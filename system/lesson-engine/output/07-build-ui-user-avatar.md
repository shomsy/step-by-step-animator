<!-- Generated from the source-only lesson package. -->

# 07 · UI User Avatar — Dashboard Widget

Gradimo `ui-user-avatar` u dve faze: prvo pravimo kompletnu vizuelnu komponentu sa HTML, CSS i template JS delovima, a tek onda joj uključujemo status, tooltip, property API i click behavior korak po korak.

## Goal

- Cilj: UI User Avatar Widget

U ovoj lekciji prvo sklapamo kompletan vizuelni team member widget, a tek onda osposobljavamo status, tooltip i event ponašanje.

## Steps

1. Start: Empty App Shell - Počinjemo od praznog `.app-shell` prostora. Dashboard widget živi u neutralnom host okruženju.

2. HTML: ui-user-avatar Host - Dodajemo `<ui-user-avatar>` sa `username` i `role` atributima. Tag odmah govori šta ovaj widget jeste.

3. HTML: status="online" - Dodajemo `status="online"` i uvodimo deklarativni status API. Status je deo HTML contract-a, ne JavaScript stanja.

4. HTML: profile-url atribut - Dodajemo `profile-url` koji ide u event payload pri kliku. Komponenta ne navigira sama.

5. HTML: Named Slot — initials - Dodajemo `<span slot="initials">AP</span>`. Slot je javna API površina za inicijale ili sliku.

6. HTML: Named Slot — tooltip - Dodajemo `<span slot="tooltip">` sa punim contextualnim opisom član tima. Tooltip sadržaj kontroliše parent.

7. Teaching Moment: Dashboard Widget Contract - Ovaj widget ima četiri javna atributa: `username`, `role`, `status`, `profile-url`. Ima dva named slota: `initials` i `tooltip`. Emituje jedan namespaced event: `ui-user-avatar:profile-open`. Nema internog routing-a i nema opisivanja šta parent treba da uradi.

8. Template JS: Shadow DOM struktura - U `ui-user-avatar.template.js` definiše `templateHtml`: avatar-container, avatar-image sa slot za inicijale, status-badge, avatar-info sa username i role spanovima, i tooltip sa named slotom.

9. Template JS: Eksportujemo template element - Kreiramo `uiUserAvatarTemplate`, dodajemo `<link>` ka shadow CSS fajlu i ubrizgavamo `${templateHtml}`.

10. JS: Uvozimo template modul - Behavior fajl uvozi `uiUserAvatarTemplate` iz template modula. Klasa ne gradi HTML stringove.

11. JS: normalizeTextValue() helper - Dodajemo `normalizeTextValue()` da username i role ne zavise od sirovog ulaza.

12. JS: allowedStatuses Set - Zaključavamo dozvoljene statusne vrednosti: `online`, `idle`, `away`, `offline`.

13. JS: normalizeStatusValue() helper - Dodajemo `normalizeStatusValue()`. Svaki nepoznat status automatski pada na `offline`.

14. JS: statusAriaLabel mapa - Dodajemo `statusAriaLabel` objekat koji mapira status vrednosti na human-readable aria labele.

15. JS: UiUserAvatar extends HTMLElement - Klasa nosi domain-driven ime, konzistentno sa tagom.

16. JS: observedAttributes — sva četiri - Komponenta prati `username`, `role`, `status` i `profile-url` — tačno onoliko koliko je deklarirano kao javni API.

17. JS: constructor otvara shadow root - Konstruktor samo priprema instancu: shadow root, bind i nulte reference.

18. JS: constructor pre-binduje click handler - Vezujemo `handleAvatarClick` jednom, pri kreiranju instance.

19. JS: constructor priprema interne reference - Nulujemo DOM reference i state flag za click binding.

20. JS: connectedCallback — lifestyle ulaz - Connected lifecycle je glavni ulaz kada widget uđe u živi DOM.

21. JS: connectedCallback poziva setupTemplateOnce - Prvo jednom montiramo template u shadow root.

22. JS: connectedCallback poziva cacheDom - Kad template postoji, keširamo DOM reference.

23. JS: connectedCallback sinhronizuje atribute - Pozivamo `syncFromAttributes()` kao prvi ciljani render pass.

24. JS: setupTemplateOnce() - Template mount dobija sopstvenu metodu.

25. JS: guard sprečava dupliranje - Kloniramo template samo ako shadow root nema child node-ova.

26. JS: cacheDom — samo kešira reference - cacheDom ne montira template i ne radi render. Samo pronalazi reference ako ne postoje.

27. JS: cacheDom kešira .username element - Username span čuvamo jednom da updateUsername ne mora da radi query pri svakoj promeni.

28. JS: cacheDom kešira .role element - Role span čuvamo na isti način.

29. JS: cacheDom kešira .status-badge - Status badge element čuvamo za aria-label update.

30. JS: syncFromAttributes() - Centralna one-time inicijalizacija koja propagira sve atribute u DOM na prvom connect-u.

31. JS: sync poziva sva tri updatera - Pozivamo `updateUsername()`, `updateRole()` i `updateStatus()` pri inicijalnom connect-u.

32. JS: updateUsername() - Username element dobija tačno ono što property API vrati.

33. JS: updateRole() - Role element ažuriramo kroz istu usku metodu.

34. JS: updateStatus() - Status badge dobija ažuriranu aria-label iz `statusAriaLabel` mape.

35. JS: guard pre registracije - Proveravamo da li je element već registrovan pre `customElements.define()`.

36. JS: registrujemo ui-user-avatar - Komponenta je registrovana: `customElements.define("ui-user-avatar", UiUserAvatar)`.

37. CSS: .app-shell / outline - Dodajemo tanak helper outline za `.app-shell` i držimo ga do završnog shell rezimea.

38. CSS: .app-shell / padding - Breathing prostor drži scenu urednom.

39. CSS: .app-shell / display - Grid pravi jedinstven container za widget.

40. CSS: .app-shell / place-items - Widget treba da bude centriran u demo sceni.

41. CSS: .app-shell / gap - Gap priprema prostor za eventualni drugi avatar.

42. CSS: .app-shell / min-height - Puna visina drži dark pozadinu stabilnom.

43. CSS: .app-shell / background - Tamna pozadina naglašava avatar widget.

44. CSS: ui-user-avatar / outline - Dodajemo host helper outline i držimo ga do završnog host rezimea.

45. CSS: ui-user-avatar / display - Avatar ostaje kompaktan inline-block element.

46. CSS: ui-user-avatar / position - Pozicija pravi stacking kontekst za tooltip.

47. CSS: ui-user-avatar / cursor - Avatar je klikabilna zona — cursor to mora jasno da kaže.

48. CSS: ui-user-avatar / --avatar-surface - Počinjemo token contract: površina je spolja theme-ovana.

49. CSS: ui-user-avatar / --avatar-surface-alt - Alternativna površina drži gradijent konzistentnim.

50. CSS: ui-user-avatar / --avatar-accent - Accent token vodi boju avatara i detalja.

51. CSS: ui-user-avatar / --avatar-text - Text token čuva kontrast u celom widgetu.

52. CSS: ui-user-avatar / --avatar-muted - Muted token pokriva role i sekundarne labele.

53. CSS: ui-user-avatar / --avatar-border - Border token drži ivice neagresivnim na tamnoj pozadini.

54. CSS: ui-user-avatar / --avatar-shadow - Shadow token ide kao javni contract, ne internu magiju.

55. CSS: ui-user-avatar / --avatar-status-color - Status boja je javni host token — variants ga samo prepišu.

56. CSS: ui-user-avatar[status="online"] / --avatar-status-color - Online status dobija zeleni signal.

57. CSS: ui-user-avatar[status="idle"] / --avatar-status-color - Idle dobija žuti signal.

58. CSS: ui-user-avatar[status="away"] / --avatar-status-color - Away dobija narandžasti signal.

59. CSS: ui-user-avatar[status="offline"] / --avatar-status-color - Offline dobija sivi, neutralni signal.

60. Teaching Moment: Token styling contract - Host CSS drži token kontrakt i status variants. Svaka promena statusa menja samo `--avatar-status-color` token — bez diranja shadow internals. Sledeći koraci prelaze u `ui-user-avatar.shadow.css`.

61. Shadow CSS: :host / display - Shadow host potvrđuje inline-block model iznutra.

62. Shadow CSS: :host / font-family - Font stack ostaje interni shadow contract.

63. Shadow CSS: :host / color - Boja čita spoljašnji text token.

64. Shadow CSS: .avatar-container / outline - Dodajemo helper outline za avatar container.

65. Shadow CSS: .avatar-container / position - Relative pozicija pravi stacking kontekst za status badge i tooltip.

66. Shadow CSS: .avatar-container / display - Flex pravi vertikalni stack avatar delova.

67. Shadow CSS: .avatar-container / flex-direction - Kolona slaže sliku, info i tooltip vertikalno.

68. Shadow CSS: .avatar-container / align-items - Sve celine se centriraju horizontalno.

69. Shadow CSS: .avatar-container / gap - Gap drži rastojanje između slike i info zone.

70. Shadow CSS: .avatar-image / outline - Dodajemo helper outline za avatar sliku.

71. Shadow CSS: .avatar-image / position - Relative pravi stacking kontekst za absolutni status badge.

72. Shadow CSS: .avatar-image / width - Avatar krug dobija standardnu veličinu.

73. Shadow CSS: .avatar-image / height - Visina odgovara širini — idemo ka krugu.

74. Shadow CSS: .avatar-image / border-radius - Puni radius završava avatar krug.

75. Shadow CSS: .avatar-image / background - Gradijent pozadina koja se vidi iza inicijala.

76. Shadow CSS: .avatar-image / border - Border čita host token.

77. Shadow CSS: .avatar-image / box-shadow - Shadow dolazi iz host contract-a.

78. Shadow CSS: .avatar-image / display - Flex centrira inicijale unutar kruga.

79. Shadow CSS: .avatar-image / align-items - Vertikalno centriranje inicijala.

80. Shadow CSS: .avatar-image / justify-content - Horizontalno centriranje inicijala.

81. Shadow CSS: .avatar-image / overflow - Overflow hidden reže bilo koji sadržaj van kruga.

82. Shadow CSS: .avatar-image / transition - Tranzicija pravi glatki hover lift.

83. Shadow CSS: .avatar-image:hover / transform - Blagi scale na hover daje interaktivni feel.

84. Shadow CSS: .avatar-image:hover / box-shadow - Accent shadow na hover potvrđuje interakciju.

85. Shadow CSS: ::slotted([slot="initials"]) / font-size - Inicijali dobijaju jasnu veličinu unutar kruga.

86. Shadow CSS: ::slotted([slot="initials"]) / font-weight - Jaki bold drži inicijale čitkim.

87. Shadow CSS: ::slotted([slot="initials"]) / color - Beli tekst drži kontrast na gradijent pozadini.

88. Shadow CSS: ::slotted([slot="initials"]) / letter-spacing - Mali tracking poboljšava čitljivost.

89. Shadow CSS: ::slotted([slot="initials"]) / user-select - Inicijali ne treba da budu selektabilni.

90. Shadow CSS: .status-badge / outline - Dodajemo helper outline za status badge.

91. Shadow CSS: .status-badge / position - Absolute ga pozicionira unutar avatar tipa.

92. Shadow CSS: .status-badge / bottom - Pozicioniramo badge u donji desni ugao.

93. Shadow CSS: .status-badge / right - Desno od centra, standardna pozicija status badge-a.

94. Shadow CSS: .status-badge / width - Mali kružić.

95. Shadow CSS: .status-badge / height - Visina odgovara širini.

96. Shadow CSS: .status-badge / border-radius - Puni radius završava status krug.

97. Shadow CSS: .status-badge / background - Boja čita host status token — nikad hardkodovana iznutra.

98. Shadow CSS: .status-badge / border - Border odvaja badge od pozadine avatara.

99. Shadow CSS: .status-badge / transition - Tranzicija pravi glatku promenu statusa.

100. Shadow CSS: .avatar-info / outline - Dodajemo helper outline za info zonu.

101. Shadow CSS: .avatar-info / display - Flex pravi vertikalni stack tekstova.

102. Shadow CSS: .avatar-info / flex-direction - Kolona slaže username iznad role-a.

103. Shadow CSS: .avatar-info / align-items - Centriramo oba teksta ispod avatara.

104. Shadow CSS: .avatar-info / gap - Minimal gap drži tekstove fokusiranim.

105. Shadow CSS: .username / font-size - Solidna veličina za primarnu labelu.

106. Shadow CSS: .username / font-weight - Bold drži username kao primarni signal.

107. Shadow CSS: .username / color - Čita text token.

108. Shadow CSS: .username / white-space - Username ostaje na jednoj liniji.

109. Shadow CSS: .role / font-size - Manji font čini role sekundarnim signals.

110. Shadow CSS: .role / font-weight - Medium weight drži role čitkim ali podređenim.

111. Shadow CSS: .role / color - Muted token daje sekundarni signal.

112. Shadow CSS: .role / text-transform - Uppercase zatvara role kao kategorijsku labelu.

113. Shadow CSS: .role / letter-spacing - Tracking čini role urednom.

114. Shadow CSS: .role / white-space - Role ostaje na jednoj liniji.

115. Shadow CSS: .tooltip / outline - Dodajemo helper outline za tooltip.

116. Shadow CSS: .tooltip / position - Absolute ga odvaja od normalnog toka.

117. Shadow CSS: .tooltip / bottom - Tooltip se pojavljuje iznad avatara.

118. Shadow CSS: .tooltip / left - Levim rubom krenemo od centra.

119. Shadow CSS: .tooltip / transform - Negativan translate centrira tooltip.

120. Shadow CSS: .tooltip / background - Très tamna pozadina drži tooltip čitkim.

121. Shadow CSS: .tooltip / border - Border tok čita host token.

122. Shadow CSS: .tooltip / color - Text čita host token.

123. Shadow CSS: .tooltip / padding - Padding daje tooltip-u pravi footprint.

124. Shadow CSS: .tooltip / border-radius - Zaobljenje drži tooltip modernim.

125. Shadow CSS: .tooltip / font-size - Manji font za tooltip tip.

126. Shadow CSS: .tooltip / white-space - Tooltip ostaje u jednom redu.

127. Shadow CSS: .tooltip / pointer-events - Tooltip ne blokirа klik na avatar.

128. Shadow CSS: .tooltip / opacity - Tooltip startu nevidljiv.

129. Shadow CSS: .tooltip / transition - Tranzicija pravi glatko prikazivanje.

130. Shadow CSS: .tooltip / z-index - Z-index drži tooltip iznad ostatka DOM-a.

131. Shadow CSS: :host(:hover) .tooltip, :host(:focus-within) .tooltip / opacity - Na hover tooltip postaje vidljiv.

132. Shadow CSS: :host(:hover) .tooltip, :host(:focus-within) .tooltip / transform - Mali lift daje tooltip-u dinamičan ulaz.

133. Shadow CSS: :host(:focus-visible) / outline - Focus-visible dodaje tastaturski focus ring.

134. Shadow CSS: :host(:focus-visible) / outline-offset - Offset drži ring dalje od ivice.

135. Shadow CSS: :host(:focus-visible) / border-radius - Radius čini focus ring kružnim uz avatar.

136. Rezime: .avatar-container - Uklanjamo container helper outline.

137. Rezime: .avatar-image - Uklanjamo image helper outline.

138. Rezime: .status-badge - Uklanjamo status badge helper outline.

139. Rezime: .avatar-info - Uklanjamo info zone helper outline.

140. Rezime: .tooltip - Uklanjamo tooltip helper outline.

141. Rezime: ui-user-avatar host - Uklanjamo host helper outline.

142. Rezime: .app-shell - Uklanjamo shell helper outline. Vizuelni widget je sada kompletan i ovo je prvi trenutak kada kažemo: ovo je ono što želimo.

143. JS: connectedCallback zakačuje evente - Tek na kraju, kad su reference spremne, zakačujemo event listenere.

144. JS: disconnectedCallback cleanup - Na izlazu iz DOM-a skidamo event listener.

145. JS: precizan attributeChangedCallback - Potpis prima `name`, `oldValue` i `newValue` — tri argumenta su tačan Web Components API.

146. JS: guard za iste vrednosti i disconnected stanje - Odmah izlazimo ako se vrednost nije promenila ili widget još nije u živom DOM-u.

147. JS: switch — menjamo samo ono što se promenilo - Switch poziva `updateUsername()`, `updateRole()` ili `updateStatus()` zavisno od atributa koji se promenio.

148. JS: username getter - Property getter vraća normalizovani username sa fallback-om.

149. JS: username setter - Setter piše nazad u atribut — source of truth ostaje na atributu.

150. JS: role getter - Getter vraća normalizovanu role vrednost.

151. JS: role setter - Setter piše normalizovanu role nazad u atribut.

152. JS: status getter - Getter vraća normalizovani status sa fallback-om na `offline`.

153. JS: status setter - Setter normalizuje status pre upisa — nevalidni ulaz se pretvara u `offline`.

154. JS: profileUrl getter - Getter vraća `profile-url` atribut bez normalizacije — URL je otvoren string.

155. JS: bindEvents() - Event wiring ostaje u sopstvenoj responsibility metodi.

156. JS: bindEvents štiti od duplog binding-a - Flag `isClickBound` sprečava dvostruko kačenje listenera. Postavljamo i `tabindex` i `role` atribute za accessibility.

157. JS: unbindEvents() - Cleanup metoda postoji za svaki bind scenario.

158. JS: unbindEvents skida listener samo kada postoji - Guard sprečava grešku pri pokušaju skidanja listenera koji nije zakačen.

159. JS: handleAvatarClick() - Klik handler emituje namespaced event sa punim payload-om.

160. JS: ui-user-avatar:profile-open event - Emitujemo `ui-user-avatar:profile-open` sa `bubbles`, `composed`, `cancelable` i stabilnim `detail`-om: username, role, status, profileUrl, source.

161. Done: UI User Avatar Dashboard Widget - `ui-user-avatar` je završen: `index.html` deklarativno koristi atribute i slotove, `ui-user-avatar.template.js` drži shadow strukturu, `ui-user-avatar.js` vodi property API, lifecycle i namespaced event contract, `style.css` theme-uje host i variants, a `ui-user-avatar.shadow.css` drži unutrašnji styling widgeta.

## Homework

- Dodaj `<img>` podršku u `initials` slot — komponenta treba da sakrije inicijale kada postoji slika.

- Implementiraj drag-to-reorder na grid od više `ui-user-avatar` widget-a uz `draggable="true"` i `dragover`/`drop` event contract.

- Dodaj context menu event: `ui-user-avatar:context-menu` koji se emituje na desni klik sa `{username, role, status, x, y}` payload-om.

- Dodaj `size` atribut sa varijantama `sm`, `md`, `lg` koji menja dimenzije avatara kroz host CSS tokenе.
