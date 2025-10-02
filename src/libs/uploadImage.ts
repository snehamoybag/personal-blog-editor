import type { Image } from "../types/Image.type";
import type { ResponseShape } from "../types/ResponseShape.type";
import HttpError from "./HttpError";
import { getUserFromLocalStorage } from "./localStorageUser";

// uploads and returns the uploaded image data
const uploadImage = async (
  file: File,
): Promise<[Image | null, Error | null]> => {
  const user = getUserFromLocalStorage();

  if (!user) {
    return [null, new Error("User must be logged in to upload image.")];
  }

  const url = `${import.meta.env.VITE_AP_URL}/${user.id}/images`;

  const upload = () => {
    return fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        enctype: "multipart/form-data",
      },
      body: file,
    });
  };

  try {
    const response = await upload();

    if (response.status >= 400) {
      throw new HttpError(
        response.status,
        response.statusText || "Server error.",
      );
    }

    const result: ResponseShape = await response.json();
    const { data } = result;

    if (!data || !data.image) {
      throw new HttpError(503, "Server failed to return with image data.");
    }

    return [data.image as Image, null];
  } catch (err) {
    if (err instanceof Error) {
      return [null, err];
    }

    return [null, new Error("Dang! something went wrong.")];
  }
};

export default uploadImage;
