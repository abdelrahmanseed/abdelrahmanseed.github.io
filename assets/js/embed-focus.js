/* Box can focus its offscreen preview on load and scroll the whole page. */
(() => {
  'use strict';
  let navigation = 0;
  let keyboardFocusUntil = 0;
  const cancelRestore = () => { navigation++; };

  // Never undo a new user gesture, section link, or browser-history navigation.
  ['pointerdown', 'touchstart', 'wheel', 'click'].forEach(type => {
    document.addEventListener(type, cancelRestore, { capture: true, passive: true });
  });
  document.addEventListener('keydown', event => {
    cancelRestore();
    if (event.key === 'Tab' || event.key === 'F6' || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f')) {
      keyboardFocusUntil = performance.now() + 1000;
    }
  }, true);
  ['hashchange', 'popstate', 'pagehide'].forEach(type => addEventListener(type, cancelRestore));

  // Fallback for browsers without the iframe focus permissions policy. Focus
  // changes precede focus-induced scrolling; capture the position at that point.
  addEventListener('blur', () => {
    if (document.hidden || performance.now() < keyboardFocusUntil) return;
    const x = scrollX, y = scrollY, version = navigation;
    queueMicrotask(() => {
      const frame = document.activeElement;
      if (document.hidden || version !== navigation || !frame?.matches('iframe[data-box-embed]')) return;
      const rect = frame.getBoundingClientRect();
      const top = rect.top + scrollY - y;
      const bottom = rect.bottom + scrollY - y;
      if (top < innerHeight && bottom > 0) return;
      requestAnimationFrame(() => {
        if (document.hidden || version !== navigation || document.activeElement !== frame) return;
        frame.blur();
        scrollTo({ left: x, top: y, behavior: 'instant' });
      });
    });
  });
})();
