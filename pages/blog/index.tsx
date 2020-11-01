import React, {ReactElement} from "react";
import {getPosts} from "../api/content";
import MenuPage from "../../components/MenuPage";
import {MenuProps, MenuStaticProps} from "../content";
import {createRssChannel, RssFeedMetadata} from "../api/rss";

export default function RecentPosts(props: MenuProps): ReactElement {
  return <MenuPage title={"blog"} posts={props.posts} />;
}

export async function getStaticProps(): Promise<MenuStaticProps> {
  const posts: MenuProps = await getPosts("blog");
  const channelProps: RssFeedMetadata = {
    name: "damien snyder - blog",
    description: "damien snyder's blog",
    code: "/blog",
    posts: posts.posts
  }
  createRssChannel(channelProps);

  return {
    props: posts
  };
}