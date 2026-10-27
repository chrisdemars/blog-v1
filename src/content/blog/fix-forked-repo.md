---
title: 'How-To Detach a Forked Repo'
description: 'Picture this. You find a template or a tool you want to use on GitHub. You fork the repo, clone it, and then start working on it locally...'
pubDate: 2025-05-09
heroImage: '../../assets/blog/posts/fix-forked-repo/gh-contribs.jpg'
tags: ['GitHub', 'Open Source', 'How-To']
---

Picture this. You find a template or a tool you want to use on GitHub. You fork the repo, clone it, and then start working on it locally. Everything is cool until you look at your contribution chart and **NOTHING** is showing up. Talk about a WTF!?! moment. I found out the hard way and found the fix.

## Fork & Clone the Repo

Go to your favorite repo of choice. For this example I am using this Astro template...literally the one you are reading this post on. It is called Astrofy and I wanted to make it my own by modifying it, etc. I _thought_ if I cloned it, it would be mine and the code I pushed would show up on my chart...not the case. Once GitHub does its thing and forks the repo, make sure you clone it down to your machine. The command for that is:

```bash
git clone https://github.com/{USERNAME}/{REPO}
```

If you have SSH set up, it may look a little different but the job still gets done.

```bash
git clone git@github.com:/{USERNAME}/{REPO}
```

Perfect, now you have a working project on your machine and only your machine. You will be able to commit all the code and push said code to your heart desires and **SHOW THE WORLD YOU HAVE AN ACTIVE GITHUB CHART!**

Not so quick, keep reading.

## Breaking It Down

There is a proper term for doing this, it is called, "Leave fork network". You can find this in the settings of the repo you forked.

In this example, I am going to use the [Funko Showcase Workshop](https://github.com/chrisdemars/funko-showcase-workshop) repo. This was a workshop that myself and Jeff Blankenburg created during our time at DigitalOcean. The structure of the workshop was forked from the DigitalOcean Community repo where I created the OG repo.

You can see on the homepage of your repo that it is forked below the repo name.

![Forked repo message below the repo name on GitHub.](../../assets/blog/posts/fix-forked-repo/fork.jpg)

When you fork a repo, clone it, and push back to the repo. You aren't "technically" pushing changes to your repo. In my opinion, you are pushing into the void and they don't count. Therefore you won't see the contributions on your chart. Makes sense because I have worked on a few things that were forked and now that I think of it, I never saw the contributions show up.

The image below shows a snahpshot of today, a before picture. I haven't committed anything. I did search in my history and i never detached the fork from the OG Funko repo, why? Because I didn't know it was a thing. Once I publish this blog post and detach the fork, you will see the contribution show up for today.

The repo will essentailly be linked directly to me and I can work on it and show progress as I see fit.

![Contribution chart on my GitHub profile.](../../assets/blog/posts/fix-forked-repo/gh-activity.jpg)

## Detaching from the Fork

Make sure that you are in your repo and follow these steps.

1. Go to Settings.
2. Scroll all the way to the bottom and look for the option to "Leave fork network". It is in the "Danger Zone" section. Insert Top Gun gif here ↴

<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzc5OWh3dzN5bzI3YmQxeGN2eHh0Y3FqMzZoM2NiZ29zZTg5cDExeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26AHLNr8en8J3ovOo/giphy.gif" alt="I feel the need for speed quote from Top Gun.">

3. There will be a button to the right of "Leave fork network", click that button. You will get a dialog that pops up letting you know about ALL the bad things that can happen when leaving the fork network. If you are cool with those issues, click the disclaimer button.

4. Another dialog will pop up and you will be presented with the fork repo, and some info. You have to type the name of the fork, including the author into the input to make sure it is corret.

5. Once that is done, click the button below that says "Leave fork network".

NOW you should be all set to have this repo attached to you as a standalone, non-forked repo. All the changes you make will now show in your contributions and graphs. The video below walks you throuh all the steps if you need to visually see it.

After you add some changes, commit, and push. You will see those contributions reflected in the chart.

![Forked repo message below the repo name on GitHub.](../../assets/blog/posts/fix-forked-repo/new-contrib.jpg)

The video below walks you throuh all the steps if you need to visually see it.

<video controls aria-label="Walking through the steps of leaving the fork network of your original repo.">
  <source src="/videos/detach-fork.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

I hope you found this article helpful! Share it with your network if you can, and if you dig it, you can always [buy me a coffee 😉.](https://ko-fi.com/W7W7QQ34)
