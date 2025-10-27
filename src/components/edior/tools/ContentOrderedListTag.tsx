import type { MouseEventHandler, ReactElement, RefObject } from "react";
import ButtonTool from "../../buttons/ButtonTool";

interface ContentOrderedListTagProps {
  contentRef: RefObject<HTMLTextAreaElement | null>;
  setContentValue: (newValue: string) => void;
  className?: string;
}

const ContentOrderedListTag = ({
  contentRef,
  setContentValue,
  className = "",
}: Readonly<ContentOrderedListTagProps>): ReactElement => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (!contentRef || !contentRef.current) {
      return;
    }

    const contentValue = contentRef.current.value;
    const listTag = "1. ";

    if (contentValue) {
      setContentValue(contentValue + "\n" + listTag); // add a new line before
    } else {
      setContentValue(contentValue + listTag);
    }

    // move cursor back to content field
    contentRef.current.focus();
  };
  return (
    <ButtonTool
      onClick={handleClick}
      className={`${className}`}
      title="Ordered list"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        aria-hidden="true"
        fill="#000000"
        className="fill-current"
      >
        <path d="M120-80v-60h100v-30h-60v-60h60v-30H120v-60h120q17 0 28.5 11.5T280-280v40q0 17-11.5 28.5T240-200q17 0 28.5 11.5T280-160v40q0 17-11.5 28.5T240-80H120Zm0-280v-110q0-17 11.5-28.5T160-510h60v-30H120v-60h120q17 0 28.5 11.5T280-560v70q0 17-11.5 28.5T240-450h-60v30h100v60H120Zm60-280v-180h-60v-60h120v240h-60Zm180 440v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360Z" />
      </svg>
      <span className="sr-only">Ordered list</span>
    </ButtonTool>
  );
};

export default ContentOrderedListTag;
