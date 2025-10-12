import {
  useEffect,
  useState,
  type FormEventHandler,
  type ReactElement,
} from "react";
import { useNavigate, useParams } from "react-router";
import HttpError from "../libs/HttpError";
import useDataFetcher from "../hooks/useDataFetcher";
import useBlog from "../hooks/useBlog";
import useUser from "../hooks/useUser";
import useAuthToken from "../hooks/useAuthToken";
import { Navigate } from "react-router";
import Main from "../components/landmarks/Main";
import LoadingModal from "../components/LoadingModal";
import Editor from "../components/edior/Editor";
import type { FieldErrors } from "../types/FieldErrors.type";
import getApiUrl from "../libs/getApiUrl";
import SuccessPage from "./SuccessPage";
import getBlogUrl from "../libs/getBlogUrl";
import getBlogFormData from "../libs/getBlogFormData";
import type { BlogFormData } from "../types/BlogFormData.type";
import ButtonPrimary from "../components/buttons/ButtonPrimary";

export default function EditPage(): ReactElement {
  const params = useParams();
  const blogId = Number(params.blogId);

  if (!blogId) {
    throw new HttpError(404, "Blog not found.");
  }

  const { user } = useUser();
  const { authToken } = useAuthToken();
  const { blog, error: blogError, isLoading: blogIsLoading } = useBlog(blogId);
  const [formData, setFormData] = useState<BlogFormData>(getBlogFormData);

  // sync formdata with blog
  useEffect(() => {
    if (blog) {
      setFormData(getBlogFormData(blog));
    }
  }, [blog]);

  const { data, error, isLoading, fetcher } = useDataFetcher(); // data of PUT request
  const formErrors = data && data.errors ? (data.errors as FieldErrors) : null;

  const redirectTo = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!authToken) {
      return void redirectTo("/login");
    }

    const url = `${getApiUrl()}/blogs/${blogId}`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    void fetcher(url, {
      mode: "cors",
      method: "PUT",
      headers,
      body: JSON.stringify(formData),
    });
  };

  // redirect to login page if user not logged in
  if (!user || !authToken) {
    return <Navigate to="/login" />;
  }

  if (blogError) {
    throw blogError;
  }

  if (blog && blog.authorId !== user.id) {
    throw new HttpError(
      403,
      "Access denied: You do not have permission to edit this blog.",
    );
  }

  // return success page on successful update
  if (!error && data && data.blog) {
    return (
      <SuccessPage message="Blog updated successfully.">
        <a
          href={`${getBlogUrl()}/blogs/${blogId}}`}
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
        {blog && !blogError && (
          <form
            action=""
            method="PUT"
            onSubmit={handleSubmit}
            className="grid gap-y-8"
          >
            <Editor
              formData={formData}
              setFormData={setFormData}
              formErrors={formErrors}
            />

            <div className="flex itmes-cneter gap-4">
              <ButtonPrimary type="submit" name="publish" className="px-8">
                Update
              </ButtonPrimary>

              <button type="submit" name="draft" className="clickable">
                Save draft
              </button>
            </div>
          </form>
        )}
      </section>

      <LoadingModal
        isLoading={blogIsLoading || isLoading}
        message={
          blogIsLoading ? "Loading please wait..." : "Updating blog data..."
        }
      />
    </Main>
  );
}
