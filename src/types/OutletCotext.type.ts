import React from "react";
import type { User } from "./User.type";

export interface OutletContext {
  user: {
    get: User | null;
    set: React.Dispatch<React.SetStateAction<User | null>>;
  };

  authToken: {
    get: string | null;
    set: React.Dispatch<React.SetStateAction<string | null>>;
  };
}
