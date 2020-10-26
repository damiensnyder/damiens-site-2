import React, {ReactElement} from "react";
import general from "../../styles/general.module.css";
import styles from "../../styles/blog.module.css";
import {BlogPostProps, getBlogPost} from "../api/blog/[post]";
import {Paths, getPostPaths} from "../api/content";
import LinkHeader from "../../components/LinkHeader";
import NormalHead from "../../components/NormalHead";
import {formatDate} from "../../components/MenuItem";

// Markdown parsing
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {InlineMath, BlockMath} from "react-katex";
import math from "remark-math";
import "katex/dist/katex.min.css";

export const markdownRenderers: any = {
  inlineMath: ({value}) => <InlineMath math={value} />,
  math: ({value}) => <BlockMath math={value} />
}

export const markdownPlugins: any[] = [
  math,
  [gfm, {singleTilde: false}]
];

export default function BlogPostPage(props: BlogPostProps): ReactElement {
  return (
    <div className={general.pageContainer}>
      <NormalHead title={props.name} />
      <div className={general.postContainer}>
        <LinkHeader path={["blog"]} />
        <h1 className={general.pageTitle}>
          {props.name}
        </h1>
        <p className={general.caption}>
          posted {formatDate(props.date)}
        </p>
        <div className={styles.blogContainer}>
          <ReactMarkdown renderers={markdownRenderers}
                         plugins={markdownPlugins}
                         source={props.text} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context): Promise<{props: BlogPostProps}> {
  return {
    props: await getBlogPost(context.params.code)
  };
}

export async function getStaticPaths(): Promise<Paths> {
  return await getPostPaths("blog");
}