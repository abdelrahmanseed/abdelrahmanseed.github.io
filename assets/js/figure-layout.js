/* Balance real rendered text and figure heights without changing the content. */
(function (root, factory) {
  'use strict';
  const layout = factory();
  if (typeof module === 'object' && module.exports) module.exports = layout;
  else layout.mount(root.document);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function balancedShare(measure, low, high, tolerance = 8) {
    if (low >= high) return null;
    let best = null;
    function evaluate(share) {
      const { textHeight, figureHeight } = measure(share);
      const difference = textHeight - figureHeight;
      const result = { share, difference, error: Math.abs(difference), height: Math.max(textHeight, figureHeight) };
      if (!best || result.error < best.error) best = result;
      return result;
    }
    let previous = evaluate(low);
    if (previous.error <= tolerance) return previous.share;
    // Wrapping text changes height in steps, so scan before refining a crossing.
    for (let i = 1; i <= 8; i++) {
      const current = evaluate(low + (high - low) * i / 8);
      if (current.error <= tolerance) return current.share;
      if (previous.difference * current.difference < 0) {
        let a = previous, b = current;
        for (let j = 0; j < 8; j++) {
          const middle = evaluate((a.share + b.share) / 2);
          if (middle.error <= tolerance) return middle.share;
          if (a.difference * middle.difference <= 0) b = middle;
          else a = middle;
        }
      }
      previous = current;
    }
    return best && best.error <= tolerance ? best.share : null;
  }

  function mount(document) {
    const rows = [...document.querySelectorAll('.paper-story-figure')];
    if (!rows.length) return;
    const widths = new WeakMap();
    const pending = new Set();
    let frame = 0;

    function setShare(row, share) {
      row.style.setProperty('--figure-text-track', `${share}fr`);
      row.style.setProperty('--figure-image-track', `${1 - share}fr`);
    }
    function fit(row, force) {
      const width = row.getBoundingClientRect().width;
      if (!width || (!force && Math.abs((widths.get(row) || 0) - width) < 1)) return;
      widths.set(row, width);
      const text = row.querySelector('.figure-text');
      const figure = row.querySelector('figure');
      const image = figure.querySelector('img');
      const imageWidth = Number(image.getAttribute('width'));
      const imageHeight = Number(image.getAttribute('height'));
      const padding = parseFloat(getComputedStyle(figure).paddingLeft) * 2;
      const ratio = imageHeight / imageWidth;
      const compactWidth = Number.isFinite(ratio) && ratio > 0 ? Math.min(820, 640 / ratio + padding) : 820;
      row.style.setProperty('--figure-stack-width', `${Math.round(compactWidth)}px`);
      row.classList.remove('is-balanced');
      // Keep both columns wide enough to read; smaller screens use normal flow.
      const available = width - 28;
      if (width < 740 || innerWidth <= 760) return;
      const low = Math.max(.30, 300 / available);
      const high = Math.min(.65, 1 - 320 / available);
      row.classList.add('is-balanced');
      const share = balancedShare(value => {
        setShare(row, value);
        return { textHeight: text.getBoundingClientRect().height, figureHeight: figure.getBoundingClientRect().height };
      }, low, high);
      if (share === null) row.classList.remove('is-balanced');
      else setShare(row, share);
    }
    function schedule(scope = document, force = false) {
      const targets = scope.matches?.('.paper-story-figure') ? [scope] : scope.querySelectorAll('.paper-story-figure');
      targets.forEach(row => { if (force) widths.delete(row); pending.add(row); });
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const batch = [...pending]; pending.clear();
        batch.forEach(row => fit(row, false));
      });
    }
    document.addEventListener('toggle', event => {
      if (event.target.open) schedule(event.target);
    }, true);
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(entries => entries.forEach(entry => schedule(entry.target)));
      document.querySelectorAll('.paper-detail').forEach(detail => observer.observe(detail));
    } else addEventListener('resize', () => schedule(document), { passive: true });
    document.fonts?.ready.then(() => schedule(document, true));
    schedule(document);
  }
  return { balancedShare, mount };
});
