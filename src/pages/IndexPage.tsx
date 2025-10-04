import { type FormEventHandler, type ReactElement } from "react";
import Main from "../components/landmarks/Main";
import Editor from "../components/edior/Editor";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import useFormData from "../hooks/useFormData";
import useUser from "../hooks/useUser";
import getApiUrl from "../libs/getApiUrl";

export default function IndexPage(): ReactElement {
  const { user } = useUser();

  if (!user) {
    throw new Error("User must log in to to create a new blog.");
  }

  const { formData, setFormData } = useFormData(null);

  const submitUrl = `${getApiUrl()}/${user.id}/images`;
  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <Main>
      <section className="container-primary">
        <form
          action={submitUrl}
          onSubmit={handleFormSubmit}
          className="grid gap-y-8"
        >
          <Editor formData={formData} setFormData={setFormData} />

          <div className="flex itmes-cneter gap-4">
            <ButtonPrimary type="submit" name="publish" className="px-8">
              Publish
            </ButtonPrimary>

            <button type="submit" name="draft" className="clickable">
              Save draft
            </button>
          </div>
        </form>
      </section>
    </Main>
  );
}
