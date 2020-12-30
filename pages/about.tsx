import React, {ReactElement} from "react";
import BlogPostPage from "./blog/[code]";
import {readFileSync} from "fs";

export default function AboutPage(props: {text: string}): ReactElement {
  return <BlogPostPage code={"about"}
                       date={"20201230"}
                       description={"about this site"}
                       name={"about this site"}
                       tags={[]}
                       text={props.text} />;
}

export function getStaticProps(): {props: {text: string}} {
  return {
    props: {
      text: readFileSync(`content/about.md`).toString()
    }
  };
}