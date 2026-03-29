import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { createServer } from 'vite';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(currentDir, '../../');

async function waitForCondition(readCondition, description, timeoutMs = 10000) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (await readCondition()) {
      return;
    }

    await delay(100);
  }

  throw new Error(`Timed out waiting for ${description}.`);
}

async function openPopoverAndClick(page, buttonSelector, menuSelector, itemSelector) {
  await page.click(buttonSelector);
  await waitForCondition(
    async () => page.$eval(menuSelector, element => !element.hasAttribute('hidden')).catch(() => false),
    `popover menu ${menuSelector}`
  );
  await page.click(itemSelector);
}

async function setEditorValue(page, nextValue) {
  await page.$eval('#authoringScriptEditor', (element, value) => {
    if (!(element instanceof HTMLTextAreaElement)) {
      throw new Error('Expected the authoring editor textarea.');
    }

    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
  }, nextValue);
}

async function setEditorCursorBeforeFirstScene(page) {
  await page.$eval('#authoringScriptEditor', element => {
    if (!(element instanceof HTMLTextAreaElement)) {
      throw new Error('Expected the authoring editor textarea.');
    }

    const sceneMarkerIndex = element.value.indexOf('\n## Scene:');
    const cursor = sceneMarkerIndex >= 0 ? sceneMarkerIndex : element.value.length;
    element.focus();
    element.setSelectionRange(cursor, cursor);
    element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    element.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'ArrowLeft' }));
  });
}

test('browser authoring smoke covers writer flow insert, save, reload persistence, and preview sync', { timeout: 60000 }, async () => {
  const server = await createServer({
    configFile: path.resolve(repoRoot, 'vite.config.js'),
    clearScreen: false,
    logLevel: 'error',
    server: {
      host: '127.0.0.1',
      port: 4174,
      strictPort: false
    }
  });

  let browser;

  try {
    await server.listen();

    const appUrl = server.resolvedUrls?.local?.find(url => url.startsWith('http://127.0.0.1'))
      || server.resolvedUrls?.local?.[0];

    assert.ok(appUrl, 'Vite dev server did not expose a local URL.');

    browser = await puppeteer.launch({
      args: ['--disable-setuid-sandbox', '--no-sandbox'],
      headless: true
    });

    const page = await browser.newPage();
    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', message => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });
    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });
    page.on('dialog', dialog => {
      void dialog.accept();
    });

    await page.goto(`${appUrl}?workspace=authoring`, { waitUntil: 'domcontentloaded' });

    await waitForCondition(
      async () => page.$('#authoringScriptEditor').then(Boolean),
      'the authoring writer workspace'
    );

    await openPopoverAndClick(page, '#authoringMoreBtn', '#authoringMoreMenu', '[data-action="new-draft"]');

    await waitForCondition(
      async () => page.$eval('#authoringLessonTitle', element => element.textContent?.startsWith('New Lesson') || false),
      'the new draft to open'
    );

    await setEditorValue(page, await page.$eval('#authoringScriptEditor', element => {
      if (!(element instanceof HTMLTextAreaElement)) {
        throw new Error('Expected the authoring editor textarea.');
      }

      return element.value
        .replace(/^lessonId:\s*.+$/m, 'lessonId: authoring-smoke-lesson')
        .replace(/^lessonTitle:\s*.+$/m, 'lessonTitle: Authoring Smoke Lesson');
    }));

    await setEditorCursorBeforeFirstScene(page);
    await page.click('#authoringInsertBtn');
    await waitForCondition(
      async () => page.$eval('#authoringInsertMenu', element => !element.hidden).catch(() => false),
      'the insert menu to open'
    );
    await page.click('[data-action="insert-scene"]');
    await page.keyboard.type('authoring-smoke-scene');

    await waitForCondition(
      async () => page.$$eval('.authoring-outline-scene', items => items.length === 2),
      'the outline to reflect the new scene'
    );

    await page.click('#authoringInsertBtn');
    await waitForCondition(
      async () => page.$eval('#authoringInsertMenu', element => !element.hidden).catch(() => false),
      'the contextual insert menu for the new scene'
    );
    await page.click('[data-action="insert-narration"]');
    await page.keyboard.type('Prvo pravimo novu scenu u writer flow-u.');

    await page.click('#authoringInsertBtn');
    await waitForCondition(
      async () => page.$eval('#authoringInsertMenu', element => !element.hidden).catch(() => false),
      'the contextual code insert menu'
    );
    await page.click('[data-action="insert-show-code:html"]');
    await page.keyboard.type('<div class="smoke-card">Smoke</div>');

    await waitForCondition(
      async () => page.$eval('#authoringCompileChip', element => element.textContent?.includes('Clean') || false),
      'the script to compile cleanly'
    );

    await page.click('#authoringSaveDraftBtn');
    await waitForCondition(
      async () => page.$eval('#authoringStatus', element => element.textContent?.includes('Draft saved into SQLite.') || false),
      'the authoring draft to save'
    );

    await waitForCondition(
      async () => page.$eval('#authoringPreviewFrame', frame => (frame.getAttribute('srcdoc') || '').includes('lesson-shell')),
      'the preview iframe to stay populated'
    );

    await page.reload({ waitUntil: 'domcontentloaded' });

    await waitForCondition(
      async () => page.evaluate(() => {
        const editor = document.querySelector('#authoringScriptEditor');
        return editor instanceof HTMLTextAreaElement && editor.value.includes('authoring-smoke-lesson');
      }),
      'SQLite persistence after reload'
    );

    await waitForCondition(
      async () => page.$$eval('.authoring-outline-scene', items => items.length === 2),
      'the outline after reload'
    );

    await waitForCondition(
      async () => page.$eval('#authoringPreviewFrame', frame => (frame.getAttribute('srcdoc') || '').includes('lesson-shell')),
      'the preview iframe after reload'
    );

    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleErrors, []);

    await page.close();
  } finally {
    await browser?.close();
    await server.close();
  }
});
