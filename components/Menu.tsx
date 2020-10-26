import styles from "../styles/menu.module.css";
import {PostMetadata} from "../pages/api/content";
import MenuItem from "./MenuItem";
import React, {ReactElement} from "react";

export default class Menu extends React.Component {
  props: {
    posts: PostMetadata[],
    hideControls?: boolean
  }
  state: {
    page: number,
    tag: string | null,
    showDropdown: boolean
  }

  constructor(props: {posts: PostMetadata[]}) {
    super(props);
    this.state = {
      page: 1,
      tag: null,
      showDropdown: false
    };
  }

  toggleTagsDropdown(): void {
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  }

  selectTag(tag: string): void {
    this.setState({
      tag: tag,
      page: 1,
      showDropdown: false
    });
    window.scroll(0, 0);
  }

  dropdownJsx(tags: Map<string, number>): ReactElement {
    let mostUsedTags: string[] = [];
    tags.forEach((uses: number, tag: string) => {
      if (tag != this.state.tag && tags.get(tag) > 1) {
        mostUsedTags.push(tag);
      }
    });
    mostUsedTags = mostUsedTags.sort((a: string, b: string) => {
      return tags.get(b) - tags.get(a);
    });

    return (
      <div className={styles.tagsDropdown}>
        {
          this.state.tag != null ? (
            <span className={styles.resetTags}
                onClick={() => this.selectTag.bind(this)(null)}>
              [reset tags]
            </span>
          ) : null
        }
        {
          mostUsedTags.map((tag: string, index: number) => {
            return (
              <span>
                <a onClick={() => this.selectTag.bind(this)(tag)}
                    key={index}>
                  {tag.replaceAll("-", " ")}
                </a> ({tags.get(tag)})
              </span>
            );
          })
        }
      </div>
    );
  }

  pageSwitcherJsx(isPrev: boolean, numPosts?: number): ReactElement {
    if (isPrev && this.state.page > 1) {
      return (
        <div className={styles.pageSwitcher}
            onClick={() => this.switchPage.bind(this)(true)}>
          ← prev
        </div>
      );
    }
    if (!isPrev && this.state.page * 10 < numPosts) {
      return (
        <div className={styles.pageSwitcher}
             onClick={() => this.switchPage.bind(this)(false)}>
          next →
        </div>
      );
    }
    return <div className={styles.pageSwitcherInactive} />;
  }

  switchPage(goBack: boolean): void {
    this.setState({
      page: goBack ? this.state.page - 1 : this.state.page + 1
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
    const numPosts: number = postsOnPage.length;
    postsOnPage = postsOnPage.slice(
        (this.state.page - 1) * 10, this.state.page * 10);

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

        {!this.props.hideControls && sortedPosts.length > 0 ? (
            <div className={styles.footerControls}>
              {this.pageSwitcherJsx.bind(this)(true)}
              <div className={styles.filterByTag}
                   onClick={this.toggleTagsDropdown.bind(this)}>
                filter by tag
              </div>
              {this.pageSwitcherJsx.bind(this)(false, numPosts)}
            </div>
          ) : null
        }
        {this.state.showDropdown ? this.dropdownJsx(tags) : null}
      </div>
    );
  }
}