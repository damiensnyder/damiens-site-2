import {PostMetadata} from "./content";
import {writeFileSync} from "fs";
import {formatDate, getType} from "../../components/MenuItem";

export interface RssFeedMetadata {
  code: string,
  name: string,
  description: string,
  posts: PostMetadata[]
}

export function rssItem(post: PostMetadata): string {
  // I don't know why replaceAll() doesn't work, but this... functions.
  return `
    <item>
      <title>${post.name}</title>
      <description>${post.description}</description>
      <guid>https://www.damiensnyder.com/${getType(post.tags)}/${post.code}</guid>
      <link>https://www.damiensnyder.com/${getType(post.tags)}/${post.code}</link>
      <date>${(new Date(formatDate(post.date).replace(".", "-").replace(".", "-"))).toUTCString()}</date>
    </item>
  `;
}

export function createRssChannel(feed: RssFeedMetadata): void {
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
        ${feed.posts.map(rssItem).join('')}
      </channel>
    </rss>
  `;
  writeFileSync(`./public${feed.code}/rss.xml`, rss);
}