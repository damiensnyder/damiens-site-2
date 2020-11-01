import general from "../styles/general.module.css";
import Link from "next/link";
import React, {ReactElement} from "react";

export default function LinkHeader(props: {path: string[]}): ReactElement {
  const linksJsx: ReactElement[] = [
    <Link href={"/"}>
      <span className={general.navHeader} key={-1}>home</span>
    </Link>
  ];

  let url: string = "/";
  props.path.forEach((directory: string, index: number) => {
    url += directory;
    linksJsx.push(<span key={index + props.path.length}>&nbsp;/&nbsp;</span>);
    linksJsx.push(
      <Link href={url}>
        <span className={general.navHeader} key={index}>{directory}</span>
      </Link>
    )
  });

  return (
    <h3 className={general.navHeaderOuter}>
      {linksJsx}
    </h3>
  );
}