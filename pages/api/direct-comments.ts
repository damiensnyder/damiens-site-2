import faunadb, {query as q} from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';

export interface DirectComment {
  from?: string,
  text?: string,
  sender?: string,
  sharable?: boolean
}

const {FAUNADB_SECRET: secret} = process.env;
const client: faunadb.Client = secret ? new faunadb.Client({secret}) : null;

export default async function DirectComments(req: NextApiRequest,
                                             res: NextApiResponse) {
  const comment: any = req.body;
  console.log(JSON.stringify(comment));

  try {
    if (!client) {
      return res.status(500).json({
        error: new Error("Missing secret to connect to FaunaDB")
      });
    } else if (comment) {
      const newComment: DirectComment = {};
      if (typeof comment.from === "string") {
        newComment.from = comment.from;
      }
      if (typeof comment.text === "string") {
        newComment.text = comment.text;
      }
      if (typeof comment.sender === "string") {
        newComment.sender = comment.sender;
      }
      if (typeof comment.sharable === "boolean") {
        newComment.sharable = comment.sharable;
      }

      const result = client.query(
        q.Create(q.Collection("DirectComment"), {data: newComment})
      );
      console.log(JSON.stringify(result));

      res.status(200).json(JSON.stringify(result));
    }
  } catch (error) {
    res.status(500).json({error});
  }
}