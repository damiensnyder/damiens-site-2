import React, {ReactElement} from "react";
import {getPosts} from "../api/content";
import MenuPage from "../../components/MenuPage";
import {MenuProps, MenuStaticProps} from "../content";

export default function RecentPosts(props: MenuProps): ReactElement {
  return <MenuPage title={"misc"} posts={props.posts} />;
}

export async function getStaticProps(): Promise<MenuStaticProps> {
  return {
    props: await getPosts("misc")
  };
}