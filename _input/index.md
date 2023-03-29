---
layout: base.html
title: "Coding and Technologies Blog"
subtitle: "by Vince Aggrippino"
---

# {{ title }}
<span class="subtitle">{{subtitle}}</span>

## Posts
<ul>
  {%- for post in collections.post | reverse -%}
    <li><a href="{{post.page.url}}">{{ post.data.title }}</a>, posted {{post.page.date}}</li>
  {%- endfor -%}
</ul>
