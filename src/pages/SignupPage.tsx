import {
  useEffect,
  useRef,
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
  type ReactElement,
} from "react";
import Main from "../components/landmarks/Main";
import Tittle700 from "../components/titles/Tittle700";
import FieldWrapper from "../components/form-elemets/FieldWrapper";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import Input from "../components/form-elemets/Input";
import useUser from "../hooks/useUser";
import getApiUrl from "../libs/getApiUrl";
import type { User } from "../types/User.type";
import type { FieldErrors } from "../types/FieldErrors.type";
import ErrorLabel from "../components/form-elemets/ErrorLabel";
import useAuthToken from "../hooks/useAuthToken";
import useDataFetcher from "../hooks/useDataFetcher";
import LoadingModal from "../components/LoadingModal";
import SuccessPage from "./SuccessPage";

export default function SignupPage(): ReactElement {
  const { data, error, isLoading, fetcher } = useDataFetcher();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | null>(null);
  const { user, setUser } = useUser();
  const { authToken, setAuthToken } = useAuthToken();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const handleFormDataChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const elem = e.target;
    setFormData((prevData) => ({ ...prevData, [elem.name]: elem.value }));
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFieldErrors(null); // reset form errors

    // prevent submiting the form if passoword field do not match
    if (formData.password !== formData.confirmedPassword) {
      setFieldErrors({
        confirmedPassword: {
          path: "confirmedPassword",
          value: formData.confirmedPassword,
          msg: "Passwords do not matach.",
        },
      });

      return;
    }

    const url = getApiUrl() + "/signup";

    void fetcher(url, {
      mode: "cors",
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify(formData),
    });
  };

  // trigger loading modal
  const loadingModalRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    const elem = loadingModalRef.current;

    if (!elem) {
      return;
    }

    if (isLoading) {
      elem.showModal();
    } else {
      elem.close();
    }
  }, [isLoading]);

  // login user or field errors if any
  useEffect(() => {
    if (!data) {
      return;
    }

    const { errors, user, token } = data;

    if (error && errors) {
      setFieldErrors(errors as FieldErrors);
    } else if (!error && user && token) {
      setUser(user as User);
      setAuthToken(JSON.stringify(token));
    }
  }, [data, error, setUser, setAuthToken]);

  if (user && authToken) {
    return (
      <SuccessPage
        message={`Signup complete. You're now logged in as ${user.profile.firstName} ${user.profile.lastName}`}
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
        <Tittle700 as="h1">Sign up</Tittle700>
        <div className="mt-4">
          <p>
            Please sign up by filling the form with appropriate informations.
          </p>
          <p>
            Already have an account? <Link to="/login">Log in</Link>.
          </p>
        </div>

        <form
          action="/signup"
          className="grid gap-4 mt-8"
          onSubmit={handleFormSubmit}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldWrapper>
              <label htmlFor="first-name">First name:</label>
              <Input
                type="text"
                id="first-name"
                name="firstName"
                value={formData.firstName}
                minLength={3}
                maxLength={35}
                required
                onChange={handleFormDataChange}
                isInvalid={Boolean(fieldErrors && fieldErrors.firstName)}
              />

              {fieldErrors && fieldErrors.firstName && (
                <ErrorLabel htmlFor="first-name">
                  {fieldErrors.firstName.msg}
                </ErrorLabel>
              )}
            </FieldWrapper>

            <FieldWrapper>
              <label htmlFor="last-name">Last name:</label>
              <Input
                type="text"
                id="last-name"
                name="lastName"
                value={formData.lastName}
                minLength={3}
                maxLength={35}
                required
                onChange={handleFormDataChange}
                isInvalid={Boolean(fieldErrors && fieldErrors.lastName)}
              />

              {fieldErrors && fieldErrors.lastName && (
                <ErrorLabel htmlFor="last-name">
                  {fieldErrors.lastName.msg}
                </ErrorLabel>
              )}
            </FieldWrapper>
          </div>

          <FieldWrapper>
            <label htmlFor="email">Email:</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              required
              onChange={handleFormDataChange}
              isInvalid={Boolean(fieldErrors && fieldErrors.email)}
            />

            {fieldErrors && fieldErrors.email && (
              <ErrorLabel htmlFor="email">{fieldErrors.email.msg}</ErrorLabel>
            )}
          </FieldWrapper>

          <FieldWrapper>
            <label htmlFor="password">Password:</label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              minLength={6}
              maxLength={55}
              required
              onChange={handleFormDataChange}
              isInvalid={Boolean(fieldErrors && fieldErrors.password)}
            />

            {fieldErrors && fieldErrors.password && (
              <ErrorLabel htmlFor="password">
                {fieldErrors.password.msg}
              </ErrorLabel>
            )}
          </FieldWrapper>

          <FieldWrapper>
            <label htmlFor="confirmed-password">Confirm password:</label>
            <Input
              type="text"
              id="confirmed-password"
              name="confirmedPassword"
              value={formData.confirmedPassword}
              minLength={6}
              maxLength={55}
              required
              onChange={handleFormDataChange}
              isInvalid={Boolean(fieldErrors && fieldErrors.confirmedPassword)}
            />

            {fieldErrors && fieldErrors.confirmedPassword && (
              <ErrorLabel htmlFor="confirmed-password">
                {fieldErrors.confirmedPassword.msg}
              </ErrorLabel>
            )}
          </FieldWrapper>

          <ButtonPrimary
            type="submit"
            className="py-4 mt-2"
            disabled={isLoading}
          >
            Sign up
          </ButtonPrimary>
        </form>
      </section>
      <LoadingModal ref={loadingModalRef} message="Signing up..." />
    </Main>
  );
}
