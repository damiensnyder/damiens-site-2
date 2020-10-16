import React, {ReactElement} from "react";
import general from "../../styles/general.module.css";
import styles from "../../styles/menu.module.css";
import Link from "next/link";
import {getPosts, PostMetadata} from "../api/content";
import MenuItem from "../../components/MenuItem";
import NormalHead from "../../components/NormalHead";

export default function RecentSongs(props: {posts: PostMetadata[]}):
    ReactElement {
  return (
    <div className={general.pageContainer}>
      <NormalHead title={"songs"} />
      <div className={general.postContainer}>
        <h3 className={general.navHeaderOuter}>
          <Link href={"/"}>
            <span className={general.navHeader}>home</span>
          </Link>
        </h3>
        <h1 className={general.pageTitle}>songs</h1>
      </div>
      <div className={styles.plainLinksMenu}>
        {
          props.posts.map((post: PostMetadata, index: number) => {
            return (
              <MenuItem name={post.name}
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

export async function getStaticProps():
    Promise<{props: {posts: PostMetadata[]}}> {
  return {
    props: await getPosts("song")
  };
}