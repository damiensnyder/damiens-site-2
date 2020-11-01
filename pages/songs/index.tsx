import React, {ReactElement} from "react";
import {getPosts} from "../api/content";
import MenuPage from "../../components/MenuPage";
import {MenuProps, MenuStaticProps} from "../content";
import {createRssChannel, RssFeedMetadata} from "../api/rss";

export default function RecentPosts(props: MenuProps): ReactElement {
  return <MenuPage title={"songs"} posts={props.posts} />;
}

export async function getStaticProps(): Promise<MenuStaticProps> {
  const posts: MenuProps = await getPosts("blog");
  const channelProps: RssFeedMetadata = {
    name: "damien snyder - songs",
    description: "damien snyder's music",
    code: "/songs",
    posts: posts.posts
  }
  createRssChannel(channelProps);

  return {
    props: posts
  };
}