import type { MouseEventHandler, ReactElement, RefObject } from "react";
import ButtonTool from "../../buttons/ButtonTool";

interface ContentHeaderTagProps {
  contentRef: RefObject<HTMLTextAreaElement | null>;
  setContentValue: (newValue: string) => void;
  className?: string;
}

const ContentHeaderTag = ({
  contentRef,
  setContentValue,
  className = "",
}: Readonly<ContentHeaderTagProps>): ReactElement => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (!contentRef || !contentRef.current) {
      return;
    }

    const contentEl = contentRef.current;
    const contentValue = contentEl.value;
    const tag = "## ";

    if (contentValue) {
      setContentValue(contentValue + "\n" + tag); // add a new line before
    } else {
      setContentValue(contentValue + tag);
    }

    // auto move cursor to content area
    contentEl.focus();
  };
  return (
    <ButtonTool onClick={handleClick} className={`${className}`} title="Header">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#000000"
        aria-hidden="true"
        className="fill-current"
      >
        <path d="M420-160v-520H200v-120h560v120H540v520H420Z" />
      </svg>
      <span className="sr-only">Header</span>
    </ButtonTool>
  );
};

export default ContentHeaderTag;
