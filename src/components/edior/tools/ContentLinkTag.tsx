import type { MouseEventHandler, ReactElement, RefObject } from "react";

interface LinkTagProps {
  contentRef: RefObject<HTMLTextAreaElement | null>;
  setContentValue: (newValue: string) => void;
  className?: string;
}

const ContentLinkTag = ({
  contentRef,
  setContentValue,
  className = "",
}: Readonly<LinkTagProps>): ReactElement => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (!contentRef || !contentRef.current) {
      return;
    }

    const placeholder = "url here...";
    const linkTag = `[text](${placeholder})`;
    const contentEl = contentRef.current;

    contentEl.focus();
    // directly modify the element value to select the section
    contentEl.value = contentEl.value + linkTag;

    // select the 'url here...' portion
    contentEl.setSelectionRange(
      linkTag.length - 1 - placeholder.length,
      linkTag.length - 1,
    );

    // update with new value
    setContentValue(contentEl.value);
  };

  return (
    <button
      type="button"
      title="Add link"
      onClick={handleClick}
      className={`clickable block p-2 border-1 border-neutral-700 rounded-full ${className}`}
    >
      <span className="sr-only">Link tag</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#000000"
        aria-hidden="true"
        className="fill-current"
      >
        <path d="M680-160v-120H560v-80h120v-120h80v120h120v80H760v120h-80ZM440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm560-40h-80q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480Z" />
      </svg>
    </button>
  );
};

export default ContentLinkTag;
