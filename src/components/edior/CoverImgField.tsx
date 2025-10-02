import {
  useEffect,
  useRef,
  useState,
  type ChangeEventHandler,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import FieldWrapper from "./form-elemets/FieldWrapper";
import useUploadImage from "../hooks/useUploadImage";
import CoverImgPreview from "./edior/CoverImgPreview";

interface CoverImgFieldProps {
  url?: string;
  alt?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function CoverImgField({
  url = "", // cloud url
  alt = "cover image of the blog.",
  onChange,
}: Readonly<CoverImgFieldProps>): ReactElement {
  const [file, setFile] = useState<File | null>(null);
  const { image, isLoading, error } = useUploadImage(1, file);

  if (isLoading) {
    console.log("Uploading...");
  }

  if (error) {
    console.error(error);
  }

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;

    // reset the file and input value no file is selected
    if (!files || !files.length) {
      setFile(null);
      return;
    }

    // update the file with the new selected file
    setFile(files[0]);
  };

  return (
    <div>
      {url && <CoverImgPreview src={url} alt={alt} />}

      <FieldWrapper className="max-w-max mt-2">
        <span className="flex items-center gap-4">
          <label
            htmlFor="cover-image"
            className="clickable flex items-center gap-1 px-4 py-1 bg-neutral-700 rounded-full shadow-sm"
          >
            {file ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                  className="size-4 fill-current opacity-70"
                >
                  <path d="M360-200h240l-79-103-58 69-39-52-64 86ZM320-80q-33 0-56.5-23.5T240-160v-320q0-33 23.5-56.5T320-560h320q33 0 56.5 23.5T720-480v320q0 33-23.5 56.5T640-80H320Zm0-80h320v-320H320v320ZM140-640q38-109 131.5-174.5T480-880q82 0 155.5 35T760-746v-134h80v240H600v-80h76q-39-39-90-59.5T480-800q-81 0-149.5 43T227-640h-87Zm180 480v-320 320Z" />
                </svg>
                <span>Change image</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                  className="size-4 fill-current opacity-70"
                >
                  <path d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm480-280v-167l-64 63-56-56 160-160 160 160-56 56-64-63v167h-80Z" />
                </svg>
                <span>Add a cover image</span>
              </>
            )}
          </label>

          {/* remove image button */}
          {file && (
            <button
              type="button"
              className="clickable text-red-300 px-4 py-1 border-1 border-current rounded-full opacity-75 hover:opacity-100"
              onClick={handleImageRemove}
            >
              Remove image
            </button>
          )}
        </span>

        {/* fileupload input */}
        <input
          ref={fileInputRef}
          type="file"
          name="coverimage"
          id="cover-image"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="sr-only"
          onChange={handleChange}
          value={value}
          required
        />
      </FieldWrapper>
    </div>
  );
}
