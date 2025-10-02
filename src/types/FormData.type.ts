import type { Blog } from "./Blog.type";

export type FormData = {
  title: string;
  content: string;
  coverImg: string;
  status: Blog["status"];
};
