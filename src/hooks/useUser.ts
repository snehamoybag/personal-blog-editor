import { useOutletContext } from "react-router";
import type { OutletContext } from "../types/OutletCotext";

const useUser = () => {
  const { user } = useOutletContext<OutletContext>();
  return { user: user.get, setUser: user.set };
};

export default useUser;
