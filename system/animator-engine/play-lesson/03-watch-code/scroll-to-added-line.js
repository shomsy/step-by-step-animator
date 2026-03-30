export function scrollToAddedLine(container) {
  const addedLine = container.querySelector('[data-changed="true"]') || container.querySelector('[data-added="true"]');

  if (!addedLine) {
    return;
  }

  window.requestAnimationFrame(() => {
    addedLine.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });
}
