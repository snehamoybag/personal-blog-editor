import type { Profile } from "./Profile";

export interface User {
  id: number;
  role: "ADMIN" | "MODERATOR" | "NORMAL";
  profile: Profile;
}
