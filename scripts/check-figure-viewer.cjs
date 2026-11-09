'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../assets/js/figure-viewer.js'), 'utf8');

// Exercise the DOM boundary without a browser or an additional test dependency.
function setup({ present = true, supported = true, complete = true } = {}) {
  const events = {};
  const image = {};
  const caption = {};
  const closeButton = { addEventListener(type, listener) { events.closeButton = listener; } };
  const dialog = {
    open: false,
    querySelector(selector) {
      return { img: image, '.figure-viewer__caption': complete ? caption : null, '[data-figure-close]': closeButton }[selector];
    },
    showModal() { this.open = true; },
    close() { this.open = false; },
    addEventListener(type, listener) { events.dialog = listener; },
    getBoundingClientRect() { return { left: 10, right: 100, top: 10, bottom: 100 }; }
  };
  if (!supported) dialog.showModal = undefined;
  const document = {
    querySelector() { return present ? dialog : null; },
    addEventListener(type, listener) { events.document = listener; }
  };
  vm.runInNewContext(source, { document });
  return { events, dialog, image, caption };
}

function figure(title = 'Figure 1', withImage = true) {
  return {
    href: 'https://example.com/figure.webp',
    dataset: { caption: title },
    querySelector() { return withImage ? { alt: title + ': original description' } : null; }
  };
}

function click(link, overrides = {}) {
  return {
    button: 0,
    defaultPrevented: false,
    target: { closest() { return link; } },
    preventDefault() { this.defaultPrevented = true; },
    ...overrides
  };
}

const viewer = setup();
const link = figure();
const event = click(link);
viewer.events.document(event);
assert(event.defaultPrevented);
assert(viewer.dialog.open);
assert.equal(viewer.image.src, link.href);
assert.equal(viewer.image.alt, 'Figure 1: original description');
assert.equal(viewer.caption.textContent, 'Figure 1');

viewer.events.dialog({ target: viewer.dialog, clientX: 50, clientY: 50 });
assert(viewer.dialog.open, 'Clicks inside the dialog must not close it.');
viewer.events.dialog({ target: viewer.dialog, clientX: 0, clientY: 50 });
assert(!viewer.dialog.open, 'Clicks on the backdrop close the dialog.');

// A figure created after initialization must work through the delegated listener.
viewer.events.document(click(figure('Figure S2')));
assert.equal(viewer.caption.textContent, 'Figure S2');
viewer.events.closeButton();
assert(!viewer.dialog.open);

for (const modifiers of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
  const modified = click(link, modifiers);
  viewer.events.document(modified);
  assert(!modified.defaultPrevented, 'Modified clicks must keep normal browser navigation.');
  assert(!viewer.dialog.open);
}
for (const target of [null, figure('Missing image', false)]) {
  const ignored = click(target);
  viewer.events.document(ignored);
  assert(!ignored.defaultPrevented);
}
viewer.events.document(click(link, { defaultPrevented: true }));
assert(!viewer.dialog.open, 'Do not intercept events already handled elsewhere.');
for (const options of [{ present: false }, { supported: false }, { complete: false }]) {
  assert.equal(setup(options).events.document, undefined, 'Keep image links usable when the enhancement cannot initialize.');
}

console.log('PASS: figure captions, image descriptions, close controls, dynamic figures, modified clicks, and native-link fallbacks.');
