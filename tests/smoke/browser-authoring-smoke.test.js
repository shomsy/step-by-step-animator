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

async function setEditorCursorBeforeFirstScene(page) {
  await page.$eval('#authoringScriptEditor', element => {
    if (!(element instanceof HTMLElement) || !element.authoringEditor) {
      throw new Error('Expected the CodeMirror authoring editor host.');
    }

    const value = element.authoringEditor.getValue();
    const sceneMarkerIndex = value.indexOf('\n## Scene:');
    const cursor = sceneMarkerIndex >= 0 ? sceneMarkerIndex : value.length;
    element.authoringEditor.focus();
    element.authoringEditor.setSelectionRange(cursor, cursor);
  });
}

async function setMetadataValue(page, fieldName, nextValue) {
  await page.$eval(`[data-metadata-field="${fieldName}"]`, (element, value) => {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)) {
      throw new Error(`Expected a metadata control for ${value}.`);
    }

    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }, nextValue);
}

async function readMetadataValue(page, fieldName) {
  return page.$eval(`[data-metadata-field="${fieldName}"]`, element => {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)) {
      throw new Error('Expected a metadata control.');
    }

    return element.value;
  });
}

test('browser authoring smoke covers V2 writer body view, metadata drawer, preview sync, and validation jump flow', { timeout: 60000 }, async () => {
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
      async () => page.$eval('#authoringLessonTitle', element => element.textContent?.includes('New Lesson') || false),
      'the new draft to open'
    );

    await waitForCondition(
      async () => page.evaluate(() => {
        const editor = document.querySelector('#authoringScriptEditor');
        return editor instanceof HTMLElement
          && editor.dataset.editorOwner === 'CodeMirror'
          && editor.authoringEditor.getValue().startsWith('# Step:')
          && !editor.authoringEditor.getValue().includes('lessonId:');
      }),
      'the writer body view to hide frontmatter and open on the first step through CodeMirror'
    );

    await waitForCondition(
      async () => page.evaluate(() => {
        const compileCard = document.querySelector('#authoringCompileStatus');
        const validationCard = document.querySelector('#authoringValidation');
        const previewCard = document.querySelector('#authoringPreviewCard');
        const snapshotTabs = document.querySelector('#authoringSnapshotTabs');
        return Boolean(compileCard && validationCard && previewCard && snapshotTabs);
      }),
      'the right inspector to render'
    );

    await setEditorCursorBeforeFirstScene(page);
    await page.click('#authoringAddSceneBtn');
    await page.keyboard.type('authoring-smoke-scene');

    await waitForCondition(
      async () => page.$$eval('.authoring-outline-scene', items => items.length === 2),
      'the outline to reflect the new scene'
    );

    await page.$eval('#authoringInsertBtn', element => {
      if (!(element instanceof HTMLElement)) {
        throw new Error('Expected the insert button.');
      }

      element.click();
    });
    await waitForCondition(
      async () => page.$eval('#authoringInsertMenu', element => !element.hidden).catch(() => false),
      'the contextual insert menu for the new scene'
    );
    await page.$eval('[data-action="insert-narration"]', element => {
      if (!(element instanceof HTMLElement)) {
        throw new Error('Expected the narration insert action.');
      }

      element.click();
    });
    await page.keyboard.type('Prvo pravimo novu scenu u writer flow-u.');

    await page.$eval('#authoringInsertBtn', element => {
      if (!(element instanceof HTMLElement)) {
        throw new Error('Expected the insert button.');
      }

      element.click();
    });
    await waitForCondition(
      async () => page.$eval('#authoringInsertMenu', element => !element.hidden).catch(() => false),
      'the contextual code insert menu'
    );
    await page.$eval('[data-action="insert-show-code:html"]', element => {
      if (!(element instanceof HTMLElement)) {
        throw new Error('Expected the HTML insert action.');
      }

      element.click();
    });
    await page.keyboard.type('<div class="smoke-card">Smoke</div>');

    await waitForCondition(
      async () => page.$eval('#authoringCompileChip', element => element.textContent?.includes('Valid') || false),
      'the script to compile cleanly'
    );

    await page.click('#authoringMetadataBtn');
    await waitForCondition(
      async () => page.$('#authoringMetadataDrawer:not([hidden])').then(Boolean),
      'the metadata drawer to open'
    );

    await waitForCondition(
      async () => page.evaluate(() => {
        const lessonIntroEditor = document.querySelector('[data-metadata-prose="lessonIntro"]');
        const goalCaptionEditor = document.querySelector('[data-metadata-prose="goalImageCaption"]');
        return lessonIntroEditor instanceof HTMLElement
          && goalCaptionEditor instanceof HTMLElement
          && lessonIntroEditor.dataset.editorOwner === 'BlockNote'
          && goalCaptionEditor.dataset.editorOwner === 'BlockNote';
      }),
      'the BlockNote prose editors inside the metadata drawer'
    );

    await setMetadataValue(page, 'lessonTitle', 'Authoring Smoke Lesson');
    await setMetadataValue(page, 'lessonId', 'authoring-smoke-lesson');
    await setMetadataValue(page, 'previewTitle', 'Smoke Preview');
    await page.click('[data-action="apply-metadata"]');

    await waitForCondition(
      async () => page.$eval('#authoringLessonTitle', element => element.textContent?.includes('Authoring Smoke Lesson') || false),
      'metadata changes to update the header title'
    );

    await page.keyboard.down('Control');
    await page.keyboard.press('s');
    await page.keyboard.up('Control');

    await waitForCondition(
      async () => page.$eval('#authoringStatus', element => element.textContent?.includes('Draft saved into SQLite.') || false),
      'the authoring draft to save through the shortcut'
    );

    await waitForCondition(
      async () => page.$eval('#authoringPreviewFrame', frame => (frame.getAttribute('srcdoc') || '').includes('smoke-card')),
      'the preview iframe to stay populated'
    );

    await page.reload({ waitUntil: 'domcontentloaded' });

    await waitForCondition(
      async () => page.evaluate(() => {
        const editor = document.querySelector('#authoringScriptEditor');
        return editor instanceof HTMLElement
          && !editor.authoringEditor.getValue().includes('lessonTitle: Authoring Smoke Lesson')
          && editor.authoringEditor.getValue().startsWith('# Step:');
      }),
      'SQLite persistence after reload'
    );

    await waitForCondition(
      async () => page.$eval('#authoringLessonTitle', element => element.textContent?.includes('Authoring Smoke Lesson') || false),
      'the reloaded header title after metadata persistence'
    );

    await waitForCondition(
      async () => page.$$eval('.authoring-outline-scene', items => items.length === 2),
      'the outline after reload'
    );

    await waitForCondition(
      async () => page.$eval('#authoringPreviewFrame', frame => (frame.getAttribute('srcdoc') || '').includes('<!DOCTYPE html>')),
      'the preview iframe after reload'
    );

    await page.click('#authoringMetadataBtn');
    await waitForCondition(
      async () => page.$('#authoringMetadataDrawer:not([hidden])').then(Boolean),
      'the metadata drawer to reopen after reload'
    );
    assert.equal(await readMetadataValue(page, 'lessonTitle'), 'Authoring Smoke Lesson');
    assert.equal(await readMetadataValue(page, 'lessonId'), 'authoring-smoke-lesson');
    await page.click('[data-action="close-metadata"]');

    await page.$eval('#authoringScriptEditor', element => {
      if (!(element instanceof HTMLElement) || !element.authoringEditor) {
        throw new Error('Expected the CodeMirror authoring editor host.');
      }

      const currentValue = element.authoringEditor.getValue();
      element.authoringEditor.focus();
      element.authoringEditor.setSelectionRange(currentValue.length, currentValue.length);
    });
    await page.keyboard.type('\n### Show Code: html\n```html\n<div class="broken-preview">Broken</div>');

    await waitForCondition(
      async () => page.$eval('#authoringCompileChip', element => element.textContent?.includes('Syntax issue') || false),
      'the broken body view source to show a syntax issue'
    );

    await waitForCondition(
      async () => page.$eval('#authoringPreviewFrame', frame => (frame.getAttribute('srcdoc') || '').includes('smoke-card')),
      'the preview iframe to keep the last healthy state while invalid'
    );

    await page.$eval('#authoringScriptEditor', element => {
      if (!(element instanceof HTMLElement) || !element.authoringEditor) {
        throw new Error('Expected the CodeMirror authoring editor host.');
      }

      element.authoringEditor.focus();
      element.authoringEditor.setSelectionRange(0, 0);
    });

    await waitForCondition(
      async () => page.$$('.authoring-validation-item').then(items => items.length > 0),
      'a validation item for the syntax issue'
    );

    await page.click('.authoring-validation-item');

    await waitForCondition(
      async () => page.$eval('#authoringLineBadge', element => element.textContent?.trim() !== 'Line 1' || false),
      'the validation click to move the cursor to the failing region'
    );

    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleErrors, []);

    await page.close();
  } finally {
    await browser?.close();
    await server.close();
  }
});
