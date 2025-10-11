import type { ReactElement } from "react";
import { Link } from "react-router";

export default function LinkToHomepage(): ReactElement {
  return (
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
  );
}
