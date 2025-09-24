import type { ReactElement } from "react";
import type { User } from "../types/User";
import AvatarIcon from "./AvatarIcon";
import { Link } from "react-router";

interface AuthorAndDateProps {
  author: User;
  date: { createdAt: Date; updatedAt?: Date };
  className?: string;
}

export default function AuthorAndDate({
  author,
  date,
  className = "",
}: Readonly<AuthorAndDateProps>): ReactElement {
  const authorUrl = `/user/${author.id}`;
  const profile = author.profile;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <Link to={authorUrl} className="no-underline">
          <AvatarIcon
            firstName={profile.firstName}
            lastName={profile.lastName}
            avatarUrl={profile.avatarUrl || undefined}
          />
        </Link>

        <p className="capitalize">
          <Link
            to={authorUrl}
            className="hidden-underline"
          >{`${profile.firstName} ${profile.lastName}`}</Link>
        </p>
      </div>
      &bull;
      <p className="text-neutral-300 font-light">
        {date.createdAt.toDateString()}
      </p>
    </div>
  );
}
