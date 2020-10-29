import React, {ReactElement} from "react";
import general from "../styles/general.module.css";
import styles from "../styles/notes.module.css";
import LinkHeader from "../components/LinkHeader";
import NormalHead from "../components/NormalHead";
import {formatDate} from "../components/MenuItem";
import {getNotes, NoteMetadata, NotesProps} from "./api/notes";

const tweetUrlStart: string = "https://twitter.com/damien__snyder/status/";

export default function NotesPage(props: NotesProps): ReactElement {
  return (
    <div className={general.pageContainer}>
      <NormalHead title={"notes"} />
      <div className={general.postContainer}>
        <LinkHeader path={["other"]} />
        {
          props.posts.map((post: NoteMetadata, index: number) => {
            return (
              <div className={styles.noteOuter} key={index}>
                <p className={styles.noteDate}>
                  {formatDate(post.date)}
                  {
                    post.tweet == undefined ? null : <>
                      &nbsp;&bull;&nbsp
                      <a className={styles.tweetLink}
                         href={tweetUrlStart + post.tweet}>tweet</a>
                    </>
                  }
                </p>
                {
                  post.text.split("\n").map((paragraph, index) => {
                    return <p className={styles.noteText} key={index}>
                      {paragraph}
                    </p>;
                  })
                }
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export async function getStaticProps(): Promise<{props: NotesProps}> {
  return await getNotes();
}