import { useState } from "react";
import type { Blog } from "../types/Blog.type";
import type { FormData } from "../types/FormData.type";

const useFormData = (blog: Blog | null) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    coverImg: "",
    status: "DRAFT",
  });

  if (blog) {
    const { title, content, coverImg, status } = blog;
    setFormData({
      title,
      content,
      coverImg: coverImg.url,
      status,
    });
  }

  return { formData, setFormData };
};

export default useFormData;
