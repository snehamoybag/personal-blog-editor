import type { ReactElement, ReactNode } from "react";

interface HeaderProps {
  className?: string;
  children?: ReactNode;
}

export default function Header({
  className = "",
  children,
}: Readonly<HeaderProps>): ReactElement {
  return (
    <header
      className={`card p-4 border-b-1 border-solid border-neutral-700 sm:px-8 ${className}`}
    >
      {children}
    </header>
  );
}
