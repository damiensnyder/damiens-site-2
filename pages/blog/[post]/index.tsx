import React, {ReactElement} from "react";
import {BlogPostProps, getPost} from "../../api/blog/[post]/[date]";
import BlogPostWithDate from "./[date]";

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
  return {
    paths: [
      {
        params: {
          post: "this-is-my-first-blog-post"
        }
      }
    ],
    fallback: true
  };
}