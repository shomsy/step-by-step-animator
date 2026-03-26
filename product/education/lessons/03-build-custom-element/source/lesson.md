---
schemaVersion: 1
lessonId: 03-build-custom-element
lessonTitle: 03 · Web Components 1/2 · Light DOM custom element
lessonIntro: Prva Web Components lekcija objašnjava host tag, registraciju,
  atribute i prvi render kroz light DOM, bez shadow DOM sloja.
status: active
courseId: step-by-step-animator
order: 3
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
preview:
  type: dom
  title: Live custom element preview
  address: browser://03-build-custom-element-preview
goal:
  title: Šta gradimo u ovoj lekciji
  imageSrc: ./assets/custom-element-goal.svg
  imageAlt: Referentna slika tamnog callout card custom elementa na svetloj
    pozadini, sa malim badge-om, naslovom, opisom i CTA dugmetom.
  imageCaption: "Ovo je prvi korak Web Components puta: isti problem rešavamo kroz
    light DOM custom element, da bi host, atributi i registracija ostali potpuno
    transparentni."
---

Prva Web Components lekcija objašnjava host tag, registraciju, atribute i prvi render kroz light DOM, bez shadow DOM sloja.
