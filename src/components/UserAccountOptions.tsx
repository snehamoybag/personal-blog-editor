import type { ReactElement } from "react";
import type { User } from "../types/User.type";
import ListItem from "./ListItem";
import AvatarIcon from "./AvatarIcon";
import { Link } from "react-router";
import getBlogUrl from "../libs/getBlogUrl";

interface UserAccountOptionsProps {
  user: User;
}

const blogUrl = getBlogUrl();

export default function UserAccountOptions({
  user,
}: Readonly<UserAccountOptionsProps>): ReactElement {
  const { profile } = user;

  return (
    <>
      <ListItem className="flex gap-4">
        <AvatarIcon
          firstName={profile.firstName}
          lastName={profile.lastName}
          avatarUrl={profile.avatarUrl || undefined}
          className="size-12"
        />
        <div>
          <p className="capitalize">
            {profile.firstName} {profile.lastName}
          </p>
          <Link
            to={`${blogUrl}/users/${user.id}`}
            className="text-xs sm:text-sm"
          >
            View Account
          </Link>
        </div>
      </ListItem>
    </>
  );
}
