function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeAttribute(text) {
  return escapeHtml(text)
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function stripMarkdownSyntax(text) {
  return String(text)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .trim();
}

function createHeadingId(text, usedHeadingIds) {
  const baseId = stripMarkdownSyntax(text)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';

  const seenCount = usedHeadingIds.get(baseId) || 0;
  usedHeadingIds.set(baseId, seenCount + 1);

  return seenCount ? `${baseId}-${seenCount + 1}` : baseId;
}

function renderInlineMarkdown(text) {
  return text
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => `<img class="lesson-markdown-image" src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}">`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
      const safeHref = escapeAttribute(href);

      if (String(href).startsWith('#')) {
        return `<a href="${safeHref}">${label}</a>`;
      }

      return `<a href="${safeHref}" target="_blank" rel="noreferrer">${label}</a>`;
    })
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}

function flushParagraph(buffer, htmlParts) {
  if (!buffer.length) {
    return;
  }

  htmlParts.push(`<p>${renderInlineMarkdown(buffer.join(' '))}</p>`);
  buffer.length = 0;
}

function flushList(listState, htmlParts) {
  if (!listState.items.length) {
    return;
  }

  const tagName = listState.type === 'ordered' ? 'ol' : 'ul';
  htmlParts.push(`<${tagName}>${listState.items.map(item => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</${tagName}>`);
  listState.type = null;
  listState.items = [];
}

function renderCodeBlock(code, language) {
  const normalizedLanguage = (language || '').trim();
  const languageClass = normalizedLanguage ? ` class="language-${escapeHtml(normalizedLanguage)}"` : '';

  return `<pre class="lesson-code-block"><code${languageClass}>${escapeHtml(code)}</code></pre>`;
}

export function renderMarkdown(markdown) {
  if (!markdown) {
    return '';
  }

  const trimmedMarkdown = String(markdown).trim();

  if (!trimmedMarkdown) {
    return '';
  }

  const htmlParts = [];
  const paragraphBuffer = [];
  const listState = { type: null, items: [] };
  const usedHeadingIds = new Map();
  let inCodeBlock = false;
  let codeFenceLanguage = '';
  let codeBuffer = [];

  trimmedMarkdown.split('\n').forEach(line => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('```')) {
      flushParagraph(paragraphBuffer, htmlParts);
      flushList(listState, htmlParts);

      if (!inCodeBlock) {
        inCodeBlock = true;
        codeFenceLanguage = trimmedLine.slice(3).trim();
        codeBuffer = [];
        return;
      }

      htmlParts.push(renderCodeBlock(codeBuffer.join('\n'), codeFenceLanguage));
      inCodeBlock = false;
      codeFenceLanguage = '';
      codeBuffer = [];
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    if (!trimmedLine) {
      flushParagraph(paragraphBuffer, htmlParts);
      flushList(listState, htmlParts);
      return;
    }

    if (/^---+$/.test(trimmedLine)) {
      flushParagraph(paragraphBuffer, htmlParts);
      flushList(listState, htmlParts);
      htmlParts.push('<hr>');
      return;
    }

    if (trimmedLine.startsWith('# ')) {
      flushParagraph(paragraphBuffer, htmlParts);
      flushList(listState, htmlParts);
      const headingText = trimmedLine.slice(2).trim();
      const headingId = createHeadingId(headingText, usedHeadingIds);
      htmlParts.push(`<h1 id="${escapeAttribute(headingId)}">${renderInlineMarkdown(headingText)}</h1>`);
      return;
    }

    if (trimmedLine.startsWith('## ')) {
      flushParagraph(paragraphBuffer, htmlParts);
      flushList(listState, htmlParts);
      const headingText = trimmedLine.slice(3).trim();
      const headingId = createHeadingId(headingText, usedHeadingIds);
      htmlParts.push(`<h2 id="${escapeAttribute(headingId)}">${renderInlineMarkdown(headingText)}</h2>`);
      return;
    }

    if (trimmedLine.startsWith('### ')) {
      flushParagraph(paragraphBuffer, htmlParts);
      flushList(listState, htmlParts);
      const headingText = trimmedLine.slice(4).trim();
      const headingId = createHeadingId(headingText, usedHeadingIds);
      htmlParts.push(`<h3 id="${escapeAttribute(headingId)}">${renderInlineMarkdown(headingText)}</h3>`);
      return;
    }

    if (trimmedLine.startsWith('#### ')) {
      flushParagraph(paragraphBuffer, htmlParts);
      flushList(listState, htmlParts);
      const headingText = trimmedLine.slice(5).trim();
      const headingId = createHeadingId(headingText, usedHeadingIds);
      htmlParts.push(`<h4 id="${escapeAttribute(headingId)}">${renderInlineMarkdown(headingText)}</h4>`);
      return;
    }

    if (/^[-*]\s+/.test(trimmedLine)) {
      flushParagraph(paragraphBuffer, htmlParts);

      if (listState.type && listState.type !== 'unordered') {
        flushList(listState, htmlParts);
      }

      listState.type = 'unordered';
      listState.items.push(trimmedLine.replace(/^[-*]\s+/, ''));
      return;
    }

    if (/^\d+\.\s+/.test(trimmedLine)) {
      flushParagraph(paragraphBuffer, htmlParts);

      if (listState.type && listState.type !== 'ordered') {
        flushList(listState, htmlParts);
      }

      listState.type = 'ordered';
      listState.items.push(trimmedLine.replace(/^\d+\.\s+/, ''));
      return;
    }

    if (/^>\s+/.test(trimmedLine)) {
      flushParagraph(paragraphBuffer, htmlParts);
      flushList(listState, htmlParts);
      htmlParts.push(`<blockquote>${renderInlineMarkdown(trimmedLine.replace(/^>\s+/, ''))}</blockquote>`);
      return;
    }

    paragraphBuffer.push(trimmedLine);
  });

  flushParagraph(paragraphBuffer, htmlParts);
  flushList(listState, htmlParts);

  return htmlParts.join('\n');
}
