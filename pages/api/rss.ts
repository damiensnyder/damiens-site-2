import {PostMetadata} from "./content";
import {writeFileSync} from "fs";
import {formatDate, getType} from "../../components/MenuItem";

// Parsing blog posts to markdown
import unified from "unified";
import remarkParser from "remark-parse";
import remarkHtml from "remark-html";
import gfm from "remark-gfm";
import footnotes from 'remark-footnotes';
import math from "remark-math";
import {BlogPostProps, getBlogPost} from "./blog/[post]";

export interface RssFeedMetadata {
  code: string,
  name: string,
  description: string,
  posts: PostMetadata[]
}

const HTML_ESCAPES: [RegExp, string][] = [
  [/&/g, "&amp;"],
  [/>/g, "&gt;"],
  [/</g, "&lt;"],
  [/"/g, "&quot;"],
  [/'/g, "&apos;"],
];

async function markdownToHtml(post: PostMetadata): Promise<string> {
  let markupString: string = post.description;
  if (post.tags.includes("blog")) {
    const postWithText: BlogPostProps = await getBlogPost(post.code);
    unified()
        .use(remarkParser)
        .use(remarkHtml)
        .use([gfm, {singleTilde: false}])
        .use(footnotes)
        .use(math)
        .process(postWithText.text, (err, file) => {
      markupString = String(file);
    });
  }
  return escapeRssCharacters(markupString);
}

function escapeRssCharacters(text: string): string {
  HTML_ESCAPES.forEach(([character, replacement ]) => {
    text = text.replace(character, replacement);
  });
  return text
}

async function rssItem(post: PostMetadata): Promise<string> {
  return `
    <item>
      <title>${escapeRssCharacters(post.name)}</title>
      <description>${await markdownToHtml(post)}</description>
      <guid>https://www.damiensnyder.com/${getType(post.tags)}/${post.code}</guid>
      <link>https://www.damiensnyder.com/${getType(post.tags)}/${post.code}</link>
      <date>${
        (new Date(formatDate(post.date).replace(/\./g, "-"))).toUTCString()
      }</date>
    </item>
  `;
}

export async function createRssChannel(feed: RssFeedMetadata): Promise<void> {
  const posts: string = (await Promise.all(
    feed.posts.map(item => rssItem(item)))
  ).join('');

  const rss: string = `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${feed.name}</title>
        <link>https://www.damiensnyder.com${feed.code}</link>
        <description>${feed.description}</description>
        <language>en</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="https://www.damiensnyder.com${feed.code}.xml"
                rel="self" type="application/rss+xml"/>
        ${posts}
      </channel>
    </rss>
  `;
  writeFileSync(`./public${feed.code}/rss.xml`, rss);
}