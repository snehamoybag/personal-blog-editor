import {
  useEffect,
  type ChangeEventHandler,
  type ReactElement,
  type RefObject,
} from "react";
import useDataFetcher from "../../../hooks/useDataFetcher";
import type { Image } from "../../../types/Image.type";
import getApiUrl from "../../../libs/getApiUrl";
import useUser from "../../../hooks/useUser";
import useAuthToken from "../../../hooks/useAuthToken";
import FieldWrapper from "../../form-elemets/FieldWrapper";
import LoadingSpinner from "../../LoadingSpinner";

interface ContentImageUploaderProps {
  contentRef: RefObject<HTMLTextAreaElement | null>;
  setContentValue: (newValue: string) => void;
  className?: string;
}

const apiUrl = getApiUrl();

export default function ContentImageUploader({
  contentRef,
  setContentValue,
  className = "",
}: Readonly<ContentImageUploaderProps>): ReactElement {
  const { user } = useUser();
  const { authToken } = useAuthToken();
  const { isLoading, data, error, fetcher } = useDataFetcher();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!user || !authToken) {
      console.error("BadRequest: Login to upload an image.");
      return;
    }

    const files = e.currentTarget.files;

    if (!files || !files.length) {
      return;
    }

    const url = `${apiUrl}/users/${user.id}/images`;

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${authToken}`);

    // needed for multipart/formdata
    const formData = new FormData();
    formData.append("image", files[0]);

    void fetcher(url, {
      mode: "cors",
      method: "POST",
      headers,
      body: formData,
    });
  };

  // disable the texarea when image is being uploaded
  useEffect(() => {
    if (!contentRef || !contentRef.current) {
      return;
    }

    const contentEl = contentRef.current;
    if (isLoading) {
      contentEl.disabled = true;
      contentEl.style.opacity = "0.5";
    } else {
      contentEl.disabled = false;
      contentEl.style.opacity = "1";
    }
  }, [isLoading, contentRef]);

  // update the textarea value after successful upload
  useEffect(() => {
    if (!contentRef || !contentRef.current) {
      return;
    }

    if (!data || !data.image) {
      return;
    }

    const value = contentRef.current.value;
    const image = data.image as Image;
    const { url, originalName: altText } = image;

    // image tag in markdown format
    const imageTag = `![${altText}](${url})`;

    if (!value) {
      setContentValue(value + imageTag + "\n"); // do not add a new line at the beginning
    } else {
      setContentValue(value + "\n" + imageTag + "\n");
    }

    // add focus back
    contentRef.current.focus();
  }, [data, contentRef, setContentValue]);

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <LoadingSpinner />
        <span>Uploading...</span>
      </div>
    );
  }

  return (
    <FieldWrapper
      className={`grid grid-flow-col items-center border-1 border-neutral-700 rounded-full ${error ? "pr-2 text-red-300 border-red-300" : ""} ${!user || !authToken ? "opacity-50" : "clickable"} ${className}`}
    >
      <label
        htmlFor="content-image"
        title="Add an image"
        aria-disabled={!user || !authToken}
        className="p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
          aria-hidden="true"
          className="fill-current"
        >
          <path d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm480-280v-167l-64 63-56-56 160-160 160 160-56 56-64-63v167h-80Z" />
        </svg>
        <span className="sr-only">Add an image</span>
      </label>

      {/* hidden input  */}
      <input
        type="file"
        name="image"
        id="content-image"
        hidden={true}
        accept="image/jpeg,image/jpg,image/png,image/webp"
        size={5 * 1024 * 1024} // 5mb
        onChange={handleChange}
        disabled={!user || !authToken}
      />

      {error && (
        <label htmlFor="content-image" className="text-xs">
          Upload failed.
        </label>
      )}
    </FieldWrapper>
  );
}
