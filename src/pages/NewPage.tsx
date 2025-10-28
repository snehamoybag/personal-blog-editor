import { useState, type FormEventHandler, type ReactElement } from "react";
import Main from "../components/landmarks/Main";
import Editor from "../components/edior/Editor";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import useUser from "../hooks/useUser";
import getApiUrl from "../libs/getApiUrl";
import type { FieldErrors } from "../types/FieldErrors.type";
import useAuthToken from "../hooks/useAuthToken";
import LoadingModal from "../components/LoadingModal";
import useDataFetcher from "../hooks/useDataFetcher";
import ErrorParagraph from "../components/ErrorParagraph";
import SuccessPage from "./SuccessPage";
import getBlogUrl from "../libs/getBlogUrl";
import type { Blog } from "../types/Blog.type";
import { Navigate } from "react-router";
import type { BlogFormData } from "../types/BlogFormData.type";
import getBlogFormData from "../libs/getBlogFormData";
import EditorPreviewTabs from "../components/EditorPreviewTabs";
import EditorPreview from "../components/EditorPreview";

export default function NewPage(): ReactElement {
  const { user } = useUser();
  const { authToken } = useAuthToken();
  const { data, error, isLoading, fetcher } = useDataFetcher();
  const [formData, setFormData] = useState<BlogFormData>(getBlogFormData);

  const formErrors = data && data.errors ? (data.errors as FieldErrors) : null;

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const url = `${getApiUrl()}/blogs`;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    void fetcher(url, {
      mode: "cors",
      method: "POST",
      headers,
      body: JSON.stringify(formData),
    });
  };

  // redirect to login page if user or authToken not available
  if (!user || !authToken) {
    return <Navigate to="/login" />;
  }

  // render success page on successful blog creation
  if (data && data.blog) {
    const blog = data.blog as Blog;

    return (
      <SuccessPage message="Blog published successfully.">
        <a
          href={`${getBlogUrl()}/blogs/${blog.id}}`}
          target="_blank"
          className="clickable inline-block no-underline bg-neutral-700 rounded-full mt-8"
        >
          <span className="block px-8 py-2 shadow-sm active:shadow-none">
            View Blog
          </span>
        </a>
      </SuccessPage>
    );
  }

  return (
    <Main>
      <section className="container-primary">
        <form onSubmit={handleFormSubmit} className="grid gap-y-8">
          {error && <ErrorParagraph message={error.message} />}

          <EditorPreviewTabs
            editor={
              <Editor
                formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
              />
            }
            preview={
              <EditorPreview
                title={formData.title}
                content={formData.content}
                tags={formData.tags}
                coverImgUrl={formData.coverImgUrl}
              />
            }
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

      <LoadingModal message="Publishing new blog..." isLoading={isLoading} />
    </Main>
  );
}
