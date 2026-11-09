/* Shared native-dialog enhancement; image links still work without dialog support. */
(() => {
  'use strict';

  const dialog = document.querySelector('.figure-viewer');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('.figure-viewer__caption');
  const closeButton = dialog.querySelector('[data-figure-close]');
  if (!image || !caption || !closeButton) return;

  // One delegated listener also handles figures added after initialization.
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('[data-figure-open]');
    const sourceImage = link?.querySelector('img');
    if (!sourceImage) return;

    event.preventDefault();
    image.src = link.href;
    image.alt = sourceImage.alt;
    caption.textContent = link.dataset.caption || sourceImage.alt;
    dialog.showModal();
  });

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) dialog.close();
  });
})();
