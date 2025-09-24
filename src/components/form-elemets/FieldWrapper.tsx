import type { ReactElement, ReactNode } from "react";

interface FieldWrapperProps {
  className?: string;
  children?: ReactNode;
}

export default function FieldWrapper({
  className = "",
  children,
}: Readonly<FieldWrapperProps>): ReactElement {
  return <p className={`grid gap-y-2 ${className}`}>{children}</p>;
}
