(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const showcase = document.querySelector('.research-showcase');
  if (showcase) {
    const masthead = document.querySelector('.masthead');
    const updateHeaderHeight = () => showcase.style.setProperty('--research-header-height', `${masthead.getBoundingClientRect().height}px`);
    updateHeaderHeight();
    if ('ResizeObserver' in window) new ResizeObserver(updateHeaderHeight).observe(masthead);
    else window.addEventListener('resize', updateHeaderHeight);
    document.querySelectorAll('.research-nav a[href^="#"], .research-hero a[href^="#"], .paper-actions a[href^="#"], .entry-content a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = document.getElementById(link.hash.slice(1));
        if (!target) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        history.pushState(null, '', link.hash);
        if (target.matches('details')) target.open = true;
        target.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
      }, true);
    });
  }

  const dialog = document.querySelector('.figure-viewer');
  if (dialog && typeof dialog.showModal === 'function') {
    const image = dialog.querySelector('img');
    const caption = dialog.querySelector('.figure-viewer__caption');
    document.querySelectorAll('[data-figure-open]').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        image.src = link.href;
        image.alt = link.querySelector('img').alt;
        caption.textContent = link.dataset.caption;
        dialog.showModal();
      });
    });
    dialog.querySelector('[data-figure-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  }

  if ('IntersectionObserver' in window) {
    const chapters = document.querySelectorAll('.research-chapter, .research-index');
    const navLinks = document.querySelectorAll('.research-nav a');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    chapters.forEach((chapter) => observer.observe(chapter));
  }
})();
