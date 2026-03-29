import { Compartment, EditorState, RangeSetBuilder } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import {
  Decoration,
  EditorView,
  ViewPlugin,
  placeholder as placeholderExtension
} from '@codemirror/view';
import { minimalSetup } from 'codemirror';

function addMark(builder, from, to, className) {
  if (to <= from) {
    return;
  }

  builder.add(from, to, Decoration.mark({ class: className }));
}

function decorateYamlLine(builder, lineFrom, lineText) {
  const fieldMatch = lineText.match(/^(\s*)([a-zA-Z][\w-]*:\s*)(.*)$/);

  if (!fieldMatch) {
    return;
  }

  const keyStart = lineFrom + fieldMatch[1].length;
  const keyEnd = keyStart + fieldMatch[2].length;
  const valueStart = keyEnd;
  const valueEnd = valueStart + fieldMatch[3].length;

  addMark(builder, keyStart, keyEnd, 'authoring-token-key');
  addMark(builder, valueStart, valueEnd, 'authoring-token-value');
}

function decorateHeadingLine(builder, lineFrom, lineText, prefix, valueClassName) {
  const value = lineText.slice(prefix.length);

  addMark(builder, lineFrom, lineFrom + prefix.length, 'authoring-token-heading');
  addMark(builder, lineFrom + prefix.length, lineFrom + prefix.length + value.length, valueClassName);
}

function decorateSectionLine(builder, lineFrom, lineText) {
  const showCodeMatch = lineText.match(/^### Show Code:\s*(.+)$/);

  if (showCodeMatch) {
    addMark(builder, lineFrom, lineFrom + '### Show Code: '.length, 'authoring-token-section-label');
    addMark(builder, lineFrom + '### Show Code: '.length, lineFrom + lineText.length, 'authoring-token-artifact');
    return;
  }

  const sectionMatch = lineText.match(/^###\s+(.+)$/);

  if (!sectionMatch) {
    addMark(builder, lineFrom, lineFrom + lineText.length, 'authoring-token-heading');
    return;
  }

  addMark(builder, lineFrom + 4, lineFrom + lineText.length, 'authoring-token-section-label');
}

function readLineClassName(lineText, insideCodeFence) {
  const trimmedLine = lineText.trim();

  if (/^# Step:\s*/.test(lineText)) {
    return 'authoring-script-line is-step';
  }

  if (/^## Scene:\s*/.test(lineText)) {
    return 'authoring-script-line is-scene';
  }

  if (/^### Show Code:\s*/.test(lineText)) {
    return 'authoring-script-line is-section is-show-code';
  }

  if (/^### Narration\s*$/.test(lineText)) {
    return 'authoring-script-line is-section is-narration';
  }

  if (/^### Preview\s*$/.test(lineText)) {
    return 'authoring-script-line is-section is-preview';
  }

  if (/^### Theory\s*$/.test(lineText)) {
    return 'authoring-script-line is-section is-theory';
  }

  if (/^###\s+/.test(lineText)) {
    return 'authoring-script-line is-section';
  }

  if (/^```/.test(trimmedLine)) {
    return 'authoring-script-line is-code-boundary';
  }

  if (insideCodeFence) {
    return 'authoring-script-line is-code';
  }

  if (/^\s*[a-zA-Z][\w-]*:\s*/.test(lineText)) {
    return 'authoring-script-line is-metadata';
  }

  if (!trimmedLine) {
    return 'authoring-script-line is-blank';
  }

  return 'authoring-script-line';
}

function buildDslDecorations(state) {
  const builder = new RangeSetBuilder();
  let insideCodeFence = false;

  for (let lineNumber = 1; lineNumber <= state.doc.lines; lineNumber += 1) {
    const line = state.doc.line(lineNumber);
    const lineText = line.text;
    const trimmedLine = lineText.trim();

    builder.add(line.from, line.from, Decoration.line({
      class: readLineClassName(lineText, insideCodeFence)
    }));

    if (/^# Step:\s*/.test(lineText)) {
      decorateHeadingLine(builder, line.from, lineText, '# Step: ', 'authoring-token-step');
    } else if (/^## Scene:\s*/.test(lineText)) {
      decorateHeadingLine(builder, line.from, lineText, '## Scene: ', 'authoring-token-scene');
    } else if (/^###\s+/.test(lineText)) {
      decorateSectionLine(builder, line.from, lineText);
    } else if (/^```/.test(trimmedLine)) {
      addMark(builder, line.from, line.to, 'authoring-token-fence');
    } else if (insideCodeFence) {
      addMark(builder, line.from, line.to, 'authoring-token-code');
    } else if (/^\s*[a-zA-Z][\w-]*:\s*/.test(lineText)) {
      decorateYamlLine(builder, line.from, lineText);
    }

    if (/^```/.test(trimmedLine)) {
      insideCodeFence = !insideCodeFence;
    }
  }

  return builder.finish();
}

const dslDecorationPlugin = ViewPlugin.fromClass(class {
  constructor(view) {
    this.decorations = buildDslDecorations(view.state);
  }

  update(update) {
    if (update.docChanged || update.selectionSet || update.viewportChanged) {
      this.decorations = buildDslDecorations(update.state);
    }
  }
}, {
  decorations: plugin => plugin.decorations
});

const authoringEditorTheme = EditorView.theme({
  '&': {
    height: '100%',
    color: 'var(--authoring-ink)',
    background: 'transparent',
    fontFamily: 'inherit',
    fontSize: '1rem'
  },
  '.cm-scroller': {
    minHeight: '700px',
    overflow: 'auto',
    padding: '18px 20px 28px'
  },
  '.cm-content': {
    minHeight: '100%',
    padding: 0,
    caretColor: 'var(--authoring-ink)',
    tabSize: '2',
    lineHeight: '1.75'
  },
  '.cm-line': {
    padding: '0 8px',
    margin: '0 -8px',
    borderRadius: '10px'
  },
  '.cm-focused': {
    outline: 'none'
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: 'var(--authoring-ink)'
  },
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection': {
    backgroundColor: 'rgba(255, 255, 255, 0.18) !important'
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(255, 255, 255, 0.06)'
  },
  '.cm-panels': {
    background: 'transparent',
    color: 'var(--authoring-ink)'
  }
}, {
  dark: true
});

export function createLessonScriptEditor({
  hostElement,
  initialValue = '',
  placeholderText = '',
  readSlashMenuEligibility = () => true,
  onChange = () => {},
  onCursorChange = () => {},
  onInsertMenuRequest = () => {},
  onEscapeRequest = () => {}
}) {
  const editableCompartment = new Compartment();
  const placeholderCompartment = new Compartment();
  let isApplyingExternalValue = false;
  let currentEditable = true;
  let currentPlaceholderText = placeholderText;

  const state = EditorState.create({
    doc: initialValue,
    extensions: [
      minimalSetup,
      markdown(),
      authoringEditorTheme,
      dslDecorationPlugin,
      editableCompartment.of(EditorView.editable.of(true)),
      placeholderCompartment.of(placeholderExtension(placeholderText)),
      EditorView.updateListener.of(update => {
        if (update.docChanged && !isApplyingExternalValue) {
          onChange({
            value: update.state.doc.toString(),
            selectionStart: update.state.selection.main.from,
            selectionEnd: update.state.selection.main.to
          });
        }

        if (!isApplyingExternalValue && (update.docChanged || update.selectionSet || update.focusChanged)) {
          onCursorChange({
            selectionStart: update.state.selection.main.from,
            selectionEnd: update.state.selection.main.to
          });
        }
      }),
      EditorView.domEventHandlers({
        keydown(event, view) {
          const isCommandK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
          const line = view.state.doc.lineAt(view.state.selection.main.from);
          const cursorColumn = view.state.selection.main.from - line.from;
          const slashTriggerEligible = event.key === '/'
            && !event.metaKey
            && !event.ctrlKey
            && !event.altKey
            && line.text.slice(0, Math.max(0, cursorColumn)).trim() === ''
            && readSlashMenuEligibility();

          if (isCommandK || slashTriggerEligible) {
            event.preventDefault();
            onInsertMenuRequest({
              reason: isCommandK ? 'command-k' : 'slash'
            });
            return true;
          }

          if (event.key === 'Escape') {
            onEscapeRequest();
          }

          return false;
        },
        contextmenu(event) {
          event.preventDefault();
          onInsertMenuRequest({
            reason: 'contextmenu'
          });
          return true;
        }
      })
    ]
  });
  const view = new EditorView({
    state,
    parent: hostElement
  });

  hostElement.dataset.editorOwner = 'CodeMirror';

  function dispatchSelection(selectionStart, selectionEnd = selectionStart, scrollIntoView = true) {
    const effects = scrollIntoView
      ? [EditorView.scrollIntoView(selectionStart, {
        y: 'center'
      })]
      : [];

    view.dispatch({
      selection: {
        anchor: selectionStart,
        head: selectionEnd
      },
      effects
    });
  }

  const controller = {
    focus() {
      view.focus();
    },
    destroy() {
      view.destroy();
      hostElement.textContent = '';
      delete hostElement.dataset.editorOwner;
      delete hostElement.authoringEditor;
    },
    getValue() {
      return view.state.doc.toString();
    },
    setValue(nextValue) {
      const currentValue = view.state.doc.toString();

      if (currentValue === nextValue) {
        return;
      }

      isApplyingExternalValue = true;
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: nextValue
        }
      });
      isApplyingExternalValue = false;
    },
    getSelectionStart() {
      return view.state.selection.main.from;
    },
    getSelectionEnd() {
      return view.state.selection.main.to;
    },
    setSelectionRange(selectionStart, selectionEnd = selectionStart, scrollIntoView = true) {
      dispatchSelection(selectionStart, selectionEnd, scrollIntoView);
    },
    setEditable(isEditable) {
      if (currentEditable === isEditable) {
        return;
      }

      currentEditable = isEditable;
      view.dispatch({
        effects: editableCompartment.reconfigure(EditorView.editable.of(isEditable))
      });
      hostElement.dataset.editorEditable = String(Boolean(isEditable));
    },
    setPlaceholderText(text) {
      if (currentPlaceholderText === text) {
        return;
      }

      currentPlaceholderText = text;
      view.dispatch({
        effects: placeholderCompartment.reconfigure(placeholderExtension(text || ''))
      });
    }
  };

  // Expose deterministic editor controls on the host node for browser smoke automation.
  hostElement.authoringEditor = controller;

  return controller;
}
