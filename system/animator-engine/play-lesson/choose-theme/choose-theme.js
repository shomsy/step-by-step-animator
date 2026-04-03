const THEME_STORAGE_KEY = 'stepByStepAnimatorTheme';

function writeStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage write failures and keep runtime theme active.
  }
}

function readStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

function showThemeButtonIcon(themeButton, theme) {
  themeButton.innerHTML =
    theme === 'dark'
      ? `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`
      : `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`;
}

export function chooseTheme({ rootElement, themeButton }) {
  function applyChosenTheme(theme, persist = true) {
    rootElement.setAttribute('data-theme', theme);
    showThemeButtonIcon(themeButton, theme);

    if (persist) {
      writeStoredTheme(theme);
    }
  }

  function toggleTheme() {
    const currentTheme = rootElement.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyChosenTheme(nextTheme);
  }

  function initializeTheme() {
    const storedTheme = readStoredTheme();
    const initialTheme =
      storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : rootElement.getAttribute('data-theme') || 'dark';

    applyChosenTheme(initialTheme, false);
  }

  return {
    initializeTheme,
    toggleTheme,
  };
}
