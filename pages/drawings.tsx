import React, {ReactElement} from "react";
import general from "../styles/general.module.css";
import styles from "../styles/drawings.module.css";
import NormalHead from "../components/NormalHead";
import {formatDate} from "../components/MenuItem";
import {getDrawings, DrawingMetadata, DrawingsProps} from "./api/drawings";

const urlStart: string = "http://static.damiensnyder.com/";

export default function NotesPage(props: DrawingsProps): ReactElement {
  return (
    <div className={general.pageContainer + " " + styles.background}>
      <NormalHead title={"partner drawings"} />
      <div className={general.postContainer + " " + styles.postContainer}>
        <p className={styles.headerLinks}>
          <a className={styles.drawingLink} href={"/"}>home</a>
          &nbsp;/&nbsp;
          <a className={styles.drawingLink} href={"/other"}>other</a>
        </p>
        <h1 className={general.pageTitle + " " + styles.pageTitle}>drawings</h1>
        {
          props.posts.map((post: DrawingMetadata, index: number) => {
            const code = post.title.replace(/[#'",.¿?+]/g, "")
                .replace(/\W/g, "-")
                .toLowerCase();

            return <>
              <div className={styles.drawingOuter} key={index}>
                <p className={styles.drawingInfo}>
                  {formatDate(post.date)}
                  &nbsp;&bull;&nbsp;
                  <a className={styles.drawingLink}
                     href={urlStart + code + ".png"}>{post.title}</a>
                </p>
                <div className={styles.collaborators}>
                  {
                    post.collaborators == null ?
                        "with Cooper" : post.collaborators
                  }
                </div>
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