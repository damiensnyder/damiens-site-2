import {readFileSync} from "fs";
import {NextApiRequest, NextApiResponse} from "next";

export interface DrawingMetadata {
  date: string,
  title: string,
  collaborators?: string
}

export interface DrawingsProps {
  posts: DrawingMetadata[]
}

export default function Drawings(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(getDrawings());
  } else {
    res.statusCode = 500;
    res.end();
  }
}

export async function getDrawings(): Promise<{props: DrawingsProps}> {
  const drawingsJson: DrawingsProps = JSON.parse(
      readFileSync('content/drawings.json').toString());
  drawingsJson.posts = drawingsJson.posts.sort((a, b) => {
    return b.date.localeCompare(a.date);
  });

  return {props: drawingsJson};
}
