import { tokenName } from "../context/providers/AuthProvider";

export const getConfig = () => {
  const encodedToken = localStorage.getItem(tokenName);

  if (token)
    return {
      headers: {
        authorization: encodedToken,
      },
    };
  else return "";
};
