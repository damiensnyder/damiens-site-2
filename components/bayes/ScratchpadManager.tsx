import React, {ReactElement} from "react";
import styles from "../../styles/bayes.module.css";
import {Scratchpad} from "./Scratchpad";
import {CellInfo} from "./Cell";

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

export class BayesTable {
  cells: CellInfo[][];

  constructor() {
    this.cells = this.startingGrid();
  }

  callback(from: CellInfo) {

  }

  startingGrid(): CellInfo[][] {
    let cells: CellInfo[][] = [];
    for (let i = 0; i < 4; i++) {
      cells.push([]);
      for (let j = 0; j < 6; j++) {
        cells[i].push(new CellInfo(0, 0, this.callback.bind(this)));
      }
    }
    return cells;
  }
}