import type { User } from "./User.type";

export interface OutletContext {
  user: {
    get: User | null;
    set: React.Dispatch<React.SetStateAction<User | null>>;
  };
}
