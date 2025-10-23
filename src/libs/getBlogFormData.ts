import type { Blog } from "../types/Blog.type";
import type { BlogFormData } from "../types/BlogFormData.type";

const getBlogFormData = (blog?: Blog): BlogFormData => {
  if (!blog) {
    return {
      title: "",
      content: "",
      coverImgUrl: "",
      tags: [],
      status: "PUBLISHED",
    };
  }

  const { title, content, coverImgUrl, tags, status } = blog;
  return {
    title,
    content,
    coverImgUrl,
    tags,
    status,
  };
};

export default getBlogFormData;
