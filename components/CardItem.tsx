import React, {ReactElement} from "react";
import styles from "../styles/menu.module.css";
import Link from "next/link";
import {formatThumbnailSrc} from "./MenuItem";

interface CardMetadata {
  name: string,
  description: string,
  url: string,
  thumbnail: string
}

export default function CardItem(props: CardMetadata): ReactElement {
  const thumbnailSrc: string = formatThumbnailSrc(props.thumbnail);

  return (
    <div className={styles.cardItem}>
      <Link href={props.url} passHref>
        <img className={styles.thumbnail}
               src={thumbnailSrc}
               alt={props.name} />
      </Link>
      <div className={styles.itemText}>
        <span className={styles.itemTitle}>
          <Link href={props.url} passHref>
            {props.name}
          </Link>
        </span>
        <span className={styles.itemMetadata}>
          {props.description}
        </span>
      </div>
    </div>
  );
}