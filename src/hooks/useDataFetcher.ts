import { useCallback, useState } from "react";
import type { ResponseShape } from "../types/ResponseShape.type";
import HttpError from "../libs/HttpError";

const useDataFetcher = () => {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetcher = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      // reset previous values
      setData(null);
      setError(null);

      try {
        setIsLoading(true);
        const response = await fetch(input, init);
        const result = (await response.json()) as ResponseShape;

        const { status, statusCode, message } = result;
        const data = result.data || null;

        setData(data);

        if (status !== "success" || statusCode >= 400) {
          throw new HttpError(statusCode, message);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
          return;
        }
        setError(new HttpError(500, "Unknown error, failed to fetch."));
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    data,
    error,
    isLoading,
    fetcher,
  };
};

export default useDataFetcher;
