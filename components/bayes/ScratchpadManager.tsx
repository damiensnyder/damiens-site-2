import React, {ReactElement} from "react";
import styles from "../../styles/bayes.module.css";
import {Scratchpad} from "./Scratchpad";

export class ScratchpadManager extends React.Component {
  constructor(props) {
    super(props);
  }

  render(): ReactElement {
    return <div className={styles.pageContainer}>
      <div className={styles.menuBar}>
        <div className={styles.menuItem}>
          Clear
        </div>
      </div>
      <Scratchpad />
    </div>;
  }
}