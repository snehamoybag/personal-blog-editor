import {
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
  type ReactElement,
} from "react";
import Main from "../components/landmarks/Main";
import Editor from "../components/Editor";
import type { FormData } from "../types/FormData";

export default function IndexPage(): ReactElement {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    coverImg: "",
  });

  const handlFormDataChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const elem = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [elem.name]: elem.value,
    }));
  };

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Main>
      <section className="container-primary">
        <Editor
          formData={formData}
          onChange={handlFormDataChange}
          onSubmit={handleFormSubmit}
        />
      </section>
    </Main>
  );
}
