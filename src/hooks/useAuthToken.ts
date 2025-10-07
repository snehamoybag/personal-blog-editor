import { useOutletContext } from "react-router";
import type { OutletContext } from "../types/OutletCotext.type";

const useAuthToken = () => {
  const { authToken } = useOutletContext<OutletContext>();
  return { authToken: authToken.get, setAuthToken: authToken.set };
};

export default useAuthToken;
