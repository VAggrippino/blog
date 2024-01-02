---
id: 882
title: 'How to really check with JavaScript if CSS failed to load from a CDN'
date: '2019-12-04T07:29:41+08:00'
author: 'Vince Aggrippino'
layout: post
guid: 'https://www.aggrippino.com/?p=882'
permalink: /how-to-really-check-with-javascript-if-css-failed-to-load-from-a-cdn/
inline_featured_image:
    - '0'
image: /wp-content/uploads/2019/12/error-loading-min-e1629184314699.jpg
categories:
    - Programming
tags:
    - CSS
    - javascript
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

<figure class="wp-block-image size-full">![](https://i0.wp.com/www.aggrippino.com/wp-content/uploads/2019/12/error-loading-min-e1629184314699.jpg?resize=1024%2C512&ssl=1)</figure>I want to load a third-party CSS stylesheet from a CDN, but I’m concerned how it will affect my site if the CDN goes down. *How do I use JavaScript to check if a CSS file has loaded* so I can load a local fallback instead?

This can’t be a new idea. I can get the answer from a web search, can’t I? …

## Incorrect Solution #1

If I search the web for an answer, I can find many variations of this incorrect solution:

<div class="incorrect-solution-target"></div>```
<pre class="EnlighterJSRAW incorrect-solution" data-enlighter-group="" data-enlighter-highlight="" data-enlighter-language="js" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-theme="" data-enlighter-title="">// Just an example:
cdnUrl = `https://cdnjs.vinceflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css`;
localUrl = `css/all.min.css`;

let loaded = false;
for ( var i = 0; i &lt; document.styleSheets.length, i++ ) {
  if ( document.styleSheets[i].href === cdnUrl ) {
    loaded = true;
  }
}
if ( !loaded ) {
  const localCss = document.createElement(`link`);
  localCss.rel = `stylesheet`;
  localCss.href = localUrl;
  document.querySelector(`head`).appendChild(localCss);
}
```

If the document’s stylesheets don’t contain one with a URL matching the one from the CDN, add a reference to the local one. It doesn’t work, though. `document.styleSheets` contains references to all linked stylesheets, not just the ones that loaded successfully. Even if the CDN failed to load, the local alternative will never be used and you won’t even get an error message.

## Incorrect Solution #2

<div class="incorrect-solution-target"></div>```
<pre class="EnlighterJSRAW incorrect-solution" data-enlighter-group="" data-enlighter-highlight="" data-enlighter-language="js" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-theme="" data-enlighter-title="">// Just an example:
cdnUrl = `https://cdnjs.vinceflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css`;
localUrl = `css/all.min.css`;

let loaded = false;
for ( var i = 0; i &lt; document.styleSheets.length, i++ ) {
  if ( document.styleSheets[i].href === cdnUrl ) {
    if (document.styleSheets[i].cssRules !== null) {
      loaded = true;
    }
  }
}
if ( !loaded ) {
  const localCss = document.createElement(`link`);
  localCss.rel = `stylesheet`;
  localCss.href = localUrl;
  document.querySelector(`head`).appendChild(localCss);
}
```

This one looks a little better… [CSSStyleSheet](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet)s have a `cssRules` property which shows the rules associated with the stylesheet. If it didn’t load, it’ll be `null`, right? Wrong. In Firefox, `cssRules` is an empty array when the stylesheet fails to load. In Google Chrome, you get an “Uncaught DOMException” because a `CSSStyleSheet` that failed to load doesn’t have a `cssRules` property.

## A real solution?

```
<pre class="EnlighterJSRAW" data-enlighter-group="" data-enlighter-highlight="" data-enlighter-language="js" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-theme="" data-enlighter-title="">export function cssFallback(cdnUrl, localPath) {
  // Create a new link tag and append it to the document head
  const loadAlternate = () =&gt; {
    console.log(`Loading ${localPath}.`);
    const link = document.createElement(`link`);
    link.rel = `stylesheet`;
    link.href = localPath;
    document.querySelector(`head`).appendChild(link);
  }

  // Identify the CDN stylesheet
  const stylesheet = Array.from(document.styleSheets).filter((s) =&gt; s.href === cdnUrl)[0];

  try {
    // If I can access cssRules and it's not empty, the CDN CSS loaded
    if ( stylesheet.cssRules.length === 0 ) {
      console.log(`The cssRules for ${cdnUrl} is empty.`)
      loadAlternate();
    }
  } catch (e) {
    console.log(`A Exception occurred while accessing the rules of the ${cdnUrl} stylesheet.`);
    console.log(e);
    loadAlternate();
  }
}
```

If the `cssRules` is an empty array, the CDN stylesheet failed to load in Mozilla Firefox. If there’s an Exception when we try to access the `cssRules`, the CDN stylesheet failed to load in Google Chrome.