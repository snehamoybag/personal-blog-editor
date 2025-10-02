import type { Profile } from "./Profile.type";

export interface User {
  id: number;
  role: "ADMIN" | "MODERATOR" | "NORMAL";
  profile: Profile;
}
