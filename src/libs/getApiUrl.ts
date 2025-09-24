const getApiUrl = () => {
  const url = import.meta.env.VITE_API_URL;

  if (!url) {
    throw new Error("Api url not found in enviroment variables.");
  }

  if (typeof url !== "string") {
    throw new Error("Api url must be of type string.");
  }

  return url;
};

export default getApiUrl;
