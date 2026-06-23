---
title: Members
nav:
  order: 3
  tooltip: Group members
  icon: fa-solid fa-users
---

{% assign principal_investigators = site.members | where: "role", "principal-investigator" %}
{% assign other_members = site.members | where_exp: "member", "member.role != 'principal-investigator'" | sort: "name" %}
{% assign pi_count = site.members | where: "role", "principal-investigator" | size %}

<div class="section-intro members-hero">
  {% include page-kicker.html %}
  <div class="members-stats">
    <div class="members-stat surface-panel">
      <strong>{{ site.members | size }}</strong>
      <span>members listed</span>
    </div>
    <div class="members-stat surface-panel">
      <strong>{{ pi_count }}</strong>
      <span>principal investigator</span>
    </div>
  </div>
</div>

{% include section.html %}

<div class="members-grid">
  {% for member in principal_investigators %}
    {% include member-card.html member=member %}
  {% endfor %}
  {% for member in other_members %}
    {% include member-card.html member=member %}
  {% endfor %}
</div>
