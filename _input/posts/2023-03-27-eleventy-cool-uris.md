---
title: "Eleventy's Cool URIs"
subtitle: "Why did Eleventy create a subdirectory?"
date: 2023-03-27
published: true
tags: 
  - Web Development
  - Eleventy
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

While getting started with 11ty, I saw in the output folder that an `index.md`
file would become `index.html`, as expected, but `README.md` became
`README/index.html`. I didn't understand why there was a special case for the
README file.

It took me a minute, but I [found it](https://www.11ty.dev/docs/permalinks/#cool-uris-dont-change)
with a reference to an article at the W3C stating (among other things) that cool
URIs don't have file extensions.

Okay. I get it. I would've expected something like that to be my job, not the
tool's, but it makes sense and I agree. But what do I do if I really want to
have a named output file. There's gotta be a way. Well, scroll down. The `permalink` *front matter* value allows me to specify the relative URL of the file that will be generated.