import React, {ReactElement, SyntheticEvent} from "react";
import general from "../../../styles/general.module.css";
import styles from "../../../styles/blog.module.css";
import {BlogPostProps, getBlogPost} from "../../api/blog/[post]/[date]";
import Link from "next/link";
import {NextRouter, useRouter} from "next/router";
import {PostMetadata, getPosts, Paths} from "../../api/content";
import LinkHeader from "../../../components/LinkHeader";
import NormalHead from "../../../components/NormalHead";

const splitRules: RuleWithLabel[] = [
  {label: "code", rule: /\n```\n/g},
  {label: "math", rule: /\n\$\$\$\n/g},
  {label: "quote", rule: /\n>>>\n/g},
  {label: "list", rule: /\n\*\*\*\n/g},
  {label: "other", rule: /\n+\n/g},
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

export default function BlogPostWithDate(props: BlogPostProps): ReactElement {
  const router: NextRouter = useRouter();
  const changeDate: (e: SyntheticEvent) => void = (e: SyntheticEvent) => {
    // @ts-ignore
    const newDate: string = e.target.value;
    router.push("/blog/" + props.code + "/" + newDate).then(null);
  };

  return (
    <div className={general.pageContainer}>
      <NormalHead title={props.name} />
      <div className={general.postContainer}>
        <LinkHeader path={["blog"]} />
        <h1 className={general.pageTitle}>
          {props.name}
        </h1>
        <p className={general.caption}>
          {
            props.date == props.dates[0] ?
              "last edited" : "viewing version from"
          }
          <select className={styles.versionSelect}
              defaultValue={props.date}
              onChange={changeDate}>
            {
              props.dates.map((date: string, index: number) => {
                const dateText: string = date.slice(0, 4) + "." +
                    date.slice(4, 6) + "." + date.slice(6);
                return (
                  <option className={styles.versionOption}
                      value={date}
                      key={index}
                      label={dateText} />
                );
              })
            }
          </select>
        </p>
        {markdownToJsx(props.text)}
      </div>
    </div>
  );
}

export function markdownToJsx(text): ReactElement[] {
  const chunks: ChunkProps[] = hierarchicallySplit(text, splitRules);

  const document: ReactElement[] = chunks.map(
      (chunk: ChunkProps, index: number) => {
      return chunkJsx(chunk, index);
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

function chunkJsx(props: ChunkProps, key: number): ReactElement {
  if (props.type == "other") {
    return <Paragraph text={props.text} key={key} />;
  }
  if (props.type == "code") {
    return <CodeBlock text={props.text} key={key} />;
  }
  if (props.type == "quote") {
    return <BlockQuote text={props.text} key={key} />;
  }
  if (props.type == "list") {
    return (
      <BulletedList text={props.text}
          block={true}
          key={key} />
    );
  }
  return null;
}

function Paragraph(props: {text: string}): ReactElement {
  let escaped: string = props.text.replace(/\\\\/g, "🀣");
  if (escaped.startsWith("### ")) {
    return (
      <h4 className={styles.subSubHeading}
          id={props.text}>{subSpansJsx(escaped.slice(4))}</h4>
    );
  }
  if (escaped.startsWith("## ")) {
    return (
      <h3 className={styles.subHeading}
          id={props.text}>{subSpansJsx(escaped.slice(3))}</h3>
    );
  }
  if (escaped.startsWith("# ")) {
    return (
      <h2 className={styles.heading}
          id={props.text}>{subSpansJsx(escaped.slice(2))}</h2>
    );
  }
  if (escaped.startsWith("caption: ")) {
    return <p className={general.caption}>{subSpansJsx(escaped.slice(9))}</p>;
  }
  if (escaped.startsWith("* ")) {
    return <BulletedList text={props.text.slice(2)} block={false} />;
  }
  if (escaped.startsWith("> ")) {
    const startsRemoved: string = props.text.replace(/\n> /g, "\n");
    return <BlockQuote text={startsRemoved} />;
  }
  const images: string[] = escaped.trim().match(/(?<!\\)!\[.*]\(.*\)/);
  if (images != null) {
    return <Image text={images[0]} />;
  }
  return <p className={general.bodyText}>{subSpansJsx(escaped)}</p>;
}

function BulletedList(props: {text: string, block: boolean}): ReactElement {
  let contents: ReactElement[];
  if (!props.block) {
    contents = props.text.split(/\n\* /mg).map(
        (bulletItem: string, index: number) => {
      return <li key={index}>{subSpansJsx(bulletItem)}</li>;
    });
  } else {
    contents = hierarchicallySplit(props.text, splitRules).map(
        (chunk: ChunkProps, index: number) => {
        return chunkJsx(chunk, index);
      }
    );
  }
  return <ul className={general.bodyText}>{contents}</ul>;
}

function Image(props: {text: string}): ReactElement {
  const unescaped: string = props.text.replace("🀣", "\\");
  const altText: string = unescaped.match(/[.*]/)[0].slice(1, -1);
  const imageSource: string = unescaped.match(/\(\S+\)/)[0].slice(1, -1);
  return (
    <img className={styles.insertImage}
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
      return <Link href={url} key={2 * index + 1}>{visibleText}</Link>
    });
  }
  const nonLinks: ReactElement[] = text.split(linkRegex).map(
      (nonLinkText: string, index: number) => {
        return <span key={2 * index}>{nonLinkText}</span>;
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
        <span className={styles.footnote}>{addLinks(props.text)}</span>
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
  const subLeveled: string = props.text.replace(/\n>>>>/g, "\n>>>");
  const subChunks: ChunkProps[] = hierarchicallySplit(subLeveled, splitRules);
  const subChunksJsx: ReactElement[] = subChunks.map(
      (chunk: ChunkProps, index: number) => {
    return chunkJsx(chunk, index);
  });

  return <blockquote>{subChunksJsx}</blockquote>;
}

export async function getStaticProps(context):
    Promise<{props: BlogPostProps}> {
  return {
    props: await getBlogPost(context.params.post, context.params.date)
  };
}

export async function getStaticPaths(): Promise<Paths> {
  const recentPosts: {posts: PostMetadata[]} = await getPosts("blog");
  const codesAndDates: {params: {post: string, date: string}}[] = [];
  recentPosts.posts.forEach((post: PostMetadata) => {
    return post.dates.forEach((date: string) => {
      codesAndDates.push({
        params: {
          post: post.code,
          date: date
        }
      });
    });
  });
  return {
    paths: codesAndDates,
    fallback: true
  };
}