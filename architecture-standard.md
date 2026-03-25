# Universal Architecture Standard

## Svrha

Ovaj dokument definiše pragmatična arhitektonska pravila za organizaciju koda, foldera, fajlova i funkcija tako da repo bude prediktivan, čitljiv i održiv u bilo kom jeziku, framework-u ili projektu.

Cilj nije da arhitektura izgleda pametno.
Cilj je da bude banalno jasna, stabilna i laka za razvoj kroz vreme.

Najkraće rečeno:

- **folder kaže tok ili capability**
- **file kaže odgovornost**
- **function kaže tačnu akciju**

Repo treba da se čita kao priča sistema, a ne kao skladište tehničkih fioka.

## Opseg

Ovo je reusable baseline standard.

- važi za bilo koji projekat, jezik ili framework
- project-level architecture dokumenti mogu da ga suze i konkretizuju
- project-level dokumenti ne smeju da ga oslabe
- ako je potreban izuzetak, on mora da bude zapisan u repo-specifičnom architecture dokumentu
- ovo nije workflow contract; workflow pripada repo-operativnim dokumentima

---

## Osnovna ideja

Arhitektura se organizuje po sledećem principu:

**flow -> feature slice -> file -> function**

Ali ovo pravilo se primenjuje razumno, ne religiozno.

Tačnija verzija glasi:

- **na nivou proizvoda ili aplikacije:** flow-first
- **na nivou feature-a:** slice-first
- **unutar feature-a:** responsibility-first
- **na nivou funkcija i metoda:** action-first

To znači da spolja vidiš tok sistema, a iznutra jasne odgovornosti.

---

## Tri vrste pravila koje se ne smeju mešati

### 1. Pravila strukture
Kako repo izgleda i kako se čita.

### 2. Pravila dizajna
Kako se dele odgovornosti, zavisnosti, reuse i granice između modula.

### 3. Pravila kvaliteta sistema
Performanse, sigurnost, skaliranje, observability, interoperabilnost, cache, troškovi i slično.

Ovo mora biti razdvojeno.

Na primer:

- SOLID, DRY, KISS, YAGNI su pravila dizajna
- OWASP, auth, encryption, rate limiting, cache, CAP, consistency patterns su kvalitet i tehnički zahtevi
- folder struktura je zasebna disciplina

Ako se sve pomeša u jedno pravilo, dokument postaje preširok i prestaje da vodi.

---

## Glavna arhitektonska pravila

### 1. Top-level struktura treba da viče šta sistem radi
Ne organizovati repo po tehničkim slojevima kao podrazumevano pravilo.

Dobar smer:

```text
product/
system/
foundation/
```

ili:

```text
create/
configure/
run/
deploy/
inspect/
```

Lošiji smer kao default:

```text
controllers/
services/
models/
utils/
helpers/
```

Ovo drugo govori kako je sistem tehnički iseckan.
Prvo govori šta sistem radi.

---

### 2. Svaki feature slice mora da ima jednog vlasnika toka u root-u
U root-u svakog feature slice-a mora da postoji jedan glavni ulaz koji zaokružuje celu celinu.

To može biti:

- `*.pipeline` kada je tok sekvencijalan
- `*.facade` kada feature nudi jednostavan ulaz u složenu unutrašnjost
- `*.orchestrator` kada koordinira više tokova, grana ili događaja
- banalno glavno ime, ako je to čitljivije od pattern naziva

Poenta nije da se pattern koristi radi pattern-a.
Poenta je da postoji jedno mesto koje jasno kaže:

**odavde počinje ovaj feature**

---

### 3. Podfolder postoji samo ako predstavlja stvarni korak ili stvarni podfeature
Podfolder se ne uvodi da bi arhitektura delovala ozbiljno.

Podfolder postoji samo kada:

- predstavlja stvarni korak u toku
- predstavlja stvarni pod-capability
- zaista smanjuje mentalni šum

Dobar primer:

```text
deploy/
  prepare/
  validate/
  release/
```

Loš primer:

```text
deploy/
  services/
  helpers/
  managers/
```

Ako dodatni folder ne pomaže čitanju, ne treba da postoji.

---

### 4. Svaki file nosi jednu odgovornost
File ne treba da bude tematska kanta.
Treba da nosi jednu jasnu odgovornost.

Dobro:

- `read_release_request`
- `build_release_bundle`
- `verify_runtime_checksum`
- `publish_release_proof`

Lošije:

- `deploy_utils`
- `release_manager`
- `misc_helpers`

Ako ime fajla ne objašnjava zašto postoji, ime je loše ili je file preširok.

---

### 5. Svaka function radi jednu tačnu akciju
Function ili method moraju da imaju glagolsko ime koje govori tačno šta rade.

Dobro:

- `readRequestedProfile`
- `planDatabaseChanges`
- `writeRuntimeManifest`
- `verifyReleaseChecksum`

Lošije:

- `handle`
- `process`
- `execute`
- `doWork`

Generična imena su dozvoljena samo kada je kontekst ekstremno jasan.

---

### 6. Shared je poslednja opcija, ne prva
Najveći neprijatelj ove arhitekture je rano izvlačenje svega u:

```text
shared/
common/
utils/
helpers/
misc/
```

Takva mesta skoro uvek postanu tehnički otpad.

Zajednički kod sme da postoji samo kada je:

- stabilan
- generički
- bez product značenja
- dosadan, ali koristan svima

Dobar kandidati za to su:

- checksum
- filesystem primitives
- retry policy
- clock
- logging primitives
- process execution
- id generation

Ako nešto i dalje nosi product značenje, ne spada u shared.

---

### 7. Root feature mora da bude mali i čitljiv
Kada se otvori root feature folder, odmah mora da bude jasno:

- koji je glavni ulaz
- koji su glavni koraci
- gde ideš dalje

Root feature ne sme da izgleda kao registry haos sa gomilom nepovezanih fajlova.

---

### 8. Pattern se bira po prirodi toka, ne po modi
Pattern nije cilj. Jasnoća je cilj.

Koristi:

#### `pipeline`
Kada postoji jasan sled koraka:

- A pa B pa C
- jedan korak hrani sledeći
- failure flow je uglavnom sekvencijalan

#### `facade`
Kada feature nije jedan tok nego jedan stabilan javni ulaz u više unutrašnjih stvari.

#### `orchestrator`
Kada postoji koordinacija više grana, događaja, paralelnih tokova ili više podflow-ova.

#### banalno glavno ime
Kada je feature mali i jednostavniji naziv je bolji od pattern naziva.

Ako pattern pravi više šuma nego koristi, ne treba ga koristiti.

---

## Naming konvencija

### Folder
Folder treba da bude capability, korak ili tok.

Primeri:

- `deploy`
- `prepare`
- `validate`
- `release`
- `database`
- `gateway`
- `runtime`

### File
File treba da bude glagol plus predmet odgovornosti.

Primeri:

- `read_release_request`
- `build_release_bundle`
- `verify_bundle_integrity`
- `write_gateway_config`

### Function
Function ili method treba da bude tačna akcija.

Primeri:

- `readReleaseRequest`
- `buildReleaseBundle`
- `verifyBundleIntegrity`
- `writeGatewayConfig`

Izbegavati kad god postoji bolje ime:

- manager
- handler
- processor
- service
- helper
- util

Ova imena često skrivaju da odgovornost nije jasno definisana.

---

## Pravila modularnosti

### 1. Composition over inheritance
Prednost dati kompoziciji i saradnji malih modula.

### 2. Law of Demeter
Modul treba da zna što manje o unutrašnjosti drugih modula.

### 3. Tight coupling je zabranjen
Feature ne sme da zavisi od tuđe unutrašnje implementacije.

### 4. Reuse ne sme biti preuranjen
Prerano deljenje koda često proizvodi loše apstrakcije.

### 5. Abstrakcija mora da smanjuje šum
Ako apstrakcija nije jasnija od konkretnog koda koji menja, loša je.

### 6. Over-engineering je kvar
Svaki dodatni sloj mora da opravda postojanje.

---

## Pravila kvaliteta koja prate arhitekturu

Ova pravila nisu pravila folder strukture, ali moraju da prate svaki feature:

- sigurnost po načelima najmanjeg potrebnog pristupa
- jasno odvojena autentikacija i autorizacija
- zaštita podataka u tranzitu i mirovanju kada je relevantno
- validacija ulaza i saniranje izlaza
- observability: logovi, metrike, tragovi, dijagnostika
- performanse: razuman balans latencije i throughput-a
- cache samo gde rešava realan problem
- rate limiting gde postoji spoljašnji ili skup resurs
- checksum, integritet i reproducibilnost gde imaju smisla
- cost efficiency i operativna jednostavnost
- interoperabilnost i evolutivnost interfejsa

Poenta je sledeća:

**kvalitet mora da živi unutar feature-a, ali ne mora da određuje njegov naziv foldera**

---

## Kada pravilo ne sme da se forsira

Ovaj standard je opšti. Ne sme se primenjivati slepo kada radi protiv jezika, ekosistema ili framework-a.

### Opšte pravilo izuzetka
Ako je ekosistem veoma idiomatičan i ima jake konvencije koje olakšavaju čitanje, debuggovanje, tool support i onboarding, te konvencije imaju prednost nad nasilnim preimenovanjem svega.

Drugim rečima:

**ne kršiti idiome jezika samo da bi arhitektonska doktrina izgledala dosledno**

---

## Jezički i ekosistemski izuzeci

### Go
Go voli male pakete, kratka imena i jaku vezu između package granice i odgovornosti.

Pravila:

- ne praviti duboku hijerarhiju bez potrebe
- package ime treba da ostane kratko i idiomatično
- ne forsirati sufikse kao `.pipeline.go` ako ruše idiom i otežavaju package čitanje
- ako je `deploy_pipeline.go` čitljivo u timu, koristi ga
- ako idiomatičnije rešenje glasi `deploy.go` unutar paketa `deploy`, prednost ima čitljivost u Go svetu

**Za Go je package granica važnija od preterano opisnog imena fajla.**

---

### Java i C#
Ovi ekosistemi vole jasan namespace, tipove i često jaču vezu između klase i fajla.

Pravila:

- ne lomiti idiom jedan glavni tip po fajlu kada je to standard projekta
- feature slice može da živi kroz package ili namespace granice
- root feature vlasnik može biti klasa tipa `DeployPipeline`, `DeployFacade` ili `DeployOrchestrator`
- ne pokušavati da sve izgleda kao script-like file struktura ako ekosistem prirodno vodi ka tipovima

**Za Java i C# feature se često prirodnije organizuje kroz package i tip, ne samo kroz file naziv.**

---

### Python
Python voli čitljive module, pakete i često jednostavniju hijerarhiju.

Pravila:

- ne praviti nepotrebno duboke pakete
- koristiti module sa jasnim imenima i male package celine
- ne uvoditi apstraktne slojeve samo da bi struktura delovala enterprise
- ako `deploy_pipeline.py` pomaže, koristi ga
- ako je jednostavnije `deploy.py` u `deploy/` paketu, to je validno

**U Python-u je važnije da import path ostane prirodan nego da naziv svakog fajla nosi maksimalnu količinu reči.**

---

### Rust
Rust snažno vezuje strukturu za module, crate granice i eksplicitnost.

Pravila:

- poštovati idiome `mod`, `lib`, `main`, `crate` granica
- ne praviti strukturu koja se bori protiv module system-a
- feature slice može da bude crate, modul ili podmodul, zavisno od težine feature-a
- koristiti odgovorne module pre nego folder dubinu radi folder dubine

**U Rust-u je granica modula često važnija od priče koju priča sam folder.**

---

### JavaScript i TypeScript
Ovi ekosistemi lako odu u haos bez dobre strukture, pa ovaj standard ovde često radi veoma dobro.

Pravila:

- feature-first struktura je uglavnom dobar izbor
- izbegavati rano `utils`, `helpers`, `services` kao kante
- za UI i Web Components držati jasne granice između shell, state, view, events i effects
- za framework projekte poštovati i lokalne idiome ako donose tooling korist

**U JS/TS svetu ovaj standard je često najprirodniji, ali ne treba praviti dubinu koja povećava skakanje kroz fajlove.**

---

### Ruby, Elixir, Phoenix, Rails i slični opinionated framework-i
Ovi ekosistemi često dolaze sa jakim conventions-over-configuration pravilima.

Pravila:

- ne lomiti framework očekivanja bez jakog razloga
- feature slice uvoditi tamo gde ne ubija framework ergonomiju
- ako framework snažno očekuje određena mesta za controller, view, model, job ili channel, poštovati ih
- screaming architecture se može uvoditi kroz module, namespace-e i feature grupe, ne nužno kroz potpuno rušenje framework rasporeda

**Kad framework ima jake operativne konvencije, prvo sačuvati produktivnost tima, pa tek onda uvoditi sopstvenu doktrinu.**

---

### Frontend UI projekti i component sistemi
Kod UI sistema i design system-a ne treba silom praviti poslovni flow gde prirodno postoji component capability.

Pravila:

- feature folder može biti component ili capability
- unutar komponente pratiti realne granice: shell, state, render, events, effects
- ne praviti mikro-foldere ako jedna komponenta to ne zaslužuje
- root component file mora jasno da kaže gde počinje komponenta

**Kod komponenti je bolje: feature spolja, odgovornost iznutra.**

---

## Kako izgleda zdrava odluka

### Dobar obrazac razmišljanja

- Da li ovaj top-level folder priča priču sistema?
- Da li ovaj feature ima jednog vlasnika toka?
- Da li je ovaj podfolder stvarni korak ili stvarni podfeature?
- Da li ovaj file nosi jednu jasnu odgovornost?
- Da li function radi jednu tačnu akciju?
- Da li nova apstrakcija smanjuje mentalni šum?
- Da li kršim idiome jezika ili framework-a bez jakog razloga?

Ako su odgovori jasni, struktura je dobra.

---

## Crvene zastavice

Ako vidiš ovo, arhitektura verovatno truli:

- previše `shared`, `common`, `utils`, `helpers`
- root feature sa previše nepovezanih fajlova
- generična imena kao `manager`, `processor`, `handler`
- podfolderi koji ne predstavljaju stvarne korake
- duboka hijerarhija koja ne smanjuje šum
- pattern izabran zbog mode, ne zbog prirode toka
- feature koji zavisi od unutrašnjosti drugog feature-a
- apstrakcije koje kriju jednostavne stvari umesto da ih pojasne

---

## Sažetak standarda

1. Repo se organizuje po tokovima i capability-jima, ne po tehničkim slojevima kao default-u.
2. Svaki feature slice ima jednog vlasnika toka u root-u.
3. Root feature koristi pipeline, facade, orchestrator ili banalno glavno ime, zavisno od prirode toka.
4. Podfolder postoji samo ako predstavlja stvarni korak ili stvarni podfeature.
5. Svaki file ima jednu odgovornost.
6. Svaka function radi jednu tačnu akciju i nosi glagolsko ime.
7. Shared se izbegava i koristi samo za istinski generičke tehničke primitive.
8. Product ili app sloj priča priču sistema. Tehnički slojevi pričaju priču izvršavanja. Foundation nosi dosadne primitive.
9. Pattern se bira po prirodi toka, ne po modi.
10. Ako dodatni folder, file ili apstrakcija ne smanjuje mentalni šum, ne uvodi se.
11. Idiomi jezika i framework-a imaju prednost kada bi rigidna primena ovog standarda pogoršala čitljivost ili tooling.
12. Krajnji cilj nije složenost. Krajnji cilj je jednostavnost vrhunskog kvaliteta.

---

## Jedna završna rečenica

Dobra arhitektura ne treba da impresionira iz daljine.
Treba da bude toliko jasna da čovek može da otvori repo i odmah zna:

- gde se nalazi
- šta se ovde dešava
- kojim redom stvari teku
- gde treba da ide dalje

To je ceo standard.
