import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import Header from "./components/landmarks/Header";
import Logo from "./components/Logo";
import { Outlet } from "react-router";
import ButtonAccount from "./components/buttons/ButtonAccount";
import AccountOptions from "./components/AccountOptions";
import UserAccountOptions from "./components/UserAccountOptions";
import GuestAccountOptions from "./components/GuestAccountOptions";
import type { User } from "./types/User.type";
import {
  getUserFromLocalStorage,
  setUserToLocalStorage,
} from "./libs/localStorageUser";
import type { OutletContext } from "./types/OutletCotext.type";
import {
  getAuthTokenFromLocalStorage,
  setAuthTokenToLocalStorage,
} from "./libs/localStorageAPIAuthToken";
import getApiUrl from "./libs/getApiUrl";
import ListItem from "./components/ListItem";
import { Link } from "react-router";
import getBlogUrl from "./libs/getBlogUrl";

const blogUrl = getBlogUrl();
const apiUrl = getApiUrl();

export default function Root(): ReactElement {
  const [isAuthTokenValidCheckDone, setIsAuthTokenValidCheckDone] =
    useState(false);
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage);
  const [authToken, setAuthToken] = useState<string | null>(
    getAuthTokenFromLocalStorage,
  );

  const outletContext = useMemo(
    () => ({
      user: {
        get: user,
        set: setUser,
      },
      authToken: {
        get: authToken,
        set: setAuthToken,
      },
    }),
    [user, authToken],
  );

  // check if jwt is valid on first load
  // if not logout the user
  useEffect(() => {
    if (!authToken || isAuthTokenValidCheckDone) {
      return;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    fetch(apiUrl, { mode: "cors", method: "POST", headers })
      .then((response) => {
        if (!response.ok || response.status >= 400) {
          // log out the user
          setAuthToken(null);
          setUser(null);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsAuthTokenValidCheckDone(true));
  }, [authToken, isAuthTokenValidCheckDone]);

  // sync local storage with component
  useEffect(() => {
    setUserToLocalStorage(user);
    setAuthTokenToLocalStorage(authToken);
  }, [user, authToken]);

  const accountOptionsRef = useRef<HTMLDialogElement>(null);

  const toggleAccountOptions = () => {
    if (!accountOptionsRef.current) {
      return;
    }

    const modalEl = accountOptionsRef.current;
    if (modalEl.hasAttribute("open")) {
      modalEl.close();
    } else {
      modalEl.show();
    }
  };

  return (
    <>
      <Header className="flex justify-between items-center gap-4">
        <Logo />

        <div className="relative">
          <ButtonAccount
            profile={user ? user.profile : null}
            text="account options"
            onClick={toggleAccountOptions}
          />

          <AccountOptions
            ref={accountOptionsRef}
            className="min-w-max top-full ml-auto"
          >
            <ol role="list" className="account-options-list">
              {user ? (
                <UserAccountOptions user={user} />
              ) : (
                <GuestAccountOptions />
              )}

              <ListItem>
                <a href={blogUrl} target="_blank">
                  Blog
                </a>
              </ListItem>

              {user && (
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
              )}
            </ol>
          </AccountOptions>
        </div>
      </Header>

      <Outlet context={outletContext satisfies OutletContext} />
    </>
  );
}
