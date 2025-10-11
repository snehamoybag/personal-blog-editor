import useDataFetcher from "./useDataFetcher";
import type { Blog } from "../types/Blog.type";
import { useEffect } from "react";
import getApiUrl from "../libs/getApiUrl";

const useBlog = (blogId: number) => {
  const { data, error, isLoading, fetcher } = useDataFetcher();

  // fetch
  useEffect(() => {
    const url = `${getApiUrl()}/blogs/${blogId}`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    void fetcher(url, {
      mode: "cors",
      method: "GET",
      headers,
    });
  }, [fetcher, blogId]);

  const blog = data && data.blog ? (data.blog as Blog) : null;
  return { blog, error, isLoading };
};

export default useBlog;
