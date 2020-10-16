import {NextApiRequest, NextApiResponse} from "next";
import {getBlogPost} from "./[date]";

export default function BlogPost(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(getBlogPost(req.query.post.toString()));
  } else {
    res.statusCode = 500;
    res.end();
  }
}
