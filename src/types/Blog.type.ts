import type { Image } from "./Image.type";
import type { User } from "./User.type";

export interface Blog {
  id: number;
  title: string;
  content: string;
  coverImg: Image;
  status: "PUBLISHED" | "DRAFT";
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  author: User;
  tags: string[];
}
