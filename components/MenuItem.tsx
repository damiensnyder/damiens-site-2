import {PostMetadata, TYPE_TO_PATH} from "../pages/api/content";
import React, {ReactElement} from "react";
import styles from "../styles/menu.module.css";
import Link from "next/link";

export default function MenuItem(props: PostMetadata): ReactElement {
  const dateText: string = formatDate(props.dates[0]);
  const thumbnailSrc: string = props.thumbnail ?
      "thumbs/" + props.thumbnail : "logo.svg";

  let type: string;
  Object.keys(TYPE_TO_PATH).forEach((possibleType: string) => {
    if (props.tags.includes(possibleType)) {
      type = possibleType;
    }
  });
  let url: string;
  if (props.code.startsWith("http") && props.code.includes("//")) {
    url = props.code;
  } else if (type == undefined || type == "other") {
    url = "/" + props.code;
  } else {
    url = "/" + TYPE_TO_PATH[type] + "/" + props.code;
  }

  return (
    <div className={styles.menuItem}>
      <Link href={url}>
        <img className={styles.thumbnail}
             src={thumbnailSrc}
             alt={props.name} />
      </Link>
      <div className={styles.itemText}>
      <span className={styles.itemTitle}>
        <Link href={url}>
          {props.name}
        </Link>
      </span>
        <span className={styles.itemMetadata}>
        {dateText} &bull; {props.description}
      </span>
      </div>
    </div>
  );
}

export function formatDate(date: string): string {
  return date.slice(0, 4) + "." + date.slice(4, 6) + "." + date.slice(6);
}