import type { ResponseShape } from "../types/ResponseShape.type";
import HttpError from "./HttpError";

type FetchData = [error: Error | null, data: Record<string, unknown> | null];

const fetchData = async (
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<FetchData> => {
  try {
    const response = await fetch(input, init);

    if (!response.ok || response.status >= 400) {
      return [new HttpError(response.status, response.statusText), null];
    }

    const result: ResponseShape = await response.json();
    const data = result.data || null;

    return [null, data];
  } catch (err) {
    // handle uncaught errors
    if (err instanceof Error) {
      return [err, null];
    }

    return [new HttpError(500, "Unkown error, failed to fetch."), null];
  }
};

export default fetchData;
