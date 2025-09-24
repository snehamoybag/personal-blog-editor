import type { JSX, ReactElement, ReactNode } from "react";

interface Tittle700Props {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: ReactNode;
}

export default function Tittle700({
  as: Tag = "h2",
  className = "",
  children,
}: Readonly<Tittle700Props>): ReactElement {
  return (
    <Tag className={`text-2xl font-bold sm:text-4xl ${className}`}>
      {children}
    </Tag>
  );
}
