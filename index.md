---
---

{% assign news = site.data.news | sort: "date" | reverse %}

<div class="home-intro home-section-shell surface-panel">
  <div class="home-section-heading">
    <span class="home-section-heading__mark"></span>
    <span class="home-section-heading__icon" aria-hidden="true">
      {% include icon.html icon="fa-solid fa-bolt" %}
    </span>
    <h1>Welcome</h1>
  </div>

  <div class="home-intro__text">
    <p>The PML4SC Lab develops probabilistic machine learning methods for AI for Science, integrating physical system analysis with data-driven modeling. We study how physical insights can improve the reliability and efficiency of machine learning, while flexible statistical models help discover, approximate, and optimize complex scientific systems.</p>
    <p>Our research spans uncertainty-aware modeling, surrogate modeling, operator learning, physics-informed machine learning, multi-task and transfer learning, and interactive optimization for scientific discovery.</p>
  </div>
</div>

{% include section.html %}

<div class="news-shell home-section-shell surface-panel">
  <div class="home-section-heading">
    <span class="home-section-heading__mark"></span>
    <span class="home-section-heading__icon" aria-hidden="true">
      {% include icon.html icon="fa-solid fa-newspaper" %}
    </span>
    <h1>News</h1>
  </div>

  <div class="news-feed">
    <div class="news-feed__scroll">
      {% for item in news %}
        {% include news-item.html date=item.date title=item.title description=item.description congrats_name=item.congrats_name link=item.link tag=item.tag %}
      {% endfor %}
    </div>
  </div>
</div>

{% include section.html %}

<div class="home-team home-section-shell surface-panel">
  <div class="home-section-heading">
    <span class="home-section-heading__mark"></span>
    <span class="home-section-heading__icon" aria-hidden="true">
      {% include icon.html icon="fa-solid fa-users" %}
    </span>
    <h1>Team Members</h1>
  </div>

  <div class="home-team__grid">
    {% include list.html data="members" component="portrait" filter="role == 'principal-investigator'" %}
    {% include list.html data="members" component="portrait" filter="role != 'principal-investigator'" %}
  </div>
</div>
