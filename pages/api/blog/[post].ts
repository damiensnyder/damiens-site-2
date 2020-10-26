import {readFileSync} from "fs";
import {PostMetadata} from "../content";
import {NextApiRequest, NextApiResponse} from "next";

export interface BlogPostProps extends PostMetadata {
  text?: string
}

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

export async function getBlogPost(code: string): Promise<BlogPostProps> {
  const postsJson: {posts: PostMetadata[]} = JSON.parse(
      readFileSync('content/content.json').toString());

  const postWithText: BlogPostProps = postsJson.posts.find(
  (post: BlogPostProps) => {
    return post.code == code;
  });
  postWithText.text = readFileSync(`content/blog/${code}.md`).toString();

  return postWithText;
}
