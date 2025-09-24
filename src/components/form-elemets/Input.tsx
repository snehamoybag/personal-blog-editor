import type { InputHTMLAttributes, ReactElement, RefObject } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: RefObject<HTMLInputElement | null>;
  type?: string;
  isInvalid?: boolean;
  className?: string;
}

export default function Input({
  ref,
  type = "text",
  className = "",
  isInvalid = false,
  ...restProps
}: Readonly<InputProps>): ReactElement {
  return (
    <input
      ref={ref}
      type={type}
      className={`p-4 border-1 border-solid border-neutral-700 rounded-xl ${isInvalid ? "text-red-300 border-red-300 outline-red-300" : ""} ${className}`}
      {...restProps}
    />
  );
}
