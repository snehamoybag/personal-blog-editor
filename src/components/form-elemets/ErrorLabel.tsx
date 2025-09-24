import type { LabelHTMLAttributes, ReactElement, ReactNode } from "react";

interface ErrorLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode;
  className?: string;
}

export default function ErrorLabel({
  children,
  className = "",
  ...restProps
}: Readonly<ErrorLabelProps>): ReactElement {
  return (
    <label className={`text-sm text-red-300 ${className}`} {...restProps}>
      {children}
    </label>
  );
}
