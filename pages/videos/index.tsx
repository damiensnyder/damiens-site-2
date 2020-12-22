import React, {ReactElement} from "react";
import {getPosts} from "../api/content";
import MenuPage from "../../components/MenuPage";
import {MenuProps, MenuStaticProps} from "../content";
import {createRssChannel, RssFeedMetadata} from "../api/rss";

export default function RecentPosts(props: MenuProps): ReactElement {
  return <MenuPage title={"videos"} posts={props.posts} />;
}

export async function getStaticProps(): Promise<MenuStaticProps> {
  const posts: MenuProps = await getPosts("video");
  const channelProps: RssFeedMetadata = {
    name: "damien snyder - videos",
    description: "damien snyder's videos",
    code: "/videos",
    posts: posts.posts
  }
  await createRssChannel(channelProps);

  return {
    props: posts
  };
}