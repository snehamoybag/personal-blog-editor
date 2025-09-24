import type { ButtonHTMLAttributes, ReactElement } from "react";

interface ButtonCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

export default function ButtonClose({
  text,
  className = "",
  ...restProps
}: Readonly<ButtonCloseProps>): ReactElement {
  return (
    <button
      type="button"
      className={`clickable ${className}`}
      title={text}
      {...restProps}
    >
      <span className="sr-only">{text}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#000000"
        className="fill-current size-6"
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    </button>
  );
}
