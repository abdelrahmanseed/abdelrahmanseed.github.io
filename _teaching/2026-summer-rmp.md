---
title: "Research Mentorship Program (RMP)"
collection: teaching
layout: entry
type: "Research Mentor"
permalink: /teaching/research-mentorship-program/
venue: "UC Santa Barbara"
date: 2026-06-01
term: "Summer 2026"
location: "Santa Barbara, CA"
proposalurl: "https://ucsb.box.com/s/yr2tsf1vitvnssil1hwsmqkxwlzgsxim"
proposal_title: "Accelerated Convergence in Glassy Energy Landscapes via Variational Learning"
proposal_description: "The proposal explores gradient-estimating and learning-based optimization for protein folding and spin-glass models. It asks how efficiently these methods navigate rugged energy landscapes and whether a variational optimizer generalizes to held-out problem instances."
sample_title: "The variational learning loop"
sample_image: "/images/teaching/rmp-variational-learning.webp"
sample_alt: "Proposal diagram showing parameter updates, a probability distribution, an energy-based model, and an optimization loop"
sample_caption: "Figure 2 from the proposal: sample configurations, evaluate their energies, and update the distribution through learned parameters."
sample_source: "https://ucsb.box.com/s/yr2tsf1vitvnssil1hwsmqkxwlzgsxim"
excerpt: "Mentored a four-week protein-folding project, from an HP lattice environment and REINFORCE benchmarks to a final report and presentation."
topics:
  - Research mentorship
  - Learning-based optimization
  - Energy landscapes
  - Protein folding
  - Scientific Python
---

Mentored a student on **Protein Folding Using Variational Annealing** over four weeks. Guided problem formulation, a tested HP lattice-folding environment, REINFORCE baselines and benchmarks, and the final report and presentation.

## Research proposal

**Accelerated Convergence in Glassy Energy Landscapes via Variational Learning**

The proposal explores gradient-estimating and learning-based optimization for protein folding and spin-glass models. Instead of adjusting a candidate solution alone, it treats combinatorial optimization as learning a probability distribution over discrete configurations.

Two questions guide the proposed work:

- How efficiently do REINFORCE and Bayesian optimization explore and converge in highly non-convex energy landscapes?
- Can a variational algorithm generalize to held-out problem instances without retraining?

The proposed outcomes are an optimization algorithm, an implementation benchmarked against derivative-free methods, and a technical report documenting the methodology and results.
