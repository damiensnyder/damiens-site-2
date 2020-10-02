import React, {ReactElement, ReactNode} from "react";
import Head from "next/head";
import general from "../../styles/general.module.css";
import styles from "../../styles/blog.module.css";
import {BlogPostProps, getPost} from "../api/blog/[post]";
import Link from "next/link";

const splitRules: RuleWithLabel[] = [
  {label: "code", rule: /\n```\n/g},
  {label: "math", rule: /\n\$\$\$\n/g},
  {label: "quote", rule: /\n>>>\n/g},
  {label: "img", rule: /\nimg\n/g},
  {label: "p", rule: /\n{2,}/g},
];

interface ChunkProps {
  type: string,
  text: string
}
interface RuleWithLabel {
  label: string,
  rule: RegExp
}

export default function BlogPost(props: BlogPostProps): ReactNode {
  return (
    <div className={general.pageContainer}>
      <Head>
        <title>my blog post</title>
        <link rel={"icon"} href={"/eye-of-judgment.jpg"} />
      </Head>
      <div className={general.postContainer}>
        <h3 className={general.navHeader}>
          <Link href={"/"}>home</Link> / <Link href={"blog"}>blog</Link>
        </h3>
        <h1 className={general.pageTitle}>
          {props.name}
        </h1>
        <p className={styles.caption}>
          last edited
          <select className={styles.versionSelect}>
            <option className={styles.versionOption}
                value={props.date}
                label={props.date} />
          </select>
        </p>
        <PostBody text={props.text}/>
      </div>
    </div>
  );
}

function PostBody(props: {text: string}) {
  // const sections: {title: string, level: number}[] = [];
  const chunks: ChunkProps[] = hierarchicallySplit(props.text, splitRules);

  const document = chunks.map((chunk: ChunkProps, chunkIndex: number) => {
    return (
      <Chunk type={chunk.type}
        text={chunk.text}
        key={chunkIndex} />
    );
  });

  return document;
}

function hierarchicallySplit(text: string,
                             rules: RuleWithLabel[]): ChunkProps[] {
  let final: ChunkProps[] = [];
  const splitText: string[] = text.split(rules[0].rule);
  splitText.forEach((chunk: string, chunkIndex: number) => {
    if (rules.length > 1 && chunkIndex % 2 == 0) {
      final = final.concat(hierarchicallySplit(chunk, rules.slice(1)));
    } else {
      final.push({
        type: rules[0].label,
        text: chunk
      });
    }
  });
  return final;
}

function Chunk(props: ChunkProps): ReactElement {
  return <p className={general.bodyText}>{props.type}: {props.text}</p>;
}

export async function getStaticProps(context):
    Promise<{props: BlogPostProps}> {
  const post: BlogPostProps = await getPost(context.params.post);
  return {
    props: post
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