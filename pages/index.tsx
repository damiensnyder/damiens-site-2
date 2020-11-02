import React, {ReactElement} from "react";
import Head from "next/head";
import general from "../styles/general.module.css";
import styles from "../styles/menu.module.css";
import Link from "next/link";
import {getPosts, PostMetadata} from "./api/content";
import Menu from "../components/Menu";
import {MenuProps, MenuStaticProps} from "./content";
import NormalHead from "../components/NormalHead";

interface HomeProps extends MenuProps {
  other?: PostMetadata[]
}

interface HomeStaticProps extends MenuStaticProps {
  props: {
    posts: PostMetadata[],
    other?: PostMetadata[]
  }
}

export default function Home(props: HomeProps): ReactElement {
  return (
    <div className={general.pageContainer}>
      <NormalHead title={"damien snyder"}
          description={"damien snyder's personal website"}
          keywords={["homepage"]} />
      <h1 className={general.pageTitle}>
        damien snyder
      </h1>
      <div className={styles.menusContainer}>
        <div className={styles.linksMenu}>
          <h2 className={styles.menuTitle}>recent content</h2>
          <Menu posts={props.posts} hideControls={true} />
          <span className={styles.moreLink}>
            <Link href={"other"}>more content →</Link>
          </span>
        </div>
        <div className={styles.linksMenu}>
          <h2 className={styles.menuTitle}>other pages</h2>
          <Menu posts={props.other} hideControls={true} />
          <span className={styles.moreLink}>
            <Link href={"other"}>more other →</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(): Promise<HomeStaticProps> {
  const props: HomeProps = await getPosts("featured");
  props.other = (await getPosts("featured-other")).posts;
  return {
    props: props
  };
}