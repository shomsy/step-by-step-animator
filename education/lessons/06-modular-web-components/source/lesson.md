---
schemaVersion: 1
lessonId: 06-modular-web-components
lessonTitle: 06 · Modular Web Components (IDE View)
lessonIntro: Ova lekcija demonstrira novi IDE mode playera. Umesto da svi
  fajlovi budu vidljivi odjednom, koristimo stvarni file browser i automatsko
  prebacivanje fokusa na fajl koji se trenutno menja.
status: active
courseId: step-by-step-animator
order: 6
theory:
  enabled: false
scenes:
  file: ./scenes.md
artifacts:
  - artifactId: html
    file: ./artifacts/html.timeline.md
    language: html
    kind: timeline
    label: index.html
    isPrimary: true
  - artifactId: css
    file: ./artifacts/css.rules.md
    language: css
    kind: rules
    label: style.css
    isPrimary: false
  - artifactId: js
    file: ./artifacts/js.timeline.md
    language: js
    kind: timeline
    label: my-first-component.js
    isPrimary: false
  - artifactId: shadow-css
    file: ./artifacts/shadow-dom-style.css.md
    language: css
    kind: rules
    label: shadow-dom-style.css
    isPrimary: false
preview:
  type: dom
  title: IDE View Web Components Preview
  address: browser://06-modular-web-components-preview
ideMode: true
goal:
  title: "Cilj: IDE Iskustvo"
  imageSrc: ./assets/web-component-goal.svg
  imageAlt: Referentna slika IDE view-a.
  imageCaption: U ovoj lekciji testiramo IDE layout sa fajlovima na desnoj strani.
---

Ova lekcija demonstrira novi IDE mode playera. Umesto da svi fajlovi budu vidljivi odjednom, koristimo stvarni file browser i automatsko prebacivanje fokusa na fajl koji se trenutno menja.
