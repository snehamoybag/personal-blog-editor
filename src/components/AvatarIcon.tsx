import { useLayoutEffect, useRef, type ReactElement } from "react";

interface AvatarIconProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  className?: string;
}

export default function AvatarIcon({
  firstName,
  lastName,
  avatarUrl,
  className = "",
}: Readonly<AvatarIconProps>): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);

  const avatarBgColor = `#${
    firstName.charCodeAt(0) + lastName.charCodeAt(0) + 100
  }`.slice(0, 4); // +100 to make sure hex code always has 3 characters

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const falbackFontSize = 16; // in px
    const elem = ref.current;
    const elemmWidth = elem.getBoundingClientRect().width;
    const relativeFontSize = elemmWidth / 2; // 50% of parent width

    elem.style.fontSize = (relativeFontSize || falbackFontSize) + "px";
  }, []);

  return (
    <div
      ref={ref}
      className={`size-8 border-2 border-neutral-700 rounded-full overflow-hidden ${className}`}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`avatar of ${firstName} ${lastName}`}
          className="size-full object-contain object-center"
        />
      ) : (
        <span
          className="grid items-center size-full text-neutral-200 text-center font-bold uppercase italic"
          style={{
            backgroundColor: avatarBgColor,
          }}
        >
          {/* initials */}
          {firstName[0] + lastName[0]}
        </span>
      )}
    </div>
  );
}
