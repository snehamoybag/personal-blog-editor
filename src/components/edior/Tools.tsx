import type { ReactElement, RefObject } from "react";
import ContentImageUploader from "./tools/ContentImageUploader";
import ContentLinkTag from "./tools/ContentLinkTag";
import ContentBoldTag from "./tools/ContentBoldTag";
import ContentItalicTag from "./tools/ContentItalicTag";
import ContentUnorderedListTag from "./tools/ContentUnorderedListTag";
import ContentOrderedListTag from "./tools/ContentOrderedListTag";
import ContentHeaderTag from "./tools/ContentHeaderTag";
import ContentQuoteTag from "./tools/ContentQuoteTag";
import ContentCodeLineTag from "./tools/ContentCodeLineTag";
import ContentCodeBlockTag from "./tools/ContentCodeBlockTag";

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
      <ContentBoldTag
        contentRef={contentRef}
        setContentValue={setContentValue}
      />

      <ContentItalicTag
        contentRef={contentRef}
        setContentValue={setContentValue}
      />

      <ContentOrderedListTag
        contentRef={contentRef}
        setContentValue={setContentValue}
      />

      <ContentUnorderedListTag
        contentRef={contentRef}
        setContentValue={setContentValue}
      />

      <ContentHeaderTag
        contentRef={contentRef}
        setContentValue={setContentValue}
      />

      <ContentQuoteTag
        contentRef={contentRef}
        setContentValue={setContentValue}
      />

      <ContentCodeLineTag
        contentRef={contentRef}
        setContentValue={setContentValue}
      />

      <ContentCodeBlockTag
        contentRef={contentRef}
        setContentValue={setContentValue}
      />

      <ContentLinkTag
        contentRef={contentRef}
        setContentValue={setContentValue}
      />

      <ContentImageUploader
        contentRef={contentRef}
        setContentValue={setContentValue}
      />
    </div>
  );
}
