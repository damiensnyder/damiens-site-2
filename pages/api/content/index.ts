import {readFileSync} from "fs";
import {NextApiRequest, NextApiResponse} from "next";
import {MenuProps} from "../../content";

export interface PostMetadata {
  name: string,
  date: string,
  code: string,
  description: string,
  tags: string[],
  thumbnail?: string
}

export interface Paths {
  paths: {
    params: {
      code: string
    } | {
      tag: string
    }
  }[],
  fallback: boolean
}

export const TYPE_TO_PATH: any = {
  blog: "blog",
  song: "songs",
  video: "videos",
  misc: "misc",
  other: "other"
}

export default function RecentPosts(req: NextApiRequest,
                                    res: NextApiResponse): void {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(getPosts());
  } else {
    res.statusCode = 500;
    res.end();
  }
}

export async function getPosts(tag: string = "all"): Promise<MenuProps> {
  const buffer: Buffer = readFileSync('content/content.json');
  const json: { posts: PostMetadata[] } = JSON.parse(buffer.toString());
  let result: PostMetadata[] = json.posts;

  // If the tag is not "all", filter for only results with that tag. If the tag
  // is "all", filter out results tagged as "other".
  if (tag != "all") {
    result = result.filter((post: PostMetadata) => {
      return post.tags.includes(tag);
    });
  } else {
    result = result.filter((post: PostMetadata) => {
      return !post.tags.includes("other");
    });
  }

  // Sort by date, with most recent first.
  result = result.sort((a: PostMetadata, b: PostMetadata) => {
    return b.date.localeCompare(a.date);
  });
  return {posts: result};
}

export async function getSinglePost(type: string, code: string):
    Promise<{props: PostMetadata}> {
  const postsOfType: {posts: PostMetadata[]} = await getPosts(type);
  const thisPost: PostMetadata = postsOfType.posts.filter(
      (item: PostMetadata) => {
    return item.code == code;
  })[0];
  return {props: thisPost};
}

export async function getPostPaths(type: string): Promise<Paths> {
  const posts: {posts: PostMetadata[]} = await getPosts(type);
  const codes = posts.posts.map((post: PostMetadata) => {
    return {params: {code: post.code}};
  });
  return {
    paths: codes,
    fallback: false
  };
}