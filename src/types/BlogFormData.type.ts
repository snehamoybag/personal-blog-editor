import type { Blog } from "./Blog.type";

export type BlogFormData = {
  title: string;
  content: string;
  coverImgUrl: string;
  tags: string[];
  status: Blog["status"];
};
