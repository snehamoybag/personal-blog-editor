import { type ChangeEventHandler, type ReactElement } from "react";
import FieldWrapper from "../form-elemets/FieldWrapper";
import Input from "../form-elemets/Input";
import Textarea from "../form-elemets/Textarea";
import type { FormData } from "../../types/FormData.type";
import CoverImgField from "./CoverImgField";

interface EditorProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function Editor({
  formData,
  setFormData,
}: Readonly<EditorProps>): ReactElement {
  const handleFieldChagne: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCoverImageChange = (newValue: string) => {
    setFormData((prevData) => ({ ...prevData, coverImg: newValue }));
  };

  return (
    <>
      <CoverImgField
        value={formData.coverImg}
        setValue={handleCoverImageChange}
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
          onChange={handleFieldChagne}
          value={formData.content}
        />
      </FieldWrapper>
    </>
  );
}
