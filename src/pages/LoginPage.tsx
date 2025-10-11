import {
  useEffect,
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
  type ReactElement,
} from "react";
import Main from "../components/landmarks/Main";
import Tittle700 from "../components/titles/Tittle700";
import FieldWrapper from "../components/form-elemets/FieldWrapper";
import Input from "../components/form-elemets/Input";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import useUser from "../hooks/useUser";
import getApiUrl from "../libs/getApiUrl";
import { Link } from "react-router";
import useAuthToken from "../hooks/useAuthToken";
import useDataFetcher from "../hooks/useDataFetcher";
import LoadingModal from "../components/LoadingModal";
import ErrorParagraph from "../components/ErrorParagraph";
import type { User } from "../types/User.type";
import SuccessPage from "./SuccessPage";

export default function LoginPage(): ReactElement {
  const { data, error, isLoading, fetcher } = useDataFetcher();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { user, setUser } = useUser();
  const { authToken, setAuthToken } = useAuthToken();

  const handleFormDataChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const elem = e.target;
    setFormData((prevData) => ({ ...prevData, [elem.name]: elem.value }));
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const url = getApiUrl() + "/login";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    void fetcher(url, {
      mode: "cors",
      method: "POST",
      headers,
      body: JSON.stringify(formData),
    });
  };

  // login user
  useEffect(() => {
    if (!data || !data.user || !data.token) {
      return;
    }

    const { user, token } = data;

    setUser(user as User);
    setAuthToken(token as string);
  }, [data, error, setUser, setAuthToken]);

  if (user && authToken) {
    return (
      <SuccessPage
        message={`You're now logged in as ${user.profile.firstName} ${user.profile.lastName}`}
      >
        <Link
          to="/"
          className="clickable max-w-fit flex items-center gap-2 no-underline px-4 py-2 bg-neutral-700 rounded-full shadow-sm active:shadow-none mt-8 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
            className="fill-current"
          >
            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
          </svg>
          <span>Return to home page</span>
        </Link>
      </SuccessPage>
    );
  }

  return (
    <Main>
      <section className="container-primary p-8">
        <Tittle700 as="h1">Log in</Tittle700>

        <div className="mt-4">
          <p>Log in using your email and password to write your blog.</p>
          <p>
            Don't have an account yet? <Link to="/signup">Sign up</Link>.
          </p>
        </div>

        <form
          action="/login"
          className="grid gap-4 mt-8"
          onSubmit={handleFormSubmit}
        >
          {error && <ErrorParagraph message={error.message} />}

          <FieldWrapper>
            <label htmlFor="email">Email:</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormDataChange}
              required
              isInvalid={error !== null}
            />
          </FieldWrapper>

          <FieldWrapper>
            <label htmlFor="password">Password:</label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleFormDataChange}
              required
              isInvalid={error !== null}
            />
          </FieldWrapper>

          <ButtonPrimary
            type="submit"
            className="py-4 mt-2"
            disabled={isLoading}
          >
            Log in
          </ButtonPrimary>
        </form>
      </section>
      <LoadingModal message="Loggin in..." isLoading={isLoading} />
    </Main>
  );
}
