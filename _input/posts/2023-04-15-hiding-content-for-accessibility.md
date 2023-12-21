---
title: Hiding Content for Accessibility
subtitle: Implementing <code>.sr-only</code> <em>The Right Way</em>™️
date: 2023-04-15
published: true
---
## {{ title }}

Sometimes a website that seems clear and easy to use for sighted users can cause
some confusion for those who rely on a screen reader for navigation.

In addition to [semantic elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html),
we need to [label regions](https://www.w3.org/WAI/tutorials/page-structure/labels/)
to make a page easier to navigate.

When content is added for screen readers that would seem redundant to sighted
users, or otherwise disrupt the design, it should be visually hidden.  These
styles are recommended by WebAIM for hiding content off-screen:

```css
.sr-only {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
```

In [CSS in Action](https://webaim.org/techniques/css/invisiblecontent/)
WebAIM covers this and several other techniques for visually hiding content.
