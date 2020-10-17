import React, {ReactElement} from "react";
import general from "../../styles/general.module.css";
import Link from "next/link";
import {getPosts, PostMetadata} from "../api/content";
import NormalHead from "../../components/NormalHead";
import Menu from "../../components/Menu";
import LinkHeader from "../../components/LinkHeader";

export default function RecentPosts(props: {posts: PostMetadata[]}):
    ReactElement {
  return (
    <div className={general.pageContainer}>
      <NormalHead title={"blog"} />
      <div className={general.postContainer}>
        <h3 className={general.navHeaderOuter}>
          <LinkHeader path={["content"]} />
        </h3>
        <h1 className={general.pageTitle}>blog</h1>
      </div>
      <Menu posts={props.posts} />
    </div>
  );
}

export async function getStaticProps():
    Promise<{props: {posts: PostMetadata[]}}> {
  return {
    props: await getPosts("blog")
  };
}