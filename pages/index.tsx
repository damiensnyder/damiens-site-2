import React, {ReactElement} from "react";
import Head from "next/head";
import general from "../styles/general.module.css";
import styles from "../styles/menu.module.css";
import Link from "next/link";
import {getPosts, PostMetadata} from "./api/content";
import MenuItem from "../components/MenuItem";
import Menu from "../components/Menu";

export default function Home(props: {posts: PostMetadata[]}): ReactElement {
  return (
    <div className={general.pageContainer}>
      <Head>
        <title>damien snyder</title>
        <link rel={"icon"} href={"/eye-of-judgment.jpg"} />
      </Head>
      <h1 className={general.pageTitle}>
        damien snyder
      </h1>
      <div className={styles.menusContainer}>
        <div className={styles.linksMenu}>
          <h2 className={styles.menuTitle}>recent content</h2>
          <Menu posts={props.posts} hideControls={true} />
          <Link href={"content"}>
            <span className={styles.moreLink}><i>more content</i> →</span>
          </Link>
        </div>
        <div className={styles.linksMenu}>
          <h2 className={styles.menuTitle}>other pages</h2>
          <MenuItem name={"résumé"}
              code={"resume"}
              description={"give me money"}
              dates={["20201007"]}
              tags={[]}
              thumbnail={"number.jpg"} />
          <MenuItem name={"youtube"}
              code={"youtube"}
              description={"my youtube channel"}
              dates={["20201007"]}
              tags={[]}
              thumbnail={"youtube.jpg"} />
          <MenuItem name={"notes"}
              code={"notes"}
              description={"tweets, minus the twitter"}
              dates={["20201007"]}
              tags={[]}
              thumbnail={"notes.jpg"} />
          <Link href={"other"}>
            <span className={styles.moreLink}><i>more other</i> →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: await getPosts("featured")
  };
}