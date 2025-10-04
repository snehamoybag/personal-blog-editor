import type { MouseEventHandler, ReactElement, ReactNode } from "react";

interface ButtonOutlineProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?: ReactNode;
}

export default function ButtonOutline({
  onClick,
  className = "",
  children,
}: Readonly<ButtonOutlineProps>): ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`clickable px-4 py-2 rounded-full border-1 border-solid border-current ${className}`}
    >
      {children}
    </button>
  );
}
