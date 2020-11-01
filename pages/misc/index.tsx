import React, {ReactElement} from "react";
import {getPosts} from "../api/content";
import MenuPage from "../../components/MenuPage";
import {MenuProps, MenuStaticProps} from "../content";
import {createRssChannel, RssFeedMetadata} from "../api/rss";

export default function RecentPosts(props: MenuProps): ReactElement {
  return <MenuPage title={"misc"} posts={props.posts} />;
}

export async function getStaticProps(): Promise<MenuStaticProps> {
  const posts: MenuProps = await getPosts("blog");
  const channelProps: RssFeedMetadata = {
    name: "damien snyder - misc",
    description: "miscellaneous content from damien snyder's website",
    code: "/misc",
    posts: posts.posts
  }
  createRssChannel(channelProps);

  return {
    props: posts
  };
}