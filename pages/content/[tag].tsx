import React, {ReactElement} from "react";
import {getPosts, Paths, PostMetadata} from "../api/content";
import MenuPage from "../../components/MenuPage";
import {MenuProps} from "./index";

interface TagProps extends MenuProps {
  posts: PostMetadata[],
  tag: string
}

export default function RecentPosts(props: TagProps): ReactElement {
  const tag: string = props.tag == undefined ? "" : props.tag;
  return <MenuPage title={tag} posts={props.posts} />;
}


export async function getStaticProps(context): Promise<{props: TagProps}> {
  return {
    props: {
      posts: (await getPosts(context.params.tag)).posts,
      tag: context.params.tag
    }
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
    fallback: false
  };
  tags.forEach((tagName: string) => {
    paths.paths.push({params: {tag: tagName}});
  })
  return paths;
}