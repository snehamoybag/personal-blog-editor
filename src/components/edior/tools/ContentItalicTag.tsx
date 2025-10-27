import type { MouseEventHandler, ReactElement, RefObject } from "react";
import ButtonTool from "../../buttons/ButtonTool";

interface ContentItalicTagProps {
  contentRef: RefObject<HTMLTextAreaElement | null>;
  setContentValue: (newValue: string) => void;
  className?: string;
}

const ContentItalicTag = ({
  contentRef,
  setContentValue,
  className = "",
}: Readonly<ContentItalicTagProps>): ReactElement => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (!contentRef || !contentRef.current) {
      return;
    }

    const contentEl = contentRef.current;
    const italicTag = "**";

    // directly change the value
    contentEl.value = contentEl.value + italicTag;

    // put cursor between the tag
    const cursorPos = contentEl.value.length - 1; // between the 2stars (e.g. *|*)
    contentEl.setSelectionRange(cursorPos, cursorPos);
    contentEl.focus();

    // set the new value
    setContentValue(contentEl.value);
  };
  return (
    <ButtonTool
      onClick={handleClick}
      className={`${className}`}
      title="Italic text"
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
        <path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z" />
      </svg>
      <span className="sr-only">Italic text</span>
    </ButtonTool>
  );
};

export default ContentItalicTag;
