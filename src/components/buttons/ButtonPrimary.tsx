import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
  children?: ReactNode;
}

export default function ButtonPrimary({
  type = "button",
  className = "",
  children,
  ...resPorps
}: Readonly<ButtonPrimaryProps>): ReactElement {
  return (
    <button
      type={type}
      className={`clickable font-bold px-4 py-2 bg-neutral-700 rounded-full shadow-sm active:shadow-none ${className}`}
      {...resPorps}
    >
      {children}
    </button>
  );
}
