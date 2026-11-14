'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../assets/js/embed-focus.js'), 'utf8');

function setup({ y = 0, frameY = 8000, hidden = false, box = true } = {}) {
  const events = {}, microtasks = [], frames = [], restored = [];
  const register = (type, callback) => { (events[type] ||= []).push(callback); };
  const document = { hidden, activeElement: null, addEventListener: register };
  const context = {
    document, scrollX: 12, scrollY: y, innerHeight: 900,
    performance: { now: () => 500 },
    addEventListener: register,
    queueMicrotask: callback => microtasks.push(callback),
    requestAnimationFrame: callback => frames.push(callback),
    scrollTo(position) { restored.push(position); context.scrollY = position.top; context.scrollX = position.left; }
  };
  const frame = {
    blurred: false,
    matches: selector => box && selector === 'iframe[data-box-embed]',
    getBoundingClientRect: () => ({ top: frameY - context.scrollY, bottom: frameY + 340 - context.scrollY }),
    blur() { this.blurred = true; document.activeElement = null; }
  };
  vm.runInNewContext(source, context);
  const emit = (type, event = {}) => (events[type] || []).forEach(callback => callback(event));
  const flushMicrotasks = () => { while (microtasks.length) microtasks.shift()(); };
  const flushFrames = () => { while (frames.length) frames.shift()(); };
  return { context, document, frame, restored, emit, flushMicrotasks, flushFrames,
    autofocus() {
      // The parent loses focus before the child focus() scrolls its target.
      emit('blur'); document.activeElement = frame; context.scrollY = frameY;
    }
  };
}

for (const y of [0, 4500]) {
  const site = setup({ y });
  site.autofocus(); site.flushMicrotasks(); site.flushFrames();
  assert.equal(site.context.scrollY, y, 'Offscreen Box focus must preserve the reader’s position.');
  assert.equal(site.context.scrollX, 12);
  assert.equal(site.restored[0].behavior, 'instant');
  assert(site.frame.blurred);
}

// Also handle a browser checkpoint between focus updates and the actual scroll.
const early = setup({ y: 3500 });
early.emit('blur'); early.document.activeElement = early.frame;
early.flushMicrotasks(); early.context.scrollY = 8000; early.flushFrames();
assert.equal(early.context.scrollY, 3500);

for (const options of [{ y: 7600 }, { hidden: true }, { box: false }]) {
  const site = setup(options);
  site.autofocus(); site.flushMicrotasks(); site.flushFrames();
  assert.equal(site.restored.length, 0, 'Visible players, hidden tabs and unrelated frames must not be intercepted.');
}

for (const key of [{ key: 'Tab' }, { key: 'Tab', shiftKey: true }, { key: 'F6' }, { key: 'f', metaKey: true }]) {
  const site = setup();
  site.emit('keydown', key); site.autofocus(); site.flushMicrotasks(); site.flushFrames();
  assert.equal(site.restored.length, 0, 'Keyboard focus navigation must remain usable.');
}

for (const event of ['click', 'pointerdown', 'touchstart', 'wheel', 'hashchange', 'popstate', 'pagehide']) {
  for (const beforeMicrotask of [true, false]) {
    const site = setup();
    site.autofocus();
    if (!beforeMicrotask) site.flushMicrotasks();
    site.emit(event); site.context.scrollY = 5000;
    site.flushMicrotasks(); site.flushFrames();
    assert.equal(site.context.scrollY, 5000, `${event} must cancel a pending restoration.`);
  }
}

const hiddenLater = setup();
hiddenLater.autofocus(); hiddenLater.flushMicrotasks(); hiddenLater.document.hidden = true;
hiddenLater.flushFrames(); assert.equal(hiddenLater.restored.length, 0);
const focusMoved = setup();
focusMoved.autofocus(); focusMoved.flushMicrotasks(); focusMoved.document.activeElement = null;
focusMoved.flushFrames(); assert.equal(focusMoved.restored.length, 0);
const untouched = setup({ y: 4500 });
untouched.flushMicrotasks(); untouched.flushFrames();
assert.equal(untouched.context.scrollY, 4500, 'Initialization must not override browser scroll restoration.');

console.log('PASS: offscreen embed focus, initial and mid-page positions, keyboard access, visible-player interaction, navigation cancellation, and background tabs.');
