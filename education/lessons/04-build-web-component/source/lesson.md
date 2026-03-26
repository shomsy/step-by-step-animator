---
schemaVersion: 1
lessonId: 04-build-web-component
lessonTitle: 04 · Web Components 2/2 · Shadow DOM my first component
lessonIntro: "Druga Web Components lekcija nadograđuje osnove: isti nivo
  komponente sada gradiš kroz template, shadow DOM, slotove, render lifecycle,
  cleanup i sigurniju registraciju."
status: active
courseId: step-by-step-animator
order: 4
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
  title: Live Web Component preview
  address: browser://04-build-web-component-preview
goal:
  title: Šta gradimo u ovoj lekciji
  imageSrc: ./assets/web-component-goal.svg
  imageAlt: Referentna slika tamnog my first component card Web Component-a na
    svetloj pozadini, sa badge oznakom, velikim naslovom, opisom i CTA dugmetom.
  imageCaption: "Ovo je drugi Web Components korak: host HTML ostaje mali, a prava
    komponenta se sada sklapa iz template-a, shadow DOM-a, slotova i završnog
    production polish sloja."
---

Druga Web Components lekcija nadograđuje osnove: isti nivo komponente sada gradiš kroz template, shadow DOM, slotove, render lifecycle, cleanup i sigurniju registraciju.
