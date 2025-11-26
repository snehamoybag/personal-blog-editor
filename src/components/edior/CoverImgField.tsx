import {
  useEffect,
  type ChangeEventHandler,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import CoverImgPreview from "./CoverImgPreview";
import ButtonOutline from "../buttons/ButtonOutline";
import LabelChangeCoverImg from "./LabelChangeCoverImg";
import LabelAddCoverImg from "./LabelAddCoverImg";
import ErrorLabel from "../form-elemets/ErrorLabel";
import getApiUrl from "../../libs/getApiUrl";
import type { Image } from "../../types/Image.type";
import LoadingSpinner from "../LoadingSpinner";
import useUser from "../../hooks/useUser";
import useAuthToken from "../../hooks/useAuthToken";
import type { FieldError } from "../../types/FieldError.type";
import useDataFetcher from "../../hooks/useDataFetcher";

interface CoverImgFieldProps {
  value?: string;
  setValue?: (newValue: string) => void;
  error?: FieldError;
}

export default function CoverImgField({
  value,
  setValue,
  error,
}: Readonly<CoverImgFieldProps>): ReactElement {
  const { data, error: uploadError, isLoading, fetcher } = useDataFetcher();
  const { user } = useUser();
  const { authToken } = useAuthToken();

  const isAdmin = user !== null && Boolean(authToken) && user.role === "ADMIN";

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isAdmin) {
      throw new Error("You don not have permissions to upload an image.");
    }

    const elem = e.target;
    const files = elem.files;

    if (!files || !files.length) {
      return;
    }

    const url = `${getApiUrl()}/users/${user.id}/images`;

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${authToken}`);

    // needed for multipart/formdata
    const formData = new FormData();
    formData.append(elem.name, files[0]);

    void fetcher(url, {
      mode: "cors",
      method: "POST",
      headers,
      body: formData,
    });
  };

  const handleRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (setValue) {
      setValue("");
    }
  };

  // update coverImgUrl value everytime data changes
  useEffect(() => {
    if (setValue && data && data.image) {
      const image = data.image as Image;
      setValue(image.url);
    }
  }, [data, setValue]);

  if (isLoading) {
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
            <LabelChangeCoverImg
              htmlFor="cover-image"
              className={error ? "border-red-300" : ""}
            />

            <ButtonOutline
              className="text-red-300 opacity-70 hover:opacity-100"
              onClick={handleRemove}
            >
              Remove image
            </ButtonOutline>
          </div>
        </>
      ) : (
        <LabelAddCoverImg
          htmlFor="cover-image"
          isDisabled={!isAdmin}
          className={error ? "border-red-300" : ""}
        />
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
        disabled={!isAdmin}
      />

      {/* when user is not logged in */}
      {!isAdmin && (
        <ErrorLabel htmlFor="cover-image" className="block mt-2">
          You do not have permissions to upload an image.
        </ErrorLabel>
      )}

      {/* fetch error label */}
      {uploadError && (
        <ErrorLabel htmlFor="cover-image" className="block mt-2">
          {uploadError.message}
        </ErrorLabel>
      )}

      {/* field error label. usually missing field error */}
      {error && (
        <ErrorLabel htmlFor="cover-image" className="block mt-2">
          {error.msg}
        </ErrorLabel>
      )}
    </div>
  );
}
