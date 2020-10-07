import {readFileSync} from "fs";
import {NextApiRequest, NextApiResponse} from "next";

export interface PostMetadata {
  name: string,
  dates: string[],
  code: string,
  description: string,
  tags: string[],
  thumbnail?: string
}

export const TYPE_TO_PATH: any = {
  blog: "blog",
  song: "songs",
  video: "videos",
  other: "other"
}

export default function RecentPosts(req: NextApiRequest,
                                    res: NextApiResponse): void {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(getPosts("all"));
  } else {
    res.statusCode = 500;
    res.end();
  }
}

export async function getPosts(type: string):
      Promise<{posts: PostMetadata[]}> {
  // If the type is one of the main four types (aka, not "all"), return only
  // the content listed in that type's file. Otherwise, merge the content from
  // all files into a single list and return it.
  if (TYPE_TO_PATH.hasOwnProperty(type)) {
    /*const buffer: Buffer = readFileSync(
        `content/${TYPE_TO_PATH[type]}.json`);
    const json: {posts: PostMetadata[]} = JSON.parse(buffer.toString());
    json.posts.forEach((post: PostMetadata) => {
      post.tags.push(type);
    });
    return json;*/
    return {posts: []};
  }
  let combined: PostMetadata[] = [];
  for (let postType in TYPE_TO_PATH) {
    //console.log(readdir("./", () => {}));
    //console.log(realpath(".", () => {}));
    /*const buffer: Buffer = readFileSync(
        `./metadata/${TYPE_TO_PATH[postType]}.json`);*/
    /*const json: {posts: PostMetadata[]} = JSON.parse(buffer.toString());
    json.posts.forEach((post: PostMetadata) => {
      post.tags.push(postType);
    });
    combined = combined.concat(json.posts);*/
  }
  combined = combined.sort(
      (a: PostMetadata, b: PostMetadata) => {
    return parseInt(a.dates[0]) - parseInt(b.dates[0]);
  });
  return {posts: combined};
}