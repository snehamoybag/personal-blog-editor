import { type ReactElement } from "react";
import useUser from "../hooks/useUser";
import { Navigate } from "react-router";

export default function IndexPage(): ReactElement {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/new" />;
  }

  return <Navigate to="/login" />;
}
