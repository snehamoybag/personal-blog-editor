import type { User } from "./User";

export interface Blog {
  id: number;
  title: string;
  content: string;
  status: "PUBLISHED" | "DRAFT";
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  author: User;
  imgUrls: string[];
  tags: string[];
}
