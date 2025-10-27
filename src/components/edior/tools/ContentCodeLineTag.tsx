import type { MouseEventHandler, ReactElement, RefObject } from "react";
import ButtonTool from "../../buttons/ButtonTool";

interface ContentCodeLineTagProps {
  contentRef: RefObject<HTMLTextAreaElement | null>;
  setContentValue: (newValue: string) => void;
  className?: string;
}

const ContentCodeLineTag = ({
  contentRef,
  setContentValue,
  className = "",
}: Readonly<ContentCodeLineTagProps>): ReactElement => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (!contentRef || !contentRef.current) {
      return;
    }

    const contentEl = contentRef.current;
    const tag = "`  `";

    // directly modify the content elem value
    contentEl.value = contentEl.value + tag;

    // move the cursor inbetween the code blocks
    const cursorPos = contentEl.value.length - 2;
    contentEl.setSelectionRange(cursorPos, cursorPos);

    // auto move cursor to content area
    contentEl.focus();

    // update with new value
    setContentValue(contentEl.value);
  };
  return (
    <ButtonTool
      onClick={handleClick}
      className={`${className}`}
      title="Code line"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#000000"
        aria-hidden="true"
        className="fill-current"
      >
        <path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
      </svg>
      <span className="sr-only">Code line</span>
    </ButtonTool>
  );
};

export default ContentCodeLineTag;
