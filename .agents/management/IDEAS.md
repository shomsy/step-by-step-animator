# IDEAS

Raw opportunities and potential initiatives.

## Rules

- capture user value first
- keep entries short and concrete
- promote selected items to `.agents/management/TODO.md`

## Current Items

1. `[idea] 2026-03-28 17:21 CET - SQLite-backed SCRUD authoring UI za lesson sadržaj`
   - user value: autor moze da kreira, cita, menja i brise lekcije kroz namenski interfejs, bez rucnog editovanja source fajlova.
   - what it would feel like: block-based lesson editor sa DSL-aware blokovima, draftovima, verzijama i SQLite storage slojem ispod authoring UI-ja.
   - main tradeoff: uvodi persistence, schema migracije i authoring backend odgovornost, ali uklanja rucni filesystem workflow kao uslov za rad.
   - open question: da li SQLite ostaje samo lokalni authoring store ili postaje canonical draft/publish store iz kog se generise `lesson.script.md`.
   - implemented: `.agents/management/evidence/CHANGELOG.md`
1. `[idea] 2026-03-28 17:18 CET - Sve shipped lekcije migrirati na lesson.script.md DSL`
   - user value: autor vise ne skace izmedju `lesson.md`, `scenes.md` i `artifacts/`, nego svaku lekciju cita i menja kao jedan tok.
   - what it would feel like: svaka lekcija u `product/education/lessons/*/source/` ima jedan citljiv `lesson.script.md` fajl kao canonical source.
   - main tradeoff: migracija mora da sacuva isti step/scene runtime rezultat i ne sme da ostavi dupli source of truth.
   - open question: da li migraciju radimo u jednom velikom talasu ili u kontrolisanim lesson wave-ovima sa parity proverom posle svake grupe.
   - implemented: `.agents/management/evidence/CHANGELOG.md`
1. `[idea] 2026-03-28 16:29 CET - Jedan veliki markdown po lekciji sa sekcijama Step/Narration/Kod`
   - user value: autor vidi celu lekciju kao jednu priču i lakše povezuje uvod, teoriju, HTML, CSS i JS bez skakanja kroz delove.
   - what it would feel like: jedan dugačak human-written `.md` fajl sa `Step` blokovima, više `narration` sekcija po koraku i eksplicitnim blokovima za prikaz koda.
   - proposed writing shape:
     - `* Step 1.`
     - `## narration: Intro lekcije`
     - `# prikazi kod:`
     - `css:`
     - `html:`
     - `js:`
     - zatim ponavljanje `## narration:` i `# prikazi kod:` koliko god puta treba unutar istog koraka.
   - main tradeoff: parser i editor postaju složeniji, ali authoring i preglednost bi bili mnogo jednostavniji.
   - open question: da li je to samo authoring format, ili treba da postane i canonical source format za lesson engine.
2. `[idea] 2026-03-28 16:29 CET - UI za pisanje lekcija sa dropdown oznakama i rich editorom`
   - user value: autor bira namernu oznaku dela lekcije iz dropdown-a, pa odmah kuca ili uređuje sadržaj bez ručnog seckanja fajlova.
   - what it would feel like: blokovi kao `Step`, `narration`, `prikazi kod`, `css/html/js`, sa modernim editorom za text i code-like sadržaj.
   - main tradeoff: veći UI i model složenosti, ali bolji flow za authoring, pregled i kasnije refactorovanje lekcija.
   - open question: da li editor treba da bude block-based form, WYSIWYG, ili hybrid koji spaja oba.
   - implemented: `.agents/management/evidence/CHANGELOG.md`
3. `[idea] 2026-03-28 16:34 CET - SQLite kao storage za lekcije, draftove i verzije`
   - user value: UI editor dobija stabilnu bazu za čuvanje lekcija, blokova, draftova, publish snapshot-a i istorije izmena.
   - what it would feel like: lesson tree, step blokovi i metadata žive u SQLite-u, a Markdown postaje export/import format ili pregledni output.
   - main tradeoff: jača struktura i verzionisanje, ali i veća arhitektonska odgovornost oko schema migracija i sync-a sa fajlovima.
   - open question: da li SQLite treba da bude canonical source of truth ili samo radni sloj ispod human-written Markdown-a.
   - implemented: `.agents/management/evidence/CHANGELOG.md`
4. `[idea] 2026-03-28 16:34 CET - Human-first authoring DSL kao glavni način pisanja lekcija`
   - user value: autor piše lekcije lako i intuitivno, bez razmišljanja o engine strukturi, i vidi odmah šta je step, narration i code block.
   - what it would feel like: namenski DSL pisan za čoveka, sa jasnim markerima i čitljivim blokovima koji se kasnije kompajliraju u runtime model.
   - main tradeoff: mora da postoji dobar parser i validacija, ali pisanje ostaje jednostavno i stabilno.
   - core principle: engine je servis DSL-u, ne obrnuto.
   - implemented: `.agents/management/evidence/CHANGELOG.md`

## Legacy Reference

See older capture lanes:

- `.agents/management/backlog/BACKLOG.md`
- `.agents/management/planning/PLAN.md`
