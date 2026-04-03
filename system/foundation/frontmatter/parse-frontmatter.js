import YAML from 'yaml';

const FRONTMATTER_PATTERN = /^---\n([\s\S]*?)\n---(?:\n|$)/;

export function parseFrontmatter(markdown) {
  if (!markdown) {
    return { attributes: {}, body: '' };
  }

  const source = String(markdown).replace(/\r\n/g, '\n').trim();

  if (!source.startsWith('---\n')) {
    return { attributes: {}, body: source };
  }

  const match = source.match(FRONTMATTER_PATTERN);

  if (!match) {
    return { attributes: {}, body: source };
  }

  let attributes = {};

  try {
    attributes = YAML.parse(match[1]) || {};
  } catch (error) {
    throw new Error(`Failed to parse frontmatter: ${error.message}`);
  }

  return {
    attributes,
    body: source.slice(match[0].length).trim(),
  };
}
