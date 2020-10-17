import React, {ReactElement} from "react";
import {getPostPaths, getPosts, Paths, PostMetadata} from "../api/content";
import MenuPage from "../../components/MenuPage";

interface TagProps {
  posts: PostMetadata[],
  tag?: string
}

export default function RecentPosts(props: TagProps):
    ReactElement {
  return <MenuPage title={props.tag} posts={props.posts} />;
}


export async function getStaticProps(context): Promise<{props: TagProps}> {
  const posts: TagProps = await getPosts(context.params.tag);
  posts.tag = context.params.tag;
  return {
    props: posts
  };
}

export async function getStaticPaths(): Promise<Paths> {
  const posts: {posts: PostMetadata[]} = await getPosts();
  const tags = new Set();
  posts.posts.forEach((post: PostMetadata) => {
    post.tags.forEach((tag: string) => tags.add(tag));
  });
  const paths: Paths = {
    paths: [],
    fallback: true
  };
  tags.forEach((tagName: string) => {
    paths.paths.push({params: {tag: tagName}});
  })
  return paths;
}