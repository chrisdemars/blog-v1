---
title: 'Colors and the Web'
description: 'How are things going friends? I know 2020 has been a garbage fire but...'
pubDate: 2020-12-09
heroImage: '../../assets/blog/colors-dude.jpg'
tags: ['a11y', 'frontend']
---

How are things going friends? I know 2020 has been a garbage fire but we are almost through it. Cheers to 2021! I wanted to bring you an article on color, the web, and how CVD's (color vision deficiencies) can affect the user experience. We aren't going too in-depth on a medical level, but I wanted to explain how color plays a big part.

## Color Vision Deficiencies

The acronym CVD is something you may or may not have heard of in your journey of working on the web or software. In the most plain terms it means color blindness. According to the American Optometric Association, it means:

> Color vision deficiency is the inability to distinguish certain shades of color.

That being said, it does not mean you only see in shades of gray 100% of the time, but it is a replacement or absence of colors that someone with normal vision can see.

## CVD by the Numbers

What do the numbers look like for people who are color blind? Glad you asked and the numbers might surprise you if you were already unaware.

🙍‍♂️ **1 in 12 men experience some type of CVD**

🙍‍♀️ **1 in 200 women experience some type of CVD**

Color blindness is mostly due to genetics, with women being the carrier of the gene. For more information check out the link below!

➡ https://www.colourblindawareness.org/colour-blindness/inherited-colour-vision-deficiency/real-family-tree/

## Types of CVD

When it comes to types of color blindness, we have 4 main types which I have listed below in comparison to normal color vision:

Normal color vision
![normal color vison](https://dev-to-uploads.s3.amazonaws.com/i/o8xnm30qm7240c8t4fcq.jpg)

1. Deuteranopia

- Reduced sensitivity to green light and it is the most common type of color vision deficiency

![Deuteranopia color blindness](https://dev-to-uploads.s3.amazonaws.com/i/8x36abyv1ofkvmt7sf9k.jpg)

2. Protanopia

- Reduced sensitivity to red light

![Protanopia color blindness](https://dev-to-uploads.s3.amazonaws.com/i/d9psaky1g4llc8eza840.jpg)

3. Tritanopia

- Reduced sensitivity to blue light and is extremely rare

![Tritanopia color blindness](https://dev-to-uploads.s3.amazonaws.com/i/a04nqu208kzfx3bnippx.jpg)

4. Monochromatic

- Vision in shades of gray. The most rare type of CVD. By the numbers 1 in 33,000 people experience this type of CVD

![Monocrhomatic color blindness](https://dev-to-uploads.s3.amazonaws.com/i/wuxn351ip1m5bgku4kws.jpg)

## Problems We Face

There are a lot of problems when it comes to accessibility as a whole but two of the biggest and most often are low hanging fruit are color contrast and communication through color.

### Color Contrast

Color contrast is how the foreground color "pops" off the background color. The Bureau of Internet Accessibility puts it in more technical terms.

> Color contrast is the difference in light between font (or anything in the foreground) and its background.

When determining colors to use always keep the user in mind. Too many times we build things that we think are really cool and almost never seem to put ourselves in the users shoes. This is one piece of the puzzle we have to be cognizant of.

![Failing color contrast example](https://dev-to-uploads.s3.amazonaws.com/i/eqyn2641bkoxinxcil6i.png)

The above colors fail because the lightness of the gray foreground color almost blends in with the white background color. The contrast ratios vary according to the size of the text. This fails at a small text size, but it would pass at a larger text size.

If you are looking for more information about color contrast, levels of conformance (A, AA, AAA) and how to test and find the right combinations, check out my article below.

➡️ [Chrome DevTools: Accessible Colors](https://uxdesign.cc/chrome-devtools-accessible-colors-300ec462a63c)

### Communication Through Color

This is a very big problem. One thing that we can not do is communicate **SOLELY** through the use of color. Perfect example, I was working at a company in Michigan and saw a post on one of our intranet portals. It was a new tool that was being built for internal users yet it was built to communicate intent with color only. There were ZERO fallbacks as to what those colors meant.

To me this was a red flag and I called it out. Long story short, the legal team caught wind of it and I was pulled into an office to discuss "why I shouldn't call out things like that." The convo turned out with me getting praise for ruffling feathers about the importance of accessibility.

Something like the example below would not work if by chance you said "change your status to red, green or yellow." What if the person using the tool can't see those colors? What if that user does in fact experience monochromatic color blindness? Being exclusive to you users is not the path you want to travel down. It comes with a price.

**Below is an example of communication through color.**

Normal color vision
![Chart with colors](https://dev-to-uploads.s3.amazonaws.com/i/nogpkgkken4hytsy0egw.png)

Monochromatic color vision
![Chart with monochromatic colors](https://dev-to-uploads.s3.amazonaws.com/i/ck5mjvwsgai7y553so0z.png)

## Solutions

There are a few tools out there that can help with figuring out what colors are best. Chrome has it's own contrast checker built in to the DevTools which you can learn more about in the article I posted above that I wrote.

Lea Verou also has a great tool that I tend to highlight called [Contrast Ratio](https://contrast-ratio.com/). It allows you to input a color for the foreground and background and see if they pass, you can also swap the colors to check them as well.

Our friends at WebAIM have a great tool as well, [Contrast Checker](https://webaim.org/resources/contrastchecker/). It is very insightful and has a link at the bottom of the page to check the contrast of links.

One of the biggest ways to tackle color contrast issues in my opinion is through communication. Work and communicate with your marketing or design teams to come up with the best, accessible color combinations you can as to not leave out users.

## Wrapping Up

As you can see, color is **VERY** important on the web. Users have to be able to see what they are doing and have an amazing user experience at the same time. One thing I would hate to happen is to ship an something that someone couldn't use. Knowing that my experience was not inclusive and not doing anything about it.

We work on the web for a reason, probably multiple reasons, but the main reason being the user. We are the voice of the user and must do everything in power to advocate for them. It is why I do what I do. That being said I leave you with this quote, one of my personal ones.

> Accessibility is **NOT** a requirement, it is a **MUST**.
