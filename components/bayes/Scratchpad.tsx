import React, {ReactElement} from "react";
import styles from "../../styles/bayes.module.css";
import Cell, {CellInfo} from "./Cell";

export class Scratchpad extends React.Component {
  state: {
    cells: CellInfo[][]
  }

  constructor(props) {
    super(props);

    this.state = {
      cells: this.startingGrid()
    };
  }

  startingGrid(): CellInfo[][] {
    let cells: CellInfo[][] = [];
    for (let i = 0; i < 3; i++) {
      cells.push([]);
      for (let j = 0; j < 5; j++) {
        cells[i].push(new CellInfo(0, 0, this.callback.bind(this)));
      }
    }
    return cells;
  }

  callback(from: CellInfo, recalculate: boolean): void {
    if (recalculate) {
      this.state.cells.forEach((row) => {
        row.forEach((cell) => {
          cell.recalculate(this.state.cells);
        });
      });

      this.setState({
        cells: this.state.cells
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
    return <div className={styles.scratchpad}>
      {this.state.cells.map((row: CellInfo[], index) => {
        return this.cellRow(row, index);
      })}
    </div>
  }
}