import React from "react";
import Head from 'next/head';
import styles from '../components/home/home.module.css';

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Damien Snyder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.pageTitle}>
        Damien Snyder
      </h1>
      <div className={styles.menusContainer}>
        <div className={styles.linksMenu}>
          <h2 className={styles.menuTitle}>Recent content</h2>
          <div className={styles.menuItem}>
            <img className={styles.thumbnail}
                src={"https://damiensnyder.com/thumbs/it-isnt-funny-anymore.png"} />
            <div className={styles.itemText}>
              <span className={styles.itemTitle}>it isn't funny anymore</span>
              <span className={styles.itemDate}>2020.05.28</span>
            </div>
          </div>
        </div>
        <div className={styles.linksMenu}>
          <h2 className={styles.menuTitle}>Other pages</h2>
        </div>
      </div>
    </div>
  );
}
