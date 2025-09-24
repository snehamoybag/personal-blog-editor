import type { User } from "./User";

export interface OutletContext {
  user: {
    get: User | null;
    set: React.Dispatch<React.SetStateAction<User | null>>;
  };
}
