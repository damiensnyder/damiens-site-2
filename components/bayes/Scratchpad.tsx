import React, {ReactElement} from "react";
import styles from "../../styles/bayes.module.css";
import Cell, {CellInfo} from "./Cell";
import {BayesTable} from "./ScratchpadManager";

export class Scratchpad extends React.Component {
  state: {
    table: BayesTable
  }

  constructor(props) {
    super(props);

    this.state = {
      table: new BayesTable()
    };
  }

  callback(from: CellInfo, recalculate: boolean): void {
    if (recalculate) {
      this.state.table.cells.forEach((row) => {
        row.forEach((cell) => {
          cell.recalculate(this.state.table.cells);
        });
      });

      this.setState({
        cells: this.state.table.cells
      });
    }
  }

  cellRow(cells: CellInfo[], index: number): ReactElement {
    return <div className={styles.row} key={index}>
      {cells.map((cell: CellInfo, index) => {
        return <Cell info={cell} key={index} />;
      })}
    </div>;
  }

  render(): ReactElement {
    return <div className={styles.scratchpadOuter}>
      <div className={styles.scratchpadFrame}>
        <div className={styles.scratchpadInner}>
          {this.state.table.cells.map((row: CellInfo[], index) => {
            return this.cellRow(row, index);
          })}
        </div>
      </div>
    </div>;
  }
}