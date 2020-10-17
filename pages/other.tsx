import general from "../styles/general.module.css";
import React, {ReactElement} from "react";
import NormalHead from "../components/NormalHead";
import LinkHeader from "../components/LinkHeader";
import CardItem from "../components/CardItem";

export default function Other(): ReactElement {
  return (
    <div className={general.pageContainer}>
      <NormalHead title={"other pages"} />
      <div className={general.postContainer}>
        <LinkHeader path={[]} />
        <h1 className={general.pageTitle}>other pages</h1>
        <CardItem name={"resume"}
                  url={"/resume"}
                  description={"the boring formal resume i'd give you on a piece of paper"}
                  thumbnail={"notes.jpg"} />
        <CardItem name={"also my resume"}
                  url={"/cool-resume"}
                  description={"the COOL resume for people with good taste"}
                  thumbnail={"notes.jpg"} />
      </div>
    </div>
  );
}