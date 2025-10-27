import type { MouseEventHandler, ReactElement, RefObject } from "react";
import ButtonTool from "../../buttons/ButtonTool";

interface ContentBoldTagProps {
  contentRef: RefObject<HTMLTextAreaElement | null>;
  setContentValue: (newValue: string) => void;
  className?: string;
}

const ContentBoldTag = ({
  contentRef,
  setContentValue,
  className = "",
}: Readonly<ContentBoldTagProps>): ReactElement => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (!contentRef || !contentRef.current) {
      return;
    }

    const contentEl = contentRef.current;
    const boldTag = "****";

    // directly change the value
    contentEl.value = contentEl.value + boldTag;

    // put cursor between the tag
    const cursorPos = contentEl.value.length - 2; // between the 2stars (e.g. **|**)
    contentEl.setSelectionRange(cursorPos, cursorPos);
    contentEl.focus();

    // set the new value
    setContentValue(contentEl.value);
  };
  return (
    <ButtonTool
      onClick={handleClick}
      className={`${className}`}
      title="Bold text"
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
        <path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z" />
        <span className="sr-only">Bold text</span>
      </svg>
    </ButtonTool>
  );
};

export default ContentBoldTag;
