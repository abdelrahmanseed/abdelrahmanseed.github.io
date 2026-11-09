(() => {
  'use strict';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const filters = [...document.querySelectorAll('[data-filter]')];
  const groups = [...document.querySelectorAll('.paper-group')];
  const reset = document.querySelector('.reset-library');
  const status = document.querySelector('.filter-status');
  function filterPapers(theme) {
    let count = 0;
    groups.forEach(group => {
      group.hidden = theme !== 'all' && group.dataset.theme !== theme;
      if (!group.hidden) count += group.querySelectorAll('.paper-item').length;
    });
    filters.forEach(button => {
      const active = button.dataset.filter === theme;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    reset.hidden = theme === 'all';
    status.textContent = `${count} publications shown.`;
    requestUpdate();
  }
  filters.forEach(button => button.addEventListener('click', () => filterPapers(button.dataset.filter)));
  reset.addEventListener('click', () => filterPapers('all'));

  // Reveal nested content before resolving deep links, including browser history.
  function revealTarget(hash, smooth = false, focus = false) {
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch (_) { return; }
    const target = document.getElementById(id);
    if (!target) return;
    const group = target.closest('.paper-group');
    if (group?.hidden) filterPapers('all');
    for (let node = target; node; node = node.parentElement) {
      if (node.matches('details')) node.open = true;
    }
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: smooth && !reducedMotion.matches ? 'smooth' : 'instant', block: 'start' });
      if (focus) {
        const focusTarget = target.matches('details') ? target.querySelector('summary') : target;
        if (!focusTarget.hasAttribute('tabindex')) focusTarget.setAttribute('tabindex', '-1');
        focusTarget.focus({ preventScroll: true });
      }
      requestUpdate();
    });
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (!document.getElementById(link.hash.slice(1))) return;
    event.preventDefault();
    if (location.hash !== link.hash) history.pushState(null, '', link.hash);
    revealTarget(link.hash, true, true);
  });
  addEventListener('hashchange', () => revealTarget(location.hash));
  addEventListener('popstate', () => revealTarget(location.hash));

  // Figure expansion is initialized separately by figure-viewer.js.
  document.querySelectorAll('.copy-citation').forEach(button => button.addEventListener('click', async () => {
    const text = button.closest('.paper-citation').querySelector('code').textContent;
    const label = button.nextElementSibling;
    try {
      await navigator.clipboard.writeText(text);
      label.textContent = 'Copied.';
    } catch (_) {
      label.textContent = 'Select and copy the BibTeX above.';
    }
  }));

  const navLinks = [...document.querySelectorAll('.section-nav a')];
  const navSections = navLinks.map(link => document.querySelector(link.hash));
  const backTop = document.querySelector('.back-top');
  const photo = document.querySelector('.hero-photo');
  const steps = [...document.querySelectorAll('.research-step')];
  const stage = document.querySelector('.research-stage');
  const stageLabels = ['Explore the possibilities', 'Learn the sampling process', 'Connect algorithms to hardware'];
  let targetProgress = 0;
  let stageVisible = false;
  let updatePending = false;
  function requestUpdate() {
    if (updatePending) return;
    updatePending = true;
    requestAnimationFrame(updateScroll);
  }
  function updateScroll() {
    updatePending = false;
    const y = scrollY;
    const height = innerHeight;
    const max = Math.max(1, document.documentElement.scrollHeight - height);
    root.style.setProperty('--reading', String(Math.min(1, y / max)));
    backTop.classList.toggle('is-visible', y > height);
    let current = '';
    navSections.forEach(section => {
      if (section.getBoundingClientRect().top < height * .4) current = section.id;
    });
    navLinks.forEach(link => {
      if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (!reducedMotion.matches) {
      const rect = photo.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (height - rect.top) / height));
      photo.style.setProperty('--photo-inset', `${(innerWidth > 760 ? 32 : 12) * (1 - p)}px`);
      photo.style.setProperty('--photo-radius', `${8 * (1 - p)}px`);
      photo.style.setProperty('--photo-scale', String(1.06 - p * .06));
    }
    const focusLine = innerWidth <= 760 ? height * .8 : height * .5;
    let closest = 0;
    let distance = Infinity;
    const centers = steps.map(step => {
      const r = step.getBoundingClientRect();
      return r.top + r.height / 2;
    });
    centers.forEach((center, i) => {
      if (Math.abs(center - focusLine) < distance) { closest = i; distance = Math.abs(center - focusLine); }
    });
    steps.forEach((step, i) => step.classList.toggle('is-active', i === closest));
    stage.querySelector('.stage-counter').textContent = `0${closest + 1} / 03`;
    document.getElementById('stage-label').textContent = stageLabels[closest];
    const segment = focusLine < centers[1] ? 0 : 1;
    targetProgress = Math.max(0, Math.min(2, segment + (focusLine - centers[segment]) / Math.max(1, centers[segment + 1] - centers[segment])));
    const stageRect = stage.getBoundingClientRect();
    stageVisible = stageRect.bottom > 0 && stageRect.top < height;
    scheduleDraw();
  }
  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate, { passive: true });
  document.addEventListener('toggle', requestUpdate, true);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) requestUpdate(); });

  // A lightweight conceptual visual: free particles → density surface → p-bit lattice.
  // It illustrates the narrative; it is not a research simulation or benchmark.
  const canvas = document.getElementById('sampler-canvas');
  const ctx = canvas.getContext('2d');
  const motionButton = document.querySelector('.motion-toggle');
  const particles = [];
  let seed = 73;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const cols = 35, rows = 26;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) particles.push({ u: col / (cols - 1) * 2 - 1, v: row / (rows - 1) * 2 - 1, x: random(), y: random(), phase: random() * Math.PI * 2, size: random() });
  }
  let width = 0, height = 0, lastTime = 0, elapsed = 0, progress = 0, raf = 0;
  let paused = reducedMotion.matches;
  function setMotionLabel() {
    motionButton.textContent = paused ? 'Play motion' : 'Pause motion';
    motionButton.setAttribute('aria-pressed', String(paused));
  }
  function resizeCanvas() {
    const r = canvas.getBoundingClientRect();
    width = r.width; height = r.height;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    scheduleDraw();
  }
  const mix = (a, b, t) => a + (b - a) * t;
  const ease = t => t * t * (3 - 2 * t);
  function scheduleDraw() {
    if (!raf && ctx && !document.hidden) raf = requestAnimationFrame(draw);
  }
  function draw(now) {
    raf = 0;
    if (!ctx || width === 0) return;
    const dt = lastTime ? Math.min(50, now - lastTime) : 16;
    lastTime = now;
    if (!paused) elapsed += dt * .001;
    // Reduced motion and the pause control show still states, without interpolation.
    progress = paused ? targetProgress : mix(progress, targetProgress, Math.min(1, dt * .008));
    const surface = ease(Math.min(1, progress));
    const hardware = ease(Math.max(0, progress - 1));
    ctx.clearRect(0, 0, width, height);
    const cx = width * .5, cy = height * .53;
    ctx.strokeStyle = 'rgba(216,239,188,.22)'; ctx.lineWidth = .6;
    for (let i = 0; i <= 8; i++) {
      const p = i / 8 * 2 - 1;
      ctx.beginPath(); ctx.moveTo(cx + (p + 1) * width * .24, cy + (p - 1) * height * .16); ctx.lineTo(cx + (p - 1) * width * .24, cy + (p + 1) * height * .16); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + (-1 - p) * width * .24, cy + (-1 + p) * height * .16); ctx.lineTo(cx + (1 - p) * width * .24, cy + (1 + p) * height * .16); ctx.stroke();
    }
    particles.forEach(p => {
      const density = Math.exp(-((p.u + .28) ** 2 * 6 + (p.v - .12) ** 2 * 5)) + .65 * Math.exp(-((p.u - .5) ** 2 * 10 + (p.v + .4) ** 2 * 9));
      const surfaceX = cx + (p.u - p.v) * width * .23;
      const surfaceY = cy + (p.u + p.v) * height * .15 - density * height * .36;
      const freeX = width * (.1 + p.x * .8) + Math.sin(elapsed * .4 + p.phase) * 7;
      const freeY = height * (.12 + p.y * .72) + Math.cos(elapsed * .3 + p.phase) * 6;
      const gridX = width * (.18 + (p.u + 1) / 2 * .64);
      const gridY = height * (.14 + (p.v + 1) / 2 * .66);
      let x = mix(freeX, surfaceX, surface), y = mix(freeY, surfaceY, surface);
      x = mix(x, gridX, hardware); y = mix(y, gridY, hardware);
      const shimmer = paused ? .8 : .65 + Math.sin(elapsed + p.phase) * .2;
      const alpha = mix(.55 + p.size * .4, .45 + density * .5, surface) * shimmer;
      ctx.fillStyle = `rgba(${Math.round(mix(144,216,density / 1.2))},${Math.round(mix(207,239,density / 1.2))},${Math.round(mix(154,188,density / 1.2))},${Math.min(.95, alpha)})`;
      ctx.beginPath(); ctx.arc(x, y, mix(1.8 + p.size * .8, 2.2, hardware), 0, Math.PI * 2); ctx.fill();
    });
    if (stageVisible && !paused && !document.hidden) scheduleDraw();
  }
  motionButton.addEventListener('click', () => { paused = !paused; setMotionLabel(); scheduleDraw(); });
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; setMotionLabel(); requestUpdate(); });
  if ('ResizeObserver' in window) new ResizeObserver(resizeCanvas).observe(canvas);
  else addEventListener('resize', resizeCanvas);
  setMotionLabel(); resizeCanvas(); requestUpdate();

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('is-waiting'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(element => { element.classList.add('is-waiting'); observer.observe(element); });
  }
  if (location.hash) revealTarget(location.hash);
})();
