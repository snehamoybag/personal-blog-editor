import {
  useRef,
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import FieldWrapper from "./form-elemets/FieldWrapper";
import Input from "./form-elemets/Input";
import Textarea from "./form-elemets/Textarea";
import ButtonPrimary from "./buttons/ButtonPrimary";
import type { FormData } from "../types/FormData";

interface EditorProps {
  formData: FormData;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit: FormEventHandler;
}

export default function Editor({
  formData,
  onChange,
  onSubmit,
}: Readonly<EditorProps>): ReactElement {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (!files || !files.length) {
      setImageFile(null);
      return;
    }

    setImageFile(files[0]);
  };

  const handleImageRemove: MouseEventHandler<HTMLButtonElement> = () => {
    setImageFile(null);

    // update field value
    if (!imageInputRef.current) {
      return;
    }

    imageInputRef.current.value = "";
  };

  return (
    <form className="grid gap-8" onSubmit={onSubmit}>
      <div>
        {/* preview */}
        {imageFile && (
          <div>
            <img
              src={URL.createObjectURL(imageFile)}
              alt={imageFile.name}
              className="w-full aspect-video cover object-center"
            />
          </div>
        )}

        <FieldWrapper className="max-w-max mt-2">
          <span className="flex items-center gap-4">
            <label
              htmlFor="image"
              className="clickable flex items-center gap-1 px-4 py-1 bg-neutral-700 rounded-full shadow-sm"
            >
              {imageFile ? (
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
            {imageFile && (
              <button
                type="button"
                className="clickable text-red-300 px-4 py-1 border-1 border-current rounded-full opacity-75 hover:opacity-100"
                onClick={handleImageRemove}
              >
                Remove image
              </button>
            )}
          </span>

          <input
            ref={imageInputRef}
            type="file"
            name="image"
            id="image"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="sr-only"
            onChange={handleImageChange}
          />
        </FieldWrapper>
      </div>

      <FieldWrapper>
        <label htmlFor="title" className="sr-only">
          Title:
        </label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          placeholder="New blog title here..."
          minLength={10}
          maxLength={120}
          required
          onChange={onChange}
        />
      </FieldWrapper>

      <FieldWrapper>
        <label htmlFor="content" className="sr-only">
          Content:
        </label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your blog content here..."
          minLength={120}
          required
          onChange={onChange}
          value={formData.content}
        />
      </FieldWrapper>

      <div className="flex itmes-cneter gap-4">
        <ButtonPrimary type="submit" name="publish" className="px-8">
          Publish
        </ButtonPrimary>

        <button type="submit" name="draft" className="clickable">
          Save draft
        </button>
      </div>
    </form>
  );
}
