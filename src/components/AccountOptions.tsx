import { type ReactElement, type ReactNode, type RefObject } from "react";

interface AccountOptionsProps {
  ref?: RefObject<HTMLDialogElement | null>;
  className?: string;
  children?: ReactNode;
}

export default function AccountOptions({
  ref,
  className = "",
  children,
}: Readonly<AccountOptionsProps>): ReactElement {
  return (
    <dialog ref={ref} className={`rounded-lg shadow-md ${className}`}>
      {children}
    </dialog>
  );
}
