# TODO

Ovaj fajl je kanonska lista za arhitekturu i sledeće veće korake ovog repoa.

## Status pravila

- `DONE`: stavka je završena
- `OPEN`: stavka je poznata i spremna za sledeći pass
- `BLOCKED`: stavka trenutno ne može da se zatvori; napiši šta fali

## Engine Cleanup

### 1. Pretvori repo u generičan lesson engine

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Generičan shell i runtime sada žive u `teach-lessons/teach-lesson/`, a `build-sidebar` je sveden na lesson contract.

### 2. Zadrži jedan kanonski engine entry

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Glavni tok ostaje u `teach-lessons/teach-lesson/teach-lesson.pipeline.js` i nema konkurentske monolitne implementacije.

### 3. Premesti concrete lesson sadržaj van shell-a

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Step script, HTML builder, CSS builder i quiz pitanja sada žive u `teach-lessons/build-sidebar/`.

### 4. Uvedi jasan lesson contract za buduće lekcije

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Svaka nova lekcija treba da doda root `feature-name.lesson.js` i da se registruje u `teach-lessons/list-lessons.js`.

## Follow-Up Work

### 5. Dodaj drugu lekciju da potvrdi engine shape

- `Status`: `OPEN`
- `Šta fali`: nova lesson slice sa svojim `describe-steps.js`, HTML/CSS builderima i pitanjima
- `Napomena`: Najlogičniji sledeći kandidat je `build-top-navigation`.

### 6. Dodaj lesson picker u shell

- `Status`: `OPEN`
- `Šta fali`: UI za izbor lekcije i mali flow za promenu query parametra
- `Napomena`: Trenutno izbor lekcije radi preko `?lesson=...`, što je dovoljno za engine start.

## Verification

### 7. Drži build i syntax check zelenim

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Posle svake veće izmene pokrenuti `find teach-lessons -name '*.js' -print0 | xargs -0 -n1 node --check && node --check main.js`, zatim `npm run build`.

### 8. Osveži merge dump posle svakog većeg pass-a

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: `./merge-files.sh .` ostaje obavezni završni korak posle većih rename, split ili doc pass-ova.
