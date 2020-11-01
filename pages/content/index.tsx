import React, {ReactElement} from "react";
import {getPosts, PostMetadata} from "../api/content";
import MenuPage from "../../components/MenuPage";
import {writeFileSync} from "fs";
import {createRssChannel, RssFeedMetadata} from "../api/rss";

export interface MenuStaticProps {
  props: {posts: PostMetadata[]}
}

export interface MenuProps {
  posts: PostMetadata[]
}

export default function ContentMenu(props: MenuProps): ReactElement {
  return <MenuPage title={"content"}
                   posts={props.posts} />;
}

export async function getStaticProps(): Promise<MenuStaticProps> {
  const posts: MenuProps = await getPosts();
  const channelProps: RssFeedMetadata = {
    name: "damien snyder",
    description: "all content posted on damien snyder's website",
    code: "",
    posts: posts.posts
  }
  createRssChannel(channelProps);

  return {
    props: posts
  };
}