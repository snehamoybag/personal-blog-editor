import type { JSX, ReactElement, ReactNode } from "react";

interface Tittle400Props {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: ReactNode;
}

export default function Tittle400({
  as: Tag = "h2",
  className = "",
  children,
}: Readonly<Tittle400Props>): ReactElement {
  return (
    <Tag className={`font-bold text-base sm:lg ${className}`}>{children}</Tag>
  );
}
