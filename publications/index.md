---
title: Publications
nav:
  order: 2
  tooltip: Group publications
---

{% assign publications = site.data.publications | sort: "date" | reverse %}
{% assign accepted_count = site.data.publications | where: "status", "Accepted" | size %}

<div class="section-intro publications-hero">
  {% include page-kicker.html %}
  <div class="publications-stats">
    <div class="publications-stat surface-panel">
      <strong>{{ site.data.publications | size }}</strong>
      <span>papers listed</span>
    </div>
    <div class="publications-stat surface-panel">
      <strong>{{ accepted_count }}</strong>
      <span>accepted papers</span>
    </div>
    <div class="publications-stat surface-panel">
      <strong>{{ publications.first.year }}</strong>
      <span>latest publication year</span>
    </div>
  </div>
</div>

{% include section.html %}

{% assign published = publications | where: "status", "Accepted" %}
{% assign preprints = publications | where_exp: "paper", "paper.status != 'Accepted'" %}

{% for group in (1..2) %}
{% if group == 1 %}
  {% assign group_papers = published %}
  {% assign group_title = "Published" %}
  {% assign group_id = "published" %}
{% else %}
  {% assign group_papers = preprints %}
  {% assign group_title = "Preprints" %}
  {% assign group_id = "preprints" %}
{% endif %}
{% if group_papers.size > 0 %}

<h2 id="{{ group_id }}">{{ group_title }}</h2>

{% assign years = group_papers | group_by: "year" %}

{% for year in years %}
  <h3 class="section-year-heading publication-year" id="{{ group_id }}-{{ year.name }}">{{ year.name }}</h3>
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
        banner=paper.banner
        banner_label=paper.banner_label
        buttons=paper.buttons
        bibtex=paper.bibtex
      %}
    {% endfor %}
  </div>
{% endfor %}

{% endif %}
{% endfor %}
