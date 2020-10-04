import {readFileSync} from "fs";
import {NextApiRequest, NextApiResponse} from "next";

export interface SongMetadata {
  name: string,
  dates: string[],
  code: string,
  tags: string[],
  thumbnail?: string
}

export default function RecentPosts(req: NextApiRequest,
                                    res: NextApiResponse): void {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end({posts: "John Doe"});
  } else {
    res.statusCode = 500;
    res.end();
  }
}

export async function getRecentSongs(): Promise<{songs: SongMetadata[]}> {
  const blogBuffer: Buffer = readFileSync('content/songs.json');
  const songsJson: {songs: SongMetadata[]} =
      JSON.parse(blogBuffer.toString());
  songsJson.songs.forEach((song: SongMetadata) => {
    song.tags.push("blog");
  });
  return songsJson;
}