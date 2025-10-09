import type { ReactElement } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router";
import Main from "../components/landmarks/Main";
import Tittle700 from "../components/titles/Tittle700";
import { Link } from "react-router";
import illustration from "../assets/page-error-illustration.svg";

export default function ErrorPage(): ReactElement {
  const error = useRouteError();

  // default fallback cases
  let title = "Dang! Something went wrong.";
  let paragraph = "An unknown error has occured. Please try again later.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status}: ${error.statusText}`;
    paragraph = error.data;
  } else if (error instanceof Error) {
    title = `503: ${error.name || "Dang! Something went wrong."}`;
    paragraph = error.message;
  }

  return (
    <Main>
      <section className="container-primary flex flex-col items-center text-center">
        <img
          src={illustration}
          alt="error illustration image"
          className="max-w-1/2 select-none filter grayscale-100 brightness-90"
        />

        <Tittle700 as="h1">{title}</Tittle700>
        <p className="text-red-300 mt-2">{paragraph}</p>

        <Link
          to="/"
          className="clickable max-w-fit flex items-center gap-2 no-underline px-4 py-2 bg-neutral-700 rounded-full shadow-sm active:shadow-none mt-8"
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
      </section>
    </Main>
  );
}
