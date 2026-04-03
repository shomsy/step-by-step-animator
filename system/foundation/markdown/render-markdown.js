function escapeHtml(text) {
  return String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function escapeAttribute(text) {
  return escapeHtml(text).replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

const SAFE_MARKDOWN_URL_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);

function sanitizeMarkdownUrl(value) {
  const url = String(value || '').trim();

  if (!url) {
    return '';
  }

  if (url.startsWith('#')) {
    return url;
  }

  try {
    const parsedUrl = new URL(url, 'https://example.invalid');

    if (!SAFE_MARKDOWN_URL_PROTOCOLS.has(parsedUrl.protocol)) {
      return '';
    }

    return url;
  } catch {
    return '';
  }
}

function stripMarkdownSyntax(text) {
  return String(text)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .trim();
}

function createHeadingId(text, usedHeadingIds) {
  const baseId =
    stripMarkdownSyntax(text)
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
  const source = String(text || '');
  const tokenPattern = /`([^`]+)`|!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)/g;
  const placeholders = [];
  let renderedText = '';
  let lastIndex = 0;

  source.replace(
    tokenPattern,
    (match, codeText, imageAlt, imageSrc, linkLabel, linkHref, offset) => {
      renderedText += escapeHtml(source.slice(lastIndex, offset));

      const placeholder = `__INLINE_TOKEN_${placeholders.length}__`;

      if (typeof codeText === 'string') {
        placeholders.push({
          placeholder,
          html: `<code>${escapeHtml(codeText)}</code>`,
        });
      } else if (typeof imageSrc === 'string') {
        const safeImageSrc = sanitizeMarkdownUrl(imageSrc);

        placeholders.push({
          placeholder,
          html: safeImageSrc
            ? `<img class="lesson-markdown-image" src="${escapeAttribute(safeImageSrc)}" alt="${escapeAttribute(imageAlt)}">`
            : escapeHtml(imageAlt),
        });
      } else if (typeof linkHref === 'string') {
        const safeHref = sanitizeMarkdownUrl(linkHref);

        placeholders.push({
          placeholder,
          html: safeHref
            ? String(safeHref).startsWith('#')
              ? `<a href="${escapeAttribute(safeHref)}">${escapeHtml(linkLabel)}</a>`
              : `<a href="${escapeAttribute(safeHref)}" target="_blank" rel="noreferrer noopener">${escapeHtml(linkLabel)}</a>`
            : escapeHtml(linkLabel),
        });
      }

      renderedText += placeholder;
      lastIndex = offset + match.length;
      return match;
    }
  );

  renderedText += escapeHtml(source.slice(lastIndex));

  renderedText = renderedText
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

  return placeholders.reduce(
    (currentText, placeholder) => currentText.replaceAll(placeholder.placeholder, placeholder.html),
    renderedText
  );
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
  htmlParts.push(
    `<${tagName}>${listState.items.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</${tagName}>`
  );
  listState.type = null;
  listState.items = [];
}

function renderCodeBlock(code, language) {
  const normalizedLanguage = (language || '').trim();
  const languageClass = normalizedLanguage
    ? ` class="language-${escapeHtml(normalizedLanguage)}"`
    : '';

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

  trimmedMarkdown.split('\n').forEach((line) => {
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
      htmlParts.push(
        `<h1 id="${escapeAttribute(headingId)}">${renderInlineMarkdown(headingText)}</h1>`
      );
      return;
    }

    if (trimmedLine.startsWith('## ')) {
      flushParagraph(paragraphBuffer, htmlParts);
      flushList(listState, htmlParts);
      const headingText = trimmedLine.slice(3).trim();
      const headingId = createHeadingId(headingText, usedHeadingIds);
      htmlParts.push(
        `<h2 id="${escapeAttribute(headingId)}">${renderInlineMarkdown(headingText)}</h2>`
      );
      return;
    }

    if (trimmedLine.startsWith('### ')) {
      flushParagraph(paragraphBuffer, htmlParts);
      flushList(listState, htmlParts);
      const headingText = trimmedLine.slice(4).trim();
      const headingId = createHeadingId(headingText, usedHeadingIds);
      htmlParts.push(
        `<h3 id="${escapeAttribute(headingId)}">${renderInlineMarkdown(headingText)}</h3>`
      );
      return;
    }

    if (trimmedLine.startsWith('#### ')) {
      flushParagraph(paragraphBuffer, htmlParts);
      flushList(listState, htmlParts);
      const headingText = trimmedLine.slice(5).trim();
      const headingId = createHeadingId(headingText, usedHeadingIds);
      htmlParts.push(
        `<h4 id="${escapeAttribute(headingId)}">${renderInlineMarkdown(headingText)}</h4>`
      );
      return;
    }

    const orderedListMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
    if (orderedListMatch) {
      flushParagraph(paragraphBuffer, htmlParts);
      if (listState.type !== 'ordered') {
        flushList(listState, htmlParts);
        listState.type = 'ordered';
      }
      listState.items.push(orderedListMatch[2]);
      return;
    }

    const bulletListMatch = trimmedLine.match(/^[-*]\s+(.+)$/);
    if (bulletListMatch) {
      flushParagraph(paragraphBuffer, htmlParts);
      if (listState.type !== 'unordered') {
        flushList(listState, htmlParts);
        listState.type = 'unordered';
      }
      listState.items.push(bulletListMatch[1]);
      return;
    }

    paragraphBuffer.push(trimmedLine);
  });

  flushParagraph(paragraphBuffer, htmlParts);
  flushList(listState, htmlParts);

  if (inCodeBlock) {
    htmlParts.push(renderCodeBlock(codeBuffer.join('\n'), codeFenceLanguage));
  }

  return htmlParts.join('\n');
}
