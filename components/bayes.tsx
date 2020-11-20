import React, {ReactElement} from "react";
import styles from "../styles/bayes.module.css";
import {number} from "prop-types";

interface CellInfo {
  x: number,
  y: number
}

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

export class Scratchpad extends React.Component {
  state: {
    cells: CellInfo[][]
  }

  constructor(props) {
    super(props);

    this.state = {
      cells: [[]]
    };
  }

  render(): ReactElement {
    return <div className={styles.scratchpad}>
      <div className={styles.row}>
        <Cell />
        <Cell />
      </div>
      <div className={styles.row}>
        <Cell />
        <Cell />
      </div>
    </div>
  }
}

export class Cell extends React.Component {
  constructor(props) {
    super(props);
  }

  render(): ReactElement {
    return <div className={styles.cell}>
      Add...
    </div>;
  }
}