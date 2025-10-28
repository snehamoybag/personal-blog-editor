import { useState, type ReactElement } from "react";
import type Editor from "./edior/Editor";
import type EditorPreview from "./EditorPreview";

interface EditorPreviewTabsProps {
  editor: ReactElement<typeof Editor>;
  preview: ReactElement<typeof EditorPreview>;
}

const EditorPreviewTabs = ({
  editor,
  preview,
}: Readonly<EditorPreviewTabsProps>): ReactElement => {
  const [isEditorView, setIsEditorView] = useState(true);

  const toggleView = () => {
    setIsEditorView((prevView) => !prevView);
  };

  return (
    <>
      <div className="text-right pb-2 border-b-1 border-neutral-700">
        <button
          type="button"
          disabled={isEditorView}
          onClick={toggleView}
          className={`${!isEditorView ? "clickable" : "text-neutral-700 cursor-not-allowed"}`}
        >
          Editor
        </button>

        <span aria-hidden="true"> | </span>

        <button
          type="button"
          disabled={isEditorView === false}
          onClick={toggleView}
          className={`${isEditorView ? "clickable" : "text-neutral-700 cursor-not-allowed"}`}
        >
          Preview
        </button>
      </div>

      {isEditorView ? editor : preview}
    </>
  );
};

export default EditorPreviewTabs;
