import type { Blog } from "./Blog.type";

export type FormData = {
  title: string;
  content: string;
  coverImgUrl: string;
  tags: string[];
  status: Blog["status"];
};
