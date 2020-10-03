import {IncomingMessage, ServerResponse} from "http";
import {readdirSync, readFile, readFileSync} from "fs";
import {BlogPostMetadata} from "../index";
import {NextApiRequest, NextApiResponse} from "next";
import {getPost} from "./[date]";

export default function BlogPost(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(getPost(req.query.post.toString()));
  } else {
    res.statusCode = 500;
    res.end();
  }
}
