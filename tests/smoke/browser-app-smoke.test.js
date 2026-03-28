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

test('browser app smoke covers boot, navigation, lesson switch, script-lesson loading, and preview isolation', { timeout: 45000 }, async () => {
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

    await page.evaluateOnNewDocument(() => {
      window.__speechLog = [];

      class FakeSpeechSynthesisUtterance extends EventTarget {
        constructor(text) {
          super();
          this.text = text;
          this.lang = '';
          this.rate = 1;
          this.voice = null;
        }
      }

      const fakeSpeechSynthesis = {
        paused: false,
        _activeUtterance: null,
        _voices: [
          {
            voiceURI: 'sr-RS-test-voice',
            name: 'Test Serbian Voice',
            lang: 'sr-RS'
          }
        ],
        getVoices() {
          return this._voices;
        },
        addEventListener() {},
        removeEventListener() {},
        speak(utterance) {
          this.paused = false;
          this._activeUtterance = utterance;
          window.__speechLog.push({
            type: 'speak',
            text: utterance.text,
            lang: utterance.lang,
            voiceURI: utterance.voice?.voiceURI || null
          });
        },
        cancel() {
          this.paused = false;
          this._activeUtterance = null;
          window.__speechLog.push({ type: 'cancel' });
        },
        pause() {
          this.paused = true;
          window.__speechLog.push({ type: 'pause' });
        },
        resume() {
          this.paused = false;
          window.__speechLog.push({ type: 'resume' });
        }
      };

      Object.defineProperty(window, 'SpeechSynthesisUtterance', {
        configurable: true,
        writable: true,
        value: FakeSpeechSynthesisUtterance
      });
      Object.defineProperty(window, 'speechSynthesis', {
        configurable: true,
        writable: true,
        value: fakeSpeechSynthesis
      });
    });

    page.on('console', message => {
      if (message.type() !== 'error') {
        return;
      }
      consoleErrors.push(message.text());
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

    await page.select('#stepSpeechSourceSelect', 'browser');
    await waitForCondition(
      async () => page.$eval(
        '#stepSpeechStatus',
        element => element.textContent?.includes('Koristiću sistemski glas') || false
      ),
      'browser narration readiness'
    );
    assert.deepEqual(
      await page.$eval(
        '#stepSpeechBrowserVoiceSelect',
        element => Array.from(element.options).map(option => option.value)
      ),
      ['', 'sr-RS-test-voice']
    );

    await page.$eval('#speakStepBtn', element => {
      element.click();
    });
    await waitForCondition(
      async () => page.evaluate(() => window.__speechLog.some(entry => entry.type === 'speak')),
      'browser narration to start'
    );
    assert.equal(
      await page.$eval('#pauseStepSpeechBtn', element => element.disabled),
      false
    );

    await page.$eval('#pauseStepSpeechBtn', element => {
      element.click();
    });
    await waitForCondition(
      async () => page.evaluate(() => window.__speechLog.some(entry => entry.type === 'pause')),
      'browser narration to pause'
    );
    await waitForCondition(
      async () => page.$eval('#speakStepBtn span', element => element.textContent === 'Nastavi'),
      'browser narration resume label'
    );

    await page.$eval('#speakStepBtn', element => {
      element.click();
    });
    await waitForCondition(
      async () => page.evaluate(() => window.__speechLog.some(entry => entry.type === 'resume')),
      'browser narration to resume'
    );

    await page.$eval('#stopStepSpeechBtn', element => {
      element.click();
    });
    await waitForCondition(
      async () => page.$eval(
        '#stepSpeechStatus',
        element => element.textContent?.includes('Naracija je zaustavljena.') || false
      ),
      'browser narration to stop'
    );
    const spokenEntries = await page.evaluate(() => window.__speechLog.filter(entry => entry.type === 'speak'));
    assert.equal(spokenEntries.length, 1);
    assert.equal(spokenEntries[0].lang, 'sr-RS');
    assert.equal(spokenEntries[0].voiceURI, 'sr-RS-test-voice');
    assert.match(spokenEntries[0].text, /^Korak 1 od \d+\./);

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

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.select('#lessonPicker', '09-human-first-script-demo')
    ]);

    await waitForCondition(
      async () => page.evaluate(() => document.getElementById('lessonPicker')?.value === '09-human-first-script-demo'),
      'the script-authored lesson to load'
    );
    const headingAfterScriptLessonSwitch = await page.$eval('#lessonHeading', element => element.textContent?.trim() || '');

    assert.match(page.url(), /[?&]lesson=09-human-first-script-demo\b/);
    assert.equal(headingAfterScriptLessonSwitch, '09 · Human-First Script Demo');
    assert.equal(
      await page.$eval('#stepNumber', element => element.textContent?.startsWith('Prizor 1 /') || false),
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
