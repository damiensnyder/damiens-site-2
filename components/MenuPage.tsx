import {PostMetadata} from "../pages/api/content";
import React, {ReactElement} from "react";
import general from "../styles/general.module.css";
import NormalHead from "./NormalHead";
import LinkHeader from "./LinkHeader";
import Menu from "./Menu";

interface MenuPageProps {
  title: string,
  posts: PostMetadata[],
  hideControls?: boolean
}

export default function MenuPage(props: MenuPageProps): ReactElement {
  const posts: PostMetadata[] = props.posts == undefined ? [] : props.posts;
  return (
    <div className={general.pageContainer}>
      <NormalHead title={props.title}
                  keywords={[props.title, "menu"]} />
      <div className={general.postContainer}>
        <LinkHeader path={["content"]} />
        <h1 className={general.pageTitle}>{props.title}</h1>
      </div>
      <Menu posts={posts}
          hideControls={props.hideControls} />
    </div>
  );
}