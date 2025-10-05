import type { MouseEventHandler, ReactElement } from "react";

interface TagItemProps {
  name: string;
  onRemove: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function TagItem({
  name,
  onRemove,
  className = "",
}: Readonly<TagItemProps>): ReactElement {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 bg-neutral-700 rounded-full ${className}`}
    >
      <p className="text-sm sm:text-base">{name}</p>
      <button
        type="button"
        title="remove tag"
        className="clickable"
        value={name}
        onClick={onRemove}
      >
        <span className="sr-only">remove</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
          aria-hidden="true"
          className=" size-4 object-contain fill-current border-1 border-current rounded-full opacity-70 hover:opacity-100 hover:text-red-300"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </button>
    </div>
  );
}
