import { parseFrontmatter } from './parse-frontmatter.js';
import { renderMarkdown } from './render-markdown.js';

function readIntroText(markdownBody) {
  return String(markdownBody || '')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .join(' ')
    .trim();
}

export function readLessonMetadata(markdown, defaults = {}) {
  const { attributes, body } = parseFrontmatter(markdown);

  return {
    lessonTitle: attributes.title || defaults.lessonTitle || '',
    lessonIntro: readIntroText(body) || defaults.lessonIntro || '',
    lessonIntroHtml: renderMarkdown(body) || '',
    previewAddress: attributes.previewAddress || defaults.previewAddress || '',
    previewTitle: attributes.previewTitle || defaults.previewTitle || '',
    htmlFileName: attributes.htmlFileName || defaults.htmlFileName || 'index.html',
    cssFileName: attributes.cssFileName || defaults.cssFileName || 'style.css'
  };
}
