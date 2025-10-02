import type { ReactElement } from "react";
import type { User } from "../types/User.type";
import ListItem from "./ListItem";
import AvatarIcon from "./AvatarIcon";
import { Link } from "react-router";

const editorSiteUrl = import.meta.env.VITE_EDITOR_URL;

interface UserAccountOptionsProps {
  user: User;
}

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
          <Link to={`/user/${user.id}`} className="text-xs sm:text-sm">
            View Account
          </Link>
        </div>
      </ListItem>

      {user.role === "ADMIN" && (
        <ListItem>
          <a href={editorSiteUrl} target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
            </svg>

            <span>Write</span>
          </a>
        </ListItem>
      )}

      <ListItem>
        <Link to="/logout" className="text-red-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840v80q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200v80Zm160-160-56-57 103-103H360v-80h327L584-624l56-56 200 200-200 200Z" />
          </svg>
          <span>Log out</span>
        </Link>
      </ListItem>
    </>
  );
}
