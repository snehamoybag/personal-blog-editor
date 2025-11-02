import { useEffect, useRef, type ReactElement } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingModalProps {
  message: string;
  isLoading: boolean;
  className?: string;
}

export default function LoadingModal({
  message,
  isLoading = false,
  className = "",
}: Readonly<LoadingModalProps>): ReactElement {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    if (isLoading) {
      ref.current.showModal();
    } else {
      ref.current.close();
    }
  });

  return (
    <dialog
      ref={ref}
      className={`p-4 bg-neutral-800 text-neutral-200 font-base border-1 border-solid border-neutral-700 rounded-lg outline-none shadow-md top-[50%] left-[50%] translate-[-50%] backdrop:backdrop-blur-xs ${className}`}
    >
      <div className="flex items-center gap-2">
        <LoadingSpinner className="size-8" />
        <p>{message}</p>
      </div>
    </dialog>
  );
}
