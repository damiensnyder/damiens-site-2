import Head from "next/head";
import React, {ReactElement} from "react";


export interface HeadProps {
  title: string,
  description?: string,
  thumbnail?: string,
  url?: string,
  keywords?: string | string[],
  noIndex?: boolean,
  isAudio?: boolean
}

interface AudioHeadProps extends HeadProps {
  audioUrl: string,
  album: string
}

const DEFAULT_KEYWORDS: string = "damien,snyder,";

export default function NormalHead(props: HeadProps | AudioHeadProps):
    ReactElement {
  let keywords = DEFAULT_KEYWORDS;
  if (props.keywords != null) {
    keywords += props.keywords.toString();
  }
  return (
    <Head>
      <title>{props.title}</title>
      <link rel={"icon"} href={"/eye-of-judgment.jpg"} />

      <meta charSet={"UTF-8"} />
      <meta name={"description"} content={props.description} />
      <meta name={"keywords"}
            content={keywords} />
      <meta name={"author"} content={"Damien Snyder"} />
      <meta name={"viewport"}
            content={"width=device-width, initial-scale=1.0"} />
      <meta name={"robots"}
            content={(props.noIndex ? "no" : "") + "index, follow"} />

      <meta property={"og:title"} content={props.title} />
      <meta name={"og:description"} content={props.description} />
      <meta property={"og:image"} content={props.thumbnail} />
      <meta property={"og:url"}
            content={"https://www.damiensnyder.com/" + props.url} />
      <meta name={"og:site_name"} content={"damien snyder"} />

      <meta property={"twitter:image:alt"} content={props.description} />
      <meta property={"twitter:card"} content={"summary_large_image"} />

      {props.isAudio ? AudioTags((props) as AudioHeadProps) : null}
    </Head>
  );
}

function AudioTags(props: AudioHeadProps): ReactElement[] {
  return [
    <meta property={"og:audio"}
          content={"https://www.damiensnyder.com/" + props.audioUrl} />,
    <meta property={"og:audio:title"} content={props.title} />,
    <meta property={"og:audio:artist"} content={"damien snyder"} />,
    <meta property={"og:audio:album"} content={props.album} />,
    <meta property={"og:audio:type"} content={"application/mp3"} />
  ];
}