import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { createServer } from 'vite';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(currentDir, '../../');
const IGNORED_CONSOLE_ERROR_PATTERNS = [
  /fonts\.googleapis\.com/i,
  /fonts\.gstatic\.com/i
];

function isIgnoredConsoleError(message) {
  return IGNORED_CONSOLE_ERROR_PATTERNS.some(pattern => pattern.test(message));
}

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

test('browser app smoke covers boot, navigation, lesson switch, and preview isolation', { timeout: 45000 }, async () => {
  const server = await createServer({
    configFile: path.resolve(repoRoot, 'vite.config.js'),
    clearScreen: false,
    logLevel: 'error',
    server: {
      host: '127.0.0.1',
      port: 4173,
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
      if (message.type() !== 'error') {
        return;
      }

      const messageText = message.text();

      if (isIgnoredConsoleError(messageText)) {
        return;
      }

      consoleErrors.push(messageText);
    });

    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });

    await page.goto(appUrl, { waitUntil: 'domcontentloaded' });

    await waitForCondition(
      async () => page.evaluate(() => {
        const lessonPicker = document.getElementById('lessonPicker');
        const lessonHeading = document.getElementById('lessonHeading');
        const stepNumber = document.getElementById('stepNumber');

        return lessonPicker?.value === '01-build-sidebar'
          && Boolean(lessonHeading?.textContent?.trim())
          && stepNumber?.textContent?.startsWith('Prizor 1 /');
      }),
      'the initial lesson shell'
    );
    const initialHeading = await page.$eval('#lessonHeading', element => element.textContent?.trim() || '');
    assert.ok(initialHeading.length > 0);

    assert.equal(
      await page.$eval('#livePreviewFrame', frame => frame.getAttribute('sandbox')),
      'allow-scripts'
    );
    assert.equal(
      await page.$eval('#livePreviewFrame', frame => {
        try {
          return frame.contentWindow?.document?.body ? 'accessible' : 'missing';
        } catch {
          return 'blocked';
        }
      }),
      'blocked'
    );
    assert.ok(
      await page.$eval('#livePreviewFrame', frame => (frame.getAttribute('srcdoc') || '').length > 0)
    );

    await waitForCondition(
      async () => page.$eval('#nextBtn', element => element.disabled === false),
      'the next button to become enabled'
    );
    await page.$eval('#nextBtn', element => {
      element.click();
    });
    await waitForCondition(
      async () => page.$eval(
        '#stepNumber',
        element => element.textContent?.startsWith('Prizor 2 /') || false
      ),
      'the second step after clicking next'
    );

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.select('#lessonPicker', '02-build-top-navigation')
    ]);

    await waitForCondition(
      async () => page.evaluate(() => document.getElementById('lessonPicker')?.value === '02-build-top-navigation'),
      'the switched lesson to load'
    );
    const headingAfterLessonSwitch = await page.$eval('#lessonHeading', element => element.textContent?.trim() || '');

    assert.match(page.url(), /[?&]lesson=02-build-top-navigation\b/);
    assert.notEqual(headingAfterLessonSwitch, initialHeading);
    assert.equal(
      await page.$eval('#livePreviewFrame', frame => frame.getAttribute('sandbox')),
      'allow-scripts'
    );
    assert.ok(
      await page.$eval('#livePreviewFrame', frame => (frame.getAttribute('srcdoc') || '').length > 0)
    );

    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleErrors, []);

    await page.close();
  } finally {
    await browser?.close();
    await server.close();
  }
});
