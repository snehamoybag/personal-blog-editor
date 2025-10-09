import {
  useEffect,
  useRef,
  useState,
  type FormEventHandler,
  type ReactElement,
} from "react";
import Main from "../components/landmarks/Main";
import Editor from "../components/edior/Editor";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import useFormData from "../hooks/useFormData";
import useUser from "../hooks/useUser";
import getApiUrl from "../libs/getApiUrl";
import type { FieldErrors } from "../types/FieldErrors.type";
import useAuthToken from "../hooks/useAuthToken";
import LoadingModal from "../components/LoadingModal";
import useDataFetcher from "../hooks/useDataFetcher";
import ErrorParagraph from "../components/ErrorParagraph";

export default function IndexPage(): ReactElement {
  const { user } = useUser();
  const { authToken } = useAuthToken();
  const { formData, setFormData } = useFormData(null);
  const [formErrors, setFormErrors] = useState<FieldErrors | null>(null);

  const { data, error, isLoading, fetcher } = useDataFetcher();

  if (!user || !authToken) {
    throw new Error("User must log in to to create a new blog.");
  }

  const loadingModalRef = useRef<HTMLDialogElement>(null);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const url = `${getApiUrl()}/blogs`;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Beaer ${authToken}`);

    void fetcher(url, {
      mode: "cors",
      method: "POST",
      headers,
      body: JSON.stringify(formData),
    });
  };

  // trigger loading modal
  useEffect(() => {
    const loadingModalElem = loadingModalRef.current;
    if (!loadingModalElem) {
      return;
    }

    if (isLoading) {
      loadingModalElem.showModal();
    } else {
      loadingModalElem.close();
    }
  }, [isLoading]);

  // update form errors
  useEffect(() => {
    if (data && data.errors) {
      const fieldErrors = data.errors as FieldErrors;
      setFormErrors(fieldErrors);
    }
  }, [data]);

  return (
    <Main>
      <section className="container-primary">
        <form onSubmit={handleFormSubmit} className="grid gap-y-8">
          {error && <ErrorParagraph message={error.message} />}

          <Editor
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
          />

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

      <LoadingModal ref={loadingModalRef} message="Publishing new blog..." />
    </Main>
  );
}
