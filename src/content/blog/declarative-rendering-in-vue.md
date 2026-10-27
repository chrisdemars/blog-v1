---
title: 'Declarative Rendering in Vue'
description: 'So you wanted to get started using Vue, but not sure how right? I was in that same boat. I am not a JavaScript engineer/“expert”, so…'
pubDate: 2018-04-15
heroImage: '../../assets/blog/vuejs.png'
tags: ['dev', 'frontend', 'VueJS']
---

So you wanted to get started using Vue, but not sure how right? I was in that same boat. I am not a JavaScript engineer/“expert”, so picking up something like Vue, I thought, would be very difficult. Think of it like being a neurosurgeon, but one day you have to perform surgery on a person's foot. Might be challenging if podiatry is not your wheelhouse. Continue reading to see how learning a bit about declarative rendering in vue isn’t that painful.

## My Problem

If you have been hiding under a rock or just not a developer at all, you probably have heard about this thing called JavaScript, I would say little thing, but we all know JavaScript is a behemoth of a language. The problem is that since the industry (people in power) seem to be only hiring JS developers and have COMPLETELY forgotten that HTML and CSS make up 2/3 of the web, I decided to learn Vue to supplement the gaps in my 22 years of knowledge.

I decided to try the first thing of Vue to learn, declarative rendering. After I played with just rendering one string to the screen in CodePen, I decided that it would be cool to do this with my own site, since it is mostly text anyways.

## Using Vue

Setup using Vue is great because it does not involve any tooling. And if you want to take advantage of the Vue devtools, be sure to use the proper CDN.

```html
<script _src_\="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

There is also a CLI tool that you can use to install Vue as well, if you do want tooling based around your projects.

install vue-cli  
`$ npm install --global vue-cli`

create a new project using the "webpack" template  
`$ vue init webpack my-project`

install dependencies and go!  
`$ cd my-project`

`$ npm run dev`

That code is directly from the [VueJS website](https://vuejs.org/v2/guide/installation.html).

## The Code Before (HTML)

Below is a snippet of the code before I started to add in Vue.

```html
<h1>Chris DeMars</h1>
<h2>UI Developer - Conference Speaker - Writer</h2>
<p>
  Hey everyone 👋🏻. The name is Chris DeMars and I build lovely ui's. My ❤️ is in
  Denver, CO my body is in Detroit, MI and my workstation is just north of
  there.
</p>
```

I really wanted to start getting a handle around Vue and what it has to offer. I picked off some low hanging fruit by using string interpolation using “Mustache” syntax, mustache syntax being the double curly braces around a string.

## The Code After (HTML)

Below is a snippet of the code after I added in string interpolation.

```html
<h1>{{ name }}</h1>
<h2>{{ title }}</h2>
```

What this means is that take whatever is passed in to the `name` property, display here, which used to be “Chris DeMars”, now that string is set in the JavaScript. The same goes with the `title` property. The original title contained in the `h2` was “UI Developer — Conference Speaker — Writer”. Now, that string lives in the JavaScript file as well.

## The JavaScript

All that HTML is great right? Of course it is! But we have to have some JavaScript, in this case, Vue, to bind some things together.

```js
var app = new Vue({
  el: '#app',
  data: {
    name: 'Chris DeMars',
    title: 'UI Developer - Conference Speaker - Writer',
  },
});
```

Does it start to make sense once you see what is being passed through the data property?

First we create a new instance of Vue using `var app = new Vue ({});` We than put on an `id` on the element we want the data to be rendered in:

<main _class_\="wrapper" id="app">  
    <!-- Code goes here -->  
</main>

I want all my data to be rendered within the `main` element with an `id` of `app`.

The final product looks like this, with my name and title being rendered using Vue.

![](https://cdn-images-1.medium.com/max/800/1*PuH85n-itFklrpcDg50azQ.png)

My site using Vue to render data.

## Conclusion

In my opinion, Vue is not that bad. From the perspective of a non-js developer, it feels less stressful to pick up opposed to React and Angular. Yes, I know that React is a library not a framework but it is so robust that picking up Vue would be first on my list.

If you are a non-js developer and are starting to play around with Vue, let me know. I would love to hear about why you are starting to fall in love with it.
