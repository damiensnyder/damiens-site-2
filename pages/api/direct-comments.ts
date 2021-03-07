import faunadb, {query as q} from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';

export interface DirectComment {
  from?: string,
  text?: string,
  identifier?: string,
  sharable?: boolean
}

const {FAUNADB_SECRET: secret} = process.env;
const client: faunadb.Client = secret ? new faunadb.Client({secret}) : null;

export default async function DirectComments(req: NextApiRequest,
                                             res: NextApiResponse) {
  const comment: any = req.body;

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
      if (typeof comment.identifier === "string") {
        newComment.identifier = comment.identifier;
      }
      if (typeof comment.sharable === "boolean") {
        newComment.sharable = comment.sharable;
      }
      
      return client.query(
        q.Create(q.Collection("DirectComments"), newComment)
      );
    }
  } catch (error) {
    res.status(500).json({error});
  }
}