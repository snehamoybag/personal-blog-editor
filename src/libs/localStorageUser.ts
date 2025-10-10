import type { User } from "../types/User.type";

const USER_KEY = import.meta.env.VITE_USER_KEY as string;

export const getUserFromLocalStorage = () => {
  const raw = localStorage.getItem(USER_KEY);

  if (!raw) {
    return null;
  }

  const parsed = JSON.parse(raw) as unknown;

  if (typeof parsed !== "object" || Array.isArray(parsed) || parsed === null) {
    return null;
  }

  const matchesUserProperties = ["id", "role", "profile"].every((key) =>
    Object.hasOwn(parsed, key)
  );

  if (!matchesUserProperties) {
    console.error(
      new Error("User data missing one or multiple important properties.")
    );
    return null;
  }

  return parsed as User;
};

export const setUserToLocalStorage = (value: User | null) => {
  localStorage.setItem(USER_KEY, JSON.stringify(value));
};
