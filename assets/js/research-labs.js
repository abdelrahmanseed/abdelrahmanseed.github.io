/* Interactive, explicitly idealized examples. No external libraries or requests. */
(() => {
  'use strict';
  const models = window.ResearchModels;
  if (!models) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const svgNS = 'http://www.w3.org/2000/svg';
  const players = [];
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const pointPath = points => points.map(([x, y], i) => `${i ? 'L' : 'M'} ${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');

  // Run only inside the viewport; an explicit pause survives scrolling away
  // and back. Reduced motion always suppresses automatic playback.
  function createPlayer(element, tick, onStateChange) {
    let enabled = true, running = false, frame = 0, lastTime = 0;
    function visible() {
      const rect = element.getBoundingClientRect();
      return !document.hidden && !element.closest('[hidden]') && rect.bottom > 0 && rect.top < innerHeight;
    }
    function stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
      onStateChange(false);
    }
    function draw(now) {
      if (!running) return;
      if (!enabled || reducedMotion.matches || !visible()) { stop(); return; }
      const dt = lastTime ? clamp(now - lastTime, 0, 50) : 0;
      lastTime = now;
      tick(dt);
      frame = requestAnimationFrame(draw);
    }
    function refresh() {
      if (!enabled || reducedMotion.matches || !visible()) { stop(); return; }
      if (running) return;
      running = true; lastTime = 0;
      onStateChange(true);
      frame = requestAnimationFrame(draw);
    }
    const player = {
      element,
      get running() { return running; },
      get enabled() { return enabled; },
      start() { enabled = true; refresh(); },
      pause() { enabled = false; stop(); },
      stop,
      refresh
    };
    players.push(player);
    return player;
  }
  const refreshPlayers = () => players.forEach(player => player.refresh());
  document.addEventListener('visibilitychange', refreshPlayers);
  reducedMotion.addEventListener('change', refreshPlayers);

  const sampling = document.querySelector('[data-lab="sampling"]');
  if (sampling) {
    const slider = sampling.querySelector('input');
    const output = sampling.querySelector('#sampling-temperature-value');
    const readout = sampling.querySelector('[data-sampling-readout]');
    const curve = sampling.querySelector('[data-sampling-curve]');
    const bars = sampling.querySelector('[data-sampling-bars]');
    const pauseButton = sampling.querySelector('[data-sampling-pause]');
    let model, counts, total = 0, sinceBatch = 0;
    const rectangles = Array.from({ length: 61 }, () => {
      const rect = document.createElementNS(svgNS, 'rect');
      rect.setAttribute('class', 'lab-histogram-bar');
      bars.append(rect);
      return rect;
    });
    function render() {
      const observed = counts.map(count => total ? count / total : 0);
      const maximum = Math.max(...model.probabilities, ...observed) * 1.12;
      const x = i => 24 + 592 * i / (counts.length - 1);
      const y = probability => 228 - probability / maximum * 202;
      curve.setAttribute('d', pointPath(model.probabilities.map((probability, i) => [x(i), y(probability)])));
      rectangles.forEach((rect, i) => {
        const top = y(observed[i]);
        rect.setAttribute('x', String(x(i) - 3.8));
        rect.setAttribute('y', String(top));
        rect.setAttribute('width', '7.6');
        rect.setAttribute('height', String(228 - top));
      });
      if (total) {
        const right = counts.reduce((sum, count, i) => sum + (model.positions[i] > 0 ? count : 0), 0);
        readout.textContent = `${total.toLocaleString()} samples · ${Math.round(100 * right / total)}% in the right-hand well.`;
      } else {
        const right = model.probabilities.reduce((sum, probability, i) => sum + (model.positions[i] > 0 ? probability : 0), 0);
        readout.textContent = `The model puts ${Math.round(right * 100)}% of its probability in the right-hand well. Draw samples to compare.`;
      }
    }
    function takeSamples(amount) {
      for (let i = 0; i < amount; i++) counts[models.sampleIndex(model.probabilities)]++;
      total += amount; render();
    }
    const player = createPlayer(sampling, dt => {
      sinceBatch += dt;
      if (sinceBatch >= 150) { takeSamples(20); sinceBatch %= 150; }
    }, running => {
      pauseButton.textContent = running ? 'Pause animation' : 'Resume animation';
      sampling.querySelector('[data-sampling-readout]').setAttribute('aria-live', running ? 'off' : 'polite');
    });
    function reset() {
      player.stop();
      const temperature = Number(slider.value);
      output.value = temperature.toFixed(1);
      model = models.boltzmann(temperature);
      counts = new Array(model.positions.length).fill(0);
      total = 0; sinceBatch = 0; render();
      player.refresh();
    }
    slider.addEventListener('input', reset);
    sampling.querySelector('[data-sampling-draw]').addEventListener('click', () => {
      takeSamples(200);
    });
    pauseButton.addEventListener('click', () => { if (player.running) player.pause(); else player.start(); });
    const setPauseVisibility = () => { pauseButton.hidden = reducedMotion.matches; };
    reducedMotion.addEventListener('change', setPauseVisibility);
    setPauseVisibility();
    sampling.querySelector('[data-sampling-reset]').addEventListener('click', () => { slider.value = '0.8'; reset(); });
    reset();
  }

  const bits = document.querySelector('[data-lab="bits"]');
  if (bits) {
    const slider = bits.querySelector('input');
    const output = bits.querySelector('#bit-bias-value');
    const probabilityOutput = bits.querySelector('#bit-probability');
    const cells = [...bits.querySelectorAll('.bit-cell')];
    const readout = bits.querySelector('[data-bits-readout]');
    const button = bits.querySelector('[data-bits-run]');
    let probability = .5, ones = 0, total = 0, sinceBatch = 0, sinceReadout = 0;
    function sample(batches = 1) {
      for (let batch = 0; batch < batches; batch++) {
        cells.forEach(cell => {
          const bit = Math.random() < probability ? 1 : 0;
          ones += bit; total++;
          if (batch === batches - 1) { cell.dataset.bit = String(bit); cell.textContent = String(bit); }
        });
      }
    }
    function announce() {
      readout.textContent = `${total.toLocaleString()} samples · ${((ones / Math.max(1, total)) * 100).toFixed(1)}% ones observed.`;
    }
    function setBitButton() {
      button.textContent = reducedMotion.matches ? 'Sample bits' : player.running ? 'Pause animation' : 'Resume animation';
    }
    const player = createPlayer(bits, dt => {
      sinceBatch += dt; sinceReadout += dt;
      if (sinceBatch >= 120) { sample(); sinceBatch %= 120; }
      if (sinceReadout >= 600) { announce(); sinceReadout %= 600; }
    }, running => {
      readout.setAttribute('aria-live', running ? 'off' : 'polite');
      setBitButton(); announce();
    });
    function reset() {
      player.stop();
      const bias = Number(slider.value);
      output.value = `${bias > 0 ? '+' : ''}${bias.toFixed(1)}`;
      probability = models.bitProbability(bias);
      probabilityOutput.value = `${(probability * 100).toFixed(1)}%`;
      ones = 0; total = 0; sinceBatch = 0; sinceReadout = 0;
      sample(); announce(); setBitButton(); player.refresh();
    }
    slider.addEventListener('input', reset);
    button.addEventListener('click', () => {
      if (reducedMotion.matches) { sample(50); announce(); return; }
      if (player.running) player.pause(); else player.start();
    });
    reducedMotion.addEventListener('change', setBitButton);
    bits.querySelector('[data-bits-reset]').addEventListener('click', () => { slider.value = '0'; reset(); });
    reset();
  }

  const oscillators = document.querySelector('[data-lab="oscillators"]');
  if (oscillators) {
    const slider = oscillators.querySelector('input');
    const output = oscillators.querySelector('#oscillator-coupling-value');
    const readout = oscillators.querySelector('[data-oscillators-readout]');
    const button = oscillators.querySelector('[data-oscillators-play]');
    const firstCurve = oscillators.querySelector('[data-oscillator-one]');
    const secondCurve = oscillators.querySelector('[data-oscillator-two]');
    const massOne = oscillators.querySelector('[data-mass-one]');
    const massTwo = oscillators.querySelector('[data-mass-two]');
    const leftSpring = oscillators.querySelector('[data-spring-left]');
    const middleSpring = oscillators.querySelector('[data-spring-middle]');
    const rightSpring = oscillators.querySelector('[data-spring-right]');
    const playhead = oscillators.querySelector('[data-oscillator-playhead]');
    let coupling = .4, time = 0, sinceReadout = 0;
    function spring(from, to) {
      const points = [[from, 54], [from + 8, 54]];
      for (let i = 0; i <= 14; i++) points.push([from + 12 + (to - from - 24) * i / 14, i === 0 || i === 14 ? 54 : 54 + (i % 2 ? 7 : -7)]);
      points.push([to - 8, 54], [to, 54]);
      return pointPath(points);
    }
    function renderPosition() {
      const state = models.oscillators(time, coupling);
      const x1 = 180 + state.x1 * 40, x2 = 440 + state.x2 * 40;
      massOne.setAttribute('x', String(x1 - 16)); massTwo.setAttribute('x', String(x2 - 16));
      leftSpring.setAttribute('d', spring(24, x1 - 16));
      middleSpring.setAttribute('d', spring(x1 + 16, x2 - 16));
      rightSpring.setAttribute('d', spring(x2 + 16, 616));
      const head = 24 + 592 * time / 24;
      playhead.setAttribute('d', `M ${head.toFixed(2)} 128 V 270`);
      return state;
    }
    function announce() {
      const state = models.oscillators(time, coupling);
      readout.textContent = `Time ${time.toFixed(1)} · displacement 1: ${state.x1.toFixed(2)} · displacement 2: ${state.x2.toFixed(2)}.`;
    }
    function setButton() {
      button.textContent = reducedMotion.matches ? 'Advance snapshot' : player.running ? 'Pause animation' : 'Resume animation';
    }
    const player = createPlayer(oscillators, dt => {
      time = (time + dt * .004) % 24;
      sinceReadout += dt;
      renderPosition();
      if (sinceReadout >= 600) { announce(); sinceReadout %= 600; }
    }, running => {
      readout.setAttribute('aria-live', running ? 'off' : 'polite');
      setButton(); announce();
    });
    function reset() {
      player.stop(); coupling = Number(slider.value); time = 0; sinceReadout = 0;
      output.value = coupling.toFixed(2);
      const first = [], second = [];
      for (let i = 0; i <= 480; i++) {
        const t = 24 * i / 480, state = models.oscillators(t, coupling), x = 24 + 592 * i / 480;
        first.push([x, 199 - state.x1 * 60]); second.push([x, 199 - state.x2 * 60]);
      }
      firstCurve.setAttribute('d', pointPath(first)); secondCurve.setAttribute('d', pointPath(second));
      renderPosition(); setButton(); announce(); player.refresh();
    }
    slider.addEventListener('input', reset);
    button.addEventListener('click', () => {
      if (player.running) { player.pause(); return; }
      if (reducedMotion.matches) {
        time = time >= 24 ? 0 : time < 12 ? 12 : 24;
        renderPosition(); announce(); return;
      }
      player.start();
    });
    oscillators.querySelector('[data-oscillators-reset]').addEventListener('click', () => { slider.value = '0.4'; reset(); });
    reducedMotion.addEventListener('change', setButton);
    reset();
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(refreshPlayers, { threshold: 0 });
    players.forEach(player => observer.observe(player.element));
  } else {
    let pending = false;
    addEventListener('scroll', () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => { pending = false; refreshPlayers(); });
    }, { passive: true });
  }
  addEventListener('resize', refreshPlayers, { passive: true });
  if ('MutationObserver' in window) {
    new MutationObserver(refreshPlayers).observe(document.body, { attributes: true, subtree: true, attributeFilter: ['hidden'] });
  }
  refreshPlayers();
})();
