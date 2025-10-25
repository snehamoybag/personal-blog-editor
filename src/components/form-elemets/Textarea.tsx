import {
  useLayoutEffect,
  useRef,
  type ChangeEventHandler,
  type ReactElement,
  type RefObject,
  type TextareaHTMLAttributes,
} from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: RefObject<HTMLTextAreaElement | null>;
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
}

export default function Textarea({
  className = "",
  ref,
  value = "",
  onChange,
  ...restProps
}: Readonly<TextareaProps>): ReactElement {
  const defaultRef = useRef<HTMLTextAreaElement | null>(null);
  const textareaRef = ref || defaultRef;

  // auto resize on type
  useLayoutEffect(() => {
    if (!textareaRef || !textareaRef.current) {
      return;
    }

    const elem = textareaRef.current;

    const scrollHeight = elem.scrollHeight;

    elem.style.height = "auto"; // reset size first

    if (value && scrollHeight) {
      elem.style.height = scrollHeight + "px";
    }
  }, [textareaRef, value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      className={`min-h-[5lh] p-4 border-1 border-solid border-neutral-700 rounded-xl resize-none overflow-hidden ${className}`}
      {...restProps}
    />
  );
}
