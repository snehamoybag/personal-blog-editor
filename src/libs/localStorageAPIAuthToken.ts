const TOKEN_KEY = import.meta.env.VITE_API_AUTH_TOKEN_KEY;

export const getAuthTokenFromLocalStorage = () => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    return "";
  }

  return token;
};

export const setAuthTokenToLocalStorage = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};
