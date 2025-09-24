import type { ReactElement, ReactNode } from "react";

interface ListItemProps {
  className?: string;
  children?: ReactNode;
}

export default function ListItem({
  className = "",
  children,
}: Readonly<ListItemProps>): ReactElement {
  return <li className={`p-4 ${className}`}>{children}</li>;
}
