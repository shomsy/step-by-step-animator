## Question 1
? Koje pravilo mora da poštuje naziv autonomous custom elementa?
- [ ] Mora da počinje velikim slovom
- [x] Mora da sadrži crticu
- [ ] Mora da se završava sa `-component`
- [ ] Mora da bude jedno slovo
! Custom element ime mora da sadrži crticu, npr. `feature-callout`, da bi browser znao da nije standardan HTML tag.

## Question 2
? Šta nam daje `document.createElement('template')` u ovoj lekciji?
- [ ] Automatski CSS reset
- [x] Inertan markup i stil koji možemo da kloniramo u svakoj instanci
- [ ] Novi window objekat
- [ ] Zamenu za `customElements.define`
! `template` čuva inertan sadržaj koji kasnije kloniramo u shadow DOM svake instance komponente.

## Question 3
? Zašto host elementu spolja postavljamo CSS custom properties kao `--callout-accent`?
- [ ] Da bismo izbegli JavaScript potpuno
- [x] Da bismo theme-ovali unutrašnji shadow DOM preko `var(...)`
- [ ] Da bismo izbrisali slot sadržaj
- [ ] Da bismo registrovali novi custom element
! CSS custom properties prelaze kroz shadow DOM granicu i zato su dobar kanal za spoljašnje theme-ovanje komponente.

## Question 4
? Čemu služi `connectedCallback()` u ovoj lekciji?
- [ ] Da zabrani render
- [x] Da pokrene prvi render kada je element povezan sa DOM-om
- [ ] Da kreira template umesto konstruktora
- [ ] Da doda novu HTML stranicu
! `connectedCallback()` je lifecycle tačka u kojoj pokrećemo prvi render, jer je element tada zaista u dokumentu.

## Question 5
? Kada `attributeChangedCallback()` ima smisla?
- [ ] Samo kada komponenta nema shadow DOM
- [ ] Samo kada ne koristimo slotove
- [x] Kada želimo da komponenta reaguje na promene posmatranih atributa i posle prvog mount-a
- [ ] Kada CSS više nije potreban
! Ako komponenta treba da ostane živa i posle inicijalnog rendera, `attributeChangedCallback()` je prirodno mesto da reaguje na promene atributa.
