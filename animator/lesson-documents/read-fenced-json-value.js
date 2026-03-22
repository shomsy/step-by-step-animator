export function readFencedJsonValue(markdown) {
  const source = String(markdown || '').trim();
  const fencedJsonMatch = source.match(/```json\s*([\s\S]*?)```/i);

  if (!fencedJsonMatch) {
    throw new Error('Expected one fenced ```json``` block in markdown document.');
  }

  try {
    return JSON.parse(fencedJsonMatch[1].trim());
  } catch (error) {
    throw new Error(`Failed to parse fenced JSON block: ${error.message}`);
  }
}
