import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

interface ButtonToolProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
  children?: ReactNode;
}

const ButtonTool = ({
  type = "button",
  className = "",
  children,
  ...restProps
}: Readonly<ButtonToolProps>): ReactElement => {
  return (
    <button
      type={type}
      className={`clickable block p-2 border-1 border-neutral-700 rounded-full ${className}`}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default ButtonTool;
