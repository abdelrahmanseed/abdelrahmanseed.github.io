'use strict';
const assert = require('node:assert/strict');
const { boltzmann, sampleIndex, bitProbability, oscillators } = require('../assets/js/research-models.js');
const near = (actual, expected, tolerance = 1e-11) => assert(Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected}`);

let previousMean = -Infinity;
for (const temperature of [.2, .4, .8, 1.5, 3]) {
  const model = boltzmann(temperature);
  near(model.probabilities.reduce((a, b) => a + b, 0), 1);
  assert(model.probabilities.every(value => Number.isFinite(value) && value >= 0));
  const mean = model.energies.reduce((sum, energy, i) => sum + energy * model.probabilities[i], 0);
  assert(mean > previousMean, 'Mean energy must increase with temperature for this fixed landscape.');
  previousMean = mean;
}
assert.throws(() => boltzmann(0), RangeError);
assert.throws(() => boltzmann(NaN), RangeError);
assert.throws(() => boltzmann(1, 1), RangeError);

// Check the actual sampling rule against a known distribution, with a repeatable RNG.
let seed = 97;
const random = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646; };
const counts = [0, 0, 0];
for (let i = 0; i < 30000; i++) counts[sampleIndex([.2, .3, .5], random)]++;
[.2, .3, .5].forEach((expected, i) => near(counts[i] / 30000, expected, .012));
assert.equal(sampleIndex([0, 1], () => 0), 1);
assert.equal(sampleIndex([1, 0], () => .999), 0);

near(bitProbability(0), .5);
for (const bias of [.1, .5, 1, 2]) {
  near(bitProbability(-bias), 1 - bitProbability(bias));
  assert(bitProbability(bias) > .5 && bitProbability(bias) < 1);
}
assert(bitProbability(2) > .98);
assert(bitProbability(-2) < .02);

// Conservation of total energy independently checks the normal-mode solution.
for (const coupling of [0, .05, .4, 1, 1.5]) {
  const initial = oscillators(0, coupling);
  near(initial.x1, 1); near(initial.x2, 0); near(initial.v1, 0); near(initial.v2, 0);
  const initialEnergy = (1 + coupling) / 2;
  for (let i = 0; i <= 1000; i++) {
    const t = i / 10, state = oscillators(t, coupling);
    near(state.totalEnergy, initialEnergy);
    if (coupling === 0) { near(state.x2, 0); near(state.v2, 0); near(state.x1, Math.cos(t)); }
  }
}
assert.throws(() => oscillators(1, -.1), RangeError);
console.log('PASS: Boltzmann normalization and temperature response, weighted sampling, p-bit probabilities, oscillator initial conditions, and energy conservation.');
