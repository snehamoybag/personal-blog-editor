import {
  type ChangeEventHandler,
  type ReactElement,
  type TextareaHTMLAttributes,
} from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
}

export default function Textarea({
  className = "",
  value = "",
  onChange,
  ...restProps
}: Readonly<TextareaProps>): ReactElement {
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (!onChange) {
      return;
    }

    const elem = e.target;

    // auto resize on type
    const scrollHeight = elem.scrollHeight;

    elem.style.height = "auto"; // reset size first

    if (scrollHeight) {
      elem.style.height = scrollHeight + "px";
    }

    // call the onChange event
    onChange(e);
  };

  return (
    <textarea
      className={`min-h-[5lh] p-4 border-1 border-solid border-neutral-700 rounded-xl resize-none overflow-hidden ${className}`}
      onChange={handleChange}
      {...restProps}
    ></textarea>
  );
}
