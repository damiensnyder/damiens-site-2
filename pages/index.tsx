import React, {ReactElement, ReactNode} from "react";
import Head from "next/head";
import general from "../styles/general.module.css";
import styles from "../styles/menu.module.css";
import Link from "next/link";

interface MenuItemProps {
  code: string,
  name: string,
  type: string,
  date: string,
  tags: string[],
  featured: boolean,
  description?: string,
  collection?: string
}

export default function Home(props: {}): ReactNode {
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
          <span className={styles.moreLink}><a><i>more content</i> →</a></span>
        </div>
        <div className={styles.linksMenu}>
          <h2 className={styles.menuTitle}>other pages</h2>
          <span className={styles.moreLink}><a><i>more other</i> →</a></span>
        </div>
      </div>
    </div>
  );
}

function MenuItem(props: MenuItemProps): ReactElement {
  let url: string;
  let metadata: string = props.date + " • " + props.type;
  if (props.type == "song") {
    url = "songs/" + props.code;
  } else if (props.type == "video") {
    url = "videos/" + props.code;
  } else if (props.type == "blog") {
    url = "blog/" + props.code;
  } else {
    url = props.type;
    metadata = props.description;
  }

  return (
    <div className={styles.menuItem}>
      <Link href={url}>
        <img className={styles.thumbnail}
            src={"thumbs/" + props.code + ".png"}
            alt={props.name} />
      </Link>
      <div className={styles.itemText}>
      <span className={styles.itemTitle}>
        <a href={url}>{props.name}</a>
      </span>
        <span className={styles.itemMetadata}>{metadata}</span>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {}
  };
}