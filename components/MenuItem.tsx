import {PostMetadata, TYPE_TO_PATH} from "../pages/api/content";
import React, {ReactElement} from "react";
import general from "../styles/general.module.css";
import styles from "../styles/menu.module.css";
import Link from "next/link";

export default function MenuItem(props: PostMetadata): ReactElement {
  const dateText: string = formatDate(props.dates[0]);
  const thumbnailSrc: string = formatThumbnailSrc(props.thumbnail);
  const type: string = getType(props.tags);
  const url: string = formatUrl(props.code, type);
  const dateClass: string = chooseDateClass(props.description);

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
          <span className={dateClass}>{dateText} &bull; </span>
          {props.description}
      </span>
      </div>
    </div>
  );
}

export function formatDate(date: string): string {
  return date.slice(0, 4) + "." + date.slice(4, 6) + "." + date.slice(6);
}

export function formatThumbnailSrc(src: string): string {
  if (!src) {
    return "/favicon.png";
  }
  if (src.startsWith("http") && src.includes("//")) {
    return src;
  }
  return "/thumbs/" + src;
}

export function formatUrl(code: string, type: string): string {
  if (code.startsWith("http") && code.includes("//")) {
    return code;
  }
  if (type == undefined || type == "other" || type == "misc") {
    return "/" + code;
  }
  return "/" + TYPE_TO_PATH[type] + "/" + code;
}

export function getType(tags: string[]): string {
  let type: string = "";
  Object.keys(TYPE_TO_PATH).forEach((possibleType: string) => {
    if (tags.includes(possibleType)) {
      type = possibleType;
    }
  });
  return type;
}

export function chooseDateClass(description: string): string {
  if (description.length > 60) {
    return general.hide;
  }
  if (description.length > 40) {
    return general.showIfMedium;
  }
  if (description.length > 10) {
    return general.showIfMediumOrWide;
  }
  return "";
}