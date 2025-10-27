import type { MouseEventHandler, ReactElement, RefObject } from "react";
import ButtonTool from "../../buttons/ButtonTool";

interface ContentUnorderedListTagProps {
  contentRef: RefObject<HTMLTextAreaElement | null>;
  setContentValue: (newValue: string) => void;
  className?: string;
}

const ContentUnorderedListTag = ({
  contentRef,
  setContentValue,
  className = "",
}: Readonly<ContentUnorderedListTagProps>): ReactElement => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (!contentRef || !contentRef.current) {
      return;
    }

    const contentEl = contentRef.current;
    const contentValue = contentEl.value;
    const listTag = "- ";

    if (contentValue) {
      setContentValue(contentValue + "\n" + listTag); // add a new line before
    } else {
      setContentValue(contentValue + listTag);
    }

    // auto move cursor to content area
    contentEl.focus();
  };
  return (
    <ButtonTool
      onClick={handleClick}
      className={`${className}`}
      title="Unordered list"
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
        <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
      </svg>
      <span className="sr-only">Unordered list</span>
    </ButtonTool>
  );
};

export default ContentUnorderedListTag;
