import {
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
import type { ResponseShape } from "../types/ResponseShape.type";
import { Link, useNavigate } from "react-router";
import { setAuthTokenToLocalStorage } from "../libs/localStorageAPIAuthToken";
import type { User } from "../types/User.type";
import type { FieldErrors } from "../types/FieldErrors.type";
import ErrorLabel from "../components/form-elemets/ErrorLabel";

export default function SignupPage(): ReactElement {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const redirectTo = useNavigate();

  const { setUser } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const handleFormDataChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const elem = e.target;
    setFormData((prevData) => ({ ...prevData, [elem.name]: elem.value }));
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

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

    setIsLoading(true);

    const url = getApiUrl() + "/signup";

    fetch(url, {
      mode: "cors",
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify(formData),
    })
      .then((res) => {
        return res.json();
      })
      .then((result: ResponseShape) => {
        const { status, statusCode, message, data } = result;

        if (status === "error" || statusCode > 400) {
          throw new Error(message);
        }

        if (status === "failure" || statusCode === 400) {
          if (!data) {
            throw new Error(message);
          }

          setFieldErrors((data.errors as FieldErrors) || null);

          return result;
        }

        if (!data || !data.user) {
          throw new Error("User data not found in response body.");
        }

        // set user and auth token
        setUser(data.user as User);
        setAuthTokenToLocalStorage(
          typeof data.token === "string" ? data.token : "",
        );

        // redirect to homepage after successful login
        redirectTo("/");
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoading) {
    return <p>Loading...</p>;
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
                isInvalid={Boolean(fieldErrors.firstName)}
              />

              {fieldErrors.firstName && (
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
                isInvalid={Boolean(fieldErrors.lastName)}
              />

              {fieldErrors.lastName && (
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
              isInvalid={Boolean(fieldErrors.email)}
            />

            {fieldErrors.email && (
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
              isInvalid={Boolean(fieldErrors.password)}
            />

            {fieldErrors.password && (
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
              isInvalid={Boolean(fieldErrors.confirmedPassword)}
            />

            {fieldErrors.confirmedPassword && (
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
    </Main>
  );
}
