---
title: Nunjucks Whitespace Control
subtitle: "Doesn't work as expected... or does it?"
date: 2023-04-16
published: true
templateEngineOverride: md
excerpt: "
  <p>
    Nunjucks' <a href='https://mozilla.github.io/nunjucks/templating.html#whitespace-control'>Whitespace Control</a>
    doesn't work the way I expected it to. So, I tried every variation of the syntax I could think of to see how it
    would render.
  </p>
"
---
## {{ title }}

[Nunjucks](https://mozilla.github.io/nunjucks/) templating with
[Eleventy](https://www.11ty.dev/) is a powerful combination for content
creation but I've noticed an oddity with
<em>[whitespace control](https://mozilla.github.io/nunjucks/templating.html#whitespace-control)</em>.

It doesn't work like I expected it to. I'd like to complain that it's poorly
documented but if I were given the task of documenting how this works, I'd
struggle to get it right. Here are some examples based on the simple example in
the documentation...

No dashes:
```html
<div>
  {% for i in [1,2,3,4,5] %}
    {{ i }}
  {% endfor %}
</div>
```
Result:
```html
<div>
  
    1
  
    2
  
    3
  
    4
  
    5
  
</div>
```
Even the blank lines have a 2-space indent.

-----

Dashes at the end of the opening tag and the beginning of the closing tag. This is the documented example:
```html
<div>
  {% for i in [1,2,3,4,5] -%}
    {{ i }}
  {%- endfor %}
</div>
```
Result:
```html
<div>
  12345
</div>
```
I expected it to remove the 2-space indent from the output, but this is arguably the way it's documented. The 2-digit indent produced is the same two spaces before the `{% for` tag.

-----

Dashes at the beginnings of the opening and closing tags:
```html
<div>
  {%- for i in [1,2,3,4,5] %}
    {{ i }}
  {%- endfor %}
</div>
```
Result:
```html
<div>
    1
    2
    3
    4
    5
</div>
```
My first impression of this is that it didin't do anything. There are four spaces before the variable tag in the input and four spaces before the number in the output. However, I'm starting to understand how this works. It removed the whitespace before the first bracket of the `for` tag and between the last bracket of the variable tag and the first bracket of the `endfor` tag.

-----

Dashes at the ends of the loop tags:
```html
<div>
  {% for i in [1,2,3,4,5] -%}
    {{ i }}
  {% endfor -%}
</div>
```
Result:
```html
<div>
  1
  2
  3
  4
  5
  </div>
```
Huh!? Those spaces don't make any sense at first glance. There aren't two spaces anywhere but in the output! Where did the spaces before the closing `</div>` come from?!... Do you see what mistake I was making yet? I do. This removed the whitespace between the closing bracket of the `for` tag and the opening bracket of the variable tag as well as after the closing bracket of the `endfor` tag (there wasn't any there anyway). The spaces rendered in the output are from before the `{% endfor` tag.

-----

Dashes everywhere:
```html
<div>
  {%- for i in [1,2,3,4,5] -%}
    {{ i }}
  {%- endfor -%}
</div>
```
Result:
```html
<div>12345</div>
```
Finally! That's what I thought I was going to get in the first place. It removed all the leading and trailing whitespace.

-----

### Summary

I thought the `for`/`endfor` lines didn't count. I thought that, like a JavaScript `for` loop, all that mattered was what was inside the block. In a Nunjucks template everything that's outside of the `{% %}` is rendered. And the documentation says that. So, a dash at the beginning of the tag eliminates the whitespace before the tag and a dash at the end of the tag eliminates the whitespace after the tag. Now that I understand it, I think the only thing I could do to improve the documentation is add some more examples.