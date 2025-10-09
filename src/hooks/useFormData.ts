import { useState } from "react";
import type { Blog } from "../types/Blog.type";
import type { FormData } from "../types/FormData.type";

const useFormData = (blog: Blog | null) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    coverImgUrl: "",
    tags: [],
    status: "DRAFT",
  });

  if (blog) {
    const { title, content, coverImgUrl, tags, status } = blog;
    setFormData({
      title,
      content,
      coverImgUrl: coverImg.url,
      tags,
      status,
    });
  }

  return { formData, setFormData };
};

export default useFormData;
