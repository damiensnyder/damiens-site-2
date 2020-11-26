import React, {ReactElement} from "react";
import styles from "../../styles/bayes.module.css";
import {switchCase} from "@babel/types";

enum Contents {
  empty,
  prior,
  formula
}

export class CellInfo {
  x: number;
  y: number;
  callback;
  type: Contents;

  constructor(x: number, y: number, callback) {
    this.x = x;
    this.y = y;
    this.callback = callback
    this.type = Contents.empty;
  }

  createPrior(): void {
    this.type = Contents.prior;
    this.callback(this, true);
  }

  createFormula(): void {
    this.type = Contents.formula;
    this.callback(this, true);
  }

  recalculate(cells: CellInfo[][]): void {

  }
}

export interface CellProps {
  info: CellInfo;
}

export default class Cell extends React.Component {
  props: CellProps;

  constructor(props: CellProps) {
    super(props);

    this.state = {
      contents: null
    };
  }

  emptyCell(): ReactElement {
    return <>
      <button className={styles.initCellBtn}
              onClick={this.props.info.createFormula.bind(this.props.info)}>
        ✚
      </button>
    </>;
  }

  render(): ReactElement {
    let contents;

    if (this.props.info.type == Contents.empty) {
      contents = this.emptyCell.bind(this)();
    } else {
      contents = this.emptyCell.bind(this)();
    }

    return <div className={styles.cell}>
      {contents}
    </div>;
  }
}