import React, {ReactElement} from "react";
import Head from "next/head";
import general from "../../styles/general.module.css";
import styles from "../../styles/blog.module.css";
import Link from "next/link";
import {PostMetadata, getPosts} from "../api/content";
import {formatDate} from "../../components/MenuItem";

export default function BlogPostWithDate(props: PostMetadata): ReactElement {
  return (
    <div className={general.pageContainer}>
      <Head>
        <title>{props.name}</title>
        <link rel={"icon"} href={"/eye-of-judgment.jpg"} />
      </Head>
      <div className={general.postContainer}>
        <h3 className={general.navHeaderOuter}>
          <Link href={"/"}>
            <span className={general.navHeader}>home</span>
          </Link>
          &nbsp;/&nbsp;
          <Link href={"/songs"}>
            <span className={general.navHeader}>songs</span>
          </Link>
        </h3>
        <h1 className={general.pageTitle}>
          {props.name}
        </h1>
        <p className={styles.caption}>
          released {formatDate(props.dates[0])}
        </p>
      </div>
    </div>
  );
}

export async function getStaticProps(context):
    Promise<{props: any}> {
  const songs: {posts: PostMetadata[]} = await getPosts("song");
  const thisSong: PostMetadata = songs.posts.filter((song: PostMetadata) => {
    return song.code == context.params.code;
  })[0];
  return {
    props: thisSong
  };
}

export async function getStaticPaths() {
  const songs: {posts: PostMetadata[]} = await getPosts("song");
  const codes: {params: {code: string}}[] = songs.posts.map(
      (song: PostMetadata) => {
    return {params: {code: song.code}};
  });
  return {
    paths: codes,
    fallback: false
  };
}