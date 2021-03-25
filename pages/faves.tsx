import React, {ReactElement} from "react";
import BlogPostPage from "./blog/[code]";
import {readFileSync} from "fs";

export default function AboutPage(props: {text: string}): ReactElement {
  return <BlogPostPage code={"about"}
                       date={"20210324"}
                       description={"a list of some of my favorite songs"}
                       name={"music i like"}
                       tags={[]}
                       text={props.text} />;
}

export function getStaticProps(): {props: {text: string}} {
  return {
    props: {
      text: readFileSync(`content/faves.md`).toString()
    }
  };
}