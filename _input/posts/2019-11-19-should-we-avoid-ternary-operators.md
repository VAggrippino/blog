---
id: 866
title: 'Should We Avoid Ternary Operators?'
date: '2019-11-19T07:25:56+08:00'
author: 'Vince Aggrippino'
layout: post
guid: 'https://www.aggrippino.com/?p=866'
permalink: /should-we-avoid-ternary-operators/
inline_featured_image:
    - '0'
spay_email:
    - ''
image: /wp-content/uploads/2021/08/ternary_operator_carbon.jpg
categories:
    - Programming
tags:
    - code
    - javascript
    - programming
published: true
---
## {{ title }}
<figure class="wp-block-image size-large">![](https://i0.wp.com/www.aggrippino.com/wp-content/uploads/2021/08/ternary_operator_carbon.jpg?resize=1024%2C512&ssl=1)</figure>I recently read a Facebook post which suggested it was better to use a ternary operator instead of an if…else statement whenever the result would be a single line of code. That doesn’t seem right.

I’ve noticed this trend toward shorter, smaller code, and I understand the appeal. If I can do in one line of code what used to take six lines, it feels more efficient. However, when it comes to executing the code, there’s no performance difference between an if…else statement and a ternary operator.

## Code Quality Perspective

Measuring programming progress by lines of code is like measuring aircraft building progress by weight.  
― Bill Gates

It doesn’t seem very long ago that Software Engineers conflated the number of lines written with the skill of the programmer or the quality of the code… More lines of code meant better code. In Bill Gates’ quote, he’s addressing this misconception, but the point is the difference in perspective from then to now.

## Ternary Operator Benefits

**Efficiency**… but not really  
The ternary operator feels like a hack that makes our code more efficient. However, efficiency is most important during execution. During development, the most important thing is readable code.

**Smaller code**  
A web page does load faster if the browser has less to download, but this type of optimization is the job of a minification tool, not a programmer. And it is well known that “[premature optimization is the root of all evil](https://en.wikiquote.org/wiki/Donald_Knuth#Computer_Programming_as_an_Art_(1974))“.

**Readability**… but not usually  
Sometimes compressing a complex concept into a single line makes code easier to understand. This is the only time the ternary operator should actually be used. It’s easy to abuse the ternary operator, though, resulting in unreadable code.

## Ternary Operator Facts

### In favor of ternary operators

- Sometimes using the ternary operator makes code easier to understand by compressing a complex concept into a single statement.

### In favor of if…else statements

- Usually the if…else syntax is easier to understand. The separation between the condition and each action allows the reader to pause and consider each action and when it occurs.
- The ternary operator further encourages terse code which is harder to read and can lead to mistakes like failing to consider *[falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)* values.
- A ternary operator may be easy to understand, and look nicer, when it’s first written. However, it’ll be more difficult to understand for another developer, or even the original developer when returning to the code months later.

## Conclusion

Of course we shouldn’t stop using ternary operators! On either side of the debate, there’s an argument for improving readability of code. So, use it when it’ll improve readability. But there are more reasons to use if…else syntax. We *should* avoid ternary operators, but it’s a guideline, not a rule. And even when considering rules, we must remember that “[A foolish consistency is the hobgoblin of little minds](http://slashslash.info/2018/02/a-foolish-consistency/)“.