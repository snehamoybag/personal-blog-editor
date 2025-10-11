import type { User } from "./User.type";

export interface Blog {
  id: number;
  title: string;
  content: string;
  coverImgUrl: string;
  status: "PUBLISHED" | "DRAFT";
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  author: User;
  tags: string[];
}
