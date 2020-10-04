import React, {ReactElement} from "react";
import Head from "next/head";
import general from "../../styles/general.module.css";
import styles from "../../styles/menu.module.css";
import Link from "next/link";
import {BlogPostMetadata, getRecentPosts} from "../api/blog";

export default function RecentPosts(props: {posts: BlogPostMetadata[]}):
    ReactElement {
  const sortedPosts: BlogPostMetadata[] = props.posts.sort(
      (a: BlogPostMetadata, b: BlogPostMetadata): number => {
    return b.dates[0].localeCompare(a.dates[0]);
  });
  return (
    <div className={general.pageContainer}>
      <Head>
        <title>blog</title>
        <link rel={"icon"} href={"/eye-of-judgment.jpg"} />
      </Head>
      <div className={general.postContainer}>
        <h3 className={general.navHeaderOuter}>
          <Link href={"/"}>
            <span className={general.navHeader}>home</span>
          </Link>
        </h3>
        <h1 className={general.pageTitle}>blog</h1>
      </div>
      <div className={styles.plainLinksMenu}>
        {
          sortedPosts.map((post: BlogPostMetadata, index: number) => {
            return (
              <BlogItem name={post.name}
                  code={post.code}
                  description={post.description}
                  dates={post.dates}
                  tags={post.tags}
                  thumbnail={post.thumbnail}
                  key={index} />
            );
          })
        }
      </div>
    </div>
  );
}

function BlogItem(props: BlogPostMetadata): ReactElement {
  const dateText: string = props.dates[0].slice(0, 4) + "." +
      props.dates[0].slice(4, 6) + "." + props.dates[0].slice(6);
  const thumbnailSrc: string = props.thumbnail ?
    "thumbs/" + props.thumbnail : "thumbs/bucko.jpg";
  return (
    <div className={styles.menuItem}>
      <Link href={"/blog/" + props.code}>
        <img className={styles.thumbnail}
             src={thumbnailSrc}
             alt={props.name} />
      </Link>
      <div className={styles.itemText}>
        <span className={styles.itemTitle}>
          <Link href={"/blog/" + props.code}>{props.name}</Link>
        </span>
        <span className={styles.itemMetadata}>
          {dateText} &bull; {props.description}
        </span>
      </div>
    </div>
  );
}

export async function getStaticProps():
    Promise<{props: {posts: BlogPostMetadata[]}}> {
  return {
    props: await getRecentPosts()
  };
}