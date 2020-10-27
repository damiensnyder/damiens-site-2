import {readFileSync} from "fs";
import {NextApiRequest, NextApiResponse} from "next";

export interface NoteMetadata {
  date: string,
  text: string
}

export interface NotesProps {
  posts: NoteMetadata[]
}

export default function Notes(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(getNotes());
  } else {
    res.statusCode = 500;
    res.end();
  }
}

export async function getNotes(): Promise<{props: NotesProps}> {
  const notesJson: NotesProps = JSON.parse(
      readFileSync('content/notes.json').toString());
  notesJson.posts = notesJson.posts.sort((a, b) => {
    return b.date.localeCompare(a.date);
  });

  return {props: notesJson};
}
