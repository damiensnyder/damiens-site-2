import React, {ReactElement} from "react";
import general from "../../styles/general.module.css";
import {PostMetadata, getSinglePost, getPostPaths} from "../api/content";
import {formatDate} from "../../components/MenuItem";
import LinkHeader from "../../components/LinkHeader";
import NormalHead from "../../components/NormalHead";

export default function VideoPage(props: PostMetadata): ReactElement {
  return (
    <div className={general.pageContainer}>
      <NormalHead title={props.name}
                  thumbnail={props.thumbnail}
                  keywords={props.tags} />
      <div className={general.postContainer}>
        <LinkHeader path={["songs"]} />
        <h1 className={general.pageTitle}>{props.name}</h1>
        <p className={general.caption}>
          released {formatDate(props.dates[0])}
        </p>
      </div>
    </div>
  );
}

export async function getStaticProps(context): Promise<{props: any}> {
  return await getSinglePost("video", context.params.code);
}

export async function getStaticPaths() {
  return await getPostPaths("video");
}