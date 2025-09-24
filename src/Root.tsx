import { useRef, type ReactElement } from "react";
import Header from "./components/landmarks/Header";
import Logo from "./components/Logo";
import { Outlet } from "react-router";
import ButtonAccount from "./components/buttons/ButtonAccount";
import AccountOptions from "./components/AccountOptions";
import UserAccountOptions from "./components/UserAccountOptions";
import GuestAccountOptions from "./components/GuestAccountOptions";
import type { User } from "./types/User";

export default function Root(): ReactElement {
  const user: User | null = null;
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
            // profile={user?.profile}
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

      <Outlet />
    </>
  );
}
