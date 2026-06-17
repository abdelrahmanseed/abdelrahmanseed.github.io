---

title: "Research and publications"
permalink: /research/
layout: single
hide_page_title: true

---

<section class="page-intro">
  <p class="section-kicker section-kicker--lead">Algorithms that learn the shape of the search</p>
  <p>My research focuses on <strong>probabilistic optimization in complex energy landscapes</strong>, where traditional methods struggle because the state space is rugged, high-dimensional, and exponentially large.</p>
</section>

<section class="research-map">
  <article>
    <p class="section-kicker section-kicker--lead">Probabilistic Approximate Optimization Algorithm</p>
    <p>PAOA is a quantum-inspired framework that learns adaptive sampling strategies to accelerate convergence in Markov Chain Monte Carlo.</p>
  </article>
  <article>
    <p class="section-kicker section-kicker--lead">Key Ideas</p>
    <ul class="check-list">
      <li>Learn annealing schedules instead of fixing them</li>
      <li>Bias proposal distributions using problem structure</li>
      <li>Optimize sampling dynamics, not just energy</li>
    </ul>
  </article>
  <article>
    <p class="section-kicker section-kicker--lead">Why It Matters</p>
    <p>Many NP-hard problems, including k-SAT and spin glasses, require exploring enormous spaces. PAOA improves convergence speed, success probability, and scaling behavior.</p>
  </article>
  <article>
    <p class="section-kicker section-kicker--lead">Current Directions</p>
    <ul class="check-list">
      <li>Learning make/break proposal distributions</li>
      <li>Scaling behavior on k-SAT</li>
      <li>Hardware implementations with FPGA and p-bits</li>
    </ul>
  </article>
</section>

<figure class="wide-figure">
  <img src="/images/PAOA.png" alt="PAOA research diagram">
</figure>

<section id="publications" class="research-publications" aria-label="Selected publications">
  <div class="page-intro page-intro--compact">
    <p class="section-kicker section-kicker--lead">Selected papers on probabilistic optimization, sampling, and hardware-aware algorithms</p>
    <p>The full CV is available as a PDF from the <a href="/cv/">CV page</a>{% if site.author.googlescholar %}, and the complete publication record is on <a href="{{ site.author.googlescholar }}">Google Scholar</a>{% endif %}</p>
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
          <p class="section-kicker publication-category-title">{{ category[1].title }}</p>
          {% assign title_shown = true %}
        {% endunless %}
        {% include archive-single.html %}
      {% endfor %}
    {% endfor %}
  {% else %}
    {% for post in site.publications reversed %}
      {% include archive-single.html %}
    {% endfor %}
  {% endif %}
</section>
