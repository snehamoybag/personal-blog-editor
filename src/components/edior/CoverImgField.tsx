import { useState, type ChangeEventHandler, type ReactElement } from "react";
import CoverImgPreview from "./CoverImgPreview";
import ButtonOutline from "../buttons/ButtonOutline";
import LabelChangeCoverImg from "./LabelChangeCoverImg";
import LabelAddCoverImg from "./LabelAddCoverImg";
import ErrorLabel from "../form-elemets/ErrorLabel";
import getApiUrl from "../../libs/getApiUrl";
import HttpError from "../../libs/HttpError";
import type { Image } from "../../types/Image.type";
import LoadingSpinner from "../LoadingSpinner";
import useUser from "../../hooks/useUser";
import useAuthToken from "../../hooks/useAuthToken";
import fetchData from "../../libs/fetchData";

interface CoverImgFieldProps {
  value?: string;
  setValue?: (newValue: string) => void;
}

export default function CoverImgField({
  value,
  setValue,
}: Readonly<CoverImgFieldProps>): ReactElement {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useUser();
  const { authToken } = useAuthToken();

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setLoading(true);
    setError(null); // reset error from past fail operation

    if (!user || !authToken) {
      setError(new Error("Please log in to upload a cover image."));
      return;
    }
    const elem = e.target;
    const files = elem.files;

    if (!files || !files.length) {
      setError(new Error("Please select a valid image file to upload."));
      return;
    }

    const url = `${getApiUrl()}/users/${user.id}/images`;

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${authToken}`);

    // needed for multipart/fordata
    const formData = new FormData();
    formData.append(elem.name, files[0]);

    const [error, data] = await fetchData(url, {
      mode: "cors",
      method: "POST",
      headers,
      body: formData,
    });

    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    if (!data || !data.image) {
      setError(
        new HttpError(503, "Server responed without the uploaded image data."),
      );

      return;
    }

    if (setValue) {
      const image = data.image as Image;
      setValue(image.url as string);
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
          {error.message}
        </ErrorLabel>
      )}
    </div>
  );
}
