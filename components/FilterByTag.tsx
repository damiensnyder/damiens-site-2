import React, {ReactElement, ReactNode} from "react";
import styles from "../styles/menu.module.css";

interface FilterProps {
  tags: Map<string, number>,
  selectTag: (tag: string) => void,
  tag?: string
}


export default class FilterByTag extends React.Component {
  state: {
    showTags: boolean,
    showMore: boolean
  };
  props: FilterProps;

  constructor(props: FilterProps) {
    super(props);
    this.state = {
      showTags: false,
      showMore: false
    };
  }

  toggleDropdown(): void {
    this.setState({
      showTags: !this.state.showTags
    });
  }

  selectTag(tag: string) {
    this.setState({
      showTags: false,
      showMore: false
    });
    this.props.selectTag(tag);
  }

  toggleShowMore(): void {
    this.setState({
      showMore: !this.state.showMore
    });
  }

  dropdownJsx(): ReactElement {
    let mostUsedTags: string[] = [];
    this.props.tags.forEach((uses: number, tag: string) => {
      if (tag != this.props.tag && this.props.tags.get(tag) > 1) {
        mostUsedTags.push(tag);
      }
    });
    mostUsedTags = mostUsedTags.sort((a: string, b: string) => {
      return this.props.tags.get(b) - this.props.tags.get(a);
    });
    const numTags: number = mostUsedTags.length;
    if (!this.state.showMore) {
      mostUsedTags = mostUsedTags.slice(0, 5);
    }

    return (
      <div className={styles.tagsDropdown + " " +
          (this.state.showTags ? "" : styles.hiddenTagsDropdown)}>
        {
          this.props.tag != null ? (
            <span className={styles.resetTags}
                  onClick={() => this.selectTag.bind(this)(null)}>
              [reset tags]
            </span>
          ) : null
        }
        {
          mostUsedTags.map((tag: string, index: number) => {
            // The replaceAll check shouldn't be necessary but is for some
            // reason? I don't know why it's ever not a function.
            return (
              <span key={index}>
                <a onClick={() => this.selectTag.bind(this)(tag)}>
                  {(typeof(tag.replaceAll) == "function") ?
                      tag.replaceAll("-", " ") : tag}
                </a> ({this.props.tags.get(tag)})
              </span>
            );
          })
        }
        {
          numTags > 5 ? (
            <span className={styles.resetTags}
                  onClick={() => this.toggleShowMore.bind(this)()}>
              [show {this.state.showMore ? "less" : "more"}]
            </span>
          ) : null
        }
      </div>
    );
  }

  render(): ReactNode {
    return (
      <div className={styles.filterAndDropdown}>
        <div className={styles.filterByTag}
             onClick={this.toggleDropdown.bind(this)}>
          filter by tag
        </div>
        {this.dropdownJsx.bind(this)()}
      </div>
    );
  }
}