---
---

{% assign news = site.data.news | sort: "date" | reverse %}

# Welcome 

Developing probabilistic machine learning that quantifies uncertainty for robust scientific computing. Creating algorithms that deliver predictions with confidence estimates, empowering scientists to make informed decisions at the intersection of models and data.

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

# {% include icon.html icon="fa-solid fa-users" %}Team Members

{% include section.html %}

{% include list.html data="members" component="portrait" filter="role == 'pi'" %}
{% include list.html data="members" component="portrait" filter="role != 'pi'" %}
