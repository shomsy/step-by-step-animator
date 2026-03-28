export function createLessonScriptFixture() {
  return {
    scriptMarkdown: `---
schemaVersion: 1
lessonId: 09-human-first-script-demo
lessonTitle: Human-First Script Demo
lessonIntro: Build a tiny callout card from one lesson script.
status: active
courseId: step-by-step-animator
order: 9
artifacts:
  - artifactId: html
    language: html
    label: index.html
    isPrimary: true
  - artifactId: css
    language: css
    label: style.css
    isPrimary: false
preview:
  type: dom
  title: Human-first script preview
  address: browser://09-human-first-script-demo-preview
---
# Step: empty-shell
title: Start: Empty App Shell
summary: Open with a neutral app shell.
intent: Start from the smallest visible surface.
tag: html:app-shell
proTip: The first frame should make later changes obvious.
focusHtmlNeedles:
  - <div class="app-shell">

## Scene: empty-shell-scene

### Narration
We start with a neutral app shell so every later change is easy to notice.

### Show Code: html
\`\`\`html
<div class="app-shell"></div>
\`\`\`

# Step: add-card-html
title: HTML: Add the Callout Card
summary: Insert the visible card shell into the app shell.
intent: Show the semantic structure before styling it.
tag: html:callout-card
proTip: Keep the first markup version small and honest.
focusHtmlNeedles:
  - class="callout-card"

## Scene: add-card-html-scene

### Narration
Now we add the card shell so the preview has a real target to style.

### Show Code: html
\`\`\`html
<div class="app-shell">
  <aside class="callout-card">
    <strong>Ship the DSL</strong>
    <p>One lesson script should stay readable from top to bottom.</p>
  </aside>
</div>
\`\`\`

# Step: style-app-shell
title: CSS: Center the App Shell
summary: Add the layout styles that frame the card.
intent: Separate scene framing from card styling.
tag: css:app-shell
proTip: Establish the preview stage before polishing the component.
focusHtmlNeedles:
  - <div class="app-shell">

## Scene: style-app-shell-scene

### Narration
Before styling the card itself, we center the stage so the lesson stays focused.

### Show Code: css
\`\`\`css
.app-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f5f7fb;
}
\`\`\`

# Step: style-callout-card
title: CSS: Style the Callout Card
summary: Add the visual identity for the callout card.
intent: Finish the card with spacing, color, and contrast.
tag: css:callout-card
proTip: Apply only the styles you can explain in one breath.
focusHtmlNeedles:
  - class="callout-card"

## Scene: style-callout-card-scene

### Narration
Now the card gets its own visual identity without changing the HTML structure again.

### Show Code: css
\`\`\`css
.app-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f5f7fb;
}

.callout-card {
  width: 320px;
  padding: 20px;
  border-radius: 20px;
  background: #0f172a;
  color: white;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.22);
}

.callout-card p {
  margin: 10px 0 0;
  color: #cbd5e1;
}
\`\`\`
`
  };
}
