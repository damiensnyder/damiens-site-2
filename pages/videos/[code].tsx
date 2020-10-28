import React, {ReactElement} from "react";
import general from "../../styles/general.module.css";
import styles from "../../styles/blog.module.css";
import {PostMetadata, getSinglePost, getPostPaths, Paths} from "../api/content";
import {formatDate} from "../../components/MenuItem";
import LinkHeader from "../../components/LinkHeader";
import NormalHead from "../../components/NormalHead";

// Markdown parsing
import ReactMarkdown from "react-markdown";
import {markdownRenderers, markdownPlugins} from "../blog/[code]";

interface VideoMetadata extends PostMetadata {
  youtube: string
  videoDescription: string
}

export default function VideoPage(props: VideoMetadata): ReactElement {
  return (
    <div className={general.pageContainer}>
      <NormalHead title={props.name}
                  thumbnail={props.thumbnail}
                  keywords={props.tags} />
      <div className={general.postContainer}>
        <LinkHeader path={["videos"]} />
        <h1 className={general.pageTitle}>{props.name}</h1>
        <p className={general.byline}>
          released {formatDate(props.date)}
        </p>
        <iframe width={"100%"}
                height={600}
                scrolling={"no"}
                frameBorder={"no"}
                src={"https://www.youtube.com/embed/" + props.youtube}>
        </iframe>
        <div className={styles.blogContainer}>
          <ReactMarkdown renderers={markdownRenderers}
                         plugins={markdownPlugins}
                         source={props.videoDescription} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context): Promise<{props: any}> {
  return await getSinglePost("video", context.params.code);
}

export async function getStaticPaths(): Promise<Paths> {
  return await getPostPaths("video");
}