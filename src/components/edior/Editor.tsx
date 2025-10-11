import { useCallback, type ChangeEventHandler, type ReactElement } from "react";
import FieldWrapper from "../form-elemets/FieldWrapper";
import Input from "../form-elemets/Input";
import Textarea from "../form-elemets/Textarea";
import type { BlogFormData } from "../../types/BlogFormData.type";
import CoverImgField from "./CoverImgField";
import TagsField from "./TagsField";
import type { FieldErrors } from "../../types/FieldErrors.type";
import ErrorLabel from "../form-elemets/ErrorLabel";

interface EditorProps {
  formData: BlogFormData;
  setFormData: React.Dispatch<React.SetStateAction<BlogFormData>>;
  formErrors: FieldErrors | null;
}

export default function Editor({
  formData,
  setFormData,
  formErrors,
}: Readonly<EditorProps>): ReactElement {
  const handleFieldChagne: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCoverImageChange = useCallback(
    (newValue: string) => {
      setFormData((prevData) => ({ ...prevData, coverImgUrl: newValue }));
    },
    [setFormData],
  );

  const handleTagsChange = useCallback(
    (newValue: string[]) => {
      setFormData((prevData) => ({ ...prevData, tags: newValue }));
    },
    [setFormData],
  );

  return (
    <>
      <CoverImgField
        value={formData.coverImgUrl}
        setValue={handleCoverImageChange}
        error={formErrors ? formErrors.coverImgUrl : undefined}
      />

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
          onChange={handleFieldChagne}
          className={formErrors && formErrors.title ? "border-red-300" : ""}
        />
        {formErrors && formErrors.title && (
          <ErrorLabel htmlFor="title">{formErrors.title.msg}</ErrorLabel>
        )}
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
          onChange={handleFieldChagne}
          defaultValue={formData.content}
          value={formData.content}
          className={formErrors && formErrors.content ? "border-red-300" : ""}
        />
        {formErrors && formErrors.content && (
          <ErrorLabel htmlFor="content">{formErrors.content.msg}</ErrorLabel>
        )}
      </FieldWrapper>

      <TagsField
        value={formData.tags}
        setValue={handleTagsChange}
        error={formErrors ? formErrors.tags : undefined}
      />
    </>
  );
}
