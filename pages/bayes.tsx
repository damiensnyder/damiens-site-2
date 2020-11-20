import React, {ReactElement} from "react";
import styles from "../styles/bayes.module.css";
import NormalHead from "../components/NormalHead";
import {ScratchpadManager} from "../components/bayes";

export default function BayesScratchpad(props): ReactElement {
  return <>
    <NormalHead title={"Bayes Scratchpad"} />
    <ScratchpadManager />
  </>;
}