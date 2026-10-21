---
title: "Research and publications"
permalink: /research/
layout: single
hide_page_title: true
---

<section class="page-intro">
  <h1 class="section-kicker section-kicker--lead">Learning how to sample</h1>
  <p>I develop <strong>variational Monte Carlo algorithms</strong> for combinatorial optimization, with implementations on FPGA and single-photon avalanche diode arrays.</p>
</section>

<section class="research-map" aria-label="Research contributions">
  <article>
    <h2>PAOA</h2>
    <p>The Probabilistic Approximate Optimization Algorithm learns annealing schedules and coupling parameters for spin-glass optimization.</p>
    <a class="feature-link" href="{{ '/publication/paoa' | relative_url }}">Paper and code <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
  </article>
  <article>
    <h2>Algorithms on stochastic hardware</h2>
    <p>Implemented variational annealing on FPGA and probabilistic optimization on a 64 × 64 SPAD array, adapting sampling to real device behavior.</p>
    <a class="feature-link" href="{{ '/publication/paoaSPAD' | relative_url }}">SPAD implementation <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
  </article>
</section>

<figure class="wide-figure">
  <img src="{{ '/images/PAOA.png' | relative_url }}" alt="PAOA workflow showing learned sampling and optimization">
</figure>

<section id="publications" class="research-publications" aria-labelledby="publications-title">
  <div class="page-intro page-intro--compact">
    <h2 id="publications-title" class="section-kicker section-kicker--lead">Publications</h2>
    <p><a href="{{ '/files/CV.pdf' | relative_url }}">Full CV</a>{% if site.author.googlescholar %} · <a href="{{ site.author.googlescholar }}">Google Scholar</a>{% endif %}</p>
  </div>

  {% include base_path %}

  {% if site.publication_category %}
    {% for category in site.publication_category %}
      {% assign title_shown = false %}
      {% for post in site.publications reversed %}
        {% if post.category != category[0] %}
          {% continue %}
        {% endif %}
        {% unless title_shown %}
          <h3 class="section-kicker publication-category-title">{{ category[1].title }}</h3>
          {% assign title_shown = true %}
        {% endunless %}
        {% include archive-single.html compact_publication=true %}
      {% endfor %}
    {% endfor %}
  {% else %}
    {% for post in site.publications reversed %}
      {% include archive-single.html compact_publication=true %}
    {% endfor %}
  {% endif %}
</section>
