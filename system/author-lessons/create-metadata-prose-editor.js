import { BlockNoteEditor } from '@blocknote/core';
import '@blocknote/core/style.css';

function normalizeProseMarkdown(markdown) {
  return String(markdown || '').trim();
}

function readBlockNoteBlocks(editor, markdown) {
  const normalizedMarkdown = normalizeProseMarkdown(markdown);

  if (!normalizedMarkdown) {
    return [{
      type: 'paragraph',
      content: []
    }];
  }

  const blocks = editor.tryParseMarkdownToBlocks(normalizedMarkdown);

  if (blocks.length) {
    return blocks;
  }

  return [{
    type: 'paragraph',
    content: []
  }];
}

export function createMetadataProseEditor({
  hostElement,
  initialMarkdown = '',
  onChange = () => {}
}) {
  const editor = BlockNoteEditor.create({
    animations: false,
    defaultStyles: false
  });
  let isApplyingExternalValue = false;

  hostElement.dataset.editorOwner = 'BlockNote';
  editor.mount(hostElement);

  function applyMarkdown(nextMarkdown) {
    isApplyingExternalValue = true;
    editor.replaceBlocks(editor.document, readBlockNoteBlocks(editor, nextMarkdown));
    isApplyingExternalValue = false;
  }

  applyMarkdown(initialMarkdown);

  const unsubscribe = editor.onChange(() => {
    if (isApplyingExternalValue) {
      return;
    }

    onChange(normalizeProseMarkdown(editor.blocksToMarkdownLossy(editor.document)));
  });

  return {
    focus() {
      editor.focus();
    },
    destroy() {
      unsubscribe();
      editor.unmount();
      hostElement.textContent = '';
      delete hostElement.dataset.editorOwner;
    },
    getMarkdown() {
      return normalizeProseMarkdown(editor.blocksToMarkdownLossy(editor.document));
    },
    setMarkdown(nextMarkdown) {
      applyMarkdown(nextMarkdown);
    }
  };
}
