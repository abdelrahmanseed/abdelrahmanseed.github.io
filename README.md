## Abdelrahman S. Abdelrahman

PhD candidate in Electrical and Computer Engineering at UC Santa Barbara, OPUS Lab.

I develop learning-based sampling and probabilistic optimization algorithms, with implementations on FPGA and single-photon avalanche diode arrays.

This repository powers [abdelrahmanseed.github.io](https://abdelrahmanseed.github.io).

- [CV](https://abdelrahmanseed.github.io/files/CV.pdf)
- [Research and publications](https://abdelrahmanseed.github.io/research/)
- [Teaching materials](https://abdelrahmanseed.github.io/teaching/)
- Contact: abdelrahman@ucsb.edu

The homepage is a complete one-page portfolio with inline paper stories, teaching materials, applied work, experience, and talks. Publication content comes from `_publications/` and `_data/paper_stories.yml`; courses come from `_teaching/`. Existing standalone URLs remain available.

To preview locally with live reload:

```sh
bundle exec jekyll serve --host 127.0.0.1 --port 4001 --livereload
```

Open <http://127.0.0.1:4001/>. The one-page presentation uses `_layouts/one-page.html`, `assets/css/one-page.css`, and `assets/js/one-page.js`. Motion respects the visitor’s reduced-motion preference; the research animation also has a pause control.

Three interactive examples accompany the learning, hardware, and physics research themes: temperature-dependent Boltzmann sampling, idealized p-bits, and coupled oscillators. These are illustrative mathematical models, rather than reproductions of the papers’ measurements. Animations run while visible, pause when hidden, respect manual pause controls, and support reduced motion. Their numerical checks run with `node scripts/check-research-models.cjs`.
