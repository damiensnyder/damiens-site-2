import React, {ReactElement} from "react";
import styles from "../../styles/bayes.module.css";

export class CellInfo {
  x: number;
  y: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default class Cell extends React.Component {
  props: {
    info: CellInfo
  }

  constructor(props: CellInfo) {
    super(props);
  }

  render(): ReactElement {
    return <div className={styles.cell}>
      <button className={styles.addInCell}>Add prior</button>
      <button className={styles.addInCell}>Add formula</button>
    </div>;
  }
}