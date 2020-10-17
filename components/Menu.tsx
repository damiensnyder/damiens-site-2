import styles from "../styles/menu.module.css";
import {PostMetadata} from "../pages/api/content";
import MenuItem from "./MenuItem";
import React, {ReactElement} from "react";

export default function Menu(props: {posts: PostMetadata[]}): ReactElement {
  const sortedPosts: PostMetadata[] = props.posts.sort(
      (a: PostMetadata, b: PostMetadata): number => {
    return b.dates[0].localeCompare(a.dates[0]);
  });
  return (
    <div className={styles.plainLinksMenu}>
      {
        sortedPosts.map((post: PostMetadata, index: number) => {
          return (
            <MenuItem name={post.name}
                      code={post.code}
                      description={post.description}
                      dates={post.dates}
                      tags={post.tags}
                      thumbnail={post.thumbnail}
                      key={index} />
          );
        })
      }
    </div>
  );
}