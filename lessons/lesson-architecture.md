# Lesson Architecture

## Purpose

This document defines the canonical architecture for all lesson feature slices in the `lessons/` folder.

---

## Folder Shape

```
lessons/
  01-feature-name/
    feature-name.lesson.js      # root lesson contract
    describe-steps.js           # step descriptions
    build-html-at-step.js       # HTML builder
    build-css-at-step.js        # CSS builder
    build-js-at-step.js         # JS builder (optional)
    build-shadow-css-at-step.js # shadow CSS builder (optional)
    build-template-js-at-step.js # template JS builder (optional)
    content/
      assets/
        feature-goal.svg        # goal image (optional)
      documents/
        files/
          lesson.sr.md          # source of truth for metadata
          html.timeline.md      # HTML teaching flow
          css.rules.md          # CSS rule blocks
          js.timeline.md        # JS teaching flow (optional)
          shadow-dom-style.css.md # shadow CSS (optional)
          template-js.timeline.md # template JS (optional)
        feature-name.md          # generated output
```

---

## Lesson Contract

Every `*.lesson.js` must return:

```javascript
export function lessonContract() {
  return {
    lessonId: 'unique-slug',
    lessonTitle: 'Human readable title',
    lessonIntro: 'Short intro text',
    previewAddress: '/preview-path.html',
    previewTitle: 'Preview tab title',
    htmlFileName: 'index.html',
    cssFileName: 'style.css',
    jsFileName: null,              // optional
    templateJsFileName: null,      // optional
    shadowCssFileName: null,        // optional
    steps: [],                      // from describe-steps.js
    buildHtmlAtStep,
    buildCssAtStep,
    buildJsAtStep,                  // optional
    buildShadowCssAtStep,           // optional
    buildTemplateJsAtStep,           // optional
    goalTitle: null,                // optional
    goalImageSrc: null,             // optional
    goalImageAlt: null,             // optional
    goalImageCaption: null,         // optional
    homeworkTitle: null,            // optional
    homeworkItems: [],              // optional
  };
}
```

---

## Lesson Metadata Source

`lesson.sr.md` is the canonical source for:

- `lessonId` - unique identifier
- `lessonTitle` - title
- `lessonIntro` - intro
- `previewTitle` - preview tab title
- `goal*` - optional goal section
- `homework*` - optional homework section

Format:

```markdown
---
lessonId: 01-build-sidebar
lessonTitle: Build Sidebar
lessonIntro: In this lesson you will build a sidebar from scratch.
previewTitle: Sidebar Preview
goalTitle: What We're Building
goalImageSrc: ./assets/sidebar-goal.svg
goalImageAlt: Sidebar component
goalImageCaption: The sidebar we'll build
homeworkTitle: Homework
homeworkItems:
  - Add hover effects to sidebar items
  - Add nested menu items
---
```

---

## Builder Responsibility

### `build-html-at-step.js`
- Reads `html.timeline.md`
- Parses timeline blocks
- Returns array of lines for given step

### `build-css-at-step.js`
- Reads `css.rules.md`
- Parses rule blocks (property by property)
- Returns array of lines for given step

### `build-js-at-step.js` (optional)
- Reads `js.timeline.md`
- Parses JS timeline blocks
- Returns array of lines for given step

### `build-shadow-css-at-step.js` (optional)
- Reads `shadow-dom-style.css.md`
- Returns shadow DOM stylesheet lines

### `build-template-js-at-step.js` (optional)
- Reads `template-js.timeline.md`
- Returns template JS lines

---

## Timeline Format

### HTML Timeline (`html.timeline.md`)

```markdown
# HTML Timeline

```html
<!-- step:1 -->
<div class="sidebar">
</div>
```

```html
<!-- step:3 -->
<div class="sidebar">
  <nav class="sidebar-nav">
  </nav>
</div>
```
```

### CSS Rules (`css.rules.md`)

```markdown
# CSS Rules

.sidebar {
  /* step:1 */
  width: 250px;

  /* step:4 */
  background: #1a1a1a;
}
```

### JS Timeline (`js.timeline.md`)

```markdown
# JS Timeline

```js
// step:1
class MyElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<p>Hello</p>';
  }
}
```

```js
// step:3
customElements.define('my-element', MyElement);
```
```

---

## Prohibited Patterns

- Don't use `utils`, `helpers`, `shared` folders
- Don't mix content with logic
- Don't create custom builder logic outside defined adapters
- Don't duplicate lesson contract logic

---

## Registration

Every lesson must be registered in `lessons/register-lessons.js`:

```javascript
import { lessonContract as sidebarContract } from './01-build-sidebar/feature-name.lesson.js';

export const registeredLessons = [
  sidebarContract(),
];
```
