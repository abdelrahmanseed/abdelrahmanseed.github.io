---
last_modified_at: "2026-11-08T21:36:29-08:00"
permalink: /
title: "Abdelrahman S. Abdelrahman"
description: "PhD candidate at UC Santa Barbara. Learning-based sampling, probabilistic optimization, FPGA, and deployed computer vision systems."
layout: one-page
author_profile: false
redirect_from:
  - /about/
  - /about.html
---

<section class="hero wrap" id="about" aria-labelledby="hero-title">
  <div class="hero__main">
    <div class="hero__profile">
      <figure class="hero__portrait"><img src="{{ '/images/profile.webp' | relative_url }}" alt="Portrait of Abdelrahman S. Abdelrahman" width="640" height="670" fetchpriority="high" decoding="async"></figure>
      <nav class="profile-links" aria-label="Contact and academic profiles">
        <a href="https://www.linkedin.com/in/{{ site.author.linkedin }}/" target="_blank" rel="noopener" aria-label="LinkedIn profile" title="LinkedIn">{% include profile-icon.html name="linkedin" %}<span>LinkedIn</span></a>
        <a href="{{ site.author.googlescholar }}" target="_blank" rel="noopener" aria-label="Google Scholar profile" title="Google Scholar">{% include profile-icon.html name="scholar" %}<span>Google Scholar</span></a>
        <a href="mailto:{{ site.author.email }}" aria-label="Email Abdelrahman" title="Email">{% include profile-icon.html name="email" %}<span>Email</span></a>
        <a href="https://github.com/{{ site.author.github }}" target="_blank" rel="noopener" aria-label="GitHub profile" title="GitHub">{% include profile-icon.html name="github" %}<span>GitHub</span></a>
        <a href="{{ site.author.orcid }}" target="_blank" rel="noopener" aria-label="ORCID profile" title="ORCID">{% include profile-icon.html name="orcid" %}<span>ORCID</span></a>
      </nav>
    </div>
    <div class="hero__copy">
      <p class="hero__name">Abdelrahman S. Abdelrahman</p>
      <p class="hero__role">PhD candidate · Electrical & Computer Engineering<a class="hero__location" href="https://opus.ece.ucsb.edu" target="_blank" rel="noopener">UC Santa Barbara · OPUS Lab ↗</a></p>
      <h1 id="hero-title">Learning to compute<br>with <em>randomness.</em></h1>
      <p class="hero__intro">I work across the entire computing stack, from developing algorithms in Python and C++ to implementing them on specialized hardware such as FPGAs and single-photon avalanche diode arrays.</p>
      <p class="hero__intro">My research spans rigorous benchmarking of variational probabilistic algorithms such as PAOA against quantum counterparts such as QAOA. I also develop methods that learn how many samples stochastic neurons need to retain accuracy while substantially reducing memory use and computation. At the device level, I model stochastic processes in emerging technologies such as 2D memristors.</p>
      <p class="hero__intro">Beyond academia, I built real-time computer vision systems for safety monitoring and object tracking using PyTorch, YOLO, and ByteTrack. I worked from dataset preparation through deployment on resource-constrained NVIDIA Jetson devices.</p>
      <ul class="hero__skills" aria-label="Core technical skills"><li>Python & C++</li><li>PyTorch</li><li>Monte Carlo methods</li><li>FPGA & NVIDIA Jetson</li></ul>
      <div class="hero__actions"><a class="button button--dark" href="{{ '/files/CV.pdf' | relative_url }}" target="_blank" rel="noopener">Download CV <span aria-hidden="true">↗</span></a><a class="button button--outline" href="mailto:{{ site.author.email }}">Get in touch <span aria-hidden="true">↗</span></a><a class="text-link" href="#publications">View research ↓</a></div>
    </div>
  </div>
  <nav class="hero__evidence" aria-label="Selected research and engineering work">
    <a href="#paper-paoa"><span class="eyebrow">Published research</span><strong>Nature Communications</strong><span>Learning the sampling process with PAOA <span aria-hidden="true">↗</span></span></a>
    <a href="#paper-paoaSPAD"><span class="eyebrow">Algorithms in hardware</span><strong>FPGA & SPAD arrays</strong><span>Probabilistic optimization on physical devices <span aria-hidden="true">↗</span></span></a>
    <a href="#work"><span class="eyebrow">Industry experience</span><strong>100+ cameras in deployment</strong><span>Computer vision for real-time monitoring <span aria-hidden="true">↗</span></span></a>
  </nav>
  <a class="scroll-cue" href="#research"><span aria-hidden="true">↓</span> Explore the research and engineering behind the work.</a>
</section>

<figure class="hero-photo">
  <div class="hero-photo__image"><img src="{{ '/images/sra-welcome-2026.webp' | relative_url }}" alt="Abdelrahman introducing the Probabilistic Computing track at UCSB’s 2026 Summer Research Academies Welcome Event" width="2200" height="1467" loading="lazy" decoding="async"></div>
  <figcaption class="wrap"><span>Research is better when it’s shared.</span><span>UCSB SRA Welcome Event · 2026</span></figcaption>
</figure>

<section class="research-section" id="research" aria-labelledby="research-heading">
  <div class="wrap section-heading reveal"><p class="eyebrow">01 / Research & publications</p><h2 id="research-heading">Engineered Randomness: from stochastic possibilities to the physical world</h2><div class="section-heading__aside"><p>How can we learn better ways to search, sample, and compute? My work connects algorithms, stochastic devices, and physical systems.</p><a class="text-link" href="{{ site.author.googlescholar }}" target="_blank" rel="noopener">Google Scholar ↗</a></div></div>
  <div class="research-narrative wrap">
    <div class="research-stage">
      <div class="stage-heading"><span class="eyebrow">Sampling dynamics</span><span class="stage-counter" aria-hidden="true">01 / 03</span></div>
      <canvas id="sampler-canvas" role="img" aria-label="Particles move from random positions into a probability surface and a stochastic-bit grid."></canvas>
      <div class="stage-equation"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block" aria-label="p of x is proportional to e to the power of negative beta times E of x"><mrow><mi>p</mi><mo>(</mo><mi mathvariant="bold">x</mi><mo>)</mo><mo>∝</mo><msup><mi mathvariant="normal">e</mi><mrow><mo>−</mo><mi>β</mi><mi>E</mi><mo>(</mo><mi mathvariant="bold">x</mi><mo>)</mo></mrow></msup></mrow></math></div>
      <div class="stage-footer"><span><i aria-hidden="true"></i> <span id="stage-label">Explore the possibilities</span></span><button type="button" class="motion-toggle" aria-pressed="false">Pause motion</button></div>
    </div>
    <div class="research-steps">
      <article class="research-step" data-stage="0"><span class="step-number">01 — Explore</span><h3>Start with<br>possibilities.</h3><p>Randomness gives a search process room to explore. The challenge is directing that exploration through a complicated energy landscape.</p><a href="#paper-paoa" class="text-link">The PAOA story ↓</a></article>
      <article class="research-step" data-stage="1"><span class="step-number">02 — Learn</span><h3>Learn how<br>to search.</h3><p>Learn the dynamics of a sampler, or learn the configurations it proposes. PAOA and IsingFormer approach the search process from complementary directions.</p><a href="#paper-isingformer" class="text-link">Learned proposals ↓</a></article>
      <article class="research-step" data-stage="2"><span class="step-number">03 — Build</span><h3>Bring it into<br>the physical world.</h3><p>Connect these algorithms to FPGA implementations, single-photon avalanche diode arrays, and configurable stochastic circuits.</p><a href="#paper-paoaSPAD" class="text-link">From algorithm to SPAD array ↓</a></article>
    </div>
  </div>
  <div class="publication-library wrap" id="publications">
    <details class="original-sampler"><summary>A closer look: Gibbs sampling in motion <span aria-hidden="true">+</span></summary>{% include sampler-animation.html %}</details>
    <div class="library-heading"><h3>Research journey</h3><p>{{ site.publications.size }} publications · figures, code & citations</p></div>
    <div class="library-tools"><div class="theme-filters" role="group" aria-label="Filter publications by research theme"><button type="button" class="is-active" data-filter="all" aria-pressed="true">All work <span>{{ site.publications.size }}</span></button>{% for theme in site.data.research_stories %}<button type="button" data-filter="{{ theme.id }}" aria-pressed="false">{{ theme.title }}</button>{% endfor %}</div><button type="button" class="reset-library" hidden>Show all work ↗</button></div>
    <p class="filter-status sr-only" role="status" aria-live="polite"></p>
    {% for theme in site.data.research_stories %}
    <section class="paper-group" data-theme="{{ theme.id }}" aria-labelledby="theme-{{ theme.id }}"><header class="paper-group__heading"><span>{{ theme.number }}</span><div><h3 id="theme-{{ theme.id }}">{{ theme.title }}</h3><p>{{ theme.description }}</p></div></header>
      {% include research-lab.html theme=theme.id %}
      {% for key in theme.papers %}{% assign paper = site.publications | where: 'story_key', key | first %}{% assign story = site.data.paper_stories[key] %}
      <details class="paper-item" id="paper-{{ key }}"><summary><span class="paper-item__year">{{ paper.date | date: '%Y' }}</span><span class="paper-item__copy"><span class="paper-item__venue">{{ paper.venue }}{% if paper.publication_status %} · {{ paper.publication_status }}{% endif %}</span><span class="paper-item__title">{{ paper.title }}</span><span class="paper-item__summary">{{ story.summary | default: paper.excerpt }}</span></span><span class="expand-icon" aria-hidden="true"></span></summary>
        {% include one-page-paper.html paper=paper story=story key=key %}
      </details>
      {% endfor %}
    </section>
    {% endfor %}
  </div>
</section>

<section class="teaching-section section-pad" id="teaching" aria-labelledby="teaching-heading">
  <div class="wrap"><div class="section-heading reveal"><p class="eyebrow">02 / Teaching & mentorship</p><h2 id="teaching-heading">Mentorship and Teaching: from concepts to implementations</h2><p class="section-heading__aside">From executable sampling notebooks to digital circuits and student research. Courses, materials, and mentorship at UC Santa Barbara.</p></div>
    {% assign courses = site.teaching | sort: 'date' | reverse %}
    <div class="course-list">{% for course in courses %}<article class="course"><div class="course__meta"><span class="eyebrow">{{ course.term }}</span><span>{{ course.type }}</span></div><div class="course__body"><h3>{{ course.title }}</h3><p>{{ course.excerpt | strip_html }}</p><div class="resource-links">
      {% if course.materialurl %}<a href="{{ course.materialurl }}" target="_blank" rel="noopener">{{ course.materiallabel | default: 'Materials' }} ↗</a>{% endif %}
      {% if course.repositoryurl %}<a href="{{ course.repositoryurl }}" target="_blank" rel="noopener">Course notebooks ↗</a>{% endif %}
      {% if course.feedbackurl %}<a href="{{ course.feedbackurl }}" target="_blank" rel="noopener">Student feedback ↗</a>{% endif %}
      {% if course.proposalurl %}<a href="{{ course.proposalurl }}" target="_blank" rel="noopener">Project proposal ↗</a>{% endif %}
      {% if course.courseurl %}<a href="{{ course.courseurl }}" target="_blank" rel="noopener">Course catalog ↗</a>{% endif %}
    </div><details class="course-details"><summary>Course details{% if course.sample_image or course.sample_video or course.sample_animation %} & content sample{% endif %}<span class="expand-icon" aria-hidden="true"></span></summary><div class="course-content">{{ course.content | markdownify }}{% if course.topics %}<ul class="tags">{% for topic in course.topics %}<li>{{ topic }}</li>{% endfor %}</ul>{% endif %}{% if course.descriptionurl %}<a href="{{ course.descriptionurl }}" target="_blank" rel="noopener">Course description ↗</a>{% endif %}{% if course.sample_image or course.sample_video or course.sample_animation %}{% include teaching-sample.html course=course expanded=true %}{% endif %}</div></details></div></article>{% endfor %}</div>
  </div>
</section>

<section class="work-section section-pad" id="work" aria-labelledby="work-heading"><div class="wrap">
  <div class="section-heading reveal"><p class="eyebrow">03 / Applied work</p><h2 id="work-heading">Detection and Tracking: Real-Time Deployment on Edge Devices</h2><p class="section-heading__aside">Computer vision systems developed at Wakeb for industrial safety and real-time monitoring.</p></div>
  <article class="featured-project"><div class="featured-project__copy"><p class="eyebrow">Alfanar Electric / Smart Alerting System</p><h3>Personnel detection.<br>High-voltage safety.</h3><p>Personnel detection in high-voltage test areas, enabling automated safety shutdowns.</p><ul class="tags"><li>PyTorch</li><li>YOLO</li><li>ByteTrack</li><li>C++</li><li>NVIDIA Jetson</li></ul></div><div class="project-demo"><iframe data-box-embed src="https://ucsb.app.box.com/embed/s/yaqn7m7cyu536uvv67y2pba7i8jsfc4a/file/2186396742575?uxLite=true" title="Smart Alerting System video demonstration" allow="fullscreen; focus-without-user-activation 'none'" allowfullscreen loading="lazy"></iframe><a class="text-link" href="https://ucsb.app.box.com/s/yaqn7m7cyu536uvv67y2pba7i8jsfc4a/file/2186396742575" target="_blank" rel="noopener">Watch demo in Box ↗</a></div></article>
  <article class="monitoring-project"><div><p class="eyebrow">Saudi Water Authority / Aware</p><h3>Real-time awareness.<br>At deployment scale.</h3><p>A PyTorch and YOLO crowd-management system with a secure offline dashboard for autonomous operation.</p></div><div class="project-scale"><strong>100<span>+</span></strong><span>Cameras in deployment</span></div></article>
  <div class="implementation-resources"><h3>Behind the systems</h3><div class="resource-links"><a href="https://ucsb.box.com/s/ldx6tqr5v77df2l8qinkt46jzb60d1j5" target="_blank" rel="noopener">Report 1 ↗</a><a href="https://ucsb.box.com/s/k889bw7w9iwrnpwdmpu9ta1pbcbdkbzo" target="_blank" rel="noopener">Code 1 ↗</a><a href="https://ucsb.box.com/s/j6l3zth650uo28palamt0r6quihod5n7" target="_blank" rel="noopener">Report 2 ↗</a><a href="https://ucsb.box.com/s/x9gjqivp0mj45ngxeh1ocgp5ridc878f" target="_blank" rel="noopener">Code 2 ↗</a></div></div>
</div></section>

<section class="background-section section-pad" id="background" aria-labelledby="background-heading"><div class="wrap">
  <div class="section-heading reveal"><p class="eyebrow">04 / Background</p><h2 id="background-heading">Qualifications and Experiences: Probabilistic Modeling and Efficient Computing</h2><div class="section-heading__aside"><p>Education, experience, technical skills, awards, and the talks that connect the ideas.</p><a class="button button--outline" href="{{ '/files/CV.pdf' | relative_url }}" target="_blank" rel="noopener">Download full CV ↗</a></div></div>
  {% include one-page-background.html %}
</div></section>

<footer class="contact-section section-pad" id="contact"><div class="wrap"><p class="eyebrow">05 / Get in touch</p><h2>Let’s talk about<br>the <em>next challenge.</em></h2><a class="contact-email" href="mailto:{{ site.author.email }}">{{ site.author.email }} <span aria-hidden="true">↗</span></a><div class="contact-bottom"><p>Abdelrahman S. Abdelrahman<br><span>UC Santa Barbara · Santa Barbara, CA</span></p><nav aria-label="Professional profiles"><a href="{{ site.author.googlescholar }}" target="_blank" rel="noopener">Scholar ↗</a><a href="https://github.com/{{ site.author.github }}" target="_blank" rel="noopener">GitHub ↗</a><a href="https://www.linkedin.com/in/{{ site.author.linkedin }}/" target="_blank" rel="noopener">LinkedIn ↗</a><a href="{{ site.author.orcid }}" target="_blank" rel="noopener">ORCID ↗</a></nav><p class="colophon">Built with curiosity.<br>© {{ site.time | date: '%Y' }}</p></div></div></footer>
