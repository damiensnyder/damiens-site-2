import React, {ReactElement} from "react";
import general from "../../styles/general.module.css";
import {getPosts, PostMetadata} from "../api/content";
import NormalHead from "../../components/NormalHead";
import Menu from "../../components/Menu";
import LinkHeader from "../../components/LinkHeader";
import MenuPage from "../../components/MenuPage";

export default function ContentMenu(props: {posts: PostMetadata[]}):
    ReactElement {
  return <MenuPage title={"content"} posts={props.posts} />;
}

export async function getStaticProps():
    Promise<{props: {posts: PostMetadata[]}}> {
  return {
    props: await getPosts()
  };
}