---
title: 'Focusing on Focus'
description: 'What’s up my a11y allies? Were you aware that the mouse and keyword handle focus differently? Well it’s true. Both handle them differently…'
pubDate: 2017-08-08
heroImage: '../../assets/blog/focusing-on-focus.png'
tags: ['dev', 'frontend', 'accessibility', 'conferences']
---

Focus is a crucial element to the usage and experience of the application we are interacting with. It is also the visual indicator of the element of an application we are focused on. There is a caveat to our focus psuedo class however, and that is our friend `outline`.

Before we get started, read this over and over until it is engrained in your mental space.

```css
:focus {
  outline: 0;
}
```

This leads us in to our problem.

## The Problem

There are times when a designer or art director could approach you and say that the outline that renders around certain elements of the page like links, or buttons, doesn’t look…good. It doesn’t match our branding and, well, can you please just remove it.

![](https://cdn-images-1.medium.com/max/800/1*v7vKzh1oLQYf-_Q0ddH5kQ.jpeg)

Dev versus designer

And then being a developer, you follow up with, “sure I can remove it, but what alternative do you have to replace the outline?” If they look at you confused, then this is a great time to open up the communication of the importance of focus and what you can do collaboratively to make the experience accessible.

## Reset & Normalize

If you have used [Eric Meyer’s reset](http://cssreset.com/scripts/eric-meyer-reset-css/), he removes the focus outline, but he explicitly says to define focus styles after the reset. What about normalize? If you go through the [normalize css file](https://github.com/necolas/normalize.css/blob/master/normalize.css) and do a search for focus, you won’t find it. You will however find styles for `:-moz-focusring`. Currently, `:-moz-focusring` is not a thing so those styles that are being applied using the `-moz`prefix might not work. If you go to the [Mozilla Web Docs](https://developer.mozilla.org/en-US/) and search for `:-moz-focusring` there is a warning at the top that states this such thing.

![](https://cdn-images-1.medium.com/max/800/1*L3jU8qJ2eS5t6-KepUAzmQ.jpeg)

Focus ring and moz focus ring.

`:focus-ring` and `:-moz-focusring` seem to both be the same, neither are standards…yet. `:focus-ring` which has been renamed to `:focus-visible`is currently in the [CSS 4 spec](https://drafts.csswg.org/selectors-4/#the-focus-pseudo) and there is a polyfill which is the focus, no pun intended, of this post.

## Importance of Focus

There needs to be a way for accessible and non-accessible users to be able to see where they are during interactions. A great example that I read about are login and password inputs. Focus indicates that you are on a password field after you input your login. It would suck if you went to start typing your password but had no visual indication of where you were actually typing your password.

## What is Focus?

> Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.

> [Web Content Accessibility Guidelines](https://https://www.w3.org/TR/WCAG21/#focus-visible)

According to the Web Content Accessibility Guidelines 2.0, it states that any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible. Now that being said, it doesn’t say a blue ring, this is afforded by the browser, but is has to have some type of visual distinction.

## Browsers & Focus

![](https://cdn-images-1.medium.com/max/800/1*5vMad6NVh7jf3JofvvpvVQ.jpeg)

Browsers & Focus

Browsers handle focus differently as far as visual presentation goes, as well as functionality. They also focus differently from mouse to keyboard. I gave a talk illustrating these differences that you can find here ==> [Focusing on Focus](https://speakerdeck.com/chrisdemars/focusing-on-focus?slide=23).

## The Problem Continued

I touched briefly on `:focus-visible` earlier, it is currently in the [CSS 4 spec,](https://drafts.csswg.org/selectors-4/#the-focus-pseudo) it originally landed on the 18th of May as `:focus-ring`. It’s not in any browsers yet, but there is a polyfill out there, one of which I am going to show you.

![](https://cdn-images-1.medium.com/max/800/1*Ifo_3LdDQrtq31yZvCNtiA.png)

When you remove the default focus by assigning it a value of zero or none, you remove that for everyone, both keyboard and mouse users. Even others who use some type of assistive technology if I had to bet on it.

Some mouse users, on the other hand, don’t like having a focus-ring around custom elements, like custom buttons. This polyfill removes the focus ring from these elements for mouse users, but adds it back in for keyboard users.

## The Resolution

Focus-ring polyfill to the rescue! Essentially it is only these three lines of CSS, and using an already complete JS file. Pretty cool huh?

```javascript
.js-focus-visible :focus:not(.focus-visible) {
 outline: 0;
}
```

Below is a snippet from the JS file. What it means is anything that is focused, that does not have a focus ring, set the outline to none. This caters to the mouse users. It sets a focus ring to all the things in the whitelist in the JS file for both mouse and keyboards, except buttons. It turns off the focus ring for buttons for mouse clicks, but still allows the focus ring for keyboard users.

![](https://cdn-images-1.medium.com/max/800/1*YaYqRxxIQDmfDWZG-r8wOA.png)

## The Support

Currently there is no support for `:focus-visible` at the moment, but I am pushing to get it implemented in all major browsers.

If you would also like to get it implemented, reach out to your favorite browser vendors and see what they say.

## Awesome People!

A huge shoutout to [Alice Boxhall](https://twitter.com/sundress) ([Alice Boxhall](https://medium.com/u/d9ebbd42f5b9)), [Rob Dodson](https://twitter.com/rob_dodson) ([Rob Dodson](https://medium.com/u/d712d6fb229b)), and all the fine people who have [contributed](https://github.com/WICG/focus-ring/graphs/contributors) to the focus-visible polyfill and continue to make it great!
