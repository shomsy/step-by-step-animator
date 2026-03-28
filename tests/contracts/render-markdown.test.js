import test from 'node:test';
import assert from 'node:assert/strict';
import { renderMarkdown } from '../../system/foundation/markdown/render-markdown.js';

test('renderMarkdown keeps safe links and strips unsafe schemes', () => {
  assert.equal(
    renderMarkdown('[docs](https://example.com)'),
    '<p><a href="https://example.com" target="_blank" rel="noreferrer noopener">docs</a></p>'
  );

  assert.equal(renderMarkdown('[click](javascript:alert%281%29)'), '<p>click</p>');
});

test('renderMarkdown strips unsafe image sources', () => {
  assert.equal(renderMarkdown('![diagram](javascript:alert%281%29)'), '<p>diagram</p>');
});
