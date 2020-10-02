import {readFileSync} from "fs";
import {NextApiRequest, NextApiResponse} from "next";

export interface BlogPostMetadata {
  name: string,
  date: string,
  code: string,
  description: string,
  tags: string[]
}

export default function RecentPosts(req: NextApiRequest,
                                    res: NextApiResponse): void {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end({posts: "John Doe"});
  } else {
    res.statusCode = 500;
    res.end();
  }
}

export async function getRecentPosts(): Promise<{posts: BlogPostMetadata[]}> {
  const blogBuffer: Buffer = readFileSync('content/blog.json');
  const postsJson: {posts: BlogPostMetadata[]} = JSON.parse(blogBuffer.toString());
  postsJson.posts.forEach((post: BlogPostMetadata) => {
    post.tags.push("blog");
  });
  return postsJson;
}