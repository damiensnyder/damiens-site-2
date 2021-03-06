import React, {ReactElement} from "react";
import general from "../../styles/general.module.css";
import styles from "../../styles/song.module.css";
import {PostMetadata, getSinglePost, getPostPaths, Paths} from "../api/content";
import {formatDate} from "../../components/MenuItem";
import LinkHeader from "../../components/LinkHeader";
import NormalHead from "../../components/NormalHead";
import FeedbackForm from "../../components/FeedbackForm";

interface SongMetadata extends PostMetadata {
  wav?: string,
  soundcloud?: string,
  youtube?: string
}

const soundcloudEmbedUrl: string = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/{}&color=%23ff7700&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true";
const youtubeHeader: ReactElement = (
  <h4 className={styles.sideHeading}>watch the music video:</h4>
);
const soundcloudHeader: ReactElement = (
  <h4 className={styles.sideHeading}>listen on soundcloud:</h4>
);
const mp3Header: ReactElement = (
  <h4 className={styles.sideHeading}>or just a good old-fashioned mp3:</h4>
);

export default function SongPage(props: PostMetadata): ReactElement {
  let wavSource: ReactElement,
      youtubeEmbed: ReactElement,
      soundcloudEmbed: ReactElement = null;
  const songProps: SongMetadata = props as SongMetadata;
  if (songProps.wav != null) {
    wavSource = (
      <source src={"static.damiensnyder.com/" + props.code + ".wav"}
          type={"audio/wav"} />
    );
  }
  if (songProps.youtube != null) {
    youtubeEmbed = (
      <iframe width={"100%"}
              height={600}
              scrolling={"no"}
              frameBorder={"no"}
              src={"https://www.youtube.com/embed/" + songProps.youtube}>
      </iframe>
    );
  }
  if (songProps.soundcloud != null) {
    soundcloudEmbed = (
      <iframe width={"100%"}
              height={"300"}
              scrolling={"no"}
              frameBorder={"no"}
              allow={"autoplay"}
              src={soundcloudEmbedUrl.replace("{}", songProps.soundcloud)} />
    );
  }


  return (
    <div className={general.pageContainer}>
      <NormalHead title={props.name}
                  thumbnail={props.thumbnail}
                  keywords={props.tags}
                  isAudio={true}
                  audioUrl={"/songs/" + props.code + "/mp3"}
                  album={props.tags[1]} />
      <div className={general.postContainer}>
        <LinkHeader path={["songs"]} />
        <h1 className={general.pageTitle}>{props.name}</h1>
        <p className={general.byline}>
          released {formatDate(props.date)}
        </p>
        {songProps.youtube != null ? youtubeHeader : null}
        {youtubeEmbed}
        {songProps.soundcloud != null ? soundcloudHeader : null}
        {soundcloudEmbed}
        {songProps.youtube != null || songProps.soundcloud != null ?
            mp3Header : null}
        <audio controls={true}>
            {wavSource}
            <source src={"https://static.damiensnyder.com.s3-us-west-2.amazonaws.com/" + props.code + ".mp3"}
                    type={"audio/mpeg"} />
        </audio>
        <FeedbackForm fromPage={props.code} />
      </div>
    </div>
  );
}

export async function getStaticProps(context): Promise<{props: any}> {
  return await getSinglePost("song", context.params.code);
}

export async function getStaticPaths(): Promise<Paths> {
  return await getPostPaths("song");
}