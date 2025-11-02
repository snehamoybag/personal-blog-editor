import type { ReactElement } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router";
import Main from "../components/landmarks/Main";
import Tittle700 from "../components/titles/Tittle700";
import { Link } from "react-router";
import illustration from "../assets/page-error-illustration.svg";
import HttpError from "../libs/HttpError";

export default function ErrorPage(): ReactElement {
  const error = useRouteError();

  // default fallback cases
  let title = "Dang! Something went wrong.";
  let paragraph = "An unknown error has occured. Please try again later.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status}: ${error.statusText}`;
    paragraph = error.data as string;
  } else if (error instanceof HttpError) {
    title = `Error: ${error.statusCode}`;
    paragraph = error.message;
  } else if (error instanceof Error) {
    title = `${error.name || "Dang! Something went wrong."}`;
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

        {error instanceof HttpError && error.statusCode === 401 ? (
          <div className="flex gap-4 mt-8">
            <Link
              to="/login"
              className="clickable flex items-center gap-2 no-underline px-4 py-2 bg-neutral-700 rounded-full shadow-sm active:shadow-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                className="fill-neutral-400"
              >
                <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
              </svg>
              <span>Log in</span>
            </Link>

            <Link
              to="/signup"
              className="clickable flex items-center gap-2 no-underline px-4 py-2 rounded-full border-1 border-neutral-700 hover:border-neutral-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                className="fill-neutral-400"
              >
                <path d="M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z" />
              </svg>
              <span>Sign up</span>
            </Link>
          </div>
        ) : (
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
        )}
      </section>
    </Main>
  );
}
