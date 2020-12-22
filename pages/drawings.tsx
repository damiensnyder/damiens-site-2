import React, {ReactElement} from "react";
import general from "../styles/general.module.css";
import styles from "../styles/drawings.module.css";
import LinkHeader from "../components/LinkHeader";
import NormalHead from "../components/NormalHead";
import {formatDate} from "../components/MenuItem";
import {getDrawings, DrawingMetadata, DrawingsProps} from "./api/drawings";
import Link from "next/link";

const urlStart: string = "http://static.damiensnyder.com/";

export default function NotesPage(props: DrawingsProps): ReactElement {
  return (
    <div className={general.pageContainer + " " + styles.background}>
      <NormalHead title={"notes"} />
      <div className={general.postContainer + " " + styles.postContainer}>
        <p className={styles.headerLinks}>
          <a className={styles.drawingText} href={"/"}>home</a>
          &nbsp;/&nbsp;
          <a className={styles.drawingText} href={"/other"}>other</a>
        </p>
        <h1 className={general.pageTitle + " " + styles.pageTitle}>drawings</h1>
        {
          props.posts.map((post: DrawingMetadata, index: number) => {
            const code = post.title.replace(/[#'",.¿?]/, "")
                .replace(/\W/g, " ")
                .replace(/ /g, "-")
                .toLowerCase();

            return <>
              <div className={styles.drawingOuter} key={index}>
                <p className={styles.drawingDate}>
                  {formatDate(post.date)}
                  &nbsp;&bull;&nbsp;
                  <a className={styles.drawingText}
                     href={urlStart + code + ".png"}>{post.title}</a>
                </p>
              </div>
            </>;
          })
        }
      </div>
    </div>
  );
}

export async function getStaticProps(): Promise<{props: DrawingsProps}> {
  return await getDrawings();
}