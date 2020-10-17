import React, {ReactElement} from "react";
import {getPosts, PostMetadata} from "../api/content";
import MenuPage from "../../components/MenuPage";

export default function ContentMenu(props: {posts: PostMetadata[]}):
    ReactElement {
  return <MenuPage title={"content"} posts={props.posts} />;
}

export async function getStaticProps():
    Promise<{props: {posts: PostMetadata[]}}> {
  return {
    props: await getPosts()
  };
}