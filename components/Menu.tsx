import styles from "../styles/menu.module.css";
import {PostMetadata} from "../pages/api/content";
import MenuItem from "./MenuItem";
import React, {ReactElement} from "react";
import FilterByTag from "./FilterByTag";

export default class Menu extends React.Component {
  props: {
    posts: PostMetadata[],
    hideControls?: boolean
  }
  state: {
    page: number,
    tag: string | null
  }

  constructor(props: {posts: PostMetadata[]}) {
    super(props);
    this.state = {
      page: 1,
      tag: null
    };
  }

  selectTag(tag: string): void {
    this.setState({
      tag: tag,
      page: 1
    });
    window.scroll(0, 0);
  }

  render(): ReactElement {
    const sortedPosts: PostMetadata[] = this.props.posts.sort(
    (a: PostMetadata, b: PostMetadata): number => {
      if (a.tags.includes("featured") && !b.tags.includes("featured")) {
        return -1;
      }
      if (b.tags.includes("featured") && !a.tags.includes("featured")) {
        return 1;
      }
      return b.date.localeCompare(a.date);
    });

    let postsOnPage: PostMetadata[] = sortedPosts.filter(
        (post: PostMetadata) => {
      return this.state.tag == null || post.tags.includes(this.state.tag);
    });

    const tags: Map<string, number> = new Map<string, number>();
    sortedPosts.forEach((post: PostMetadata) => {
      post.tags.forEach((tag: string) => {
        if (tags.has(tag)) {
          tags.set(tag, tags.get(tag) + 1);
        } else {
          tags.set(tag, 1);
        }
      })
    });

    return (
      <div className={styles.plainLinksMenu}>
        {
          postsOnPage.map((post: PostMetadata, index: number) => {
            return (
              <MenuItem name={post.name}
                        code={post.code}
                        description={post.description}
                        date={post.date}
                        tags={post.tags}
                        thumbnail={post.thumbnail}
                        isHome={this.props.hideControls}
                        key={index} />
            );
          })
        }

        {!this.props.hideControls && sortedPosts.length > 1 ?
          (
            <div className={styles.footerControls}>
              <FilterByTag tags={tags}
                           selectTag={this.selectTag.bind(this)}
                           tag={this.state.tag} />
            </div>
          ) : null
        }
      </div>
    );
  }
}