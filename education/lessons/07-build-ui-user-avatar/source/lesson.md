---
schemaVersion: 1
lessonId: 07-build-ui-user-avatar
lessonTitle: 07 · UI User Avatar — Dashboard Widget
lessonIntro: Gradimo `ui-user-avatar` — enterprise dashboard widget koji
  prikazuje team member kartice sa status badge-om (online/idle/away/offline),
  tooltip-om, slotovima za inicijale ili sliku i klik interakcijom ka profile
  modal-u.
status: active
courseId: step-by-step-animator
order: 7
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
    label: ui-user-avatar.js
    isPrimary: false
  - artifactId: template-js
    file: ./artifacts/template-js.timeline.md
    language: js
    kind: timeline
    label: ui-user-avatar.template.js
    isPrimary: false
  - artifactId: shadow-css
    file: ./artifacts/shadow-dom-style.css.md
    language: css
    kind: rules
    label: ui-user-avatar.shadow.css
    isPrimary: false
preview:
  type: dom
  title: Live Dashboard Avatar Widget Preview
  address: browser://07-build-ui-user-avatar-preview
ideMode: true
goal:
  title: "Cilj: UI User Avatar Widget"
  imageSrc: ./assets/web-component-goal.svg
  imageAlt: Referentna slika ui-user-avatar dashboard widgeta sa status badge-om,
    tooltip-om i inizialima.
  imageCaption: U ovoj lekciji gradimo enterprise team member card sa
    deklarativnim status API-jem i namespaced event contract-om.
homework:
  enabled: true
  title: Varijante za samostalnu vežbu
  items:
    - Dodaj `<img>` podršku u `initials` slot — komponenta treba da sakrije
      inicijale kada postoji slika.
    - Implementiraj drag-to-reorder na grid od više `ui-user-avatar` widget-a uz
      `draggable="true"` i `dragover`/`drop` event contract.
    - "Dodaj context menu event: `ui-user-avatar:context-menu` koji se emituje
      na desni klik sa `{username, role, status, x, y}` payload-om."
    - Dodaj `size` atribut sa varijantama `sm`, `md`, `lg` koji menja dimenzije
      avatara kroz host CSS tokenе.
---

Gradimo `ui-user-avatar` — enterprise dashboard widget koji prikazuje team member kartice sa status badge-om (online/idle/away/offline), tooltip-om, slotovima za inicijale ili sliku i klik interakcijom ka profile modal-u.
