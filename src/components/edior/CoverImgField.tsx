import { useState, type ChangeEventHandler, type ReactElement } from "react";
import CoverImgPreview from "./CoverImgPreview";
import ButtonOutline from "../buttons/ButtonOutline";
import LabelChangeCoverImg from "./LabelChangeCoverImg";
import LabelAddCoverImg from "./LabelAddCoverImg";
import ErrorLabel from "../form-elemets/ErrorLabel";
import getApiUrl from "../../libs/getApiUrl";
import { getUserFromLocalStorage } from "../../libs/localStorageUser";
import { getAuthTokenFromLocalStorage } from "../../libs/localStorageAPIAuthToken";
import type { ResponseShape } from "../../types/ResponseShape.type";
import HttpError from "../../libs/HttpError";
import type { Image } from "../../types/Image.type";
import LoadingSpinner from "../LoadingSpinner";

interface CoverImgFieldProps {
  value?: string;
  setValue?: (newValue: string) => void;
}

export default function CoverImgField({
  value,
  setValue,
}: Readonly<CoverImgFieldProps>): ReactElement {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  // upload image on change
  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      // reset states
      setLoading(true);
      setError(null);

      const user = getUserFromLocalStorage();
      const authToken = getAuthTokenFromLocalStorage();
      if (!user || !authToken) {
        throw new Error("You must log in to upload an image.");
      }

      const elem = e.target;
      const files = elem.files;

      if (!files || !files.length) {
        throw new Error("Please select an image file to upload.");
      }

      const url = `${getApiUrl()}/users/${user.id}/images`;

      const headers = new Headers();
      headers.append("Authorization", `Bearer ${authToken}`);

      // needed for multipart/fordata
      const formData = new FormData();
      formData.append(elem.name, files[0]);

      const response = await fetch(url, {
        mode: "cors",
        method: "POST",
        headers,
        body: formData,
      });

      const result: ResponseShape = await response.json();

      // handle http errors
      if (result.status !== "success" || result.statusCode >= 400) {
        throw new HttpError(result.statusCode, result.message);
      }

      if (!result.data || !result.data.image) {
        throw new HttpError(
          503,
          "Server responed without the uploaded image data.",
        );
      }

      // update value
      const image = result.data.image as Image;
      if (setValue) {
        setValue(image.url);
      }
    } catch (err) {
      if (err instanceof Error === false) {
        setError(
          new Error("Unknown error has occured during the image upload."),
        );
        return;
      }

      // ignore abortcontroller errors
      if (err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="flex items-center gap-2">
        <LoadingSpinner />
        <span>Uploading...</span>
      </p>
    );
  }

  return (
    <div className="text-sm sm:text-base">
      {value ? (
        <>
          <CoverImgPreview src={value} alt="cover image" />

          <div className="flex items-center gap-4 mt-4">
            <LabelChangeCoverImg htmlFor="cover-image" />

            <ButtonOutline className="text-red-300 opacity-70 hover:opacity-100">
              Remove image
            </ButtonOutline>
          </div>
        </>
      ) : (
        <LabelAddCoverImg htmlFor="cover-image" />
      )}

      {/* hidden input gets selected by its labels */}
      <input
        type="file"
        name="image"
        id="cover-image"
        hidden={true}
        accept="image/jpeg,image/jpg,image/png,image/webp"
        size={5 * 1024 * 1024} // 5mb
        onChange={handleChange}
      />

      {/* error label */}
      {error && (
        <ErrorLabel htmlFor="cover-image" className="block mt-2">
          Error: {error.message}
        </ErrorLabel>
      )}
    </div>
  );
}
