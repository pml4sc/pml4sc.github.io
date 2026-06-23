---
---

{% assign news = site.data.news | sort: "date" | reverse %}

<div class="home-intro surface-panel">
  <div class="home-section-heading">
    <span class="home-section-heading__mark"></span>
    <span class="home-section-heading__icon" aria-hidden="true">
      {% include icon.html icon="fa-solid fa-bolt" %}
    </span>
    <h1>Welcome</h1>
  </div>

  <p class="home-intro__text">Developing probabilistic machine learning that quantifies uncertainty for robust scientific computing. Creating algorithms that deliver predictions with confidence estimates, empowering scientists to make informed decisions at the intersection of models and data.</p>
</div>

{% include section.html %}

<div class="news-shell">
  <div class="section-intro">
    <span class="section-intro__eyebrow">PML4SC News</span>
  </div>

  <div class="news-feed surface-panel">
    <div class="news-feed__scroll">
      {% for item in news %}
        {% include news-item.html date=item.date title=item.title description=item.description congrats_name=item.congrats_name link=item.link tag=item.tag %}
      {% endfor %}
    </div>
  </div>
</div>

{% include section.html %}

<div class="home-section-heading home-section-heading--center">
  <span class="home-section-heading__mark"></span>
  <span class="home-section-heading__icon" aria-hidden="true">
    {% include icon.html icon="fa-solid fa-users" %}
  </span>
  <h1>Team Members</h1>
</div>

{% include section.html %}

{% include list.html data="members" component="portrait" filter="role == 'pi'" %}
{% include list.html data="members" component="portrait" filter="role != 'pi'" %}
