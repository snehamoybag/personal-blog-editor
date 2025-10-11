const TOKEN_KEY = import.meta.env.VITE_API_AUTH_TOKEN_KEY as string;

export const getAuthTokenFromLocalStorage = () => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    return "";
  }

  return token;
};

export const setAuthTokenToLocalStorage = (value: string | null) => {
  if (!value) {
    localStorage.removeItem(TOKEN_KEY);
    return;
  }

  localStorage.setItem(TOKEN_KEY, value);
};
