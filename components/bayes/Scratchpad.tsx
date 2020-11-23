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
      cells: [[]]
    };
  }

  render(): ReactElement {
    const temp = new CellInfo(0, 0);

    return <div className={styles.scratchpad}>
      <div className={styles.row}>
        <Cell info={temp} />
        <Cell info={temp} />
      </div>
      <div className={styles.row}>
        <Cell info={temp} />
        <Cell info={temp} />
      </div>
    </div>
  }
}