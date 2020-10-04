import React, {ReactElement} from "react";
import {BlogPostProps, getPost} from "../../api/blog/[post]/[date]";
import BlogPostWithDate from "./[date]";
import {BlogPostMetadata, getRecentPosts} from "../../api/blog";

export default function BlogPost(props: BlogPostProps): ReactElement {
  return (
    <BlogPostWithDate name={props.name}
        dates={props.dates}
        date={props.dates[0]}
        code={props.code}
        description={props.description}
        tags={props.tags}
        text={props.text} />
  );
}

export async function getStaticProps(context):
    Promise<{props: BlogPostProps}> {
  return {
    props: await getPost(context.params.post)
  };
}

export async function getStaticPaths() {
  const recentPosts: {posts: BlogPostMetadata[]} = await getRecentPosts();
  return {
    paths: recentPosts.posts.map((post: BlogPostMetadata) => {
      return {
        params: {
          post: post.code
        }
      }
    }),
    fallback: true
  };
}