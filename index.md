---
---

{% assign news = site.data.news | sort: "date" | reverse %}

# Welcome 

Developing probabilistic machine learning that quantifies uncertainty for robust scientific computing. Creating algorithms that deliver predictions with confidence estimates, empowering scientists to make informed decisions at the intersection of models and data.

{% include section.html %}

<div class="news-shell">
  <div class="section-intro news-shell__intro">
    <span class="section-intro__eyebrow">PML4SC News</span>
    <h1 class="section-intro__title">{% include icon.html icon="fa-solid fa-bullhorn" %}News</h1>
    <p class="section-intro__text">
      Recent updates from the group. The feed is scrollable so new announcements can be
      added without breaking the homepage layout.
    </p>
  </div>

  <div class="news-feed surface-panel">
    {% for item in news %}
      {% include news-item.html date=item.date title=item.title description=item.description first_author=item.first_author link=item.link tag=item.tag %}
    {% endfor %}
  </div>
</div>

{% include section.html %}

# {% include icon.html icon="fa-solid fa-users" %}Team Members

{% include section.html %}

{% include list.html data="members" component="portrait" filter="role == 'pi'" %}
{% include list.html data="members" component="portrait" filter="role != 'pi'" %}



<script type="text/javascript" id="clustrmaps" src="//clustrmaps.com/map_v2.js?d=9f1vHcMmMi84T7kaisYUV5xZjiW2LkL357lw086kTOs&cl=ffffff&w=270&h=180"></script>
