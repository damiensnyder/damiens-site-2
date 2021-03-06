import React, {ReactElement} from "react";
import general from "../../styles/general.module.css";
import styles from "../../styles/blog.module.css";
import {BlogPostProps, getBlogPost} from "../api/blog/[post]";
import {Paths, getPostPaths} from "../api/content";
import LinkHeader from "../../components/LinkHeader";
import NormalHead from "../../components/NormalHead";
import {formatDate} from "../../components/MenuItem";
import FeedbackForm from "../../components/FeedbackForm";

// Markdown parsing
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import footnotes from 'remark-footnotes';
import {InlineMath, BlockMath} from "react-katex";
import math from "remark-math";
import "katex/dist/katex.min.css";

export const markdownRenderers: any = {
  heading: ({level, children}) => <Heading level={level} children={children} />,
  image: ({src, alt}) => <img className={styles.blogImage}
                              src={src}
                              alt={alt} />,
  inlineMath: ({value}) => <InlineMath math={value} />,
  math: ({value}) => <BlockMath math={value} />,
  footnoteReference: FootnoteReference,
  footnoteDefinition: FootnoteDefinition
}

export const markdownPlugins: any[] = [
  [gfm, {singleTilde: false}],
  footnotes,
  math
];

// Set the classname of heading elements
function Heading(props): ReactElement {
  if (props.level == 1) {
    return <h1 className={styles.blogHeading1}>{props.children}</h1>;
  } else if (props.level == 2) {
    return <h2 className={styles.blogHeading2}>{props.children}</h2>;
  }
  return <h3 className={styles.blogHeading3}>{props.children}</h3>;
}

function FootnoteReference(props): ReactElement {
  return (
    <sup id={"ref-" + props.identifier}>
      <a href={"#def-" + props.identifier}>{props.label}</a>
    </sup>
  );
}

function FootnoteDefinition(props): ReactElement {
  return (
    <div className={styles.footnoteDefinition} id={"def-" + props.identifier}>
      <a className={styles.backToRef}
              href={"#ref-" + props.identifier}>{props.label}</a>
      <div className={styles.footnoteBody}>{props.children}</div>
    </div>
  );
}

export default function BlogPostPage(props: BlogPostProps): ReactElement {
  return (
    <div className={general.pageContainer}>
      <NormalHead title={props.name} />
      <div className={general.postContainer}>
        <LinkHeader path={["blog"]} />
        <h1 className={general.pageTitle}>
          {props.name}
        </h1>
        <p className={general.byline}>
          posted {formatDate(props.date)}
        </p>
        <article className={styles.blogContainer}>
          <ReactMarkdown renderers={markdownRenderers}
                         plugins={markdownPlugins}
                         source={props.text} />
        </article>
        <FeedbackForm fromPage={props.code} />
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