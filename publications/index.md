---
title: Publications
nav:
  order: 2
  tooltip: Group publications
---

{% assign publications = site.data.publications | sort: "date" | reverse %}
{% assign accepted_count = site.data.publications | where: "status", "Accepted" | size %}

<div class="publications-hero">
  <div>
    <span class="publications-hero__eyebrow">PML4SC Publications</span>
    <h1>Research outputs from the group.</h1>
    <p>
      Selected papers from the lab, with a focus on probabilistic machine learning,
      uncertainty-aware modeling, and scientific computing. This page is now curated
      manually so it reflects the group’s actual publications rather than template data.
    </p>
  </div>

  <div class="publications-stats">
    <div class="publications-stat">
      <strong>{{ site.data.publications | size }}</strong>
      <span>papers listed</span>
    </div>
    <div class="publications-stat">
      <strong>{{ accepted_count }}</strong>
      <span>accepted papers</span>
    </div>
    <div class="publications-stat">
      <strong>{{ publications.first.year }}</strong>
      <span>latest publication year</span>
    </div>
  </div>
</div>

{% include section.html %}

## Current Publications

{% assign years = publications | group_by: "year" %}

{% for year in years %}
  <div class="publication-year">{{ year.name }}</div>
  <div class="publications-grid">
    {% for paper in year.items %}
      {%
        include publication.html
        title=paper.title
        authors=paper.authors
        venue=paper.venue
        short_venue=paper.short_venue
        status=paper.status
        type=paper.type
        year=paper.year
        description=paper.description
        buttons=paper.buttons
      %}
    {% endfor %}
  </div>
{% endfor %}
