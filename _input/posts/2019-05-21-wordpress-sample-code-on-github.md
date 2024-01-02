---
id: 610
title: 'WordPress Sample Code on GitHub'
date: '2019-05-21T16:42:46+08:00'
author: 'Vince Aggrippino'
layout: post
guid: 'https://www.aggrippino.com/?p=610'
permalink: /wordpress-sample-code-on-github/
inline_featured_image:
    - '0'
categories:
    - Programming
    - WordPress
tags:
    - code
    - github
    - programming
    - wordpress
format: status
published: true
---

{% set _image_alt = title %}
{% if image_alt %}
    {% set _image_alt = image_alt %}
{% endif %}

{% if image %}
    <figure class="post__image">
        <img src="{{ image }}" alt="{{ _image_alt }}">
    </figure>
{% endif %}

## [{{ title }}]({{ page.url }})

<p class="post__date">{% formatted_date data.date %}</p>

Considering #WordPress Plugin Development? Do a [search on GitHub for “*WordPress plugin*“](https://github.com/search?q=wordpress+plugin&type=Repositories) and find all the sample code you ever wanted.