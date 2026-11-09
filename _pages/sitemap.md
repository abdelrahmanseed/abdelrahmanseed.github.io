---
last_modified_at: "2026-11-08T21:36:29-08:00"
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

{% include base_path %}

A directory of the research, teaching, and background pages on this site. An [XML sitemap]({{ base_path }}/sitemap.xml) is also available for search engines.

<h2>Pages</h2>
<ul>
  <li><a href="{{ '/' | relative_url }}">Home</a></li>
  <li><a href="{{ '/research/' | relative_url }}">Research and publications</a></li>
  <li><a href="{{ '/teaching/' | relative_url }}">Teaching</a></li>
  <li><a href="{{ '/portfolio/' | relative_url }}">Applied work</a></li>
  <li><a href="{{ '/cv/' | relative_url }}">CV and background</a></li>
  <li><a href="{{ '/#talks' | relative_url }}">Invited talks</a></li>
</ul>

<h2>Publications</h2>
<ul>
{% assign papers = site.publications | sort: 'date' | reverse %}
{% for paper in papers %}
  <li><a href="{{ paper.url | relative_url }}">{{ paper.title }}</a></li>
{% endfor %}
</ul>

<h2>Courses and mentorship</h2>
<ul>
{% assign courses = site.teaching | sort: 'date' | reverse %}
{% for course in courses %}
  <li><a href="{{ course.url | relative_url }}">{{ course.title }}</a> · {{ course.term }}</li>
{% endfor %}
</ul>
