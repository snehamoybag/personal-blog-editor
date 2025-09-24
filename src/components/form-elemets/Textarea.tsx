import type { ReactElement, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  className?: string;
}

export default function Textarea({
  className = "",
  value = "",
  ...restProps
}: Readonly<TextareaProps>): ReactElement {
  return (
    <textarea
      className={`p-4 border-1 border-solid border-neutral-700 rounded-xl ${className}`}
      {...restProps}
    >
      {value}
    </textarea>
  );
}
