/* Small, idealized mathematical models shared by the UI and numerical checks. */
(function (root, factory) {
  'use strict';
  const models = factory();
  if (typeof module === 'object' && module.exports) module.exports = models;
  else root.ResearchModels = models;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  function energy(x) {
    return 0.12 * (x * x - 4) ** 2 + 0.35 * x;
  }
  function boltzmann(temperature, bins = 61) {
    if (!Number.isFinite(temperature) || temperature <= 0) throw new RangeError('Temperature must be positive.');
    if (!Number.isInteger(bins) || bins < 2) throw new RangeError('At least two bins are required.');
    const positions = Array.from({ length: bins }, (_, i) => -3 + 6 * i / (bins - 1));
    const energies = positions.map(energy);
    const minimum = Math.min(...energies);
    const weights = energies.map(value => Math.exp(-(value - minimum) / temperature));
    const total = weights.reduce((sum, value) => sum + value, 0);
    return { positions, energies, probabilities: weights.map(value => value / total) };
  }
  function sampleIndex(probabilities, random = Math.random) {
    let remaining = random();
    for (let i = 0; i < probabilities.length - 1; i++) {
      remaining -= probabilities[i];
      if (remaining < 0) return i;
    }
    return probabilities.length - 1;
  }
  // For a ±1 p-bit with mean tanh(input), P(+1) = (1 + tanh(input)) / 2.
  // The UI labels its two output states 0 and 1.
  function bitProbability(input) {
    return (1 + Math.tanh(input)) / 2;
  }
  // Unit masses and wall springs, coupling k, initial x1=1, x2=v1=v2=0.
  // The symmetric/antisymmetric normal modes have frequencies 1 and sqrt(1+2k).
  function oscillators(time, coupling) {
    if (!Number.isFinite(coupling) || coupling < 0) throw new RangeError('Coupling must be nonnegative.');
    const omega = Math.sqrt(1 + 2 * coupling);
    const x1 = (Math.cos(time) + Math.cos(omega * time)) / 2;
    const x2 = (Math.cos(time) - Math.cos(omega * time)) / 2;
    const v1 = -(Math.sin(time) + omega * Math.sin(omega * time)) / 2;
    const v2 = -(Math.sin(time) - omega * Math.sin(omega * time)) / 2;
    const totalEnergy = (v1 * v1 + v2 * v2 + x1 * x1 + x2 * x2 + coupling * (x1 - x2) ** 2) / 2;
    return { x1, x2, v1, v2, totalEnergy };
  }
  return Object.freeze({ energy, boltzmann, sampleIndex, bitProbability, oscillators });
});
