---
permalink: /
title: "Abdelrahman S. Abdelrahman"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<section class="home-hero" aria-labelledby="home-title">
  <p class="section-kicker home-hero__role">PhD candidate in Electrical and Computer Engineering at UC Santa Barbara · <a href="https://opus.ece.ucsb.edu" target="_blank" rel="noopener">OPUS Lab</a></p>
  <div class="home-hero__visual">
    <picture>
      <source srcset="/images/gibbs-density-hero.webp" type="image/webp">
      <img src="/images/gibbs-density-hero-poster.png" alt="Animated density estimate from a Gibbs sampler converging toward a smooth bivariate distribution">
    </picture>
    <div class="home-hero__visual-copy">
      <p class="section-kicker">Sampling / Optimization / Learning</p>
      <h1 id="home-title">Probabilistic machine intelligence</h1>
    </div>
  </div>
  <p class="home-hero__lede">I develop algorithms that learn how to sample, then implement them on stochastic hardware to solve combinatorial optimization problems.</p>
  <div class="home-hero__actions" aria-label="Primary links">
    <a href="{{ '/files/CV.pdf' | relative_url }}" class="btn-cv" target="_blank" rel="noopener"><i class="fa-solid fa-file-lines" aria-hidden="true"></i> View CV</a>
    <a href="{{ '/research/#publications' | relative_url }}" class="btn-ghost"><i class="fa-solid fa-book-open" aria-hidden="true"></i> Papers</a>
    <a href="mailto:abdelrahman@ucsb.edu" class="btn-ghost"><i class="fa-solid fa-envelope" aria-hidden="true"></i> Contact</a>
  </div>
</section>

<section class="selected-work" aria-labelledby="selected-work-title">
  <div class="section-heading">
    <p class="section-kicker">Selected work</p>
    <h2 id="selected-work-title">Papers</h2>
  </div>
  <div class="work-list">
    {% assign selected_publication_urls = "/publication/paoa|/publication/paoaSPAD|/publication/ising-machines-generative-ai" | split: "|" %}
    {% for publication_url in selected_publication_urls %}
      {% assign paper = site.publications | where: "permalink", publication_url | first %}
      <a href="{{ paper.url | relative_url }}" class="work-item">
        <span>{{ paper.venue }}, {{ paper.date | date: "%Y" }}{% if paper.publication_status %} · {{ paper.publication_status }}{% endif %}</span>
        <strong>{{ paper.title }}</strong>
      </a>
    {% endfor %}
  </div>
</section>

<section class="selected-work" aria-labelledby="applied-work-title">
  <div class="section-heading">
    <p class="section-kicker">Implementation and teaching</p>
    <h2 id="applied-work-title">Beyond the papers</h2>
  </div>
  <div class="metric-strip">
    <div>
      <strong>64 × 64 SPAD array</strong>
      <span>Implemented probabilistic optimization on stochastic CMOS hardware.</span>
      <a class="feature-link" href="{{ '/portfolio/paoa-spad/' | relative_url }}">Hardware and code <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
    </div>
    <div>
      <strong>100+ cameras</strong>
      <span>Deployed real-time computer vision for crowd management at the Saudi Water Authority.</span>
      <a class="feature-link" href="{{ '/portfolio/computer-vision-systems/' | relative_url }}">Vision systems <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
    </div>
    <div>
      <strong>Probabilistic computing course</strong>
      <span>Designed and taught a UCSB summer course, with open notebooks for sampling and optimization.</span>
      <a class="feature-link" href="{{ '/teaching/probabilistic-computing' | relative_url }}">Course materials <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
    </div>
  </div>
</section>
