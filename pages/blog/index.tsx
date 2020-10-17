import React, {ReactElement} from "react";
import {getPosts, PostMetadata} from "../api/content";
import MenuPage from "../../components/MenuPage";

export default function RecentPosts(props: {posts: PostMetadata[]}):
    ReactElement {
  return (
    <MenuPage title={"blog"} posts={props.posts} />
  );
}

export async function getStaticProps():
    Promise<{props: {posts: PostMetadata[]}}> {
  return {
    props: await getPosts("blog")
  };
}