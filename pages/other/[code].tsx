import React, {ReactElement} from "react";
import general from "../../styles/general.module.css";
import {PostMetadata, getSinglePost, getPostPaths, Paths} from "../api/content";
import {formatDate} from "../../components/MenuItem";
import LinkHeader from "../../components/LinkHeader";
import NormalHead from "../../components/NormalHead";

export default function OtherPage(props: PostMetadata): ReactElement {
  return (
    <div className={general.pageContainer}>
      <NormalHead title={props.name}
                  thumbnail={props.thumbnail}
                  description={props.description}
                  keywords={props.tags} />
      <div className={general.postContainer}>
        <LinkHeader path={["other"]} />
        <h1 className={general.pageTitle}>{props.name}</h1>
        <p className={general.caption}>
          released {formatDate(props.dates[0])}
        </p>
      </div>
    </div>
  );
}

export async function getStaticProps(context): Promise<{props: any}> {
  return await getSinglePost("other", context.params.code);
}

export async function getStaticPaths(): Promise<Paths> {
  return await getPostPaths("other");
}