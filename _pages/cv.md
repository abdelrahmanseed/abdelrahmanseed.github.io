---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
hide_page_title: true
redirect_from:
  - /resume
---

{% include base_path %}

<div class="page-intro">
  <h1 class="section-kicker section-kicker--lead">PhD candidate · Electrical and Computer Engineering · UC Santa Barbara</h1>
  <p>I develop probabilistic optimization algorithms and implement them in software, FPGA hardware, and photon-based computing systems.</p>
  <a href="/files/CV.pdf" class="btn-cv" target="_blank" rel="noopener"><i class="fa-solid fa-file-lines" aria-hidden="true"></i> Download PDF</a>
</div>

<section class="cv-grid">
  <article>
    <p class="section-kicker section-kicker--lead">Education</p>
    <ul class="cv-list">
      <li><strong>PhD, Electrical and Computer Engineering</strong> — UCSB, Jan 2026–Present. Thesis: Probabilistic Approximate Optimization; GPA 4.0/4.0.</li>
      <li><strong>MSc, Electrical and Computer Engineering</strong> — UCSB, Sep 2023–Dec 2025; GPA 4.0/4.0.</li>
      <li><strong>BSc, Electrical and Electronics Engineering</strong> — KFUPM, Sep 2017–May 2022; ranked 1st, GPA 3.99/4.0.</li>
    </ul>
  </article>
  <article>
    <p class="section-kicker section-kicker--lead">Technical skills</p>
    <ul class="cv-list">
      <li>Python, C++, MATLAB, PyTorch, NumPy</li>
      <li>Monte Carlo methods, stochastic optimization, probabilistic modeling</li>
      <li>FPGA, HPC, parallel and hardware-accelerated computing</li>
    </ul>
  </article>
</section>

<section class="cv-section">
  <p class="section-kicker section-kicker--lead">Experience</p>
  <div class="cv-timeline">
    <article>
      <span>May 2026–Present</span>
      <p class="section-kicker section-kicker--lead">Handshake AI Fellow — Trainer and Reviewer</p>
      <p>Completed 20+ graduate-level STEM benchmark problems, each rated 5/5 across three review stages. Developed long-form AI evaluations for electrical and computer engineering workflows.</p>
    </article>
    <article>
      <span>Sep 2023–Present</span>
      <p class="section-kicker section-kicker--lead">Graduate Student Researcher, OPUS Lab, UCSB</p>
      <ul class="cv-list">
        <li>Developed Generalized Probabilistic Approximate Optimization (PAOA), a variational Monte Carlo algorithm inspired by QAOA.</li>
        <li>Implemented probabilistic optimization on a 64 × 64 single-photon avalanche diode array.</li>
        <li>Implemented variational annealing on FPGA hardware, including conventional simulated annealing as a special case.</li>
      </ul>
      <div class="resource-links">
        <a href="https://opus.ece.ucsb.edu/people/abdelrahman-abdelrahman" target="_blank" rel="noopener"><i class="fa-solid fa-building-columns" aria-hidden="true"></i> OPUS Profile</a>
        <a href="https://www.nature.com/articles/s41467-025-67187-5" target="_blank" rel="noopener"><i class="fa-solid fa-file-lines" aria-hidden="true"></i> PAOA Paper</a>
        <a href="https://github.com/OPUSLab/PAOAwithPbits" target="_blank" rel="noopener"><i class="fa-solid fa-code" aria-hidden="true"></i> PAOA Code</a>
        <a href="https://github.com/tathagatasrimani/PAOA_SPADs" target="_blank" rel="noopener"><i class="fa-solid fa-code" aria-hidden="true"></i> SPAD Code</a>
      </div>
    </article>
    <article>
      <span>Aug 2022–Sep 2023</span>
      <p class="section-kicker section-kicker--lead">Data Scientist, Computer Vision, Wakeb</p>
      <p>Delivered 4+ computer vision projects, including safety monitoring at Alfanar Electric and crowd management across 100+ cameras for the Saudi Water Authority.</p>
      <div class="resource-links">
        <a href="https://wakeb.tech/about-us" target="_blank" rel="noopener"><i class="fa-solid fa-building" aria-hidden="true"></i> Wakeb</a>
        <a href="https://ucsb.box.com/s/yaqn7m7cyu536uvv67y2pba7i8jsfc4a" target="_blank" rel="noopener"><i class="fa-solid fa-play" aria-hidden="true"></i> Demo</a>
        <a href="/portfolio/computer-vision-systems/"><i class="fa-solid fa-layer-group" aria-hidden="true"></i> Project Card</a>
      </div>
    </article>
    <article>
      <span>Aug 2020–Sep 2022</span>
      <p class="section-kicker section-kicker--lead">Researcher, Neurotronics Lab, KFUPM</p>
      <p>Developed defect-aware statistical models to predict operational voltage, yield, and scaling limits of two-dimensional memristors.</p>
      <div class="resource-links">
        <a href="https://aldirini.com/people/abdelrahman-s/" target="_blank" rel="noopener"><i class="fa-solid fa-building-columns" aria-hidden="true"></i> Lab Profile</a>
        <a href="https://www.researchsquare.com/article/rs-7265912/v1" target="_blank" rel="noopener"><i class="fa-solid fa-file-lines" aria-hidden="true"></i> Manuscript</a>
        <a href="https://ieeexplore.ieee.org/document/10183973" target="_blank" rel="noopener"><i class="fa-solid fa-file-lines" aria-hidden="true"></i> Workshop Paper</a>
      </div>
    </article>
    <article>
      <span>Jun 2020–Sep 2020</span>
      <p class="section-kicker section-kicker--lead">Research Intern, Information Science Lab, KAUST</p>
      <p>Led a project on regularization and covariance matrix approximation.</p>
      <div class="resource-links">
        <a href="https://cemse.kaust.edu.sa/profiles/abdelrahman-said-abdelrahman-mohammed-abdelrahman" target="_blank" rel="noopener"><i class="fa-solid fa-building-columns" aria-hidden="true"></i> KAUST Profile</a>
        <a href="https://ieeexplore.ieee.org/abstract/document/9413865" target="_blank" rel="noopener"><i class="fa-solid fa-file-lines" aria-hidden="true"></i> Manuscript</a>
      </div>
    </article>
  </div>
</section>

<section class="cv-section">
  <p class="section-kicker">Teaching</p>
  <div class="cv-timeline">
    {% assign teaching_by_date = site.teaching | sort: "date" | reverse %}
    {% for teaching in teaching_by_date %}
      <article>
        <span>{{ teaching.term }}</span>
        <p class="section-kicker section-kicker--lead">{{ teaching.type }}, {{ teaching.title }}</p>
        <p>{{ teaching.venue }} · {{ teaching.excerpt | markdownify | strip_html }}</p>
        {% if teaching.courseurl or teaching.materialurl or teaching.repositoryurl or teaching.feedbackurl %}
          <div class="resource-links">
            {% if teaching.courseurl %}<a href="{{ teaching.courseurl }}" target="_blank" rel="noopener"><i class="fa-solid fa-building-columns" aria-hidden="true"></i> Course catalog</a>{% endif %}
            {% if teaching.materialurl %}<a href="{{ teaching.materialurl }}" target="_blank" rel="noopener"><i class="fa-solid fa-file-lines" aria-hidden="true"></i> {{ teaching.materiallabel | default: "Materials" }}</a>{% endif %}
            {% if teaching.repositoryurl %}<a href="{{ teaching.repositoryurl }}" target="_blank" rel="noopener"><i class="fa-brands fa-github" aria-hidden="true"></i> Course notebooks</a>{% endif %}
            {% if teaching.feedbackurl %}<a href="{{ teaching.feedbackurl }}" target="_blank" rel="noopener"><i class="fa-solid fa-comment-dots" aria-hidden="true"></i> Feedback</a>{% endif %}
          </div>
        {% endif %}
      </article>
    {% endfor %}
  </div>
</section>

<section class="cv-section">
  <p class="section-kicker">Awards and Activities</p>
  <ul class="cv-list">
    <li>International Doctoral Recruitment Fellowship, UCSB.</li>
    <li>Ranked 3rd in a poster competition at the Future of Semiconductor Forum, KAUST, 2026. <a href="https://www.linkedin.com/posts/abdelrahman-seed_research-2dmaterials-statisticalmodeling-activity-7064986453579079681-WwM-?utm_source=share&utm_medium=member_desktop&rcm=ACoAACB1SzYBvzzM0aMvG7Q78SZhGVqdVeXEMNU" target="_blank" rel="noopener">Poster note</a>.</li>
    <li>Best Senior Design Project, KFUPM, 2022. <a href="https://ieeexplore.ieee.org/abstract/document/10756518" target="_blank" rel="noopener">Manuscript</a> and <a href="https://github.com/abdelrahmanseed/UAVIoTWakeUpSG" target="_blank" rel="noopener">code</a>.</li>
    <li>Referee activity for Science Advances and IEEE Journal on Exploratory Solid-State Computational Devices and Circuits.</li>
  </ul>
</section>

<section class="cv-section">
  <p class="section-kicker">Invited Talks</p>
  <div class="cv-timeline">
    <article>
      <span>Sep 1, 2026 · UCSB</span>
      <h2>Is Quantum Advantage Overhyped? A Probabilistic Analogue to QAOA</h2>
    </article>
    <article>
      <span>Jun 15, 2026 · UCSB</span>
      <h2>Accelerated Convergence in Glassy Energy Landscapes via Variational Learning</h2>
      <div class="resource-links">
        <a href="https://ucsb.box.com/s/ryjunyzflx9480ewqawfukamt7ljw4y4" target="_blank" rel="noopener"><i class="fa-solid fa-video" aria-hidden="true"></i> Recording</a>
      </div>
    </article>
    <article>
      <span>Nov 21, 2025</span>
      <h2>Learning the Sampler: The Probabilistic Approximate Optimization Algorithm</h2>
      <div class="resource-links">
        <a href="https://ucsb.box.com/s/a8181bhvw9mdu96mtxuj1gqaeripdg5m" target="_blank" rel="noopener"><i class="fa-solid fa-video" aria-hidden="true"></i> Video</a>
        <a href="https://ucsb.box.com/s/4nqfk7lv48s4am758xgo2vtjwphn4e8m" target="_blank" rel="noopener"><i class="fa-solid fa-display" aria-hidden="true"></i> Slides</a>
      </div>
    </article>
    <article>
      <span>Oct 31, 2025</span>
      <h2>Bypassing Non-differentiability Straight-Through and Applications</h2>
      <div class="resource-links">
        <a href="https://ucsb.box.com/s/bltvnyvw1uz9rg8hjl5ozqeeebppxkv6" target="_blank" rel="noopener"><i class="fa-solid fa-display" aria-hidden="true"></i> Slides</a>
      </div>
    </article>
    <article>
      <span>Dec 3, 2024</span>
      <h2>ADAM Optimizer: History, Convergence, and Practical Insights</h2>
      <div class="resource-links">
        <a href="https://ucsb.box.com/s/gwlovdxdkvzgqn3lz4qvub103wwo4qg1" target="_blank" rel="noopener"><i class="fa-solid fa-video" aria-hidden="true"></i> Video</a>
        <a href="https://ucsb.box.com/s/9oy9ntxhtcjdo7onz8rzo9obxw9vgz0b" target="_blank" rel="noopener"><i class="fa-solid fa-display" aria-hidden="true"></i> Slides</a>
      </div>
    </article>
  </div>
</section>

<section class="cv-section">
  <p class="section-kicker">Publications</p>
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
</section>
