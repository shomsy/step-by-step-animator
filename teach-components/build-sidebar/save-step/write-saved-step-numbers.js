const SAVED_STEP_STORAGE_KEY = 'sidebarBookmarks';

export function writeSavedStepNumbers(savedStepNumbers) {
  localStorage.setItem(SAVED_STEP_STORAGE_KEY, JSON.stringify(savedStepNumbers));
}
