import {readFileSync} from "fs";
import {PostMetadata} from "../../content";
import {NextApiRequest, NextApiResponse} from "next";

export interface BlogPostProps extends PostMetadata {
  text?: string,
  date?: string
}

export default function BlogPost(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(getBlogPost(req.query.post.toString(), req.query.date.toString()));
  } else {
    res.statusCode = 500;
    res.end();
  }
}

export async function getBlogPost(code: string, date?: string):
    Promise<BlogPostProps> {
  const postsJson: {posts: PostMetadata[]} = JSON.parse(
      readFileSync('content/blog.json').toString());

  const postWithText: BlogPostProps = postsJson.posts.find(
  (post: BlogPostProps) => {
    return post.code == code;
  });
  if (date == null) {
    date = postWithText.dates[0];
  }
  postWithText.text = readFileSync(
      `content/blog/${code}-${date}.md`).toString();
  postWithText.tags.push("blog");
  postWithText.date = date;

  return postWithText;
}
