import React, {ReactElement, ReactNode} from "react";
import Head from "next/head";
import {getHello, HelloProps} from "./api/hello";
import general from "../styles/general.module.css";
import styles from "../styles/home.module.css";

interface MenuItemProps {
  url: string,
  name: string,
  metadata: string,
  thumbnail: string
}

export default function Home(props: HelloProps): ReactNode {
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
          <MenuItem url={"songs/it-isnt-funny-anymore.mp3"}
              name={"it isn't funny anymore"}
              metadata={"2020.05.28 • song"}
              thumbnail={"thumbs/it-isnt-funny-anymore.png"} />
          <span className={styles.moreLink}><a><i>more content</i> →</a></span>
        </div>
        <div className={styles.linksMenu}>
          <h2 className={styles.menuTitle}>other pages</h2>
          <MenuItem url={"https://twitter.com/damien__snyder"}
              name={"twitter"}
              metadata={"exclusively for humor"}
              thumbnail={"thumbs/twitter.jpg"} />
          <span className={styles.moreLink}><a><i>more other</i> →</a></span>
        </div>
      </div>
    </div>
  );
}

function MenuItem(props: MenuItemProps): ReactElement {
  return (
    <div className={styles.menuItem}>
      <a href={props.url}>
        <img className={styles.thumbnail}
            src={props.thumbnail}
            alt={props.name} />
      </a>
      <div className={styles.itemText}>
      <span className={styles.itemTitle}>
        <a href={props.url}>{props.name}</a>
      </span>
        <span className={styles.itemMetadata}>{props.metadata}</span>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const content: HelloProps = await getHello();

  return {
    props: content
  };
}