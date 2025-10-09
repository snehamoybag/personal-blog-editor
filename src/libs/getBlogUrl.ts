const getBlogUrl = () => {
  const url = import.meta.env.VITE_BLOG_URL as unknown;

  if (!url) {
    throw new Error("Blog url not found in enviroment variables.");
  }

  if (typeof url !== "string") {
    throw new Error("Api url must be of type string.");
  }

  return url;
};

export default getBlogUrl;
