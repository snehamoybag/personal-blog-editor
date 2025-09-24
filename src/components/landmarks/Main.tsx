import type { ReactElement, ReactNode } from "react";

interface MainProps {
  className?: string;
  children?: ReactNode;
}

export default function Main({
  className = "",
  children,
}: Readonly<MainProps>): ReactElement {
  return <main className={`min-h-[100vh] p-4 ${className}`}>{children}</main>;
}
