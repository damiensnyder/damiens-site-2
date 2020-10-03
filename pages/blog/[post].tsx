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
  {label: "other", rule: /\n{2,}/g},
];

const inlineSplitRules: RuleWithLabel[] = [
  {label: "code", rule: /(?<!\\)`/g},
  {label: "math", rule: /(?<!\\)\$/g},
  {label: "bold", rule: /(?<!\\)\*\*/g},
  {label: "italic", rule: /(?<!\\)\*/g},
  {label: "strikethrough", rule: /(?<!\\)~~/g},
  {label: "footnote", rule: /(?<!\\)\^\^/g},
  {label: "other", rule: /^$/g}
];

const linkRegex: RegExp = /(?<!\\)\[.*]\(.*\)/g;

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
        {markdownToJsx(props.text)}
      </div>
    </div>
  );
}

function markdownToJsx(text): ReactElement[] {
  // const sections: {title: string, level: number}[] = [];
  const chunks: ChunkProps[] = hierarchicallySplit(text, splitRules);

  const document: ReactElement[] = chunks.map(
      (chunk: ChunkProps, chunkIndex: number) => {
    return (
      <Chunk type={chunk.type}
        text={chunk.text}
        key={chunkIndex} />
    );
  });
  document.splice(0, 0, null);

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
  if (props.type == "other") {
    return <Paragraph text={props.text} />;
  }
  if (props.type == "code") {
    return <CodeBlock text={props.text} />;
  }
  if (props.type == "quote") {
    return <BlockQuote text={props.text} />;
  }
  return null;
}

function Paragraph(props: {text: string}): ReactElement {
  let escaped: string = props.text.replace(/\\\\/g, "🀣");
  if (escaped.startsWith("### ")) {
    return <h3>{subSpansJsx(escaped.slice(4))}</h3>;
  }
  if (escaped.startsWith("## ")) {
    return <h2>{subSpansJsx(escaped.slice(3))}</h2>;
  }
  if (escaped.startsWith("# ")) {
    return <h1>{subSpansJsx(escaped.slice(2))}</h1>;
  }
  if (escaped.startsWith("caption: ")) {
    return <p className={styles.caption}>{subSpansJsx(escaped.slice(9))}</p>;
  }
  if (escaped.startsWith("* ")) {
    return <BulletedList text={props.text} />;
  }
  const images: string[] = escaped.trim().match(/(?<!\\)!\[.*]\(.*\)/);
  if (images != null) {
    return <Image text={images[0]} />;
  }
  return <p className={general.bodyText}>{subSpansJsx(escaped)}</p>;
}

function BulletedList(props: {text: string}): ReactElement {
  return null;
}

function Image(props: {text: string}): ReactElement {
  const unescaped: string = props.text.replace("🀣", "\\");
  const altText: string = unescaped.match(/[.*]/)[0].slice(1, -1);
  const imageSource: string = unescaped.match(/\(\S+\)/)[0].slice(1, -1);
  console.log(imageSource)
  return (
    <img className={styles.caption}
        src={imageSource}
        alt={altText} />
  );
}

function subSpansJsx(text): ReactElement[] {
  const subChunks: ChunkProps[] = hierarchicallySplit(text, inlineSplitRules);
  return subChunks.map((chunk: ChunkProps, chunkIndex: number) => {
    if (chunk.type == "footnote") {
      return <Footnote text={chunk.text} key={chunkIndex} />;
    }
    let spanClass: string = "";
    if (chunk.type == "code") {
      spanClass = styles.inlineCode;
    } else if (chunk.type == "bold") {
      spanClass = styles.emphasis1;
    } else if (chunk.type == "italic") {
      spanClass = styles.emphasis2;
    } else if (chunk.type == "strikethrough") {
      spanClass = styles.strikethrough;
    }
    let processedChunk: ReactElement[] | string = chunk.text;
    if (chunk.type != "code") {
      processedChunk = addLinks(chunk.text);
    }
    return <span className={spanClass} key={chunkIndex}>{processedChunk}</span>;
  });
}

function addLinks(text: string): ReactElement[] {
  const linkMatches: string[] = text.match(linkRegex);
  let links: ReactElement[] = [];
  if (linkMatches != null) {
    links = linkMatches.map((linkText: string, index: number) => {
      const visibleText: string = linkText.match(/\[.*]/)[0].slice(1, -1);
      const url: string = linkText.match(/\(.*\)/)[0].slice(1, -1);
      return <Link href={url} key={index}>{visibleText}</Link>
    });
  }
  const nonLinks: ReactElement[] = text.split(linkRegex).map(
      (nonLinkText: string, index: number) => {
    return <span key={index}>{nonLinkText}</span>;
  });
  const merged: ReactElement[] = [nonLinks[0]];
  for (let i = 0; i < links.length; i++) {
    merged.push(links[i]);
    merged.push(nonLinks[i + 1]);
  }
  return merged;
}

function Footnote(props: {text: string}): ReactElement {
  return (
    <sup className={styles.footnoteAsterisk}>*
      <div className={styles.footnote}>{addLinks(props.text)}</div>
    </sup>
  );
}

function CodeBlock(props: {text: string}): ReactElement {
  const lines: string[] = props.text.split(/\n/g);
  const linesJsx: ReactElement[] = lines.map(
      (line: string, lineIndex: number) => {
    line = line.replace(/\\```\n/, "```\n");
    return <CodeLine text={line} key={lineIndex} />;
  });
  return <div className={styles.codeBlock}>{linesJsx}</div>;
}

function CodeLine(props: {text: string}): ReactElement {
  // Replace spaces with non-breaking spaces, tabs with 4 non-breaking spaces.
  let plaintext: string = props.text.replace(/\t/g, "    ");
  plaintext = plaintext.replace(/ /g, "\u00a0");
  return (
    <p className={styles.codeBlockLine}>{plaintext}</p>
  );
}

function BlockQuote(props: {text: string}): ReactElement {
  // Allow block quotes to be recursively nested by adding more less-than
  // signs then removing one for each level down.
  const subLeveledText: string = props.text.replace(/\n>>>>/g, "\n>>>");
  const subChunks: ChunkProps[] = hierarchicallySplit(subLeveledText,
      splitRules);
  const subChunksJsx: ReactElement[] = subChunks.map(
      (chunk: ChunkProps) => {
    return <Chunk type={chunk.type} text={chunk.text} />
  });

  return <div className={styles.blockQuote}>{subChunksJsx}</div>;
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