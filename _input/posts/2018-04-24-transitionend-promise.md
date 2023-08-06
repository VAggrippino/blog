---
id: 582
title: 'transitionend Promise'
HTMLTitle: "<code>transitionend</code> Promise"
date: '2018-04-24T10:27:55+08:00'
author: 'Vince Aggrippino'
layout: post
guid: 'https://www.aggrippino.com/?p=582'
permalink: /transitionend-promise/
inline_featured_image:
    - '0'
image: /wp-content/uploads/2018/04/20180424_041449_transitionend_Promise_demo.gif
categories:
    - Programming
tags:
    - javascript
    - NodeJS
    - programming
    - webd
---

I’m working on a page that displays thumbnail images. When I click on a thumbnail I want it to show an <g class="gr_ gr_27 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del" data-gr-id="27" id="27">info box</g> containing more image details. I’m using a CSS transition on the <g class="gr_ gr_28 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del" data-gr-id="28" id="28">info box</g> and I want to populate the image details while the <g class="gr_ gr_29 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del" data-gr-id="29" id="29">info box</g> is hidden. If the <g class="gr_ gr_30 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del" data-gr-id="30" id="30">info box</g> is already visible from clicking on a different thumbnail, I need to hide it first and populate the image details after the transition completes.

Here’s some pseudocode that shows what I want to happen…

```js
thumbnail.addEventListener('click', e => {
  if (infoBox.isVisible()) {
    // hide the info box (CSS transition)
    // after the transition ends, populate the image details
  } else {
    // populate the image details immediately
  }

  // show the info box (CSS transition)
})
```

The browser triggers a [`transitionend` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event) when a transition finishes, but it’s not fired at all if the info box is already hidden. A function that hides the element and returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) would be ideal. The Promise would be resolved after the transition completed or immediately if theinfo box was already hidden, but I don’t use JavaScript to hide or show an element. I typically just toggle a `hidden` class and let the CSS animation do the work, so we can’t determine when the animation has completed.

I can’t just return a Promise from the event handler for `transitionend` because I don’t call the event handler. I just pass it as an argument to [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) and the browser calls it. But there’s always a way…

I searched for *promises for CSS transition events*, but the higher ranking search result has a **fatal flaw**. In a *pen*1 entitled “CSS Transition End with a Promise”, a Promise *is* resolved when the transition completes, but **the event handler is never removed from the element**. The code attempts to remove the handler, but [`removeEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) is passed a function that wasn’t attached as the event handler. **The actual event handler is an anonymous function** that calls the function which the author tries to remove. If you use this code it could eventually cause a problem (What kind of problem? How soon? … this needs testing) as new event handlers are infinitely attached to the element.

I found a good solution on my second attempt at [this *Gist*](https://gist.github.com/davej/44e3bbec414ed4665220)). The trick is a function that returns a Promise and makes a CSS (or CSS class) change that causes a transition, then immediately attaches an event handler for the `transitionend` event in which it removes itself and resolves the promise.

Here’s my demo inspired by the Gist:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="pVgjjj" data-user="VAggrippino" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/VAggrippino/pen/pVgjjj">
  CSS `transitionend` event with a Promise</a> by Vince Aggrippino (<a href="https://codepen.io/VAggrippino">@VAggrippino</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
