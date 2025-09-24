import type { ReactElement } from "react";
import { Link } from "react-router";

interface LogoProps {
  className?: string;
}

export default function Logo({
  className = "",
}: Readonly<LogoProps>): ReactElement {
  return (
    <div className={className}>
      <p className="text-3xl font-title font-black">
        <Link to="/" className="no-underline">
          SB.
        </Link>
      </p>
    </div>
  );
}
