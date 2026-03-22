# TODO

Ovaj fajl je kanonska lista za arhitekturu i cleanup ovog repoa.

## Status pravila

- `DONE`: stavka je završena i više nema otvorenog rada.
- `OPEN`: stavka je poznata i može da se reši u ovom repou.
- `BLOCKED`: stavka trenutno ne može da se zatvori; obavezno napiši šta fali da bi bila rešena.

Svaka stavka mora da ima:

1. `Status`
2. `Šta fali`
3. `Napomena`

## Final Architecture Tightening

### 1. Zadrži jedan kanonski feature entry

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Glavni tok ostaje u `teach-components/build-sidebar/build-sidebar.pipeline.js` i nema konkurentske monolitne implementacije.

### 2. Drži repo u flow-first shape-u

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Tree sada čita feature kroz glavni numerisani lesson journey `01-start-lesson`, `02-follow-lesson`, `03-watch-code`, `04-watch-sidebar`, `05-check-understanding`, `06-download-sidebar-files`, dok `find-step`, `save-step` i `choose-theme` ostaju nenumerisani pomoćni tokovi.

### 3. Očisti preostale stare nazive iz dokumentacije

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: `ARCHITECTURE.md` više ne koristi stare repo-specifične loše primere, nego neutralne anti-pattern primere.

### 4. Zaključaj jednu konačnu odluku o numerisanju flow foldera

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Konačna odluka je da samo glavni lesson journey koristi numerisane flow foldere, dok pomoćni tokovi ostaju bez brojeva.

### 5. Prođi poslednji vocabulary audit za “show / present / build / watch”

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: `ARCHITECTURE.md` sada eksplicitno zaključava značenje glagola: `build` za derivaciju, `show` za upis u postojeće page parts, `present` za interaktivne tokove, `create` za inicijalizaciju, `find` za lociranje page parts.

### 6. Zategni interni naziv za prikaz trenutne lekcije

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Helper je preimenovan u `showCurrentLesson`, pa više ne nosi nepotreban `state` vokabular.

## Responsibility Checks

### 7. Sačuvaj male fajlove samo tamo gde nose jednu jasnu odgovornost

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Bookmark storage/list output i knowledge-check prikaz su već razdvojeni na jasne responsibility file-ove.

### 8. Proveri da li `present-step-finder.js` i dalje nosi samo jednu odgovornost

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Fajl i dalje nosi jednu koherentnu odgovornost: kompletan user flow za pronalazak koraka. Unutrašnji helper je dodatno pojašnjen u `showMatchingStepResults`.

### 9. Proveri da li `present-knowledge-check.js` i dalje nosi samo jednu odgovornost

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Fajl i dalje nosi jednu koherentnu odgovornost: kompletan knowledge-check flow. Pitanje i rezultat ostaju izdvojeni u svoje file-ove, a interni helper je pojašnjen u `showCurrentKnowledgeCheckStep`.

## Verification

### 10. Proveri da nema starih import path-ova

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Poslednji import fix pass je već urađen nakon rename-a.

### 11. Proveri da build i syntax check prolaze

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: `node --check` i `npm run build` su ponovo prošli posle numerisanog lesson journey pass-a.

### 12. Osveži repo merge dump posle svakog većeg rename/split pass-a

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: `./merge-files.sh .` treba pokrenuti posle svakog većeg rename/doc pass-a; biće osvežen i za numerisani lesson journey pass.

## Kako da se ovaj TODO ažurira

- Kada se stavka završi, promeni `Status` u `DONE` i stavi `Šta fali: ništa`.
- Kada stavka ne može da se završi, promeni `Status` u `BLOCKED` i napiši tačno koji input, odluka ili tehnički uslov nedostaje.
- Ne zatvaraj stavku samo zato što ime “zvuči dovoljno dobro”; zatvori je tek kada tree, file i function ime stvarno predviđaju sadržaj bez otvaranja fajla.
