import type { MouseEventHandler, ReactElement, RefObject } from "react";
import ButtonTool from "../../buttons/ButtonTool";

interface ContentCodeBlockTagProps {
  contentRef: RefObject<HTMLTextAreaElement | null>;
  setContentValue: (newValue: string) => void;
  className?: string;
}

const ContentCodeBlockTag = ({
  contentRef,
  setContentValue,
  className = "",
}: Readonly<ContentCodeBlockTagProps>): ReactElement => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (!contentRef || !contentRef.current) {
      return;
    }

    const contentEl = contentRef.current;
    const tag = "```\n\n```";

    // directly modify the content elem value
    if (contentEl.value) {
      contentEl.value = contentEl.value + "\n" + tag; // add new line before
    } else {
      contentEl.value = contentEl.value + tag;
    }

    // move the cursor inbetween the code blocks
    const cursorPos = contentEl.value.length - 4;
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
      title="Code block"
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
        <path d="m384-336 56-57-87-87 87-87-56-57-144 144 144 144Zm192 0 144-144-144-144-56 57 87 87-87 87 56 57ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
      </svg>
      <span className="sr-only">Code block</span>
    </ButtonTool>
  );
};

export default ContentCodeBlockTag;
