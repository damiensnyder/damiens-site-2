import React, {ReactElement} from "react";
import MenuPage from "../components/MenuPage";
import {getPosts} from "./api/content";
import {MenuProps, MenuStaticProps} from "./content";

export default function Other(props: MenuProps): ReactElement {
  return <MenuPage title={"other pages"} posts={props.posts} />;
}

export async function getStaticProps(): Promise<MenuStaticProps> {
  return {
    props: await getPosts("other")
  };
}