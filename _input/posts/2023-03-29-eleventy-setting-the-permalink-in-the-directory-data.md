---
title: "Eleventy: Setting the permalink in the directory data"
date: 2023-03-29
published: true
tags:
  - Eleventy
  - Web Development
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

The permalink for all templates in a directory can be set in a template directory data file. This can be used along with data variables to generate the ideal URLs.

For example, if you have pages in a `posts` subdirectory, but you want those pages to be at the root of the generated site, you might use something like this:

File: `posts/posts.json`

```json
{
  "permalink": "/{{ fileSlug }}.html"
}
```

Source: [GitHub thread](https://github.com/11ty/eleventy/issues/1783#issuecomment-842669102)