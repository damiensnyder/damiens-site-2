import React, {ReactElement} from "react";
import general from "../styles/general.module.css";
import styles from "../styles/notes.module.css";
import LinkHeader from "../components/LinkHeader";
import NormalHead from "../components/NormalHead";
import {formatDate} from "../components/MenuItem";
import {getNotes, NoteMetadata, NotesProps} from "./api/notes";

export default function NotesPage(props: NotesProps): ReactElement {
  return (
    <div className={general.pageContainer}>
      <NormalHead title={"notes"} />
      <div className={general.postContainer}>
        <LinkHeader path={["other"]} />
        {
          props.posts.map((post: NoteMetadata) => {
            return (
              <div className={styles.noteOuter}>
                <p className={styles.noteDate}>{formatDate(post.date)}</p>
                <p className={styles.noteText}>{post.text}</p>
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