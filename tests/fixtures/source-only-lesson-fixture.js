export function createSourceOnlyLessonFixture() {
  return {
    lessonMarkdown: `---
schemaVersion: 1
lessonId: 01-build-sidebar
lessonTitle: Build Sidebar
lessonIntro: Build a sidebar shell step by step.
status: active
courseId: step-by-step-animator
order: 1
theory:
  enabled: true
  file: ./theory.md
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
preview:
  type: dom
  title: Sidebar preview
  address: browser://01-build-sidebar-preview
---
Build a sidebar shell step by step.
`,
    scenesMarkdown: `---
schemaVersion: 1
lessonId: 01-build-sidebar
steps:
  - stepId: add-sidebar-shell
    title: Add sidebar shell
    summary: Introduce the base sidebar container.
    intent: Establish the minimum HTML structure before styling.
  - stepId: add-sidebar-navigation
    title: Add sidebar navigation
    summary: Add a navigation block inside the sidebar.
    intent: Introduce semantic navigation before visual refinement.
---
# Step: add-sidebar-shell

## Scene: intro-shell

narration:
First, we introduce the smallest possible sidebar shell.

focus:
  artifactId: html
  reveal:
    from: 1
    to: 3

code:
  activeArtifactId: html
  highlightLines:
    - from: 1
      to: 3

preview:
  action: apply-state
  target: dom

theory:
  anchor: why-shell-first

## Scene: empty-css-state

narration:
CSS stays empty for now because structure comes before visual identity.

focus:
  artifactId: css
  reveal:
    from: 1
    to: 1

code:
  activeArtifactId: css

preview:
  action: none

# Step: add-sidebar-navigation

## Scene: add-nav-block

narration:
Now we add a navigation block inside the sidebar.

focus:
  artifactId: html
  reveal:
    from: 1
    to: 6

code:
  activeArtifactId: html
  highlightLines:
    - from: 2
      to: 5

preview:
  action: apply-state
  target: dom

theory:
  anchor: sidebar-as-navigation
`,
    theoryMarkdown: `# Why shell first

We start with the smallest possible structure.

## Sidebar as navigation

Navigation comes before visual refinement.
`,
    artifactMarkdownById: {
      html: `\`\`\`json
[
  {
    "target": "root",
    "from": "add-sidebar-shell",
    "lines": [
      "<aside class=\\"sidebar\\">",
      "  <nav>",
      "    <a href=\\"#\\">Home</a>",
      "  </nav>",
      "</aside>"
    ]
  },
  {
    "target": "root",
    "from": "add-sidebar-navigation",
    "lines": [
      "<footer class=\\"sidebar-footer\\">Footer</footer>"
    ]
  }
]
\`\`\`
`,
      css: `\`\`\`json
[
  {
    "header": ".sidebar {",
    "entries": [
      {
        "from": "add-sidebar-shell",
        "line": "display: block;"
      }
    ]
  },
  {
    "header": ".sidebar a {",
    "entries": [
      {
        "from": "add-sidebar-navigation",
        "line": "color: rebeccapurple;"
      }
    ]
  }
]
\`\`\`
`,
    },
  };
}
