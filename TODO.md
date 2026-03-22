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
- `Napomena`: Root je sada podeljen na dve jasne celine: `animator/` za tehnički runtime i tooling, i `lessons/` za business lesson slice-ove. `build-sidebar` je sveden na čist lesson contract.

### 2. Zadrži jedan kanonski engine entry

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Glavni player tok ostaje u `animator/play-lesson/play-lesson.pipeline.js` i nema konkurentske monolitne implementacije.

### 3. Premesti concrete lesson sadržaj van shell-a

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Step script, HTML builder i CSS builder sada žive u `lessons/build-sidebar/`.

### 4. Uvedi jasan lesson contract za buduće lekcije

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Svaka nova lekcija treba da doda root `feature-name.lesson.js` i da se registruje u `lessons/register-lessons.js`.

### 4a. Uvedi markdown source za lesson metadata

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: `build-sidebar` sada koristi `content/documents/files/lesson.sr.md`, uz generisani `content/documents/build_sidebar.md`.

## Follow-Up Work

### 5. Dodaj drugu lekciju da potvrdi engine shape

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Dodata je `build-top-navigation` lekcija sa sopstvenim step script-om, builderima, markdown dokumentima i goal slikom.

### 6. Dodaj lesson picker u shell

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Shell sada ima lesson picker koji menja aktivnu lekciju bez ručnog kucanja query parametra.

## Verification

### 7. Drži build i syntax check zelenim

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: Posle svake veće izmene pokrenuti `find animator lessons -name '*.js' -print0 | xargs -0 -n1 node --check && node --check main.js`, zatim `npm run build`.

### 8. Osveži merge dump posle svakog većeg pass-a

- `Status`: `DONE`
- `Šta fali`: ništa
- `Napomena`: `./merge-files.sh .` ostaje obavezni završni korak posle većih rename, split ili doc pass-ova.
