Hi, this is my [personal site](https://www.damiensnyder.com). The code is
available under the MIT License, which means you can fork it to create projects
of your own. See
[LICENSE.md](https://github.com/damiensnyder/personal-website/blob/main/LICENSE.md)
for more about the license. The site is built with
[Next.JS](https://nextjs.org/). I recommend you become familiar with the
framework before modifying this website. For more about me, check out the
[about](https://www.damiensnyder.com/about) page of my website, or my
[resume](http://static.damiensnyder.com/resume.pdf).

# Structure

## Pages

Because this site is built with Next.JS, the structure of the `pages` folder is
the structure of content on the website. For example, `pages/blog/[code].tsx`
renders the blog page with the content code `code`. Navigating my site online
and paying attention to the URLs will give you a good feel for the directory
structure of the repo.

## APIs

The only files that violate this pattern are in the `pages/api` folder. I think
I'm supposed to be able to send JSON at the web endpoints of these, identical to
to what the functions I'm using do (like `getNotes()`, in `pages/api/notes.ts`).
I haven't done that yet, and I don't consider it very important. These files are
instead used to feed data to the other pages. They read JSON files (situated
in the `content` folder; more on that later) and parse them to get information
to generate the other pages. The file `pages/api/content/index.ts` gets all the
metadata about the songs, blog posts, videos, and other 'content'.
`pages/api/blog/[post].ts` gets the text of a blog post. `pages/api/drawings.ts`
gets metadata about the drawings, and `pages/api/notes.ts` about the notes.
Finally, `pages/api/rss.ts` generates RSS feeds for the site. It places the
XML in the `public` folder during the build. (This is why some of the folders
have empty files named `temp.txt`: the path needs to exist in the repo to
prevent 'directory does not exist' errors.)

## Components

Fairly straightforward. This is where all the React components live. Check the
usages of them to see their purpose.

## Content

The `content` folder contains all the content displayed on the site (as opposed
to the code used to display it). The `content/blog` folder contains the markdown
of all the blog posts, and `content/content.json` contains the metadata of all
the songs, blog posts, etc. The rest should be self-explanatory.

## Public

Some static assets go in here. Mainly only pictures. Larger assets, like music
and drawings, are hosted at
[static.damiensnyder.com](http://static.damiensnyder.com).

## Styles

All the CSS goes here. Most of the files are labeled according to the kind of
page they're used on. `styles/general.module.css` is used on many pages, and
`styles/globals.css` contains default styles for various HTML elements.

# Contributing

I'm not seeking new content, or stylistic edits. If you see an unintentional
typo, feel free to change it. Same if a link goes to the wrong page, or some
other metadata causes a page to display wrong. I'd be very picky about the style
of these, but if anyone really wants to contribute, this is my rainy-day list of
features I kind of want but don't want to put in the work to implement:

- make a real 404 page, that checks the URL and tries to guess what page you
  were looking for
- make the 'filter by tag' component preserve the filter if I go to a page and
  return with the back button
- make the YouTube and SoundCloud embeds scale properly on all devices
- add thumbnails for some of the content without it
- make menu items show ellipsis instead of just cutting off if their names are
  too long
- make the menu pages maintain their width even if none of the content takes
  up all the horizontal space (filter by "vocal" to see what I mean)
- improve the documentation of all the functions

In reality? Why would you bother? Who is looking at this repo, anyway?