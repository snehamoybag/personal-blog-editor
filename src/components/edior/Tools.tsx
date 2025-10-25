import type { ReactElement, RefObject } from "react";
import ContentImageUploader from "./tools/ContentImageUploader";

interface ToolsProps {
  contentRef: RefObject<HTMLTextAreaElement | null>;
  setContentValue: (newValue: string) => void;
  className?: string;
}

export default function Tools({
  contentRef,
  setContentValue,
  className = "",
}: Readonly<ToolsProps>): ReactElement {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <ContentImageUploader
        contentRef={contentRef}
        setContentValue={setContentValue}
      />
    </div>
  );
}
