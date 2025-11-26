import type { ReactElement } from "react";

interface LabelAddCoverImgProps {
  htmlFor: string;
  isDisabled?: boolean;
  className?: string;
}

export default function LabelAddCoverImg({
  htmlFor,
  isDisabled = false,
  className = "",
}: Readonly<LabelAddCoverImgProps>): ReactElement {
  return (
    <label
      htmlFor={htmlFor}
      aria-disabled={isDisabled}
      className={`max-w-max flex items-center gap-2 bg-neutral-700 px-4 py-2 rounded-full ${isDisabled ? "opacity-50" : "clickable"} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#000000"
        className="fill-current size-4 opacity-50"
      >
        <path d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm480-280v-167l-64 63-56-56 160-160 160 160-56 56-64-63v167h-80Z" />
      </svg>
      <span>Add cover image</span>
    </label>
  );
}
