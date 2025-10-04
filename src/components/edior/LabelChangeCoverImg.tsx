import type { ReactElement } from "react";

interface LabelChangeCoverImgProps {
  htmlFor: string;
  className?: string;
}

export default function LabelChangeCoverImg({
  htmlFor,
  className = "",
}: Readonly<LabelChangeCoverImgProps>): ReactElement {
  return (
    <label
      htmlFor={htmlFor}
      className={`clickable max-w-max flex items-center gap-2 bg-neutral-700 px-4 py-2 rounded-full ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#000000"
        className="fill-current size-4 opacity-50"
      >
        <path d="M360-200h240l-79-103-58 69-39-52-64 86ZM320-80q-33 0-56.5-23.5T240-160v-320q0-33 23.5-56.5T320-560h320q33 0 56.5 23.5T720-480v320q0 33-23.5 56.5T640-80H320Zm0-80h320v-320H320v320ZM140-640q38-109 131.5-174.5T480-880q82 0 155.5 35T760-746v-134h80v240H600v-80h76q-39-39-90-59.5T480-800q-81 0-149.5 43T227-640h-87Zm180 480v-320 320Z" />
      </svg>
      <span>Change image</span>
    </label>
  );
}
