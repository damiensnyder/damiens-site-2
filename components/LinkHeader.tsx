import general from "../styles/general.module.css";
import Link from "next/link";
import React, {ReactElement} from "react";

export default function LinkHeader(props: {path: string[]}): ReactElement {
  const linksJsx: ReactElement[] = [
    <span className={general.navHeader} key={-1}>
      <Link href={"/"}>home</Link>
    </span>
  ];

  let url: string = "/";
  props.path.forEach((directory: string, index: number) => {
    url += directory;
    linksJsx.push(<span key={index + props.path.length}>&nbsp;/&nbsp;</span>);
    linksJsx.push(
      <span className={general.navHeader} key={index}>
        <Link href={url}>{directory}</Link>
      </span>
    )
  });

  return (
    <h3 className={general.navHeaderOuter}>
      {linksJsx}
    </h3>
  );
}