import {IncomingMessage, ServerResponse} from "http";

export interface HelloProps {
  posts: string
}

export default function Hello(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end({posts: "John Doe"});
  } else {
    res.statusCode = 500;
    res.end();
  }
}

export async function getHello() {
  return {
    posts: "John Doe"
  };
}
