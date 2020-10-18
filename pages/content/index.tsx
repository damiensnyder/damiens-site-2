import React, {ReactElement} from "react";
import {getPosts, PostMetadata} from "../api/content";
import MenuPage from "../../components/MenuPage";

export interface MenuStaticProps {
  props: {posts: PostMetadata[]}
}

export interface MenuProps {
  posts: PostMetadata[]
}

export default function ContentMenu(props: MenuProps): ReactElement {
  return <MenuPage title={"content"} posts={props.posts} />;
}

export async function getStaticProps(): Promise<MenuStaticProps> {
  return {
    props: await getPosts()
  };
}