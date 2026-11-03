'use strict';
const assert = require('node:assert/strict');
const { balancedShare, mount } = require('../assets/js/figure-layout.js');
const heights = share => ({ textHeight: 500 - 400 * share, figureHeight: 250 + 100 * share });
const share = balancedShare(heights, .3, .65);
assert(share >= .3 && share <= .65);
assert(Math.abs(heights(share).textHeight - heights(share).figureHeight) <= 8);
assert.equal(balancedShare(() => ({ textHeight: 150, figureHeight: 500 }), .3, .65), null, 'A large unfixable gap should use stacked flow.');
assert.equal(balancedShare(s => ({ textHeight: s < .5 ? 500 : 300, figureHeight: 400 }), .3, .65), null, 'A line-wrap jump must not be accepted as a balanced pair.');
assert.equal(balancedShare(() => { throw Error('Must not measure cramped columns'); }, .7, .6), null);

function row(width, measure) {
  const classes = new Set(), properties = new Map();
  const result = {
    width,
    style: { setProperty(name,value) { properties.set(name,value); } },
    classList: { add(name) { classes.add(name); }, remove(name) { classes.delete(name); } },
    getBoundingClientRect() { return { width:this.width }; },
    querySelector(selector) {
      if (selector === '.figure-text') return { getBoundingClientRect: () => ({ height:measure(parseFloat(properties.get('--figure-text-track')) || .44).textHeight }) };
      if (selector === 'figure') return {
        getBoundingClientRect: () => ({ height:measure(parseFloat(properties.get('--figure-text-track')) || .44).figureHeight }),
        querySelector: () => ({ getAttribute: name => name === 'width' ? '1000' : '700' })
      };
      throw Error(selector);
    },
    classes, properties
  };
  return result;
}
const balanced = row(1100, heights), unmatched = row(1100, () => ({textHeight:150,figureHeight:500})), narrow = row(600, heights);
const rows = [balanced, unmatched, narrow], frames = [], events = {};
const document = { querySelectorAll: selector => selector === '.paper-story-figure' ? rows : [], addEventListener() {} };
const prior = {};
const mocks = {
 window:{}, innerWidth:1440,
 getComputedStyle:() => ({paddingLeft:'14px'}),
 requestAnimationFrame:fn => { frames.push(fn); return frames.length; },
 addEventListener:(name,fn) => { events[name]=fn; }
};
try {
 for (const [key,value] of Object.entries(mocks)) { prior[key]=globalThis[key]; globalThis[key]=value; }
 const flush = () => { while(frames.length) frames.shift()(); };
 mount(document); flush();
 assert(balanced.classes.has('is-balanced'));
 assert(!unmatched.classes.has('is-balanced'));
 assert(!narrow.classes.has('is-balanced'));
 assert.equal(balanced.properties.get('--figure-stack-width'),'820px');
 balanced.width=600;events.resize();flush();
 assert(!balanced.classes.has('is-balanced'),'Resizing to a narrow container must remove the paired layout.');
 balanced.width=1100;events.resize();flush();
 assert(balanced.classes.has('is-balanced'),'Returning to a wide container must rebalance.');
} finally {
 for (const key of Object.keys(mocks)) { if(prior[key]===undefined)delete globalThis[key];else globalThis[key]=prior[key]; }
}
console.log('PASS: paired heights within 8px, no false match across text wrapping, stacked fallback for gaps/narrow screens, and responsive rebalancing.');
