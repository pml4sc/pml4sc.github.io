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

{% assign years = publications | group_by: "year" %}

{% for year in years %}
  <div class="publication-year surface-chip surface-chip--soft">{{ year.name }}</div>
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
