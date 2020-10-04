import {readdirSync, readFile, readFileSync} from "fs";
import {SongMetadata} from "../index";
import {NextApiRequest, NextApiResponse} from "next";
import {getSong} from "./[date]";

export default function BlogPost(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(getSong(req.query.song.toString()));
  } else {
    res.statusCode = 500;
    res.end();
  }
}
