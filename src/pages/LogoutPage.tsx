import { useEffect, type ReactElement } from "react";
import useUser from "../hooks/useUser";
import useAuthToken from "../hooks/useAuthToken";
import SuccessPage from "./SuccessPage";
import LinkToHomepage from "../components/LinkToHomepage";
import LoadingModal from "../components/LoadingModal";

export default function LogoutPage(): ReactElement {
  const { user, setUser } = useUser();
  const { authToken, setAuthToken } = useAuthToken();

  // clear the local storage only after the component has rendered
  useEffect(() => {
    if (!user && !authToken) {
      return;
    }

    setUser(null);
    setAuthToken(null);
  });

  if (user || authToken) {
    return <LoadingModal isLoading={true} message="Logging out..." />;
  }

  return (
    <SuccessPage message="Log out complete.">
      <LinkToHomepage />
    </SuccessPage>
  );
}
