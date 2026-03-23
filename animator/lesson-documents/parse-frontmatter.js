function normalizeFrontmatterValue(rawValue) {
  const trimmedValue = String(rawValue || '').trim();

  if (
    (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
    (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"))
  ) {
    return trimmedValue.slice(1, -1);
  }

  return trimmedValue;
}

export function parseFrontmatter(markdown) {
  if (!markdown) {
    return { attributes: {}, body: '' };
  }

  const source = String(markdown).trim();

  if (!source.startsWith('---\n')) {
    return { attributes: {}, body: source };
  }

  const match = source.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);

  if (!match) {
    return { attributes: {}, body: source };
  }

  const attributes = {};
  let activeKey = null;

  match[1].split('\n').forEach(line => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      return;
    }

    const keyMatch = trimmedLine.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);

    if (keyMatch) {
      const [, key, rawValue] = keyMatch;

      if (rawValue) {
        attributes[key] = normalizeFrontmatterValue(rawValue);
        activeKey = null;
        return;
      }

      attributes[key] = [];
      activeKey = key;
      return;
    }

    const itemMatch = trimmedLine.match(/^-\s+(.+)$/);

    if (itemMatch && activeKey && Array.isArray(attributes[activeKey])) {
      attributes[activeKey].push(normalizeFrontmatterValue(itemMatch[1]));
    }
  });

  return {
    attributes,
    body: source.slice(match[0].length).trim()
  };
}
