import { useEffect, useState } from "react";
import type { Image } from "../types/Image.type";
import type { ResponseShape } from "../types/ResponseShape.type";
import HttpError from "../libs/HttpError";
import getApiUrl from "../libs/getApiUrl";
import { getAuthTokenFromLocalStorage } from "../libs/localStorageAPIAuthToken";
import { getUserFromLocalStorage } from "../libs/localStorageUser";

// uploads an image to server and returns it
const useUploadImage = (file: File | null) => {
  const [authToken] = useState(getAuthTokenFromLocalStorage);
  const [user] = useState(getUserFromLocalStorage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [image, setImage] = useState<Image | null>(null);

  if (!user || !authToken) {
    setError(new Error("User must log in to upload an image."));
  }

  useEffect(() => {
    if (!file || !user) {
      return;
    }

    setError(null); // reset error from previous operation
    setIsLoading(true);

    const abortController = new AbortController();

    const upload = async () => {
      const fieldName = "image"; // server expects this field
      const formData = new FormData(); // required for field with files

      formData.append(fieldName, file);

      const fecthOpions: RequestInit = {
        mode: "cors",
        method: "post",
        signal: abortController.signal,
        headers: {
          Authorization: "Bearer" + " " + authToken, // <SPACE> IS REQUIRED!
        },
        body: formData,
      };

      try {
        const url = `${getApiUrl()}/users/${user.id}/images`;
        const response = await fetch(url, fecthOpions);

        // handle http exceptions
        if (!response.ok || response.status >= 400) {
          throw new HttpError(response.status, response.statusText);
        }

        const result: ResponseShape = await response.json();

        if (!result.data || !result.data.image) {
          throw new HttpError(
            503,
            "Server failed to return uploaded image data.",
          );
        }

        // set image
        setImage(result.data.image as Image);
      } catch (error) {
        const isErrorInstance = error instanceof Error;

        if (!isErrorInstance) {
          setError(new Error("Dang! something went wrong."));
        }

        // ignore controller abort error
        if (isErrorInstance && error.name !== "AbortError") {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // invoke the function
    upload();

    // clean up
    () => {
      abortController.abort();
    };
  }, [user, file]);

  return {
    image,
    isLoading,
    error,
  };
};

export default useUploadImage;
