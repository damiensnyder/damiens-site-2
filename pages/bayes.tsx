import React, {ReactElement} from "react";
import NormalHead from "../components/NormalHead";
import {ScratchpadManager} from "../components/bayes/ScratchpadManager";

export default function BayesScratchpad(props): ReactElement {
  return <>
    <NormalHead title={"Bayes Scratchpad"} />
    <ScratchpadManager />
  </>;
}