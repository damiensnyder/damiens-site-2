import {IncomingMessage, ServerResponse} from "http";
import {readdirSync, readFile, readFileSync} from "fs";
import {BlogPostMetadata} from "./index";
import {NextApiRequest, NextApiResponse} from "next";

export interface BlogPostProps extends BlogPostMetadata {
  text?: string
}

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

export async function getPost(code: string): Promise<BlogPostProps> {
  const postsJson: {posts: BlogPostMetadata[]} = JSON.parse(
      readFileSync('content/blog.json').toString());

  const postWithText: BlogPostProps = postsJson.posts.find(
      (post: BlogPostProps) => {
    return post.code == code;
  });
  postWithText.text = readFileSync(`content/blog/${code}.md`).toString();
  postWithText.tags.push("blog");
  return postWithText;
}
