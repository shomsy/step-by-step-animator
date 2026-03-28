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

test('browser authoring smoke covers draft create, save, reload persistence, duplicate, publish, and delete', { timeout: 60000 }, async () => {
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
      async () => page.$('#authoringCreateDraftBtn').then(Boolean),
      'the authoring workspace shell'
    );
    await waitForCondition(
      async () => page.$$eval('.authoring-draft-item', items => items.length > 0),
      'seeded paired drafts'
    );

    await page.click('#authoringCreateDraftBtn');
    await waitForCondition(
      async () => page.evaluate(() => {
        const lessonIdInput = document.querySelector('[data-action="change-lesson-attribute:lessonId"]');
        return lessonIdInput instanceof HTMLInputElement && lessonIdInput.value.startsWith('new-lesson-');
      }),
      'the newly created draft to open'
    );

    await page.$eval('[data-action="change-lesson-attribute:lessonId"]', (element, value) => {
      element.value = value;
      element.dispatchEvent(new Event('input', { bubbles: true }));
    }, 'authoring-smoke-lesson');
    await page.$eval('[data-action="change-lesson-attribute:lessonTitle"]', (element, value) => {
      element.value = value;
      element.dispatchEvent(new Event('input', { bubbles: true }));
    }, 'Authoring Smoke Lesson');

    await page.click('#authoringSaveDraftBtn');
    await waitForCondition(
      async () => page.$eval('#authoringStatus', element => element.textContent?.includes('Draft saved into SQLite.') || false),
      'the authoring draft to save'
    );
    assert.equal(
      await page.$eval('#authoringScriptPreview', element => element.value.includes('authoring-smoke-lesson')),
      true
    );

    await page.reload({ waitUntil: 'domcontentloaded' });
    await waitForCondition(
      async () => page.evaluate(() => {
        const lessonIdInput = document.querySelector('[data-action="change-lesson-attribute:lessonId"]');
        return lessonIdInput instanceof HTMLInputElement && lessonIdInput.value === 'authoring-smoke-lesson';
      }),
      'SQLite persistence after reload'
    );
    assert.equal(
      await page.$eval('[data-action="change-lesson-attribute:lessonTitle"]', element => element.value),
      'Authoring Smoke Lesson'
    );

    await page.click('#authoringDuplicateDraftBtn');
    await waitForCondition(
      async () => page.evaluate(() => {
        const lessonIdInput = document.querySelector('[data-action="change-lesson-attribute:lessonId"]');
        return lessonIdInput instanceof HTMLInputElement && lessonIdInput.value.startsWith('authoring-smoke-lesson-copy');
      }),
      'the duplicated draft to open'
    );

    await page.click('#authoringPublishDraftBtn');
    await waitForCondition(
      async () => page.$$eval('.authoring-version-item', items => items.length > 0),
      'the published snapshot to appear'
    );
    assert.equal(
      await page.$eval('#authoringStatus', element => element.textContent?.includes('Published snapshot stored in SQLite.') || false),
      true
    );

    await page.click('#authoringDeleteDraftBtn');
    await waitForCondition(
      async () => page.$$eval('.authoring-draft-item', items => items.every(item => !item.textContent?.includes('authoring-smoke-lesson-copy'))),
      'the duplicated draft to be deleted'
    );
    assert.equal(
      await page.$eval('#authoringPreviewFrame', frame => (frame.getAttribute('srcdoc') || '').length > 0),
      true
    );

    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleErrors, []);

    await page.close();
  } finally {
    await browser?.close();
    await server.close();
  }
});
