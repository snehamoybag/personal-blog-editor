import { useState } from "react";
import type { Blog } from "../types/Blog.type";
import type { BlogFormData } from "../types/BlogFormData.type";

const useBlogFormData = (blog: Blog | null) => {
  const [formData, setFormData] = useState<BlogFormData>(() => {
    if (blog) {
      const { title, content, coverImgUrl, tags, status } = blog;
      return {
        title,
        content,
        coverImgUrl,
        tags,
        status,
      };
    }

    return {
      title: "",
      content: "",
      coverImgUrl: "",
      tags: [],
      status: "DRAFT",
    };
  });

  return { formData, setFormData };
};

export default useBlogFormData;
