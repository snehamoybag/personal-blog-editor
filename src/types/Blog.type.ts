import type { User } from "./User.type";

export interface Blog {
  id: number;
  title: string;
  content: string;
  coverImgUrl: string;
  status: "PUBLISHED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
  authorId: number;
  author: User;
  tags: string[];
}
