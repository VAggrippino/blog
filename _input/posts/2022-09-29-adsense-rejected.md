---
id: 1088
title: 'AdSense: Rejected 😓'
date: '2022-09-29T14:49:32+08:00'
author: 'Vince Aggrippino'
excerpt: 'AdSense has rejected this page. Oh well... It''s time to create some fresh content.'
layout: post
guid: 'https://www.aggrippino.com/?p=1088'
permalink: /adsense-rejected/
image: /wp-content/uploads/2022/09/Your-site-isnt-ready-to-show-ads.jpg
categories:
    - Uncategorized
    - 'Website Management'
tags:
    - AdSense
    - wordpress
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

I’ve been putting some effort into bringing my blog back to life. I’d like it to be a source of income, so I started looking into Google AdSense.

A few days later, I received an email telling me “Your site isn’t ready to show ads” because of a violation of Google’s Site Behavior policy regarding navigation:

<div class="wp-block-jetpack-markdown">> Examples of misguided navigation include, but are not limited to:
> 
> - False claims of downloadable or streaming content
> - Linking to content that does not exist
> - Redirecting users to irrelevant and/or misleading webpages
> - Text on a page unrelated to the topic and/or business model of the website.

</div>🤔… Okay, but this site definitely doesn’t have any of those things. It’s just me writing what’s on my mind. It does have some old articles that have external links, though. I’ve posted [a question](https://support.google.com/adsense/thread/181880337?hl=en) on the Google AdSense help forum. In the mean time, I’ll make sure there are no broken links. Since this is a WordPress site, I think I’ll give the [Broken Link Checker](https://wordpress.org/plugins/broken-link-checker/) plugin a try.

### AdSense Help: Rejected

Update, 2<sup>nd</sup> October 2022

After I went through every link in every article, my question on the Google AdSense Help forum was flagged as a duplicate, locked to prevent further discussion, and linked to [Two of the most common reasons for site disapproval \[AdSense Pro Post\]](https://support.google.com/adsense/thread/176631357). I suppose the reason for rejection that was given by Google AdSense is meaningless and it’s all about content and traffic.

I thought AdSense might approve my site before I do the work to build an audience. After all, low traffic also means they don’t have to pay out. They’ve got a point, though. Without interesting content, the site might as well not exist… It’s time to write some interesting content.