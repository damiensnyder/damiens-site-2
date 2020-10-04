import {readFileSync} from "fs";
import {SongMetadata} from "../index";
import {NextApiRequest, NextApiResponse} from "next";

export interface SongProps extends SongMetadata {
  date?: string
}

export default function Song(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(getSong(req.query.song.toString(), req.query.date.toString()));
  } else {
    res.statusCode = 500;
    res.end();
  }
}

export async function getSong(code: string, date?: string):
    Promise<SongProps> {
  const songsJson: {songs: SongMetadata[]} = JSON.parse(
      readFileSync('content/songs.json').toString());

  const songInfo: SongProps = songsJson.songs.find(
  (song: SongMetadata) => {
    return song.code == code;
  });
  if (date == null) {
    date = songInfo.dates[0];
  }
  songInfo.date = date;
  songInfo.tags.push("song");

  return songInfo;
}
