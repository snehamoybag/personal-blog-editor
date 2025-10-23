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

    const url = getApiUrl();
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authToken}`);

    fetch(url, { mode: "cors", method: "POST", headers })
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
            </ol>
          </AccountOptions>
        </div>
      </Header>

      <Outlet context={outletContext satisfies OutletContext} />
    </>
  );
}
