---
title: "Research and publications"
description: "Probabilistic optimization, stochastic hardware, physical models, and sensing."
permalink: /research/
layout: research
author_profile: false
---

<header class="research-hero">
  <div class="research-hero__copy">
    <p class="research-eyebrow">Research / Publications</p>
    <h1>Learning to compute with <em>randomness.</em></h1>
    <p class="research-hero__lede">Four connected research threads. Open a paper to explore its complete story.</p>
    <a href="{{ site.author.googlescholar }}" target="_blank" rel="noopener" class="quiet-link">Google Scholar <span aria-hidden="true">↗</span></a>
  </div>
  <div class="research-hero__visual">{% include sampler-animation.html %}</div>
</header>

<nav class="research-nav" aria-label="Research themes">
  {% for theme in site.data.research_stories %}<a href="#{{ theme.id }}"><span>{{ theme.number }}</span> {{ theme.title }}</a>{% endfor %}
</nav>

<div id="publications" class="research-chapters research-overview">
  {% for theme in site.data.research_stories %}
    <section class="research-chapter" id="{{ theme.id }}" aria-labelledby="title-{{ theme.id }}">
      <header class="research-chapter__heading"><span class="research-chapter__number">{{ theme.number }}</span><div><h2 id="title-{{ theme.id }}">{{ theme.title }}</h2><p>{{ theme.description }}</p></div></header>
      <div class="paper-overview-list">
        {% for key in theme.papers %}
          {% assign paper = site.publications | where: 'story_key', key | first %}
          {% assign story = site.data.paper_stories[key] %}
          <article class="paper-overview">
            <div class="paper-overview__body">
              <h3><a href="{{ paper.url | relative_url }}">{{ paper.title }}</a></h3>
              <p class="research-story__venue">{{ paper.venue }} · {{ paper.date | date: '%Y' }}{% if paper.publication_status %} · {{ paper.publication_status }}{% endif %}</p>
              <p>{{ story.summary | default: paper.excerpt }}</p>
            </div>
            <a class="paper-overview__open" href="{{ paper.url | relative_url }}">Explore paper <span aria-hidden="true">↗</span></a>
          </article>
        {% endfor %}
      </div>
    </section>
  {% endfor %}
</div>
