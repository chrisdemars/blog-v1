---
title: 'Demystifying CSS Variables'
description: 'What?!?!? CSS variables in the browser? Do my eyes deceive me?'
pubDate: 2018-04-30
heroImage: '../../assets/blog/css-vars.png'
tags: ['dev', 'frontend', 'css']
---

What?!?!? CSS variables in the browser? Do my eyes deceive me?

Have those thoughts circled your brain before? They probably did if you were unaware that we can make this happen now in your favorite browsers.

![](https://cdn-images-1.medium.com/max/800/1*Y_EngHGfs7Yx081qPIV9GQ.png)

The year is 2018 and we now have the ability to create DOM (Document Object Model) aware variables that just work at runtime. It is an amazing time to be a developer. Especially a CSS developer like myself.

## Getting Started

There is nothing to it to get started using CSS variables in the browser. Do you write Sass? Or Less? Or maybe even…Stylus? Well if you do, you know that you have to compile the variables before runtime in order for the values you are using with the variables to work. Not anymore. Unless you have to support IE11, IMO, there is no reason to use this feature of your favorite preprocessor.

There is nothing to install either, no `npm` packages to `-g` or `yarn`'s to `add`. With a little understanding of how the syntax works, you can be up and running in no time.

## The Syntax

The way to write out CSS variables is not painful at all. You can declare all your styles at the root level, think of this as a global scope for your styles.

```css
:root {
  --header-color: #0fb9b1;
  --sidebar-color: #f7b731;
  --main-color: #eb3b5a;
  --footer-color: #a55eea;
}
```

These colors I am using are just examples. Now, you have colors for all your main areas of your layout, just to distinguish what is what.

The actual example colors I am using come from my conference talk all about CSS, check it out [here](https://speakerdeck.com/chrisdemars/believe-in-the-power-of-css).

In order to use the colors that you decalred at the root level of your stylesheet, make sure that you are using the `var` keyword in your style declaration.

```css
.header {
  background-color: var(--header-color);
}
```

When you pass the name of the variable in to the parenthesis, it will take on the color that you specified at the root level.

## Scoped Styles

One of THE coolest things about CSS variables is that you can scope variables to the class level. You heard correct. You can override the `:root` variables at the style declaration level.

Here is an example of how that would look.

```css
:root {
  --header-color: #0fb9b1;
}

.header {
  --header-color: ##ff6b81;

  background-color: var(--header-color);
}
```

Now, the header will take on the color you defined inside the `.header` class. That is so cool and mind blowing and you should totally love CSS variables.

## CodePen Example

Here is a small video of using CSS variables in CodePen to show how they actually work, instead of looking at code.

![](https://cdn-images-1.medium.com/max/1200/1*j-_VcI2hnedswOMlyUIRIQ.gif)

CodePen demo of CSS variables.

## Last Thoughts

CSS variables are great, CSS is great, and if you do not have to support IE11, you can use this awesome feature in production today. If you do have to support IE11 you can always load in a stylesheet that supports Sass or Less conditionally based on the browser. This way your experience can degrade gracefully.
