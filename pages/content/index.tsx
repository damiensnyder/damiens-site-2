import React, {ReactElement} from "react";
import general from "../../styles/general.module.css";
import {getPosts, PostMetadata} from "../api/content";
import NormalHead from "../../components/NormalHead";
import Menu from "../../components/Menu";
import LinkHeader from "../../components/LinkHeader";

export default function ContentMenu(props: {posts: PostMetadata[]}):
    ReactElement {
  return (
    <div className={general.pageContainer}>
      <NormalHead title={"content"}
          description={"content i've made"}
          keywords={"menu,content"}
          url={"content"} />
      <div className={general.postContainer}>
        <LinkHeader path={[]} />
        <h1 className={general.pageTitle}>content</h1>
      </div>
      <Menu posts={props.posts} />
    </div>
  );
}

export async function getStaticProps():
    Promise<{props: {posts: PostMetadata[]}}> {
  return {
    props: await getPosts()
  };
}